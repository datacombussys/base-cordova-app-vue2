from rest_framework import serializers
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from cities.models import Country, Region, City, PostalCode

from .models import TimeZones, Holiday, Shipping, Department
from users.models import User, UserGroups, UserPermissions

from datacom.models import Datacom
from partners.models import Partner
from companies.models import Company
from vendors.models import Vendor

from partners.serializers import PartnerSerializer, PartnerSimpleSerializer
from datacom.serializers import DatacomSerializer, DatacomSimpleSerializer
from companies.serializers import CompanySerializer, CompanySimpleSerializer
from users.serializers import UserSerializer

class CountrySerializer(serializers.ModelSerializer):
  class Meta:
    model = Country
    fields = ('__all__')

class RegionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Region
    fields = ('__all__')

class CitySerializer(serializers.ModelSerializer):
  class Meta:
    model = City
    fields = ('__all__')

class PostalCodeSerializer(serializers.ModelSerializer):
  class Meta:
    model = PostalCode
    fields = ('__all__')


class TimezoneSerializer(serializers.ModelSerializer):
  class Meta:
    model = TimeZones
    fields = ('__all__')

    
class HolidaySerializer(serializers.ModelSerializer):
  datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
  partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
  company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)

  class Meta:
    model = Holiday
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

            
class ContentTypeSerializer(serializers.ModelSerializer):
  class Meta:
    model = ContentType
    fields = '__all__'

class BasePermissionSeializer(serializers.ModelSerializer):
  class Meta:
    model = Permission
    fields = '__all__'

    
class PermissionsSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserPermissions
    fields = '__all__'

class GroupsSerializer(serializers.ModelSerializer):
  # This requires a custom validate() method
  permissions = BasePermissionSeializer(many=True, read_only=True)
  permissions_id = serializers.PrimaryKeyRelatedField(many=True,
    queryset=Permission.objects.all(), write_only=True,
    required=False, allow_null=True) #- write Only field

  class Meta:
    model = UserGroups
    fields = '__all__'

    def validate(self, data):
      print('validate data', data)
      try:
        data['permissions'] = data.pop('permissions_id')
      except KeyError:
        print('We had an error adding the permission to the UserGroup')
        pass

      return data

class ShippingSerializer(serializers.ModelSerializer):
  datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
  partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
  company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
  user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True) 

  class Meta:
    model = Shipping
    fields = '__all__'

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
    if data['user']:
      user_data_serializer = UserSerializer(value.user)
      data['user'] = user_data_serializer.data    
    return data

class DepartmentSerializer(serializers.ModelSerializer):
  datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
  partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
  company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)

  class Meta:
    model = Department
    fields = ('__all__')