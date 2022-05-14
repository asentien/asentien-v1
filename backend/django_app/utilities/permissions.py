from rest_framework import permissions, status
from rest_framework.response import Response

class IsOwner(permissions.BasePermission):
    message = 'Only the user themselves can view this.'

    def has_permission(self, request, view, obj):
        if request.user == obj.author:
            return True
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

class IsAccelerator(permissions.BasePermission):
    message = 'Contribute quality content to become an Accelerator.'

    def has_permission(self, request, view):
        if request.user.is_accelerator:
            return True
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)


class IsAsentient(permissions.BasePermission):
    message = 'Contribute quality content to become an Asentient.'

    def has_permission(self, request, view):
        if request.user.is_asentient:
            return True
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)