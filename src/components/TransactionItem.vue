<template>
  <div class="transaction-item">
    <div class="transaction-creator">
      <img :src="require(`@/assets/` + avatar)" />
    </div>
    <div class="transaction-details">
      <div class="transaction-date">2020-12</div>
      <div>
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Transaction } from '@/models/transaction';

@Options({
  props: {
    transaction: Transaction
  }
})
export default class TransactionItem extends Vue {
  transaction!: Transaction;

  get avatar(): String {
    return this.transaction.creator === '傻爸' ? 'near.jpg' : 'pang.jpg';
  }

  get description(): String {
    return 'description';
  }
}
</script>

<style scoped>
.transaction-item {
  border: 2px solid black;
  border-radius: 4px;
  padding: 10px 40px;
  margin: 10px 0px;
  height: 60px;
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

.transaction-details {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
