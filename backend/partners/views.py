from django.shortcuts import render
from rest_framework import filters, exceptions, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import (PartnerSerializer, 
                        PartnerListSerializer, 
                        PartnerPrimaryContactSerializer, 
                        PartnerShippingContactSerializer, 
                        PartnerBillingContactSerializer, 
                        PartnerTechnicalContactSerializer, )
from .models import Partner

class PartnerViewset(viewsets.ModelViewSet):
    serializer_class = PartnerSerializer
    queryset = Partner.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['id', 'datacom__id']
    search_fields = ['id', 'datacom__id']
    ordering_fields = '__all__'
    ordering = ['date_added']

class PartnerListViewset(viewsets.ModelViewSet):
    serializer_class = PartnerListSerializer
    queryset = Partner.objects.all()

class PartnerPrimaryContactViewset(viewsets.ModelViewSet):
    serializer_class = PartnerPrimaryContactSerializer
    queryset = Partner.objects.all()

class PartnerShippingContactViewset(viewsets.ModelViewSet):
    serializer_class = PartnerShippingContactSerializer
    queryset = Partner.objects.all()

class PartnerBillingContactViewset(viewsets.ModelViewSet):
    serializer_class = PartnerBillingContactSerializer
    queryset = Partner.objects.all()

class PartnerTechnicalContactViewset(viewsets.ModelViewSet):
    serializer_class = PartnerTechnicalContactSerializer
    queryset = Partner.objects.all()
