from rest_framework import serializers
from commons.base64 import Base64ImageField

from companies.models import Company
from datacom.models import Datacom, CommonBarcode
from partners.models import Partner
from .models import Vendor
from users.models import User
from users.serializers import UserSerializer, SimpleUserSerializer
from partners.serializers import PartnerSerializer, SimplePartnerSerializer
from datacom.serializers import DatacomSerializer, SimpleDatacomSerializer, CommonBarcodeSerializer
from companies.serializers import CompanySerializer, SimpleCompanySerializer

class VendorSerializer(serializers.ModelSerializer):
    datacom_obj = SimpleDatacomSerializer(read_only=True, source='datacom')
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner_obj = SimplePartnerSerializer(read_only=True, source='partner')
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company_obj = SimpleCompanySerializer(read_only=True, source='company')
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    barcode = CommonBarcodeSerializer(read_only=True, source='barcode')
    barcode = serializers.PrimaryKeyRelatedField(queryset=CommonBarcode.objects.all(), required=False, allow_null=True)

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
        model = Vendor
        fields = ('__all__')

    def create(self, validated_data):
        print('vendor create validated_data', validated_data)
        vendor = Vendor.objects.create_vendor(**validated_data)
        return vendor 

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
    #     if data['barcode']:
    #         barcode_data_serializer = CommonBarcodeSerializer(value.barcode)
    #         data['barcode'] = barcode_data_serializer.data
        
    #     return data

class SimpleVendorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vendor
        fields = ('id', 'dba_name', 'legal_name', 'datacom__id', 'partner__id','company__id')