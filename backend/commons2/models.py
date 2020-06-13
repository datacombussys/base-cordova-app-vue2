from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator

from datacom.models import Datacom
from partners.models import Partner
from companies.models import Company
from users.models import User


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
  is_open         = models.BooleanField(default=False)

  class Meta:
    constraints = [
      models.UniqueConstraint(fields= ['name','datacom'], name='datacom_holiday'),
      models.UniqueConstraint(fields= ['name','partner'], name='partner_holiday'),
      models.UniqueConstraint(fields= ['name','company'], name='company_holiday'),
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
  phone 	        = models.CharField(max_length=10, null=True, 
                  blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
  instructions    = models.CharField(max_length=250, blank=True, null=True)
  is_primary      = models.BooleanField(default=False)
  is_active       = models.BooleanField(default=True)


class Notifications(models.Model):
  sender          = models.ForeignKey(User, related_name="notification_sender", on_delete=models.CASCADE, blank=True, null=True)
  receiver        = models.ForeignKey(User, related_name="notification_receiver",on_delete=models.CASCADE, blank=True, null=True)
  name 			      = models.CharField(max_length=100, blank=True, null=True)
  subject 			  = models.CharField(max_length=100, blank=True, null=True)
  body            = models.TextField(blank=True, null=True)
  date            = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
  is_approved     = models.BooleanField(default=False)
  is_declined     = models.BooleanField(default=False)
  date_sent 		  = models.DateTimeField(auto_now_add=True)
  date_disposition= models.DateTimeField(auto_now_add=False, auto_now=False, blank=True, null=True)

  
class Industry(models.Model):
  name 			      = models.CharField(max_length=100, blank=True, null=True)


class Department(models.Model):
  partner         = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  datacom         = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  company         = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  name            = models.CharField(max_length=100, null=True, blank=True)
  date_added 			= models.DateTimeField(auto_now_add=True)
  date_test 			= models.DateField(auto_now_add=True)
  datetime_input 	= models.DateTimeField(auto_now_add=False, auto_now=False, blank=True, null=True)
  date_input 			= models.DateField(auto_now_add=False, auto_now=False, blank=True, null=True)
  
  def __str__(self):
    return self.name
 