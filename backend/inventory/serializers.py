from rest_framework import serializers
from rest_framework import exceptions

from .models import Inventory, InventoryBarcode, InventoryImage, InvCategoryClass, InvCategory, InventoryLabels

from commons.base64 import Base64ImageField
from companies.models import Company
from datacom.models import Datacom
from partners.models import Partner
from vendors.models import Vendor
from warehouses.models import Warehouse

from partners.serializers import PartnerSerializer
from datacom.serializers import DatacomSerializer
from companies.serializers import CompanySerializer
from warehouses.serializers import WarehouseSerializer
from vendors.serializers import VendorSerializer


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
    # category = InvCategorySerializer(read_only=True)
    # category_id = serializers.PrimaryKeyRelatedField(queryset=InvCategory.objects.all(), 
    #         write_only=True, required=False, allow_null=True)
    datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    vendor = serializers.PrimaryKeyRelatedField(queryset=Vendor.objects.all(), required=False, allow_null=True)
    warehouse = serializers.PrimaryKeyRelatedField(queryset=Warehouse.objects.all(), required=False, allow_null=True)
    category = serializers.PrimaryKeyRelatedField(queryset=InvCategory.objects.all(), required=False, allow_null=True)
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

    def to_representation(self, value):
        data = super().to_representation(value)  
        if data['datacom']:
            datacom_data_serializer = DatacomSerializer(value.datacom)
            data['datacom'] = datacom_data_serializer.data
        if data['company']:
            company_data_serializer = CompanySerializer(value.company)
            data['company'] = company_data_serializer.data
        if data['partner']:
            partner_data_serializer = PartnerSerializer(value.partner)
            data['partner'] = partner_data_serializer.data
        if data['warehouse']:
            warehouse_data_serializer = WarehouseSerializer(value.warehouse)
            data['warehouse'] = warehouse_data_serializer.data
        if data['vendor']:
            vendor_data_serializer = VendorSerializer(value.vendor)
            data['vendor'] = vendor_data_serializer.data
        if data['category']:
            category_data_serializer = InvCategorySerializer(value.category)
            data['category'] = category_data_serializer.data

        return data

class InvCategoryClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvCategoryClass
        fields = ('__all__')

# IMAGE GALLERY
class InventoryGallerySerializer(serializers.ModelSerializer):
    # product = InventorySerializer(read_only=True)
    # product_id = serializers.PrimaryKeyRelatedField(queryset=Inventory.objects.all(), 
    #         write_only=True, required=False, allow_null=True)
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