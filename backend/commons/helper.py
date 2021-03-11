
class CompanyIDs:
	def newCompanyID(self, **kwargs):
		print("newCompanyID kwargs", kwargs)

		if kwargs.get('is_partner', None):
			if not kwargs['last_account_number']:
				return "P-1000000"
			else:
				last_partner_id_no = kwargs['last_account_number']
				print("last_partner_id_no", last_partner_id_no)
				#Parse to String
				prefix, str_account_number = last_partner_id_no.split("-", 10)
				int_account_number = int(str_account_number)
				int_account_number += 1
				#Combine and return
				concatenated_no = prefix + "-" + str(int_account_number)
				print("concatenated_no", concatenated_no)

			return concatenated_no

		elif kwargs.get('is_merchant', None):
			if not kwargs['last_account_number']:
				return "M-1000000"
			else:
				last_merchant_id_no = kwargs['last_account_number']
				print("last_merchant_id_no", last_merchant_id_no)
				#Parse to String
				prefix, str_account_number = last_merchant_id_no.split("-", 10)
				int_account_number = int(str_account_number)
				int_account_number += 1
				#Combine and return
				concatenated_no = prefix + "-" + str(int_account_number)
				print("concatenated_no", concatenated_no)

			return concatenated_no

		elif kwargs.get('is_datacom', None):
			if not kwargs['last_account_number']:
				return "D-1000000"
			else:
				last_datacom_id_no = kwargs['last_account_number']
				print("last_datacom_id_no", last_datacom_id_no)
				#Parse to String
				prefix, str_account_number = last_datacom_id_no.split("-", 10)
				print("prefix", prefix)
				print("str_account_number", str_account_number)
				int_account_number = int(str_account_number)
				int_account_number += 1
				#Combine and return
				concatenated_no = prefix + "-" + str(int_account_number)
				print("concatenated_no", concatenated_no)

				return concatenated_no

		if kwargs.get('is_vendor', None):
			if not kwargs['last_account_number']:
				return "V-1000000"
			else:
				last_vendor_id_no = kwargs['last_account_number']
				print("last_vendor_id_no", last_vendor_id_no)
				#Parse to String
				prefix, str_account_number = last_vendor_id_no.split("-", 10)
				int_account_number = int(str_account_number)
				int_account_number += 1
				#Combine and return
				concatenated_no = prefix + "-" + str(int_account_number)
				print("concatenated_no", concatenated_no)

				return concatenated_no


		elif kwargs.get('is_warehouse', None):
			if not kwargs['last_account_number']:
				return "W-1000000"
			else:
				last_warehouse_id_no = kwargs['last_account_number']
				print("last_warehouse_id_no", last_warehouse_id_no)
				#Parse to String
				prefix, str_account_number = last_warehouse_id_no.split("-", 10)
				int_account_number = int(str_account_number)
				int_account_number += 1
				#Combine and return
				concatenated_no = prefix + "-" + str(int_account_number)
				print("concatenated_no", concatenated_no)

				return concatenated_no


		elif kwargs.get('is_salesoffice', one):
			if not kwargs['last_account_number']:
				return "S-1000000"
			else:
				last_partner_id_no = kwargs['last_account_number']
				print("last_partner_id_no", last_partner_id_no)
				#Parse to String
				prefix, str_account_number = last_partner_id_no.split("-", 10)
				int_account_number = int(str_account_number)
				int_account_number += 1
				#Combine and return
				concatenated_no = prefix + "-" + str(int_account_number)
				print("concatenated_no", concatenated_no)


				return concatenated_no