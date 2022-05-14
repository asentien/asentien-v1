import uuid
from django.core.validators import FileExtensionValidator
from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

from .managers import PostManager
from utilities.models import (
    TimeStampsMixin as TSM,
    IsActiveMixin as IAM,
)
from utilities.storage_backends import (
    PrivateMediaStorage,
)

User = get_user_model()


class Post(IAM, TSM, models.Model):

    author = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="posts",
    )
    title = models.CharField(
        _("Title"),
        blank=True,
        max_length=255,
    )
    content = models.FileField(
        _("Images and Videos"),
        upload_to="content/%Y/%m/%d/",
        storage=PrivateMediaStorage(),
        blank=True,
        null=True,
        validators=[
            FileExtensionValidator(
                allowed_extensions=[
                    'png', "jpg", "jpeg", "gif", "mp4", "mov"
                ]
            )
        ]
        
    )
    body = models.TextField(
        _("Body"),
        max_length=10001,
        blank=True,
        db_index=True,
    )
    parent = models.ForeignKey(
        "self",
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        related_name="ancestor",
    )
    is_comment = models.BooleanField(
        default=False,
    )
    is_share = models.BooleanField(
        default=False,
    )
    likes = models.ManyToManyField(
        "users.User",
        blank=True,
        related_name="likes",
    )
    dislikes = models.ManyToManyField(
        "users.User",
        blank=True,
        related_name="dislikes",
    )
    reports = models.PositiveIntegerField(
        blank=True,
        null=True,
        default=0,
    )
    id = models.UUIDField(
        default=uuid.uuid4,  
        unique=True, 
        primary_key=True, 
        editable=False, 
        db_index=True
    )

    objects = PostManager.as_manager()

    def __str__(self):
        return f"| Post by {self.author.username} | is_comment: {self.is_comment} | is_share: {self.is_share} | Post id: {self.id} | Created at: {self.created_at} |"
        
    def get_post_comments(self):
        return self.ancestor.filter(
            is_active=True,
            author__is_active=True, 
            is_comment=True, 
            is_share=False
        )

    def get_post_shares(self):
        return self.ancestor.filter(
            is_active=True,
            author__is_active=True,  
            is_comment=False, 
            is_share=True
        ).order_by(
            "created_at"
        )

        
class AcceleratorDeactivatedPosts(TSM, models.Model):
    post_deactivated_author = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="post_deactivated_author"
    )
    post_deactivator_accelerator = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="post_deactivator"
    )
    post = models.ForeignKey(
        "posts.Post",
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        related_name="deactivated_post",
    )

    def __str__(self):
        return f"Post by {self.post_deactivated_author.username} was deactivated by {self.deactivator_accelerator.username}"                