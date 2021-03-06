export type AccountId = number;

export enum AccountType {
  Investment,
  Cash,
  Deposit,
  CreditCard,
  Income,
  Expense,
  Loan,
  OnTheFly
}

export class Account {
  id: AccountId;
  name: String;
  accountType: AccountType;
  owner: String;

  constructor(
    id: AccountId,
    name: String,
    owner: String,
    accountType: AccountType
  ) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.accountType = accountType;
  }

  public fullName(): String {
    return `${this.owner}${this.name}`;
  }

  public hasTypeIn(accountTypes: AccountType[]): boolean {
    return accountTypes.includes(this.accountType);
  }

  public hasOwner(owners: String[]): boolean {
    return owners.includes(this.owner);
  }

  public isRealAccount(): boolean {
    return (
      this.accountType !== AccountType.Income &&
      this.accountType !== AccountType.Expense
    );
  }

  public isAsset(): boolean {
    return (
      this.accountType === AccountType.Cash ||
      this.accountType === AccountType.Deposit ||
      this.accountType === AccountType.CreditCard ||
      this.accountType === AccountType.Investment ||
      this.accountType === AccountType.OnTheFly
    );
  }

  public static fromObject(obj: any) {
    return new Account(
      obj.id,
      obj.name,
      obj.owner,
      AccountType[obj.accountType as keyof typeof AccountType]
    );
  }
}

export class Accounts {
  accounts: Map<number, Account>;

  constructor(accounts: Account[]) {
    this.accounts = new Map();
    for (const account of accounts) {
      this.accounts.set(account.id, account);
    }
  }

  public accountById(id: number): Account {
    return this.accounts.get(id)!;
  }

  public withTypes(accountTypes: AccountType[]): Account[] {
    if (accountTypes.length === 0) {
      return [...this.accounts.values()];
    }
    return [...this.accounts.values()].filter(account =>
      account.hasTypeIn(accountTypes)
    );
  }

  public withTypesAndOwner(
    accountTypes: AccountType[],
    owners: string[]
  ): Account[] {
    return [...this.accounts.values()]
      .filter(account => account.hasTypeIn(accountTypes))
      .filter(account => owners.length === 0 || account.hasOwner(owners));
  }

  public expenseAccountId(): AccountId {
    return this.withTypes([AccountType.Expense])[0].id;
  }
}
