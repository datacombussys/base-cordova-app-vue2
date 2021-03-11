from django.shortcuts import render
from rest_framework import filters, exceptions, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import (SalesOfficeSerializer, 
                            SalesOfficeListSerializer, 
                            SalesOfficePrimaryContactSerializer, 
                            SalesOfficeShippingContactSerializer, 
                            SalesOfficeBillingContactSerializer, 
                            SalesOfficeTechnicalContactSerializer, 
                            SalesOfficeEmployeesSerializer, )
from .models import SalesOffice

class SalesOfficeViewset(viewsets.ModelViewSet):
	serializer_class = SalesOfficeSerializer
	queryset = SalesOffice.objects.all()
	filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
	filterset_fields = ['id', 'datacom__id', 'partner__id', 'company__id']
	search_fields = ['id', 'datacom__id', 'partner__id', 'company__id']
	ordering_fields = '__all__'
	ordering = ['date_added']

class SalesOfficeListViewset(viewsets.ModelViewSet):
	serializer_class = SalesOfficeListSerializer
	queryset = SalesOffice.objects.all()
	filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
	filterset_fields = ['id', 'datacom__id', 'partner__id', 'company__id']
	search_fields = ['id', 'datacom__id', 'partner__id', 'company__id']
	ordering_fields = '__all__'
	ordering = ['date_added']

class SalesOfficePrimaryContactViewset(viewsets.ModelViewSet):
	serializer_class = SalesOfficePrimaryContactSerializer
	queryset = SalesOffice.objects.all()

class SalesOfficeShippingContactViewset(viewsets.ModelViewSet):
	serializer_class = SalesOfficeShippingContactSerializer
	queryset = SalesOffice.objects.all()

class SalesOfficeBillingContactViewset(viewsets.ModelViewSet):
	serializer_class = SalesOfficeBillingContactSerializer
	queryset = SalesOffice.objects.all()

class SalesOfficeTechnicalContactViewset(viewsets.ModelViewSet):
	serializer_class = SalesOfficeTechnicalContactSerializer
	queryset = SalesOffice.objects.all()

class SalesOfficeEmployeesViewset(viewsets.ModelViewSet):
	serializer_class = SalesOfficeEmployeesSerializer
	queryset = SalesOffice.objects.all()