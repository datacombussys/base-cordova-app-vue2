from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator

from companies.helper_functions import CompanyIDs

from project.settings import base
from datacom.common_models import CommonCompanyBase
from datacom.models import Datacom, CommonBarcode
from commons.models import Industry
from humanresources.models import CompanyDocuments

class PartnerManager(models.Manager):
  def create_partner(self, **kwargs):
    if not kwargs['dba_name']:
      raise ValueError("You must enter a valid business name")
    if not kwargs['legal_name']:
      raise ValueError("You must enter a valid legal business name")

    print("partner kwargs", kwargs)

    partnerObj = Partner.objects.all().order_by('id').last()
    if partnerObj:
      kwargs['account_number'] = partnerObj.account_number
      print("partnerObj.account_number", partnerObj.account_number)
      print('partnerObj.__dict__', partnerObj.__dict__)
    if not partnerObj:
      kwargs['account_number'] = 0

    kwargs['is_partner'] = True
    print('Modified partner kwargs', kwargs)
    newPartnerID = CompanyIDs.newCompanyID(self, **kwargs)
    
    partner = self.model(**kwargs)
    partner.is_active = True
    partner.account_number = newPartnerID
    partner.save(using=self._db)

    return partner

class Partner(CommonCompanyBase):
  datacom             = models.ForeignKey(Datacom, on_delete=models.DO_NOTHING, blank=True, null=True)
  created_by 		      = models.ForeignKey(base.AUTH_USER_MODEL, related_name='partner_creator', 
                        on_delete=models.DO_NOTHING, blank=True, null=True)
  industry            = models.ForeignKey(Industry, on_delete=models.DO_NOTHING, blank=True, null=True)
  primary_contact_list= models.ManyToManyField(base.AUTH_USER_MODEL, related_name="partner_primary_contacts", blank=True)
  billing_contact_list= models.ManyToManyField(base.AUTH_USER_MODEL, related_name="partner_billing_contacts", blank=True)
  technical_contact_list= models.ManyToManyField(base.AUTH_USER_MODEL, related_name="partner_technical_contacts", blank=True)
  shipping_contact_list= models.ManyToManyField(base.AUTH_USER_MODEL, related_name="partner_shipping_contacts", blank=True)
  dba_name 			      = models.CharField(max_length=200)
  legal_name 		      = models.CharField(max_length=200)
  domain              = models.CharField(max_length=100)
  account_number      = models.CharField(max_length=16, null=True, blank=True)
  merchant_id         = models.CharField(max_length=9, null=True, 
									      blank=True, validators=[RegexValidator(r'^\d{1,9}$')])
  profile_img 	      = models.ImageField(max_length=100, upload_to='partners/', null=True, blank=True)
  logo 	              = models.ImageField(max_length=100, upload_to='partners/logo', null=True, blank=True)
  barcode             = models.ForeignKey(CommonBarcode, on_delete=models.DO_NOTHING, blank=True, null=True)
  company_docs        = models.ForeignKey(CompanyDocuments, on_delete=models.DO_NOTHING, blank=True, null=True)

  objects	= PartnerManager()

  def __str__(self):
    return self.datacom.dba_name
