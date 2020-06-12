from django.db import models
from rest_framework import permissions

class CanViewInventory(permissions.BasePermission):
  """Allow user to edit their own profile"""

  def has_permission(self, request, view):
    """Check to see if user has permission to view/edit own profile"""
    SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS', 'PUT', 'PATCH']
    if request.method in SAFE_METHODS:
      print("Accessing request for Inventory: view", view.__dict__)
      print("Accessing request for Inventory: permissions", permissions.__dict__)
      print("Accessing request for Inventory: request.auth", request.auth)
      print("Accessing request for Inventory: request.data", request.data)
      print("Accessing request for Inventory: request.user", request.user)
      print("Accessing request for Inventory: request.user.permissions", request.user.__dict__)
      print("Accessing request for Inventory: request.user.is_superuser", request.user.is_superuser)
      if request.user.is_anonymous:
        print("AnonymousUser")
        return False
      if request.user.is_admin or request.user.is_superuser:
        return True
      
      # Notes - I need to compare request.user.groups to a list of approved groups
      # Then if the group has the permission for has_permission (post-add, get-view) or has_object_permission (delete, put-change)
      # if request.user.is_admin or request.user.is_superuser:
      #   group = None
      #   if request.user.groups.exists():
      #     group = request.users.groups.all()[0].name

      #     if group in allowed_roles_list: 

      #       return True
      
      return False

    return False

  def has_Object_permission(self, request, view, obj):
    """Check to see if user has permission to view/edit own profile"""
    SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS', 'PUT', 'PATCH']
    if request.method in SAFE_METHODS:
      print("Accessing request for Inventory: view", view)
      print("Accessing request for Inventory: permissions", permissions)
      print("Accessing request for Inventory: request.auth", request.auth)
      print("Accessing request for Inventory: request.method", request.method)
      print("Accessing request for Inventory: request.data", request.data)
      print("Accessing request for Inventory: request.user", request.user)
      print("Accessing request for Inventory: request.user.permissions", request.user.permissions)
      print("Accessing request for Inventory: request.user.is_superuser", request.user.is_superuser)
      if request.user.is_anonymous:
        print("AnonymousUser")
        return False
      if request.user.is_admin or request.user.is_superuser:
        return True
      
      return False

    return False
