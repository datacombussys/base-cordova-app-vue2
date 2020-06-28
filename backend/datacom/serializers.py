from rest_framework import serializers
from commons.base64 import Base64ImageField

from .models import Datacom
from commons.models import CommonBarcode
from commons.serializers import CommonBarcodeSerializer
from commons.models import Industry
from commons.serializers import IndustrySerializer
from humanresources.models import CompanyDocuments
from humanresources.serializers import CompanyDocumentsSerializer
from users.models import User
from users.serializers import SimpleUserSerializer


class DatacomSerializer(serializers.ModelSerializer):
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
        model = Datacom
        fields = ('__all__')

    def create(self, validated_data):
        datacom = Datacom.objects.create_datacom(**validated_data)
        return datacom

    # def to_representation(self, value):
    #     data = super().to_representation(value)  
    #     if data['barcode']:
    #         barcode_data_serializer = CommonBarcodeSerializer(value.barcode)
    #         data['barcode'] = barcode_data_serializer.data
        
    #     return data

class SimpleDatacomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Datacom
        fields = ('id', 'dba_name', 'legal_name')

