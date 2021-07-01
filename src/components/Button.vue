<template>
  <n-button
    :circle="shape == 'circle'"
    :round="shape == 'round'"
    :type="type"
    :ghost="ghost"
  >
    <slot></slot>
  </n-button>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { NButton } from 'naive-ui';

@Options({
  components: {
    NButton
  },
  props: {
    shape: String,
    selected: Boolean
  }
})
export default class Button extends Vue {
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
