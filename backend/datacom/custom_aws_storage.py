from storages.backends.s3boto3 import S3Boto3Storage
from datacom.models import Datacom

class MediaStorage(S3Boto3Storage):
  bucket_name = 'my-media-bucket
  location = 'media' # store files under directory `media/` in bucket `my-app-bucket`