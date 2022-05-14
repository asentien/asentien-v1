from django.urls import path, include

from . import views

app_name = "posts"


urlpatterns = [
    path('create-post/', views.CreatePostAPIView.as_view(), name='create_post'),
    path("create-comment/", views.CreateCommentAPIView.as_view(), name="create-comment"),
    path("create-share/", views.CreateShareAPIView.as_view(), name="create_repost"),
    path("<uuid:pk>/", views.PostDetailAPIView.as_view(), name="post_detail"),
    path("<uuid:pk>/delete/", views.PostDetailDeleteAPIView.as_view(), name="post_detail_delete"),
    path("<uuid:pk>/dislikes/", views.DislikesAPIView.as_view(), name="dislikes"),
    path("<uuid:pk>/likes/", views.LikesAPIView.as_view(), name="likes"),
    path("<uuid:pk>/create-report/", views.CreateReportAPIView.as_view(), name="create-report"),
    path("<uuid:pk>/comments/", views.ListCommentsAPIView.as_view(), name="list_comments"),
    path("<uuid:pk>/shares/", views.ListSharesAPIView.as_view(), name="list_shares"),
    path(
        "<str:username>/posts/",
        views.UserPostsAPIView.as_view(),
        name="users_posts",
    ),
    path("home/", views.HomeFeedAPIView.as_view(), name="home_feed"),
    path("public/", views.PublicFeedAPIView.as_view(), name="public_feed"),
    path("popular/", views.PopularFeedAPIView.as_view(), name="popular_feed"),   
    path("hashtag/<str:hashtag>/", views.HashtagFeedAPIView.as_view(), name="hashtag_feed"),
    path("hashtags/", views.HashtagsFeedAPIView.as_view(), name="hashtag_feed"),
]