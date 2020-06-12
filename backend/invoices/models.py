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
  invoice_number      = models.CharField(max_length=10, blank=True)
  subtotal            = models.DecimalField(max_digits=10, decimal_places=2)
  taxes               = models.DecimalField(max_digits=10, decimal_places=2)
  fee                 = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
  discount            = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
  total               = models.DecimalField(max_digits=10, decimal_places=2)
  terms               = models.CharField(max_length=255, blank=True, null=True)