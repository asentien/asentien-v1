from django.contrib import admin

from .models import Post


class PostAdmin(admin.ModelAdmin):
    list_display = (
        "author",
        "id",
        "is_comment",
        "is_share",
        "is_active",
        "created_at",
    )
    list_filter = (
        "is_comment",
        "is_share",
        "is_active",
        "created_at",
    )

class BasePost(Post):
    class Meta:
        proxy = True

class BasePostAdmin(PostAdmin):    
    def get_queryset(self, parent):
        return self.model.objects.filter(
            parent=None, 
        )

class PostComment(Post):
    class Meta:
        proxy = True

class PostCommentAdmin(PostAdmin):   
    def get_queryset(self, is_comment):
        return self.model.objects.filter(
            is_comment=True, 
        )        

class PostShare(Post):
    class Meta:
        proxy = True

class PostShareAdmin(PostAdmin):   
    def get_queryset(self, is_share):
        return self.model.objects.filter(
            is_share=True,
        )

admin.site.register(Post, PostAdmin)
admin.site.register(BasePost, BasePostAdmin)
admin.site.register(PostComment, PostCommentAdmin)
admin.site.register(PostShare, PostShareAdmin)