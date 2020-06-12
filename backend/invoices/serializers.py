from rest_framework import serializers
from commons.base64 import Base64ImageField

from .models import Invoice

from datacom.models import Datacom
from partners.models import Partner
from companies.models import Company
from users.models import User
from commons2.models import Shipping
from customers.models import Customer
from inventory.models import Inventory
from partners.serializers import PartnerSerializer
from datacom.serializers import DatacomSerializer
from companies.serializers import CompanySerializer

class InvoiceSerializer(serializers.ModelSerializer):
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all(), required=False, allow_null=True)
    shipping = serializers.PrimaryKeyRelatedField(queryset=Shipping.objects.all(), required=False, allow_null=True)
    created_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)  
    inventory = serializers.PrimaryKeyRelatedField(queryset=Inventory.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Invoice
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
       
        return data