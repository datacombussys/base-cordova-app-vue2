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
                    PayCycles, 
                    PayCycleRecurrence, )

class ShiftSerializer(serializers.ModelSerializer):
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    employees = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), many=True, required=False, allow_null=True)

    class Meta:
        model = Shift
        fields = ('__all__')


class OperatingHoursSerializer(serializers.ModelSerializer):
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)

    class Meta:
        model = OperatingHours
        fields = ('__all__')

class BusinessOperatingHoursSerializer(serializers.ModelSerializer):
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)

    class Meta:
        model = BusinessOperatingHours
        fields = ('__all__')

class AttendanceSettingsSerializer(serializers.ModelSerializer):
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    operating_hours= serializers.PrimaryKeyRelatedField(queryset=BusinessOperatingHours.objects.all(), many=True, required=False, allow_null=True)
    shift = serializers.PrimaryKeyRelatedField(queryset=Shift.objects.all(), many=True, required=False, allow_null=True)

    class Meta:
        model = AttendanceSettings
        fields = ('__all__')

class PayCyclesSerializer(serializers.ModelSerializer):
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    class Meta:
        model = PayCycles
        fields = ('__all__')

class TimeCardSerializer(serializers.ModelSerializer):
    cycle = serializers.PrimaryKeyRelatedField(queryset=PayCycles.objects.all(), required=False, allow_null=True)
    employee = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), required=False, allow_null=True)
  
    class Meta:
        model = TimeCard
        fields = ('__all__')

class LeaveRequestSerializer(serializers.ModelSerializer):
    employee = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), required=False, allow_null=True)
    manager = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), required=False, allow_null=True)
    approved_by = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), required=False, allow_null=True)

    class Meta:
        model = LeaveRequest
        fields = ('__all__')


class PayCycleRecurrenceSerializer(serializers.Serializer):
    recurrence = serializers.PrimaryKeyRelatedField(queryset=PayCycles.objects.all(), required=True, allow_null=False)
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


        
