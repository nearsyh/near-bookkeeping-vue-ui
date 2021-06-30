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

  public fullName(): String {
    return `${this.owner}${this.name}`;
  }

  public static fromObject(obj: any) {
    return new Account(obj.id, obj.name, obj.owner, AccountType[obj.accountType as keyof typeof AccountType]);
  }
};

export class Accounts {
  accounts: Map<number, Account>;

  constructor(accounts: Account[]) {
    this.accounts = new Map();
    for (const account of accounts) {
      this.accounts.set(account.id, Account.fromObject(account));
    }
  }

  public accountById(id: number): Account {
    return this.accounts.get(id)!;
  }
}