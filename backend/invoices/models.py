from django.db import models
from django.core.validators import RegexValidator

from companies.models import Company
from datacom.models import Datacom
from partners.models import Partner
from users.models import User
from commons2.models import Shipping
from customers.models import Customer
from inventory.models import Inventory


class Invoice(models.Model):
  datacom             = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  partner             = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  company             = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  customer            = models.OneToOneField(Customer, on_delete=models.DO_NOTHING, blank=True, null=True)
  shipping            = models.OneToOneField(Shipping, on_delete=models.DO_NOTHING, blank=True, null=True)
  created_by          = models.OneToOneField(User, on_delete=models.DO_NOTHING, blank=True, null=True)
  inventory           = models.ManyToManyField(Inventory, blank=True)
  date_added 		      = models.DateTimeField(verbose_name="date added", auto_now_add=True)
  due_date 		        = models.DateTimeField(verbose_name="date paid", auto_now_add=False, auto_now=False, blank=True, null=True)
  invoice_number      = models.CharField(max_length=10, blank=True)
  subtotal            = models.DecimalField(max_digits=10, decimal_places=2)
  taxes               = models.DecimalField(max_digits=10, decimal_places=2)
  fee                 = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
  discount            = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
  total_amt           = models.DecimalField(max_digits=10, decimal_places=2)
  terms               = models.CharField(max_length=255, blank=True, null=True)

  
FREQUENCY_CHOICES = sorted([('Cash', 'Cash'), ('Credit', 'Credit'), ('Check', 'Check'), 
                            ('On-Account', 'On-Account'), ('ACH', 'ACH'), ('Debit', 'Debit')])
class Receipt(models.Model):

  datacom             = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  partner             = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  company             = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  customer            = models.OneToOneField(Customer, on_delete=models.DO_NOTHING, blank=True, null=True)
  date_added 		      = models.DateTimeField(verbose_name="date added", auto_now_add=True)
  date_paid 		      = models.DateTimeField(verbose_name="date paid", auto_now_add=False, auto_now=False, blank=True, null=True)
  invoice             = models.ForeignKey(Invoice, on_delete=models.CASCADE, blank=True, null=True)
  reference_id         = models.CharField(max_length=255, blank=True, null=True)
  subtotal            = models.DecimalField(max_digits=10, decimal_places=2)
  taxes               = models.DecimalField(max_digits=10, decimal_places=2)
  fee                 = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
  discount            = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
  total_items         = models.IntegerField(blank=True, null=True)
  total_amt           = models.DecimalField(max_digits=10, decimal_places=2)
  terms               = models.CharField(max_length=255, blank=True, null=True)
  form_of_pmt1  		  = models.CharField(max_length=100, choices=FREQUENCY_CHOICES, default='Credit')
  form_of_pmt1_amt    = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
  form_of_pmt2  		  = models.CharField(max_length=100, choices=FREQUENCY_CHOICES, default='Credit')
  form_of_pmt2_amt    = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
  form_of_pmt3  		  = models.CharField(max_length=100, choices=FREQUENCY_CHOICES, default='Credit')
  form_of_pmt3_amt    = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)