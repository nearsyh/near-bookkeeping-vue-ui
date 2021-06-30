<template>
  <div class="transactions-list">
    <TransactionItem
      v-for="transaction of transactions.items()"
      :key="transaction.timestamp"
      :transaction="transaction"
    />
    <TransactionAddingButtons />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import TransactionItem from './TransactionItem.vue';
import TransactionAddingButtons from './TransactionAddingButtons.vue';
import { TransactionList } from '@/models/transaction';

@Options({
  components: {
    TransactionItem,
    TransactionAddingButtons
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
