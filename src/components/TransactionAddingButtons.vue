<template>
  <div class="transaction-adding-buttons">
    <div class="adding-menu-toggle">
      <n-space>
        <n-button circle v-on:click="isExpanded = !isExpanded">
          <template #icon>
            <n-icon>
              <add-icon v-if="!isExpanded" />
              <close-icon v-else />
            </n-icon>
          </template>
        </n-button>
      </n-space>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { NSpace, NButton, NIcon } from 'naive-ui';
import { AddSharp as AddIcon, CloseSharp as CloseIcon } from '@vicons/material';

@Options({
  components: {
    NButton,
    NIcon,
    NSpace,
    AddIcon,
    CloseIcon
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
</style>
