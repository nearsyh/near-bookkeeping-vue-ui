<template>
  <div class="transactions">
    <TransactionStats @refresh="onRefresh()" />
    <div class="transactions-loading padding" v-if="loading || refreshing">
      <n-skeleton text :repeat="3" />
    </div>
    <div
      class="transactions-list padding"
      ref="transactionsList"
      v-if="!loading"
    >
      <TransactionItem
        v-for="transaction of transactions.items()"
        :key="transaction.timestamp"
        :transaction="transaction"
        @delete="onDelete"
      />
      <div class="transaction-adder-container">
        <TransactionAdder />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import TransactionItem from './TransactionItem.vue';
import TransactionAdder from './TransactionAdder.vue';
import TransactionStats from './TransactionStats.vue';
import { TransactionList } from '@/models/transaction';
import { globalState } from '@/App.vue';
import { getTransactions } from '@/lib/fetcher';
import { NSkeleton } from 'naive-ui';
import { getBalance } from '@/lib/connector';
import { Timestamp } from '@/models/common';
import { currentMonthStart } from '@/lib/common';

@Options({
  components: {
    TransactionItem,
    TransactionAdder,
    TransactionStats,
    NSkeleton
  },
  props: {
    transactions: TransactionList,
    loading: Boolean
  }
})
export default class Transactions extends Vue {
  transactions!: TransactionList;
  loading: boolean = false;
  refreshing: boolean = false;

  async onRefresh() {
    this.refreshing = true;
    globalState.transactions = await getTransactions(
      currentMonthStart().valueOf()
    );
    globalState.balance = await getBalance();
    this.refreshing = false;
    (this.$refs.transactionsList as any).scrollTop = 0;
  }

  async onDelete(timestamp: Timestamp) {
    globalState.transactions.remove(timestamp);
    getTransactions(timestamp).then(list => {
      globalState.transactions = list;
    });
    getBalance().then(b => {
      globalState.balance = b;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.transactions {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.transactions-list {
  padding: 0px 10px;
  flex-grow: 1;
  overflow-y: auto;
}

.transactions-loading {
  padding: 20px 10px 0px 10px;
}
</style>
