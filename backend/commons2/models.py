from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator

from datacom.models import Datacom
from partners.models import Partner
from companies.models import Company
from users.models import User
from humanresources.models import MileageReimbursement

class TimeZones(models.Model):  

    import pytz
    TIMEZONES = tuple(zip(pytz.country_timezones("US"), pytz.country_timezones("US")))

    timezone = models.CharField(max_length=32, choices=TIMEZONES, 
    default='UTC')

class Holiday(models.Model):
  datacom         = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  partner         = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  company         = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  name 			      = models.CharField(max_length=50)
  type            = models.CharField(max_length=50)
  date            = models.DateField(auto_now_add=False, auto_now=False, blank=True, null=True)
  duration_days   = models.IntegerField(default=1)
  open_time       = models.CharField(max_length=10, blank=True, null=True)
  close_time      = models.CharField(max_length=10, blank=True, null=True)
  open_time2      = models.CharField(max_length=10, blank=True, null=True)
  close_time2     = models.CharField(max_length=10, blank=True, null=True)
  is_active       = models.BooleanField(default=False)

  class Meta:
    constraints = [
      models.UniqueConstraint(fields = ['name', 'datacom', 'partner', 'company'], name='unique_holidays')
    ]

class Shipping(models.Model):
  partner         = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  datacom         = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  company         = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  user            = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
  date_added 		  = models.DateTimeField(verbose_name="date added", auto_now_add=True)
  name            = models.CharField(max_length=255, blank=True, null=True)
  address 	      = models.CharField(max_length=255, blank=True, null=True)
  address2 	      = models.CharField(max_length=255, blank=True, null=True)
  city 	  	      = models.CharField(max_length=200, blank=True, null=True)
  state 		      = models.CharField(max_length=50, blank=True, null=True)
  zip 		  	    = models.CharField(max_length=5, null=True, 
                    blank=True, validators=[RegexValidator(r'^\d{1,5}$')])
  country         = models.CharField(max_length=200, blank=True, null=True)
  phone 	        = models.CharField(max_length=10, null=True, 
                  blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
  instructions    = models.CharField(max_length=250, blank=True, null=True)
  is_primary      = models.BooleanField(default=False)
  is_active       = models.BooleanField(default=True)

 
class Industry(models.Model):
  name 			      = models.CharField(max_length=100, blank=True, null=True)

class Department(models.Model):
  partner         = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  datacom         = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  company         = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  name            = models.CharField(max_length=100, null=True, blank=True)
  date_added 			= models.DateTimeField(auto_now_add=True)
  
  def __str__(self):
    return str(self.name)

class GeneralSettings(models.Model):
  datacom                     = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  partner                     = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  company                     = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  date_added 			            = models.DateTimeField(auto_now_add=True)
  auto_approve_timecards      = models.BooleanField(default=False, blank=True, null=True)
  created_payroll_cycles      = models.BooleanField(default=False, blank=True, null=True)
  setup_attendance_rules      = models.BooleanField(default=False, blank=True, null=True)
  created_departments         = models.BooleanField(default=False, blank=True, null=True)
  created_employees           = models.BooleanField(default=False, blank=True, null=True)
  created_products            = models.BooleanField(default=False, blank=True, null=True)
  created_groups              = models.BooleanField(default=False, blank=True, null=True)
  assigned_module_managers    = models.BooleanField(default=False, blank=True, null=True)
  charge_sales_tax            = models.BooleanField(default=False, blank=True, null=True)
  created_sales_tax           = models.BooleanField(default=False, blank=True, null=True)
  enable_pto                  = models.BooleanField(default=False, blank=True, null=True)
  enable_benefits_tracking    = models.BooleanField(default=False, blank=True, null=True)
  enable_inventory_tracking   = models.BooleanField(default=False, blank=True, null=True)
  
  def __str__(self):
    return str(self.name)


 
 