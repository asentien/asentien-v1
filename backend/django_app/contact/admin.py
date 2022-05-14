from django.contrib import admin

from .models import Contact

class ContactAdmin(admin.ModelAdmin):
    model = Contact

    list_filter = (
        "created_at",
        "is_read",
        "is_closed",
    )
    search_fields = (
        "subject",
    )
    
admin.site.register(Contact, ContactAdmin)