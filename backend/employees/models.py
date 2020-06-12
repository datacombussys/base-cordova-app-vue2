from uuid import uuid4
from django.db import models
from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist
from django.core.validators import RegexValidator
from django.contrib import auth

from project.settings import base
# from users.models import MainUserManager

from employees.helper_functions import EmployeeIDs
from companies.models import Company
from partners.models import Partner
from datacom.models import Datacom
from vendors.models import Vendor
from commons2.models import Department


class Position(models.Model):
  datacom             = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  partner             = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  company             = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  date_added 			    = models.DateField(verbose_name="date joined", auto_now_add=True)
  name                = models.CharField(max_length=100, null=True, blank=True)

  def __str__(self):
    return self.name

# Employee Model Manager
class EmployeeManager(models.Manager):
  '''User is created first in Vue and then passed ID to create Employee here '''
  userModel = auth.get_user_model()

  def create_employee(self, **kwargs):
    '''Create Employee using email address as login id'''
    print("Employee kwargs", kwargs)

    employee = self.model(**kwargs)
    eeObj = Employee.objects.all().order_by('id').last()
    if eeObj:
      kwargs['employee_number'] = eeObj.employee_number
      print("eeObj.employee_number", eeObj.employee_number)
      print('eeObj.__dict__', eeObj.__dict__)
    if not eeObj:
      kwargs['employee_number'] = 0

    print('else kwargs', kwargs)
    newEmployeeID = EmployeeIDs.newEmployeeID(self, **kwargs)
    print('newEmployeeID', newEmployeeID)
    employee.employee_number = newEmployeeID
    print("employee", employee)
    employee.save(using=self._db)

    return employee

  def create_employee_admin(self, **kwargs):
    # Create Admin Employee using email address as login id
    employee = self.create_employee(**kwargs)
    employee.save(using=self._db)
    userObj = self.userModel.objects.get(email=kwargs['email'])
    userObj.is_admin = True
    userObj.save()
    return employee
  
# Employee Model
class Employee(models.Model):
  datacom           = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  partner           = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  company           = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  vendor            = models.ForeignKey(Vendor, on_delete=models.CASCADE, blank=True, null=True)
  user              = models.OneToOneField(base.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
  department        = models.ForeignKey(Department, on_delete=models.DO_NOTHING, blank=True, null=True)
  # Assigned Modules to employee Many-to-many field
  position 			    = models.ForeignKey(Position, on_delete=models.DO_NOTHING, blank=True, null=True)
  employee_number   = models.CharField(max_length=16, null=True, 
									    blank=True, validators=[RegexValidator(r'^\d{1,16}$')])
  salary            = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
  salary_type       = models.CharField(max_length=50, blank=True, null=True)
  # Make as a ForeignKey in Payroll module
  pay_cycle         = models.CharField(max_length=50, blank=True, null=True)
  employee_type     = models.CharField(max_length=20, blank=True, null=True)
  work_phone        = models.CharField(max_length=10, null=True, 
									    blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
  is_business 	    = models.BooleanField(default=False, blank=True, null=True)
  is_sales_rep	    = models.BooleanField(default=False, blank=True, null=True)
  is_warehouse_ee   = models.BooleanField(default=False, blank=True, null=True)
  is_exempt 	      = models.BooleanField(default=False, blank=True, null=True)
  is_manager 	      = models.BooleanField(default=False, blank=True, null=True)
  reporting_manager = models.CharField(max_length=250, blank=True, null=True)
  hire_date         = models.DateTimeField(auto_now=False, auto_now_add=False, null=True, blank=True)
  termination_date  = models.DateTimeField(auto_now=False, auto_now_add=False, null=True, blank=True)
  termination_reason= models.TextField(blank=True, null=True)
  ssn               = models.CharField(max_length=9, null=True, 
									    blank=True, validators=[RegexValidator(r'^\d{1,9}$')])
  dob               = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
  medical_ins       = models.BooleanField(default=False, blank=True, null=True)
  accident_ins      = models.BooleanField(default=False, blank=True, null=True)
  dental_ins        = models.BooleanField(default=False, blank=True, null=True)
  vision_ins        = models.BooleanField(default=False, blank=True, null=True)
  retirement        = models.BooleanField(default=False, blank=True, null=True)
  #I need to create a benefits app and include all benefit fields and calculations
  #contribution_percent  = models.DecimalField(max_digits=5, decimal_places=2)
  org_name          = models.CharField(max_length=100, blank=True, null=True)
  handbook	        = models.FileField(max_length=100, upload_to='employee/', null=True, blank=True)
  signed_handbook	  = models.BooleanField(default=False,blank=True, null=True)
  policies_procedures	= models.FileField(max_length=100, upload_to='employee/', null=True, blank=True)
  signed_pp	        = models.BooleanField(default=False,blank=True, null=True)
  code_conduct	    = models.FileField(max_length=100, upload_to='employee/', null=True, blank=True)
  signed_code	      = models.BooleanField(default=False,blank=True, null=True)
  employment_agmt	  = models.FileField(max_length=100, upload_to='employee/', null=True, blank=True)
  signed_ee_agmt	  = models.BooleanField(default=False,blank=True, null=True)
  compensation_plan	= models.FileField(max_length=100, upload_to='employee/', null=True, blank=True)
  signed_comp_plan  = models.BooleanField(default=False,blank=True, null=True)
  personal_days_rem = models.IntegerField(blank=True, null=True)
  vacation_days_rem = models.IntegerField(blank=True, null=True)
  sick_days_rem     = models.IntegerField(blank=True, null=True)
  pto_days_rem      = models.IntegerField(blank=True, null=True)
  profile_img 		  = models.ImageField(max_length=100, upload_to='employees/profile/', null=True, blank=True)
  

  objects	= EmployeeManager()
  
  class Meta:
    ordering = ['user__last_name', 'hire_date']

  def __str__(self):
    return self.user.full_name

