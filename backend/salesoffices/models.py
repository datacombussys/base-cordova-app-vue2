from django.db import models
from project.settings import base
from uuid import uuid4
from django.core.validators import RegexValidator

from datacom.common_models import CommonCompanyBase, CommonBarcode
from companies.models import Company
from datacom.models import Datacom
from partners.models import Partner
from employees.models import Employee
from commons2.models import Shipping

class SalesOffice(CommonCompanyBase):
  company                 = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  partner                 = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  datacom                 = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  barcode                 = models.ForeignKey(CommonBarcode, on_delete=models.DO_NOTHING, blank=True, null=True)
  primary_contact         = models.OneToOneField(Employee, on_delete=models.DO_NOTHING, blank=True, null=True)
  billing_contacts        = models.ManyToManyField(Employee, related_name="billing_contacts", blank=True)
  employees               = models.ManyToManyField(Employee, related_name="salesoffice_employees", blank=True)
  salesoffice_name        = models.CharField(max_length=200, blank=True)
  salesoffice_number      = models.CharField(max_length=20, blank=True, null=True)
  global_id 		          = models.UUIDField(primary_key=False, default=uuid4, editable=False)
  profile_img 	          = models.ImageField(max_length=100, upload_to='salesoffices/profile', null=True, blank=True)
  date_added 		          = models.DateTimeField(verbose_name="date added", auto_now_add=True)
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
  billing_mailing_country = models.CharField(max_length=200, blank=True, null=True)
  billing_address 	      = models.CharField(max_length=200, blank=True, null=True)
  billing_city 	  	      = models.CharField(max_length=60, blank=True, null=True)
  billing_state 		      = models.CharField(max_length=20, blank=True, null=True)
  billing_zip 			      = models.CharField(max_length=5, null=True, 
                            blank=True, validators=[RegexValidator(r'^\d{1,5}$')])
  billing_first_name      = models.CharField(max_length=100, blank=True, null=True)
  billing_last_name       = models.CharField(max_length=100, blank=True, null=True)
  billing_phone           = models.CharField(max_length=10, null=True, blank=True, 
                            validators=[RegexValidator(r'^\d{1,10}$')])
  billing_fax 		        = models.CharField(max_length=10, null=True, blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
  billing_email           = models.CharField(max_length=200, blank=True, null=True)
  closure_date            = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
  closure_reason          = models.CharField(max_length=250, blank=True, null=True)
  is_active               = models.BooleanField(default=True)
  status                  = models.CharField(max_length=200, blank=True, null=True)
  
  class Meta:
    ordering = ['date_added', 'id', 'salesoffice_name']

  def __str__(self):
    return self.salesoffice_name