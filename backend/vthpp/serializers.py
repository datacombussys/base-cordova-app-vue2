from rest_framework import serializers
from commons.base64 import Base64ImageField
from django.contrib.auth.hashers import make_password
from django.core.validators import RegexValidator
from rest_framework import exceptions
from datetime import datetime
from rest_framework.settings import api_settings

from .models import (CardProcessingAPIKey,		
                      CreditCard,
                      ACHAccount,
                      ForteACHTransaction, 
                      ForteACHStatusCode,
                      ForteACHResponseCode,
                      ForteACHReturnCode,
                      ForteACHSettlementCode, 
											Transaction, 
											CardManager, )
from datacom.models import Datacom
from partners.models import Partner
from companies.models import Company
from users.models import User
from commons2.models import Shipping
from customers.models import Customer
from inventory.models import Inventory
from partners.serializers import PartnerListSerializer
from datacom.serializers import DatacomListSerializer
from companies.serializers import CompanyListSerializer
from users.serializers import UserListSerializer
from .elavon_validation import Validation


#******************************************* ACH *************************************************

class ForteACHTransactionSerializer(serializers.ModelSerializer):
	class Meta:
		model = ForteACHTransaction
		fields = ('__all__')

class ForteACHResponseCodeSerializer(serializers.ModelSerializer):
	class Meta:
		model = ForteACHResponseCode
		fields = ('__all__')

class ForteACHReturnCodeCodeSerializer(serializers.ModelSerializer):
	class Meta:
		model = ForteACHReturnCode
		fields = ('__all__')

class ForteACHSettlementCodeSerializer(serializers.ModelSerializer):
	class Meta:
		model = ForteACHSettlementCode
		fields = ('__all__')

class ForteACHStatusCodeSerializer(serializers.ModelSerializer):
	class Meta:
		model = ForteACHStatusCode
		fields = ('__all__')


class ACHAccountSerializer(serializers.ModelSerializer):
	datacom_obj = DatacomListSerializer(read_only=True, source='datacom')
	datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
	partner_obj = PartnerListSerializer(read_only=True, source='partner')
	partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
	company_obj = CompanyListSerializer(read_only=True, source='company')
	company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
	user_obj = UserListSerializer(read_only=True, source='user')
	user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
	
	account_number = serializers.CharField(max_length=200, required=False, allow_blank=True)
  
	class Meta:
		model = ACHAccount
		fields = ('__all__')

	def create(self, validated_data):
		accountToken = make_password(validated_data['account_number'])
		print('tokenCard', accountToken)
		validated_data['account_number_token'] = accountToken
		achAccount = ACHAccount.objects.create_ach_account(**validated_data)
		return achAccount 


class ForteACHTransactionSerializer(serializers.ModelSerializer):
	datacom_obj = DatacomListSerializer(read_only=True, source='datacom')
	datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
	partner_obj = PartnerListSerializer(read_only=True, source='partner')
	partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
	company_obj = CompanyListSerializer(read_only=True, source='company')
	company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)

	status_code_obj = ForteACHStatusCodeSerializer(read_only=True, source='status_code')
	status_code = serializers.PrimaryKeyRelatedField(queryset=ForteACHStatusCode.objects.all(), required=False, allow_null=True)
	response_code_obj = ForteACHResponseCodeSerializer(read_only=True, source='response_code')
	response_code = serializers.PrimaryKeyRelatedField(queryset=ForteACHResponseCode.objects.all(), required=False, allow_null=True)
	return_code_obj = ForteACHReturnCodeCodeSerializer(read_only=True, source='return_code')
	return_code = serializers.PrimaryKeyRelatedField(queryset=ForteACHReturnCode.objects.all(), required=False, allow_null=True)
	settlement_code_obj = ForteACHSettlementCodeSerializer(read_only=True, source='settlement_code')
	settlement_code = serializers.PrimaryKeyRelatedField(queryset=ForteACHSettlementCode.objects.all(), required=False, allow_null=True)

	class Meta:
		model = ForteACHTransaction
		fields = ('__all__')

class CardProcessingAPIKeySerializer(serializers.ModelSerializer):
	datacom_obj = DatacomListSerializer(read_only=True, source='datacom')
	datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
	partner_obj = PartnerListSerializer(read_only=True, source='partner')
	partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
	company_obj = CompanyListSerializer(read_only=True, source='company')
	company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
	user_obj = UserListSerializer(read_only=True, source='user')
	user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)

	class Meta:
		model = CardProcessingAPIKey
		fields = ('__all__')

	def create(self, validated_data):
		apikey = CardProcessingAPIKey.objects.create_API_key(**validated_data)
		
		return apikey

class CreditCardSerializer(serializers.ModelSerializer):
	datacom_obj = DatacomListSerializer(read_only=True, source='datacom')
	datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
	partner_obj = PartnerListSerializer(read_only=True, source='partner')
	partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
	company_obj = CompanyListSerializer(read_only=True, source='company')
	company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
	user_obj = UserListSerializer(read_only=True, source='user')
	user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
  
	class Meta:
		model = CreditCard
		fields = ('__all__')

	def create(self, validated_data):
		print("CreditCardSerializer create method")
		print("validated_data", validated_data)
		creditcard = CreditCard.objects.create_credit_card(**validated_data)
		
		return creditcard


#******************************************* Credit Card *************************************************

class ElavonSerializer(serializers.Serializer):
	datacom_obj 			= DatacomListSerializer(read_only=True, source='datacom')
	datacom 					= serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
	partner_obj 			= PartnerListSerializer(read_only=True, source='partner')
	partner 					= serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
	company_obj 			= CompanyListSerializer(read_only=True, source='company')
	company 					= serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
	# Merchant Data
	is_demo 					= serializers.BooleanField(default=False, allow_null=True, required=False)	
	ssl_test_mode			= serializers.BooleanField(default=False, allow_null=True, required=False)
	#Main Data
	ssl_transaction_type= serializers.CharField(max_length=20, allow_null=True, required=False)
	ssl_txn_id 				= serializers.CharField(max_length=46, allow_null=True, required=False)
	ssl_cvv2cvc2			= serializers.CharField(max_length=10, allow_null=True, required=False)
	ssl_exclude_account_update = serializers.CharField(max_length=1, allow_null=True, required=False) #Card Manager
	ssl_amount				= serializers.CharField(max_length=11, allow_null=True, required=False)
	ssl_dynamic_dba = serializers.CharField(max_length=21, allow_null=True, required=False)
	#Card Data
	ssl_card_number		= serializers.CharField(max_length=20, allow_null=True, required=False)
	ssl_exp_date			= serializers.CharField(max_length=4, allow_null=True, required=False)
	ssl_card_present	= serializers.CharField(max_length=1, allow_null=True, required=False)
	ssl_track_data 		= serializers.CharField(max_length=76, allow_null=True, required=False)
	ssl_enc_track_data= serializers.CharField(max_length=160, allow_null=True, required=False)
	ssl_encrypted_track1_data= serializers.CharField(max_length=160, allow_null=True, required=False)
	ssl_encrypted_track2_data= serializers.CharField(max_length=160, allow_null=True, required=False)
	ssl_ksn = serializers.CharField(max_length=20, allow_null=True, required=False)
	ssl_vm_mobile_source = serializers.CharField(max_length=10, allow_null=True, required=False)
	ssl_vendor_id = serializers.CharField(max_length=8, allow_null=True, required=False)
	ssl_mobile_id = serializers.CharField(max_length=50, allow_null=True, required=False)
	ssl_token = serializers.CharField(max_length=20, allow_null=True, required=False)
	ssl_pos_mode= serializers.CharField(max_length=2, allow_null=True, required=False)
	ssl_entry_mode = serializers.CharField(max_length=2, allow_null=True, required=False)
	#Card Token Data - Card Manager
	ssl_verify = serializers.CharField(max_length=1, allow_null=True, required=False)
	ssl_first_name = serializers.CharField(max_length=20, allow_null=True, required=False)
	ssl_last_name = serializers.CharField(max_length=20, allow_null=True, required=False)
	#Tokenization - Card Manager
	ssl_get_token = serializers.CharField(max_length=1, allow_null=True, required=False)
	ssl_add_token = serializers.CharField(max_length=1, allow_null=True, required=False)
	#Account Data - Card Manager
	ssl_company = serializers.CharField(max_length=50, allow_null=True, required=False)
	ssl_customer_id = serializers.CharField(max_length=255, allow_null=True, required=False)
	ssl_avs_address = serializers.CharField(max_length=30, allow_null=True, required=False)
	ssl_address2 = serializers.CharField(max_length=30, allow_null=True, required=False)
	ssl_avs_zip = serializers.CharField(max_length=9, allow_null=True, required=False)
	ssl_city = serializers.CharField(max_length=30, allow_null=True, required=False)
	ssl_state = serializers.CharField(max_length=2, allow_null=True, required=False)
	ssl_country = serializers.CharField(max_length=3, allow_null=True, required=False)
	ssl_email = serializers.CharField(max_length=100, allow_null=True, required=False)
	ssl_phone = serializers.CharField(max_length=10, allow_null=True, required=False)
	ssl_description = serializers.CharField(max_length=255, allow_null=True, required=False)
	#Card Verification
	ssl_cvv2cvc2 = serializers.CharField(max_length=4, allow_null=True, required=False)
	ssl_cvv2cvc_indicator = serializers.CharField(max_length=1, allow_null=True, required=False)
	#Tip Data
	ssl_tip_amount = serializers.CharField(max_length=11, allow_null=True, required=False)
	ssl_server = serializers.CharField(max_length=8, allow_null=True, required=False)
	ssl_shift = serializers.CharField(max_length=4, allow_null=True, required=False)
	#Recurring Data
	ssl_recurring_flag = serializers.CharField(max_length=1, allow_null=True, required=False)
	ssl_payment_number = serializers.IntegerField(max_value=None, min_value=None, allow_null=True, required=False)
	ssl_payment_count = serializers.IntegerField(max_value=None, min_value=None, allow_null=True, required=False)
	#Card On File
	ssl_merchant_initiated_unscheduled = serializers.CharField(max_length=1, allow_null=True, required=False)
	ssl_oar_data = serializers.CharField(max_length=60, allow_null=True, required=False)
	ssl_ps2000_data = serializers.CharField(max_length=22, allow_null=True, required=False)
	#Optional Data
	ssl_avs_address = serializers.CharField(max_length=30, allow_null=True, required=False)
	ssl_avs_zip = serializers.CharField(max_length=9, allow_null=True, required=False)
	ssl_description = serializers.CharField(max_length=255, allow_null=True, required=False)
	ssl_partial_auth_indicator = serializers.CharField(max_length=1, allow_null=True, required=False)
	#Email Data
	ssl_email = serializers.CharField(max_length=100, allow_null=True, required=False)
	ssl_update_email = serializers.CharField(max_length=1, allow_null=True, required=False)
	ssl_do_customer_email = serializers.CharField(max_length=1, allow_null=True, required=False)
	ssl_do_merchant_email = serializers.CharField(max_length=1, allow_null=True, required=False)
	#To Representation
	date_added 					= serializers.DateTimeField(format=api_settings.DATETIME_FORMAT, input_formats=None, default_timezone=None, allow_null=True, required=False)
	txn_id 							= serializers.CharField(max_length=255, read_only=True, allow_null=True, required=False)
	result 							= serializers.CharField(max_length=2, read_only=True, allow_null=True, required=False)
	approval_code 			= serializers.CharField(max_length=255, read_only=True, allow_null=True, required=False)
	success							= serializers.BooleanField(default=False, read_only=True, allow_null=True, required=False)
	
	def to_representation(self, instance):
		data = super().to_representation(instance)
		if data['datacom']:
			datacom_data_serializer = DatacomListSerializer(instance.datacom)
			data['datacom_obj'] = datacom_data_serializer.data
		if data['partner']:
			partner_data_serializer = DatacomListSerializer(instance.partner)
			data['partner_obj'] = partner_data_serializer.data
		if data['company']:
			company_data_serializer = DatacomListSerializer(instance.company)
			data['company_obj'] = company_data_serializer.data
		return {
			'datacom': instance.datacom_id,
			'datacom_obj': data['datacom_obj'],
			'partner': instance.partner_id,
			'partner_obj': data['partner_obj'],
			'company': instance.company_id,
			'company_obj': data['company_obj'],
			'date_added': instance.date_added,
			'success': instance.success,
			'txn_id': instance.txn_id,
			'result': instance.result,
			'approval_code': instance.approval_code,
		}

	def create(self, validated_data):
		transaction  = Transaction.objects.create_transaction(**validated_data)
		
		return transaction

	def validate(self, data):
		"""
		Import Elavon Validaitons and Verify Fields
		"""
		print('validate data', data)
		method = data.get('ssl_transaction_type', None)
		print('method', method)

		# Merchant API Data is passed in on the Model Manager
		# if not Validation.merchant_info(self, **data):
		# 	raise serializers.ValidationError("Failed Merchant Account Validation. Missing Merchant information")

		if not getattr(Validation, method)(self, **data):
			raise serializers.ValidationError("Failed Validation")

		print("Validation Complete, Make POST")

		return data

class TransactionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Transaction
		read_only=True
		fields = ('__all__')

class CardManagerSerializer(serializers.Serializer):
	def create(self, validated_data):
		token  = CardManager.objects.add_card_to_manager(**validated_data)
		
		return token
	
