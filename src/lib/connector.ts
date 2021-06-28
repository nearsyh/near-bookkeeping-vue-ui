import { AccountId } from '@/models/account';
import { Money } from '@/models/common';
import { Entry, TransactionType } from '@/models/transaction';

const endpoint = 'http://localhost:8080';
// const endpoint = 'https://rss-api.nearsyh.me'

const apiEndpoint = `${endpoint}/api/1.0`;
const jsonHeaders = {
  'Content-Type': 'application/json'
};

async function get(url: string) {
  const response = await fetch(url, {
    headers: jsonHeaders,
    method: 'GET',
    mode: 'cors',
    redirect: 'follow'
  });
  return response.json();
}

async function post(url: string, body: any) {
  const response = await fetch(url, {
    headers: jsonHeaders,
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    body: JSON.stringify(body)
  });
  return response.json();
}

export async function allAccounts() {
  return await get(`${apiEndpoint}/accounts`);
}

export async function getTransactions(monthOffsets: number[]) {
  return await post(`${apiEndpoint}/transactions/list_by_month`, {
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
  return await post(`${apiEndpoint}/transactions`, {
    creator,
    note,
    transactionType,
    entries: [
      new Entry(from, delta.negative()),
      new Entry(to, delta)
    ]
  });
}
