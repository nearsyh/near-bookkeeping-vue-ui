<template>
  <n-button
    :circle="shape == 'circle'"
    :round="shape == 'round'"
    :type="type"
    :ghost="ghost"
  >
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
  },
  props: {
    shape: String,
    selected: Boolean
  }
})
export default class IconButton extends Vue {
  shape: String = 'circle';
  selected: boolean = false;

  get type() {
    return this.selected ? 'primary' : 'default';
  }

  get ghost() {
    return this.selected;
  }
}
</script>

<style scoped></style>
