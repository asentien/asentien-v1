from django import forms
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BUA
from django.contrib.auth.forms import ReadOnlyPasswordHashField

from .models import User, Accelerator, Asentient, Profile, AcceleratorDeactivatedUsers


class UserCreationForm(forms.ModelForm):
    password = forms.CharField(label='Password', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'date_of_birth', 'is_active', "is_asentient", "is_accelerator", "username")

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'username', 'password', 'date_of_birth',
                  'is_active', 'is_admin', "is_asentient", "is_accelerator", "following")


class UserAdmin(BUA):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ('username', 'email', 'date_of_birth',
                    'is_admin', 'created_at', 'id', 'is_active', "is_asentient", "is_accelerator")
    list_filter = ('is_admin', 'created_at',  'is_active', "is_asentient", "is_accelerator")
    fieldsets = (
        (None, {'fields': ('email', 'password',
        'username')}),
        ('Personal info', {
         'fields': ('first_name', 'last_name', 'date_of_birth')}),
        ('Permissions', {'fields': ('is_admin', 'is_active', "is_asentient", "is_accelerator")}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'date_of_birth', 'username', 'password'),
        }),
    )
    search_fields = ('email', 'username', 'first_name', 'last_name')
    ordering = ('email',)
    filter_horizontal = ()



class AsentientAdmin(admin.ModelAdmin):
    model = Asentient

    list_filter = (
        "created_at",
    )
    search_fields = (
        "created_at",
    )


class AcceleratorAdmin(admin.ModelAdmin):
    model = Accelerator

    list_filter = (
        "created_at",
    )
    search_fields = (
        "created_at",
    )


class ProfileAdmin(admin.ModelAdmin):
    model = Profile

    list_filter = (
        "created_at",
        "updated_at",
    )
    search_fields = (
        "education",
        "occupation",
        "country",
        "created_at",
    )
    

admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Accelerator, AcceleratorAdmin)
admin.site.register(Asentient, AsentientAdmin)
admin.site.register(AcceleratorDeactivatedUsers)
admin.site.unregister(Group)
