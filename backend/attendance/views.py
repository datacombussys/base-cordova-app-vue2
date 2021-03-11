from django.contrib.auth import login as django_login, logout as django_logout
from django.http import Http404
from django.contrib.contenttypes.models import ContentType

from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework import status, filters, exceptions, viewsets
from django_filters.rest_framework import DjangoFilterBackend


from .serializers import ( ShiftSerializer, 
                        OperatingHoursSerializer, 
                        BusinessOperatingHoursSerializer, 
                        AttendanceSettingsSerializer, 
                        TimeCardSerializer, 
                        LeaveRequestSerializer,
                        PayCyclesSerializer, 
                        PayCycleRecurrenceSerializer, )
from .models import ( Shift, 
                    OperatingHours, 
                    BusinessOperatingHours, 
                    AttendanceSettings, 
                    TimeCard, 
                    LeaveRequest, 
                    PayCycle, 
                    PayCycleRecurrence, )

class ShiftViewset(viewsets.ModelViewSet):
    """Handle CRUD Views
    Methods: list, create, retrieve, 
    update, partial_update, destroy"""
    serializer_class = ShiftSerializer
    queryset = Shift.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['datacom__id', 'partner__id', 'company__id', 'employees__id', 'name', 'start_time', 'end_time', 'attendance_type']
    search_fields = ['datacom__id', 'partner__id', 'company__id', 'employees__id', 'name', 'start_time', 'end_time', 'attendance_type']
    ordering_fields = '__all__'
    ordering = ['start_time']

class OperatingHoursViewset(viewsets.ModelViewSet):
    """Handle CRUD Views
    Methods: list, create, retrieve, 
    update, partial_update, destroy"""
    serializer_class = OperatingHoursSerializer
    queryset = OperatingHours.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['datacom__id', 'partner__id', 'company__id']
    search_fields = ['datacom__id', 'partner__id', 'company__id']
    ordering_fields = '__all__'
    ordering = ['id']

class BusinessOperatingHoursViewset(viewsets.ModelViewSet):
    """Handle CRUD Views
    Methods: list, create, retrieve, 
    update, partial_update, destroy"""
    serializer_class = BusinessOperatingHoursSerializer
    queryset = BusinessOperatingHours.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['datacom__id', 'partner__id', 'company__id']
    search_fields = ['datacom__id', 'partner__id', 'company__id']
    ordering_fields = '__all__'
    ordering = ['id']

class AttendanceSettingsViewset(viewsets.ModelViewSet):
    """Handle CRUD Views
    Methods: list, create, retrieve, 
    update, partial_update, destroy"""
    serializer_class = AttendanceSettingsSerializer
    queryset = AttendanceSettings.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['datacom__id', 'partner__id', 'company__id', 'name', 'date_added']
    search_fields = ['datacom__id', 'partner__id', 'company__id', 'name', 'date_added']
    ordering_fields = '__all__'
    ordering = ['id']

class TimeCardViewset(viewsets.ModelViewSet):
    """Handle CRUD Views
    Methods: list, create, retrieve, 
    update, partial_update, destroy"""
    serializer_class = TimeCardSerializer
    queryset = TimeCard.objects.all()

class LeaveRequestViewset(viewsets.ModelViewSet):
    """Handle CRUD Views
    Methods: list, create, retrieve, 
    update, partial_update, destroy"""
    serializer_class = LeaveRequestSerializer
    queryset = LeaveRequest.objects.all()

class PayCyclesViewset(viewsets.ModelViewSet):
    """Handle CRUD Views
    Methods: list, create, retrieve, 
    update, partial_update, destroy"""
    serializer_class = PayCyclesSerializer
    queryset = PayCycle.objects.all()

class PayCycleRecurrenceView(APIView):
    """Handles creating Recurring Payroll Cycles"""
    serializer_class = PayCycleRecurrenceSerializer
    queryset = PayCycleRecurrence.objects.all()

    def get(self, request):
        return queryset

    def post(self, request, *args, **kwargs):
        print('request', request)
        print('args', args)
        print('kwargs', kwargs)
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        print('serializer', serializer)
        print('serializer.validated_data', serializer.validated_data)

        recurrence = serializer.validated_data['recurrence']
        recurrence.save()
        
        return Response({
            'recurrence': serializer.validated_data['recurrence'].pk,
        })