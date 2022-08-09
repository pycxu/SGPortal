from ninja import NinjaAPI, Schema, ModelSchema
from django.conf import settings
from typing import List
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model, authenticate, login
from django.contrib.auth.models import update_last_login
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from .tokens import EmailVerifyTokenGenerator, AuthTokenGenerator
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from typing import Any, Optional
from django.http import HttpRequest
from ninja.security import HttpBearer
from rest_framework_simplejwt.authentication import JWTAuthentication
import jwt
from django.http import HttpResponse
from functools import wraps

api = NinjaAPI(title="API_ACCOUNTS", version="1.0.0", urls_namespace='accounts_api')

class JWTAuthGuard(HttpBearer):
    def authenticate(self, request: HttpRequest, token: str) -> Optional[Any]:
        jwt_authenticator = JWTAuthentication()
        try:
            response = jwt_authenticator.authenticate(request)
            if response is not None:
                return True # 200 OK
            return False # 401
        except Exception:
            # Any exception we want it to return False i.e 401
            return False

def IDORCheck(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        print("checking IDOR")
        request = args[0]
        user_id = int(str(args[0].path).split("/")[-1])
        access_token = request.headers['Authorization'].split(" ")[1]
        _user_id = jwt.decode(access_token, settings.SECRET_KEY, algorithms=["HS256"])['user_id']
        if _user_id == user_id:
            return f(*args, **kwargs)
        else:
            return HttpResponse('Unauthorized', status=401)
    return wrapper

class SignUpConsumerIn(ModelSchema):
    class Config:
        model = get_user_model()
        model_fields = ['username', 'email', 'password']

class SignUpConsumerOut(Schema):
    id: int

class ErrorOut(Schema):
    error: str

class SuccessOut(Schema):
    success: str

@api.post("/signup/consumer/", response={200: SignUpConsumerOut, 400: ErrorOut}, tags=["auth"])
def create_consumer(request,  payload: SignUpConsumerIn):
    try:
        # create new user
        new_user = get_user_model().objects.create_user(**payload.dict())
        if new_user is not None:
            new_user.user_type = 1 
            new_user.save()

            # generate email activation link
            username = new_user.username
            domain = "localhost:3000" # domain = get_current_site(request).domain when we have a frontend
            uid = urlsafe_base64_encode(force_bytes(new_user.pk))
            token = EmailVerifyTokenGenerator.make_token(new_user)

            message = f"Hi {username},\nPlease click on the link to activate your account.\nhttp://{domain}/verify-email/{uid}/{token}/ "
            new_user.email_user('Email verification', message)
            return 200, {"id": new_user.id}
    except:
        return 400, {"error": "somthing went wrong"}

class LoginIn(ModelSchema):
    class Config:
        model = get_user_model()
        model_fields = ['email', 'password']

class LoginOut(Schema):
    refresh: str
    access: str

@api.post("/login/", response={200: LoginOut, 400: ErrorOut}, tags=["auth"])
def login(request,  payload: LoginIn):
    # TODO: email verification
    user = authenticate(username=payload.email, password=payload.password)
    if user is not None:
        if user.is_email_verified == True:
            refresh = AuthTokenGenerator.get_token(user)
            update_last_login(None, user)
            return 200, {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            }
        else:
            return 400, {"error": "email not verified"}
    return 400, {"error": "somthing went wrong"}

class UserIn(ModelSchema):
    class Config:
        model = get_user_model()
        model_fields = "__all__"

class UserOut(ModelSchema):
    class Config:
        model = get_user_model()
        model_fields = "__all__"

@api.get("/users/", response=List[UserOut], tags=["users"])
def get_all_users(request):
    users = get_user_model().objects.all()
    return users

@api.get("/users/{user_id}", response=UserOut, tags=["users"], auth=JWTAuthGuard())
@IDORCheck
def get_user_by_id(request, user_id: int):
    user = get_object_or_404(get_user_model(), id=user_id)
    return user

class UpdateUserIn(ModelSchema):
    class Config:
        model = get_user_model()
        model_fields = ['username']

@api.put("/users/{user_id}", response=UserOut, tags=["users"])
def update_user_by_id(request, user_id: int, payload: UpdateUserIn):
    user = get_object_or_404(get_user_model(), id=user_id)
    for attr, value in payload.dict().items():
        setattr(user, attr, value)
    user.save()
    return user

@api.delete("/users/{user_id}", response={200: SuccessOut}, tags=["users"])
def delete_user_by_id(request, user_id: int):
    user = get_object_or_404(get_user_model(), id=user_id)
    user.delete()
    return 200, {"success": "deleted"}

@api.delete("/users/", response={200: SuccessOut, 400: ErrorOut}, tags=["users"])
def delete_all_users(request):
    try:
        get_user_model().objects.all().delete()
        return 200, {"success": "deleted"}
    except:
        return 400, {"error": "somthing went wrong"}

# @api.post("/signup-banker/", response=, tags=["auth"])
# def create_banker(request,  payload: )

class VerifyEmailIn(Schema):
    uidb64: str
    token: str

@api.post("/verify-email/", response={200: SuccessOut, 400: ErrorOut}, tags=["auth"])
def verify_email(request,  payload: VerifyEmailIn):
    try:
        uid = force_str(urlsafe_base64_decode(payload.uidb64))  
        user = get_user_model().objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, get_user_model().DoesNotExist):  
        user = None  
    if user is not None and EmailVerifyTokenGenerator.check_token(user, payload.token):  
        user.is_email_verified = True  
        user.save()
        return 200, {"success": "Email verified"}
    else:
        return 400, {"error": "somthing went wrong"}

class ForgetPassWordIn(Schema):
    email: str

@api.post("/forget-password/", response={200: SuccessOut, 400: ErrorOut}, tags=["auth"])
def forget_password(request,  payload: ForgetPassWordIn):
    try:
        user = get_user_model().objects.get(email=payload.email.lower())
    except(TypeError, ValueError, OverflowError, get_user_model().DoesNotExist):  
        user = None 
    if user is not None and user.is_active:
        # generate reset password link
        username = user.username
        domain = "localhost:3000" # domain = get_current_site(request).domain when we have a frontend
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = PasswordResetTokenGenerator().make_token(user)

        message = f"Hi {username},\nPlease click on the link to reset your password.\nhttp://{domain}/reset-password/{uid}/{token}/ "
        user.email_user('Password reset', message)
        return 200, {"success": "sent password reset link"}
    else:
        return 400, {"error": "somthing went wrong"}

class ForgetPassWordIn(Schema):
    uidb64: str
    token: str
    password: str

@api.post("/reset-password/", response={200: SuccessOut, 400: ErrorOut}, tags=["auth"])
def reset_password(request, payload: ForgetPassWordIn):
    try:
        uid = force_str(urlsafe_base64_decode(payload.uidb64))  
        user = get_user_model().objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, get_user_model().DoesNotExist):  
        user = None  
    if user is not None and PasswordResetTokenGenerator().check_token(user, payload.token):  
        user.set_password(payload.password)
        user.save()
        return 200, {"success": "Reset password"}
    else:
        return 400, {"error": "somthing went wrong"}