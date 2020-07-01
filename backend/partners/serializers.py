from rest_framework import serializers
from commons.base64 import Base64ImageField

from .models import Partner
from users.models import User
from datacom.models import Datacom,CommonBarcode
from users.serializers import UserSerializer, UserListSerializer
from datacom.serializers import DatacomSerializer, DatacomListSerializer
from commons.serializers import CommonBarcodeSerializer, SimpleBarcodeSerializer

class PartnerListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Partner
        fields = ('id', 'dba_name', 'legal_name')

class PartnerSerializer(serializers.ModelSerializer):
    datacom_obj = DatacomListSerializer(read_only=True, source='datacom')
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    created_by_obj = UserListSerializer(read_only=True, source='created_by')
    created_by  = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
    barcode_obj = CommonBarcodeSerializer(read_only=True, source='barcode')
    barcode = serializers.PrimaryKeyRelatedField(queryset=CommonBarcode.objects.all(), required=False, allow_null=True)

    profile_img = Base64ImageField(max_length=None,
                                    use_url=True,
                                    required=False,
                                    allow_null=True,
                                    allow_empty_file=True)

    class Meta:
        model = Partner
        fields = ('__all__')

    def create(self, validated_data):
        partner = Partner.objects.create_partner(**validated_data)
        return partner 

class PartnerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        read_only_fields = ['id']
        fields = ['id', 'date_added', 'account_number', 'dba_name', 'domain', 'is_active', 'profile_img', 'acct_closure_date']

class PartnerPrimaryContactSerializer(serializers.ModelSerializer):
    primary_contacts_list = UserListSerializer(many=True, read_only=True, source='primary_contacts')
    primary_contacts = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True)
    class Meta:
        model = Partner
        read_only_fields = ['dba_name']
        fields = ['id', 'dba_name', 'primary_contacts_list', 'primary_contacts']

class PartnerShippingContactSerializer(serializers.ModelSerializer):
    shipping_contacts_list = UserListSerializer(many=True, read_only=True, source='shipping_contacts')
    shipping_contacts = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True)
    class Meta:
        model = Partner
        read_only_fields = ['dba_name']
        fields = ['id', 'dba_name', 'shipping_contacts_list', 'shipping_contacts']

class PartnerBillingContactSerializer(serializers.ModelSerializer):
    billing_contact_list = UserListSerializer(many=True, read_only=True, source='billing_contacts')
    billing_contacts = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True)
    class Meta:
        model = Partner
        read_only_fields = ['dba_name']
        fields = ['id', 'dba_name', 'billing_contacts_list', 'billing_contacts']

class PartnerTechnicalContactSerializer(serializers.ModelSerializer):
    technical_contacts_list = UserListSerializer(many=True, read_only=True, source='technical_contacts')
    technical_contacts = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, allow_null=True)
    class Meta:
        model = Partner
        read_only_fields = ['dba_name']
        fields = ['id', 'dba_name', 'technical_contacts_list', 'technical_contacts']