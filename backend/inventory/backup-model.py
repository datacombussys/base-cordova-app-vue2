import base64
from django.core.files.base import ContentFile
from uuid import uuid4
from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator
from django.shortcuts import get_object_or_404
from django.core.files.images import ImageFile
from django.apps import apps

import PIL.Image as PilImage
from wand.image import Image

import treepoem

from employees.models import Employee

class InvBarcodeManager(models.Manager):
  def create_barcode_number(self):
    last_barcode = InventoryBarcode.objects.all().order_by('barcode_number').last()
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
      options={'includetext':True, 
      'guardwhitespace':True,
      'height': 2,
      'width': 4}
    )
    barcodeImage.convert('1').save(barcode + ".png")
    print(barcodeImage)

    #Grab file from Filesystem
    myfile = open(barcode + ".png", "rb")
    print("myfile", myfile)
    finalImage = ImageFile(myfile)
    print("finalImage", finalImage)
    del myfile
    return finalImage

  def create_barcode(self, **kwargs):

    # if not kwargs['title']:
    #   raise ValueError("You must enter a title for the item")
    # I still need to pass in the Inventory Instance
    current_barcode_number = self.create_barcode_number()
    barcode_image = self.create_barcode_image(current_barcode_number)

    # print("**kwargs", **kwargs)
    # invModel = apps.get_model('inventory', 'inventory', require_ready=True)
    # inventory = invModel.objects.get(id=id)
    # print("inventory", inventory)
    

    item = self.model(product_id=kwargs['id'], title=kwargs['name'])
    item.image = barcode_image
    item.barcode_number = int(current_barcode_number)
    item.save(using=self._db)

    # print('item.image.url', item.image.url)
    item.image_url = item.image.url
    item.save()
    
    return item

class InventoryBarcode(models.Model):
  product 			  = models.ForeignKey('Inventory', on_delete=models.CASCADE, null=True, blank=True)
  # uploaded_by 	= models.ForeignKey(Employee, on_delete=models.CASCADE)
  date_added 		  = models.DateTimeField(verbose_name="date added", 														
                    auto_now_add=True)
  title 			    = models.CharField(max_length=50, unique=True, null=True, blank=True)
  barcode_number  = models.BigIntegerField(unique=True)
  barcode_type 		= models.CharField(max_length=10, null=True, blank=True)
  subtitle 			  = models.CharField(max_length=50, unique=True, null=True, blank=True)
  metadata 		    = models.CharField(max_length=250, blank=True, null=True)
  image 	        = models.FileField(max_length=100, upload_to='barcodes/')
  image_url 	    = models.URLField(max_length=200,blank=True, null=True)

  objects	= InvBarcodeManager()

#Catergories and Category Classes
class InvCategoryClass(models.Model):
  name            = models.CharField(max_length=50, unique=True, null=True, blank=True)
  def __str__(self):
    return self.name


class InvCategory(models.Model):
  category_class      = models.ForeignKey(InvCategoryClass, on_delete=models.DO_NOTHING, blank=True, null=True)
  name                = models.CharField(max_length=50, unique=True, null=True, blank=True)
  def __str__(self):
    return self.name

# User Model Manager
class InventoryManager(models.Manager):
  def create_inventory(self, *args, **kwargs):
    if not kwargs['name']:
      raise ValueError("You must enter a name for the item")
    print("**kwargs", kwargs)

    category_class_obj={}
    if kwargs['category_class']:
      category_class_obj, is_created = InvCategoryClass.objects.get_or_create(name=kwargs['category_class'])
      del kwargs['category_class']
      print("category_class_obj", category_class_obj)

    category_obj={}
    if kwargs['category']:
      category_obj, is_created = InvCategory.objects.get_or_create(name=kwargs['category'], category_class=category_class_obj)
      del kwargs['category']
      print("category", category_obj)

    if kwargs['profile_img']:
      del kwargs['profile_img']
    
    item = self.model(category_id=category_obj['id'], category_class=category_class_obj['id'], **kwargs)
    item.save(using=self._db)
    
    
    #Create Barcode by passing inventory Item
    objID = Inventory.objects.get(name=kwargs['name'])
    print('objID', objID)
    kwargs['id'] = objID.id
    InventoryBarcode.objects.create_barcode(**kwargs)
  
    return item
    
  # def update_inventory(self, *args, **kwargs):
  #   # with Image(width=300, height=300, pseudo='inline:' + kwargs['profile_img']) as img:
  #   #   img.format = 'jpeg'
  #   #   jpeg_bin = img.make_blob()
  #   #   djangoImg = ImageFile(jpeg_bin)
    
  #   item = self.model(profile_img=data, **kwargs)
  #   item.save(using=self._db)
    
  #   return item

# Inventory Model
class Inventory(models.Model):
  # supplier 			= models.ForeignKey(Vendor, on_delete=models.DO_NOTHING, blank=True)
  # warehouse_loc	= models.ForeignKey(Warehouse, on_delete=models.DO_NOTHING, blank=True)
  category_class  = models.ForeignKey(InvCategoryClass, related_name='+', on_delete=models.DO_NOTHING, blank=True, null=True)
  category        = models.ForeignKey(InvCategory, related_name='+', on_delete=models.DO_NOTHING, blank=True, null=True)
  global_id 		  = models.UUIDField(primary_key=False, default=uuid4, editable=False)
  name 			      = models.CharField(max_length=50, unique=True)
  manufacturer 		= models.CharField(max_length=50, blank=True, null=True)
  model 		      = models.CharField(max_length=50, blank=True, null=True)
  model_number 		= models.CharField(max_length=50, blank=True, null=True)
  date_added 		  = models.DateTimeField(verbose_name="date added", 														
                    auto_now_add=True)
  profile_img 	  = models.ImageField(max_length=100, upload_to='inventory/', null=True, blank=True)
  gallery_imgs 	  = models.TextField(null=True, blank=True)
  is_service			= models.BooleanField(default=False)
  is_variation		= models.BooleanField(default=False)
  is_tracked			= models.BooleanField(default=False)
  is_downloadable		= models.BooleanField(default=False)
  is_on_website		= models.BooleanField(default=False)
  is_on_sale			= models.BooleanField(default=False)
  is_taxable			= models.BooleanField(default=False)
  parent_item 		= models.CharField(max_length=50, blank=True, null=True)
  product_id 			= models.CharField(max_length=20, blank=True, null=True)
  sku 	          = models.CharField(max_length=20, null=True, 
                    blank=True, validators=[RegexValidator(r'^\d{1,20}$')])
  product_type 	  = models.CharField(max_length=100, blank=True, null=True)
  isbn 		        = models.CharField(max_length=25, null=True, 
                    blank=True, validators=[RegexValidator(r'^\d{1,25}$')])
  tags 		        = models.CharField(max_length=255, blank=True, null=True)
  sales_notes 		= models.TextField(blank=True, null=True)
  vendor_notes 		= models.TextField(blank=True, null=True)
  product_desc 		= models.TextField(blank=True, null=True)
  list_price      = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True)
  purchase_price  = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True)
  sale_price      = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True)
  wholesale_price = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True)
  discount        = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True)
  sale_expires 		= models.CharField(max_length=50, blank=True, null=True)
  income_acct 		= models.CharField(max_length=50, blank=True, null=True)
  expense_acct 		= models.CharField(max_length=50, blank=True, null=True)
  margin          = models.CharField(max_length=10, null=True, 
                    blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
  qty_on_hand     = models.CharField(max_length=10, null=True, 
                    blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
  reorder_level   = models.CharField(max_length=10, null=True, 
                    blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
  weight          = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True)
  uom_weight 		  = models.CharField(max_length=10, blank=True, null=True)
  width           = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True)
  length          = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True)
  height          = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True)
  uom_dimensions 	= models.CharField(max_length=10, blank=True, null=True)

  REQUIRED_FIELDS = ['name']

  objects	= InventoryManager()

  def __str__(self):
    return self.name


class InventoryImageManager(models.Manager):
  def create_inv_image(self, *args, **kwargs):
    '''Create and Upload Inventory Gallery Images '''
    # if not kwargs['title']:
    #   raise ValueError("You must enter a title for the image")
    #Get Inventory Item Instance for saving
    # inventory = Inventory.objects.get(id=kwargs['id'])
    # print("**kwargs", **kwargs)
    
    image = self.model(**kwargs)
    image.save(using=self._db)
    # image.image_url = image.image.url
    # image.save()

    return image

class InventoryImage(models.Model):
  # product 			  = models.ForeignKey(Inventory, on_delete=models.CASCADE)
  # uploaded_by 		= models.ForeignKey(Employee, on_delete=models.CASCADE)
  date_added 		  = models.DateTimeField(verbose_name="date added", 														
                    auto_now_add=True)
  title 			    = models.CharField(max_length=50, unique=True, null=True, blank=True)
  type 			      = models.CharField(max_length=50, unique=True, null=True, blank=True)
  sub_title 			= models.CharField(max_length=50, unique=True, null=True, blank=True)
  metadata 		    = models.CharField(max_length=250, blank=True, null=True)
  image 	        = models.ImageField(max_length=100, upload_to='inventory/', null=True, blank=True)
  image_url 	    = models.URLField(max_length=200,blank=True, null=True)
											
  objects	= InventoryImageManager()


  

