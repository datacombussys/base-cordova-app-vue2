from django.db import models
from django.utils import timezone
from project.settings import base
from django.core.validators import RegexValidator

from datacom.common_models import CommonCompanyBase, CommonBarcode
from datacom.models import Datacom
from partners.models import Partner
from commons.models import Industry
from humanresources.models import CompanyDocuments

from companies.helper_functions import CompanyIDs



# Company / Merchant Model Manager
class CompanyManager(models.Manager):
  '''Create a company instance'''

  def create_company(self, **kwargs):
    if not kwargs['dba_name']:
      raise ValueError("You must enter a valid business name")
    if not kwargs['legal_name']:
      raise ValueError("You must enter a valid legal business name")

    print("Company kwargs", kwargs)

    companyObj = Company.objects.all().order_by('id').last()
    if companyObj:
      kwargs['account_number'] = companyObj.account_number
      print("companyObj.account_number", companyObj.account_number)
      print('companyObj.__dict__', companyObj.__dict__)
    if not companyObj:
      kwargs['account_number'] = 0

    kwargs['is_merchant'] = True
    print('Modified creat_company kwargs', kwargs)

    newCompanyID = CompanyIDs.newCompanyID(self, **kwargs)
    print('newCompanyID', newCompanyID)
    
    company = self.model(**kwargs)
    company.account_number = newCompanyID
    company.is_active = True
    company.save(using=self._db)

    return company

# Company / Merchant Model
class Company(CommonCompanyBase):
  partner             = models.ForeignKey(Partner, on_delete=models.DO_NOTHING, blank=True, null=True)
  datacom             = models.ForeignKey(Datacom, on_delete=models.DO_NOTHING, blank=True, null=True)
  industry            = models.ForeignKey(Industry, on_delete=models.DO_NOTHING, blank=True, null=True)
  created_by 		      = models.OneToOneField(base.AUTH_USER_MODEL,  related_name="company_creator", on_delete=models.DO_NOTHING, blank=True, null=True)
  primary_contact_list= models.ManyToManyField(base.AUTH_USER_MODEL, related_name="company_primary_contacts", blank=True)
  billing_contact_list= models.ManyToManyField(base.AUTH_USER_MODEL, related_name="company_billing_contacts", blank=True)
  technical_contact_list= models.ManyToManyField(base.AUTH_USER_MODEL, related_name="company_technical_contacts", blank=True)
  shipping_contact_list= models.ManyToManyField(base.AUTH_USER_MODEL, related_name="company_shipping_contacts", blank=True)
  domain              = models.CharField(max_length=100)
  dba_name 			      = models.CharField(max_length=200)
  legal_name 		      = models.CharField(max_length=200)
  account_number      = models.CharField(max_length=16, null=True, blank=True)
  merchant_id         = models.CharField(max_length=16, null=True, 
									      blank=True, validators=[RegexValidator(r'^\d{1,16}$')])
  entity_type 	  	  = models.CharField(max_length=50, blank=True, null=True)
  products_sold       = models.CharField(max_length=50, blank=True, null=True) 
  profile_img 	      = models.ImageField(max_length=100, upload_to='companies/profile', null=True, blank=True)
  logo 	              = models.ImageField(max_length=100, upload_to='companies/logo', null=True, blank=True)
  barcode             = models.ForeignKey(CommonBarcode, on_delete=models.DO_NOTHING, blank=True, null=True)
  company_docs        = models.ForeignKey(CompanyDocuments, on_delete=models.DO_NOTHING, blank=True, null=True)

  objects	= CompanyManager()

def __str__(self):
  return self.dba_name


