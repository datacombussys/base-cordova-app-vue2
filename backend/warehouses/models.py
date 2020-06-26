from django.db import models
from project.settings import base
from uuid import uuid4
from django.core.validators import RegexValidator

from datacom.common_models import CommonCompanyBase, CommonBarcode
from salesoffices.models import SalesOffice
from companies.models import Company
from datacom.models import Datacom
from partners.models import Partner
from employees.models import Employee


class Warehouse(models.Model):
  company                 = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  partner                 = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  datacom                 = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  barcode                 = models.ForeignKey(CommonBarcode, on_delete=models.DO_NOTHING, blank=True, null=True)
  sales_offices           = models.ManyToManyField(SalesOffice, related_name="warehouse_salesoffice", blank=True)
  primary_contact         = models.OneToOneField(Employee, on_delete=models.DO_NOTHING, blank=True, null=True)
  shipping_contacts       = models.ManyToManyField(Employee, related_name="shipping_contacts", blank=True)
  employees               = models.ManyToManyField(Employee, related_name="warehouse_employees", blank=True)
  warehouse_name          = models.CharField(max_length=200, blank=True, null=True)
  warehouse_number        = models.CharField(max_length=20, blank=True, null=True)
  global_id 		          = models.UUIDField(primary_key=False, default=uuid4, editable=False)
  date_added 		          = models.DateTimeField(verbose_name="date added", auto_now_add=True)
  profile_img 	          = models.ImageField(max_length=100, upload_to='warehouses/profile', null=True, blank=True)
  description 	          = models.TextField(blank=True, null=True)
  primary_mailing_country = models.CharField(max_length=200, blank=True, null=True)
  primary_mailing_address = models.CharField(max_length=200, blank=True, null=True)
  primary_mailing_city    = models.CharField(max_length=60, blank=True, null=True)
  primary_mailing_state   = models.CharField(max_length=20, blank=True, null=True)
  primary_mailing_zip     = models.CharField(max_length=5, null=True, blank=True, validators=[RegexValidator(r'^\d{1,5}$')])
  primary_first_name      = models.CharField(max_length=100, blank=True, null=True)
  primary_last_name       = models.CharField(max_length=100, blank=True, null=True)
  primary_phone           = models.CharField(max_length=10, null=True, blank=True, 
                            validators=[RegexValidator(r'^\d{1,10}$')])
  primary_fax 		        = models.CharField(max_length=10, null=True, blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
  primary_email           = models.CharField(max_length=200, blank=True, null=True)
  shipping_mailing_country = models.CharField(max_length=200, blank=True, null=True)
  shipping_address 	      = models.CharField(max_length=200, blank=True, null=True)
  shipping_city 	  	    = models.CharField(max_length=60, blank=True, null=True)
  shipping_state 		      = models.CharField(max_length=20, blank=True, null=True)
  shipping_zip 			      = models.CharField(max_length=5, null=True, 
                            blank=True, validators=[RegexValidator(r'^\d{1,5}$')])
  shipping_first_name     = models.CharField(max_length=100, blank=True, null=True)
  shipping_last_name      = models.CharField(max_length=100, blank=True, null=True)
  shipping_phone          = models.CharField(max_length=10, null=True, blank=True, 
                            validators=[RegexValidator(r'^\d{1,10}$')])
  shipping_fax 		        = models.CharField(max_length=10, null=True, blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
  shipping_email          = models.CharField(max_length=200, blank=True, null=True)
  closure_date            = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
  closure_reason          = models.CharField(max_length=250, blank=True, null=True)
  is_active               = models.BooleanField(default=True)
  status                  = models.CharField(max_length=200, blank=True, null=True)

 
 