from rest_framework import serializers
from commons.base64 import Base64ImageField

from .models import Datacom
from datacom.common_models import CommonBarcode

class CommonBarcodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommonBarcode
        fields = ('__all__')


class DatacomSerializer(serializers.ModelSerializer):
    barcode = serializers.PrimaryKeyRelatedField(queryset=CommonBarcode.objects.all(), required=False, allow_null=True)
    profile_img = Base64ImageField(max_length=None,
                                    use_url=True,
                                    required=False,
                                    allow_null=True,
                                    allow_empty_file=True)
    class Meta:
        model = Datacom
        fields = ('__all__')

    def create(self, validated_data):
        datacom = Datacom.objects.create_datacom(**validated_data)
        return datacom

    def to_representation(self, value):
        data = super().to_representation(value)  
        if data['barcode']:
            barcode_data_serializer = CommonBarcodeSerializer(value.barcode)
            data['barcode'] = barcode_data_serializer.data
        
        return data

class DatacomSimpleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Datacom
        fields = ('id', 'dba_name', 'legal_name')

