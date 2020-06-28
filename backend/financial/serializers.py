from rest_framework import serializers
from rest_framework import exceptions

from .models import SalesTax
from companies.models import Company
from datacom.models import Datacom
from partners.models import Partner
from partners.serializers import PartnerSerializer, SimplePartnerSerializer
from datacom.serializers import DatacomSerializer, SimpleDatacomSerializer
from companies.serializers import CompanySerializer, SimpleCompanySerializer



class SalesTaxSerializer(serializers.ModelSerializer):
	datacom_obj = SimpleDatacomSerializer(read_only=True, source='datacom')
	datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
	partner_obj = SimplePartnerSerializer(read_only=True, source='partner')
	partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
	company_obj = SimpleCompanySerializer(read_only=True, source='company')
	company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)

	class Meta:
		model = SalesTax

		fields = ('__all__')

	# def to_representation(self, value):
	# 	data = super().to_representation(value)  
	# 	if data['datacom']:
	# 		datacom_data_serializer = SimpleDatacomSerializer(value.datacom)
	# 		data['datacom'] = datacom_data_serializer.data
	# 	if data['partner']:
	# 		partner_data_serializer = SimplePartnerSerializer(value.partner)
	# 		data['partner'] = partner_data_serializer.data
	# 	if data['company']:
	# 		company_data_serializer = SimpleCompanySerializer(value.company)
	# 		data['company'] = company_data_serializer.data
		
	# 	return data