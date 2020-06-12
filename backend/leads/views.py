from django.shortcuts import render
from rest_framework import viewsets

from .serializers import LeadSerializer
from .models import Lead

class LeadViewset(viewsets.ModelViewSet):
    """Handle CRUD Views
    Methods: list, create, retrieve, 
    update, partial_update, destroy"""
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()