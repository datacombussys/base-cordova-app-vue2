from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required

from rest_framework import serializers
from rest_framework import exceptions

from datacom.models import Datacom
from partners.models import Partner
from companies.models import Company
from employees.models import Employee

from .models import ( Shift, 
                    OperatingHours, 
                    BusinessOperatingHours, 
                    AttendanceSettings, 
                    TimeCard, 
                    LeaveRequest, 
                    PayCycle, 
                    PayCycleRecurrence, )

from partners.serializers import PartnerSerializer, PartnerListSerializer
from datacom.serializers import DatacomSerializer, DatacomListSerializer
from companies.serializers import CompanySerializer, CompanyListSerializer
from users.serializers import UserSerializer, UserListSerializer

class ShiftSerializer(serializers.ModelSerializer):
    datacom_obj = DatacomListSerializer(read_only=True, source='datacom')
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner_obj = PartnerListSerializer(read_only=True, source='partner')
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company_obj = CompanyListSerializer(read_only=True, source='company')
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    employees_list = UserListSerializer(many=True, read_only=True, source='employees')
    employees = serializers.ManyRelatedField(child_relation=serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), many=True, allow_null=True), allow_null=True)

    class Meta:
        model = Shift
        fields = ('__all__')


class OperatingHoursSerializer(serializers.ModelSerializer):
    datacom_obj = DatacomListSerializer(read_only=True, source='datacom')
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner_obj = PartnerListSerializer(read_only=True, source='partner')
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company_obj = CompanyListSerializer(read_only=True, source='company')
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)

    class Meta:
        model = OperatingHours
        fields = ('__all__')

class BusinessOperatingHoursSerializer(serializers.ModelSerializer):
    datacom_obj = DatacomListSerializer(read_only=True, source='datacom')
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner_obj = PartnerListSerializer(read_only=True, source='partner')
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company_obj = CompanyListSerializer(read_only=True, source='company')
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)

    class Meta:
        model = BusinessOperatingHours
        fields = ('__all__')

class AttendanceSettingsSerializer(serializers.ModelSerializer):
    datacom_obj = DatacomListSerializer(read_only=True, source='datacom')
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner_obj = PartnerListSerializer(read_only=True, source='partner')
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company_obj = CompanyListSerializer(read_only=True, source='company')
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    operating_hours_obj = CompanyListSerializer(read_only=True, source='operating_hours')
    operating_hours= serializers.PrimaryKeyRelatedField(queryset=BusinessOperatingHours.objects.all(), many=True, required=False, allow_null=True)
    
    shift_list = UserListSerializer(many=True, read_only=True, source='shift')
    shift = serializers.ManyRelatedField(child_relation=serializers.PrimaryKeyRelatedField(queryset=Shift.objects.all(), many=True, allow_null=True), allow_null=True)

    class Meta:
        model = AttendanceSettings
        fields = ('__all__')

class TimeCardSerializer(serializers.ModelSerializer):
    cycle_obj = CompanyListSerializer(read_only=True, source='cycle')
    cycle = serializers.PrimaryKeyRelatedField(queryset=PayCycle.objects.all(), required=False, allow_null=True)
    employee_obj = CompanyListSerializer(read_only=True, source='employee')
    employee = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
  
    class Meta:
        model = TimeCard
        fields = ('__all__')

class LeaveRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = LeaveRequest
        fields = ('__all__')

class PayCyclesSerializer(serializers.ModelSerializer):
    datacom_obj = DatacomListSerializer(read_only=True, source='datacom')
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner_obj = PartnerListSerializer(read_only=True, source='partner')
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company_obj = CompanyListSerializer(read_only=True, source='company')
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    
    employees_list = UserListSerializer(many=True, read_only=True, source='employees')
    employees = serializers.ManyRelatedField(child_relation=serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), many=True, allow_null=True), allow_null=True)
    
    class Meta:
        model = PayCycle
        fields = ('__all__')
        
class PayCycleRecurrenceSerializer(serializers.Serializer):
    recurrence_obj = CompanyListSerializer(read_only=True, source='recurrence')
    recurrence = serializers.PrimaryKeyRelatedField(queryset=PayCycle.objects.all(), required=True, allow_null=False)
    rrule = serializers.CharField(max_length=255, required=False, allow_null=True)
    start_date = serializers.DateTimeField(required=False, allow_null=True)
    end_date = serializers.DateTimeField(required=False, allow_null=True)

    def create(self, validated_data):
        payCycleRecurrence = PayCycleRecurrence.objects.create(recurrence = validated_data['recurrence'],
                                                                start = validated_data['start_date'], 
                                                                end = validated_data['end_date'], 
                                                                repeat = validated_data['rrule'])
        
        return payCycleRecurrence
    
    def validate(self, data):
        print('data', data)
       
        if data['recurrence']:
            return data
                
        else:
            msg = "You need to attach an instance of Payroll Cycles"
            raise exceptions.ValidationError(msg)


        
