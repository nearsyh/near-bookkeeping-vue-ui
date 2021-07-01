<template>
  <TransactionStats />
  <div class="transactions-list">
    <TransactionItem
      v-for="transaction of transactions.items()"
      :key="transaction.timestamp"
      :transaction="transaction"
    />
    <div class="transaction-adder-container">
      <TransactionAdder />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import TransactionItem from './TransactionItem.vue';
import TransactionAdder from './TransactionAdder.vue';
import TransactionStats from './TransactionStats.vue';
import { TransactionList } from '@/models/transaction';

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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.transactions-list {
  padding: 0px 10px;
}
</style>
