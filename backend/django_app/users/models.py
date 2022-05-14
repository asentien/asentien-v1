import uuid
from django.contrib.auth.base_user import AbstractBaseUser as ABU
from django.db import models
from django.utils.timezone import now
from django.utils.translation import gettext_lazy as _
from django.core.validators import FileExtensionValidator

from .managers import UserManager
from utilities.models import (
    TimeStampsMixin as TSM,
    IsActiveMixin as IAM,
)
from utilities.storage_backends import (
    PrivateMediaStorage,
)


class User(IAM, TSM, ABU):

    email = models.EmailField(
        _("Email address"),
        max_length=255,
        unique=True,
        db_index=True,
    )
    first_name = models.CharField(
        _('First name'),
        max_length=50,
        db_index=True,
    )
    last_name = models.CharField(
        _('Last name'),
        max_length=50,
        db_index=True,
    )
    date_of_birth = models.DateField(
        _('Birthday'),
        max_length=10,
        db_index=True,
    )
    username = models.SlugField(
        _("Username"),
        max_length=115,
        unique=True,
        db_index=True,
        default=f"{uuid.uuid4()}"
    )
    following = models.ManyToManyField(
        "self",
        related_name="followers",
        symmetrical=False,
    )
    last_notification_read_time = models.DateTimeField(
        default=now, 
        db_index=True
    )
    is_admin = models.BooleanField(
        default=False,
    )
    is_asentient = models.BooleanField(
        default=False, 
        db_index=True
    )
    is_accelerator = models.BooleanField(
        default=False, 
        db_index=True
    )
    id = models.UUIDField(
        default=uuid.uuid4,  
        unique=True, 
        primary_key=True, 
        editable=False, 
        db_index=True
    )
    objects = UserManager()

    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = [
        'first_name',
        'last_name',
        'date_of_birth',
    ]

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_admin

    def follow(self, user: object) -> None:
        if user != self:
            self.following.add(user)

    def get_followers(self):
        return (
            self.followers.filter(is_active=True)
            .select_related("profile")
        )

    def get_following(self):
        return (
            self.following.filter(is_active=True)
            .select_related("profile")
        )

    def unfollow(self, user: object) -> None:
        self.following.remove(user)
    
    


class Profile(TSM, models.Model):
    user = models.OneToOneField(
        "users.User",
        on_delete=models.CASCADE,
    )
    avatar = models.FileField(
        _('Avatar'),
        upload_to="avatar/%Y/%m/%d/",
        storage=PrivateMediaStorage(),
        default="profile_avatar/default_profile_avatar.png",
        validators=[
            FileExtensionValidator(
                allowed_extensions=[
                    'png', "jpg", "jpeg"
                ]
            )
        ]
    )
    cover = models.FileField(
        _('Cover'),
        upload_to="cover/%Y/%m/%d/",
        storage=PrivateMediaStorage(),
        default="profile_cover/default_profile_cover.png",
        validators=[
            FileExtensionValidator(
                allowed_extensions=[
                    'png', "jpg", "jpeg"
                ]
            )
        ]
    )
    education = models.CharField(
        _('Education'),
        max_length=134,
        db_index=True,
        default='N/A',
    )
    occupation = models.CharField(
        _('Occupation'),
        max_length=134,
        db_index=True,
        default='N/A',
    )
    bio = models.TextField(
        _('Bio'),
        max_length=143,
        blank=True,
    )
    aptitudes = models.CharField(
        _('Aptitudes'),
        max_length=134,
        blank=True,
    )
    gender = models.CharField(
        _('Gender'),
        max_length=25,
        db_index=True,
        blank=True,
    )
    pronouns = models.CharField(
        _('Pronouns'),
        max_length=25,
        db_index=True,
        blank=True,
    )
    country = models.CharField(
        _('Country'),
        max_length=85,
        db_index=True,
        blank=True,
    )

    def __str__(self):
        return f"| Profile of {self.user.username} | Pronouns: {self.pronouns} | Occupation: {self.occupation} | Education: {self.education} | Country: {self.country} | Aptitudes: {self.aptitudes} |"


class Asentient(TSM, models.Model):
    user = models.OneToOneField(
        "users.User",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f"| Profile of {self.user.username} | is_asentient( {self.user.is_asentient} ) | became Asentient at {self.created_at} |"

class Accelerator(TSM, models.Model):
    user = models.OneToOneField(
        "users.User",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f"| Profile of {self.user.username} | is_accelerator( {self.user.is_accelerator} ) | became Accelerator at {self.created_at} |"


class AcceleratorDeactivatedUsers(TSM, models.Model):
    deactivated_user = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="deactivated"
    )
    deactivator_accelerator = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="deactivator"
    )

    def __str__(self):
        return f"{self.deactivated_user.username} was deactivated by {self.deactivator_accelerator.username}"