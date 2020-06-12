from rest_framework import serializers
from commons.base64 import Base64ImageField

from .models import SalesOffice
from companies.models import Company
from datacom.models import Datacom
from partners.models import Partner
from employees.models import Employee
from partners.serializers import PartnerSerializer
from datacom.serializers import DatacomSerializer
from companies.serializers import CompanySerializer
from employees.serializers import EmployeeSerializer

class SalesOfficeSerializer(serializers.ModelSerializer):
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    primary_contact = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), required=False, allow_null=True)
    billing_contacts = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), many=True, required=False, allow_null=True)
    employees = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), many=True, required=False, allow_null=True)
   
    profile_img = Base64ImageField(max_length=None,
                                    use_url=True,
                                    required=False,
                                    allow_null=True,
                                    allow_empty_file=True)

    class Meta:
        model = SalesOffice
        fields = ('__all__')

    def to_representation(self, value):
        data = super().to_representation(value)  
        if data['datacom']:
            datacom_data_serializer = DatacomSerializer(value.datacom)
            data['datacom'] = datacom_data_serializer.data
        if data['company']:
            company_data_serializer = CompanySerializer(value.company)
            data['company'] = company_data_serializer.data
        if data['partner']:
            partner_data_serializer = PartnerSerializer(value.partner)
            data['partner'] = partner_data_serializer.data
        if data['primary_contact']:
            primary_contact_data_serializer = EmployeeSerializer(value.primary_contact)
            data['primary_contact'] = primary_contact_data_serializer.data
        if data['billing_contacts']:
            billing_contacts_data_serializer = EmployeeSerializer(value.billing_contacts)
            data['billing_contacts'] = billing_contacts_data_serializer.data
        if data['employees']:
            employees_data_serializer = EmployeeSerializer(value.employees)
            data['employees'] = employees_data_serializer.data
        
        return data