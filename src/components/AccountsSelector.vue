<template>
  <div class="accounts-selector">
    <n-select
      v-model:value="accountId"
      :options="eligibleAccountAsOptions"
      :on-update:value="
        newValue => {
          accountId = newValue;
          onUpdate(newValue);
        }
      "
    ></n-select>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { NSelect } from 'naive-ui';
import { Account, AccountType } from '@/models/account';
import { globalState } from '@/App.vue';

@Options({
  components: {
    NSelect
  },
  props: {
    types: Array,
    owner: String,
    onUpdate: Function
  }
})
export default class AccountsSelector extends Vue {
  types: (keyof typeof AccountType)[] = [];
  owner: string = '';
  accountId: number | null = null;
  eligibleAccounts: Account[] = [];
  onUpdate!: Function;

  beforeCreate() {
    const accountTypes = this.types.map(type => AccountType[type]);
    this.eligibleAccounts = globalState.accounts.withTypesAndOwner(
      accountTypes,
      this.owner
    );
    this.accountId = this.eligibleAccounts[0].id;
    this.onUpdate(this.accountId);
  }

  get eligibleAccountAsOptions(): any[] {
    return this.eligibleAccounts.map(account => {
      return {
        label: account.fullName(),
        value: account.id
      };
    });
  }
}
</script>
