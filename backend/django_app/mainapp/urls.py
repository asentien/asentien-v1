from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/v1/contact/", include("contact.urls")),
    path("api/v1/posts/", include("posts.urls")),
    path("api/v1/search/", include("search.urls")),
    path("api/v1/users/", include("users.urls")),
    path("api/v1/notifications/", include("notifications.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)