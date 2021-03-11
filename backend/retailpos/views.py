from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, exceptions, viewsets


from .models import openAndCloseTill
from .serializers import openAndCloseTillSerializer


class OpenAndCloseTillViewset(viewsets.ModelViewSet):
    serializer_class = openAndCloseTillSerializer
    queryset = openAndCloseTill.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['date']
    search_fields = ['date']
    ordering_fields = '__all__'
    ordering = ['date']
