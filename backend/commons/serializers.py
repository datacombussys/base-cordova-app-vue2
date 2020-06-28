from rest_framework import serializers

from .models import Industry, UOMWeight, UOMDimensions
from commons.models import CommonBarcode

class IndustrySerializer(serializers.ModelSerializer):
  class Meta:
    model = Industry
    fields = '__all__'

class UOMWeightSerializer(serializers.ModelSerializer):
    class Meta:
        model = UOMWeight
        fields = ('__all__')

class UOMDimensionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UOMDimensions
        fields = ('__all__')
    
class CommonBarcodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommonBarcode
        fields = ('__all__')

class SimpleBarcodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommonBarcode
        fields = ['id', 'image', 'barcode_number']
