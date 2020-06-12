
class EmployeeIDs:
  def __init__(self):
    self.employeeID = employeeID

  def newEmployeeID(self, **kwargs):
    print("newEmployeeID kwargs", kwargs)
    if not kwargs['employee_number']:
      return "100000"
    else:
      last_employee_no = kwargs['employee_number']
      print("last_employee_no", last_employee_no)
      if type(last_employee_no) is int:
        last_employee_no += 1
        str_last_employee_number = str(last_employee_no)
        return str_last_employee_number
      else:
        int_last_employee_no = int(last_employee_no)
        int_last_employee_no += 1
        str_last_employee_number = str(int_last_employee_no)
        return str_last_employee_number