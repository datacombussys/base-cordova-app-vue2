from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, exceptions, viewsets

from .models import Notification
from .serializers import NotificationSerializer

class NotificationViewset(viewsets.ModelViewSet):
  serializer_class = NotificationSerializer
  queryset = Notification.objects.all()
  filter_backends = [DjangoFilterBackend, filters.SearchFilter]
  filterset_fields = ['id', 'sender__id', 'receiver__id', 'approved_declined_by__id',  'leave_request__id', 'mileage_reimbursement__id']
  search_fields = ['id', 'sender__id', 'receiver__id', 'approved_declined_by__id',  'leave_request__id', 'mileage_reimbursement__id']
  ordering_fields = ['date_added']
  ordering = ['date_added']

