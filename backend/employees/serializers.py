from django.contrib.contenttypes.models import ContentType

from rest_framework import serializers

from .models import Employee, Position

from users.models import User
from companies.models import Company
from datacom.models import Datacom
from partners.models import Partner
from vendors.models import Vendor
from salesoffices.models import SalesOffice
from warehouses.models import Warehouse
from commons2.models import Department
from partners.serializers import PartnerSerializer, SimplePartnerSerializer
from datacom.serializers import DatacomSerializer, SimpleDatacomSerializer
from companies.serializers import CompanySerializer, SimpleCompanySerializer
from vendors.serializers import VendorSerializer, SimpleVendorSerializer
from users.serializers import UserSerializer, SimpleUserSerializer
from humanresources.models import Benefits, EmployeeDocuments
from humanresources.serializers import BenefitsSerializer, EmployeeDocumentsSerializer
from commons2.serializers import DepartmentSerializer
from users.serializers import ContentTypeSerializer


class PositionsSerializer(serializers.ModelSerializer):
    datacom_obj = SimpleDatacomSerializer(read_only=True, source='datacom')
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner_obj = SimplePartnerSerializer(read_only=True, source='partner')
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company_obj = SimpleCompanySerializer(read_only=True, source='company')
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Position
        fields = ('__all__')

class EmployeeSerializer(serializers.ModelSerializer):
    # ReadOnlyField only displays one field at a time e.g datacom.dba_name
    # datacom_name = serializers.ReadOnlyField(source='datacom.legal_name')
    datacom_obj = SimpleDatacomSerializer(read_only=True, source='datacom')
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner_obj = SimplePartnerSerializer(read_only=True, source='partner')
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company_obj = SimpleCompanySerializer(read_only=True, source='company')
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    vendor_obj = SimpleVendorSerializer(read_only=True, source='company')
    vendor = serializers.PrimaryKeyRelatedField(queryset=Vendor.objects.all(), required=False, allow_null=True)
    user_obj = SimpleUserSerializer(read_only=True, source='user')
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
    department_obj = DepartmentSerializer(read_only=True, source='department')
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), required=False, allow_null=True)
    position_obj = PositionsSerializer(read_only=True, source='position')
    position = serializers.PrimaryKeyRelatedField(queryset=Position.objects.all(), required=False, allow_null=True)
    employee_docs_obj = EmployeeDocumentsSerializer(read_only=True, source='employee_docs')
    employee_docs = serializers.PrimaryKeyRelatedField(queryset=EmployeeDocuments.objects.all(), required=False, allow_null=True)
    benefits_obj = BenefitsSerializer(read_only=True, source='benefits')
    benefits = serializers.PrimaryKeyRelatedField(queryset=Benefits.objects.all(), required=False, allow_null=True)

    modules_managed_list = ContentTypeSerializer(many=True, read_only=True, source='modules_managed')
    modules_managed = serializers.ManyRelatedField(child_relation=serializers.PrimaryKeyRelatedField(queryset=ContentType.objects.all(), many=True, allow_null=True), allow_null=True)
    
    class Meta:
        model = Employee
        fields = ('__all__')

    # def to_representation(self, value):
    #     data = super().to_representation(value)  
    #     if data['datacom']:
    #         datacom_data_serializer = DatacomSerializer(value.datacom)
    #         data['datacom'] = datacom_data_serializer.data
    #     if data['partner']:
    #         partner_data_serializer = PartnerSerializer(value.partner)
    #         data['partner'] = partner_data_serializer.data
    #     if data['company']:
    #         company_data_serializer = CompanySerializer(value.company)
    #         data['company'] = company_data_serializer.data
    #     if data['vendor']:
    #         vendor_data_serializer = VendorSerializer(value.vendor)
    #         data['vendor'] = vendor_data_serializer.data
    #     if data['user']:
    #         user_data_serializer = UserSerializer(value.user)
    #         data['user'] = user_data_serializer.data
    #     if data['department']:
    #         department_data_serializer = DepartmentSerializer(value.department)
    #         data['department'] = department_data_serializer.data
    #     if data['position']:
    #         position_data_serializer = PositionsSerializer(value.position)
    #         data['position'] = position_data_serializer.data
    #     if data['benefits']:
    #         benefits_data_serializer = BenefitsSerializer(value.benefits)
    #         data['benefits'] = benefits_data_serializer.data
    #     if data['employee_docs']:
    #         employee_docs_data_serializer = EmployeeDocumentsSerializer(value.employee_docs)
    #         data['employee_docs'] = employee_docs_data_serializer.data
        
    #     return data
   
    def create(self, validated_data):
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