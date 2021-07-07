import { Timestamp } from '@/models/common';
import { Transaction, TransactionList } from '@/models/transaction';
import { IDBPDatabase, openDB } from 'idb';
import { currentMonthStart } from './common';
import { getTransactionsSince } from './connector';

function isIndexedDBSupported(): boolean {
  return 'indexedDB' in window;
}

async function openDatabase(): Promise<IDBPDatabase<unknown>> {
  return await openDB('bookkeeping-db', 2, {
    upgrade: (upgradeDb: any) => {
      if (!upgradeDb.objectStoreNames.contains('transactions')) {
        upgradeDb.createObjectStore('transactions');
      }
    }
  });
}

export async function getTransactions(): Promise<TransactionList> {
  if (!isIndexedDBSupported()) {
    return await getTransactionsFromRemote();
  }

  const monthStart = currentMonthStart();
  const transactionsLocal = await getTransactionsFromLocal();

  const newTransactionsSince = await getTransactionsFromRemote(
    transactionsLocal.items().length === 0 ||
      monthStart.isAfter(transactionsLocal.moment.valueOf())
      ? monthStart.valueOf()
      : transactionsLocal.moment.valueOf() + 1
  );
  transactionsLocal.append(newTransactionsSince.items());
  transactionsLocal.truncateTo(monthStart);

  await putTransactionsInLocal(transactionsLocal, monthStart.valueOf());
  return transactionsLocal;
}

export async function saveTransactions(
  transactions: TransactionList
): Promise<void> {
  if (isIndexedDBSupported()) {
    await getTransactionsFromRemote();
  }
  await putTransactionsInLocal(transactions, currentMonthStart().valueOf());
}

async function getTransactionsFromLocal(): Promise<TransactionList> {
  const db = await openDatabase();
  const list = await db.get('transactions', currentMonthStart().valueOf());
  if (list) {
    return new TransactionList(
      list.map((any: any) => Transaction.fromObject(any))
    );
  } else {
    return new TransactionList([]);
  }
}

async function putTransactionsInLocal(
  transactions: TransactionList,
  timestamp: Timestamp
): Promise<void> {
  const db = await openDatabase();
  const items = transactions.items().map((trans) => trans.clone());
  await db.put('transactions', items, timestamp);
}

async function getTransactionsFromRemote(
  since: Timestamp | undefined = undefined
): Promise<TransactionList> {
  const transactions = await getTransactionsSince(
    since || currentMonthStart().valueOf()
  );
  return new TransactionList(transactions);
}
