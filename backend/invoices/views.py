from django.shortcuts import render
from rest_framework import viewsets

from .serializers import InvoiceSerializer, ReceiptSerializer
from invoices.models import Invoice, Receipt

class InvoiceViewset(viewsets.ModelViewSet):
    """Handle CRUD Views
    Methods: list, create, retrieve, 
    update, partial_update, destroy"""
    serializer_class = InvoiceSerializer
    queryset = Invoice.objects.all()

    
class ReceiptViewset(viewsets.ModelViewSet):
    """Handle CRUD Views
    Methods: list, create, retrieve, 
    update, partial_update, destroy"""
    serializer_class = ReceiptSerializer
    queryset = Receipt.objects.all()