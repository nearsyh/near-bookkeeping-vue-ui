<template>
  <div class="adding-expense">
    <div class="expense-type-selector">
      <IconButton
        @click="setExpenseType('Food')"
        :selected="expenseTypeStr === 'Food'"
        ><food-icon
      /></IconButton>
      <IconButton
        @click="setExpenseType('Shopping')"
        :selected="expenseTypeStr === 'Shopping'"
        ><shopping-icon
      /></IconButton>
      <IconButton
        @click="setExpenseType('Commute')"
        :selected="expenseTypeStr === 'Commute'"
        ><commute-icon
      /></IconButton>
      <IconButton
        @click="setExpenseType('Exceptional')"
        :selected="expenseTypeStr === 'Exceptional'"
        ><exceptional-icon
      /></IconButton>
    </div>

    <AccountsSelector
      :types="['Cash', 'CreditCard']"
      :owner="accountOwner"
      title="付款账户"
      :onUpdate="setAccountId"
    />
    <MoneyInput :onUpdate="setValue" />

    <div class="submit-buttons">
      <n-button type="warning" @click="cancel()">取消</n-button>
      <n-button type="primary" @click="submit()">确定</n-button>
    </div>
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
import { NButton, NSpace, NRadioGroup, NRadioButton } from 'naive-ui';
import { addTransaction } from '@/lib/connector';
import { AccountId } from '@/models/account';

@Options({
  components: {
    ShoppingIcon,
    IconButton,
    FoodIcon,
    CommuteIcon,
    ExceptionalIcon,
    MoneyInput,
    AccountsSelector,
    NButton,
    NSpace,
    NRadioGroup,
    NRadioButton
  }
})
export default class AddingExpense extends Vue {
  expenseTypeStr: keyof typeof TransactionType = 'Food';
  value: Money | undefined = undefined;
  selectedAccountId: AccountId | undefined = undefined;

  setExpenseType(newType: keyof typeof TransactionType) {
    this.expenseTypeStr = newType;
  }

  get expenseType(): TransactionType {
    return TransactionType[this.expenseTypeStr];
  }

  setValue(value: string) {
    this.value = Money.fromStr(value);
  }

  setAccountId(accountId: AccountId) {
    this.selectedAccountId = accountId;
  }

  get accountOwner() {
    return globalState.user;
  }

  async submit() {
    if (this.value === undefined) {
      alert('金额输入不正确');
      return;
    }
    if (this.expenseType === undefined) {
      alert('请选择支出类型');
      return;
    }
    if (this.selectedAccountId === undefined) {
      alert('请选择支出账户');
      return;
    }
    const addedTransaction = await addTransaction(
      globalState.user,
      '', // TODO: add note
      this.expenseType!,
      this.value.toStr(),
      this.selectedAccountId!,
      globalState.accounts.expenseAccountId()
    );
    this.$emit('submitted', addedTransaction);
  }

  cancel() {
    this.$emit('cancelled');
  }
}
</script>

<style scoped>
.expense-type-selector {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.submit-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.adding-expense {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
</style>
