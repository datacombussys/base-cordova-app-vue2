from uuid import uuid4
from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator
# from django.contrib.auth.models import UserManager

from project.settings import base
from employees.models import Employee
from companies.models import Company
from datacom.models import Datacom
from partners.models import Partner

# Customer Model
class Customer(models.Model):
  company           = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  partner           = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  datacom           = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  user              = models.OneToOneField(base.AUTH_USER_MODEL, on_delete=models.CASCADE)
  sales_rep         = models.ForeignKey(Employee, on_delete=models.DO_NOTHING, blank=True, null=True)
  customer_number   = models.CharField(max_length=16, null=True, 
									    blank=True, validators=[RegexValidator(r'^\d{1,16}$')])
  company_name      = models.CharField(max_length=250, blank=True, null=True)
  dob               = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
  ssn               = models.CharField(max_length=9, null=True, 
									    blank=True, validators=[RegexValidator(r'^\d{1,9}$')])
  resale_id         = models.CharField(max_length=20, null=True, 
									    blank=True, validators=[RegexValidator(r'^\d{1,20}$')])
  customer_type     = models.CharField(max_length=100, null=True, blank=True)
  is_member         = models.BooleanField(default=False, null=True, blank=True)
  is_paid_member    = models.BooleanField(default=False, null=True, blank=True)
  subscription_fee  = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
  profile_img 	    = models.ImageField(max_length=100, upload_to='customers/profile', null=True, blank=True)



