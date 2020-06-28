from rest_framework import serializers
from commons.base64 import Base64ImageField

from .models import Partner
from users.models import User
from datacom.models import Datacom,CommonBarcode
from users.serializers import UserSerializer, SimpleUserSerializer
from datacom.serializers import DatacomSerializer, SimpleDatacomSerializer
from commons.serializers import CommonBarcodeSerializer, SimpleBarcodeSerializer

class SimplePartnerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Partner
        fields = ('id', 'dba_name', 'legal_name')

class PartnerSerializer(serializers.ModelSerializer):
    datacom_obj = SimpleDatacomSerializer(read_only=True, source='datacom')
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    created_by_obj = SimpleUserSerializer(read_only=True, source='created_by')
    created_by  = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
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

    def to_representation(self, value):
        data = super().to_representation(value)  
        if data['datacom']:
            datacom_data_serializer = DatacomSerializer(value.datacom)
            data['datacom'] = datacom_data_serializer.data
        if data['user']:
            user_data_serializer = UserSerializer(value.user)
            data['user'] = user_data_serializer.data
        if data['barcode']:
            barcode_data_serializer = CommonBarcodeSerializer(value.barcode)
            data['barcode'] = barcode_data_serializer.data
        
        return data

class SimplePartnerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Partner
        fields = ('id', 'dba_name', 'legal_name', 'datacom__id')