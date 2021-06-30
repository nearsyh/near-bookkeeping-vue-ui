<template>
  <div class="transaction-adder">
    <n-drawer
      class="transaction-adding-dialog"
      :show="addingType != 'none'"
      height="50%"
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
          @cancelled="hideAdder()"
        />
        <AddingInvestment
          v-if="addingType == 'investment'"
          @submitted="onSubmitted"
          @cancelled="hideAdder()"
        />
      </n-drawer-content>
    </n-drawer>
    <div class="transaction-adding-buttons">
      <div class="adding-menu" v-if="isExpanded">
        <IconButton
          class="add-button"
          shape="circle"
          v-on:click="addingType = 'expense'"
          ><expense-icon
        /></IconButton>
        <IconButton
          class="add-button"
          shape="circle"
          v-on:click="addingType = 'investment'"
          ><investment-icon
        /></IconButton>
        <IconButton
          class="add-button"
          shape="circle"
          v-on:click="addingType = 'other'"
          ><other-icon
        /></IconButton>
      </div>
      <div class="adding-menu-toggle">
        <IconButton
          shape="circle"
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
import { globalState } from '@/App.vue';
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
    AddingInvestment
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

  async onSubmitted(addedTransaction: Transaction) {
    globalState.transactions.add(addedTransaction);
    this.hideAdder();
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
  height: 50%;
  width: 100%;
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
  margin-bottom: 10px;
}
</style>
