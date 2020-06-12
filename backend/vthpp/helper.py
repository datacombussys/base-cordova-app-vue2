# code = {}
# import csv
# with open("./processorfiles/ElavonCardAVSResponseCodes.csv", "r") as file:
#   out = csv.reader(file)
#   header = out.__next__()

#   for line in out:
#     # print(header, line)
#     code[line[0]] = line[1]

# print(code['A'])
    

code = {}
import csv
with open("./processorfiles/ErrorCodes.csv", "r") as file:
  out = csv.reader(file)
  header = out.__next__()

  for line in out:
    # print(header, line)
    code[line[0]] = dict(zip(header, line))

print(code)
    