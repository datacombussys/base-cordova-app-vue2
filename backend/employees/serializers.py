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
from commons.models import CommonBarcode
from commons.serializers import CommonBarcodeSerializer
from partners.serializers import PartnerSerializer, PartnerListSerializer
from datacom.serializers import DatacomSerializer, DatacomListSerializer
from companies.serializers import CompanySerializer, CompanyListSerializer
from vendors.serializers import VendorSerializer, VendorListSerializer
from users.serializers import UserSerializer, UserListSerializer
from humanresources.models import Benefits, EmployeeDocuments
from humanresources.serializers import BenefitsSerializer, EmployeeDocumentsSerializer
from commons2.serializers import DepartmentSerializer
from users.serializers import ContentTypeSerializer


class PositionsSerializer(serializers.ModelSerializer):
    datacom_obj = DatacomListSerializer(read_only=True, source='datacom')
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner_obj = PartnerListSerializer(read_only=True, source='partner')
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company_obj = CompanyListSerializer(read_only=True, source='company')
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Position
        fields = ('__all__')

class EmployeeSerializer(serializers.ModelSerializer):
    datacom_obj = DatacomListSerializer(read_only=True, source='datacom')
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner_obj = PartnerListSerializer(read_only=True, source='partner')
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company_obj = CompanyListSerializer(read_only=True, source='company')
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    vendor_obj = VendorListSerializer(read_only=True, source='vendor')
    vendor = serializers.PrimaryKeyRelatedField(queryset=Vendor.objects.all(), required=False, allow_null=True)
    user_obj = UserListSerializer(read_only=True, source='user')
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
    department_obj = DepartmentSerializer(read_only=True, source='department')
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), required=False, allow_null=True)
    position_obj = PositionsSerializer(read_only=True, source='position')
    position = serializers.PrimaryKeyRelatedField(queryset=Position.objects.all(), required=False, allow_null=True)
    employee_docs_obj = EmployeeDocumentsSerializer(read_only=True, source='employee_docs')
    employee_docs = serializers.PrimaryKeyRelatedField(queryset=EmployeeDocuments.objects.all(), required=False, allow_null=True)
    benefits_obj = BenefitsSerializer(read_only=True, source='benefits')
    benefits = serializers.PrimaryKeyRelatedField(queryset=Benefits.objects.all(), required=False, allow_null=True)
    barcode_obj = CommonBarcodeSerializer(read_only=True, source='barcode')
    barcode = serializers.PrimaryKeyRelatedField(queryset=CommonBarcode.objects.all(), required=False, allow_null=True)
    
    class Meta:
        model = Employee
        fields = ('__all__')
   
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

class EmployeeListSerializer(serializers.ModelSerializer):
    user_obj = UserListSerializer(read_only=True, source='user')
    class Meta:
        model = Employee
        read_only_fields = ['id', 'user']
        fields = ['id', 'position', 'salary', 'employee_number', 'reporting_manager','hire_date', 'termination_date', 'user', 'profile_img', 'user_obj']

class EmployeeModulesManagerSerializer(serializers.ModelSerializer):
    modules_managed_list = ContentTypeSerializer(many=True, read_only=True, source='modules_managed')
    modules_managed = serializers.PrimaryKeyRelatedField(queryset=ContentType.objects.all(), many=True, allow_null=True)
    class Meta:
        model = Employee
        read_only_fields = ['employee_number', 'user__id']
        fields = ['id', 'employee_number', 'user__id', 'modules_managed_list', 'modules_managed', 'is_module_manager']

# Taken from User SerializerPage - Need to refactor the following
class AlternativeLoginSerializer(serializers.Serializer):
    barcode_number = serializers.CharField(max_length=20)
    pin = serializers.CharField(max_length=4)    
        
    def validate(self, data):
        barcode_number = data.get('barcode_number', "")
        pin = data.get('pin', "")
        if data['barcode_number'] and data['pin']:
            try:
                barcode = CommonBarcode.objects.get(barcode_number = data['barcode_number'])
            except CommonBarcode.DoesNotExist:
                raise Http404("No Barcode match for the given barcode number.")
            
            if barcode.user.pin == data['pin']:
                data['user'] = barcode.user
                return data
            else:
                msg = "Unable to login User with credentials"
                raise exceptions.ValidationError(msg)
        else:
            msg = "You must provide a barcocde number and PIN"
            raise exceptions.ValidationError(msg)
        return data

class ManagerApprovalBarcodeSerializer(serializers.Serializer):
    barcode_number = serializers.CharField(max_length=20)
    pin = serializers.CharField(max_length=4)  
        
    def validate(self, data):
        print('Serializer Validate 1')
        barcode_number = data.get('barcode_number', "")
        pin = data.get('pin', "")
        if data['barcode_number'] and data['pin']:
            try:
                barcode = CommonBarcode.objects.get(barcode_number = data['barcode_number'])
            except CommonBarcode.DoesNotExist:
                raise Http404("No Barcode match for the given barcode number.")
            
            if barcode.user.pin == data['pin']:
                data['user'] = barcode.user
                print(data['user'])
                if data['user'].is_admin or data['user'].is_superuser:
                    return data
                else:
                    msg = "You need to have approval from an admin account"
                    raise exceptions.ValidationError(msg)
            else:
                msg = "Unable to  verify manager with provided credentials"
                raise exceptions.ValidationError(msg)
        else:
            msg = "You must provide a barcocde number and PIN"
            raise exceptions.ValidationError(msg)
        return data