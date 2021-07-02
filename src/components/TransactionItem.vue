<template>
  <div class="transaction-item" @click="showNote = true && transaction.note !== ''">
    <div class="transaction-creator">
      <img :src="require(`@/assets/` + avatar)" />
    </div>
    <div class="transaction-details">
      <div class="header row">
        <div class="left">
          <span class="transaction-date">{{ date }}</span>
          <n-icon v-if="transaction.note !== ''" size="14"><note-icon /></n-icon>
        </div>
        <span class="transaction-type">{{ transactionType }}</span>
      </div>
      <div class="row" v-if="!isInitialization">
        <div class="transaction-direction">
          <span v-if="direction.length === 1" class="account">{{
            direction[0]
          }}</span>
          <div class="directions" v-else>
            <span class="account">{{ direction[0] }}</span>
            <n-icon size="10"><arrow-icon /></n-icon>
            <span class="account">{{ direction[1] }}</span>
          </div>
        </div>
        <span class="transaction-amount">{{ `￥${amount}` }}</span>
      </div>
    </div>
  </div>

  <n-drawer
    v-model:show="showNote"
    style="border-radius: 10px 10px 0px 0px"
    placement="bottom"
    height="25vh"
    class="transaction-note-drawer"
  >
    <n-drawer-content closable body-style="padding: 10px">
      <template #header>
        <span class="title">详情</span>
      </template>
      <template #default>
        <div class="note">
          {{ transaction.note }}
        </div>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Transaction, TransactionType } from '@/models/transaction';
import { globalState } from '@/App.vue';
import { NIcon, NDrawer, NDrawerContent } from 'naive-ui';
import {
  ArrowDownwardRound as ArrowIcon,
  NoteAltOutlined as NoteIcon
} from '@vicons/material';

@Options({
  props: {
    transaction: Transaction
  },
  components: {
    NIcon,
    NDrawer,
    NDrawerContent,
    ArrowIcon,
    NoteIcon
  }
})
export default class TransactionItem extends Vue {
  transaction!: Transaction;
  showNote = false;

  get avatar(): String {
    return this.transaction.creator === '傻爸' ? 'near.jpg' : 'pang.jpg';
  }

  get title(): String {
    const time = this.transaction.moment.format('YYYY-MM-DD HH:mm');
    return `${this.transactionType} @ ${time}`;
  }

  get date(): String {
    return `${this.transaction.month}.${this.transaction.date}`;
  }

  get transactionType(): String {
    return this.transaction.transactionTypeName();
  }

  get isInitialization(): boolean {
    return this.transaction.transactionType === TransactionType.Initialize;
  }

  get direction(): String[] {
    return this.transaction.direction(globalState.accounts);
  }

  get amount(): String {
    return this.transaction.amount().toStr();
  }
}
</script>

<style scoped>
.transaction-item {
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  padding: 10px 15px;
  margin: 10px 0px;
  display: flex;
  align-items: center;
}

.transaction-date {
  margin-right: 10px;
}

.header > .left {
  display: flex;
  align-items: center;
}

.left > .n-icon {
  margin-bottom: 3px;
}

.transaction-creator {
  width: 40px;
  height: 40px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}

.transaction-creator img {
  width: 100%;
  height: 100%;
}

.transaction-type {
  font-weight: bold;
}

.transaction-details {
  padding-left: 20px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.directions {
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-items: center;
}

.direction-accounts {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 16px;
  padding-left: 10px;
}

.note {
  font-size: 18px;
  color: #3e3e3e;
}
</style>
