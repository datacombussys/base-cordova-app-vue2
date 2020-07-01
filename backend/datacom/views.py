from django.shortcuts import render
from rest_framework import status, filters, exceptions, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .models import Datacom

from .serializers import (DatacomSerializer, 
                        DatacomPrimaryContactSerializer, 
                        DatacomShippingContactSerializer, 
                        DatacomBillingContactSerializer, 
                        DatacomTechnicalContactSerializer, 
                        DatacomListSerializer, )

class DatacomViewset(viewsets.ModelViewSet):
    serializer_class = DatacomSerializer
    queryset = Datacom.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['id', 'domain', 'barcode']
    search_fields = ['id', 'domain', 'barcode']
    ordering_fields = '__all__'
    ordering = ['date_added']

class DatacomListViewset(viewsets.ModelViewSet):
    serializer_class = DatacomListSerializer
    queryset = Datacom.objects.all()

class DatacomPrimaryContactViewset(viewsets.ModelViewSet):
    serializer_class = DatacomPrimaryContactSerializer
    queryset = Datacom.objects.all()

class DatacomShippingContactViewset(viewsets.ModelViewSet):
    serializer_class = DatacomShippingContactSerializer
    queryset = Datacom.objects.all()

class DatacomBillingContactViewset(viewsets.ModelViewSet):
    serializer_class = DatacomBillingContactSerializer
    queryset = Datacom.objects.all()

class DatacomTechnicalContactViewset(viewsets.ModelViewSet):
    serializer_class = DatacomTechnicalContactSerializer
    queryset = Datacom.objects.all()





