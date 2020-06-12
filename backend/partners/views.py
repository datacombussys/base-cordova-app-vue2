from django.shortcuts import render
from rest_framework import filters, exceptions, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import PartnerSerializer
from .models import Partner

class PartnerViewset(viewsets.ModelViewSet):
    """Handle CRUD Views
    Methods: list, create, retrieve, 
    update, partial_update, destroy"""
    serializer_class = PartnerSerializer
    queryset = Partner.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['id', 'datacom__id']
    search_fields = ['id', 'datacom__id']
    ordering_fields = '__all__'
    ordering = ['date_added']
