from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required

from rest_framework import serializers
from rest_framework import exceptions

from .models import Employee, Position
from users.serializers import UserSerializer
from datacom.serializers import DatacomSerializer
from partners.serializers import PartnerSerializer
from vendors.serializers import VendorSerializer
from companies.serializers import CompanySerializer
from users.models import User

from companies.models import Company
from .models import Position
from datacom.models import Datacom
from partners.models import Partner
from vendors.models import Vendor
from salesoffices.models import SalesOffice
from warehouses.models import Warehouse
from employees.models import Employee
from commons2.models import Department

class PositionsSerializer(serializers.ModelSerializer):
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Position
        fields = ('__all__')

class EmployeeSerializer(serializers.ModelSerializer):
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    vendor = serializers.PrimaryKeyRelatedField(queryset=Vendor.objects.all(), required=False, allow_null=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), required=False, allow_null=True)
    position = serializers.PrimaryKeyRelatedField(queryset=Position.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Employee
        fields = ('__all__')

    def to_representation(self, value):
        data = super().to_representation(value)  
        if data['datacom']:
            datacom_data_serializer = DatacomSerializer(value.datacom)
            data['datacom'] = datacom_data_serializer.data
        if data['partner']:
            partner_data_serializer = PartnerSerializer(value.partner)
            data['partner'] = partner_data_serializer.data
        if data['company']:
            company_data_serializer = CompanySerializer(value.company)
            data['company'] = company_data_serializer.data
        if data['vendor']:
            vendor_data_serializer = VendorSerializer(value.vendor)
            data['vendor'] = vendor_data_serializer.data
        if data['position']:
            position_data_serializer = Position(value.position)
            data['position'] = position_data_serializer.data
        if data['department']:
            department_data_serializer = Department(value.department)
            data['department'] = department_data_serializer.data
        if data['user']:
            user_data_serializer = UserSerializer(value.user)
            data['user'] = user_data_serializer.data
        return data
   
    def create(self, validated_data):
        """Create and Return a new user uses this method
        The request comes from Views then to Serializers, then to models.
        This is where I can call custom model methods"""
        print("Employee validated_data", validated_data) 
        employee = Employee.objects.create_employee(**validated_data)
        print("Employee Created by serializer") 
        
        return employee 

    def update(self, instance, validated_data):
        """Update Instance"""
        for key in validated_data.keys():
            if key in instance.__dict__.keys():
                setattr(instance, key, validated_data[key])
        
        print("Employee Updated by serializer")

        instance.save()
        return instance





