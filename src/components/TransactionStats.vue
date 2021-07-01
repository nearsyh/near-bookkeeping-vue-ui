<template>
  <div class="transaction-stats">
    <div class="header">
      <span class="month">{{ month }}</span>
      <span>月</span>
    </div>
    <div class="body">
      <div class="digits-container">
        <div>
          支出 <span :class="expenseClass">￥{{ totalExpense }}</span>
        </div>
        <div>
          收入 <span class="digits">￥{{ totalIncome }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { NCard } from 'naive-ui';
import { globalState } from '@/App.vue';

@Options({
  components: {
    NCard
  }
})
export default class TransactionStats extends Vue {
  get month() {
    return globalState.transactions.month();
  }

  get expenseClass() {
    return globalState.transactions.totalExpense().cents > 10000 * 100
      ? 'digits warning'
      : 'digits';
  }

  get budgetRatio() {
    return globalState.transactions.totalExpense().cents / 10000 / 100;
  }

  get totalIncome() {
    return globalState.transactions.totalIncome().toStr();
  }

  get totalExpense() {
    return globalState.transactions.totalExpense().toStr();
  }
}
</script>

<style scoped>
.transaction-stats {
  padding: 10px 40px 20px 40px;
  background-color: #f1f1f1;
  box-shadow: 0px 2px 2px 1px #e2e2e2;
}

.header {
  font-size: large;
  display: flex;
  align-items: baseline;
  margin-bottom: 5px;
}

.month {
  font-size: 40px;
  padding-right: 5px;
}

.digits-container {
  display: flex;
  justify-content: space-between;
}

.digits {
  font-weight: bold;
}

.warning {
  color: red;
}
</style>
