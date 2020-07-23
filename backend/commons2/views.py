from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, exceptions, viewsets

from django.contrib.auth.models import Permission, Group

from .serializers import ( 
                          # CountrySerializer, 
                          # RegionSerializer, 
                          # CitySerializer, 
                          # PostalCodeSerializer, 
                          TimezoneSerializer, 
                          HolidaySerializer, 
                          ShippingSerializer, 
                          DepartmentSerializer, 
                          GeneralSettingsSerializer, )

#Deactivated Citites package
# from cities.models import Country, Region, City, PostalCode

from .models import TimeZones, Holiday, Shipping, Department, GeneralSettings

# class CountryViewset(viewsets.ModelViewSet):
#   serializer_class = CountrySerializer
#   queryset = Country.objects.all()
#   filter_backends = [DjangoFilterBackend, filters.SearchFilter]
#   filterset_fields = ['id', 'name']
#   search_fields = ['id', 'name']
#   ordering_fields = ['name']
#   ordering = ['name']

# class RegionViewset(viewsets.ModelViewSet):
#   serializer_class = RegionSerializer
#   queryset = Region.objects.all()
#   filter_backends = [DjangoFilterBackend, filters.SearchFilter]
#   filterset_fields = ['id', 'name', 'country_id']
#   search_fields = ['id', 'name', 'country_id']
#   ordering_fields = ['name']
#   ordering = ['name']

# class CityViewset(viewsets.ModelViewSet):
#   serializer_class = CitySerializer
#   queryset = City.objects.all()
#   filter_backends = [DjangoFilterBackend, filters.SearchFilter]
#   filterset_fields = ['id', 'name', 'region_id']
#   search_fields = ['id', 'name', 'region_id']
#   ordering_fields = ['name']
#   ordering = ['name']

# class PostalCodeViewset(viewsets.ModelViewSet):
#   serializer_class = PostalCodeSerializer
#   queryset = PostalCode.objects.all()
#   filter_backends = [DjangoFilterBackend, filters.SearchFilter]
#   filterset_fields = ['id', 'name', 'region_id']
#   search_fields = ['id', 'name', 'region_id']
#   ordering_fields = ['code']
#   ordering = ['code']

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