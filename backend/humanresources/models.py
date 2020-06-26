from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator

class Benefits(models.Model):
	date_added 			            = models.DateTimeField(auto_now_add=True)
	sick_days_year              = models.IntegerField(default=0, blank=True, null=True)
	sick_days_remaining     		= models.IntegerField(blank=True, null=True)
	personal_days_year          = models.IntegerField(default=0, blank=True, null=True)
	personal_days_remaining 		= models.IntegerField(blank=True, null=True)
	vacation_days_year          = models.IntegerField(default=0, blank=True, null=True)
	vacation_days_remaining 		= models.IntegerField(blank=True, null=True)
	pto_days_year               = models.IntegerField(default=0, blank=True, null=True)
	pto_days_remaining      		= models.IntegerField(blank=True, null=True)
	has_medical 								= models.BooleanField(default=False, blank=True, null=True)
	medical_insurance_provider 	= models.CharField(max_length=255, blank=True, null=True)
	has_dental 									= models.BooleanField(default=False, blank=True, null=True)
	dental_insurance_provider 	= models.CharField(max_length=255, blank=True, null=True)
	has_ADnD 										= models.BooleanField(default=False, blank=True, null=True)
	ADnD_insurance_provider 		= models.CharField(max_length=255, blank=True, null=True)
	has_vision 									= models.BooleanField(default=False, blank=True, null=True)
	vision_insurance_provider 	= models.CharField(max_length=255, blank=True, null=True)
	has_401k 										= models.BooleanField(default=False, blank=True, null=True)
	contribution_percent  			= models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
	financial_401k_provider 		= models.CharField(max_length=255, blank=True, null=True)


class EmployeeDocuments(models.Model):
	date_added_handbook 			  = models.DateTimeField(auto_now_add=True)
	employee_handbook           = models.FileField(max_length=100, upload_to='employees/documents/handbooks', blank=True, null=True)
	signed_handbook	 						= models.BooleanField(default=False,blank=True, null=True)
	date_added_policy_procedures= models.DateTimeField(auto_now_add=True)
	employee_policy_procedures  = models.FileField(max_length=100, upload_to='employees/documents/handbooks', blank=True, null=True)
	signed_policies_procedures	= models.BooleanField(default=False,blank=True, null=True)
	date_added_code_of_conduct 	= models.DateTimeField(auto_now_add=True)
	employee_code_of_conduct    = models.FileField(max_length=100, upload_to='employees/documents/handbooks', blank=True, null=True)
	signed_code_of_conduct	    = models.BooleanField(default=False,blank=True, null=True)
	date_added_employment_agmt 	= models.DateTimeField(auto_now_add=True)
	employee_employment_agmt    = models.FileField(max_length=100, upload_to='employees/documents/handbooks', blank=True, null=True)
	signed_ee_agmt	  					= models.BooleanField(default=False,blank=True, null=True)
	date_added_compensation 		= models.DateTimeField(auto_now_add=True)
	employee_compensation       = models.FileField(max_length=100, upload_to='employees/documents/handbooks', blank=True, null=True)
	signed_comp_plan  					= models.BooleanField(default=False,blank=True, null=True)

class CompanyDocuments(models.Model):
	date_added_handbook 			  = models.DateTimeField(auto_now_add=True)
	company_handbook           	= models.FileField(max_length=100, upload_to='documents/handbooks', blank=True, null=True)
	date_added_policy_procedures= models.DateTimeField(auto_now_add=True)
	company_policy_procedures  	= models.FileField(max_length=100, upload_to='documents/handbooks', blank=True, null=True)
	date_added_code_of_conduct 	= models.DateTimeField(auto_now_add=True)
	company_code_of_conduct    	= models.FileField(max_length=100, upload_to='documents/handbooks', blank=True, null=True)
	date_added_employment_agmt 	= models.DateTimeField(auto_now_add=True)
	company_employment_agmt    	= models.FileField(max_length=100, upload_to='documents/handbooks', blank=True, null=True)
	date_added_compensation 		= models.DateTimeField(auto_now_add=True)
	company_compensation       	= models.FileField(max_length=100, upload_to='documents/handbooks', blank=True, null=True)

class MileageReimbursement(models.Model):
	STATUS_CHOICES = [
    ('Approved', 'Approved'),
    ('Declined', 'Declined'),
    ('Open', 'Open'),
    ('Expired', 'Expired'),
    ('Deleted', 'Deleted'),
	]
	start_date 			  					= models.DateTimeField(auto_now_add=False, auto_now=False, blank=True, null=True)
	end_date			  						= models.DateTimeField(auto_now_add=False, auto_now=False, blank=True, null=True)
	miles_driven 			  				= models.IntegerField(default=0, blank=True, null=True)
	status 											= models.CharField(max_length=100, choices=STATUS_CHOICES, blank=True, null=True)
	disposition_date 			  		= models.DateTimeField(auto_now_add=False, auto_now=False, blank=True, null=True)
	approval_remarks            = models.TextField(blank=True, null=True)
	title 			    						= models.CharField(max_length=100, blank=True, null=True)
	subject 			  						= models.CharField(max_length=100, blank=True, null=True)
	message            					= models.TextField(blank=True, null=True)
	receipt   									= models.FileField(max_length=100, upload_to='employees/mileage-receipts', blank=True, null=True)


