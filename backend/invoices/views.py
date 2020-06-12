from django.shortcuts import render
from rest_framework import viewsets

from .serializers import InvoiceSerializer
from invoices.models import Invoice

class InvoiceViewset(viewsets.ModelViewSet):
    """Handle CRUD Views
    Methods: list, create, retrieve, 
    update, partial_update, destroy"""
    serializer_class = InvoiceSerializer
    queryset = Invoice.objects.all()