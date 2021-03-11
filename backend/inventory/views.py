from rest_framework import status, filters, exceptions, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.renderers import (
                                        HTMLFormRenderer, 
                                        JSONRenderer, 
                                        BrowsableAPIRenderer,
                                    )

from django_filters.rest_framework import DjangoFilterBackend


from storages.backends.s3boto3 import S3Boto3Storage

from .serializers import (InventorySerializer, 
                        InventoryListSerializer, 
                        InventoryBarcodeSerializer, 
                        InventoryGallerySerializer, 
                        InvCategoryClassSerializer, 
                        InvCategorySerializer,
                        InventoryLabelSerializer)
from .models import Inventory, InventoryBarcode, InventoryImage, InvCategoryClass, InvCategory, InventoryLabels
from .mixins import CreateListMixin
from .permissions import CanViewInventory

class InventoryViewset(viewsets.ModelViewSet):
    serializer_class = InventorySerializer
    queryset = Inventory.objects.all()
    # authentication_classes = (TokenAuthentication, )
    # permission_classes = (IsAuthenticated, )
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['name', 'category__id', 'datacom__id', 'partner__id', 'company__id', 'vendor__id', 'warehouse_loc__id']
    search_fields = ['name', 'category__id', 'datacom__id', 'partner__id', 'company__id', 'vendor__id', 'warehouse_loc__id']

class InventoryListViewset(viewsets.ModelViewSet):
    serializer_class = InventoryListSerializer
    queryset = Inventory.objects.all()
    # authentication_classes = (TokenAuthentication, )
    # permission_classes = (IsAuthenticated, )
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['name', 'category__id', 'datacom__id', 'partner__id', 'company__id', 'vendor__id', 'warehouse_loc__id']
    search_fields = ['name', 'category__id', 'datacom__id', 'partner__id', 'company__id', 'vendor__id', 'warehouse_loc__id']

class InvCategoryClassViewset(viewsets.ModelViewSet):
    serializer_class = InvCategoryClassSerializer
    queryset = InvCategoryClass.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['name']
    search_fields = ['name']

class InvCategoryViewset(viewsets.ModelViewSet):
    serializer_class = InvCategorySerializer
    queryset = InvCategory.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['name']
    search_fields = ['name']

class InvGalleryViewset(viewsets.ModelViewSet):
    #Only make GET request on id when inv item is being loaded in datatable
    serializer_class = InventoryGallerySerializer
    queryset = InventoryImage.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['product__id', 'id']
    search_fields = ['product__id', 'id']
    ordering_fields = ['date_added']
    ordering = ['date_added']

 
class InvBarcodesViewset(viewsets.ModelViewSet):
    serializer_class = InventoryBarcodeSerializer
    queryset = InventoryBarcode.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['id', 'barcode_number']
    search_fields = ['id', 'barcode_number']
    ordering_fields = ['id']
    ordering = ['id']


class InvLabelViewSet(viewsets.ModelViewSet):
    serializer_class = InventoryLabelSerializer
    queryset = InventoryLabels.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['name']
    search_fields = ['name']