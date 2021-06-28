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

export class Entry {
  accountId: AccountId;
  delta: Money;

  constructor(accountId: AccountId, delta: Money) {
    this.accountId = accountId;
    this.delta = delta;
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
}
