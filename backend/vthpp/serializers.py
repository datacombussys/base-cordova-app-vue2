from rest_framework import serializers
from commons.base64 import Base64ImageField
from django.contrib.auth.hashers import make_password

from .models import (CardProcessingAccount,
                      CreditCard,
                      ACHAccount,
                      ForteACHTransaction, 
                      ForteACHStatusCode,
                      ForteACHResponseCode,
                      ForteACHReturnCode,
                      ForteACHSettlementCode, )

from datacom.models import Datacom
from partners.models import Partner
from companies.models import Company
from users.models import User
from commons2.models import Shipping
from customers.models import Customer
from inventory.models import Inventory
from partners.serializers import PartnerSerializer
from datacom.serializers import DatacomSerializer
from companies.serializers import CompanySerializer
from users.serializers import UserSerializer

class CardProcessingAccountSerializer(serializers.ModelSerializer):
  datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
  partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
  company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
  user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True) 
  
  class Meta:
    model = CardProcessingAccount
    fields = ('__all__')
      
  def to_representation(self, value):
    data = super().to_representation(value)  
    if data['datacom']:
      datacom_data_serializer = DatacomSerializer(value.datacom)
      data['datacom'] = datacom_data_serializer.data
    if data['partner']:
      partner_data_serializer = PartnerSerializer(value.partner)
      data['partner'] = partner_data_serializer.data
    if data['company']:
      company_data_serializer = CompanySerializer(value.company)
      data['company'] = company_data_serializer.data
    
    return data


class CreditCardSerializer(serializers.ModelSerializer):
  datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
  partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
  company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
  user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True) 
  
  class Meta:
    model = CreditCard
    fields = ('__all__')

  def create(self, validated_data):
    creditcard = CreditCard.objects.create_credit_card(**validated_data)
    
    return creditcard 

  def to_representation(self, value):
    data = super().to_representation(value)  
    if data['datacom']:
      datacom_data_serializer = DatacomSerializer(value.datacom)
      data['datacom'] = datacom_data_serializer.data
    if data['partner']:
      partner_data_serializer = PartnerSerializer(value.partner)
      data['partner'] = partner_data_serializer.data
    if data['company']:
      company_data_serializer = CompanySerializer(value.company)
      data['company'] = company_data_serializer.data  
    return data


class ACHAccountSerializer(serializers.ModelSerializer):
  datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
  partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
  company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
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

  def to_representation(self, value):
    data = super().to_representation(value)  
    if data['datacom']:
      datacom_data_serializer = DatacomSerializer(value.datacom)
      data['datacom'] = datacom_data_serializer.data
    if data['partner']:
      partner_data_serializer = PartnerSerializer(value.partner)
      data['partner'] = partner_data_serializer.data
    if data['company']:
      company_data_serializer = CompanySerializer(value.company)
      data['company'] = company_data_serializer.data  
    return data

class ForteACHTransactionSerializer(serializers.ModelSerializer):
  datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
  partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
  company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
  status_code = serializers.PrimaryKeyRelatedField(queryset=ForteACHStatusCode.objects.all(), required=False, allow_null=True)
  response_code = serializers.PrimaryKeyRelatedField(queryset=ForteACHResponseCode.objects.all(), required=False, allow_null=True) 
  return_code = serializers.PrimaryKeyRelatedField(queryset=ForteACHReturnCode.objects.all(), required=False, allow_null=True) 
  settlement_code = serializers.PrimaryKeyRelatedField(queryset=ForteACHSettlementCode.objects.all(), required=False, allow_null=True) 

  class Meta:
    model = ForteACHTransaction
    fields = ('__all__')

  def to_representation(self, value):
    data = super().to_representation(value)  
    if data['datacom']:
      datacom_data_serializer = DatacomSerializer(value.datacom)
      data['datacom'] = datacom_data_serializer.data
    if data['partner']:
      partner_data_serializer = PartnerSerializer(value.partner)
      data['partner'] = partner_data_serializer.data
    if data['company']:
      company_data_serializer = CompanySerializer(value.company)
      data['company'] = company_data_serializer.data  
    return data