<template>
  <div class="transactions">
    <TransactionStats @refresh="onRefresh()" />
    <div class="transactions-list" ref="transactionsList">
      <TransactionItem
        v-for="transaction of transactions.items()"
        :key="transaction.timestamp"
        :transaction="transaction"
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
import { currentTime } from '@/lib/common';
import { getTransactionsSince } from '@/lib/connector';

@Options({
  components: {
    TransactionItem,
    TransactionAdder,
    TransactionStats
  },
  props: {
    transactions: TransactionList
  }
})
export default class Transactions extends Vue {
  transactions!: TransactionList;

  async onRefresh() {
    const start = globalState.lastTimestamp + 1;
    globalState.lastTimestamp = currentTime().valueOf();
    const newTransactions = await getTransactionsSince(start);
    globalState.transactions.append(newTransactions);
    (this.$refs.transactionsList as any).scrollTop = 0;
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
</style>
