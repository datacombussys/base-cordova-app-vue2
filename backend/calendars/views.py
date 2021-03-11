
from django.contrib.auth import login as django_login, logout as django_logout
from django.http import Http404
from django.contrib.contenttypes.models import ContentType

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework import status, filters, exceptions, viewsets


from .serializers import CalendarSerializer
from .models import Calendar


class CalendarViewset(viewsets.ModelViewSet):
    """CRUD from Viewset"""
    serializer_class = CalendarSerializer
    queryset = Calendar.objects.all()
    authentication_classes = (TokenAuthentication, )
    # permission_classes = (IsAuthenticated, )
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['start', 'title']
    search_fields = ['start', 'title']