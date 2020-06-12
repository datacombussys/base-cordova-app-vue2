from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, exceptions, viewsets

from .models import Industry
from .serializers import IndustrySerializer

class IndustryViewset(viewsets.ModelViewSet):
  """CRUD for User Permissions"""
  serializer_class = IndustrySerializer
  queryset = Industry.objects.all()
