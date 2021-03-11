from django.http import Http404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from rest_framework import status, filters, exceptions, viewsets
from rest_framework import viewsets
from rest_framework.views import APIView

from .serializers import EmployeeSerializer, PositionsSerializer, EmployeeListSerializer, EmployeeModulesManagerSerializer
from .models import Employee, Position
from employees.serializers import (AlternativeLoginSerializer, 
																ManagerApprovalBarcodeSerializer)

class EmployeeViewset(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()
    authentication_classes = (TokenAuthentication, )
    # permission_classes = (IsAuthenticated, )
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['datacom__id', 'partner__id', 'company__id', 'vendor__id', 'user__id']
    search_fields = ['datacom__id', 'partner__id', 'company__id', 'vendor__id', 'user__id']
    ordering_fields = '__all__'
    ordering = ['user__full_name']

class EmployeeListViewset(viewsets.ModelViewSet):
    serializer_class = EmployeeListSerializer
    queryset = Employee.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['datacom__id', 'partner__id', 'company__id', 'vendor__id', 'user__id']
    search_fields = ['datacom__id', 'partner__id', 'company__id', 'vendor__id', 'user__id']
    ordering_fields = '__all__'
    ordering = ['user__full_name']

class EmployeeModulesManagerViewset(viewsets.ModelViewSet):
    serializer_class = EmployeeModulesManagerSerializer
    queryset = Employee.objects.all()

class PositionsViewset(viewsets.ModelViewSet):
    serializer_class = PositionsSerializer
    queryset = Position.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['datacom__id', 'partner__id', 'company__id']
    search_fields = ['datacom__id', 'partner__id', 'company__id']
    ordering_fields = '__all__'
    ordering = ['name']

# Taken from User SerializerPage - Need to refactor the following
class AlternativeLoginAPIView(APIView):
    """Handles creating user auth tokens for Alternative Login"""
    # renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES
    serializer_class = AlternativeLoginSerializer

    def get(self, request):
        return Response({'Message': "Hello There Yall"})

    def post(self, request, *args, **kwargs):
        print('Login request', request)
        print('Login kwargs', kwargs)
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        print('serializer.validated_data', serializer.validated_data)
        barcode = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=serializer.validated_data['user'])
        return Response({
            'token': token.key,
            'user_id': serializer.validated_data['user'].pk,
            'email': serializer.validated_data['user'].email,
        })

class ManagerBarcodeApprovalAPIView(APIView):
    """Handles creating user auth tokens for Alternative Login"""
    # renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES
    serializer_class = ManagerApprovalBarcodeSerializer

    def get(self, request):
        return Response({'Message': "GET request for the API Endpoint to verify manager credentials"})

    def post(self, request, *args, **kwargs):
        print('View 1')

        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        print('View 2')
        serializer.is_valid(raise_exception=True)
        print('serializer.validated_data', serializer.validated_data)
        print('View 3')
        user = serializer.validated_data['user']
        # token, created = Token.objects.get_or_create(user=serializer.validated_data['user'])
        return Response({
            'approved': "true",
        })


