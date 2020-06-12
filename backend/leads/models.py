from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator

from datacom.common_models import CommonCompanyBase
from employees.models import Employee
from companies.models import Company
from datacom.models import Datacom
from partners.models import Partner

class Lead(CommonCompanyBase):
  datacom             = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  partner             = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  company             = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  created_by 		      = models.ForeignKey(Employee, related_name='created_by', 
                        on_delete=models.DO_NOTHING, blank=True, null=True)
  lead_no             = models.CharField(max_length=100, blank=True)
  lead_number         = models.CharField(max_length=16, null=True, blank=True, validators=[RegexValidator(r'^\d{1,16}$')])
  tax_id              = models.CharField(max_length=9, null=True, 
									      blank=True, validators=[RegexValidator(r'^\d{1,9}$')])
  barcode             = models.CharField(max_length=10, null=True, 
									      blank=True, validators=[RegexValidator(r'^\d{1,10}$')])