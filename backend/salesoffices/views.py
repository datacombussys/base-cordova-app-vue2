from django.shortcuts import render
from rest_framework import viewsets

from .serializers import SalesOfficeSerializer
from .models import SalesOffice

class SalesOfficeViewset(viewsets.ModelViewSet):
    """Handle CRUD Views
    Methods: list, create, retrieve, 
    update, partial_update, destroy"""
    serializer_class = SalesOfficeSerializer
    queryset = SalesOffice.objects.all()