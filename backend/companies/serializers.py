from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required

from rest_framework import serializers
from rest_framework import exceptions

from commons.base64 import Base64ImageField
from datacom.common_models import CommonBarcode
from users.models import User
from .models import Company
from datacom.models import Datacom
from partners.models import Partner
from partners.serializers import PartnerSerializer
from datacom.serializers import DatacomSerializer, CommonBarcodeSerializer


class CompanySimpleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = ('id', 'dba_name', 'legal_name')

class CompanySerializer(serializers.ModelSerializer):
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    created_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
    barcode = serializers.PrimaryKeyRelatedField(queryset=CommonBarcode.objects.all(), required=False, allow_null=True)
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

    def to_representation(self, value):
        data = super().to_representation(value)  
        if data['datacom']:
            datacom_data_serializer = DatacomSerializer(value.datacom)
            data['datacom'] = datacom_data_serializer.data
        if data['partner']:
            partner_data_serializer = PartnerSerializer(value.partner)
            data['partner'] = partner_data_serializer.data
        if data['barcode']:
            barcode_data_serializer = CommonBarcodeSerializer(value.barcode)
            data['barcode'] = barcode_data_serializer.data
        
        return data

class CompanySimpleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = ('id', 'dba_name', 'legal_name', 'datacom__id', 'partner__id')

   

