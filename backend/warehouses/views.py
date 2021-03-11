from django.shortcuts import render
from rest_framework import filters, exceptions, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import (WarehouseSerializer, 
                        WarehouseListSerializer, 
                        WarehousePrimaryContactSerializer, 
                        WarehouseBillingContactSerializer, 
                        WarehouseTechnicalContactSerializer, 
                        WarehouseShippingContactSerializer, 
                        WarehouseEmployeesSerializer, 
                        WarehouseSalesOfficesSerializer, )
from .models import Warehouse

class WarehouseViewset(viewsets.ModelViewSet):
	serializer_class = WarehouseSerializer
	queryset = Warehouse.objects.all()
	filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
	filterset_fields = ['id', 'barcode__id', 'datacom__id', 'partner__id', 'company__id']
	search_fields = ['id', 'barcode__id', 'datacom__id', 'partner__id', 'company__id']
	ordering_fields = '__all__'
	ordering = ['date_added']

class WarehouseListViewset(viewsets.ModelViewSet):
	serializer_class = WarehouseListSerializer
	queryset = Warehouse.objects.all()
	filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
	filterset_fields = ['id', 'barcode__id', 'datacom__id', 'partner__id', 'company__id']
	search_fields = ['id', 'barcode__id', 'datacom__id', 'partner__id', 'company__id']
	ordering_fields = '__all__'
	ordering = ['date_added']

class WarehousePrimaryContactViewset(viewsets.ModelViewSet):
	serializer_class = WarehousePrimaryContactSerializer
	queryset = Warehouse.objects.all()

class WarehouseShippingContactViewset(viewsets.ModelViewSet):
	serializer_class = WarehouseShippingContactSerializer
	queryset = Warehouse.objects.all()

class WarehouseBillingContactViewset(viewsets.ModelViewSet):
	serializer_class = WarehouseBillingContactSerializer
	queryset = Warehouse.objects.all()

class WarehouseTechnicalContactViewset(viewsets.ModelViewSet):
	serializer_class = WarehouseTechnicalContactSerializer
	queryset = Warehouse.objects.all()

class WarehouseEmployeesViewset(viewsets.ModelViewSet):
	serializer_class = WarehouseBillingContactSerializer
	queryset = Warehouse.objects.all()

class WarehouseSalesOfficesViewset(viewsets.ModelViewSet):
	serializer_class = WarehouseTechnicalContactSerializer
	queryset = Warehouse.objects.all()