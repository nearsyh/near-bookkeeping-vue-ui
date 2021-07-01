<template>
  <div class="transaction-item">
    <div class="transaction-creator">
      <img :src="require(`@/assets/` + avatar)" />
    </div>
    <div class="transaction-details">
      <div class="header row">
        <span class="transaction-date">{{ date }}</span>
        <span class="transaction-type">{{ transactionType }}</span>
      </div>
      <div class="row">
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
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Transaction } from '@/models/transaction';
import { globalState } from '@/App.vue';
import { NIcon } from 'naive-ui';
import { ArrowDownwardRound as ArrowIcon } from '@vicons/material';

@Options({
  props: {
    transaction: Transaction
  },
  components: {
    NIcon,
    ArrowIcon
  }
})
export default class TransactionItem extends Vue {
  transaction!: Transaction;

  get avatar(): String {
    return this.transaction.creator === '傻爸' ? 'near.jpg' : 'pang.jpg';
  }

  get title(): String {
    return 'title';
  }

  get date(): String {
    return `${this.transaction.month}.${this.transaction.date}`;
  }

  get transactionType(): String {
    return this.transaction.transactionTypeName();
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
  padding: 10px 10px;
  margin: 10px 0px;
  display: flex;
  align-items: center;
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
</style>
