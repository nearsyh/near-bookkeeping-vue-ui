<template>
  <div class="money-input">
    <n-input
      placeholder="0"
      v-model:value="value"
      :on-update:value="
        newValue => {
          value = newValue;
          onUpdate(newValue);
        }
      "
    >
      <template #suffix>元</template>
    </n-input>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { NInput } from 'naive-ui';

@Options({
  components: {
    NInput
  },
  props: {
    onUpdate: Function
  }
})
export default class MoneyInput extends Vue {
  value = '';
}
</script>

<style scoped></style>
