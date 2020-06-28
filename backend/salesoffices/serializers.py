from rest_framework import serializers
from commons.base64 import Base64ImageField

from .models import SalesOffice
from companies.models import Company
from datacom.models import Datacom, CommonBarcode
from partners.models import Partner
from employees.models import Employee
from users.serializers import User
from users.serializers import SimpleUserSerializer
from partners.serializers import PartnerSerializer, SimplePartnerSerializer
from datacom.serializers import DatacomSerializer, SimpleDatacomSerializer
from companies.serializers import CompanySerializer, SimpleCompanySerializer
from employees.serializers import EmployeeSerializer, SimpleEmployeeSerializer
from commons.serializers import CommonBarcodeSerializer, SimpleBarcodeSerializer

class SalesOfficeSerializer(serializers.ModelSerializer):
    datacom_obj = SimpleDatacomSerializer(read_only=True, source='datacom')
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner_obj = SimplePartnerSerializer(read_only=True, source='partner')
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company_obj = SimpleCompanySerializer(read_only=True, source='company')
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    barcode_obj = CommonBarcodeSerializer(read_only=True, source='barcode')
    barcode = serializers.PrimaryKeyRelatedField(queryset=CommonBarcode.objects.all(), required=False, allow_null=True)

    
    primary_contact_list = SimpleUserSerializer(many=True, read_only=True, source='primary_contacts')
    primary_contacts = serializers.ManyRelatedField(child_relation=serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True), allow_null=True)
    billing_contact_list = SimpleUserSerializer(many=True, read_only=True, source='billing_contacts')
    billing_contacts = serializers.ManyRelatedField(child_relation=serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True), allow_null=True)
    technical_contacts_list = SimpleUserSerializer(many=True, read_only=True, source='technical_contacts')
    technical_contacts = serializers.ManyRelatedField(child_relation=serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True), allow_null=True)
    shipping_contacts_list = SimpleUserSerializer(many=True, read_only=True, source='shipping_contacts')
    shipping_contacts = serializers.ManyRelatedField(child_relation=serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True), allow_null=True)
    employees_list = SimpleEmployeeSerializer(many=True, read_only=True, source='employees')
    employees = serializers.ManyRelatedField(child_relation=serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), many=True, allow_null=True), allow_null=True)

    profile_img = Base64ImageField(max_length=None,
                                    use_url=True,
                                    required=False,
                                    allow_null=True,
                                    allow_empty_file=True)

    class Meta:
        model = SalesOffice
        fields = ('__all__')

    # def to_representation(self, value):
    #     data = super().to_representation(value)  
    #     if data['datacom']:
    #         datacom_data_serializer = DatacomSerializer(value.datacom)
    #         data['datacom'] = datacom_data_serializer.data
    #     if data['company']:
    #         company_data_serializer = CompanySerializer(value.company)
    #         data['company'] = company_data_serializer.data
    #     if data['partner']:
    #         partner_data_serializer = PartnerSerializer(value.partner)
    #         data['partner'] = partner_data_serializer.data
    #     if data['primary_contact']:
    #         primary_contact_data_serializer = EmployeeSerializer(value.primary_contact)
    #         data['primary_contact'] = primary_contact_data_serializer.data
    #     #Do not put ManyToMany fields here. See above for details
            
    #     return data

class SimpleSalesOfficeSerializer(serializers.ModelSerializer):

    class Meta:
        model = SalesOffice
        fields = ['id', 'salesoffice_name', 'salesoffice_number']