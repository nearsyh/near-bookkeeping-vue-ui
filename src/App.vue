<template>
  <Transactions v-bind:transactions="transactions" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Transactions from './components/Transactions.vue';
import { getTransactions } from '@/lib/connector';

@Options({
  components: {
    Transactions
  },
  watch: {
    monthOffset: async function(value: number) {
      this.transactions = (await getTransactions([value]))[0];
    }
  }
})
export default class App extends Vue {
  monthOffset = 0;
  transactions = [];

  async beforeCreate() {
    this.transactions = (await getTransactions([this.monthOffset]))[0];
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
