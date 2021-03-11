from django.db import models
from uuid import uuid4
from django.core.validators import RegexValidator
from django.contrib.postgres.fields import JSONField
from django.db.transaction import TransactionManagementError
from django.contrib.auth.hashers import make_password, check_password
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, Http404

from datacom.models import Datacom
from partners.models import Partner
from companies.models import Company
from project.settings import base
from users.models import User

from .elavon import Converge

class APIKeyManager(models.Manager):
	def get_or_none(self, **kwargs):
		try:
			return self.get(**kwargs)
		except ObjectDoesNotExist:
			return None

	def update_api(self, **kwargs):
		print("update_api kwargs", kwargs)
		obj = kwargs.pop('key', False)

		for index, value in kwargs.items():
			setattr(obj, index, value)

		obj.save(update_fields=kwargs.keys())
		
		return obj
			
	def create_API_key(self, **kwargs):
		if not kwargs['processor_name']:
			raise ValueError("You must enter the name of the processor")
		if not kwargs['merchant_id']:
			raise ValueError("You must enter a valid merchant ID")
		print("create_API_key kwargs", kwargs)

		# Need to find out if company already has active API Key
		# If not, create new API key
		# If so, find it and update wit with current values

		datacom = kwargs.get('datacom', None)
		partner = kwargs.get('partner', None)
		company = kwargs.get('company', None)

		if datacom:
			keyObj = CardProcessingAPIKey.objects.get_or_none(datacom_id=kwargs['datacom'])
			if keyObj:
				kwargs['key'] = keyObj
				api = self.update_api(**kwargs)
				return api
			else:
				api = self.model(**kwargs)
				api.save(using=self._db)
				return api
		elif partner:
			keyObj = CardProcessingAPIKey.objects.get_or_none(partner_id=kwargs['partner'])
			if keyObj:
				kwargs['key'] = keyObj
				api = self.update_api(**kwargs)
				return api
			else:
				api = self.model(**kwargs)
				api.save(using=self._db)
				return api
		elif company:
			keyObj = CardProcessingAPIKey.objects.get_or_none(company_id=kwargs['company'])
			if keyObj:
				kwargs['key'] = keyObj
				api = self.update_api(**kwargs)
				return api
			else:
				api = self.model(**kwargs)
				api.save(using=self._db)
				return api


class CardProcessingAPIKey(models.Model):
	PROCESSOR_OPTIONS=[
		("Elavon", "Elavon"),
		("Forte", "Forte"),
	]
	partner           = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
	datacom           = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
	company           = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
	user              = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
	date_added 		    = models.DateTimeField(verbose_name="date added", auto_now_add=True)
	processor_name    = models.CharField(max_length=20, choices=PROCESSOR_OPTIONS)
	merchant_id       = models.CharField(max_length=15, validators=[RegexValidator(r'^\d{1,20}$')])
	pin               = models.CharField(max_length=64, blank=True, null=True)
	ssl_user_id				= models.CharField(max_length=15, blank=True, null=True)
	is_demo 					= models.BooleanField(default=True, blank=True, null=True)

	objects = APIKeyManager()


class CreditCardManager(models.Manager):
	def get_or_none(self, **kwargs):
		try:
			return self.get(**kwargs)
		except ObjectDoesNotExist:
			return None

	def create_credit_card(self, **kwargs):
		if not kwargs['name_on_card']:
			raise ValueError("You must enter a name of the person on the credit card")
		print('Create Credit Card kwargs', kwargs)

		#Submit Credit Card immediately to replace it with a token

		datacom = kwargs.get('datacom', None)
		partner = kwargs.get('partner', None)
		company = kwargs.get('company', None)
		user = kwargs.get('user', None)
		
		key = None
		if datacom:
			key = CardProcessingAPIKey.objects.get_or_none(processor_name="Elavon", datacom_id=datacom)
		if partner:
			key = CardProcessingAPIKey.objects.get_or_none(processor_name="Elavon", partner_id=partner)
		if company:
			key = CardProcessingAPIKey.objects.get_or_none(processor_name="Elavon", company_id=company)
		if user:
			key = CardProcessingAPIKey.objects.get_or_none(processor_name="Elavon", user_id=user)

		converge = Converge(
			ssl_merchant_id = key.merchant_id,
			ssl_user_id = key.ssl_user_id,
			ssl_pin = key.pin,
			is_demo = key.is_demo,
		)
		del kwargs['datacom']
		del kwargs['partner']
		del kwargs['company']
		del kwargs['user']

		# Send to Elavon and get Token and store the token
		kwargs['transaction_type']= "ccgettoken"
		card_number_token = converge.request(**kwargs)
		print(card_number_token)

		# Send to Elavon and get card_brand Mastercard / VISA and card_type Credit / Debit
		kwargs['transaction_type']= "binlookup"
		kwargs['ssl_token']= card_number_token['ssl_token']
		card_type = converge.request(**kwargs)

		creditcard = self.model(**kwargs)
		creditcard.processor_token = card_number_token
		if kwargs['card_number'].startswith('4'):
			creditcard.card_brand = "VISA"
		if kwargs['card_number'].startswith(str(range(51, 54, 1))):
			creditcard.card_brand = "MasterCard"
		if kwargs['card_number'].startswith(str(range(34, 37, 1))):
			creditcard.card_brand = "American Express"
		if kwargs['card_number'].startswith("6011") or kwargs['card_number'].startswith("65"):
			creditcard.card_brand = "Discover"
		if kwargs['card_number'].startswith(str(range(300, 305, 1))) or kwargs['card_number'].startswith("36") or kwargs['card_number'].startswith("38"):
			creditcard.card_brand = "Diner Club"

		creditcard.last4 = kwargs['card_number_token'][-4::]
		creditcard.card_exp_date = kwargs['card_exp_year'] + "-" + kwargs['card_exp_month'] + "-" + "01"
		print('kwargs[card_exp_date]', kwargs['card_exp_date'])

		# Tokenize Credit Card Number for Datacom Usage
		creditcard.card_number_token = make_password(kwargs['card_number'], salt=None, hasher='default')

		creditcard.save(using=self._db)

		return creditcard

class CreditCard(models.Model):
	CARD_BRANDS = [
		("VS", 'VISA'),
		("MC", 'MasterCard'),
		("DS", 'Discover'),
		("DC", 'Dincer Club'),
		("AM", 'American Express')
	]
	partner           = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
	datacom           = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
	company           = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
	user              = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
	date_added 		    = models.DateTimeField(verbose_name="date added", auto_now_add=True)
	name_on_card      = models.CharField(max_length=255)
	card_number       = models.CharField(max_length=255)
	card_number_token = models.CharField(max_length=255, blank=True, null=True)
	processor_token 	= models.CharField(max_length=255, blank=True, null=True)
	card_cvv          = models.CharField(max_length=3, blank=True, null=True)
	billing_address   = models.CharField(max_length=255, blank=True, null=True)
	billing_address2  = models.CharField(max_length=255, blank=True, null=True)
	billing_city      = models.CharField(max_length=50, blank=True, null=True)
	billing_state     = models.CharField(max_length=20, blank=True, null=True)
	billing_zip       = models.CharField(max_length=5, null=True, blank=True, validators=[RegexValidator(r'^\d{1,5}$')])
	billing_country   = models.CharField(max_length=200, blank=True, null=True)
	card_exp_date     = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
	card_exp_month    = models.CharField(max_length=2, null=True, blank=True, validators=[RegexValidator(r'^\d{1,2}$')])
	card_exp_year     = models.CharField(max_length=4, null=True, blank=True, validators=[RegexValidator(r'^\d{1,4}$')])
	phone             = models.CharField(max_length=10, null=True, 
											blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
	last4             = models.CharField(max_length=4, null=True, 
											blank=True, validators=[RegexValidator(r'^\d{1,4}$')])
	is_primary        = models.BooleanField(default=False)
	is_active         = models.BooleanField(default=True)
	is_debit          = models.BooleanField(default=True)
	card_type         = models.CharField(max_length=100, blank=True, null=True)
	card_brand        = models.CharField(max_length=2, choices=CARD_BRANDS ,blank=True, null=True)

	objects	= CreditCardManager()

class achManager(models.Manager):
  def create_ach_account(self, **kwargs):
    print('Create ACH Account kwargs', kwargs)
    kwargs['last4'] = kwargs['account_number'][-4::]
    del kwargs['account_number']
    achAccount = self.model(**kwargs)
    achAccount.save(using=self._db)

    return achAccount

class ACHAccount(models.Model):
  partner           = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  datacom           = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  company           = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  user              = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
  date_added 		    = models.DateTimeField(verbose_name="date added", auto_now_add=True)
  name_on_account   = models.CharField(max_length=255)
	#Tokenize
  # account_number    = models.CharField(max_length=18, null=True, blank=True, validators=[RegexValidator(r'^\d{1,18}$')])
  account_number_token = models.CharField(max_length=255, blank=True, null=True)
  routing_number    = models.CharField(max_length=9)
  bank_name         = models.CharField(max_length=100, blank=True, null=True)
  billing_address   = models.CharField(max_length=255, blank=True, null=True)
  billing_address2  = models.CharField(max_length=255, blank=True, null=True)
  billing_city      = models.CharField(max_length=50, blank=True, null=True)
  billing_state     = models.CharField(max_length=20, blank=True, null=True)
  billing_zip       = models.CharField(max_length=5, null=True, blank=True, validators=[RegexValidator(r'^\d{1,5}$')])
  last4             = models.CharField(max_length=4, null=True, 
									    blank=True, validators=[RegexValidator(r'^\d{1,4}$')])
  is_primary        = models.BooleanField(default=False)
  is_active         = models.BooleanField(default=True)
  is_business_acct  = models.BooleanField(default=True)
  phone             = models.CharField(max_length=10, null=True, 
									    blank=True, validators=[RegexValidator(r'^\d{1,10}$')])

  objects	= achManager()


class ForteACHStatusCode(models.Model):
  status            = models.CharField(max_length=255)
  description       = models.CharField(max_length=255)
  date_added 		    = models.DateTimeField(verbose_name="date added", auto_now_add=True)
  
class ForteACHResponseCode(models.Model):
  code              = models.CharField(max_length=3)
  description       = models.CharField(max_length=255)
  comments          = models.CharField(max_length=255)
  date_added 		    = models.DateTimeField(verbose_name="date added", auto_now_add=True)

class ForteACHReturnCode(models.Model):
  code              = models.CharField(max_length=3)
  description       = models.CharField(max_length=255)
  details           = models.CharField(max_length=255)
  date_added 		    = models.DateTimeField(verbose_name="date added", auto_now_add=True)

class ForteACHSettlementCode(models.Model):
  code              = models.CharField(max_length=3)
  description       = models.CharField(max_length=255)
  comments          = models.CharField(max_length=255)
  date_added 		    = models.DateTimeField(verbose_name="date added", auto_now_add=True)

class ForteACHTransaction(models.Model):
  partner           = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  datacom           = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  company           = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  status_code       = models.ForeignKey(ForteACHStatusCode, on_delete=models.CASCADE, blank=True, null=True)
  response_code     = models.ForeignKey(ForteACHResponseCode, on_delete=models.CASCADE, blank=True, null=True)
  return_code       = models.ForeignKey(ForteACHReturnCode, on_delete=models.CASCADE, blank=True, null=True)
  settlement_code   = models.ForeignKey(ForteACHSettlementCode, on_delete=models.CASCADE, blank=True, null=True)
  date_added 		    = models.DateTimeField(verbose_name="date added", auto_now_add=True)


class CCTransactionManager(models.Manager):
	def get_or_none(self, **kwargs):
		try:
			return self.get(**kwargs)
		except ObjectDoesNotExist:
			return None

	def create_transaction(self, **kwargs):
		print("Start Elavon Transaction kwargs", kwargs)

		datacom = kwargs.get('datacom', None)
		print('datacom', datacom)
		partner = kwargs.get('partner', None)
		company = kwargs.get('company', None)

		key = None
		if datacom:
			key = CardProcessingAPIKey.objects.get_or_none(datacom=kwargs['datacom'])
			del kwargs['datacom']
		elif partner:
			key = CardProcessingAPIKey.objects.get_or_none(processor_name="Elavon", partner_id=kwargs['partner'])
			del kwargs['partner']
		elif company:
			key = CardProcessingAPIKey.objects.get_or_none(processor_name="Elavon", company_id=kwargs['company'])
			del kwargs['company']

		converge = Converge(
			ssl_merchant_id = key.merchant_id,
			ssl_user_id = key.ssl_user_id,
			ssl_pin = key.pin,
			is_demo = key.is_demo
		)

		try: 
			#Find CC Number
			requestData = kwargs
			# ccModel = CreditCard.objects.get(card_number=check_password(requestData['ssl_card_number']))
			# print("ccModel", ccModel)

			#Make Elavon Request
			convergeSale = converge.request(**requestData)
			print('convergeSale response', convergeSale)
			requestData['txn_id'] = convergeSale['ssl_txn_id']

			transactionID = convergeSale.get("ssl_txn_id", None)
			errorCode = convergeSale.get("errorCode", None)
			errorMsg = convergeSale.get("errorMessage", None)
			errorName = convergeSale.get("errorName", None)

			transaction = self.model(datacom=datacom, 
																partner=partner, 
																company=company, 
																success=convergeSale['success'], 
																result=convergeSale['ssl_result']
																)
			transaction.save(using=self._db)
			print("transaction1", transaction)

			# Log Elavon Response Data
			setattr(transaction, 'txn_id', transactionID)
			setattr(transaction, 'approval_code', convergeSale['ssl_approval_code'])
			setattr(transaction, 'errorCode', errorCode)
			setattr(transaction, 'errorMessage', errorMsg)
			setattr(transaction, 'errorName', errorName)
			setattr(transaction, 'jsonRequest', requestData)
			setattr(transaction, 'jsonResult', convergeSale)

			print("transaction2", transaction)

			transaction.save(using=self._db)

			return transaction

		except:
			#I need to handle errors better
			raise TransactionManagementError("There was an error making the transaction to the database")
			print('Error')


class Transaction(models.Model):
	datacom           = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
	partner           = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
	company           = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
	credit_card 			= models.ForeignKey(CreditCard, on_delete=models.CASCADE, blank=True, null=True)
	date_added 		    = models.DateTimeField(verbose_name="date added", auto_now_add=True)
	txn_id 						= models.CharField(max_length=255, blank=True, null=True)
	result 						= models.CharField(max_length=2, blank=True, null=True)
	approval_code			= models.CharField(max_length=255, blank=True, null=True)
	errorCode    			= models.IntegerField(null=True, blank=True)
	errorMessage			= models.CharField(max_length=255, blank=True, null=True)
	errorName					= models.CharField(max_length=255, blank=True, null=True)
	jsonRequest 			= JSONField(encoder=None, null=True, blank=True)
	jsonResult 				= JSONField(encoder=None, null=True, blank=True)
	success 					= models.BooleanField()

	objects	= CCTransactionManager()

class CardManagerManager(models.Manager):
	def add_card_to_manager(self, *args, **kwargs):
		result = self.model(**kwargs)

		result.save(using=self._db)
		
		return result

class CardManager(models.Model):
	datacom           = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
	partner           = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
	company           = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
	credit_card 			= models.ForeignKey(CreditCard, on_delete=models.CASCADE, blank=True, null=True)
	date_added 		    = models.DateTimeField(verbose_name="date added", auto_now_add=True)
	result 						= models.CharField(max_length=2, blank=True, null=True)
	result_message 		= models.CharField(max_length=255, blank=True, null=True)
	approval_code 		= models.CharField(max_length=255, blank=True, null=True)
	token 						= models.CharField(max_length=255, blank=True, null=True)
	token_response 		= models.CharField(max_length=255, blank=True, null=True)
	add_token_response= models.CharField(max_length=255, blank=True, null=True)
	errorCode    			= models.IntegerField(null=True, blank=True)
	errorMessage			= models.CharField(max_length=255, blank=True, null=True)
	errorName					= models.CharField(max_length=255, blank=True, null=True)
	jsonRequest 			= JSONField(encoder=None, null=True, blank=True)
	jsonResult 				= JSONField(encoder=None, null=True, blank=True)


	objects	= CardManagerManager()
