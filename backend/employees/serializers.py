from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.contenttypes.models import ContentType

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
from humanresources.models import Benefits, EmployeeDocuments

from partners.serializers import PartnerSerializer, PartnerSimpleSerializer
from datacom.serializers import DatacomSerializer, DatacomSimpleSerializer
from companies.serializers import CompanySerializer, CompanySimpleSerializer
from users.serializers import UserSerializer, SimpleUserSerializer
from humanresources.serializers import BenefitsSerializer, EmployeeDocumentsSerializer
from commons2.serializers import DepartmentSerializer, ContentTypeSerializer


class PositionsSerializer(serializers.ModelSerializer):
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Position
        fields = ('__all__')

class EmployeeSerializer(serializers.ModelSerializer):
    # ReadOnlyField only displays one field at a time e.g datacom.dba_name
    datacom_name = serializers.ReadOnlyField(source='datacom.legal_name')
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner_name = serializers.ReadOnlyField(source='partner.legal_name')
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company_name = serializers.ReadOnlyField(source='company.legal_name')
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    vendor = serializers.PrimaryKeyRelatedField(queryset=Vendor.objects.all(), required=False, allow_null=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), required=False, allow_null=True)
    position = serializers.PrimaryKeyRelatedField(queryset=Position.objects.all(), required=False, allow_null=True)
    # modules_managed = serializers.PrimaryKeyRelatedField(queryset=ContentType.objects.all(), many=True, required=False, allow_null=True)
    employee_docs = serializers.PrimaryKeyRelatedField(queryset=EmployeeDocuments.objects.all(), required=False, allow_null=True)
    benefits = serializers.PrimaryKeyRelatedField(queryset=Benefits.objects.all(), required=False, allow_null=True)
    
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
        if data['user']:
            user_data_serializer = UserSerializer(value.user)
            data['user'] = user_data_serializer.data
        if data['department']:
            department_data_serializer = DepartmentSerializer(value.department)
            data['department'] = department_data_serializer.data
        if data['position']:
            position_data_serializer = PositionsSerializer(value.position)
            data['position'] = position_data_serializer.data
        if data['benefits']:
            benefits_data_serializer = BenefitsSerializer(value.benefits)
            data['benefits'] = benefits_data_serializer.data
        if data['employee_docs']:
            employee_docs_data_serializer = EmployeeDocumentsSerializer(value.employee_docs)
            data['employee_docs'] = employee_docs_data_serializer.data
        # if data['modules_managed']:
        #     modules_managed_data_serializer = ContentTypeSerializer(value.modules_managed)
        #     data['modules_managed'] = modules_managed_data_serializer.data
        
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


class SimpleEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'position', 'salary', 'reporting_manager','hire_date', 'termination_date', 'user']


    def to_representation(self, value):
        data = super().to_representation(value)  
        if data['user']:
            user_data_serializer = SimpleUserSerializer(value.user)
            data['user'] = user_data_serializer.data

        return data