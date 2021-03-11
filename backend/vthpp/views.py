from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework import status
from rest_framework import filters, exceptions, viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response

from .serializers import (CardProcessingAPIKeySerializer,
                          CreditCardSerializer,
                          ACHAccountSerializer, 
													ElavonSerializer, 
													TransactionSerializer)
from .models import (CardProcessingAPIKey, 
                      CreditCard, 
                      ACHAccount, 
											Transaction, )

class CardProcessingAPIKeyViewset(viewsets.ModelViewSet):
	"""Handle CRUD Views
	Methods: list, create, retrieve, 
	update, partial_update, destroy"""
	serializer_class = CardProcessingAPIKeySerializer
	queryset = CardProcessingAPIKey.objects.all()
	filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
	filterset_fields = ['id', 'user__id', 'datacom__id', 'partner__id', 'company__id']
	search_fields = ['id', 'user__id', 'datacom__id', 'partner__id', 'company__id']
	ordering_fields = '__all__'
	ordering = ['date_added']


class CreditCardViewset(viewsets.ModelViewSet):
	"""Handle CRUD Views
	Methods: list, create, retrieve, 
	update, partial_update, destroy"""
	serializer_class = CreditCardSerializer
	queryset = CreditCard.objects.all().filter(is_active=True)
	filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
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
	filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
	filterset_fields = ['id', 'user__id', 'datacom__id', 'partner__id', 'company__id']
	search_fields = ['id', 'user__id', 'datacom__id', 'partner__id', 'company__id']
	ordering_fields = '__all__'
	ordering = ['date_added']

		

# Newest classed to only GET transaction info and POST transaction info
class ElavonView(CreateAPIView):
	serializer_class = ElavonSerializer

	"""POST request only"""
	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		self.perform_create(serializer)
		headers = self.get_success_headers(serializer.data)
		print('serializer.data', serializer.data)

		return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class TransactionViewset(viewsets.ReadOnlyModelViewSet):
	"""GET only"""
	queryset = Transaction.objects.all()
	serializer_class = TransactionSerializer
	filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
	filterset_fields = ['id', 'txn_id', 'credit_card', 'date_added', 'trans_result']
	search_fields = ['id', 'txn_id', 'credit_card', 'date_added', 'trans_result']
	ordering_fields = '__all__'
	ordering = ['date_added']

	def get(self, request):
		return Transaction.objects.all()


