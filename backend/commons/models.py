from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator

class Industry(models.Model):
  name 			      = models.CharField(max_length=100, blank=True, null=True)
  date_added		  = models.DateTimeField(auto_now_add=True)

class UOMWeight(models.Model):
  name 			      = models.CharField(max_length=250, blank=True, null=True)

class UOMDimensions(models.Model):
  name 			      = models.CharField(max_length=250, blank=True, null=True)


