from django.contrib.auth.base_user import BaseUserManager as BUM
from django.utils.translation import gettext_lazy as _
from django.db import models


class UserQuerySet(models.QuerySet):
    def active(self):
        return self.filter(is_active=True).select_related("profile").select_related("asentient").select_related("accelerator")

class UserManager(BUM):

    def create_user(self, email, first_name, last_name, date_of_birth, password=None, **extra_fields):
        if not email:
            raise ValueError(_('What is your email address?'))
        if not first_name:
            raise ValueError(_('What is your first name?'))
        if not last_name:
            raise ValueError(_('What is your last name?'))
        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            date_of_birth=date_of_birth,
            **extra_fields,
        )
        user.set_password(password)
        user.is_active = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, date_of_birth, password=None, **extra_fields):
        user = self.create_user(
            email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            date_of_birth=date_of_birth,
            **extra_fields,
        )
        user.is_admin = True
        user.is_active = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

    def active(self):
        return self.get_queryset().active()

    def get_queryset(self):
        return UserQuerySet(self.model, using=self._db)