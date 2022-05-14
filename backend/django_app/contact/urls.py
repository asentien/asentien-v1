from django.urls import path

from . import views

app_name = "contact"

urlpatterns = [
    path("create-contact/", views.CreateContactAPIView.as_view(), name="contact"),
]