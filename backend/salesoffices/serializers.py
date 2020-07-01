from rest_framework import serializers
from commons.base64 import Base64ImageField

from .models import SalesOffice
from companies.models import Company
from datacom.models import Datacom, CommonBarcode
from partners.models import Partner
from employees.models import Employee
from users.serializers import User
from users.serializers import UserListSerializer
from partners.serializers import PartnerSerializer, PartnerListSerializer
from datacom.serializers import DatacomSerializer, DatacomListSerializer
from companies.serializers import CompanySerializer, SimpleCompanySerializer
from employees.serializers import EmployeeSerializer, EmployeeListSerializer
from commons.serializers import CommonBarcodeSerializer, SimpleBarcodeSerializer

class SalesOfficeSerializer(serializers.ModelSerializer):
    datacom_obj = DatacomListSerializer(read_only=True, source='datacom')
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner_obj = PartnerListSerializer(read_only=True, source='partner')
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company_obj = SimpleCompanySerializer(read_only=True, source='company')
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    barcode_obj = CommonBarcodeSerializer(read_only=True, source='barcode')
    barcode = serializers.PrimaryKeyRelatedField(queryset=CommonBarcode.objects.all(), required=False, allow_null=True)

    profile_img = Base64ImageField(max_length=None,
                                    use_url=True,
                                    required=False,
                                    allow_null=True,
                                    allow_empty_file=True)

    class Meta:
        model = SalesOffice
        fields = ('__all__')

class SalesOfficeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesOffice
        read_only_fields = ['id']
        fields = ['id', 'date_added', 'salesoffice_name', 'salesoffice_number', 'status', 'is_active', 'profile_img']

class SalesOfficePrimaryContactSerializer(serializers.ModelSerializer):
    primary_contacts_list = UserListSerializer(many=True, read_only=True, source='primary_contacts')
    primary_contacts = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True)
    class Meta:
        model = SalesOffice
        read_only_fields = ['dba_name']
        fields = ['id', 'dba_name', 'primary_contacts_list', 'primary_contacts']

class SalesOfficeShippingContactSerializer(serializers.ModelSerializer):
    shipping_contacts_list = UserListSerializer(many=True, read_only=True, source='shipping_contacts')
    shipping_contacts = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True)
    class Meta:
        model = SalesOffice
        read_only_fields = ['dba_name']
        fields = ['id', 'dba_name', 'shipping_contacts_list', 'shipping_contacts']

class SalesOfficeBillingContactSerializer(serializers.ModelSerializer):
    billing_contact_list = UserListSerializer(many=True, read_only=True, source='billing_contacts')
    billing_contacts = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True)
    class Meta:
        model = SalesOffice
        read_only_fields = ['dba_name']
        fields = ['id', 'dba_name', 'billing_contacts_list', 'billing_contacts']

class SalesOfficeTechnicalContactSerializer(serializers.ModelSerializer):
    technical_contacts_list = UserListSerializer(many=True, read_only=True, source='technical_contacts')
    technical_contacts = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True)
    class Meta:
        model = SalesOffice
        read_only_fields = ['dba_name']
        fields = ['id', 'dba_name', 'technical_contacts_list', 'technical_contacts']

        
class SalesOfficeEmployeesSerializer(serializers.ModelSerializer):
    employees_list = EmployeeListSerializer(many=True, read_only=True, source='employees')
    employees = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True)
    class Meta:
        model = SalesOffice
        read_only_fields = ['dba_name']
        fields = ['id', 'dba_name', 'employees_list', 'employees']