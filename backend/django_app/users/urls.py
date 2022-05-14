from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views



urlpatterns = [
    path('signup/', views.SignupAPIView.as_view(), name='signup'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('refresh-token/', TokenRefreshView.as_view(), name='refresh_token'),
    path("update-profile/", views.UpdateProfileAPIView.as_view(), name="update_profile"),
    path("update-profile-avatar/", views.UpdateProfileAvatarAPIView.as_view(), name="update_profile_avatar"),
    path("update-profile-cover/", views.UpdateProfileCoverAPIView.as_view(), name="update_profile_cover"),
    path("change-password/", views.ChangePasswordAPIView.as_view(), name="change_password"),
    path("get-current-user/", views.GetCurrentUserAPIView.as_view(), name="get_current_user"),
    path("<str:username>/asentient-promotion/", views.AsentientPromotionAPIView.as_view(), name="asentient_promotion"),
    path("<str:username>/accelerator-promotion/", views.AcceleratorPromotionAPIView.as_view(), name="accelerator_promotion"),
    path("<str:username>/", views.GetUserDetailAPIView.as_view(), name="user_detail"),
    path("<str:username>/deactivate/", views.DeactivateUserDetailAPIView.as_view(), name="deactivate_user_detail"),
    path("<str:username>/following/", views.FollowingAPIView.as_view(), name="following"),
    path("<str:username>/followers/", views.FollowersAPIView.as_view(), name="followers"),
]

app_name = "users"