import uuid
from django.db import models

from utilities.models import (
    TimeStampsMixin as TSM,
    IsActiveMixin as IAM,
)


class Notification(IAM, TSM):
    class NotificationChoices(models.IntegerChoices):
        NEW_FOLLOWER = 1
        POST_LIKED = 2
        POST_COMMETED_ON = 3
        POST_SHARED = 4
        PROMOTED_TO_ASENTIENT_STATUS = 5
        PROMOTED_TO_ACCELERATOR_STATUS = 6

    choice = models.PositiveIntegerField(
        choices=NotificationChoices.choices
    )
    sender = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="notification_sender",
    )
    receiver = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="notifications",
    )
    is_read = models.BooleanField(
        default=False
    )
    post = models.ForeignKey(
        "posts.Post",
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        related_name="notification_post",
    )
    id = models.UUIDField(
        default=uuid.uuid4,  
        unique=True, 
        primary_key=True, 
        editable=False, 
        db_index=True
    )

    def __str__(self):
        return f"{self.from_user.username} => {self.to_user.username} : Type {self.choice} : ID {self.id}"