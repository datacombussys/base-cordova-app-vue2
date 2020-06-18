from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from rest_framework import status, filters, exceptions, viewsets

from .serializers import SalesTaxSerializer
from .models import SalesTax


class SalesTaxViewset(viewsets.ModelViewSet):
    """Handle CRUD Operations
    Methods: list, create, retrieve, 
    update, partial_update, destroy"""
    serializer_class = SalesTaxSerializer
    queryset = SalesTax.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['id', 'datacom__id', 'partner__id', 'company__id']
    search_fields = ['id',  'datacom__id', 'partner__id', 'company__id']
    ordering_fields = '__all__'
    ordering = ['id']
