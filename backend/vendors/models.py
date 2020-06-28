from django.db import models
from project.settings import base
from uuid import uuid4
from django.utils import timezone
from django.core.validators import RegexValidator

from companies.helper_functions import CompanyIDs

from datacom.common_models import CommonCompanyBase
from commons.models import CommonBarcode
from companies.models import Company
from datacom.models import Datacom
from partners.models import Partner

class VendorManager(models.Manager):
  def create_vendor(self, **kwargs):
    if not kwargs['dba_name']:
      raise ValueError("You must enter a valid business name")
    if not kwargs['legal_name']:
      raise ValueError("You must enter a valid legal business name")

    print("\n /n Vendor kwargs", kwargs)

    vendorObj = Vendor.objects.all().order_by('id').last()
    if vendorObj:
      kwargs['account_number'] = vendorObj.account_number
      print("vendorObj.account_number", vendorObj.account_number)
      print('vendorObj.__dict__', vendorObj.__dict__)
    if not vendorObj:
      kwargs['account_number'] = 0

    kwargs['is_vendor'] = True
    print('Modified creat_datacom kwargs', kwargs)

    newVendorID = CompanyIDs.newCompanyID(self, **kwargs)
    print('Modified newVendorID', newVendorID)

    primary_contacts_var = kwargs['primary_contacts']
    billing_contacts_var = kwargs['billing_contacts']
    technical_contacts_var = kwargs['technical_contacts']
    shipping_contacts_var = kwargs['shipping_contacts']

    del kwargs['primary_contacts']
    del kwargs['billing_contacts']
    del kwargs['technical_contacts']
    del kwargs['shipping_contacts']
    
    vendor = self.model(**kwargs)
    vendor.is_active = True
    vendor.account_number = newVendorID

    vendor.save(using=self._db)

    vendor.primary_contacts.set(primary_contacts_var)
    vendor.billing_contacts.set(billing_contacts_var)
    vendor.technical_contacts.set(technical_contacts_var)
    vendor.shipping_contacts.set(shipping_contacts_var)

    vendor.save()

    return vendor


class Vendor(CommonCompanyBase):
  company             = models.ForeignKey(Company, on_delete=models.DO_NOTHING, blank=True, null=True)
  partner             = models.ForeignKey(Partner, on_delete=models.DO_NOTHING, blank=True, null=True)
  datacom             = models.ForeignKey(Datacom, on_delete=models.DO_NOTHING, blank=True, null=True)
  barcode             = models.ForeignKey(CommonBarcode, on_delete=models.DO_NOTHING, blank=True, null=True)
  primary_contacts    = models.ManyToManyField(base.AUTH_USER_MODEL, related_name="vendor_primary_contacts", blank=True)
  billing_contacts    = models.ManyToManyField(base.AUTH_USER_MODEL, related_name="vendor_billing_contacts", blank=True)
  technical_contacts  = models.ManyToManyField(base.AUTH_USER_MODEL, related_name="vendor_technical_contacts", blank=True)
  shipping_contacts   = models.ManyToManyField(base.AUTH_USER_MODEL, related_name="vendor_shipping_contacts", blank=True)
  dba_name 			      = models.CharField(max_length=200)
  legal_name 		      = models.CharField(max_length=200)
  domain              = models.CharField(max_length=100)
  account_number      = models.CharField(max_length=16, null=True, blank=True)
  notes 	            = models.TextField(blank=True, null=True)
  purchasing_terms    = models.CharField(max_length=250, blank=True, null=True)
  vendor_type         = models.CharField(max_length=100, null=True, blank=True)
  profile_img 	      = models.ImageField(max_length=100, upload_to='vendors/', null=True, blank=True)
  logo 	              = models.ImageField(max_length=100, upload_to='vendors/logo', null=True, blank=True)
  
  objects	= VendorManager()


