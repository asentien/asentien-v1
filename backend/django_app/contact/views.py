from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ContactSerializer

class CreateContactAPIView(APIView):
    def post(self, request, format=None):
        serializer = ContactSerializer(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save(author=self.request.user)
            return Response(serializer.data)
        return Response(serializer.errors)
        