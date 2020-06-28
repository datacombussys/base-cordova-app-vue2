from uuid import uuid4
from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator

from employees.models import Employee

class openAndCloseTill(models.Model):
	date         					= models.DateTimeField(auto_now_add=True)
	opened_by 						= models.ForeignKey(Employee, on_delete=models.DO_NOTHING, blank=True, null=True)
	is_open 							= models.BooleanField(default=False, blank=True, null=True)
	open_pennies 					= models.IntegerField(default=0, blank=True, null=True)
	open_nickels 					= models.IntegerField(default=0, blank=True, null=True)
	open_dimes 						= models.IntegerField(default=0, blank=True, null=True)
	open_quarters 				= models.IntegerField(default=0, blank=True, null=True)
	open_halfDollars 			= models.IntegerField(default=0, blank=True, null=True)
	open_dollarCoins 			= models.IntegerField(default=0, blank=True, null=True)
	open_ones 						= models.IntegerField(default=0, blank=True, null=True)
	open_fives 						= models.IntegerField(default=0, blank=True, null=True)
	open_tens 						= models.IntegerField(default=0, blank=True, null=True)
	open_twenties 				= models.IntegerField(default=0, blank=True, null=True)
	open_fiftys 					= models.IntegerField(default=0, blank=True, null=True)
	open_hundreds 				= models.IntegerField(default=0, blank=True, null=True)
	close_pennies 				= models.IntegerField(default=0, blank=True, null=True)
	close_nickels 				= models.IntegerField(default=0, blank=True, null=True)
	close_dimes 					= models.IntegerField(default=0, blank=True, null=True)
	close_quarters 				= models.IntegerField(default=0, blank=True, null=True)
	close_halfDollars 		= models.IntegerField(default=0, blank=True, null=True)
	close_dollarCoins 		= models.IntegerField(default=0, blank=True, null=True)
	close_ones 						= models.IntegerField(default=0, blank=True, null=True)
	close_fives 					= models.IntegerField(default=0, blank=True, null=True)
	close_tens 						= models.IntegerField(default=0, blank=True, null=True)
	close_twenties 				= models.IntegerField(default=0, blank=True, null=True)
	close_fiftys 					= models.IntegerField(default=0, blank=True, null=True)
	close_hundreds 				= models.IntegerField(default=0, blank=True, null=True)

