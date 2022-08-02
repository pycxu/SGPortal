from ninja import NinjaAPI, Schema, ModelSchema
from django.conf import settings
from typing import List
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model, authenticate, login
from django.contrib.auth.models import update_last_login
from rest_framework_simplejwt.tokens import RefreshToken

api = NinjaAPI(title="API_ACC", version="1.0.0")

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

@api.post("/signup-consumer/", response={200: SignUpConsumerOut, 400: ErrorOut}, tags=["auth"])
def create_consumer(request,  payload: SignUpConsumerIn):
    # TODO: email verification
    new_consumer = get_user_model().objects.create_user(**payload.dict())
    new_consumer.user_type = 1 
    new_consumer.save()
    new_consumer.email_user('subject', 'msg')
    return 200, {"id": new_consumer.id}
    # try:

    # except:
    #     return 400, {"error": "somthing went wrong"}

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
        refresh = RefreshToken.for_user(user)
        update_last_login(None, user)
        return 200, {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        }
        # if user.is_email_verified == True:
        #     return 200, {"success": "logged in"}
        # else:
        #     return 400, {"error": "email not verified"}
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

@api.get("/users/{user_id}", response=UserOut, tags=["users"])
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

# @api.post("/email-verify/", response=, tags=["auth"])
# def verify_email(request,  payload: )

# @api.post("/forget-password/", response=, tags=["auth"])
# def forget_password(request,  payload: )

# @api.post("/password-reset/", response=, tags=["auth"])
# def reset_password(request, payload: )