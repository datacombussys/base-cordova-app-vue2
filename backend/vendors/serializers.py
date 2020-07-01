from rest_framework import serializers
from commons.base64 import Base64ImageField

from companies.models import Company
from datacom.models import Datacom, CommonBarcode
from partners.models import Partner
from .models import Vendor
from users.models import User
from users.serializers import UserSerializer, UserListSerializer
from partners.serializers import PartnerSerializer, PartnerListSerializer
from datacom.serializers import DatacomSerializer, DatacomListSerializer, CommonBarcodeSerializer
from companies.serializers import CompanySerializer, SimpleCompanySerializer

class VendorSerializer(serializers.ModelSerializer):
    datacom_obj = DatacomListSerializer(read_only=True, source='datacom')
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner_obj = PartnerListSerializer(read_only=True, source='partner')
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company_obj = SimpleCompanySerializer(read_only=True, source='company')
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    barcode = CommonBarcodeSerializer(read_only=True, source='barcode')
    barcode = serializers.PrimaryKeyRelatedField(queryset=CommonBarcode.objects.all(), required=False, allow_null=True)

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

class SimpleVendorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vendor
        fields = ('id', 'dba_name', 'legal_name', 'datacom__id', 'partner__id','company__id')

class VendorListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        read_only_fields = ['id']
        fields = ['id', 'date_added', 'account_number', 'domain', 'dba_name', 'is_active', 'profile_img']

class VendorPrimaryContactSerializer(serializers.ModelSerializer):
    primary_contacts_list = UserListSerializer(many=True, read_only=True, source='primary_contacts')
    primary_contacts = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True)
    class Meta:
        model = Vendor
        read_only_fields = ['dba_name']
        fields = ['id', 'dba_name', 'primary_contacts_list', 'primary_contacts']

class VendorShippingContactSerializer(serializers.ModelSerializer):
    shipping_contacts_list = UserListSerializer(many=True, read_only=True, source='shipping_contacts')
    shipping_contacts = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True)
    class Meta:
        model = Vendor
        read_only_fields = ['dba_name']
        fields = ['id', 'dba_name', 'shipping_contacts_list', 'shipping_contacts']

class VendorBillingContactSerializer(serializers.ModelSerializer):
    billing_contact_list = UserListSerializer(many=True, read_only=True, source='billing_contacts')
    billing_contacts = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True)
    class Meta:
        model = Vendor
        read_only_fields = ['dba_name']
        fields = ['id', 'dba_name', 'billing_contacts_list', 'billing_contacts']

class VendorTechnicalContactSerializer(serializers.ModelSerializer):
    technical_contacts_list = UserListSerializer(many=True, read_only=True, source='technical_contacts')
    technical_contacts = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True)
    class Meta:
        model = Vendor
        read_only_fields = ['dba_name']
        fields = ['id', 'dba_name', 'technical_contacts_list', 'technical_contacts']