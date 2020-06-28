from django.shortcuts import render
from rest_framework import status, filters, exceptions, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .models import Datacom
from .serializers import DatacomSerializer

class DatacomViewset(viewsets.ModelViewSet):
    serializer_class = DatacomSerializer
    queryset = Datacom.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['id', 'domain', 'barcode']
    search_fields = ['id', 'domain', 'barcode']
    ordering_fields = '__all__'
    ordering = ['date_added']

