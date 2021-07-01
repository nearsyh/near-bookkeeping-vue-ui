<template>
  <Button :shape="shape" :selected="selected">
    <n-icon :size="size">
      <slot></slot>
    </n-icon>
  </Button>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import Button from './Button.vue';
import { NIcon } from 'naive-ui';

@Options({
  components: {
    NIcon,
    Button
  },
  props: {
    shape: String,
    selected: Boolean,
    size: String
  }
})
export default class IconButton extends Vue {
  shape: String = 'circle';
  selected: boolean = false;
  size: String = '';
}
</script>

<style scoped></style>
