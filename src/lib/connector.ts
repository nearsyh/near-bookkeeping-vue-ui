import { Account, AccountId } from '@/models/account';
import { Money } from '@/models/common';
import { Entry, Transaction, TransactionType } from '@/models/transaction';
import axios from 'axios';

const endpoint = 'http://localhost:8080';
// const endpoint = 'https://rss-api.nearsyh.me'

const apiEndpoint = `${endpoint}/api/1.0`;

async function get<T>(url: string): Promise<T> {
  const response = await axios.get<T>(url);
  return response.data;
}

async function post<T>(url: string, body: any): Promise<T> {
  const response = await axios.post<T>(url, body);
  return response.data;
}

export async function allAccounts(): Promise<Account[]> {
  return await get<Account[]>(`${apiEndpoint}/accounts`);
}

export async function getTransactions(monthOffsets: number[]): Promise<Transaction[][]> {
  return await post<Transaction[][]>(`${apiEndpoint}/transactions/list_by_month`, {
    offsets: monthOffsets
  });
}

export async function addTransaction(
  creator: string, note: string, transactionType: TransactionType, amount: string,
  from: AccountId, to: AccountId) {
  if (amount === '') {
    return;
  }
  const delta = Money.fromStr(amount);
  return await post<any>(`${apiEndpoint}/transactions`, {
    creator,
    note,
    transactionType,
    entries: [
      new Entry(from, delta.negative()),
      new Entry(to, delta)
    ]
  });
}
