<template>
  <div class="user-selector">
    <div class="users">
      <div class="user">
        <div class="avatar" @click="onSelectUser('傻爸')">
          <img :src="require('@/assets/near.jpg')" />
        </div>
      </div>
      <div class="user">
        <div class="avatar" @click="onSelectUser('傻胖')">
          <img :src="require('@/assets/pang.jpg')" />
        </div>
      </div>
    </div>
    你是傻胖还是傻爸
  </div>
</template>

<script lang="ts">
import { globalState } from '@/App.vue';
import { getUser, setUser } from '@/lib/common';
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class UserSelector extends Vue {
  onSelectUser(user: string) {
    setUser(user);
    globalState.user = getUser();
  }
}
</script>

<style scoped>
.user-selector {
  padding: 0px 40px;
  margin-top: 40vh;
}

.users {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20vh;
}

.avatar {
  width: 100px;
  height: 100px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}

.avatar img {
  width: 100%;
  height: 100%;
}
</style>
