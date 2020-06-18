from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, exceptions, viewsets

from django.contrib.auth.models import Permission, Group
from django.contrib.contenttypes.models import ContentType

from .serializers import ( CountrySerializer, 
                          RegionSerializer, 
                          CitySerializer, 
                          PostalCodeSerializer, 
                          TimezoneSerializer, 
                          HolidaySerializer, 
                          ContentTypeSerializer, 
                          BasePermissionSeializer, 
                          ShippingSerializer, 
                          PermissionsSerializer, 
                          GroupsSerializer, 
                          DepartmentSerializer, 
                          GeneralSettingsSerializer, )

from cities.models import Country, Region, City, PostalCode

from .models import TimeZones, Holiday, Shipping, Department, GeneralSettings
from users.models import UserGroups, UserPermissions

class CountryViewset(viewsets.ModelViewSet):
  serializer_class = CountrySerializer
  queryset = Country.objects.all()
  filter_backends = [DjangoFilterBackend, filters.SearchFilter]
  filterset_fields = ['id', 'name']
  search_fields = ['id', 'name']
  ordering_fields = ['name']
  ordering = ['name']

class RegionViewset(viewsets.ModelViewSet):
  serializer_class = RegionSerializer
  queryset = Region.objects.all()
  filter_backends = [DjangoFilterBackend, filters.SearchFilter]
  filterset_fields = ['id', 'name', 'country_id']
  search_fields = ['id', 'name', 'country_id']
  ordering_fields = ['name']
  ordering = ['name']

class CityViewset(viewsets.ModelViewSet):
  serializer_class = CitySerializer
  queryset = City.objects.all()
  filter_backends = [DjangoFilterBackend, filters.SearchFilter]
  filterset_fields = ['id', 'name', 'region_id']
  search_fields = ['id', 'name', 'region_id']
  ordering_fields = ['name']
  ordering = ['name']

class PostalCodeViewset(viewsets.ModelViewSet):
  serializer_class = PostalCodeSerializer
  queryset = PostalCode.objects.all()
  filter_backends = [DjangoFilterBackend, filters.SearchFilter]
  filterset_fields = ['id', 'name', 'region_id']
  search_fields = ['id', 'name', 'region_id']
  ordering_fields = ['code']
  ordering = ['code']

class TimezonesViewset(viewsets.ModelViewSet):
  serializer_class = TimezoneSerializer
  queryset = TimeZones.objects.all()

class HolidayViewset(viewsets.ModelViewSet):
  serializer_class = HolidaySerializer
  queryset = Holiday.objects.all()
  filter_backends = [DjangoFilterBackend, filters.SearchFilter]
  filterset_fields = ['id', 'name', 'date', 'datacom__id', 'partner__id', 'company__id']
  search_fields = ['id', 'name', 'date', 'datacom__id', 'partner__id', 'company__id']
  ordering_fields = ['date']
  ordering = ['date']

class BasePermissionsViewSet(viewsets.ModelViewSet):
  serializer_class = BasePermissionSeializer
  queryset = Permission.objects.all()
        
class ContentTypeViewSet(viewsets.ModelViewSet):
  serializer_class = ContentTypeSerializer
  queryset = ContentType.objects.all()

class UserGroupViewSet(viewsets.ModelViewSet):
  serializer_class = GroupsSerializer
  queryset = UserGroups.objects.all()

class UserPermissionsViewSet(viewsets.ModelViewSet):
  serializer_class = PermissionsSerializer
  queryset = UserPermissions.objects.all()

class ShippingViewSet(viewsets.ModelViewSet):
  serializer_class = ShippingSerializer
  queryset = Shipping.objects.all()
  filter_backends = [DjangoFilterBackend, filters.SearchFilter]
  filterset_fields = ['id', 'user__id', 'datacom__id', 'partner__id', 'company__id']
  search_fields = ['id', 'user__id', 'datacom__id', 'partner__id', 'company__id']
  ordering_fields = ['__all__']
  ordering = ['date_added']

class DepartmentViewset(viewsets.ModelViewSet):
  serializer_class = DepartmentSerializer
  queryset = Department.objects.all()
  filter_backends = [DjangoFilterBackend, filters.SearchFilter]
  filterset_fields = ['id', 'datacom__id', 'partner__id', 'company__id']
  search_fields = ['id', 'datacom__id', 'partner__id', 'company__id']
  ordering_fields = ['__all__']
  ordering = ['date_added']

class GeneralSettingsViewset(viewsets.ModelViewSet):
  serializer_class = GeneralSettingsSerializer
  queryset = GeneralSettings.objects.all()
  filter_backends = [DjangoFilterBackend, filters.SearchFilter]
  filterset_fields = ['id', 'datacom__id', 'partner__id', 'company__id']
  search_fields = ['id', 'datacom__id', 'partner__id', 'company__id']
  ordering_fields = ['__all__']
  ordering = ['date_added']