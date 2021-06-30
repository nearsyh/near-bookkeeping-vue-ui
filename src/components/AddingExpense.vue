<template>
  <div class="adding-expense">
    <div class="expense-type-selector">
      <IconButton @click="setExpenseType('Shopping')"
        ><shopping-icon
      /></IconButton>
      <IconButton @click="setExpenseType('Food')"><food-icon /></IconButton>
      <IconButton @click="setExpenseType('Commute')"
        ><commute-icon
      /></IconButton>
      <IconButton @click="setExpenseType('Exceptional')"
        ><exceptional-icon
      /></IconButton>
    </div>

    <MoneyInput :onUpdate="setValue" />

    <AccountsSelector :types="['Cash', 'CreditCard']" :owner="accountOwner" />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import {
  ShoppingBagOutlined as ShoppingIcon,
  FastfoodOutlined as FoodIcon,
  CommuteOutlined as CommuteIcon,
  WarningAmberSharp as ExceptionalIcon
} from '@vicons/material';
import IconButton from './IconButton.vue';
import MoneyInput from './MoneyInput.vue';
import AccountsSelector from './AccountsSelector.vue';
import { TransactionType } from '@/models/transaction';
import { Money } from '@/models/common';
import { globalState } from '@/App.vue';

@Options({
  components: {
    ShoppingIcon,
    IconButton,
    FoodIcon,
    CommuteIcon,
    ExceptionalIcon,
    MoneyInput,
    AccountsSelector
  }
})
export default class AddingExpense extends Vue {
  expenseType: TransactionType | undefined = undefined;
  value: Money | undefined = undefined;

  setExpenseType(newType: keyof typeof TransactionType) {
    this.expenseType = TransactionType[newType];
  }

  setValue(value: string) {
    this.value = Money.fromStr(value);
  }

  get accountOwner() {
    return globalState.user;
  }
}
</script>

<style scoped>
.expense-type-selector {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
