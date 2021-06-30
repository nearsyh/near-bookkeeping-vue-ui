<template>
  <div class="transaction-stats">
    <n-card :title="title">
      <div>
        <div>总收入: {{ totalIncome }}元</div>
        <div>总支出: {{ totalExpense }}元</div>
      </div>
    </n-card>
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
  get title() {
    return `${globalState.transactions.yearMonth()}收支报告`;
  }

  get totalIncome() {
    return globalState.transactions.totalIncome().toStr();
  }

  get totalExpense() {
    return globalState.transactions.totalExpense().toStr();
  }
}
</script>

<style scoped></style>
