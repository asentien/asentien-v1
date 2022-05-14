from datetime import date
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers

from .models import User, Profile



class ProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.FileField(
        read_only=True
    )
    cover = serializers.FileField(
        read_only=True
    )
    class Meta:
        model = Profile
        fields = [
            "avatar",
            "cover",
            "education",
            "occupation",
            "bio",
            "aptitudes",
            "gender",
            "pronouns",
            "country",
        ]  

class ProfileReadOnlySerializer(serializers.Serializer):
    avatar = serializers.FileField(
        read_only=True
    )
    cover = serializers.FileField(
        read_only=True
    )
    education = serializers.CharField(
        read_only=True
    )
    occupation = serializers.CharField(
        read_only=True
    )
    bio = serializers.CharField(
        read_only=True
    )
    aptitudes = serializers.CharField(
        read_only=True
    )
    gender = serializers.CharField(
        read_only=True
    )
    pronouns = serializers.CharField(
        read_only=True
    )
    country = serializers.CharField(
        read_only=True
    )


class ProfileAvatarSerializer(serializers.ModelSerializer):
    avatar = serializers.FileField(
        read_only=False
    )
    class Meta:
        model = Profile
        fields = ["avatar"]

class ProfileCoverSerializer(serializers.ModelSerializer):
    cover = serializers.FileField(
        read_only=False
    )
    class Meta:
        model = Profile
        fields = ["cover"]

class SlimmedProfileSerializer(serializers.Serializer):
    avatar = serializers.FileField(
        read_only=True
    )
    education = serializers.CharField(
        read_only=True
    )
    occupation = serializers.CharField(
        read_only=True
    )
    bio = serializers.CharField(
        read_only=True
    )
    gender = serializers.CharField(
        read_only=True
    )
    pronouns = serializers.CharField(
        read_only=True
    )


class SearchProfileSerializer(serializers.Serializer):
    avatar = serializers.FileField(
        read_only=True
    )
    education = serializers.CharField(
        read_only=True
    )
    occupation = serializers.CharField(
        read_only=True
    )

class NotificationProfileSerializer(serializers.Serializer):
    avatar = serializers.FileField(
        read_only=True
    )

class UserSerializer(serializers.Serializer):
    created_at = serializers.DateTimeField(
        read_only=True
    )
    followers = serializers.StringRelatedField(
        many=True, 
        read_only=True,
    )
    following = serializers.StringRelatedField(
        many=True, 
        read_only=True,
    ) 
    profile = ProfileSerializer(
        read_only=True,
    )
    is_staff = serializers.BooleanField(
        read_only=True
    )
    is_asentient = serializers.BooleanField(
        read_only=True
    )
    is_accelerator = serializers.BooleanField(
        read_only=True
    )
    username = serializers.SlugField(
        read_only=True
    )
    first_name = serializers.CharField(
        read_only=True
    )
    last_name = serializers.CharField(
        read_only=True
    )
    id = serializers.UUIDField(
        read_only=True
    )

class GetUserSerializer(serializers.Serializer):
    created_at = serializers.DateTimeField(
        read_only=True
    )
    followers = serializers.StringRelatedField(
        many=True, 
        read_only=True,
    )
    following = serializers.StringRelatedField(
        many=True, 
        read_only=True,
    ) 
    profile = ProfileReadOnlySerializer(
        read_only=True,
    )
    is_asentient = serializers.BooleanField(
        read_only=True
    )
    is_accelerator = serializers.BooleanField(
        read_only=True
    )
    username = serializers.SlugField(
        read_only=True
    )
    first_name = serializers.CharField(
        read_only=True
    )
    last_name = serializers.CharField(
        read_only=True
    )

class SlimmedUserSerializer(serializers.Serializer):
    profile = SlimmedProfileSerializer(
        read_only=True,
    )
    is_asentient = serializers.BooleanField(
        read_only=True
    )
    is_accelerator = serializers.BooleanField(
        read_only=True
    )
    username = serializers.SlugField(
        read_only=True
    )
    first_name = serializers.CharField(
        read_only=True
    )
    last_name = serializers.CharField(
        read_only=True
    )

class SearchUserSerializer(serializers.Serializer):
    profile = SearchProfileSerializer(
        read_only=True,
    )
    username = serializers.SlugField(
        read_only=True
    )
    first_name = serializers.CharField(
        read_only=True
    )
    last_name = serializers.CharField(
        read_only=True
    )
    is_asentient = serializers.BooleanField(
        read_only=True
    )
    is_accelerator = serializers.BooleanField(
        read_only=True
    )

class SearchPopularUserSerializer(serializers.Serializer):
    profile = SearchProfileSerializer(
        read_only=True,
    )
    followers = serializers.StringRelatedField(
        many=True, 
        read_only=True,
    )
    username = serializers.SlugField(
        read_only=True
    )
    first_name = serializers.CharField(
        read_only=True
    )
    last_name = serializers.CharField(
        read_only=True
    )

class NotificationUserSerializer(serializers.Serializer):
    profile = NotificationProfileSerializer(
        read_only=True,
    )
    username = serializers.SlugField(
        read_only=True
    )
    first_name = serializers.CharField(
        read_only=True
    )
    last_name = serializers.CharField(
        read_only=True
    )

class SignupSerializer(UserSerializer):
    access = serializers.SerializerMethodField()
    refresh = serializers.SerializerMethodField()
    first_name = serializers.CharField(
        min_length=1, 
        max_length=50, 
        allow_blank=False,
    )
    last_name = serializers.CharField(
        min_length=1, 
        max_length=50, 
        allow_blank=False,
    )
    email = serializers.EmailField(
        min_length=3, 
        max_length=255, 
        allow_blank=False, 
        write_only=True,
    )
    date_of_birth = serializers.DateField(
        write_only=True,
    )
    password = serializers.CharField(
        min_length=6, 
        style={'input_type': 'password'}, 
        write_only=True,
    )

    class Meta:
        model = User
        fields = [
            "access",
            "refresh",
            "username",
            "first_name",
            "last_name",
            "date_of_birth",
            "email",
            "password",
            ]

    def get_access(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    
    def get_refresh(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token)        

    def validate_date_of_birth(self, date_of_birth):
        todays_date = date.today()
        if (
        date_of_birth.year + 13, date_of_birth.month, date_of_birth.day
        ) > (
        todays_date.year, todays_date.month, todays_date.day
        ):
            raise serializers.ValidationError('Must be at least 13 years old to register')
        return date_of_birth

class ChangePasswordSerializer(serializers.ModelSerializer):
    change_password = serializers.CharField(
        min_length=6, 
        style={'input_type': 'password'}, 
        write_only=True,
    )
    change_to_password =serializers.CharField(
        min_length=6, 
        style={'input_type': 'password'}, 
        write_only=True,
    )

    class Meta:
        model = User
        fields = [
            "change_password",
            "change_to_password",
        ]

    def validate_change_password(self, change_password):
        request = self.context.get("request")
        r_user = request.user
        if not r_user.check_password(change_password):
            raise serializers.ValidationError("Incorrect password.")
        return change_password