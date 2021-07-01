<template>
  <div class="adding-other">
    <div class="type-selector">
      <n-select
        v-model:value="transactionType"
        :options="allOptions"
      ></n-select>
    </div>

    <div id="accounts">
      <AccountsSelector
        :types="fromAccountTypes"
        :onUpdate="setFromAccountId"
        :owners="fromAccountOwner"
        title=""
      />
      <n-icon size="20"><arrow-icon /></n-icon>
      <AccountsSelector
        :types="toAccountTypes"
        :onUpdate="setToAccountId"
        :owners="[]"
        title=""
      />
    </div>
    <MoneyInput :onUpdate="setValue" />

    <div class="submit-buttons">
      <n-button type="warning" @click="cancel()">取消</n-button>
      <n-button type="primary" @click="submit()">确定</n-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { ArrowDownwardRound as ArrowIcon } from '@vicons/material';
import IconButton from './IconButton.vue';
import MoneyInput from './MoneyInput.vue';
import AccountsSelector from './AccountsSelector.vue';
import {
  allTransactionTypes,
  TransactionType,
  transactionTypeName
} from '@/models/transaction';
import { Money } from '@/models/common';
import { globalState } from '@/App.vue';
import { NButton, NSelect, NIcon } from 'naive-ui';
import { addTransaction } from '@/lib/connector';
import { AccountId } from '@/models/account';
import { getUser } from '@/lib/common';

@Options({
  components: {
    ArrowIcon,
    IconButton,
    MoneyInput,
    AccountsSelector,
    NButton,
    NSelect,
    NIcon
  }
})
export default class AddingOther extends Vue {
  transactionType: TransactionType = TransactionType.Salary;
  value: Money | undefined = undefined;
  fromAccountId: AccountId | undefined = undefined;
  toAccountId: AccountId | undefined = undefined;

  get allOptions(): any[] {
    return allTransactionTypes().map(type => {
      return {
        label: transactionTypeName(type),
        value: type
      };
    });
  }

  get fromAccountOwner() {
    return [getUser(), '家庭'];
  }

  setValue(value: string) {
    this.value = Money.fromStr(value);
  }

  setFromAccountId(accountId: AccountId) {
    this.fromAccountId = accountId;
  }

  setToAccountId(accountId: AccountId) {
    this.toAccountId = accountId;
  }

  get fromAccountTypes() {
    return [
      'Investment',
      'Cash',
      'Deposit',
      'CreditCard',
      'Income',
      'Loan',
      'OnTheFly'
    ];
  }

  get toAccountTypes() {
    return [
      'Investment',
      'Cash',
      'Deposit',
      'CreditCard',
      'Expense',
      'Loan',
      'OnTheFly'
    ];
  }

  get accountOwner() {
    return globalState.user;
  }

  async submit() {
    if (this.value === undefined) {
      alert('金额输入不正确');
      return;
    }
    if (this.transactionType === undefined) {
      alert('请选择类型');
      return;
    }
    if (this.fromAccountId === undefined) {
      alert('请选择转出账户');
      return;
    }
    if (this.toAccountId === undefined) {
      alert('请选择转入账户');
      return;
    }
    const addedTransaction = await addTransaction(
      getUser(),
      '', // TODO: add note
      this.transactionType,
      this.value.toStr(),
      this.fromAccountId!,
      this.toAccountId!
    );
    this.$emit('submitted', addedTransaction);
  }

  cancel() {
    this.$emit('cancelled');
  }
}
</script>

<style scoped>
.submit-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.adding-other {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

#accounts {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
