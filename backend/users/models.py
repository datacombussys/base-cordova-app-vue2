import os
import base64
from django.core.files.base import ContentFile
from uuid import uuid4
from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.shortcuts import get_object_or_404
from django.core.files.images import ImageFile
from django.apps import apps

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import Group, Permission
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import is_password_usable, check_password, make_password
from project.settings import base

from .common_models import CommonUserBase

import treepoem

class UserBarcodeManager(models.Manager):
	def create_barcode_number(self, kwargs):
		# I can get the last user barcode becasue they aere not dependent on anything
		last_barcode = UserBarcode.objects.all().order_by('barcode_number').last()
		# I can print Datacom Barcodes for users becasue the employee is not yet made
		# last_barcode = UserBarcode.objects.filter(user__employee__datacom__id__gte=1).order_by().last()

		print("last_barcode", last_barcode)
		if not last_barcode:
			return "000003100000"
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
			barcode_type="qrcode",
			data=barcode,
			options={'height': 2,
								'width': 2}
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

	def create_barcode(self, **kwargs):
		print('create_barcode kwargs', kwargs)
		current_barcode_number = self.create_barcode_number(kwargs)
		barcode_image = self.create_barcode_image(current_barcode_number)
  
		uuid_id = uuid4()

		item = self.model(title=kwargs['first_name'] + "_" + kwargs['last_name']+ "_" + str(uuid_id)[:10])
		print('1 user barcode item has id?', item)
		item.image = barcode_image
		item.barcode_type = "qrcode"
		item.barcode_number = int(current_barcode_number)
		item.save(using=self._db)

		print('2 user barcode item has id?', item)

		return item

class UserBarcode(models.Model):
  date_added 		  = models.DateTimeField(verbose_name="date added", 														
                    auto_now_add=True)
  title 			    = models.CharField(max_length=50, null=True, blank=True)
  barcode_number  = models.BigIntegerField(null=True, blank=True)
  barcode_type 		= models.CharField(max_length=10, null=True, blank=True)
  subtitle 			  = models.CharField(max_length=50, null=True, blank=True)
  metadata 		    = models.CharField(max_length=250, blank=True, null=True)
  image 	        = models.FileField(max_length=100, upload_to='users/barcodes/')

  objects	= UserBarcodeManager()

# User Model Manager
class MainUserManager(BaseUserManager):

	def make_full_name(self, first_name, last_name):
		return "{} {}".format(first_name, last_name)

	def create_user(self, *args, **kwargs):
		if not kwargs['email']:
			raise ValueError("User must enter a valid email address")
		if not kwargs['password']:
			raise ValueError("Users must have a valid password")
		print('CreateUser kwargs', kwargs)

		groups_var = kwargs['groups']
		del kwargs['groups']

		user = self.model(**kwargs)
		user.full_name = self.make_full_name(kwargs['first_name'], kwargs['last_name'])
		user.is_active = True

		user.set_password(kwargs['password'])
		user.save(using=self._db)

		objID = User.objects.get(email=kwargs['email'])
		print('CreateUser objID', objID)

		#set groups
		if groups_var:
			datacom.groups.set(groups_var)

		kwargs['id'] = objID.id
		barcode = UserBarcode.objects.create_barcode(**kwargs)
		print('User barcode returned', barcode)
		user.barcode_id = barcode.id
		print('User', user)
		user.save()

		return user


	def create_superuser(self, *args, **kwargs):
		# Create Superuser using email address as login id
		if not kwargs['email']:
			raise ValueError("User must enter a valid email address")
		if not kwargs['password']:
			raise ValueError("Users must have a valid password")
		superuser = self.create_user(**kwargs)
		superuser.is_admin = True
		superuser.is_staff = True
		superuser.is_superuser = True

		superuser.save(using=self._db)									
		return superuser

# User Model
class User(CommonUserBase):
	barcode 			 	= models.ForeignKey(UserBarcode, on_delete=models.CASCADE, null=True, blank=True)
	pin 						= models.CharField(max_length=4, null=True, 
									blank=True, validators=[RegexValidator(r'^\d{1,4}$')])
	fax 						= models.CharField(max_length=10, null=True, 
									blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
	
	class Meta:
		ordering = ['last_name', 'first_name', 'date_added']
	
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['first_name', 'last_name']

	objects	= MainUserManager()

	def __str__(self):
		return str(self.email)

	def get_fullname(self):
		return str(self.full_name)


class UserGroup(Group):
# Inherits with name, and ID
# Has Many-to-Many with Permissions
# *Use permissions.set()* for adding permissions to group or use Forward-side
# Need to make a script to auto poolulate group_class e.g. Employee, Customer, Vendor, etc.
	date_added      = models.DateField(verbose_name="date added", auto_now_add=True)
	group_type      = models.CharField(max_length=100, null=True, blank=True)
	group_class     = models.CharField(max_length=100, null=True, blank=True)


#Django Permissions Model 
class UserPermission(Permission):
	#Has ForeignKey to ContentType
	# Inherits with name, content_type(model) and codename (of permission in the model)
	date_added 						= models.DateField(verbose_name="date joined",auto_now_add=True)
	permission_category   = models.CharField(max_length=100, null=True, blank=True)



