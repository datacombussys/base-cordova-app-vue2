from rest_framework import serializers
from rest_framework import exceptions
from django.contrib.contenttypes.models import ContentType

from .models import Calendar
from employees.models import Employee
from employees.serializers import EmployeeSerializer
from commons2.serializers import ContentTypeSerializer


class CalendarSerializer(serializers.ModelSerializer):
    employee = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), required=False, allow_null=True)
    contenttype = serializers.PrimaryKeyRelatedField(queryset=ContentType.objects.all(), required=False, allow_null=True)
    class Meta:
        model = Calendar
        fields = ('__all__')

    def to_representation(self, value):
        data = super().to_representation(value)  
        if data['employee']:
            employee_data_serializer = EmployeeSerializer(value.employee)
            data['employee'] = employee_data_serializer.data
        if data['contenttype']:
            contenttype_data_serializer = ContentTypeSerializer(value.contenttype)
            data['contenttype'] = contenttype_data_serializer.data
        
        return data