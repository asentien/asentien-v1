from django.urls import path

from . import views

app_name = "search"

urlpatterns = [
    path("", views.SearchAPIView.as_view(), name="search"),
    path("popular/", views.SearchPopularAPIView.as_view(), name="search_popular"),
]