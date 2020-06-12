from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required

from rest_framework import serializers
from rest_framework import exceptions

from commons.base64 import Base64ImageField

from users.models import User
from .models import Customer
from companies.models import Company
from datacom.models import Datacom
from partners.models import Partner
from partners.serializers import PartnerSerializer
from datacom.serializers import DatacomSerializer
from companies.serializers import CompanySerializer
from users.serializers import UserSerializer
from employees.models import Employee


class CustomerSerializer(serializers.ModelSerializer):
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
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

    def to_representation(self, value):
        data = super().to_representation(value)  
        if data['user']:
            user_data_serializer = UserSerializer(value.user)
            data['user'] = user_data_serializer.data
        if data['datacom']:
            datacom_data_serializer = DatacomSerializer(value.datacom)
            data['datacom'] = datacom_data_serializer.data
        if data['company']:
            company_data_serializer = CompanySerializer(value.company)
            data['company'] = company_data_serializer.data
        if data['partner']:
            partner_data_serializer = PartnerSerializer(value.partner)
            data['partner'] = partner_data_serializer.data
        
        return data


