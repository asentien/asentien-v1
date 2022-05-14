from django.db.models import Q, Count

from rest_framework import filters, generics
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth import get_user_model

from .pagination import SearchPagination, PopularUserPagination
from users.serializers import SearchUserSerializer, SearchPopularUserSerializer

User = get_user_model()

class SearchAPIView(generics.ListAPIView):
    filter_backends = [filters.SearchFilter]
    pagination_class = SearchPagination
    permission_classes = [IsAuthenticated]
    search_fields = ["username", "first_name", "last_name"]
    serializer_class = SearchUserSerializer

    def get_queryset(self):
        return (
            User.objects.filter(Q(is_active=True, is_admin=False))
            .select_related("profile")
        )


class SearchPopularAPIView(generics.ListAPIView):
    filter_backends = [filters.SearchFilter]
    pagination_class = PopularUserPagination
    permission_classes = [IsAuthenticated]
    search_fields = ["username", "first_name", "last_name"]
    serializer_class = SearchPopularUserSerializer

    def get_queryset(self):
        return (
            User.objects.filter(Q(is_active=True, is_admin=False))
            .select_related("profile").prefetch_related("followers") \
            .annotate(q_count=Count('followers')) \
            .order_by('-q_count').distinct()
        )