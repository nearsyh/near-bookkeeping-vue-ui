<template>
  <div class="transactions-list">
    <TransactionItem
      v-for="transaction of transactions"
      v-bind:key="transaction.timestamp"
      v-bind:transaction="transaction"
    />
  </div>
</template>

<script lang="ts">
// import { Transaction } from '@/models/transaction';
import { Vue, Options } from 'vue-class-component';
import TransactionItem from './TransactionItem.vue';
import { Transaction } from '@/models/transaction';

@Options({
  components: {
    TransactionItem
  },
  props: {
    transactions: []
  }
})
export default class Transactions extends Vue {
  transactions: Transaction[] = [];
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
