from uuid import uuid4
from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator

from eventtools.models import BaseEvent, BaseOccurrence

from employees.models import Employee
from companies.models import Company
from datacom.models import Datacom
from partners.models import Partner

 
class Shift(models.Model):
  datacom           = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  partner           = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  company           = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  employees 		    = models.ManyToManyField(Employee, blank=True)  
  name 			        = models.CharField(max_length=50)
  attendance_type   = models.CharField(max_length=50, blank=True, null=True)
  date_added        = models.DateTimeField(verbose_name="date added", auto_now_add=True)
  start_time        = models.TimeField(verbose_name="Start Time", auto_now_add=False, auto_now=False, blank=True, null=True)
  end_time          = models.TimeField(verbose_name="End Time", auto_now_add=False, auto_now=False, blank=True, null=True)
  require_clock_in  = models.BooleanField(default=False)
  require_clock_out = models.BooleanField(default=False)
  auto_deduct_meal  = models.BooleanField(default=False)
  meal_minutes      = models.IntegerField(default=0, blank=True, null=True)
  auto_deduct_break = models.BooleanField(default=False)
  break_minutes     = models.IntegerField(default=0, blank=True, null=True)
  is_active         = models.BooleanField(default=True)
  start_clockin_time  = models.TimeField(auto_now_add=False, auto_now=False, blank=True, null=True)
  stop_clockout_time = models.TimeField(auto_now_add=False, auto_now=False, blank=True, null=True)

class OperatingHours(models.Model):
  company         = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  partner         = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  datacom         = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)


class BusinessOperatingHours(models.Model):
  company         = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  partner         = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  datacom         = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  day_of_week     = models.CharField(max_length=15)
  isOpen          = models.BooleanField(default=False)
  open            = models.CharField(max_length=10, blank=True, null=True)
  close           = models.CharField(max_length=10, blank=True, null=True)
  open2           = models.CharField(max_length=10, blank=True, null=True)
  close2          = models.CharField(max_length=10, blank=True, null=True)
  

class AttendanceSettings(models.Model):
  company                     = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  partner                     = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  datacom                     = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  operating_hours             = models.ManyToManyField(BusinessOperatingHours, blank=True)
  shift                       = models.ManyToManyField(Shift, related_name='attendance_shift', blank=True)
  is_company                  = models.BooleanField(default=False)
  is_location                 = models.BooleanField(default=False)
  workday_hours               = models.IntegerField(default=8, blank=True, null=True)
  name 			                  = models.CharField(max_length=250)
  date_added                  = models.DateTimeField(verbose_name="date added", auto_now_add=True)
  allow_overtime              = models.BooleanField(default=False)
  allow_clockin_early         = models.BooleanField(default=False)
  allow_clockout_late         = models.BooleanField(default=False)
  is_overtime_over_40         = models.BooleanField(default=False)
  is_weekend_overtime         = models.BooleanField(default=False)
  is_holiday_overtime         = models.BooleanField(default=False)
  overtime_hrs_per_day        = models.IntegerField(default=0, blank=True, null=True)
  late_clockin_late_minutes   = models.IntegerField(default=0, blank=True, null=True)
  early_clockout_minutes      = models.IntegerField(default=0, blank=True, null=True)
  late_clockin_absent_minutes = models.IntegerField(default=0, blank=True, null=True)
  early_clockout_absent_minutes= models.IntegerField(default=0, blank=True, null=True)
  no_clockin_is               = models.CharField(max_length=250, blank=True, null=True)
  no_clock_out_is             = models.CharField(max_length=250, blank=True, null=True)
  notify_no_clockin           = models.BooleanField(default=False)
  notify_no_clockout          = models.BooleanField(default=False)
  notify_clockin_late         = models.BooleanField(default=False)
  notify_clockout_early       = models.BooleanField(default=False)

class PayCycles(BaseEvent):
  company         = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  partner         = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  datacom         = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  name 			      = models.CharField(max_length=100)
  frequency       = models.CharField(max_length=100, blank=True, null=True)
  rule            = models.CharField(max_length=250, blank=True, null=True)
  start_date      = models.DateTimeField(verbose_name="Start Date", auto_now_add=False, auto_now=False, blank=True, null=True)
  end_date        = models.DateTimeField(verbose_name="End Date", auto_now_add=False, auto_now=False, blank=True, null=True)


# class PayCycleManager(models.Manager):
#   def create_paycycle_recurrence(self, **kwargs):
#     print(kwargs, kwargs)

#     cycle_recurrence = self.model()

# 		cycle_recurrence.save(using=self._db)

class PayCycleRecurrence(BaseOccurrence):
  recurrence = models.ForeignKey(PayCycles, on_delete=models.CASCADE)

  # objects	= PayCycleManager()

class TimeCard(models.Model):
  cycle           = models.ForeignKey(PayCycles, on_delete=models.CASCADE, blank=True, null=True)
  employee        = models.ForeignKey(Employee, on_delete=models.CASCADE, blank=True, null=True)
  punchType 			= models.CharField(max_length=50)
  date_added      = models.DateTimeField(verbose_name="date added", auto_now_add=True)
  is_late         = models.BooleanField(default=False)
  is_onLeave      = models.BooleanField(default=False)
  clock_in_time   = models.DateTimeField(verbose_name="Clock-In DateTime", auto_now_add=False, auto_now=False, blank=True, null=True)
  clock_out_time  = models.DateTimeField(verbose_name="Clock-In DateTime", auto_now_add=False, auto_now=False, blank=True, null=True)
  remark          = models.CharField(max_length=250, blank=True, null=True)

  class Meta:
    ordering = ['date_added']

class LeaveRequest(models.Model):
  employee            = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='employee_leave')
  manager             = models.ForeignKey(Employee, on_delete=models.DO_NOTHING, related_name='manager_leave', blank=True, null=True)
  approved_by         = models.ForeignKey(Employee, on_delete=models.DO_NOTHING, related_name='approved_by', blank=True, null=True)
  approve_decline_date= models.CharField(max_length=250, blank=True, null=True)
  leaveType 			    = models.CharField(max_length=50, blank=True, null=True)
  start_date          = models.DateTimeField(verbose_name="Start Date", auto_now_add=False, auto_now=False, blank=True, null=True)
  end_date            = models.DateTimeField(verbose_name="End Date", auto_now_add=False, auto_now=False, blank=True, null=True)
  days_requested      = models.IntegerField(default=1, blank=True, null=True)
  date_added          = models.DateTimeField(verbose_name="Date Added", auto_now_add=True)
  status              = models.CharField(max_length=50, default="Open")
  is_approved         = models.BooleanField(default=False)
  leave_comments      = models.TextField(blank=True, null=True)
  approval_remarks    = models.TextField(blank=True, null=True)
  vacation_remaining  = models.IntegerField(blank=True, null=True)
  sick_remaining      = models.IntegerField(blank=True, null=True)
  personal_remaining  = models.IntegerField(blank=True, null=True)
  pto_remaining       = models.IntegerField(blank=True, null=True)
  files               = models.FileField(max_length=100, upload_to='employee/leave', blank=True, null=True)

  class Meta:
    ordering = ['date_added']





