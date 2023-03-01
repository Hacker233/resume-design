<template>
  <div class="my-integral-box">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleChange">
      <el-tab-pane label="我的积分" name="myIntegral"> </el-tab-pane>
      <el-tab-pane label="积分记录" name="integralLog"> </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';

  const activeName = ref('myIntegral');
  const handleChange = () => {};

  // 查询用户积分信息
  const { getUserIntegralTotal } = appStore.useUserInfoStore;
  const { token } = appStore.useTokenStore;
  if (token) {
    getUserIntegralTotal();
  }
</script>
<style lang="scss" scoped>
  .my-integral-box {
    :deep(.el-tabs__content) {
      padding: 0;
    }
  }
</style>
