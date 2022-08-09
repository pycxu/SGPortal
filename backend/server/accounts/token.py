from django.contrib.auth.tokens import PasswordResetTokenGenerator  
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import six  
class TokenGenerator(PasswordResetTokenGenerator):  
    def _make_hash_value(self, user, timestamp):  
        return (  
            six.text_type(user.pk) + six.text_type(timestamp) +  
            six.text_type(user.is_email_verified)  
        )  
EmailVerifyTokenGenerator = TokenGenerator()  

class AuthTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

AuthTokenGenerator = AuthTokenObtainPairSerializer()