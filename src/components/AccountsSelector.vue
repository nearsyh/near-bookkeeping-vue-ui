<template>
  <div class="accounts-selector">
    <n-select
      v-model:value="accountId"
      :options="eligibleAccountAsOptions"
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
    owner: String
  }
})
export default class AccountsSelector extends Vue {
  types: (keyof typeof AccountType)[] = [];
  owner: string = '';
  accountId: number | null = null;
  eligibleAccounts: Account[] = [];

  beforeCreate() {
    const accountTypes = this.types.map(type => AccountType[type]);
    this.eligibleAccounts = globalState.accounts.withTypesAndOwner(
      accountTypes,
      this.owner
    );
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
