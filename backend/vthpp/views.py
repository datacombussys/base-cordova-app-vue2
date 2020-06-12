from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import filters, exceptions, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import (CardProcessingAccountSerializer,
                          CreditCardSerializer,
                          ACHAccountSerializer, )
from .models import (CardProcessingAccount, 
                      CreditCard, 
                      ACHAccount, )

class CardProcessingAccountViewset(viewsets.ModelViewSet):
    """Handle CRUD Views
    Methods: list, create, retrieve, 
    update, partial_update, destroy"""
    serializer_class = CardProcessingAccountSerializer
    queryset = CardProcessingAccount.objects.all()


class CreditCardViewset(viewsets.ModelViewSet):
    """Handle CRUD Views
    Methods: list, create, retrieve, 
    update, partial_update, destroy"""
    serializer_class = CreditCardSerializer
    queryset = CreditCard.objects.all().filter(is_active=True)
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['id', 'user__id', 'datacom__id', 'partner__id', 'company__id']
    search_fields = ['id', 'user__id', 'datacom__id', 'partner__id', 'company__id']
    ordering_fields = '__all__'
    ordering = ['date_added']

class ACHAccountViewset(viewsets.ModelViewSet):
    """Handle CRUD Views
    Methods: list, create, retrieve, 
    update, partial_update, destroy"""
    serializer_class = ACHAccountSerializer
    queryset = ACHAccount.objects.all().filter(is_active=True)
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['id', 'user__id', 'datacom__id', 'partner__id', 'company__id']
    search_fields = ['id', 'user__id', 'datacom__id', 'partner__id', 'company__id']
    ordering_fields = '__all__'
    ordering = ['date_added']