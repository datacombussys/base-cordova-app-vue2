from rest_framework import serializers
from commons.base64 import Base64ImageField

from companies.models import Company
from datacom.models import Datacom, CommonBarcode
from partners.models import Partner
from .models import Vendor
from partners.serializers import PartnerSerializer
from datacom.serializers import DatacomSerializer, CommonBarcodeSerializer
from companies.serializers import CompanySerializer

class VendorSerializer(serializers.ModelSerializer):
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
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
        vendor = Vendor.objects.create_vendor(**validated_data)
        return vendor 

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
        if data['barcode']:
            barcode_data_serializer = CommonBarcodeSerializer(value.barcode)
            data['barcode'] = barcode_data_serializer.data
        
        return data

        