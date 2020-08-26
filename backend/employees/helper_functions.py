
class EmployeeIDs:
	def newEmployeeID(self, **kwargs):
		print("newEmployeeID kwargs", kwargs)
		employee_no = kwargs.get("employee_number", None)
		
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


 