<template>
  <!-- <n-message-provider> -->
  <div class="adding-expense">
    <div class="expense-type-selector">
      <IconButton
        @click="setExpenseType('Food')"
        :selected="expenseTypeStr === 'Food'"
        size="20"
        ><food-icon
      /></IconButton>
      <IconButton
        @click="setExpenseType('Shopping')"
        :selected="expenseTypeStr === 'Shopping'"
        size="20"
        ><shopping-icon
      /></IconButton>
      <IconButton
        @click="setExpenseType('Commute')"
        :selected="expenseTypeStr === 'Commute'"
        size="20"
        ><commute-icon
      /></IconButton>
      <IconButton
        @click="setExpenseType('Exceptional')"
        :selected="expenseTypeStr === 'Exceptional'"
        size="20"
        ><exceptional-icon
      /></IconButton>
    </div>

    <AccountsSelector
      :types="['Cash', 'CreditCard']"
      :owners="[accountOwner]"
      title="付款账户"
      :onUpdate="setAccountId"
    />
    <MoneyInput :onUpdate="setValue" />
    <NoteInput :onUpdate="setNote" />

    <div class="submit-buttons">
      <n-button type="warning" @click="cancel()">取消</n-button>
      <n-button type="primary" @click="submit()">确定</n-button>
    </div>
  </div>
  <!-- </n-message-provider> -->
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
import NoteInput from './NoteInput.vue';
import AccountsSelector from './AccountsSelector.vue';
import { TransactionType } from '@/models/transaction';
import { Money } from '@/models/common';
import { globalState } from '@/App.vue';
import {
  NButton,
  NSpace,
  NRadioGroup,
  NRadioButton,
  NMessageProvider,
  useMessage
} from 'naive-ui';
import { addTransaction } from '@/lib/connector';
import { AccountId } from '@/models/account';
import { getUser } from '@/lib/common';

@Options({
  components: {
    ShoppingIcon,
    IconButton,
    FoodIcon,
    CommuteIcon,
    ExceptionalIcon,
    MoneyInput,
    NoteInput,
    AccountsSelector,
    NButton,
    NSpace,
    NRadioGroup,
    NRadioButton,
    NMessageProvider
  }
})
export default class AddingExpense extends Vue {
  expenseTypeStr: keyof typeof TransactionType = 'Food';
  value: Money | undefined = undefined;
  note: string = '';
  selectedAccountId: AccountId | undefined = undefined;
  message = useMessage();

  setExpenseType(newType: keyof typeof TransactionType) {
    this.expenseTypeStr = newType;
  }

  get expenseType(): TransactionType {
    return TransactionType[this.expenseTypeStr];
  }

  setValue(value: string) {
    this.value = Money.fromStr(value);
  }

  setNote(note: string) {
    this.note = note;
  }

  setAccountId(accountId: AccountId) {
    this.selectedAccountId = accountId;
  }

  get accountOwner() {
    return getUser();
  }

  async submit() {
    if (this.value === undefined) {
      this.message.error('金额输入不正确');
      return;
    }
    if (this.expenseType === undefined) {
      this.message.error('请选择支出类型');
      return;
    }
    if (this.selectedAccountId === undefined) {
      this.message.error('请选择支出账户');
      return;
    }
    this.$emit('submitting');
    const addedTransaction = await addTransaction(
      getUser(),
      this.note || '',
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
