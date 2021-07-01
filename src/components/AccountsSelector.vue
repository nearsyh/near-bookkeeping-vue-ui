<template>
  <div class="accounts-selector">
    <div class="account-title" v-if="title !== ''">
      {{ title }}
    </div>
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
    owners: Array,
    onUpdate: Function,
    title: String
  }
})
export default class AccountsSelector extends Vue {
  types: (keyof typeof AccountType)[] = [];
  owners: string[] | undefined = [];
  accountId: number | null = null;
  eligibleAccounts: Account[] = [];
  onUpdate!: Function;

  beforeCreate() {
    const accountTypes = this.types.map(type => AccountType[type]);
    this.eligibleAccounts =
      this.owners === undefined
        ? globalState.accounts.withTypesAndOwner(accountTypes, [])
        : globalState.accounts.withTypesAndOwner(accountTypes, this.owners);
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

<style scoped>
.accounts-selector {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.account-title {
  width: 25%;
}
</style>
