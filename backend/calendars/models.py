from uuid import uuid4
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.contenttypes.models import ContentType
from django.utils import timezone
from django.core.validators import RegexValidator
from django.contrib import auth
from django.contrib.postgres.fields import ArrayField, JSONField

from employees.models import Employee
  
# Calendar Model
class Calendar(models.Model):
  title             = models.CharField(max_length=250)
  contenttype       = models.ForeignKey(ContentType, on_delete=models.DO_NOTHING, blank=True, null=True)
  employee          = models.ForeignKey(Employee, on_delete=models.CASCADE, blank=True, null=True)
  attendees         = models.ManyToManyField(Employee, related_name="attendees", blank=True)
  module_name       = models.CharField(max_length=250, blank=True, null=True)
  groupId           = models.IntegerField(null=True, blank=True)
  allDay            = models.BooleanField(default=False, blank=True, null=True)
  start             = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
  end               = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
  daysOfWeek        = ArrayField(models.IntegerField(null=True, blank=True),size=7, null=True, blank=True)
  startTime         = models.TimeField(auto_now=False, auto_now_add=False, null=True, blank=True)
  endTime           = models.TimeField(auto_now=False, auto_now_add=False, null=True, blank=True)
  startRecur        = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
  endRecur          = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
  URL               = models.CharField(max_length=250, blank=True, null=True)
  classNames        = models.CharField(max_length=250, blank=True, null=True)
  editable          = models.BooleanField(default=True)
  startEditable     = models.BooleanField(default=True)
  durationEditable  = models.BooleanField(default=True)
  resourceEditable  = models.BooleanField(default=True)
  resourceId        = models.CharField(max_length=250, blank=True, null=True)
  resourceIds       = ArrayField(models.CharField(max_length=250, blank=True, null=True), null=True, blank=True)
  overlap           = models.BooleanField(default=True)
  constraint        = models.IntegerField(null=True, blank=True)
  color             = models.CharField(max_length=20, blank=True, null=True)
  backgroundColor   = models.CharField(max_length=20, blank=True, null=True)
  textColor         = models.CharField(max_length=20, blank=True, null=True)
  borderColor       = models.CharField(max_length=20, blank=True, null=True)
  extendedProps     = JSONField(blank=True, null=True)
  location          = models.CharField(max_length=250, blank=True, null=True)
  body              = models.TextField(blank=True, null=True)
  rrule             = models.CharField(max_length=250, blank=True, null=True)
  

  class Meta:
    ordering = ['start', 'title']

  def __str__(self):
    return self.title
