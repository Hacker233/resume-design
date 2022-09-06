<template>
  <div class="person-detail-box">
    <el-form :model="form" label-width="50px" size="default" label-position="left">
      <el-form-item label="昵 称:">
        <!-- <el-input v-model="form.name" /> -->
        <p>{{ form.name }}</p>
      </el-form-item>
      <el-form-item label="邮 箱:">
        <!-- <el-input v-model="form.name" /> -->
        <p>{{ form.email }}</p>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';

  // 查询用户信息
  const { getAndUpdateUserInfo } = appStore.useUserInfoStore;
  getAndUpdateUserInfo();
  const form = reactive(appStore.useUserInfoStore.userInfo);
</script>
