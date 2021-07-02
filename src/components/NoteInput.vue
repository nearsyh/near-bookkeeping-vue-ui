<template>
  <div class="note-input">
    <n-input
      placeholder="这条记录值得你多说两句嘛?"
      type="textarea"
      v-model:value="value"
      :on-update:value="
        newValue => {
          value = newValue;
          onUpdate(newValue);
        }
      "
    >
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
export default class NoteInput extends Vue {
  value = '';
}
</script>

<style scoped></style>
