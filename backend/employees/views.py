from django.contrib.auth import login as django_login, logout as django_logout
from django.http import Http404
from django.contrib.contenttypes.models import ContentType

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework import status, filters, exceptions, viewsets


from .serializers import EmployeeSerializer, PositionsSerializer
from .models import Employee, Position


class EmployeeViewset(viewsets.ModelViewSet):
    """Handle Creating and Updating User Profiles.
    Methods: list, create, retrieve, 
    update, partial_update, destroy"""
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()
    authentication_classes = (TokenAuthentication, )
    # permission_classes = (IsAuthenticated, )
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['datacom__id', 'partner__id', 'company__id', 'vendor__id', 'user__id']
    search_fields = ['datacom__id', 'partner__id', 'company__id', 'vendor__id', 'user__id']
    ordering_fields = '__all__'
    ordering = ['user__full_name']

class PositionsViewset(viewsets.ModelViewSet):
    """CRUD for User Permissions"""
    serializer_class = PositionsSerializer
    queryset = Position.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['datacom__id', 'partner__id', 'company__id']
    search_fields = ['datacom__id', 'partner__id', 'company__id']
    ordering_fields = '__all__'
    ordering = ['name']


