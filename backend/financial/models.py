from uuid import uuid4
from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator


from companies.models import Company
from datacom.models import Datacom
from partners.models import Partner

FREQUENCY_CHOICES = sorted([('Yearly', 'Yearly'), ('Quarterly', 'Quarterly'), ('Monthly', 'Monthly')])

class SalesTax(models.Model):
	company           		= models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
	partner           		= models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
	datacom           		= models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
	name  								= models.CharField(max_length=250)
	state_agency_name 		= models.CharField(max_length=250)
	state_agency_rate 		= models.DecimalField(max_digits=5, decimal_places=2)
	local_tax_rate  			= models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
	filing_frequency  		= models.CharField(max_length=100, choices=FREQUENCY_CHOICES, default='Quarterly')
	enable_notifications	= models.BooleanField(default=False)