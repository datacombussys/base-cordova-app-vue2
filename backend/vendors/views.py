from django.shortcuts import render
from rest_framework import filters, exceptions, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import VendorSerializer
from .models import Vendor

class VendorViewset(viewsets.ModelViewSet):
    """Handle CRUD Views
    Methods: list, create, retrieve, 
    update, partial_update, destroy"""
    serializer_class = VendorSerializer
    queryset = Vendor.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['id', 'barcode_id', 'datacom__id', 'partner__id', 'company__id']
    search_fields = ['id', 'barcode_id', 'datacom__id', 'partner__id', 'company__id']
    ordering_fields = '__all__'
    ordering = ['date_added']
