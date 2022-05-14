from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from django.utils.text import slugify
from django.contrib.auth.hashers import make_password
from django.contrib.auth import  get_user_model
from django.shortcuts import get_object_or_404

from notifications.models import Notification
from utilities.permissions import IsAccelerator
from utilities.views import PaginationMixin
from .pagination import UserPagination
from .serializers import (
    GetUserSerializer, 
    ProfileSerializer, 
    UserSerializer, 
    SignupSerializer, 
    ProfileAvatarSerializer, 
    ProfileCoverSerializer, 
    ChangePasswordSerializer,
    SearchUserSerializer
)
from .models import (
    Accelerator, 
    Asentient, 
    AcceleratorDeactivatedUsers
)

User = get_user_model()

class SignupAPIView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):

        r_d = request.data
        serializer = SignupSerializer(data=request.data, context={'request': request})
        
        first_name = r_d.get("first_name")
        last_name = r_d.get("last_name")
        email = r_d.get("email")
        password = r_d.get("password")
        date_of_birth = r_d.get("date_of_birth")

        base_username = slugify(f"{first_name}-{last_name}")
        qs = User.objects.filter(username__iexact=f"{base_username}-1").count()
        count = 1
        username = f"{base_username}-{count}"
        while(qs):
            username = slugify(f"{base_username}-{count}")
            count += 1
            qs = User.objects.filter(
                username__iexact=username).count()
            username = username

        try:
            if serializer.is_valid(raise_exception=True):
                serializer = SignupSerializer(
                    User.objects.create(
                        first_name=first_name,
                        last_name=last_name,
                        email=email,
                        date_of_birth=date_of_birth,
                        password=make_password(password),
                        username=username
                    ), many=False)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data)
        

class GetUserDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    authentication_classes = ()
    serializer_class = GetUserSerializer

    def get_object(self):
        return get_object_or_404(User, username=self.kwargs.get("username"), is_active=True)

class ChangePasswordAPIView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer

    def update(self, request):
        r_u = request.user
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            change_to_password = serializer.validated_data.get("change_to_password")
            r_u.set_password(change_to_password)
            r_u.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetCurrentUserAPIView(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class UpdateProfileAPIView(generics.UpdateAPIView):
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user.profile

class UpdateProfileAvatarAPIView(generics.UpdateAPIView):
    serializer_class = ProfileAvatarSerializer

    def get_object(self):
        return self.request.user.profile

class UpdateProfileCoverAPIView(generics.UpdateAPIView):
    serializer_class = ProfileCoverSerializer

    def get_object(self):
        return self.request.user.profile

class DeactivateUserDetailAPIView(APIView):
    serializer_class = GetUserSerializer

    def delete(self, request, username):
        deactivate_user = get_object_or_404(User, is_active=True, username=username)
        r_u = request.user
        if r_u == deactivate_user:
            deactivate_user.is_active = False
            deactivate_user.delete()
            deactivate_user.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        elif r_u.is_accelerator and not deactivate_user.is_asentient:
            deactivate_user.is_active = False
            deactivate_user.delete()
            deactivate_user.save()
            AcceleratorDeactivatedUsers.objects.create(
                deactivator_accelerator=r_u,
                deactivated_user=deactivate_user,
            )
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)

class FollowersAPIView(generics.ListAPIView):
    pagination_class = UserPagination
    serializer_class = SearchUserSerializer

    def get_queryset(self):
        return get_object_or_404(User, is_active=True, username=self.kwargs.get("username")).get_followers()


class FollowingAPIView(APIView, PaginationMixin):
    pagination_class = UserPagination

    def _get_object(self, username):
        return get_object_or_404(User, is_active=True, username=username)

    def delete(self, request, username):
        user = self._get_object(username)
        r_u = request.user
        r_u.unfollow(user)
        if r_u != user:
            Notification.objects.filter(
                sender=r_u,
                receiver=user,
                choice=1,
            ).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request, username):
        paginated_following = self.paginator.paginate_queryset(self._get_object(username).get_following(), self.request)
        serializer = SearchUserSerializer(paginated_following, many=True)
        return self.paginator.get_paginated_response(serializer.data)

    def post(self, request, username):
        user = self._get_object(username)
        r_u = request.user
        r_u.follow(user)
        if r_u != user:
            Notification.objects.create(
                sender=r_u,
                receiver=user,
                choice=1,
            )
        return Response(status=status.HTTP_201_CREATED)


class AsentientPromotionAPIView(APIView):
    permission_classes = [IsAccelerator]

    def post(self, request, username):
        user = get_object_or_404(User, is_active=True, username=username, is_asentient=False)
        r_u = request.user
        if r_u != user and r_u.is_accelerator:
            Asentient.objects.create(
                user = user,
            )
            user.is_asentient = True
            user.save()
            Notification.objects.create(
                sender=r_u,
                receiver=user,
                choice=5,
            )
        return Response(status=status.HTTP_201_CREATED)
        

class AcceleratorPromotionAPIView(APIView):
    def post(self, request, username):
        user = get_object_or_404(User, is_active=True, username=username, is_accelerator=False)
        r_u = request.user
        if r_u != user:
            if user.is_asentient:
                Accelerator.objects.create(
                    user = user,
                )
                user.is_accelerator = True
                user.save()
                Notification.objects.create(
                    sender = r_u,
                    receiver = user,
                    choice = 6,
                )
            if not user.is_asentient:
                Asentient.objects.create(
                    user = user,
                )
                user.is_asentient = True
                Notification.objects.create(
                    sender = r_u,
                    receiver = user,
                    choice = 5,
                )
                Accelerator.objects.create(
                    user = user,
                )
                user.is_accelerator = True
                user.save()
                Notification.objects.create(
                    sender=r_u,
                    receiver=user,
                    choice=6,
                )
        return Response(status=status.HTTP_201_CREATED)