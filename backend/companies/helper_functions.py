
class CompanyIDs:
  def __init__(self):
    self.employeeID = employeeID

  def newCompanyID(self, **kwargs):
    print("newCompanyID kwargs", kwargs)

    if kwargs['is_partner']:
      if not kwargs['account_number']:
        return "P-100000"
      else:
        last_partner_id_no = kwargs['account_number']
        print("last_partner_id_no", last_partner_id_no)
        #Parse to String
        prefix, str_account_number = kwargs['account_number'].split("-", 10)
        int_account_number = int(str_account_number)
        int_account_number += 1
        #Combine and return
        concatenated_no = prefix + "-" + str(int_account_number)
        print("concatenated_no", concatenated_no)

        return concatenated_no

    if kwargs['is_merchant']:
      if not kwargs['account_number']:
        return "M-100000"
      else:
        last_partner_id_no = kwargs['account_number']
        print("last_partner_id_no", last_partner_id_no)
        #Parse to String
        prefix, str_account_number = kwargs['account_number'].split("-", 10)
        int_account_number = int(str_account_number)
        int_account_number += 1
        #Combine and return
        concatenated_no = prefix + "-" + str(int_account_number)
        print("concatenated_no", concatenated_no)

        return concatenated_no

    if kwargs['is_datacom']:
      if not kwargs['account_number']:
        return "D-100000"
      else:
        last_partner_id_no = kwargs['account_number']
        print("last_partner_id_no", last_partner_id_no)
        #Parse to String
        prefix, str_account_number = kwargs['account_number'].split("-", 10)
        print("prefix", prefix)
        print("str_account_number", str_account_number)
        int_account_number = int(str_account_number)
        int_account_number += 1
        #Combine and return
        concatenated_no = prefix + "-" + str(int_account_number)
        print("concatenated_no", concatenated_no)

        return concatenated_no

    if kwargs['is_vendor']:
      if not kwargs['account_number']:
        return "V-100000"
      else:
        last_partner_id_no = kwargs['account_number']
        print("last_partner_id_no", last_partner_id_no)
        #Parse to String
        prefix, str_account_number = kwargs['account_number'].split("-", 10)
        int_account_number = int(str_account_number)
        int_account_number += 1
        #Combine and return
        concatenated_no = prefix + "-" + str(int_account_number)
        print("concatenated_no", concatenated_no)

        return concatenated_no