from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.hashers import make_password

from datacom.models import Datacom
from partners.models import Partner
from companies.models import Company
from project.settings import base
from users.models import User

class CardProcessingAccount(models.Model):
  partner           = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  datacom           = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  company           = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  user              = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
  date_added 		    = models.DateTimeField(verbose_name="date added", auto_now_add=True)
  processor_name    = models.CharField(max_length=20, blank=True, null=True)
  transaction_id    = models.CharField(max_length=100, blank=True, null=True)
  merchant_id       = models.CharField(max_length=15, null=True, blank=True, validators=[RegexValidator(r'^\d{1,15}$')])
  pin               = models.CharField(max_length=64, blank=True, null=True)
  password          = models.CharField(max_length=100, blank=True, null=True)


class CreditCardManager(models.Manager):
  def create_credit_card(self, **kwargs):
    if not kwargs['name_on_card']:
      raise ValueError("You must enter a name of the person on the credit card")
    print('Create Credit Card kwargs', kwargs)
  
    #Send to Elavon and get Token and store the token

    creditcard = self.model(**kwargs)
  
    creditcard.last4 = kwargs['card_number_token'][-4::]
    creditcard.card_exp_date = kwargs['card_exp_year'] + "-" + kwargs['card_exp_month'] + "-" + "01"
    print('kwargs[card_exp_date]', kwargs['card_exp_date'])

    creditcard.save(using=self._db)


    return creditcard

class CreditCard(models.Model):
  partner           = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  datacom           = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  company           = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  user              = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
  date_added 		    = models.DateTimeField(verbose_name="date added", auto_now_add=True)
  title             = models.CharField(max_length=200, blank=True, null=True)
  name_on_card      = models.CharField(max_length=255)
  card_number       = models.CharField(max_length=18, validators=[RegexValidator(r'^\d{1,18}$')])
  card_number_token = models.CharField(max_length=255, blank=True, null=True)
  card_cvv          = models.CharField(max_length=3, blank=True, null=True)
  billing_address   = models.CharField(max_length=255, blank=True)
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


class ElavonCCRequest(models.Model):
  partner           = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
  datacom           = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
  company           = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
  user              = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
  date_added 		    = models.DateTimeField(verbose_name="date added", auto_now_add=True)
  # Request
  ssl_merchant_id = models.CharField(max_length=15, null=True, blank=True, validators=[RegexValidator(r'^\d{1,15}$')])
  ssl_user_id = models.CharField(max_length=15, null=True, blank=True)
  ssl_pin = models.CharField(max_length=64,null=True, blank=True)
  ssl_transaction_type= models.CharField(max_length=20,null=True, blank=True)
  ssl_amount= models.CharField(max_length=11, null=True, blank=True, validators=[RegexValidator(r'^\d{1,11}$')])
  # [Card Data]
  ssl_card_number= models.CharField(max_length=18, null=True, blank=True, validators=[RegexValidator(r'^\d{1,18}$')])
  ssl_exp_date= models.CharField(max_length=4, null=True, blank=True, validators=[RegexValidator(r'^\d{1,4}$')])
  ssl_card_present= models.CharField(max_length=1,null=True, blank=True)
  ssl_track_data= models.CharField(max_length=76,null=True, blank=True)
  ssl_enc_track_data= models.CharField(max_length=160,null=True, blank=True)
  ssl_enc_track_data_format= models.CharField(max_length=255,null=True, blank=True)
  ssl_encrypted_track1_data= models.CharField(max_length=160,null=True, blank=True)
  ssl_encrypted_track2_data= models.CharField(max_length=160,null=True, blank=True)
  ssl_ksn= models.CharField(max_length=20,null=True, blank=True)
  ssl_vm_mobile_source= models.CharField(max_length=255,null=True, blank=True)
  ssl_vendor_id= models.CharField(max_length=50,null=True, blank=True)
  ssl_mobile_id= models.CharField(max_length=20,null=True, blank=True)
  ssl_token= models.CharField(max_length=2,null=True, blank=True)
  ssl_pos_mode= models.CharField(max_length=2, null=True, blank=True, validators=[RegexValidator(r'^\d{1,2}$')])
  ssl_entry_mode= models.CharField(max_length=2, null=True, blank=True, validators=[RegexValidator(r'^\d{1,2}$')])
  # [Doing Business As]
  ssl_dynamic_dba= models.CharField(max_length=21,null=True, blank=True)
  # [Tokenization]
  ssl_get_token= models.CharField(max_length=1,null=True, blank=True)
  ssl_add_token= models.CharField(max_length=1,null=True, blank=True)
  # [Tip Processing]
  ssl_tip_amount= models.CharField(max_length=11, null=True, blank=True, validators=[RegexValidator(r'^\d{1,11}$')])
  ssl_server= models.CharField(max_length=8,null=True, blank=True)
  ssl_shift= models.CharField(max_length=4,null=True, blank=True)
  # [Card Verification]
  ssl_cvv2cvc2= models.CharField(max_length=4, null=True, blank=True, validators=[RegexValidator(r'^\d{1,4}$')])
  ssl_cvv2cvc2_indicator= models.CharField(max_length=1, null=True, blank=True, validators=[RegexValidator(r'^\d{1,1}$')])
  # [Purchasing Cards]
  ssl_customer_code= models.CharField(max_length=17,null=True, blank=True)
  ssl_salestax= models.CharField(max_length=8,null=True, blank=True)
  ssl_salestax_indicator= models.CharField(max_length=2,null=True, blank=True)
  # [Invoice Number]
  ssl_invoice_number= models.CharField(max_length=25,null=True, blank=True)
  # [Multi-Currency Conversion]
  ssl_transaction_currency= models.CharField(max_length=3,null=True, blank=True)
  # [Recurring / Installment Payment]
  ssl_recurring_flag= models.CharField(max_length=1, null=True, blank=True, validators=[RegexValidator(r'^\d{1,1}$')])
  ssl_payment_number= models.CharField(max_length=15, null=True, blank=True, validators=[RegexValidator(r'^\d{1,15}$')])
  ssl_payment_count= models.CharField(max_length=10, null=True, blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
  # [Travel Data]
  ssl_departure_Date= models.CharField(max_length=10,null=True, blank=True)
  ssl_completion_Date= models.CharField(max_length=10,null=True, blank=True)
  # [Card On File]
  ssl_merchant_initiated_unscheduled= models.CharField(max_length=1,null=True, blank=True)
  ssl_oar_data= models.CharField(max_length=60,null=True, blank=True)
  ssl_ps2000_data= models.CharField(max_length=22,null=True, blank=True)
  # [Level 3]
  ssl_level3_indicator= models.CharField(max_length=1,null=True, blank=True)
  ssl_ship_to_zip= models.CharField(max_length=9,null=True, blank=True)
  ssl_ship_to_country= models.CharField(max_length=3,null=True, blank=True)
  ssl_shipping_amount= models.CharField(max_length=11, null=True, blank=True, validators=[RegexValidator(r'^\d{1,11}$')])
  ssl_ship_from_postal_code= models.CharField(max_length=9,null=True, blank=True)
  ssl_discount_amount= models.CharField(max_length=11, null=True, blank=True, validators=[RegexValidator(r'^\d{1,11}$')])
  ssl_duty_amount= models.CharField(max_length=11, null=True, blank=True, validators=[RegexValidator(r'^\d{1,11}$')])
  ssl_national_tax_indicator= models.CharField(max_length=1,null=True, blank=True)
  ssl_national_tax_amount= models.CharField(max_length=11, null=True, blank=True, validators=[RegexValidator(r'^\d{1,11}$')])
  ssl_order_date= models.CharField(max_length=6, null=True, blank=True, validators=[RegexValidator(r'^\d{1,6}$')])
  ssl_other_tax= models.CharField(max_length=12, null=True, blank=True, validators=[RegexValidator(r'^\d{1,12}$')])
  ssl_summary_commodity_code= models.CharField(max_length=4,null=True, blank=True)
  ssl_merchant_vat_number= models.CharField(max_length=20,null=True, blank=True)
  ssl_customer_vat_number= models.CharField(max_length=13,null=True, blank=True)
  ssl_freight_tax_amount= models.CharField(max_length=12, null=True, blank=True, validators=[RegexValidator(r'^\d{1,12}$')])
  ssl_vat_invoice_number= models.CharField(max_length=15,null=True, blank=True)
  ssl_tracking_number= models.CharField(max_length=25,null=True, blank=True)
  ssl_shipping_company= models.CharField(max_length=50,null=True, blank=True)
  ssl_other_fees= models.CharField(max_length=12, null=True, blank=True, validators=[RegexValidator(r'^\d{1,12}$')])
  ssl_line_item_description= models.CharField(max_length=35,null=True, blank=True)
  ssl_line_Item_product_code= models.CharField(max_length=13,null=True, blank=True)
  ssl_line_Item_commodity_code= models.CharField(max_length=12,null=True, blank=True)
  ssl_line_Item_quantity= models.CharField(max_length=12, null=True, blank=True, validators=[RegexValidator(r'^\d{1,12}$')])
  ssl_line_Item_unit_of_measure= models.CharField(max_length=3,null=True, blank=True)
  ssl_line_Item_unit_cost= models.CharField(max_length=12, null=True, blank=True, validators=[RegexValidator(r'^\d{1,12}$')])
  ssl_line_Item_discount_indicator= models.CharField(max_length=1,null=True, blank=True)
  ssl_line_Item_tax_indicator= models.CharField(max_length=1,null=True, blank=True)
  ssl_line_item_discount_amount= models.CharField(max_length=11, null=True, blank=True, validators=[RegexValidator(r'^\d{1,11}$')])
  ssl_line_Item_tax_rate= models.CharField(max_length=4, null=True, blank=True, validators=[RegexValidator(r'^\d{1,4}$')])
  ssl_line_Item_tax_amount= models.CharField(max_length=12, null=True, blank=True, validators=[RegexValidator(r'^\d{1,12}$')])
  ssl_line_Item_tax_type= models.CharField(max_length=4,null=True, blank=True)
  ssl_line_Item_extended_total= models.CharField(max_length=9, null=True, blank=True, validators=[RegexValidator(r'^\d{1,9}$')])
  ssl_line_Item_total= models.CharField(max_length=12, null=True, blank=True, validators=[RegexValidator(r'^\d{1,12}$')])
  ssl_line_Item_alternative_tax= models.CharField(max_length=12, null=True, blank=True, validators=[RegexValidator(r'^\d{1,12}$')])
  # [3D Secure]
  ssl_eci_ind= models.CharField(max_length=1, null=True, blank=True, validators=[RegexValidator(r'^\d{1,1}$')])
  ssl_3dsecure_value= models.CharField(max_length=80,null=True, blank=True)
  ssl_xid= models.CharField(max_length=20,null=True, blank=True)
  # [MasterPass]
  ssl_eWallet= models.CharField(max_length=10,null=True, blank=True)
  ssl_callback_url= models.CharField(max_length=200,null=True, blank=True)
  ssl_eWallet_shipping= models.CharField(max_length=1,null=True, blank=True)
  ssl_product_string= models.CharField(max_length=200,null=True, blank=True)
  # [Apple Pay on the Web]
  ssl_transaction_source= models.CharField(max_length=20,null=True, blank=True)
  ssl_applepay_web= models.TextField(null=True, blank=True)
  ssl_applepay_billing= models.TextField(null=True, blank=True)
  ssl_applepay_shipping= models.TextField(null=True, blank=True)
  # [Visa Checkout]
  ssl_visapayload= models.TextField(null=True, blank=True)
  # [Optional Fields]
  ssl_avs_address= models.CharField(max_length=30,null=True, blank=True)
  ssl_avs_zip= models.CharField(max_length=9,null=True, blank=True)
  ssl_description= models.CharField(max_length=255,null=True, blank=True)
  ssl_partial_auth_indicator= models.CharField(max_length=1, null=True, blank=True, validators=[RegexValidator(r'^\d{1,1}$')])
  # [Healthcare]
  ssl_healthcare_amount= models.CharField(max_length=11, null=True, blank=True, validators=[RegexValidator(r'^\d{1,11}$')])
  ssl_otc_amount= models.CharField(max_length=11, null=True, blank=True, validators=[RegexValidator(r'^\d{1,11}$')])
  ssl_prescription_amount= models.CharField(max_length=11, null=True, blank=True, validators=[RegexValidator(r'^\d{1,11}$')])
  ssl_clinic_other_amount= models.CharField(max_length=11, null=True, blank=True, validators=[RegexValidator(r'^\d{1,11}$')])
  ssl_dental_amount= models.CharField(max_length=11, null=True, blank=True, validators=[RegexValidator(r'^\d{1,11}$')])
  ssl_vision_amount= models.CharField(max_length=11, null=True, blank=True, validators=[RegexValidator(r'^\d{1,11}$')])
  ssl_transit_amount= models.CharField(max_length=11, null=True, blank=True, validators=[RegexValidator(r'^\d{1,11}$')])


class ElavonCCResponse(models.Model):
  transaction = models.OneToOneField(ElavonCCRequest, on_delete=models.CASCADE)
  date_added 		      = models.DateTimeField(verbose_name="date added", auto_now_add=True)
  # Response
  ssl_result= models.CharField(max_length=255, blank=True, null=True)
  ssl_result_message= models.CharField(max_length=255, blank=True, null=True)
  ssl_txn_id= models.CharField(max_length=255, blank=True, null=True)
  ssl_txn_time= models.CharField(max_length=255, blank=True, null=True)
  ssl_approval_code= models.CharField(max_length=255, blank=True, null=True)
  ssl_amount= models.CharField(max_length=255, blank=True, null=True)
  ssl_card_number= models.CharField(max_length=255, blank=True, null=True)
  ssl_card_short_description= models.CharField(max_length=255, blank=True, null=True)
  ssl_card_type= models.CharField(max_length=255, blank=True, null=True)
  ssl_promo_list= models.CharField(max_length=255, blank=True, null=True)
  # [Tokenization]
  ssl_token= models.CharField(max_length=255, blank=True, null=True)
  ssl_token_response= models.CharField(max_length=255, blank=True, null=True)
  ssl_add_token_response= models.CharField(max_length=255, blank=True, null=True)
  # [Tip Processing]
  ssl_base_amount= models.CharField(max_length=255, blank=True, null=True)
  ssl_tip_amount= models.CharField(max_length=255, blank=True, null=True)
  ssl_server= models.CharField(max_length=255, blank=True, null=True)
  ssl_shift= models.CharField(max_length=255, blank=True, null=True)
  # [Address Verification Service]
  ssl_avs_response= models.CharField(max_length=255, blank=True, null=True)
  # [Card Verification]
  ssl_cvv2_response= models.CharField(max_length=255, blank=True, null=True)
  # [Invoice Number]
  ssl_invoice_number= models.CharField(max_length=255, blank=True, null=True)
  # [Multi-Murrency Conversion]
  ssl_transaction_currency= models.CharField(max_length=255, blank=True, null=True)
  # [Dynamic Currency Conversion]
  ssl_txn_currency_code= models.CharField(max_length=255, blank=True, null=True)
  ssl_markup= models.CharField(max_length=255, blank=True, null=True)
  ssl_conversion_rate= models.CharField(max_length=255, blank=True, null=True)
  ssl_cardholder_amount= models.CharField(max_length=255, blank=True, null=True)
  ssl_cardholder_currency= models.CharField(max_length=255, blank=True, null=True)
  ssl_cardholder_base_amount= models.CharField(max_length=255, blank=True, null=True)
  ssl_cardholder_tip_amount= models.CharField(max_length=255, blank=True, null=True)
  # [Partial Approval]
  ssl_requested_amount= models.CharField(max_length=255, blank=True, null=True)
  ssl_balance_due= models.CharField(max_length=255, blank=True, null=True)
  ssl_account_balance= models.CharField(max_length=255, blank=True, null=True)
  # [Card On File]
  ssl_oar_data= models.CharField(max_length=255, blank=True, null=True)
  ssl_ps2000_data= models.CharField(max_length=255, blank=True, null=True)
  # [Error]
  errorCode= models.CharField(max_length=255, blank=True, null=True)
  errorMessage= models.CharField(max_length=255, blank=True, null=True)
  errorName= models.CharField(max_length=255, blank=True, null=True)
