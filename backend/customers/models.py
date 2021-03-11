from uuid import uuid4
from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator
from django.contrib import auth
# from django.contrib.auth.models import UserManager

from users.user_ids import IDs
from commons.models import CommonBarcode
from project.settings import base
from employees.models import Employee
from companies.models import Company
from datacom.models import Datacom
from partners.models import Partner


# Customer Model Manager
class CustomerManager(models.Manager):
	'''User is created first in Vue and then passed ID to create Customer here '''
	userModel = auth.get_user_model()

	def create_customer(self, **kwargs):
		'''Create Customer using email address as login id'''
		kwargs['is_customer'] = True
		print("Customer kwargs", kwargs)

		customer = self.model(**kwargs)

		custObj = None
		datacomId = kwargs.get("datacom", None)
		partnerId = kwargs.get("partner", None)
		merchantId = kwargs.get("merchant", None)

		if datacomId:
			custObj = Customer.objects.filter(datacom_id = kwargs['datacom']).order_by('id').last()
		if partnerId:
			custObj = Customer.objects.filter(partner_id = kwargs['partner']).order_by('id').last()
		if merchantId:
			custObj = Customer.objects.filter(merchant_id = kwargs['merchant']).order_by('id').last()

		if custObj:
			kwargs['last_customer_number'] = custObj.customer_number
			print("custObj.last_customer_number", kwargs['last_customer_number'])
			print('custObj.__dict__', custObj.__dict__)
		else:
			del kwargs['customer_number']

		print('else kwargs', kwargs)
		newCustomerID = IDs.newCustomerID(self, **kwargs)
		print('newCustomerID', newCustomerID)
		setattr(customer, 'customer_number', newCustomerID)
		kwargs['customer_number'] = newCustomerID

		print("customer", customer)
		customer.save(using=self._db)

		barcode = CommonBarcode.objects.create_barcode(**kwargs)
		print('Customer barcode', barcode)
		customer.barcode = barcode

		customer.save(using=self._db)

		return customer

# Customer Model
class Customer(models.Model):
	company           = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
	partner           = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
	datacom           = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
	user              = models.OneToOneField(base.AUTH_USER_MODEL, on_delete=models.CASCADE)
	sales_rep         = models.ForeignKey(Employee, on_delete=models.DO_NOTHING, blank=True, null=True)
	barcode           = models.ForeignKey(CommonBarcode, on_delete=models.DO_NOTHING, blank=True, null=True)
	customer_number   = models.CharField(max_length=16, null=True, blank=True)
	company_name      = models.CharField(max_length=250, blank=True, null=True)
	dob               = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
	ssn               = models.CharField(max_length=9, null=True, 
											blank=True, validators=[RegexValidator(r'^\d{1,9}$')])
	resale_id         = models.CharField(max_length=20, null=True, 
											blank=True, validators=[RegexValidator(r'^\d{1,20}$')])
	customer_type     = models.CharField(max_length=100, null=True, blank=True)
	is_member         = models.BooleanField(default=False, null=True, blank=True)
	is_customer       = models.BooleanField(default=True, null=True, blank=True)
	is_paid_member    = models.BooleanField(default=False, null=True, blank=True)
	subscription_fee  = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
	profile_img 	    = models.ImageField(max_length=100, upload_to='customers/profile', null=True, blank=True)

	objects	= CustomerManager()

	class Meta:
		ordering = ['user__last_name']

	def __str__(self):
		return str(self.user.full_name)

