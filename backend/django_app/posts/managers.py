from django.contrib.auth import get_user_model
from django.contrib.postgres.aggregates import ArrayAgg
from django.db.models import Q, QuerySet, Count

User = get_user_model()


class PostManager(QuerySet):
    def active(self):
        return self.filter(Q(author__is_active=True, is_active=True))

    def posts(self):
        comment_ids = ArrayAgg(
            "ancestor__id",
            filter=Q(
                ancestor__is_comment=True, 
                ancestor__is_share=False, 
                author__is_active=True,
                is_active=True,
                ancestor__is_active=True
            ),
        )
        share_ids = ArrayAgg(
            "ancestor__id",
            filter=Q(
                ancestor__is_comment=False,
                ancestor__is_share=True,
                author__is_active=True,
                is_active=True,
                ancestor__is_active=True
            ),
        )
        return (
            self.active()
            .prefetch_related("likes")
            .prefetch_related("dislikes")
            .select_related("author")
            .select_related("author__profile")
            .select_related("parent")
            .annotate(
                comment_ids=comment_ids,
                share_ids=share_ids,
            )
        )

    def home_feed(self, user: User):
        return (
            self.posts().filter(Q(author__followers=user) | Q(author=user)).distinct()
        )

    def user_posts(self, user: User):
        return self.posts().filter(author=user)

    def public_feed(self):
        return self.posts().filter(Q(parent=None), Q(author__is_asentient=True) | Q(author__is_accelerator=True))

    def popular_feed(self):
        return self.posts() \
            .annotate(q_count=Count('likes')) \
            .order_by('-q_count').distinct()
            
    def hashtags_feed(self):
        return self.posts().filter(body__icontains="#")