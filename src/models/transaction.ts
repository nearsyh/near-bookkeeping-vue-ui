import { Timestamp, Money } from './common';
import { AccountId } from './account';

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

  public static fromObject(obj: any): Transaction {
    const entries = obj.entries.map((entry: any) => Entry.fromObject(entry));
    return new Transaction(
      obj.timestamp, obj.creator, obj.note,
      TransactionType[obj.transactionType as keyof typeof TransactionType], entries);
  }

  public description(): String {
    if (TransactionType[this.transactionType] === TransactionType[TransactionType.Initialize]) {
      return `${this.transactionTypeName()}`;
    } else if (isExpense(this.transactionType)) {
      return `${this.transactionTypeName()}支出: ${this.amount().toStr()}`;
    } else {
      return `${this.transactionTypeName()}: ${this.amount().toStr()}`;
    }
  }

  public transactionTypeName(): String {
    return transactionTypeName(this.transactionType);
  }

  public amount(): Money {
    return this.entries[0].delta.abs();
  }
}

export class TransactionList {
  transactions: Transaction[];

  constructor(transactions: Transaction[]) {
    this.transactions = transactions;
  }

  items(): Transaction[] {
    return this.transactions;
  }

  item(i: number): Transaction {
    return this.transactions[i];
  }
}
