<template>
  <n-button circle>
    <template #icon>
      <n-icon>
        <slot></slot>
      </n-icon>
    </template>
  </n-button>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { NButton, NIcon } from 'naive-ui';

@Options({
  components: {
    NButton,
    NIcon
  }
})
export default class Button extends Vue {}
</script>

<style scoped></style>
