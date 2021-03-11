from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, exceptions, viewsets

from .models import Industry, UOMWeight, UOMDimensions

from .serializers import IndustrySerializer, CommonBarcodeSerializer, UOMWeightSerializer, UOMDimensionsSerializer
from commons.models import CommonBarcode

class IndustryViewset(viewsets.ModelViewSet):
  serializer_class = IndustrySerializer
  queryset = Industry.objects.all()

class UOMWeightViewset(viewsets.ModelViewSet):
  serializer_class = UOMWeightSerializer
  queryset = UOMWeight.objects.all()

class UOMDimensionViewset(viewsets.ModelViewSet):
  serializer_class = UOMDimensionsSerializer
  queryset = UOMDimensions.objects.all()

class CommonBarcodeViewset(viewsets.ModelViewSet):
  serializer_class = CommonBarcodeSerializer
  queryset = CommonBarcode.objects.all()
  filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
  filterset_fields = ['user__id', 'id', 'barcode_type', 'barcode_number']
  search_fields = ['user__Id', 'id', 'barcode_type', 'barcode_number']
  ordering_fields = '__all__'
  ordering = ['id']