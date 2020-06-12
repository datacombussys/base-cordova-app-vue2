
class CreateListMixin:
  """Allows bulk creation of a resource."""
  def get_serializer(self, *args, **kwargs):
    if isinstance(kwargs.get('data', {}), list):
      kwargs['many'] = True
    # if isinstance(kwargs.get('files', {}), list):
    #   kwargs['many'] = True

    return super().get_serializer(*args, **kwargs)