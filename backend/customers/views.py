from django.contrib.auth import login as django_login, logout as django_logout
from django.http import Http404
from django.contrib.contenttypes.models import ContentType

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework import status, filters, exceptions, viewsets


from .serializers import CustomerSerializer, SimpleCustomerSerializer
from .models import Customer


class CustomerViewset(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['id', 'datacom__id', 'partner__id', 'company__id', 'user__id']
    search_fields = ['id',  'datacom__id', 'partner__id', 'company__id', 'user__id']
    ordering_fields = '__all__'
    ordering = ['user__full_name']

class CustomerListViewset(viewsets.ModelViewSet):
    serializer_class = SimpleCustomerSerializer
    queryset = Customer.objects.all()



