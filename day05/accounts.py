class Account:
  def __init__(self,owner,acc_number,balance=0):
    self.owner = owner
    self.acc_number = acc_number
    self.__balance = balance
  @property
  def balance(self):
    return self.__balance
  @balance.setter
  def balance(self, ammount):
    if ammount <= 0:
      raise ValueError("Negative number is not allowed")
    self.__balance = ammount
  
  def deposit(self,ammount):
    self.balance +=ammount
    return self.balance
  def withdraw(self,ammount):
     self.balance -=ammount
     return self.balance
  

class SavingAcount(Account):
  def __init__(self, owner, acc_number, balance=0, rate=0.05):
    super().__init__(owner, acc_number, balance)
    self.rate = rate
  def add_interest(self):
    self.deposit(self.balance * self.rate)

class CurrentAccount(Account):
  def __init__(self, owner, acc_number, balance=0, overdraft=1000):
    super().__init__(owner, acc_number, balance)
    self.overdraft = overdraft
  
  
Bereket = Account("Bereket Zerihun",100023467891,8000000)
 #Before deposit
print(Bereket.balance)  

Bereket.deposit(1000000)

 #After deposit
print(Bereket.balance)  

Bereket.withdraw(1000000)
 #After withdraw
print(Bereket.balance)  






