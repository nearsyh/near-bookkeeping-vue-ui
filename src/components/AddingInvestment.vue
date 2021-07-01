<template>
  <div class="adding-investment">
    <div class="type-selector">
      <Button
        @click="setInvestmentType('Investment')"
        :selected="investmentTypeStr === 'Investment'"
        >投资</Button
      >
      <Button
        @click="setInvestmentType('InvestmentIncome')"
        :selected="investmentTypeStr === 'InvestmentIncome'"
        >收益</Button
      >
      <Button
        @click="setInvestmentType('Redemption')"
        :selected="investmentTypeStr === 'Redemption'"
        >赎回</Button
      >
    </div>

    <!-- For investment income, we know the from account is 'Income' -->
    <div id="accounts">
      <AccountsSelector
        :types="fromAccountTypes"
        :owners="[accountOwner]"
        :onUpdate="setFromAccountId"
        title=""
        v-if="investmentTypeStr !== 'InvestmentIncome'"
      />
      <n-icon size="20"><arrow-icon /></n-icon>
      <AccountsSelector
        :types="toAccountTypes"
        :owners="[accountOwner]"
        :onUpdate="setToAccountId"
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
import Button from './Button.vue';
import MoneyInput from './MoneyInput.vue';
import AccountsSelector from './AccountsSelector.vue';
import { TransactionType } from '@/models/transaction';
import { Money } from '@/models/common';
import { NButton, NSpace, NIcon } from 'naive-ui';
import { addTransaction } from '@/lib/connector';
import { AccountId } from '@/models/account';
import { getUser } from '@/lib/common';

@Options({
  components: {
    Button,
    MoneyInput,
    AccountsSelector,
    NButton,
    NSpace,
    NIcon,
    ArrowIcon
  }
})
export default class AddingExpense extends Vue {
  investmentTypeStr: keyof typeof TransactionType = 'Investment';
  value: Money | undefined = undefined;
  fromAccountId: AccountId | undefined = undefined;
  toAccountId: AccountId | undefined = undefined;

  setInvestmentType(newType: keyof typeof TransactionType) {
    this.investmentTypeStr = newType;
  }

  get investmentType(): TransactionType {
    return TransactionType[this.investmentTypeStr];
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
    switch (this.investmentType) {
      case TransactionType.Investment:
        return ['Cash'];
      case TransactionType.Redemption:
        return ['Investment'];
      default:
        return [];
    }
  }

  get toAccountTypes() {
    switch (this.investmentType) {
      case TransactionType.Investment:
        return ['Investment'];
      case TransactionType.Redemption:
        return ['Cash'];
      case TransactionType.InvestmentIncome:
        return ['Investment', 'Cash'];
      default:
        return [];
    }
  }

  get accountOwner() {
    return getUser();
  }

  async submit() {
    if (this.value === undefined) {
      alert('金额输入不正确');
      return;
    }
    if (this.investmentType === undefined) {
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
      this.investmentType!,
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
.type-selector {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.submit-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.adding-investment {
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
