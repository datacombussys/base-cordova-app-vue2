import requests
from rest_framework import exceptions
from .elavon_validation import Validation


VALID_TRANSACTION_TYPES = [
	#Authorization Transactions
	'ccauthonly',
	'cccomplete',
	#One-time Transactions
	'ccsale',
	'ccverify',
	'ccreturn',
	'ccvoid',
	'ccdelete',
	#Installment Transactions
	'ccaddinstall',
	'ccupdateinstall',
	'ccdeleteinstall',
	'ccinstallsale',
	#Recurring Transactions
	'ccaddrecurring',
	'ccdeleterecurring',
	'ccupdaterecurring',
	'ccrecurringsale',
	#Tips Transactions
	'ccupdatetip',
	#Card Manager Transactions
	'ccgettoken',
	'ccupdatetoken',
	'ccdeletetoken',
	'ccquerytoken',
	#EMV Transactions
	'emvchipsale',
	'emvchipreturn',
	'emvchipauthonly',
	'emvswipesale',
	'emvswipeauthonly',
	'emvchipupdatetxn',
	'emvreverse',
	'emvkeyexchange',
	#Debit Card Transactions
	'dbpurchase',
	'dbreverse',
	'dbvoid',
	'dbbainquiry',
	'pldpurchasey',
	'pldbillpay',
	'binlookup',
	'dboctdisbursement'
	#End of Day Transactions
	'txnquery',
	'total',
	'settle',
	'bitxnquery'
]


class ConvergenceException(Exception):
	#Need to complete with Billy
	pass

class Converge(object):
	def __init__(self, ssl_merchant_id, ssl_user_id, ssl_pin, is_demo=False):
		self._merchant_id = ssl_merchant_id
		self._user_id = ssl_user_id
		self._pin = ssl_pin
		self._is_demo = is_demo
		# self._ssl_vendor_id = ssl_vendor_id
		# self._ssl_partner_app_id = ssl_partner_app_id

	@property
	def xml_endpoint(self):
		if self._is_demo:
			return "https://api.demo.convergepay.com/VirtualMerchantDemo/process.do"
		return "https://api.convergepay.com/VirtualMerchant/process.do"

	def request(self, ssl_transaction_type, **kwargs):
		"""
		Make request to Converge with transaction type and parameters.
		:param ssl_transaction_type: a valid transaction type that's in VALID_TRANSACTION_TYPES
		:param kwargs:
		:return:
		"""
		if ssl_transaction_type not in VALID_TRANSACTION_TYPES:
			raise ConvergenceException('{} is not a valid transaction type'.format(ssl_transaction_type))

		kwargs['ssl_transaction_type'] = ssl_transaction_type
		return self._http_request(**kwargs)

	def _http_request(self, **kwargs):
		kwargs['ssl_merchant_id'] = self._merchant_id
		kwargs['ssl_user_id'] = self._user_id
		kwargs['ssl_pin'] = self._pin
		kwargs['ssl_show_form'] = 'false'
		kwargs['ssl_result_format'] = 'ascii'

		print("_http_request kwargs", kwargs)

		response = requests.post(self.xml_endpoint, kwargs)
		if kwargs.get('__debug'):
			print(response.request.body)

		response.raise_for_status()
		result = {}
		decoded = response.content.decode('utf-8')

		# Need to fix this issue
		# dict(elem.split('=', 1) for elem in x)

		print('decoded', decoded)
		for line in decoded.split('\n'):
			k, v = line.split('=')
			result[k] = v

		result['success'] = 'errorCode' not in result
		print('result', result)
		return result
