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
from partners.serializers import PartnerSerializer, PartnerListSerializer
from datacom.serializers import DatacomSerializer, DatacomListSerializer
from companies.serializers import CompanySerializer, CompanyListSerializer
from commons.serializers import CommonBarcodeSerializer, SimpleBarcodeSerializer
from users.serializers import UserSerializer, UserListSerializer
from employees.models import Employee
from employees.serializers import EmployeeListSerializer


class CustomerSerializer(serializers.ModelSerializer):
    datacom_obj = DatacomListSerializer(read_only=True, source='datacom')
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner_obj = PartnerListSerializer(read_only=True, source='partner')
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company_obj = CompanyListSerializer(read_only=True, source='company')
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    barcode_obj = CommonBarcodeSerializer(read_only=True, source='barcode')
    barcode = serializers.PrimaryKeyRelatedField(queryset=CommonBarcode.objects.all(), required=False, allow_null=True)
    user_obj = UserListSerializer(read_only=True, source='user')
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
    sales_rep_obj = EmployeeListSerializer(read_only=True, source='sales_rep')
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


class SimpleCustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = ['id', 'user', 'customer_number', 'customer_type']


