from datetime import datetime


class Validation:
	"""Validation Methods for Elavon Calls """

	def convertExpDate(self, **kwargs):
		newExpDate = kwargs.get('ssl_exp_date', None)
		if newExpDate:
			parsedMonth = int(newExpDate[0:2])
			parsedYear = newExpDate[-2::]
			parsedYear = int("20" + parsedYear)
			print('parsedYear', parsedYear)
			datetimeObj = datetime(parsedYear, parsedMonth, 1)

			return datetimeObj
	
	def merchant_info(self, **kwargs):
		print('Validation for elavon_validation data', kwargs)
		acct_details = [
			'ssl_merchant_id',
			'ssl_user_id',
			'ssl_pin',
			'ssl_transaction_type',
		]
		for key in acct_details:
			if not key in kwargs:
				return False

		return True

	def terminalsetup(self, **kwargs):
		print('Teminal Setup Validate', kwargs)

		return True

#*********************************  Authorizations ***********************************
	def ccdelete(self, **kwargs):
		return_details = [
			'ssl_merchant_id',
			'ssl_user_id',
			'ssl_pin',
			'ssl_txn_id',
		]
		for key in return_details:
			if not key in kwargs:
				return False

		return True

	def ccauthonly(self, **kwargs):
		cc_keyed_data = [
			'ssl_card_number',
			'ssl_exp_date',
			'ssl_avs_address',
			'ssl_avs_zip',
			'ssl_verify',
			'ssl_track_data'
		]
		cc_swiped_data = [
			'ssl_track_data',
			'ssl_enc_track_data',
			'ssl_encrypted_track1_data',
			'ssl_encrypted_track2_data'
		]
		current_date = datetime.now()
		cc_exp_date = Validation.convertExpDate(self, **kwargs)
		kwargs['ssl_card_present'] = True

		# Keyed Transaction
		if kwargs['ssl_card_number']:
			if not kwargs['ssl_exp_date']:
				return False
			else:
				if cc_exp_date < current_date:
					return False

		# Swiped Transaction or Keyed required
		if not kwargs['ssl_card_number'] or kwargs['ssl_track_data']:
			return False

		# Tokenization
		if kwargs['ssl_get_token'] and not ((kwargs['ssl_card_number'] and kwargs['ssl_exp_date']) or kwargs['ssl_track_data'] or kwargs['ssl_enc_track_data'] or (kwargs['ssl_encrypted_track1_data'] and kwargs['ssl_encrypted_track2_data'])):
			return False

		# Card On File
		if kwargs['ssl_merchant_initiated_unscheduled'] and not kwargs['ssl_token']:
			return False

		return True

	def cccomplete(self, **kwargs):
		auth_details = [
			'ssl_merchant_id',
			'ssl_user_id',
			'ssl_pin',
			'ssl_txn_id',
		]
		partial_completion = [
			'ssl_amount',
			'ssl_partial_shipment_flag'
		]
		for key in auth_details:
			if not key in kwargs:
				return False

		if kwargs['ssl_amount'] == "Partial" and not kwargs['ssl_partial_shipment_flag']:
			return False
		if kwargs['ssl_amount'] == "Multi-partial" and not kwargs['ssl_partial_shipment_flag']:
			return False

		return True

	#*********************************  Credit Card Transactions ***********************************
	#CC_sale is working
	def ccsale(self, **kwargs):
		required_fields = [
			"ssl_amount"
		]
		raw_swiped_contactless = [
			'ssl_track_data'
		]
		encrypted_swiped_contactless = [
			'ssl_enc_track_data', #Ingenico
			'ssl_encrypted_track1_data', #Magtek
			'ssl_encrypted_track2_data' #Magtek
		]
		mobile_phone = [
			'ssl_vm_mobile_source',
			'ssl_vendor_id',
			'ssl_mobile_id',

		]
		for key in required_fields:
			if not key in kwargs:
				return False

		current_date = datetime.now()
		cc_exp_date = Validation.convertExpDate(self, **kwargs)
		kwargs['ssl_card_present'] = True

		#Required Keyed or Swiped
		
		if not (kwargs.get('ssl_track_data', None) or kwargs.get('ssl_card_number', None)):
			print("ssl_track_data  OR ssl_card_number")
			return False

		# Keyed Transaction
		if not kwargs.get('ssl_track_data', None):
			if kwargs.get('ssl_card_number', None) and not kwargs.get('ssl_exp_date', None):
				print("ssl_track_data  NOT ssl_exp_date")
				return False
			else:
				if cc_exp_date < current_date:
					print("cc_exp_date < current_date")
					return False

		# Swiped Transaction
		if kwargs.get('ssl_track_data', None):
			if not kwargs.get('ssl_ksn', None) and (kwargs.get('ssl_enc_track_data', None) or kwargs.get('ssl_encrypted_track1_data', None) or kwargs.get('ssl_encrypted_track2_data', None)):
				print("ssl_track_data  NOT ssl_ksn")
				return False

		# Mobile Phone Swiped
		if kwargs.get('ssl_track_data', None):
			if not (kwargs.get('ssl_vm_mobile_source', None) and kwargs.get('ssl_vendor_id', None)):
				print("NO ssl_vm_mobile_source  AND ssl_vendor_id")
				return False

		# Tokenization
		if kwargs.get('ssl_get_token', None) and not ((kwargs.get('ssl_card_number', None) and kwargs.get('ssl_exp_date', None) or kwargs.get('ssl_track_data', None) or kwargs.get('ssl_enc_track_data', None) or (kwargs.get('ssl_encrypted_track1_data', None) and kwargs.get('ssl_encrypted_track2_data', None)))):
			print("ssl_get_token  NOT card_number")
			return False

		# Recurring Payment
		if (kwargs.get('ssl_recurring_flag', None) == 2) and not (kwargs.get('ssl_payment_number', None) or kwargs.get('ssl_payment_count', None)):
			print("ssl_recurring_flag ==2 NOT ssl_payment info")
			return False

		# Card On File
		if kwargs.get('ssl_merchant_initiated_unscheduled', None) and not kwargs.get('ssl_token', None):
			print("ssl_merchant_initiated_unscheduled NOT ssl_token")
			return False
		
		print("returning True from elavon_validation")
		return True

	def ccreturn(self, **kwargs):
		return_details = [
			'ssl_txn_id',
		]
		for key in return_details:
			if not key in kwargs:
				return False

		return True
	
	def ccvoid(self, **kwargs):
		return_details = [
			'ssl_txn_id',
		]
		for key in return_details:
			if not key in kwargs:
				return False
				
		return True

	def ccverify(self, **kwargs):
		transaction_data = [
			'ssl_amount'
		]
		cc_keyed_data = [
			'ssl_card_number',
			'ssl_exp_date',
			'ssl_avs_address',
			'ssl_avs_zip',
			'ssl_verify',
			'ssl_track_data'
		]
		cc_swiped_data = [
			'ssl_track_data',
			'ssl_enc_track_data',
			'ssl_encrypted_track1_data',
			'ssl_encrypted_track2_data'
		]
		current_date = datetime.now()
		cc_exp_date = Validation.convertExpDate(self, **kwargs)
		kwargs['ssl_card_present'] = True

		# Keyed Transaction
		if kwargs['ssl_card_number'] and not kwargs['ssl_exp_date']:
			return False
		else:
			if cc_exp_date < current_date:
				return False

		# Swiped Transaction
		for track in cc_swiped_data:
			if not (track and kwargs['ssl_card_number']) in cc_keyed_data:
				return False

		# Tokenization
		if kwargs['ssl_get_token'] and not ((kwargs['ssl_card_number'] and kwargs['ssl_exp_date']) or kwargs['ssl_track_data'] or kwargs['ssl_enc_track_data'] or (kwargs['ssl_encrypted_track1_data'] and kwargs['ssl_encrypted_track2_data'])):
			return False

		# Recurring Payment
		if (kwargs.get('ssl_recurring_flag', None) == 2) and not (kwargs['ssl_payment_number'] or kwargs['ssl_payment_count']):
			return False

		# Card On File
		if kwargs['ssl_merchant_initiated_unscheduled'] and not kwargs['ssl_token']:
			return False

		return True

	#********************************* Installment Transactions ***********************************

	def ccaddinstall(self, **kwargs):
		transaction_details = [
			'ssl_card_number',
			'ssl_exp_date',
			'ssl_token',
			'ssl_txn_id',
		]
		payment_schedule = [
			'ssl_amount',
			'ssl_total_installments',
			'ssl_next_payment_date',
			'ssl_billing_cycle'
		]
		# Required Fields
		for key in payment_schedule:
			if not key in kwargs:
				return False

		# is swiped or keyed?
		if not kwargs['ssl_card_number'] or kwargs['ssl_token']:
			return False

		# Entered CC Number must have exp date
		if kwargs['ssl_card_number'] and not kwargs['ssl_exp_date']:
			return False

		if kwargs['ssl_billing_cycle'] == "SEMIMONTHLY" and not kwargs['ssl_bill_on_half']:
			return False

		return True

	def ccupdateinstall(self, **kwargs):
		required_fields = [
			'ssl_installment_id',
			'ssl_amount',
		]
		payment_schedule = [
			
			'ssl_total_installments',
			'ssl_next_payment_date',
			'ssl_billing_cycle'
		]
		# Required Fields
		for key in required_fields:
			if not key in kwargs:
				return False

		# Is card Number entered
		if kwargs['ssl_card_number']:
			if not not kwargs['ssl_exp_date']:
				return False

		return True

	def ccdeleteinstall(self, **kwargs):
		required_fields = [
			'ssl_installment_id',
		]

		# Required Fields
		for key in required_fields:
			if not key in kwargs:
				return False

		return True

	def ccinstallsale(self, **kwargs):
		required_fields = [
			'ssl_installment_id',
		]

		# Required Fields
		for key in required_fields:
			if not key in kwargs:
				return False

		if kwargs['ssl_add_token'] == 'Y':
			if not kwargs['ssl_first_name'] and kwargs['ssl_last_name']:
				return False

		return True

	#********************************* Recurring Transactions ***********************************

	def ccaddrecurring(self, **kwargs):
		required_fields = [
			'ssl_txn_id',
			'ssl_amount',
			'ssl_next_payment_date',
			'ssl_billing_cycle',
			'ssl_exp_date'
		]

		# Required Fields
		for key in required_fields:
			if not key in kwargs:
				return False

		# Token or Card Number
		if not kwargs['ssl_token'] or kwargs['ssl_card_number']:
			if not kwargs['ssl_first_name'] and kwargs['ssl_last_name']:
				return False

		# Entered CC Number must have exp date
		if kwargs['ssl_card_number'] and not kwargs['ssl_exp_date']:
			return False
		# Must set SEMIMONTHLY dates
		if kwargs['ssl_billing_cycle'] == "SEMIMONTHLY" and not kwargs['ssl_bill_on_half']:
			return False

		return True

	def ccdeleterecurring(self, **kwargs):
		required_fields = [
			'ssl_recurring_id'
		]

		# Required Fields
		for key in required_fields:
			if not key in kwargs:
				return False

		return True

	def ccupdaterecurring(self, **kwargs):
		required_fields = [
			'ssl_recurring_id'
		]

		# Required Fields
		for key in required_fields:
			if not key in kwargs:
				return False

		# Entered CC Number must have exp date
		if kwargs['ssl_card_number'] and not kwargs['ssl_exp_date']:
			return False
		# Must set SEMIMONTHLY dates
		if kwargs['ssl_billing_cycle'] == "SEMIMONTHLY" and not kwargs['ssl_bill_on_half']:
			return False
				
		return True

	def ccrecurringsale(self, **kwargs):
		required_fields = [
			'ssl_recurring_id'
		]

		# Required Fields
		for key in required_fields:
			if not key in kwargs:
				return False

		# If adding token name is required
		if kwargs['ssl_add_token'] == 'Y':
			if not kwargs['ssl_first_name'] and kwargs['ssl_last_name']:
				return False

		return True

	def ccupdatetip(self, **kwargs):
		required_fields = [
			'ssl_txn_id',
			'ssl_tip_amount'
		]

		# Required Fields
		for key in required_fields:
			if not key in kwargs:
				return False
				
		return True

	#*********************************  Card Manager ***********************************

	def ccgettoken(self, **kwargs):
		print('kwargs', kwargs)

		required_fields = [
			'ssl_avs_address',
			'ssl_avs_zip'
		]

		current_date = datetime.now()
		cc_exp_date = Validation.convertExpDate(self, **kwargs)
		kwargs['ssl_card_present'] = True

		# Required Fields
		for key in required_fields:
			print("key", key)
			if not key in kwargs:
				print("key not in kwargs")
				return False

		# If adding token name is required
		if kwargs.get('ssl_add_token', None) == 'Y':
			if not kwargs.get('ssl_first_name', None) and kwargs.get('ssl_last_name', None):
				print("ssl_add_token = Y. Nothing else")
				return False

		# Entered CC Number must have exp date
		if kwargs.get('ssl_card_number', None) and not kwargs.get('ssl_exp_date', None):
			print("Has card_number but not exp date")
			return False

			#Required Keyed or Swiped
		if not (kwargs.get('ssl_track_data', None) or kwargs.get('ssl_card_number', None)):
			print("no track_data or Card_number")
			return False

		# Keyed Transaction
		if not kwargs.get('ssl_track_data'):
			if kwargs.get('ssl_card_number', None) and not kwargs.get('ssl_exp_date', None):
				print("Has trackData but no card Number or exp date")
				return False
			else:
				if cc_exp_date < current_date:
					return False

		# Swiped Transaction
		if kwargs.get('ssl_track_data', None):
			if not kwargs.get('ssl_ksn', None) and (kwargs.get('ssl_enc_track_data', None) or kwargs.get('ssl_encrypted_track1_data', None) or kwargs.get('ssl_encrypted_track2_data', None)):
				print("Has track_data but not hte rest of it")
				return False

		# Mobile Phone
		if not (kwargs.get('ssl_vm_mobile_source', None) and kwargs.get('ssl_vendor_id', None)):
			print("No mobile source and Vendor ID")
			return False

		# If ssl_verify = Y then validate avs
		if kwargs.get('ssl_verify', None) and not (kwargs.get('ssl_avs_address', None) or kwargs.get('ssl_avs_zip', None)):
			print("Has SSL_verify but not address or zip")
			return False
				
		return True

	def ccupdatetoken(self, **kwargs):
		required_fields = [
			'ssl_first_name',
			'ssl_last_name',
			'ssl_token',
		]

		# Required Fields
		for key in required_fields:
			if not key in kwargs:
				return False


		# Entered CC Number must have exp date
		if kwargs['ssl_card_number'] and not kwargs['ssl_exp_date']:
			return False
				
		return True

	def ccdeletetoken(self, **kwargs):
		required_fields = [
			'ssl_token',
		]

		# Required Fields
		for key in required_fields:
			if not key in kwargs:
				return False
				
		return True

	def ccquerytoken(self, **kwargs):
		required_fields = [
			'ssl_token',
		]

		# Required Fields
		for key in required_fields:
			if not key in kwargs:
				return False

		return True

	#*********************************  EMV Card Transactions ***********************************

	def emvchipsale(self, **kwargs):
		required_fields = [
			'ssl_tlv_enc',
			'ssl_pos_mode',
			'ssl_entry_mode'
		]

		# Required Fields
		for key in required_fields:
			if not key in kwargs:
				return False

		return True

	def emvchipreturn(self, **kwargs):
		required_fields = [
			'ssl_txn_id',
			'ssl_tlv_enc',
		]

		# Required Fields
		for key in required_fields:
			if not key in kwargs:
				return False

		return True

	def emvchipauthonly(self, **kwargs):
		required_fields = [
			'ssl_tlv_enc',
			'ssl_pos_mode',
			'ssl_entry_mode'
		]

		# Required Fields
		for key in required_fields:
			if not key in kwargs:
				return False

		return True

	def emvswipesale(self, **kwargs):
		required_fields = [
			'ssl_amount',
			'ssl_pos_mode',
			'ssl_entry_mode',
			'ssl_ksn'
		]

		# Required Fields
		for key in required_fields:
			if not key in kwargs:
				return False

		# Required for Swiped
		if not kwargs['ssl_enc_track_data'] or kwargs['ssl_encrypted_track1_data'] or kwargs['ssl_encrypted_track2_data']:
			return False

		# Debit Card account type
		if kwargs['ssl_card_type'] == "Debit" and not kwargs['ssl_account_type']:
			return False

		# Mobile Phone
		if not (kwargs['ssl_vm_mobile_source'] and kwargs['ssl_vendor_id']):
			return False

		return True

	def emvswipeauthonly(self, **kwargs):
		required_fields = [
			'ssl_amount'
		]

		# Required Fields
		for key in required_fields:
			if not key in kwargs:
				return False

		# Required for Swiped
		if not kwargs['ssl_enc_track_data'] or kwargs['ssl_encrypted_track1_data'] or kwargs['ssl_encrypted_track2_data']:
			return False

		# Debit Card account type
		if kwargs['ssl_card_type'] == "Debit" and not kwargs['ssl_account_type']:
			return False

		# Mobile Phone
		if not (kwargs['ssl_vm_mobile_source'] and kwargs['ssl_vendor_id']):
			return False

		return True

		#*********************************  End Of Day Transactions ***********************************
	def txnemail(self, **kwargs):
		required_fields = [
		'ssl_txn_id'
		]

		# Required Fields
		for key in required_fields:
			if not key in kwargs:
				return False

		return True

	def txnquery(self, **kwargs):
		required_fields = [
		'ssl_txn_id'
		]

		# Required Fields
		for key in required_fields:
			if not key in kwargs:
				return False

		return True

	def summary(self, **kwargs):

		return True

	def settle(self, **kwargs):

		return True