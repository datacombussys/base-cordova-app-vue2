from rest_framework import serializers

#Deactivated Citites package
# from cities.models import Country, Region, City, PostalCode

from .models import TimeZones, Holiday, Shipping, Department, GeneralSettings


from datacom.models import Datacom
from partners.models import Partner
from companies.models import Company
from vendors.models import Vendor
from users.models import User

from partners.serializers import PartnerSerializer, PartnerListSerializer
from datacom.serializers import DatacomSerializer, DatacomListSerializer
from companies.serializers import CompanySerializer, CompanyListSerializer
from users.serializers import UserSerializer, UserListSerializer

# class CountrySerializer(serializers.ModelSerializer):
#   class Meta:
#     model = Country
#     fields = ('__all__')

# class RegionSerializer(serializers.ModelSerializer):
#   class Meta:
#     model = Region
#     fields = ('__all__')

# class CitySerializer(serializers.ModelSerializer):
#   class Meta:
#     model = City
#     fields = ('__all__')

# class PostalCodeSerializer(serializers.ModelSerializer):
#   class Meta:
#     model = PostalCode
#     fields = ('__all__')


class TimezoneSerializer(serializers.ModelSerializer):
  class Meta:
    model = TimeZones
    fields = ('__all__')

    
class HolidaySerializer(serializers.ModelSerializer):
  datacom_obj = DatacomListSerializer(read_only=True, source='datacom')
  datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
  partner_obj = PartnerListSerializer(read_only=True, source='partner')
  partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
  company_obj = CompanyListSerializer(read_only=True, source='company')
  company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)

  class Meta:
    model = Holiday
    fields = ('__all__')

    # def to_representation(self, value):
    #     data = super().to_representation(value)  
    #     if data['datacom']:
    #         datacom_data_serializer = DatacomListSerializer(value.datacom)
    #         data['datacom'] = datacom_data_serializer.data
    #     if data['partner']:
    #         partner_data_serializer = PartnerListSerializer(value.partner)
    #         data['partner'] = partner_data_serializer.data
    #     if data['company']:
    #         company_data_serializer = CompanyListSerializer(value.company)
    #         data['company'] = company_data_serializer.data
       
    #     return data

class ShippingSerializer(serializers.ModelSerializer):
  datacom_obj = DatacomListSerializer(read_only=True, source='datacom')
  datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
  partner_obj = PartnerListSerializer(read_only=True, source='partner')
  partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
  company_obj = CompanyListSerializer(read_only=True, source='company')
  company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
  user_obj = UserListSerializer(read_only=True, source='user')
  user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True) 

  class Meta:
    model = Shipping
    fields = ('__all__')

  # def to_representation(self, value):
  #   data = super().to_representation(value) 
  #   if data['datacom']:
  #     datacom_data_serializer = DatacomSerializer(value.datacom)
  #     data['datacom'] = datacom_data_serializer.data
  #   if data['partner']:
  #     partner_data_serializer = PartnerSerializer(value.partner)
  #     data['partner'] = partner_data_serializer.data
  #   if data['company']:
  #     company_data_serializer = CompanySerializer(value.company)
  #     data['company'] = company_data_serializer.data   
  #   if data['user']:
  #     user_data_serializer = UserSerializer(value.user)
  #     data['user'] = user_data_serializer.data    
  #   return data

class DepartmentSerializer(serializers.ModelSerializer):
  datacom_obj = DatacomListSerializer(read_only=True, source='datacom')
  datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
  partner_obj = PartnerListSerializer(read_only=True, source='partner')
  partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
  company_obj = CompanyListSerializer(read_only=True, source='company')
  company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)

  class Meta:
    model = Department
    fields = ('__all__')

class GeneralSettingsSerializer(serializers.ModelSerializer):
  datacom_obj = DatacomListSerializer(read_only=True, source='datacom')
  datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
  partner_obj = PartnerListSerializer(read_only=True, source='partner')
  partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
  company_obj = CompanyListSerializer(read_only=True, source='company')
  company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
  
  class Meta:
    model = GeneralSettings
    fields = ('__all__')