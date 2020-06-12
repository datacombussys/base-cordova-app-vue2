import requests
from rest_framework import exceptions

VALID_TRANSACTION_TYPES = [
    'ccauthonly',
    'ccavsonly',
    'ccsale',
    'ccverify',
    'cccredit',
    'ccforce',
    'ccbalinquiry',
    'ccreturn',
    'ccvoid',
    'cccomplete',
    'ccdelete',
    'ccupdatetip',
    'ccsignature',
    'ccaddrecurring',
    'ccaddinstall',
    'ccgettoken',
    'ccupdatetoken',
    'ccdeletetoken',
    'ccquerytoken'
]


class ConvergenceException(Exception):
    pass

class Converge(object):
    def __init__(self, ssl_merchant_id, ssl_user_id, ssl_pin, ssl_vendor_id, ssl_partner_app_id, is_demo=False):
        self._merchant_id = ssl_merchant_id
        self._user_id = ssl_user_id
        self._pin = ssl_pin
        self._is_demo = is_demo
        self._ssl_vendor_id = ssl_vendor_id
        self._ssl_partner_app_id = ssl_partner_app_id

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

        response = requests.post(self.xml_endpoint, kwargs)
        if kwargs.get('__debug'):
            print(response.request.body)

        response.raise_for_status()
        result = {}
        decoded = response.content.decode('utf-8')

        #Need to fix this issue
        print('decoded', decoded)
        for line in decoded.split('\n'):
            k, v = line.split('=')
            result[k] = v

        result['success'] = 'errorCode' not in result
        return result

    def validate_cc(self, **kwargs):
        cc_details = [
            'ssl_card_number',
            'ssl_exp_date',
            'ssl_avs_address',
            'ssl_avs_zip',
            'ssl_verify'
        ]
        for key in cc_details:
            if not key in kwargs:
                return False

        return True

    def get_cc_token(self, **kwargs):
        if not self.validate_cc(**kwargs):
            msg = "The Credit Card data was bad"
            raise exceptions.ValidationError(msg)
        kwargs['ssl_transaction_type'] = 'ccgettoken'

        return self.request(**kwargs)

    def query_cc_token(self, **kwargs):
        pass

    def update_cc_token(self, **kwargs):
        pass

    def delete_cc_token(self, **kwargs):
        pass


if __name__ == "__main__":
  converge = Converge(
  is_demo = True,
  ssl_merchant_id = "0020546",
  ssl_user_id = "apiUser",
  ssl_pin = "FJK5E3AFRQ8OMA2JC9E900XKG76KLAYCR3SBFLUASUPLAYYQKC1KURRWRRPZE8RJ",
  ssl_vendor_id = "sc100231",
  ssl_partner_app_id = "AY",
  )

#   response = converge.request(
#     'ccsale',
#     ssl_card_number='4000000000000002',
#     ssl_exp_date='0124',
#     ssl_cvv2cvc2='899',
#     ssl_amount='25.00',
#     ssl_avs_address='123 easy st',
#     ssl_avs_zip='94041',
#     ssl_3dsecure_value='false'
#   )

#   print('response', response)

getToken = converge.get_cc_token(
    ssl_card_number = '4000000000000002',
    ssl_exp_date = '0124',
    ssl_avs_address = '123 easy st',
    ssl_avs_zip = '94041',
    ssl_verify = "N",
    ssl_add_token = "Y"
)

print('getToken', getToken)




















  #Bad Request
  # {
    # 'errorCode': '4025', 
    # 'errorName': 'Invalid Credentials', 
    # 'errorMessage': 'The credentials supplied in the authorization request are invalid.', 
    # 'success': False
  # }
  #Good Request
  #{
    # 'ssl_card_number': '40**********0002', 
    # 'ssl_exp_date': '0124', 
    # 'ssl_amount': '25.00', 
    # 'ssl_card_short_description': 'VISA', 
    # 'ssl_salestax': '', 
    # 'ssl_invoice_number': '', 
    # 'ssl_departure_date': '', 
    # 'ssl_completion_date': '', 
    # 'ssl_result': '0', 
    # 'ssl_result_message': 'APPROVAL', 
    # 'ssl_transaction_type': 'SALE', 
    # 'ssl_txn_id': '290520AD4-D5CB9CDB-17AC-4340-8F5B-08AC8EF23EA0', 
    # 'ssl_approval_code': '719516', 
    # 'ssl_cvv2_response': 'M', 
    # 'ssl_avs_response': 'U', 
    # 'ssl_account_balance': '0.00', 
    # 'ssl_txn_time': '05/29/2020 06:25:34 PM', 
    # 'ssl_card_type': 'CREDITCARD', 
    # 'ssl_partner_app_id': 'VM', 
    # 'success': True
  # }