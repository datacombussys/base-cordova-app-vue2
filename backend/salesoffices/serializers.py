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
from employees.serializers import EmployeeSerializer, SimpleEmployeeSerializer

class SalesOfficeSerializer(serializers.ModelSerializer):
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    primary_contact = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), required=False, allow_null=True)
    billing_contacts = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), many=True, read_only=False, required=False, allow_null=True)
    billing_contacts_list = SimpleEmployeeSerializer(many=True, read_only=True, source='billing_contacts')
    employees = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), many=True, required=False, allow_null=True)
    employee_list = SimpleEmployeeSerializer(many=True, read_only=True, source='employees')

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
        # if data['datacom']:
        #     datacom_data_serializer = DatacomSerializer(value.datacom)
        #     data['datacom'] = datacom_data_serializer.data
        if data['company']:
            company_data_serializer = CompanySerializer(value.company)
            data['company'] = company_data_serializer.data
        if data['partner']:
            partner_data_serializer = PartnerSerializer(value.partner)
            data['partner'] = partner_data_serializer.data
        if data['primary_contact']:
            primary_contact_data_serializer = EmployeeSerializer(value.primary_contact)
            data['primary_contact'] = primary_contact_data_serializer.data
        #Do not put ManyToMany fields here. See above for details
            
        return data