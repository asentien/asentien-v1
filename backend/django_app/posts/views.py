from rest_framework import filters, generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from django.contrib.auth import  get_user_model
from django.shortcuts import get_object_or_404

from notifications.models import Notification
from utilities.permissions import IsAccelerator, IsAsentient
from utilities.views import PaginationMixin
from users.serializers import SearchUserSerializer
from .models import Post, AcceleratorDeactivatedPosts
from .pagination import (
    BasePostPagination, 
    NestedPagination,
    PopularPostPagination, 
)
from .serializers import (
    PostDetailSerializer,
    CreatePostSerializer,
    PostSerializer,
    CommentSerializer,
    ShareSerializer,
)

User = get_user_model()

class UserPostsAPIView(generics.ListAPIView):
    pagination_class = BasePostPagination
    permission_classes = [AllowAny]
    authentication_classes = ()
    serializer_class = PostSerializer

    def get_queryset(self):
        username = self.kwargs.get("username")
        user = get_object_or_404(User, is_active=True, username=username)
        return Post.objects.user_posts(user)

class HomeFeedAPIView(generics.ListAPIView):

    pagination_class = BasePostPagination
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.home_feed(self.request.user)

class HashtagFeedAPIView(generics.ListAPIView):
    filter_backends = [filters.SearchFilter]
    pagination_class = BasePostPagination
    search_fields = ["body"]
    serializer_class = PostSerializer

    def get_queryset(self):
        hashtag = self.kwargs['hashtag']
        if hashtag is not None:
            return Post.objects.posts().filter(body__icontains=f"#{hashtag}")

class HashtagsFeedAPIView(generics.ListAPIView):
    pagination_class = BasePostPagination
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.hashtags_feed()

class PublicFeedAPIView(generics.ListAPIView):
    pagination_class = BasePostPagination
    permission_classes = [AllowAny]
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.public_feed()

class PopularFeedAPIView(generics.ListAPIView):
    pagination_class = PopularPostPagination
    permission_classes = [AllowAny]
    authentication_classes = ()
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.popular_feed()

class DislikesAPIView(APIView, PaginationMixin):
    pagination_class = NestedPagination

    def get_post_object(self, pk) -> Post:
        return get_object_or_404(Post, id=pk, is_active=True)

    def delete(self, request, pk):
        self.get_post_object(pk).dislikes.remove(request.user)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self, request, pk):
        self.get_post_object(pk).dislikes.add(request.user)
        return Response(status=status.HTTP_201_CREATED)

class LikesAPIView(APIView, PaginationMixin):
    pagination_class = NestedPagination

    def get_post_object(self, pk) -> Post:
        return get_object_or_404(Post, id=pk, is_active=True)

    def delete(self, request, pk):
        r_u = request.user
        post = self.get_post_object(pk)
        post.likes.remove(r_u)
        Notification.objects.filter(
            sender=r_u,
            receiver=post.author,
            choice=2,
            post=post,
        ).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request, pk):
        paginated_post_likes = self.paginator.paginate_queryset(
            self.get_post_object(pk).likes.filter(is_active=True)  \
            .select_related("profile"), self.request
        )
        serializer = SearchUserSerializer(paginated_post_likes, many=True)
        return self.paginator.get_paginated_response(serializer.data)

    def post(self, request, pk):
        r_u = request.user
        post = self.get_post_object(pk)
        post.likes.add(r_u)
        if r_u != post.author:
            Notification.objects.create(
                sender=r_u,
                receiver=post.author,
                choice=2,
                post=post,
            )
        return Response(status=status.HTTP_201_CREATED)


class CreateReportAPIView(APIView):
    def get_post_object(self, pk) -> Post:
        return get_object_or_404(Post, id=pk, is_active=True)

    def post(self, request, pk):
        post = self.get_post_object(pk)
        post.reports += 1
        post.save()
        return Response(status=status.HTTP_201_CREATED)

class CreateCommentAPIView(APIView):
    def post(self, request, format=None):
        serializer = CommentSerializer(data=request.data, context={'request': request})
        parent_post_id = self.request.data.get("parent_id")
        parent_post = get_object_or_404(Post, id=parent_post_id, is_active=True)
        r_u = self.request.user
        if serializer.is_valid(raise_exception=True):
            serializer.save(author=r_u, is_comment=True)
            if r_u != parent_post.author:
                Notification.objects.create(
                    sender=r_u,
                    receiver=parent_post.author,
                    choice=3,
                    post=parent_post,
                )
            return Response(serializer.data)
        return Response(serializer.errors)   

class CreateShareAPIView(APIView):
    def post(self, request, format=None):
        serializer = ShareSerializer(data=request.data, context={'request': request})
        parent_post_id = self.request.data.get("parent_id")
        parent_post = get_object_or_404(Post, id=parent_post_id, is_active=True)
        r_u = self.request.user
        if serializer.is_valid(raise_exception=True):
            serializer.save(author=r_u, is_share=True)
            if r_u != parent_post.author:
                Notification.objects.create(
                    sender=r_u,
                    receiver=parent_post.author,
                    choice=4,
                    post=parent_post,
                )
            return Response(serializer.data)
        return Response(serializer.errors)       


class CreatePostAPIView(APIView):
    permission_classes = [IsAsentient]
    
    def post(self, request, format=None):
        serializer = CreatePostSerializer(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save(author=self.request.user)
            return Response(serializer.data)
        return Response(serializer.errors)

class PostDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    authentication_classes = ()
    serializer_class = PostDetailSerializer

    def get_queryset(self):
        return Post.objects.filter(pk=self.kwargs.get("pk")).active()

class PostDetailDeleteAPIView(APIView):
    serializer_class = PostDetailSerializer

    def delete(self, request, pk):
        deactivate_post = get_object_or_404(Post, id=pk, is_active=True)
        r_u = request.user
        if r_u == deactivate_post.author:
            deactivate_post.is_active = False
            deactivate_post.delete()
            deactivate_post.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        elif r_u.is_accelerator and not deactivate_post.author.is_accelerator:
            deactivate_post.is_active = False
            deactivate_post.save()
            AcceleratorDeactivatedPosts.objects.create(
                post_deactivator_accelerator=r_u,
                post_deactivated_author=deactivate_post.author,
                post=deactivate_post,
            )
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)        



class ListCommentsAPIView(generics.ListAPIView):
    pagination_class = NestedPagination
    permission_classes = [AllowAny]
    authentication_classes = ()
    serializer_class = CommentSerializer

    def get_queryset(self):
        pk = self.kwargs.get("pk")
        post = get_object_or_404(Post, pk=pk, is_active=True, author__is_active=True)
        return post.get_post_comments() \
            .select_related("author") \
            .select_related("author__profile") \
            .select_related("parent") \
            .prefetch_related("likes") \
            .prefetch_related("dislikes") \

class ListSharesAPIView(generics.ListAPIView):
    pagination_class = NestedPagination
    permission_classes = [AllowAny]
    authentication_classes = ()
    serializer_class = ShareSerializer

    def get_queryset(self):
        pk = self.kwargs.get("pk")
        post = get_object_or_404(Post, pk=pk, is_active=True, author__is_active=True)
        return post.get_post_shares()  \
            .select_related("author") \
            .select_related("author__profile") \
            .select_related("parent") \
            .prefetch_related("likes") \
            .prefetch_related("dislikes") \

class ReportedFeedAPIView(generics.ListAPIView):
    pagination_class = BasePostPagination
    permission_classes = [IsAccelerator]
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.posts().ordering("reports")

