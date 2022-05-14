from django.urls import path

from . import views

app_name = "notifications"

urlpatterns = [
    path("unread-count/", views.get_unread_notification_count_view, name="unread_count"),
    path("", views.NotificationsAPIView.as_view(), name="notifications"),
    path("<uuid:pk>/", views.remove_notification_view, name="remove_notification"),
]