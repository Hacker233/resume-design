<template>
  <div class="left-person-card">
    <!-- 头像 -->
    <div class="avatar-box">
      <el-avatar
        v-if="appStore.useUserInfoStore.userInfo.photos.profilePic.url"
        :size="70"
        :src="appStore.useUserInfoStore.userInfo.photos.profilePic.url"
      />
      <el-avatar :size="70" v-else>
        {{ appStore.useUserInfoStore.userInfo.name.split('')[0] }}
      </el-avatar>
    </div>
    <!-- 菜单 -->
    <person-menu-vue></person-menu-vue>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import PersonMenuVue from './PersonMenu.vue';
</script>
<style lang="scss" scoped>
  .left-person-card {
    width: 300px;
    min-height: 400px;
    border-radius: 5px;
    box-shadow: 0 5px 21px 0 rgb(78 78 78 / 25%);
    background-color: rgba(#fff, 0.5);
    z-index: 2;
    margin-top: 90px;
    .avatar-box {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 140px;
    }
  }
</style>
