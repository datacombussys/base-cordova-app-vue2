from rest_framework import serializers
from commons.base64 import Base64ImageField

from .models import Warehouse 
from companies.models import Company
from datacom.models import Datacom
from partners.models import Partner
from salesoffices.models import SalesOffice
from employees.models import Employee
from users.serializers import User
from users.serializers import UserListSerializer
from partners.serializers import PartnerSerializer, PartnerListSerializer
from datacom.serializers import DatacomSerializer, DatacomListSerializer
from companies.serializers import CompanySerializer, CompanyListSerializer
from salesoffices.serializers import SalesOfficeSerializer, SalesOfficeListSerializer
from employees.serializers import EmployeeSerializer, EmployeeListSerializer
from commons.serializers import CommonBarcode, CommonBarcodeSerializer

class WarehouseSerializer(serializers.ModelSerializer):
    datacom_obj = DatacomListSerializer(read_only=True, source='datacom')
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner_obj = PartnerListSerializer(read_only=True, source='partner')
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company_obj = CompanyListSerializer(read_only=True, source='company')
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    barcode_obj = CommonBarcodeSerializer(read_only=True, source='barcode')
    barcode = serializers.PrimaryKeyRelatedField(queryset=CommonBarcode.objects.all(), required=False, allow_null=True)

    primary_contacts_list = UserListSerializer(many=True, read_only=True, source='primary_contacts')
    primary_contacts = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True)
    shipping_contacts_list = UserListSerializer(many=True, read_only=True, source='shipping_contacts')
    shipping_contacts = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True)
    billing_contact_list = UserListSerializer(many=True, read_only=True, source='billing_contacts')
    billing_contacts = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True)
    technical_contacts_list = UserListSerializer(many=True, read_only=True, source='technical_contacts')
    technical_contacts = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True)
    employees_list = EmployeeListSerializer(many=True, read_only=True, source='technical_contacts')
    employees = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), many=True, allow_null=True)
    sales_offices_list = SalesOfficeListSerializer(many=True, read_only=True, source='technical_contacts')
    sales_offices = serializers.PrimaryKeyRelatedField(queryset=SalesOffice.objects.all(), many=True, allow_null=True)
    
    # primary_contact_list = UserListSerializer(many=True, read_only=True, source='primary_contacts')
    # primary_contacts = serializers.ManyRelatedField(child_relation=serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True), allow_null=True)
    # billing_contact_list = UserListSerializer(many=True, read_only=True, source='billing_contacts')
    # billing_contacts = serializers.ManyRelatedField(child_relation=serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True), allow_null=True)
    # technical_contacts_list = UserListSerializer(many=True, read_only=True, source='technical_contacts')
    # technical_contacts = serializers.ManyRelatedField(child_relation=serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True), allow_null=True)
    # shipping_contacts_list = UserListSerializer(many=True, read_only=True, source='shipping_contacts')
    # shipping_contacts = serializers.ManyRelatedField(child_relation=serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True), allow_null=True)
    # employees_list = EmployeeListSerializer(many=True, read_only=True, source='employees')
    # employees = serializers.ManyRelatedField(child_relation=serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), many=True, allow_null=True), allow_null=True)
    # sales_offices_list = SalesOfficeListSerializer(many=True, read_only=True, source='sales_offices')
    # sales_offices = serializers.ManyRelatedField(child_relation=serializers.PrimaryKeyRelatedField(queryset=SalesOffice.objects.all(), many=True, allow_null=True), allow_null=True)

    profile_img = Base64ImageField(max_length=None,
                                    use_url=True,
                                    required=False,
                                    allow_null=True,
                                    allow_empty_file=True)

    class Meta:
        model = Warehouse
        fields = ('__all__')

class WarehouseListSerializer(serializers.ModelSerializer):
	datacom_obj = DatacomListSerializer(read_only=True, source='datacom')
	partner_obj = PartnerListSerializer(read_only=True, source='partner')
	company_obj = CompanyListSerializer(read_only=True, source='company')
	barcode_obj = CommonBarcodeSerializer(read_only=True, source='barcode')
	class Meta:
		model = Warehouse
		read_only_fields = ['id']
		fields = ['id', 'datacom_obj', 'partner_obj', 'company_obj', 'barcode_obj', 'date_added', 'warehouse_number', 'warehouse_name', 'status', 'is_active', 'profile_img']

class WarehousePrimaryContactSerializer(serializers.ModelSerializer):
	primary_contacts_list = UserListSerializer(many=True, read_only=True, source='primary_contacts')
	primary_contacts = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True)
	class Meta:
		model = Warehouse
		read_only_fields = ['dba_name']
		fields = ['id', 'dba_name', 'primary_contacts_list', 'primary_contacts']

class WarehouseBillingContactSerializer(serializers.ModelSerializer):
	billing_contact_list = UserListSerializer(many=True, read_only=True, source='billing_contacts')
	billing_contacts = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True)
	class Meta:
		model = Warehouse
		read_only_fields = ['dba_name']
		fields = ['id', 'dba_name', 'billing_contacts_list', 'billing_contacts']

class WarehouseTechnicalContactSerializer(serializers.ModelSerializer):
	technical_contacts_list = UserListSerializer(many=True, read_only=True, source='technical_contacts')
	technical_contacts = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True)
	class Meta:
		model = Warehouse
		read_only_fields = ['dba_name']
		fields = ['id', 'dba_name', 'technical_contacts_list', 'technical_contacts']

class WarehouseShippingContactSerializer(serializers.ModelSerializer):
	shipping_contacts_list = UserListSerializer(many=True, read_only=True, source='shipping_contacts')
	shipping_contacts = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True)
	class Meta:
		model = Warehouse
		read_only_fields = ['dba_name']
		fields = ['id', 'dba_name', 'shipping_contacts_list', 'shipping_contacts']

class WarehouseEmployeesSerializer(serializers.ModelSerializer):
	employees_list = EmployeeListSerializer(many=True, read_only=True, source='employees')
	employees = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True)
	class Meta:
		model = Warehouse
		read_only_fields = ['dba_name']
		fields = ['id', 'dba_name', 'employees_list', 'employees']

class WarehouseSalesOfficesSerializer(serializers.ModelSerializer):
	sales_offices_list = SalesOfficeListSerializer(many=True, read_only=True, source='sales_offices')
	sales_offices = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True)
	class Meta:
		model = Warehouse
		read_only_fields = ['dba_name']
		fields = ['id', 'dba_name', 'sales_offices_list', 'sales_offices']