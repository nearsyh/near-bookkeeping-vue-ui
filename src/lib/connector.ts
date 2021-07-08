import { Account, AccountId } from '@/models/account';
import { Balance } from '@/models/balance';
import { Money, Timestamp } from '@/models/common';
import {
  Entry,
  Transaction,
  TransactionList,
  TransactionType
} from '@/models/transaction';
import axios from 'axios';
import { currentTime } from './common';

const endpoint =
  process.env.NODE_ENV === 'production'
    ? 'https://bookkeeping-api.nearsyh.me'
    : 'http://localhost:8080';

const apiEndpoint = `${endpoint}/api/1.0`;

async function get<T>(url: string): Promise<T> {
  const response = await axios.get<T>(url);
  return response.data;
}

async function post<T>(url: string, body: any): Promise<T> {
  const response = await axios.post<T>(url, body);
  return response.data;
}

function accountWeight(account: Account): number {
  if (account.id <= 2) {
    return 100 - account.id;
  }
  if (account.id === 25) {
    return 90;
  }
  return 90 - account.id;
}

export async function allAccounts(): Promise<Account[]> {
  return (await get<any[]>(`${apiEndpoint}/accounts`))
    .map(any => Account.fromObject(any))
    .sort((a, b) => accountWeight(b) - accountWeight(a));
}

export async function getTransactionsByMonth(
  monthOffsets: number[]
): Promise<TransactionList[]> {
  return (
    await post<any[][]>(`${apiEndpoint}/transactions/list_by_month`, {
      offsets: monthOffsets
    })
  ).map(
    anyList =>
      new TransactionList(anyList.map(any => Transaction.fromObject(any)))
  );
}

export async function getTransactionsSince(
  timestamp: Timestamp
): Promise<Transaction[]> {
  return (
    await post<any[]>(`${apiEndpoint}/transactions/list`, {
      start: timestamp,
      end: currentTime().valueOf()
    })
  ).map(any => Transaction.fromObject(any));
}

export async function addTransaction(
  creator: string,
  note: string,
  transactionType: TransactionType,
  amount: string,
  from: AccountId,
  to: AccountId
): Promise<Transaction | undefined> {
  if (amount === '') {
    return undefined;
  }
  const delta = Money.fromStr(amount)!;
  const data = await post<any>(`${apiEndpoint}/transactions`, {
    creator,
    note,
    transactionType: TransactionType[transactionType],
    entries: [new Entry(from, delta.negative()), new Entry(to, delta)]
  });
  return Transaction.fromObject(data);
}

export async function getBalance(): Promise<Balance> {
  const data = await get<any>(`${apiEndpoint}/balance`);
  return Balance.fromObject(data);
}
