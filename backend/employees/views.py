from django.http import Http404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from rest_framework import status, filters, exceptions, viewsets

from .serializers import EmployeeSerializer, PositionsSerializer, EmployeeListSerializer, EmployeeModulesManagerSerializer
from .models import Employee, Position

class EmployeeViewset(viewsets.ModelViewSet):
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
    serializer_class = PositionsSerializer
    queryset = Position.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['datacom__id', 'partner__id', 'company__id']
    search_fields = ['datacom__id', 'partner__id', 'company__id']
    ordering_fields = '__all__'
    ordering = ['name']

    
class EmployeeListViewset(viewsets.ModelViewSet):
    serializer_class = EmployeeListSerializer
    queryset = Employee.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['datacom__id', 'partner__id', 'company__id', 'vendor__id', 'user__id']
    search_fields = ['datacom__id', 'partner__id', 'company__id', 'vendor__id', 'user__id']
    ordering_fields = '__all__'
    ordering = ['user__full_name']

class EmployeeModulesManagerViewset(viewsets.ModelViewSet):
    serializer_class = EmployeeModulesManagerSerializer
    queryset = Employee.objects.all()


