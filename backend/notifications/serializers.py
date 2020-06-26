from rest_framework import serializers

from .models import Notification
from users.models import User
from attendance.models import LeaveRequest
from humanresources.models import MileageReimbursement

from users.serializers import SimpleUserSerializer
from attendance.serializers import LeaveRequestSerializer
from humanresources.serializers import MileageReimbursementSerializer

class NotificationSerializer(serializers.ModelSerializer):
  sender = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
  receiver = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
  approved_declined_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
  leave_request = serializers.PrimaryKeyRelatedField(queryset=LeaveRequest.objects.all(), required=False, allow_null=True)
  mileage_reimbursement = serializers.PrimaryKeyRelatedField(queryset=MileageReimbursement.objects.all(), required=False, allow_null=True)

  class Meta:
    model = Notification
    fields = ('__all__')

  def to_representation(self, value):
    data = super().to_representation(value) 
    if data['sender']:
      sender_data_serializer = SimpleUserSerializer(value.sender)
      data['sender'] = sender_data_serializer.data
    if data['approved_declined_by']:
      approved_declined_by_data_serializer = SimpleUserSerializer(value.approved_declined_by)
      data['approved_declined_by'] = approved_declined_by_data_serializer.data
    if data['receiver']:
      receiver_data_serializer = SimpleUserSerializer(value.receiver)
      data['receiver'] = receiver_data_serializer.data
    if data['mileage_reimbursement']:
      mileage_reimbursement_data_serializer = MileageReimbursementSerializer(value.mileage_reimbursement)
      data['mileage_reimbursement'] = mileage_reimbursement_data_serializer.data
    if data['leave_request']:
      leave_request_data_serializer = LeaveRequestSerializer(value.leave_request)
      data['leave_request'] = leave_request_data_serializer.data
    return data