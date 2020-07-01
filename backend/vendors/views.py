from django.shortcuts import render
from rest_framework import filters, exceptions, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import (VendorSerializer, 
                        VendorListSerializer, 
                        VendorPrimaryContactSerializer, 
                        VendorShippingContactSerializer, 
                        VendorBillingContactSerializer, 
                        VendorTechnicalContactSerializer, )
from .models import Vendor

class VendorViewset(viewsets.ModelViewSet):
    serializer_class = VendorSerializer
    queryset = Vendor.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['id', 'barcode_id', 'datacom__id', 'partner__id', 'company__id']
    search_fields = ['id', 'barcode_id', 'datacom__id', 'partner__id', 'company__id']
    ordering_fields = '__all__'
    ordering = ['date_added']

class VendorListViewset(viewsets.ModelViewSet):
    serializer_class = VendorListSerializer
    queryset = Vendor.objects.all()

class VendorPrimaryContactViewset(viewsets.ModelViewSet):
    serializer_class = VendorPrimaryContactSerializer
    queryset = Vendor.objects.all()

class VendorShippingContactViewset(viewsets.ModelViewSet):
    serializer_class = VendorShippingContactSerializer
    queryset = Vendor.objects.all()

class VendorBillingContactViewset(viewsets.ModelViewSet):
    serializer_class = VendorBillingContactSerializer
    queryset = Vendor.objects.all()

class VendorTechnicalContactViewset(viewsets.ModelViewSet):
    serializer_class = VendorTechnicalContactSerializer
    queryset = Vendor.objects.all()
