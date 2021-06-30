<template>
  <div class="adding-expense">
    Adding Expense
  </div>
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
export default class AddingExpense extends Vue {
}
</script>

<style scoped></style>
