from django.db import models

from project.settings import base
from attendance.models import LeaveRequest
from humanresources.models import MileageReimbursement

class Notification(models.Model):
  date_added 			  		= models.DateTimeField(auto_now_add=True)
  sender                = models.ForeignKey(base.AUTH_USER_MODEL, related_name="notification_sender", on_delete=models.CASCADE, blank=True, null=True)
  approved_declined_by  = models.ForeignKey(base.AUTH_USER_MODEL, related_name="approved_declined_by", on_delete=models.CASCADE, blank=True, null=True)
  receiver              = models.ForeignKey(base.AUTH_USER_MODEL, related_name="notification_receiver",on_delete=models.CASCADE, blank=True, null=True)
  leave_request         = models.ForeignKey(LeaveRequest, related_name="leave_request",on_delete=models.CASCADE, blank=True, null=True)
  mileage_reimbursement = models.ForeignKey(MileageReimbursement, related_name="leave_request",on_delete=models.CASCADE, blank=True, null=True)
  read            			= models.BooleanField(default=False, blank=True, null=True)
  is_archived           = models.BooleanField(default=False, blank=True, null=True)
  is_deleted            = models.BooleanField(default=False, blank=True, null=True)