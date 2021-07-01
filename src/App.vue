<template>
  <Transactions
    v-if="!shouldSelectUser"
    v-bind:transactions="transactions"
    :key="transactions.length"
  />
  <UserSelector v-else :key="user" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Transactions from './components/Transactions.vue';
import UserSelector from './components/UserSelector.vue';
import { allAccounts, getTransactions } from '@/lib/connector';
import { TransactionList } from './models/transaction';
import { reactive } from '@vue/reactivity';
import { Accounts } from './models/account';
import { getUser, hasUser } from './lib/common';

export const globalState = reactive({
  accounts: new Accounts([]),
  transactions: new TransactionList([]),
  user: getUser()
});

@Options({
  components: {
    Transactions,
    UserSelector
  },
  watch: {
    monthOffset: async function(value: number) {
      globalState.transactions = (await getTransactions([value]))[0];
    }
  }
})
export default class App extends Vue {
  monthOffset: number = 0;

  get transactions() {
    return globalState.transactions;
  }

  get shouldSelectUser() {
    return !hasUser();
  }

  get user() {
    return hasUser() ? globalState.user.length : 0;
  }

  async beforeCreate() {
    globalState.accounts = new Accounts(await allAccounts());
    globalState.transactions = (await getTransactions([this.monthOffset]))[0];
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
}
</style>
