from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required

from rest_framework import serializers
from rest_framework import exceptions

from commons.base64 import Base64ImageField
from users.models import User
from users.serializers import SimpleUserSerializer
from .models import Company
from commons.models import Industry, CommonBarcode
from commons.serializers import IndustrySerializer, CommonBarcodeSerializer, SimpleBarcodeSerializer
from humanresources.models import CompanyDocuments
from humanresources.serializers import CompanyDocumentsSerializer

from datacom.models import Datacom
from partners.models import Partner
from partners.serializers import PartnerSerializer, SimplePartnerSerializer
from datacom.serializers import DatacomSerializer, SimpleDatacomSerializer


class SimpleCompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = ('id', 'dba_name', 'legal_name')

class CompanySerializer(serializers.ModelSerializer):
    datacom_obj = SimpleDatacomSerializer(read_only=True, source='datacom')
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner_obj = SimplePartnerSerializer(read_only=True, source='partner')
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    created_by_obj = SimpleUserSerializer(read_only=True, source='created_by')
    created_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
    barcode_obj = CommonBarcodeSerializer(read_only=True, source='barcode')
    barcode = serializers.PrimaryKeyRelatedField(queryset=CommonBarcode.objects.all(), required=False, allow_null=True)
    company_docs_obj = CompanyDocumentsSerializer(read_only=True, source='company_docs')
    company_docs = serializers.PrimaryKeyRelatedField(queryset=CompanyDocuments.objects.all(), required=False, allow_null=True)
    industry_obj = IndustrySerializer(read_only=True, source='industry')
    industry = serializers.PrimaryKeyRelatedField(queryset=Industry.objects.all(), required=False, allow_null=True)

    primary_contact_list = SimpleUserSerializer(many=True, read_only=True, source='primary_contacts')
    primary_contacts = serializers.ManyRelatedField(child_relation=serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True), allow_null=True)
    billing_contact_list = SimpleUserSerializer(many=True, read_only=True, source='billing_contacts')
    billing_contacts = serializers.ManyRelatedField(child_relation=serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True), allow_null=True)
    technical_contacts_list = SimpleUserSerializer(many=True, read_only=True, source='technical_contacts')
    technical_contacts = serializers.ManyRelatedField(child_relation=serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True), allow_null=True)
    shipping_contacts_list = SimpleUserSerializer(many=True, read_only=True, source='shipping_contacts')
    shipping_contacts = serializers.ManyRelatedField(child_relation=serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True), allow_null=True)

    profile_img = Base64ImageField(max_length=None,
                                    use_url=True,
                                    required=False,
                                    allow_null=True,
                                    allow_empty_file=True)
    class Meta:
        model = Company
        fields = ('__all__')
        
    def create(self, validated_data):
        """Create and Return a new user uses this method
        The request comes from Views then to Serializers, then to models.
        This is where I can call custom model methods"""
        company = Company.objects.create_company(**validated_data)
        print("Company Created by serializer") 
        
        return company

    def update(self, instance, validated_data):
        """Update Instance"""
        for key in validated_data.keys():
            if key in instance.__dict__.keys():
                setattr(instance, key, validated_data[key])
        
        print("company Updated by serializer")

        instance.save()
        return instance

    # def to_representation(self, value):
    #     data = super().to_representation(value)  
    #     if data['datacom']:
    #         datacom_data_serializer = DatacomSerializer(value.datacom)
    #         data['datacom'] = datacom_data_serializer.data
    #     if data['partner']:
    #         partner_data_serializer = PartnerSerializer(value.partner)
    #         data['partner'] = partner_data_serializer.data
    #     if data['barcode']:
    #         barcode_data_serializer = CommonBarcodeSerializer(value.barcode)
    #         data['barcode'] = barcode_data_serializer.data
        
    #     return data

class SimpleCompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = ('id', 'dba_name', 'legal_name', 'datacom__id', 'partner__id')

   

