from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.shortcuts import get_object_or_404
from django.utils.timezone import now

from .models import Notification
from .pagination import NotificationPagination
from .serializers import NotificationSerializer


@api_view(['GET'])
def get_unread_notification_count_view(request):
    r_u = request.user
    count = Notification.objects.filter(
        receiver=r_u,
        created_at__gt=r_u.last_notification_read_time,
    ).select_related("receiver").count()
    return Response(count, status=status.HTTP_200_OK)

class NotificationsAPIView(generics.ListAPIView):
    pagination_class = NotificationPagination
    serializer_class = NotificationSerializer

    def get_queryset(self):
        r_u = self.request.user
        r_u.last_notification_read_time = now()
        r_u.save()
        return Notification.objects.filter(receiver=r_u, sender__is_active=True) \
            .select_related("sender__profile") \
            .select_related("sender") \
            .select_related("post")


@api_view(["delete"])
def remove_notification_view(request, pk):
    get_object_or_404(Notification, id=pk, receiver=request.user).delete()
    return Response(status=status.HTTP_204_NO_CONTENT)