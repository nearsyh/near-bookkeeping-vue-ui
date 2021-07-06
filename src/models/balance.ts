import { AccountId, Accounts } from './account';
import { Money } from './common';
import { Transaction } from './transaction';

export class AccountBalance {
  accountId: AccountId;
  value: Money;

  constructor(accountId: AccountId, value: Money) {
    this.accountId = accountId;
    this.value = value;
  }

  static fromObject(obj: any): AccountBalance {
    return new AccountBalance(obj.accountId, new Money(obj.value.cents));
  }
}

export class BalanceStat {
  accountName: String;
  value: Money;

  constructor(accountName: String, value: Money) {
    this.accountName = accountName;
    this.value = value;
  }
}

export class Balance {
  balances: AccountBalance[];

  constructor(balances: AccountBalance[]) {
    this.balances = balances;
  }

  static fromObject(obj: any): Balance {
    return new Balance(
      obj.balances.map((b: any) => AccountBalance.fromObject(b))
    );
  }

  public addTransaction(transaction: Transaction) {
    for (const balance of this.balances) {
      balance.value = balance.value.add(
        transaction.deltaForAccount(balance.accountId)
      );
    }
  }

  public addTransactions(transactions: Transaction[]) {
    for (const transaction of transactions) {
      this.addTransaction(transaction);
    }
  }

  public asBalanceStats(accounts: Accounts): BalanceStat[] {
    return this.balances
      .filter(balance =>
        accounts.accountById(balance.accountId).isRealAccount()
      )
      .map(
        balance =>
          new BalanceStat(
            accounts.accountById(balance.accountId).fullName(),
            balance.value
          )
      );
  }

  public totalAsset(accounts: Accounts): Money {
    let ret = new Money(0);
    for (const balance of this.balances) {
      if (accounts.accountById(balance.accountId).isAsset()) {
        ret = ret.add(balance.value);
      }
    }
    return ret;
  }
}
