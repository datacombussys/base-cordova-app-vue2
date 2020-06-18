from rest_framework import serializers
from commons.base64 import Base64ImageField

from .models import Partner
from users.models import User
from datacom.models import Datacom,CommonBarcode
from users.serializers import UserSerializer
from datacom.serializers import DatacomSerializer, CommonBarcodeSerializer

class PartnerSimpleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Partner
        fields = ('id', 'dba_name', 'legal_name')

class PartnerSerializer(serializers.ModelSerializer):
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
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

class PartnerSimpleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Partner
        fields = ('id', 'dba_name', 'legal_name', 'datacom__id')