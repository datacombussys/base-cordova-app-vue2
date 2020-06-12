from rest_framework import serializers

from companies.models import Company
from datacom.models import Datacom
from partners.models import Partner
from employees.models import Employee
from .models import Lead
from partners.serializers import PartnerSerializer
from datacom.serializers import DatacomSerializer
from companies.serializers import CompanySerializer

class LeadSerializer(serializers.ModelSerializer):
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    employee = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Lead
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
        
        return data