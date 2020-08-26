from django.db import models
from project.settings import base
from uuid import uuid4
from django.core.validators import RegexValidator

from commons.helper import CompanyIDs

from datacom.common_models import CommonCompanyBase
from commons.models import CommonBarcode
from salesoffices.models import SalesOffice
from companies.models import Company
from datacom.models import Datacom
from partners.models import Partner
from employees.models import Employee

class WarehouseManager(models.Manager):
  def create_warehouse(self, **kwargs):
    if not kwargs['warehouse_name']:
      raise ValueError("You must enter a valid name")

    print("warehouse kwargs", kwargs)

    warehouseObj = Warehouse.objects.all().order_by('id').last()
    if warehouseObj:
      kwargs['warehouse_number'] = warehouseObj.warehouse_number
      print("warehouseObj.warehouse_number", warehouseObj.warehouse_number)
      print('warehouseObj.__dict__', warehouseObj.__dict__)
    if not warehouseObj:
      kwargs['warehouse_number'] = 0

    kwargs['is_salesoffice'] = True
    print('warehouse kwargs', kwargs)
    newWarehouseID = CompanyIDs.newCompanyID(self, **kwargs)

    # primary_contacts_var = kwargs['primary_contacts']
    # billing_contacts_var = kwargs['billing_contacts']
    # technical_contacts_var = kwargs['technical_contacts']
    # shipping_contacts_var = kwargs['shipping_contacts']

    # del kwargs['primary_contacts']
    # del kwargs['billing_contacts']
    # del kwargs['technical_contacts']
    # del kwargs['shipping_contacts']
    
    warehouse = self.model(**kwargs)
    warehouse.is_active = True
    warehouse.warehouse_number = newWarehouseID

    warehouse.save(using=self._db)

    # if primary_contacts_var:
    #   warehouse.primary_contacts.set(primary_contacts_var)
    # if billing_contacts_var:
    #   warehouse.billing_contacts.set(billing_contacts_var)
    # if technical_contacts_var:
    #   warehouse.technical_contacts.set(technical_contacts_var)
    # if shipping_contacts_var:
    #   warehouse.shipping_contacts.set(shipping_contacts_var)

    barcode = CommonBarcode.objects.create_barcode(warehouse.id, **kwargs)
    print('Warehouse barcode', barcode)
    warehouse.barcode = barcode

    warehouse.save(using=self._db)

    return warehouse


class Warehouse(models.Model):
	company                 = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
	partner                 = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
	datacom                 = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
	barcode                 = models.ForeignKey(CommonBarcode, on_delete=models.DO_NOTHING, blank=True, null=True)
	sales_offices           = models.ManyToManyField(SalesOffice, related_name="warehouse_salesoffice", blank=True)
	primary_contacts        = models.ManyToManyField(base.AUTH_USER_MODEL, related_name="warehouse_primary_contacts", blank=True)
	billing_contacts        = models.ManyToManyField(base.AUTH_USER_MODEL, related_name="warehouse_billing_contacts", blank=True)
	technical_contacts      = models.ManyToManyField(base.AUTH_USER_MODEL, related_name="warehouse_technical_contacts", blank=True)
	shipping_contacts       = models.ManyToManyField(base.AUTH_USER_MODEL, related_name="warehouse_shipping_contacts", blank=True)
	employees               = models.ManyToManyField(Employee, related_name="warehouse_employees", blank=True)
	warehouse_name          = models.CharField(max_length=200, blank=True, null=True)
	warehouse_number        = models.CharField(max_length=20, blank=True, null=True)
	global_id 		          = models.UUIDField(primary_key=False, default=uuid4, editable=False)
	date_added 		          = models.DateTimeField(verbose_name="date added", auto_now_add=True)
	profile_img 	          = models.ImageField(max_length=100, upload_to='warehouses/profile', null=True, blank=True)
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
	closure_date            = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
	closure_reason          = models.CharField(max_length=250, blank=True, null=True)
	is_active               = models.BooleanField(default=True)
	status                  = models.CharField(max_length=200, blank=True, null=True)

	objects	= WarehouseManager()

	class Meta:
		ordering = ['date_added', 'id', 'warehouse_name']

	def __str__(self):
		return str(self.warehouse_name)