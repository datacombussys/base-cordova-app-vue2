import os
import base64
from django.core.files.base import ContentFile
from uuid import uuid4
from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator
from django.shortcuts import get_object_or_404
from django.core.files.images import ImageFile
from django.apps import apps

import treepoem

from employees.models import Employee
from companies.models import Company
from datacom.models import Datacom
from partners.models import Partner
from vendors.models import Vendor
from warehouses.models import Warehouse
from commons.models import UOMWeight, UOMDimensions

class InvBarcodeManager(models.Manager):
  def create_barcode_number(self):
    last_barcode = InventoryBarcode.objects.all().order_by('barcode_number').last()
    # last_barcode = UserBarcode.objects.filter(user__employee__datacom__id__gte=1).order_by().last()
    print("last_barcode", last_barcode)
    if not last_barcode:
      return "100000000000"
    else:
      last_barcode_no = last_barcode.barcode_number
      if type(last_barcode_no) is int:
        last_barcode_no += 1
        str_last_barcode = str(last_barcode_no)
        return str_last_barcode
      else:
        int_last_barcode = int(last_barcode_no)
        last_barcode_no += 1
        str_last_barcode = str(last_barcode_no)
        return str_last_barcode

  def create_barcode_image(self, barcode):
    '''Grab barcode number and create barcode instance and save'''
    barcodeImage = treepoem.generate_barcode(
      barcode_type="ean13",
      data=barcode,
      options={'height': 2,
      'width': 4}
    )
    barcodeImage.convert('1').save(barcode + ".png")
    print(barcodeImage)

    #Grab file from Filesystem
    myfile = open(barcode + ".png", "rb")
    # print("myfile", myfile)
    finalImage = ImageFile(myfile)
    # print("finalImage", finalImage)
    #Delete file from hard drive
    if os.path.exists(barcode + ".png"):
      os.remove(barcode + ".png")
    
    return finalImage

  def create_barcode(self, item, **kwargs):
    print('create_barcode kwargs', kwargs)
    print('create_barcode item', item)
    current_barcode_number = self.create_barcode_number()
    barcode_image = self.create_barcode_image(current_barcode_number)
    
    uuid_id = uuid4()

    barcode = self.model(title=item.name + "_" + str(uuid_id)[:10])
    barcode.image = barcode_image
    barcode.barcode_type = "ean-13"
    barcode.barcode_number = int(current_barcode_number)
    barcode.save(using=self._db)
    
    return barcode

class InventoryBarcode(models.Model):
  date_added 		  = models.DateTimeField(verbose_name="date added", 														
                    auto_now_add=True)
  title 			    = models.CharField(max_length=50, null=True, blank=True)
  barcode_number  = models.BigIntegerField(null=True, blank=True)
  barcode_type 		= models.CharField(max_length=10, null=True, blank=True)
  subtitle 			  = models.CharField(max_length=50, null=True, blank=True)
  metadata 		    = models.CharField(max_length=250, blank=True, null=True)
  image 	        = models.FileField(max_length=100, upload_to='inventory/barcodes', blank=True, null=True)

  objects	= InvBarcodeManager()

#Catergories and Category Classes
class InvCategoryClass(models.Model):
  name            = models.CharField(max_length=50, null=True, blank=True)

class InvCategory(models.Model):
  # inv_class     = models.ForeignKey(InvCategoryClass, on_delete=models.CASCADE, blank=True, null=True)
  name            = models.CharField(max_length=50, null=True, blank=True)

  def __str__(self):
    return self.name

# User Model Manager
class InventoryManager(models.Manager):
  def create_inventory(self, *args, **kwargs):
    if not kwargs['name']:
      raise ValueError("You must enter a name for the item")
    if not kwargs['list_price']:
      raise ValueError("You must enter a list price for this item")
    print('kwargs', kwargs)
    
    item = self.model(**kwargs)
    item.is_active = True
    item.save(using=self._db)

    InventoryBarcode.objects.create_barcode(item)
  
    return item
    
# User Model
class Inventory(models.Model):
  company         = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  partner         = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  datacom         = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  vendor 			    = models.ForeignKey(Vendor, on_delete=models.DO_NOTHING, blank=True, null=True)
  warehouse_loc	  = models.ForeignKey(Warehouse, on_delete=models.DO_NOTHING, blank=True, null=True)
  category        = models.ForeignKey(InvCategory, on_delete=models.DO_NOTHING, blank=True, null=True)
  uom_weight 		  = models.ForeignKey(UOMWeight, on_delete=models.DO_NOTHING, blank=True, null=True)
  uom_dimensions 	= models.ForeignKey(UOMDimensions, on_delete=models.DO_NOTHING, blank=True, null=True)
  barcode 			  = models.ForeignKey(InventoryBarcode, on_delete=models.CASCADE, null=True, blank=True)
  global_id 		  = models.UUIDField(primary_key=False, default=uuid4, editable=False)
  name 			      = models.CharField(max_length=50)
  manufacturer 		= models.CharField(max_length=50, blank=True, null=True)
  model 		      = models.CharField(max_length=50, blank=True, null=True)
  model_number 		= models.CharField(max_length=50, blank=True, null=True)
  date_added 		  = models.DateTimeField(verbose_name="date added", 														
                    auto_now_add=True)
  profile_img 	  = models.ImageField(max_length=100, upload_to='inventory/profile', null=True, blank=True)
  gallery_imgs 	  = models.TextField(null=True, blank=True)
  is_service			= models.BooleanField(default=False)
  is_active       = models.BooleanField(default=True)
  is_variation		= models.BooleanField(default=False)
  is_tracked			= models.BooleanField(default=False)
  is_downloadable	= models.BooleanField(default=False)
  is_on_website		= models.BooleanField(default=False)
  is_on_sale			= models.BooleanField(default=False)
  is_taxable			= models.BooleanField(default=False)
  parent_item 		= models.CharField(max_length=50, blank=True, null=True)
  product_id 			= models.CharField(max_length=20, blank=True, null=True)
  sku 	          = models.CharField(max_length=20, null=True, blank=True)
  product_type 	  = models.CharField(max_length=100, blank=True, null=True)
  isbn 		        = models.CharField(max_length=25, null=True, 
                    blank=True, validators=[RegexValidator(r'^\d{1,25}$')])
  tags 		        = models.CharField(max_length=255, blank=True, null=True)
  sales_notes 		= models.TextField(blank=True, null=True)
  vendor_notes 		= models.TextField(blank=True, null=True)
  product_desc 		= models.TextField(blank=True, null=True)
  list_price      = models.DecimalField(decimal_places=2, max_digits=10)
  purchase_price  = models.DecimalField(decimal_places=2, default=0.00, max_digits=10, blank=True, null=True)
  sale_price      = models.DecimalField(decimal_places=2, default=0.00, max_digits=10, blank=True, null=True)
  wholesale_price = models.DecimalField(decimal_places=2, default=0.00, max_digits=10, blank=True, null=True)
  discount        = models.DecimalField(decimal_places=2, default=0.00, max_digits=10, blank=True, null=True)
  sale_expires 		= models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
  income_acct 		= models.CharField(max_length=50, blank=True, null=True)
  expense_acct 		= models.CharField(max_length=50, blank=True, null=True)
  retail_margin   = models.CharField(max_length=10, null=True, 
                    blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
  wholesale_margin= models.CharField(max_length=10, null=True, 
                    blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
  qty_on_hand     = models.CharField(max_length=10, null=True, 
                    blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
  reorder_level   = models.CharField(max_length=10, null=True, 
                    blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
  weight          = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True)
  width           = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True)
  length          = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True)
  height          = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True)
  

  class Meta:
    ordering = ['name', 'date_added']

  REQUIRED_FIELDS = ['name']

  objects	= InventoryManager()

  def __str__(self):
    return self.name


class InventoryImage(models.Model):
  #Only make GET request on id when inv item is being loaded in datatable
  product 			  = models.ForeignKey('Inventory', on_delete=models.CASCADE, null=True, blank=True)
  date_added 		  = models.DateTimeField(verbose_name="date added", 														
                    auto_now_add=True)
  title 			    = models.CharField(max_length=50, null=True, blank=True)
  type 			      = models.CharField(max_length=50, null=True, blank=True)
  sub_title 			= models.CharField(max_length=50, null=True, blank=True)
  size 		        = models.DecimalField(decimal_places=2, max_digits=20, blank=True, null=True)
  image 	        = models.ImageField(max_length=100, upload_to='inventory/gallery', null=True, blank=True)


class InventoryLabels(models.Model):
  name 			      = models.CharField(max_length=50, null=True, blank=True)
  json_data 		  = models.TextField(null=True, blank=True)
  date_added 		  = models.DateTimeField(verbose_name="date added", auto_now_add=True, null=True, blank=True)



  

