from django.db import models
from rest_framework import permissions


class AdminSuperAdmin(permissions.BasePermission):
	"""Allow user to edit their own profile"""

	def has_permission(self, request, view):
		if request.method in ["GET"]:
			if request.user.id == obj.id or request.user.is_superuser:
			# 	return True
			# return False

		if request.method in ["POST"]:
			if obj.is_admin:
				if request.user.is_superuser == True:
					return True
				else:
					return False
			else:
				return True
  
  # def has_object_permission(self, request, view, obj):
  #   if request.method in permissions.SAFE_METHODS:
  #     print("is_admin", obj.is_admin)
  #   if request.user.id == obj.id or request.user.is_superuser:
  #     return True
  #   return False

  #   if request.method in ["PUT", "PATCH", "DELETE"]:
  #     if obj.is_admin:
  #       if request.user.is_superuser == True:
  #         return True
  #     else:
  #       return False
  #   else:
  #     return True
 
 
  # def validate(self, data):
  #       print('data', data)
  #       print('self', self)
  #       print('self.context', self.context)
  #       print("self.context['request']", self.context['request'])
  #       print("self.context['request'].user", self.context['request'].user)
  #       datacom = data.get('is_datacom', "")
  #       merchant = data.get('is_merchant', "")
  #       partner = data.get('is_partner', "")
  #       vendor = data.get('is_vendor', "")
  #       if data['password'] and data['email']:
  #           user = authenticate(email=data['email'], password=data['password'])
  #           print('user', user)
  #           if user:
  #               if user.is_active:
  #                   if data['new_password'] == data['confirm_password']:
  #                       #Check if password is same
  #                       if check_password(data['password'], user.password):
  #                           try:
  #                               #Also Validate if password fits certian criteria
  #                               validate_password(data['new_password'])
  #                               data['user'] = user
  #                               return data
  #                           except ValidationError as error:
  #                               print('The password does not meet the minimum requirements')
  #                               raise serializers.ValidationError(password_validators_help_texts())
                            
  #                   else:
  #                       msg = "Your passwords do not match"
  #                       raise exceptions.ValidationError(msg)
  #           else:
  #               msg = "User and password combination does not match"
  #               raise exceptions.ValidationError(msg)
  #       else:
  #           msg = "You must provide a username and password"
  #           raise exceptions.ValidationError(msg)
  #       return data
