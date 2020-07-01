from rest_framework import serializers
from employees.models import Employee
from .models import openAndCloseTill
from employees.serializers import EmployeeSerializer, EmployeeListSerializer


class openAndCloseTillSerializer(serializers.ModelSerializer):
    employee_obj = EmployeeListSerializer(read_only=True, source='employee')
    employee = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), required=False, allow_null=True)

    class Meta:
        model = openAndCloseTill
        fields = ('__all__')