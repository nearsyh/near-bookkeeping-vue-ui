<template>
  <n-button :circle="shape == 'circle'" :round="shape == 'round'">
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
    shape: String
  }
})
export default class IconButton extends Vue {
  shape: String = 'circle';
}
</script>

<style scoped></style>
