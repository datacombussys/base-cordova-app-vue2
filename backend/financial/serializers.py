from rest_framework import serializers
from rest_framework import exceptions

from .models import SalesTax
from companies.models import Company
from datacom.models import Datacom
from partners.models import Partner
from datacom.serializers import DatacomSerializer, DatacomSimpleSerializer
from partners.serializers import PartnerSerializer, PartnerSimpleSerializer
from companies.serializers import CompanySerializer, CompanySimpleSerializer



class SalesTaxSerializer(serializers.ModelSerializer):
	datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
	partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
	company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)

	class Meta:
		model = SalesTax

		fields = ('__all__')

	def to_representation(self, value):
		data = super().to_representation(value)  
		if data['datacom']:
			datacom_data_serializer = DatacomSimpleSerializer(value.datacom)
			data['datacom'] = datacom_data_serializer.data
		if data['partner']:
			partner_data_serializer = PartnerSimpleSerializer(value.partner)
			data['partner'] = partner_data_serializer.data
		if data['company']:
			company_data_serializer = CompanySimpleSerializer(value.company)
			data['company'] = company_data_serializer.data
		
		
		return data