from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    class Meta:
        model = Contact
        fields = [
            'author',
            'subject',
            "message",
        ]
