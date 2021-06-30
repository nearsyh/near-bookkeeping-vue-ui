<template>
  <div class="transaction-adding-buttons">
    <div class="adding-menu" v-if="isExpanded">
      <Button class="add-button"><expense-icon /></Button>
      <Button class="add-button"><expense-icon /></Button>
      <Button class="add-button"><expense-icon /></Button>
    </div>
    <div class="adding-menu-toggle">
      <Button v-on:click="isExpanded = !isExpanded">
        <add-icon v-if="!isExpanded" />
        <close-icon v-else />
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { NSpace, NButton, NIcon } from 'naive-ui';
import Button from './Button.vue';
import { AddSharp as AddIcon, CloseSharp as CloseIcon } from '@vicons/material';
import { MoneyCheckAlt as ExpenseIcon } from '@vicons/fa';

@Options({
  components: {
    NButton,
    NIcon,
    NSpace,
    AddIcon,
    CloseIcon,
    ExpenseIcon,
    Button
  }
})
export default class TransactionAddingButtons extends Vue {
  isExpanded: boolean = false;
  isAdding: boolean = false;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.transaction-adding-buttons {
  position: fixed;
  z-index: 10;
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
