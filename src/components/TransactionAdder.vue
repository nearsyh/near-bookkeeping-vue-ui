<template>
  <n-drawer
    class="transaction-adding-dialog"
    :show="addingType != 'none'"
    height="50%"
    style="border-radius: 10px 10px 0px 0px"
    placement="bottom"
    :on-update:show="
      show => {
        if (!show) {
          hideAdder();
        }
      }
    "
  >
    <n-drawer-content :title="dialogTitle()" closable>
      <AddingExpense
        v-if="addingType == 'expense'"
        @submitted="onSubmitted"
        @submitting="onSubmitting"
        @cancelled="hideAdder()"
      />
      <AddingInvestment
        v-if="addingType == 'investment'"
        @submitted="onSubmitted"
        @submitting="onSubmitting"
        @cancelled="hideAdder()"
      />
      <AddingOther
        v-if="addingType == 'other'"
        @submitted="onSubmitted"
        @submitting="onSubmitting"
        @cancelled="hideAdder()"
      />
    </n-drawer-content>
  </n-drawer>
  <div class="transaction-adder">
    <div class="transaction-adding-buttons">
      <div class="adding-menu" v-if="isExpanded">
        <IconButton
          class="add-button"
          shape="circle"
          size="20"
          v-on:click="addingType = 'expense'"
          ><expense-icon
        /></IconButton>
        <IconButton
          class="add-button"
          shape="circle"
          size="20"
          v-on:click="addingType = 'investment'"
          ><investment-icon
        /></IconButton>
        <IconButton
          class="add-button"
          shape="circle"
          size="20"
          v-on:click="addingType = 'other'"
          ><other-icon
        /></IconButton>
      </div>
      <div class="adding-menu-toggle">
        <IconButton
          shape="circle"
          size="20"
          v-on:click="
            e => {
              isExpanded = !isExpanded;
              addingType = 'none';
            }
          "
        >
          <add-icon v-if="!isExpanded" />
          <close-icon v-else />
        </IconButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { NSpace, NButton, NIcon, NDrawer, NDrawerContent } from 'naive-ui';
import IconButton from './IconButton.vue';
import {
  AddSharp as AddIcon,
  CloseSharp as CloseIcon,
  AttachMoneySharp as ExpenseIcon,
  MoreHorizSharp as OtherIcon
} from '@vicons/material';
import { FundOutlined as InvestmentIcon } from '@vicons/antd';
import AddingExpense from './AddingExpense.vue';
import AddingInvestment from './AddingInvestment.vue';
import AddingOther from './AddingOther.vue';
import { globalState } from '@/App.vue';
import { getTransactions } from '@/lib/fetcher';
import { getBalance } from '@/lib/connector';
import { Transaction } from '@/models/transaction';

@Options({
  components: {
    NButton,
    NIcon,
    NSpace,
    NDrawer,
    NDrawerContent,
    AddIcon,
    CloseIcon,
    ExpenseIcon,
    InvestmentIcon,
    OtherIcon,
    IconButton,
    AddingExpense,
    AddingInvestment,
    AddingOther
  }
})
export default class TransactionAdder extends Vue {
  isExpanded: boolean = false;
  addingType: 'expense' | 'investment' | 'other' | 'none' = 'none';

  dialogTitle() {
    switch (this.addingType) {
      case 'expense':
        return '新的支出';
      case 'investment':
        return '新的投资';
      case 'other':
        return '其他';
      default:
        return '';
    }
  }

  async onSubmitting() {
    this.hideAdder();
  }

  async onSubmitted(transaction: Transaction) {
    globalState.transactions.add(transaction);
    globalState.balance.addTransaction(transaction);
    getTransactions().then(list => {
      globalState.transactions = list;
    });
    getBalance().then(balance => {
      globalState.balance = balance;
    });
  }

  hideAdder() {
    this.addingType = 'none';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.transaction-adder {
  position: fixed;
  z-index: 10;
  bottom: 0px;
  right: 0px;
}

.transaction-adding-dialog {
  width: 100%;
  height: 100%;
  border: 2px solid black;
  border-radius: 2px;
}

.transaction-adding-buttons {
  position: fixed;
  z-index: 20;
  bottom: 40px;
  right: 40px;
}

.adding-menu {
  display: flex;
  flex-direction: column;
}

.add-button {
  margin-bottom: 15px;
}

.n-button {
  width: 50px;
  height: 50px;
  background-color: #f1f1f1 !important;
}
</style>
