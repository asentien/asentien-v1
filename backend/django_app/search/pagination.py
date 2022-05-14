from rest_framework.pagination import CursorPagination, PageNumberPagination


class SearchPagination(CursorPagination):
    ordering = "-created_at"
    page_size = 10

class PopularUserPagination(PageNumberPagination):
    ordering = None
    page_size = 10