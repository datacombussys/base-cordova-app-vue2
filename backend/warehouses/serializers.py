from rest_framework import serializers
from commons.base64 import Base64ImageField

from .models import Warehouse
from datacom.common_models import CommonBarcode
from companies.models import Company
from datacom.models import Datacom
from partners.models import Partner
from salesoffices.models import SalesOffice
from employees.models import Employee
from partners.serializers import PartnerSerializer
from datacom.serializers import DatacomSerializer, CommonBarcodeSerializer
from companies.serializers import CompanySerializer
from salesoffices.serializers import SalesOfficeSerializer
from employees.serializers import EmployeeSerializer

class WarehouseSerializer(serializers.ModelSerializer):
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    sales_offices = serializers.PrimaryKeyRelatedField(queryset=SalesOffice.objects.all(), many=True, required=False, allow_null=True)
    shipping_contacts = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), many=True, required=False, allow_null=True)
    employees = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), many=True, required=False, allow_null=True)
    primary_contact = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), required=False, allow_null=True)
    barcode = serializers.PrimaryKeyRelatedField(queryset=CommonBarcode.objects.all(), required=False, allow_null=True)
    profile_img = Base64ImageField(max_length=None,
                                    use_url=True,
                                    required=False,
                                    allow_null=True,
                                    allow_empty_file=True)

    class Meta:
        model = Warehouse
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
        if data['sales_offices']:
            sales_offices_data_serializer = SalesOfficeSerializer(value.sales_offices)
            data['sales_offices'] = sales_offices_data_serializer.data
        if data['barcode']:
            barcode_data_serializer = CommonBarcodeSerializer(value.barcode)
            data['barcode'] = barcode_data_serializer.data
        if data['primary_contact']:
            primary_contact_data_serializer = EmployeeSerializer(value.primary_contact)
            data['primary_contact'] = primary_contact_data_serializer.data
        if data['shipping_contacts']:
            shipping_contacts_data_serializer = EmployeeSerializer(value.shipping_contacts)
            data['shipping_contacts'] = shipping_contacts_data_serializer.data
        if data['employees']:
            employees_data_serializer = EmployeeSerializer(value.employees)
            data['employees'] = employees_data_serializer.data
       
        return data