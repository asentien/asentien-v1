from django.contrib.auth import get_user_model

from rest_framework import serializers

from users.serializers import SlimmedUserSerializer
from .models import Post

User = get_user_model()

class PostParentSerializer(serializers.Serializer):
    author = SlimmedUserSerializer(
        read_only=True,
    )
    title = serializers.CharField(
        read_only=True,
    )
    content = serializers.FileField(
        read_only=True,
    )
    body = serializers.CharField(
        read_only=True,
    )
    created_at = serializers.DateTimeField(
        read_only=True,
    )
    is_comment = serializers.BooleanField(
        read_only=True
    )
    is_share = serializers.BooleanField(
        read_only=True
    )
    id = serializers.UUIDField(
        read_only=True
    )

class SlimmedParentSerializer(serializers.Serializer):
    id = serializers.UUIDField(
        read_only=True
    )

class BasePostSerializer(serializers.ModelSerializer):
    author = SlimmedUserSerializer(
        read_only=True
    )
    title = serializers.CharField(
        required=False, 
        allow_blank=True
    )
    content = serializers.FileField(
        required=False, 
        allow_null=True
    )
    body = serializers.CharField(
        max_length=10001,
        required=False, 
        allow_blank=True
    )
    parent = PostParentSerializer(
        read_only=True
    )
    parent_id = serializers.UUIDField(
        required=False, 
        write_only=True, 
        allow_null=True,
    )
    is_active = serializers.BooleanField(
        default=True
    )
    reports = serializers.IntegerField(
        required=False, 
        write_only=True, 
        allow_null=True,
    )
   
    class Meta:
        model = Post
        fields = [
            "author",
            'title',
            'content',
            "body",
            "created_at",
            "likes",
            "dislikes",
            "id",
            "is_active",
            "is_comment",
            "is_share",
            "parent",
            "parent_id",
            "reports",
        ]
        read_only_fields =  [
            "created_at",
            "id",
        ]


class MinimizedPostSerializer(serializers.Serializer):
    id = serializers.UUIDField(read_only=True)
    
        
class PostSerializer(BasePostSerializer):
    comment_tally = serializers.SerializerMethodField()
    share_tally = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = BasePostSerializer.Meta.fields + [
            "comment_tally",
            "share_tally",
        ]

    def get_comment_tally(self, obj):
        return len(obj.comment_ids)

    def get_share_tally(self, obj):
        return len(obj.share_ids)
    

class CreatePostSerializer(BasePostSerializer):
    title = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=234,
    )
    body = serializers.CharField(
        required=True,
        allow_blank=False,
        max_length=10001,
    )
    content = serializers.FileField(
        required=False, 
        allow_null=True,
        default=None,
    )

class CommentSerializer(BasePostSerializer):
    author = SlimmedUserSerializer(
        read_only=True
    )
    body = serializers.CharField(
        required=True, 
        allow_blank=False,
        max_length=504,
    ) 
    is_comment = serializers.BooleanField(
        default=True,
    )
    parent = SlimmedParentSerializer(
        read_only=True,
    )
    parent_id = serializers.UUIDField(
        required=True, 
        write_only=True, 
        allow_null=False,
    )
    class Meta:
        model = Post
        fields = [
            "author",
            "body",
            "created_at",
            "likes",
            "dislikes",
            "id",
            "is_active",
            "is_comment",
            "parent_id",
            "parent",
        ]

class ShareSerializer(BasePostSerializer):
    author = SlimmedUserSerializer(
        read_only=True,
    )
    body = serializers.CharField(
        required=False, 
        allow_blank=True,
        max_length=504,
    ) 
    is_share = serializers.BooleanField(
        default=True,
    )
    parent = SlimmedParentSerializer(
        read_only=True,
    )
    parent_id = serializers.UUIDField(
        required=True, 
        write_only=True, 
        allow_null=False,
    )
    class Meta:
        model = Post
        fields = [
            "author",
            "body",
            "created_at",
            "likes",
            "dislikes",
            "id",
            "is_active",
            "is_share",
            "parent_id",
            "parent",
        ]


class PostDetailSerializer(BasePostSerializer):
    extra_kwargs = {
        "id": {"read_only": True},
        "created_at": {"read_only": True},
        "is_comment": {"read_only": True},
        "is_share": {"read_only": True},
        "parent_id": {"read_only": True},
    }