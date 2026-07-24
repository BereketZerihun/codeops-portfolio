report = {}

try:
  with open("transactions.txt") as file:
    for line in file:
      name, amount = line.strip().split(",")
      report[amount] = int(amount)
except FileNotFoundError:
  print("file is not found")

def adjust(name,amount):
  report[name] = report.get(name,0)+amount
  with open("report.txt", "w") as file:
    for name, amount in report.items():
      file.write(f"{name},{amount}\n")



adjust( "Bereket Zerihun" ,30000000)

