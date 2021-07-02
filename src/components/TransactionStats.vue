<template>
  <div class="transaction-stats">
    <div class="header">
      <span class="month">{{ month }}</span>
      <span>月</span>
    </div>
    <div class="body">
      <div class="digits-container">
        <div class="expense-container" @click="showExpenseStats = true">
          支出 <span :class="expenseClass">￥{{ totalExpense }}</span>
          <n-icon><info-icon /></n-icon>
        </div>
        <div>
          收入 <span class="digits">￥{{ totalIncome }}</span>
        </div>
      </div>
    </div>

    <n-drawer
      class="expense-stats"
      v-model:show="showExpenseStats"
      height="50%"
      style="border-radius: 10px 10px 0px 0px"
      placement="bottom"
    >
      <n-drawer-content title="支出明细" closable>
        <div class="expense-group-list">
          <div class="expense-group">
            <div class="expense-title">总计 ({{ totalExpenseCount }}笔)</div>
            <div class="expense-amount">￥{{ totalExpense }}</div>
          </div>
          <div
            class="expense-group"
            v-for="expenseGroup of expenseGroupList"
            :key="expenseGroup.expenseType"
          >
            <div class="expense-title">
              {{ expenseGroup.typeName }} ({{ expenseGroup.ratio }}%,
              {{ expenseGroup.count }}笔)
            </div>

            <div class="expense-amount">￥{{ expenseGroup.total.toStr() }}</div>
          </div>
        </div>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {
  NCard,
  NIcon,
  NDrawer,
  NDrawerContent,
  NList,
  NListItem
} from 'naive-ui';
import { globalState } from '@/App.vue';
import { InfoOutlined as InfoIcon } from '@vicons/material';

@Options({
  components: {
    NCard,
    NIcon,
    NDrawer,
    NDrawerContent,
    NList,
    NListItem,
    InfoIcon
  }
})
export default class TransactionStats extends Vue {
  showExpenseStats: boolean = false;

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

  get totalExpenseCount() {
    return globalState.transactions.totalExpenseCount();
  }

  get expenseGroupList() {
    return globalState.transactions.expenseGroups();
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

.expense-container {
  display: flex;
  align-items: center;
}

.expense-container .n-icon {
  margin-left: 5px;
}

.expense-group {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
}

.digits {
  font-weight: bold;
}

.warning {
  color: red;
}
</style>
