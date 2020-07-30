from rest_framework import serializers
from rest_framework import exceptions

from .models import Inventory, InventoryBarcode, InventoryImage, InvCategoryClass, InvCategory, InventoryLabels

from commons.base64 import Base64ImageField
from companies.models import Company
from datacom.models import Datacom
from partners.models import Partner
from vendors.models import Vendor
from warehouses.models import Warehouse

from commons.models import UOMWeight, UOMDimensions
from commons.serializers import UOMWeightSerializer, UOMDimensionsSerializer
from partners.serializers import PartnerSerializer, PartnerListSerializer
from datacom.serializers import DatacomSerializer, DatacomListSerializer
from companies.serializers import CompanySerializer, CompanyListSerializer
from vendors.serializers import VendorSerializer, VendorListSerializer
from warehouses.serializers import WarehouseSerializer, WarehouseListSerializer


class InventoryBarcodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryBarcode
        fields = ('__all__')

    def create(self, validated_data):
        """Create and Return a new Barcode"""
        inventory = InventoryBarcode.objects.create_barcode(**validated_data)
        print("Barcode Created by serializer", validated_data) 
        
        return inventory

class InvCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = InvCategory
        fields = ('__all__')
        

class InventorySerializer(serializers.ModelSerializer):
    datacom_obj = DatacomListSerializer(read_only=True, source='datacom')
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner_obj = PartnerListSerializer(read_only=True, source='partner')
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company_obj = CompanyListSerializer(read_only=True, source='company')
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    vendor_obj = VendorListSerializer(read_only=True, source='vendor')
    vendor = serializers.PrimaryKeyRelatedField(queryset=Vendor.objects.all(), required=False, allow_null=True)
    warehouse_loc_obj = WarehouseListSerializer(read_only=True, source='warehouse_loc')
    warehouse_loc = serializers.PrimaryKeyRelatedField(queryset=Warehouse.objects.all(), required=False, allow_null=True)
    category_obj = InvCategorySerializer(read_only=True, source='category')
    category = serializers.PrimaryKeyRelatedField(queryset=InvCategory.objects.all(), required=False, allow_null=True)

    uom_weight_obj = UOMWeightSerializer(read_only=True, source='uom_weight')
    uom_weight = serializers.PrimaryKeyRelatedField(queryset=UOMWeight.objects.all(), required=False, allow_null=True)
    uom_dimensions_obj = UOMDimensionsSerializer(read_only=True, source='uom_dimensions')
    uom_dimensions = serializers.PrimaryKeyRelatedField(queryset=UOMDimensions.objects.all(), required=False, allow_null=True)
    barcode_obj = InventoryBarcodeSerializer(read_only=True, source='barcode')
    barcode = serializers.PrimaryKeyRelatedField(queryset=InventoryBarcode.objects.all(), required=False, allow_null=True)

    profile_img = Base64ImageField( max_length=None,
                                    use_url=True,
                                    required=False,
                                    allow_null=True,
                                    allow_empty_file=True)
    class Meta:
        model = Inventory
        fields = ('__all__')

    def create(self, validated_data):
        """Create and Return a new Inventory Item."""
        user = Inventory.objects.create_inventory(**validated_data)
        print("Inventory Created by serializer") 
        
        return user 

    def validate(self, data):
        print('validate data', data)
        try:
            data['category'] = data.pop('category_id')
        except KeyError:
            #This will already have failed validation for POST and PUT
            #If it is not provided, PATCH wont change anything
            pass
        return data
    
class InventoryListSerializer(serializers.ModelSerializer):
    barcode_obj = InventoryBarcodeSerializer(read_only=True, source='barcode')
    barcode = serializers.PrimaryKeyRelatedField(queryset=InventoryBarcode.objects.all(), required=False, allow_null=True)
    class Meta:
        model = Inventory
        fields = ['id', 'date_added', 'name', 'list_price', 'profile_img', 'category', 'barcode', 'is_active']

class InvCategoryClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvCategoryClass
        fields = ('__all__')

# IMAGE GALLERY
class InventoryGallerySerializer(serializers.ModelSerializer):
    #Only make GET request on id when inv item is being loaded in datatable
    product_obj = InventoryListSerializer(read_only=True, source='product')
    product = serializers.PrimaryKeyRelatedField(queryset=Inventory.objects.all(), required=False, allow_null=True)
    
    class Meta:
        model = InventoryImage
        fields = ('__all__')

    def to_representation(self, value):
        data = super().to_representation(value)  
        inventory_data_serializer = InventorySerializer(value.user)
        data['product'] = inventory_data_serializer.data
        
        return data

class InventoryLabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryLabels
        fields = ('__all__')