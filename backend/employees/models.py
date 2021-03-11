from uuid import uuid4
from django.db import models
from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist
from django.core.validators import RegexValidator
from django.contrib import auth
from django.contrib.contenttypes.models import ContentType

from project.settings import base
from commons.models import Industry, CommonBarcode
from users.user_ids import IDs
from companies.models import Company
from partners.models import Partner
from datacom.models import Datacom
from vendors.models import Vendor
from commons2.models import Department
from humanresources.models import Benefits, EmployeeDocuments


class Position(models.Model):
  datacom             = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  partner             = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  company             = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  date_added 			    = models.DateField(verbose_name="date joined", auto_now_add=True)
  name                = models.CharField(max_length=100, null=True, blank=True)

  def __str__(self):
    return str(self.name)

# Employee Model Manager
class EmployeeManager(models.Manager):
	'''User is created first in Vue and then passed ID to create Employee here '''
	userModel = auth.get_user_model()

	def create_employee(self, **kwargs):
		'''Create Employee using email address as login id'''
		print("Employee kwargs", kwargs)

		modules_managed_var = kwargs['modules_managed']
		del kwargs['modules_managed']
		kwargs['is_employee'] = True

		employee = self.model(**kwargs)

		eeObj = None
		datacomId = kwargs.get("datacom", None)
		print("datacomId", datacomId)
		partnerId = kwargs.get("partner", None)
		print("partnerId", partnerId)
		merchantId = kwargs.get("merchant", None)
		print("merchantId", merchantId)

		if datacomId:
			eeObj = Employee.objects.filter(datacom_id = kwargs['datacom']).order_by('id').last()
		if partnerId:
			eeObj = Employee.objects.filter(partner_id = kwargs['partner']).order_by('id').last()
		if merchantId:
			eeObj = Employee.objects.filter(merchant_id = kwargs['merchant']).order_by('id').last()

		print("eeObj", eeObj)

		if eeObj:
			kwargs['last_employee_number'] = eeObj.employee_number
			print("eeObj.last_employee_number", kwargs['last_employee_number'])
		if not eeObj:
			del kwargs['employee_number']

		print('else kwargs', kwargs)
		newEmployeeID = IDs.newEmployeeID(self, **kwargs)
		print('newEmployeeID', newEmployeeID)
		setattr(employee, 'employee_number', newEmployeeID)
		kwargs['employee_number'] = newEmployeeID

		print("employee", employee)
		print("employee.employee_number", employee.employee_number)
		
		employee.save(using=self._db)

		if modules_managed_var:
			employee.modules_managed.set(modules_managed_var)

		barcode = CommonBarcode.objects.create_barcode(**kwargs)
		print('Employee barcode', barcode)
		employee.barcode = barcode

		employee.save()

		return employee

	def create_employee_admin(self, **kwargs):
		# Create Admin Employee using email address as login id
		employee = self.create_employee(**kwargs)
		employee.save(using=self._db)
		userObj = self.userModel.objects.get(email=kwargs['email'])
		userObj.is_admin = True
		userObj.save()
		return employee
  
# Employee Model
class Employee(models.Model):
	datacom           = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
	partner           = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
	company           = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
	vendor            = models.ForeignKey(Vendor, on_delete=models.CASCADE, blank=True, null=True)
	user              = models.OneToOneField(base.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
	department        = models.ForeignKey(Department, on_delete=models.DO_NOTHING, blank=True, null=True)
	position 			    = models.ForeignKey(Position, on_delete=models.DO_NOTHING, blank=True, null=True) 
	benefits          = models.ForeignKey(Benefits, on_delete=models.DO_NOTHING, blank=True, null=True)
	employee_docs     = models.ForeignKey(EmployeeDocuments, on_delete=models.DO_NOTHING, blank=True, null=True)
	modules_managed   = models.ManyToManyField(ContentType, blank=True)
	barcode           = models.ForeignKey(CommonBarcode, on_delete=models.DO_NOTHING, blank=True, null=True)
	is_module_manager = models.BooleanField(default=False, blank=True, null=True)
	employee_number   = models.CharField(max_length=16, null=True, blank=True)
	salary            = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
	salary_type       = models.CharField(max_length=50, blank=True, null=True)
	employee_type     = models.CharField(max_length=20, blank=True, null=True)
	work_phone        = models.CharField(max_length=10, null=True, 
											blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
	is_employee       = models.BooleanField(default=True, null=True, blank=True)
	is_business 	    = models.BooleanField(default=False, blank=True, null=True)
	is_sales_office_ee= models.BooleanField(default=False, blank=True, null=True)
	is_sales_rep	    = models.BooleanField(default=False, blank=True, null=True)
	is_warehouse_ee   = models.BooleanField(default=False, blank=True, null=True)
	is_exempt 	      = models.BooleanField(default=False, blank=True, null=True)
	is_manager 	      = models.BooleanField(default=False, blank=True, null=True)
	reporting_manager = models.CharField(max_length=250, blank=True, null=True)
	hire_date         = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
	termination_date  = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
	termination_reason= models.TextField(blank=True, null=True)
	ssn               = models.CharField(max_length=9, null=True, 
											blank=True, validators=[RegexValidator(r'^\d{1,9}$')])
	dob               = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
	org_name          = models.CharField(max_length=100, blank=True, null=True)
	profile_img 		  = models.ImageField(max_length=100, upload_to='employees/profile/', null=True, blank=True)

	objects	= EmployeeManager()

	class Meta:
		ordering = ['user__last_name', 'hire_date']

	def __str__(self):
		return str(self.user)

