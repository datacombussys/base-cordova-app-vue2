from rest_framework import serializers
from django.contrib.contenttypes.models import ContentType

from .models import Benefits, EmployeeDocuments, CompanyDocuments, MileageReimbursement

class BenefitsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Benefits
    fields = ('__all__')
		
class EmployeeDocumentsSerializer(serializers.ModelSerializer):
  class Meta:
    model = EmployeeDocuments
    fields = ('__all__')


class CompanyDocumentsSerializer(serializers.ModelSerializer):
  class Meta:
    model = CompanyDocuments
    fields = ('__all__')
    
class MileageReimbursementSerializer(serializers.ModelSerializer):
  class Meta:
    model = MileageReimbursement
    fields = ('__all__')

