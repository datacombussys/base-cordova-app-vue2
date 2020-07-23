import os
from django.db import models
from uuid import uuid4
from django.utils import timezone
from django.core.files.images import ImageFile
from django.core.validators import RegexValidator


class Industry(models.Model):
  name 			      = models.CharField(max_length=100, blank=True, null=True)
  date_added		  = models.DateTimeField(auto_now_add=True)

class UOMWeight(models.Model):
  name 			      = models.CharField(max_length=250, blank=True, null=True)

class UOMDimensions(models.Model):
  name 			      = models.CharField(max_length=250, blank=True, null=True)

import treepoem

class BarcodeManager(models.Manager):
  def create_barcode_number(self, id, **kwargs):

    last_barcode = None
    if kwargs['is_datacom']:
      print("Datacom has been passed to generate a new barcode")
      # last_barcode = CommonBarcode.objects.all().order_by('barcode_number').last()
      last_barcode = CommonBarcode.objects.filter(datacom__id__gte=1).order_by().last()
    if kwargs['is_partner']:
      print("Partner has been passed to generate a new barcode")
      last_barcode = CommonBarcode.objects.filter(partner__id__gte=1).order_by().last()
    if kwargs['is_merchant']:
      print("Partner has been passed to generate a new barcode")
      last_barcode = CommonBarcode.objects.filter(company__id__gte=1).order_by().last()
    if kwargs['is_vendor']:
      print("Partner has been passed to generate a new barcode")
      last_barcode = CommonBarcode.objects.filter(vendor__id__gte=1).order_by().last()

    print("last_barcode", last_barcode)
    if not last_barcode:
      return "1000000000"
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
      barcode_type="code128",
      data=barcode,
      options={'height': 2,
              'width': 4}
      )
    barcodeImage.convert('1').save(barcode + ".png")
    print('barcodeImage', barcodeImage)

    #Grab file from Filesystem
    myfile = open(barcode + ".png", "rb")
    # print("myfile", myfile)
    finalImage = ImageFile(myfile)
    # print("finalImage", finalImage)
    #Delete file from hard drive
    if os.path.exists(barcode + ".png"):
      os.remove(barcode + ".png")

    return finalImage

  def create_barcode(self, id, **kwargs):
    print('create_barcode kwargs', kwargs)
    # print('create_barcode args', args)
    prefix, number = kwargs['account_number'].split('-')
    print('prefix', prefix)
    print('number', number)
    current_barcode_number = prefix + number
    # barcode_image = self.create_barcode_image(current_barcode_number)


    item = self.model(title=current_barcode_number)

    item.barcode_type = "code-128"
    item.barcode_number = current_barcode_number
    item.save(using=self._db)

    return item


  # def create_barcode_number(self, id, **kwargs):

  #   last_barcode = None
  #   if kwargs['is_datacom']:
  #     print("Datacom has been passed to generate a new barcode")
  #     # last_barcode = CommonBarcode.objects.all().order_by('barcode_number').last()
  #     last_barcode = CommonBarcode.objects.filter(datacom__id__gte=1).order_by().last()
  #   if kwargs['is_partner']:
  #     print("Partner has been passed to generate a new barcode")
  #     last_barcode = CommonBarcode.objects.filter(partner__id__gte=1).order_by().last()
  #   if kwargs['is_merchant']:
  #     print("Partner has been passed to generate a new barcode")
  #     last_barcode = CommonBarcode.objects.filter(company__id__gte=1).order_by().last()
  #   if kwargs['is_vendor']:
  #     print("Partner has been passed to generate a new barcode")
  #     last_barcode = CommonBarcode.objects.filter(vendor__id__gte=1).order_by().last()

  #   print("last_barcode", last_barcode)
  #   if not last_barcode:
  #     return "1000000000"
  #   else:
  #     last_barcode_no = last_barcode.barcode_number
  #     if type(last_barcode_no) is int:
  #       last_barcode_no += 1
  #       str_last_barcode = str(last_barcode_no)
  #       return str_last_barcode
  #     else:
  #       int_last_barcode = int(last_barcode_no)
  #       last_barcode_no += 1
  #       str_last_barcode = str(last_barcode_no)
  #       return str_last_barcode

  # def create_barcode_image(self, barcode):
  #   '''Grab barcode number and create barcode instance and save'''
  #   barcodeImage = treepoem.generate_barcode(
  #     barcode_type="code39",
  #     data=barcode,
  #     options={'height': 2,
  #             'width': 4}
  #     )
  #   barcodeImage.convert('1').save(barcode + ".png")
  #   print('barcodeImage', barcodeImage)

  #   #Grab file from Filesystem
  #   myfile = open(barcode + ".png", "rb")
  #   # print("myfile", myfile)
  #   finalImage = ImageFile(myfile)
  #   # print("finalImage", finalImage)
  #   #Delete file from hard drive
  #   if os.path.exists(barcode + ".png"):
  #     os.remove(barcode + ".png")

  #   return finalImage

  # def create_barcode(self, id, **kwargs):
  #   print('create_barcode kwargs', kwargs)
  #   # print('create_barcode args', args)
  #   current_barcode_number = self.create_barcode_number(id, **kwargs)
  #   barcode_image = self.create_barcode_image(current_barcode_number)

  #   uuid_id = uuid4()

  #   item = self.model(title=current_barcode_number, image=barcode_image)

  #   item.barcode_type = "code-39"
  #   item.barcode_number = int(current_barcode_number)
  #   item.save(using=self._db)

  #   return item
    

class CommonBarcode(models.Model):
  date_added 		  = models.DateTimeField(verbose_name="date added", 														
                    auto_now_add=True)
  title 			    = models.CharField(max_length=50, null=True, blank=True)
  barcode_number  = models.CharField(max_length=50, null=True, blank=True)
  barcode_type 		= models.CharField(max_length=10, null=True, blank=True)
  subtitle 			  = models.CharField(max_length=50, null=True, blank=True)
  metadata 		    = models.CharField(max_length=250, blank=True, null=True)
  image 	        = models.FileField(max_length=100, upload_to='company/barcodes/')

  objects = BarcodeManager()

  class Meta:
    ordering = ['-date_added', 'barcode_number']

  def __str__(self):
    return str(self.title)