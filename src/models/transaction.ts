import { Timestamp, Money } from './common';
import { AccountId, Accounts } from './account';
import { timestampToMonthDay, timestampToYearMonth } from '@/lib/common';

export enum TransactionType {
  Salary,
  Shopping,
  Food,
  Commute,
  Daily,
  Exceptional,
  Refund,
  Withdraw,
  Deposit,
  Investment,
  InvestmentIncome,
  Interests,
  Redemption,
  Transfer,
  Repayment,
  Loan,
  Reimbursement,
  Initialize
}

export function transactionTypeName(transactionType: TransactionType): String {
  switch (transactionType) {
    case TransactionType.Salary:
      return '工资';
    case TransactionType.Shopping:
      return '购物';
    case TransactionType.Food:
      return '饮食';
    case TransactionType.Commute:
      return '交通';
    case TransactionType.Daily:
      return '日常';
    case TransactionType.Exceptional:
      return '额外';
    case TransactionType.Refund:
      return '退款';
    case TransactionType.Withdraw:
      return '取现';
    case TransactionType.Deposit:
      return '存款';
    case TransactionType.Investment:
      return '投资';
    case TransactionType.InvestmentIncome:
      return '投资收益';
    case TransactionType.Interests:
      return '利息';
    case TransactionType.Redemption:
      return '赎回';
    case TransactionType.Transfer:
      return '转账';
    case TransactionType.Repayment:
      return '还款';
    case TransactionType.Loan:
      return '贷款';
    case TransactionType.Reimbursement:
      return '报销';
    case TransactionType.Initialize:
      return '初始化';
  }
}

export function isExpense(transactionType: TransactionType): boolean {
  return transactionType === TransactionType.Shopping ||
    transactionType === TransactionType.Food ||
    transactionType === TransactionType.Commute ||
    transactionType === TransactionType.Daily ||
    transactionType === TransactionType.Exceptional;
}

export function isIncome(transactionType: TransactionType): boolean {
  return transactionType === TransactionType.Salary ||
    transactionType === TransactionType.InvestmentIncome ||
    transactionType === TransactionType.Interests;
}

export class Entry {
  accountId: AccountId;
  delta: Money;

  constructor(accountId: AccountId, delta: Money) {
    this.accountId = accountId;
    this.delta = delta;
  }

  static fromObject(obj: any) {
    return new Entry(obj.accountId, new Money(obj.delta.cents));
  }
};

export class Transaction {
  timestamp: Timestamp;
  creator: string;
  note: string;
  transactionType: TransactionType;
  entries: Entry[];

  constructor(timestamp: number, creator: string, note: string, transactionType: TransactionType, entries: Entry[]) {
    this.timestamp = timestamp;
    this.creator = creator;
    this.note = note;
    this.transactionType = transactionType;
    this.entries = entries;
  }

  get isExpense() {
    return isExpense(this.transactionType);
  }

  get isIncome() {
    return isIncome(this.transactionType);
  }

  public static fromObject(obj: any): Transaction {
    const entries = obj.entries.map((entry: any) => Entry.fromObject(entry));
    return new Transaction(
      obj.timestamp, obj.creator, obj.note,
      TransactionType[obj.transactionType as keyof typeof TransactionType], entries);
  }

  public description(accounts: Accounts): String {
    if (TransactionType[this.transactionType] === TransactionType[TransactionType.Initialize]) {
      return '';
    }

    const fromAccount = accounts.accountById(this.fromEntry().accountId);
    const toAccount = accounts.accountById(this.toEntry().accountId);
    if (isExpense(this.transactionType)) {
      return `${fromAccount.fullName()} -${this.amount().toStr()}元`;
    } else {
      return `${fromAccount.fullName()}->${toAccount.fullName()} ${this.amount().toStr()}元`;
    }
  }

  public fromEntry(): Entry {
    return this.entries.filter((entry) => entry.delta.isNegative)[0];
  }

  public toEntry(): Entry {
    return this.entries.filter((entry) => !entry.delta.isNegative)[0];
  }

  public transactionTypeName(): String {
    return transactionTypeName(this.transactionType);
  }

  public amount(): Money {
    return this.entries[0].delta.abs();
  }

  public yearMonth(): string {
    return timestampToYearMonth(this.timestamp);
  }

  public monthDay(): string {
    return timestampToMonthDay(this.timestamp);
  }
}

export class TransactionList {
  transactions: Transaction[];

  constructor(transactions: Transaction[]) {
    this.transactions = transactions.sort(
      (a, b) =>
        b.timestamp - a.timestamp);
  }

  items(): Transaction[] {
    return this.transactions;
  }

  item(i: number): Transaction {
    return this.transactions[i];
  }

  public add(newTransaction: Transaction) {
    this.transactions.splice(0, 0, newTransaction);
  }

  public yearMonth(): string {
    return this.transactions.length === 0 ? '' : this.item(0).yearMonth();
  }

  public totalIncome(): Money {
    const allIncome = this.transactions.filter((trans) => trans.isIncome);
    let ret = new Money(0);
    for (const income of allIncome) {
      ret = ret.add(income.amount());
    }
    return ret;
  }

  public totalExpense(): Money {
    const allExpense = this.transactions.filter((trans) => trans.isExpense);
    let ret = new Money(0);
    for (const expense of allExpense) {
      ret = ret.add(expense.amount());
    }
    return ret;
  }
}
