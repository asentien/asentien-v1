import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from utilities.models import (
    TimeStampsMixin as TSM,
    IsActiveMixin as IAM,
)

User = get_user_model()


class Contact(IAM, TSM):
    subject = models.CharField(
        _("Contact subject"), 
    max_length=234
    )
    message = models.TextField(
        _("Contact message"), 
        max_length=1001
    )
    author = models.ForeignKey(
        "users.User",
        on_delete=models.SET_NULL,
        related_name="Contact_author",
        null=True,
        db_index=True,
    )
    is_read = models.BooleanField(
        default=False,
        db_index=True,
    )
    is_closed = models.BooleanField(
        default=False,
        db_index=True,
    )
    id = models.UUIDField(
        default=uuid.uuid4,  
        unique=True, 
        primary_key=True, 
        editable=False, 
        db_index=True,
    )

    def __str__(self):
        return f" Contact is_read( {self.is_read} ) is_closed( {self.is_closed} ) "