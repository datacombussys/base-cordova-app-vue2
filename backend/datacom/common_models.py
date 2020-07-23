from uuid import uuid4
from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator
from django.contrib.auth.models import Group

class CommonCompanyBase(models.Model):
  website 			      = models.CharField(max_length=200, blank=True, null=True)
  description 	      = models.TextField(blank=True, null=True)
  date_added 		      = models.DateTimeField(verbose_name="date added", auto_now_add=True)
  global_id 		      = models.UUIDField(primary_key=False, default=uuid4, editable=False)
  primary_mailing_address = models.CharField(max_length=200)
  primary_mailing_address_2 = models.CharField(max_length=200, blank=True, null=True)
  primary_mailing_city    = models.CharField(max_length=60)
  primary_mailing_state   = models.CharField(max_length=20)
  primary_mailing_zip     = models.CharField(max_length=5, validators=[RegexValidator(r'^\d{1,5}$')])
  primary_mailing_country = models.CharField(max_length=200)
  primary_first_name      = models.CharField(max_length=100)
  primary_last_name       = models.CharField(max_length=100)
  primary_phone           = models.CharField(max_length=10, validators=[RegexValidator(r'^\d{1,10}$')])
  primary_fax 		        = models.CharField(max_length=10, null=True, blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
  primary_email       = models.CharField(max_length=200)
  shipping_address 	  = models.CharField(max_length=200, blank=True, null=True)
  shipping_address_2  = models.CharField(max_length=200, blank=True, null=True)
  shipping_city 	  	= models.CharField(max_length=60, blank=True, null=True)
  shipping_state 		  = models.CharField(max_length=20, blank=True, null=True)
  shipping_zip 			  = models.CharField(max_length=5, null=True, 
                        blank=True, validators=[RegexValidator(r'^\d{1,5}$')])
  shipping_country    = models.CharField(max_length=200, blank=True, null=True)
  shipping_first_name = models.CharField(max_length=100, blank=True, null=True)
  shipping_last_name  = models.CharField(max_length=100, blank=True, null=True)
  shipping_phone      = models.CharField(max_length=10, null=True, blank=True, 
                          validators=[RegexValidator(r'^\d{1,10}$')])
  shipping_fax 		    = models.CharField(max_length=10, null=True, blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
  shipping_email      = models.CharField(max_length=200, blank=True, null=True)
  billing_address 	  = models.CharField(max_length=200, blank=True, null=True)
  billing_address_2 	  = models.CharField(max_length=200, blank=True, null=True)
  billing_city 	  	  = models.CharField(max_length=60, blank=True, null=True)
  billing_state 		  = models.CharField(max_length=20, blank=True, null=True)
  billing_zip 			  = models.CharField(max_length=5, null=True, 
                        blank=True, validators=[RegexValidator(r'^\d{1,5}$')])
  billing_country     = models.CharField(max_length=200, blank=True, null=True)
  billing_first_name  = models.CharField(max_length=100, blank=True, null=True)
  billing_last_name   = models.CharField(max_length=100, blank=True, null=True)
  billing_phone       = models.CharField(max_length=10, null=True, blank=True, 
                          validators=[RegexValidator(r'^\d{1,10}$')])
  billing_fax 		    = models.CharField(max_length=10, null=True, blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
  billing_email       = models.CharField(max_length=200, blank=True, null=True)
  tax_id              = models.CharField(max_length=9, null=True, 
									      blank=True, validators=[RegexValidator(r'^\d{1,9}$')])
  resale_id           = models.CharField(max_length=20, null=True, 
									      blank=True, validators=[RegexValidator(r'^\d{1,20}$')])
  is_active           = models.BooleanField(default=True)
  is_datacom          = models.BooleanField(default=False, blank=True, null=True)
  is_partner          = models.BooleanField(default=False, blank=True, null=True)
  is_merchant         = models.BooleanField(default=False, blank=True, null=True)
  is_vendor           = models.BooleanField(default=False, blank=True, null=True)
  is_warehouse        = models.BooleanField(default=False, blank=True, null=True)
  is_salesoffice      = models.BooleanField(default=False, blank=True, null=True)
  board_date          = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
  closure_date   = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
  closure_reason      = models.CharField(max_length=250, blank=True, null=True)
  
  class Meta:
      abstract 	= True



