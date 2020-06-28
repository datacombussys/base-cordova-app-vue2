from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required

from rest_framework import serializers
from rest_framework import exceptions

from commons.base64 import Base64ImageField

from users.models import User
from .models import Customer
from companies.models import Company
from datacom.models import Datacom, CommonBarcode
from partners.models import Partner
from partners.serializers import PartnerSerializer, SimplePartnerSerializer
from datacom.serializers import DatacomSerializer, SimpleDatacomSerializer
from companies.serializers import CompanySerializer, SimpleCompanySerializer
from commons.serializers import CommonBarcodeSerializer, SimpleBarcodeSerializer
from users.serializers import UserSerializer, SimpleUserSerializer
from employees.models import Employee
from employees.serializers import SimpleEmployeeSerializer


class CustomerSerializer(serializers.ModelSerializer):
    datacom_obj = SimpleDatacomSerializer(read_only=True, source='datacom')
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner_obj = SimplePartnerSerializer(read_only=True, source='partner')
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company_obj = SimpleCompanySerializer(read_only=True, source='company')
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    barcode_obj = CommonBarcodeSerializer(read_only=True, source='barcode')
    barcode = serializers.PrimaryKeyRelatedField(queryset=CommonBarcode.objects.all(), required=False, allow_null=True)
    user_obj = SimpleUserSerializer(read_only=True, source='user')
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
    sales_rep_obj = SimpleEmployeeSerializer(read_only=True, source='sales_rep')
    sales_rep = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), required=False, allow_null=True)

    profile_img = Base64ImageField(max_length=None,
                                    use_url=True,
                                    required=False,
                                    allow_null=True,
                                    allow_empty_file=True)
    class Meta:
        model = Customer
        fields = ('__all__')
   

    def create(self, validated_data):
        """Create and Return a new user"""
        customer = Customer.objects.create(**validated_data)
        print("Customer Created by serializer") 
        
        return customer 

    def update(self, instance, validated_data):
        """Update Instance"""
        for key in validated_data.keys():
            if key in instance.__dict__.keys():
                setattr(instance, key, validated_data[key])
        
        print("Customer Updated by serializer")

        instance.save()
        return instance

    # def to_representation(self, value):
    #     data = super().to_representation(value)  
    #     if data['user']:
    #         user_data_serializer = UserSerializer(value.user)
    #         data['user'] = user_data_serializer.data
    #     if data['datacom']:
    #         datacom_data_serializer = DatacomSerializer(value.datacom)
    #         data['datacom'] = datacom_data_serializer.data
    #     if data['company']:
    #         company_data_serializer = CompanySerializer(value.company)
    #         data['company'] = company_data_serializer.data
    #     if data['partner']:
    #         partner_data_serializer = PartnerSerializer(value.partner)
    #         data['partner'] = partner_data_serializer.data
        
    #     return data


