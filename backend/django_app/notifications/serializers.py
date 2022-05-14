from rest_framework import serializers

from posts.serializers import MinimizedPostSerializer
from users.serializers import NotificationUserSerializer

class NotificationSerializer(serializers.Serializer):
    id = serializers.UUIDField(
        read_only=True
    )
    created_at = serializers.DateTimeField(
        read_only=True
    )
    choice = serializers.IntegerField(
        read_only=True
    )
    sender = NotificationUserSerializer(
        read_only=True
    )
    
    post = MinimizedPostSerializer(
        read_only=True
    )
   
  