class IDs:
	def newEmployeeID(self, **kwargs):
		print("newEmployeeID kwargs", kwargs)
		is_employee = kwargs.get("is_employee", None)
		employee_no = kwargs.get("employee_number", None)
		
		if is_employee:
			if not employee_no:
				return "E-1000000"
			else:
				last_employee_id_no = kwargs['last_account_number']
				print("last_employee_id_no", last_employee_id_no)
				#Parse to String
				prefix, str_account_number = last_employee_id_no.split("-", 10)
				int_account_number = int(str_account_number)
				int_account_number += 1
				#Combine and return
				concatenated_no = prefix + "-" + str(int_account_number)
				print("concatenated_no", concatenated_no)

				return concatenated_no

	def newCustomerID(self, **kwargs):
		print("newCustomerID kwargs", kwargs)
		is_customer = kwargs.get("is_customer", None)
		customer_number = kwargs.get("customer_number", None)

		if is_customer:
			if not customer_number:
				return "C-1000000"
			else:
				last_customer_id_no = kwargs['last_account_number']
				print("last_customer_id_no", last_customer_id_no)
				#Parse to String
				prefix, str_account_number = last_customer_id_no.split("-", 10)
				int_account_number = int(str_account_number)
				int_account_number += 1
				#Combine and return
				concatenated_no = prefix + "-" + str(int_account_number)
				print("concatenated_no", concatenated_no)

				return concatenated_no
