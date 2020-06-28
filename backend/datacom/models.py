from django.db import models
from django.utils import timezone
# from project.settings import base
from django.core.validators import RegexValidator

from companies.helper_functions import CompanyIDs

from datacom.common_models import CommonCompanyBase
from project.settings import base
from commons.models import Industry, CommonBarcode
from humanresources.models import CompanyDocuments

# Datacom SuperCompany Model Manager
class DatacomManager(models.Manager):
  def create_datacom(self, **kwargs):
    if not kwargs['dba_name']:
      raise ValueError("You must enter a valid business name")
    if not kwargs['legal_name']:
      raise ValueError("You must enter a valid legal business name")

    print("Datacom kwargs", kwargs)

    datacomObj = Datacom.objects.all().order_by('id').last()
    if datacomObj:
      kwargs['account_number'] = datacomObj.account_number
      print("datacomObj.account_number", datacomObj.account_number)
      print('datacomObj.__dict__', datacomObj.__dict__)
    if not datacomObj:
      kwargs['account_number'] = 0

    kwargs['is_datacom'] = True
    print('Modified creat_datacom kwargs', kwargs)

    newDatacomID = CompanyIDs.newCompanyID(self, **kwargs)
    print('newDatacomID', newDatacomID)

    primary_contacts_var = kwargs['primary_contacts']
    billing_contacts_var = kwargs['billing_contacts']
    technical_contacts_var = kwargs['technical_contacts']
    shipping_contacts_var = kwargs['shipping_contacts']

    del kwargs['primary_contacts']
    del kwargs['billing_contacts']
    del kwargs['technical_contacts']
    del kwargs['shipping_contacts']
    
    datacom = self.model(**kwargs)
    print('datacom', datacom)
    datacom.is_active = True
    datacom.account_number = newDatacomID

    datacom.save(using=self._db)
    print('datacom', datacom.id)

    if primary_contacts_var:
      datacom.primary_contacts.set(primary_contacts_var)
    if billing_contacts_var:
      datacom.billing_contacts.set(billing_contacts_var)
    if technical_contacts_var:
      datacom.technical_contacts.set(technical_contacts_var)
    if shipping_contacts_var:
      datacom.shipping_contacts.set(shipping_contacts_var)
      

    barcode = CommonBarcode.objects.create_barcode(datacom.id, **kwargs)
    print('daatcom barcode', barcode)
    datacom['barcode'] = barcode

    datacom.save(using=self._db)

    return datacom

# Datacom Model SuperCompany
class Datacom(CommonCompanyBase):
  industry            = models.ForeignKey(Industry, on_delete=models.DO_NOTHING, blank=True, null=True)
  barcode             = models.ForeignKey(CommonBarcode, on_delete=models.DO_NOTHING, blank=True, null=True)
  company_docs        = models.ForeignKey(CompanyDocuments, on_delete=models.DO_NOTHING, blank=True, null=True)
  primary_contacts    = models.ManyToManyField(base.AUTH_USER_MODEL, related_name="datacom_primary_contacts", blank=True)
  billing_contacts    = models.ManyToManyField(base.AUTH_USER_MODEL, related_name="datacom_billing_contacts", blank=True)
  technical_contacts  = models.ManyToManyField(base.AUTH_USER_MODEL, related_name="datacom_technical_contacts", blank=True)
  shipping_contacts   = models.ManyToManyField(base.AUTH_USER_MODEL, related_name="datacom_shipping_contacts", blank=True)
  dba_name 			      = models.CharField(max_length=200)
  legal_name 		      = models.CharField(max_length=200)
  domain              = models.CharField(max_length=100)
  account_number      = models.CharField(max_length=16, null=True, blank=True)
  profile_img 	      = models.ImageField(max_length=100, upload_to='datacom/', null=True, blank=True)
  logo 	              = models.ImageField(max_length=100, upload_to='datacom/logo', null=True, blank=True)
  
  objects	= DatacomManager()

  class Meta:
    ordering = ['-date_added', 'dba_name']

  def __str__(self):
    return str(self.dba_name)



'''Types of Model inheritance
Abstract Inheritance - Provides a base class and inheriting classes use its fields to generate the new classes. 
There is  not base class generated in the database of the Abstract model. Use the folowing syntax
    Parent model class:
    class Meta:
    abstract = true

Multi-Table Inheritance - Used when each model (parent and child) in the hierarchy needs to have its own table in the database.

Proxy Inheritance - Inherit from base class and add own properties but not fields.  
Cannot add fields. Cannot Use abstract class. Can override parent models but not extend. Query would take place on the parent model.

'''
