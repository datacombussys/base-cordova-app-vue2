from django.db import models
from project.settings import base
from uuid import uuid4
from django.core.validators import RegexValidator

from commons.helper import CompanyIDs

from datacom.common_models import CommonCompanyBase
from commons.models import CommonBarcode
from companies.models import Company
from datacom.models import Datacom
from partners.models import Partner
from employees.models import Employee
from commons2.models import Shipping

class SalesOfficeManager(models.Manager):
	def create_sales_office(self, **kwargs):
		if not kwargs['salesoffice_name']:
			raise ValueError("You must enter a valid name")

		print("salesoffice kwargs", kwargs)

		salesofficeObj = SalesOffice.objects.all().order_by('id').last()
		if salesofficeObj:
			kwargs['last_account_number'] = salesofficeObj.salesoffice_number
			print("salesofficeObj.salesoffice_number", kwargs['last_account_number'])
			print('salesofficeObj.__dict__', salesofficeObj.__dict__)
		if not salesofficeObj:
			kwargs['last_account_number'] = None

		kwargs['is_salesoffice'] = True
		print('Modified salesoffice kwargs', kwargs)
		newSOID = CompanyIDs.newCompanyID(self, **kwargs)
		del kwargs['last_account_number']

		primary_contacts_var = kwargs.get('primary_contacts', None)
		billing_contacts_var = kwargs.get('billing_contacts', None)
		technical_contacts_var = kwargs.get('technical_contacts', None)
		shipping_contacts_var = kwargs.get('shipping_contacts', None)
		employees_var = kwargs.get('employees', None)

		del kwargs['primary_contacts']
		del kwargs['billing_contacts']
		del kwargs['technical_contacts']
		del kwargs['shipping_contacts']
		del kwargs['employees']
		
		salesoffice = self.model(**kwargs)
		salesoffice.is_active = True
		salesoffice.salesoffice_number = newSOID
		kwargs['salesoffice_number'] = newSOID

		salesoffice.save(using=self._db)
		print('salesoffice', salesoffice.id)

		if primary_contacts_var:
		  salesoffice.primary_contacts.set(primary_contacts_var)
		if billing_contacts_var:
		  salesoffice.billing_contacts.set(billing_contacts_var)
		if technical_contacts_var:
		  salesoffice.technical_contacts.set(technical_contacts_var)
		if shipping_contacts_var:
		  salesoffice.shipping_contacts.set(shipping_contacts_var)
		if employees_var:
		  salesoffice.employees.set(employees_var)

		barcode = CommonBarcode.objects.create_barcode(**kwargs)
		print('Sales Office barcode', barcode)
		salesoffice.barcode = barcode

		salesoffice.save(using=self._db)

		return salesoffice

class SalesOffice(CommonCompanyBase):
	company                 = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
	partner                 = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
	datacom                 = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
	barcode                 = models.ForeignKey(CommonBarcode, on_delete=models.DO_NOTHING, blank=True, null=True)
	primary_contacts        = models.ManyToManyField(base.AUTH_USER_MODEL, related_name="salesoffice_primary_contacts", blank=True)
	billing_contacts        = models.ManyToManyField(base.AUTH_USER_MODEL, related_name="salesoffice_billing_contacts", blank=True)
	technical_contacts      = models.ManyToManyField(base.AUTH_USER_MODEL, related_name="salesoffice_technical_contacts", blank=True)
	shipping_contacts       = models.ManyToManyField(base.AUTH_USER_MODEL, related_name="salesoffice_shipping_contacts", blank=True)
	employees               = models.ManyToManyField(Employee, related_name="salesoffice_employees", blank=True)
	salesoffice_name        = models.CharField(max_length=200, blank=True)
	salesoffice_number      = models.CharField(max_length=20, blank=True, null=True)
	global_id 		          = models.UUIDField(primary_key=False, default=uuid4, editable=False)
	profile_img 	          = models.ImageField(max_length=100, upload_to='salesoffices/profile', null=True, blank=True)
	date_added 		          = models.DateTimeField(verbose_name="date added", auto_now_add=True)
	description 	          = models.TextField(blank=True, null=True)
	primary_mailing_country = models.CharField(max_length=200, blank=True, null=True)
	primary_mailing_address = models.CharField(max_length=200, blank=True, null=True)
	primary_mailing_address2 = models.CharField(max_length=200, blank=True, null=True)
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
	shipping_address2 	     = models.CharField(max_length=200, blank=True, null=True)
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
	billing_address2 	      = models.CharField(max_length=200, blank=True, null=True)
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
	profile_img 	      		= models.ImageField(max_length=100, upload_to='datacom/', null=True, blank=True)

	objects	= SalesOfficeManager()

	class Meta:
		ordering = ['date_added', 'id', 'salesoffice_name']

	def __str__(self):
		return str(self.salesoffice_name)
		

