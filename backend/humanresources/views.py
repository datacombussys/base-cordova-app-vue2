from django.contrib.auth import login as django_login, logout as django_logout
from django.http import Http404
from django.contrib.contenttypes.models import ContentType

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework import status, filters, exceptions, viewsets

from .serializers import BenefitsSerializer, EmployeeDocumentsSerializer, CompanyDocumentsSerializer, MileageReimbursementSerializer
from .models import Benefits, EmployeeDocuments, CompanyDocuments, MileageReimbursement


class BenefitsSerializerViewset(viewsets.ModelViewSet):
	serializer_class = BenefitsSerializer
	queryset = Benefits.objects.all()

class EmployeeDocumentsViewset(viewsets.ModelViewSet):
	serializer_class = EmployeeDocumentsSerializer
	queryset = EmployeeDocuments.objects.all()

class CompanyDocumentsViewset(viewsets.ModelViewSet):
	serializer_class = CompanyDocumentsSerializer
	queryset = CompanyDocuments.objects.all()

class MileageReimbursementViewset(viewsets.ModelViewSet):
	serializer_class = MileageReimbursementSerializer
	queryset = MileageReimbursement.objects.all()
	filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
	filterset_fields = ['date_added', 'status']
	search_fields = ['date_added', 'status']
	ordering_fields = ['date_added', 'status']
	ordering = ['date_added']