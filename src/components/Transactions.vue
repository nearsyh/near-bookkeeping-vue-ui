<template>
  <div class="transactions-list">
    <TransactionStats />
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
