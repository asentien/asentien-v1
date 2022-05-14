from rest_framework.pagination import CursorPagination, PageNumberPagination

class BasePostPagination(CursorPagination):
    ordering = "-created_at"
    page_size = 10

class NestedPagination(CursorPagination):
    ordering = "created_at"
    page_size = 10

class PopularPostPagination(PageNumberPagination):
    ordering = None
    page_size = 10