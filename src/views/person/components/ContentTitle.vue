<template>
  <div class="content-title-box">
    <h1
      >{{ title }}
      <span v-if="tips" class="tips">{{ tips }}</span>
    </h1>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';

  interface TTitle {
    title: string;
  }
  withDefaults(defineProps<TTitle>(), {
    title: ''
  });

  const tips = computed(() => {
    const { userInfo } = appStore.useUserInfoStore;
    if (userInfo.auth && userInfo.auth.accountStatus && userInfo.auth.accountStatus === 2) {
      return '（账号已被永久封禁）';
    } else {
      return '';
    }
  });
</script>
<style lang="scss" scpoed>
  .content-title-box {
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
    h1 {
      font-size: 22px;
      height: 40px;
    }
    .tips {
      color: red;
      font-size: 16px;
    }
  }
</style>
