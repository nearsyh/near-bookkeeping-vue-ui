export type AccountId = number;

export enum AccountType {
  Investment,
  Cash,
  Deposit,
  CreditCard,
  Income,
  Expense,
  Loan,
  OnTheFly,
};

export class Account {
  id: AccountId;
  name: String;
  accountType: AccountType;
  owner: String;

  constructor(id: AccountId, name: String, owner: String, accountType: AccountType) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.accountType = accountType;
  }

  typeName(): String {
    return 'type';
  }
};
