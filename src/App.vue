<template>
  <n-message-provider>
    <Transactions
      v-if="user !== ''"
      v-bind:transactions="transactions"
      :key="transactions.length"
    />
    <UserSelector v-else @updated="onUserSelected()" />
  </n-message-provider>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Transactions from './components/Transactions.vue';
import UserSelector from './components/UserSelector.vue';
import { allAccounts, getTransactions } from '@/lib/connector';
import { TransactionList } from './models/transaction';
import { reactive } from '@vue/reactivity';
import { Accounts } from './models/account';
import { currentTime, getUser } from './lib/common';
import { NMessageProvider } from 'naive-ui';

export const globalState = reactive({
  accounts: new Accounts([]),
  transactions: new TransactionList([]),
  lastTimestamp: 0,
  user: getUser()
});

@Options({
  components: {
    Transactions,
    UserSelector,
    NMessageProvider
  },
  watch: {
    monthOffset: async function(value: number) {
      globalState.transactions = (await getTransactions([value]))[0];
    }
  }
})
export default class App extends Vue {
  monthOffset: number = 0;
  user: string = globalState.user;

  get transactions() {
    return globalState.transactions;
  }

  onUserSelected() {
    this.user = getUser();
  }

  async beforeCreate() {
    globalState.accounts = new Accounts(await allAccounts());
    globalState.lastTimestamp = currentTime().valueOf();
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
  height: 100vh;
}
</style>
