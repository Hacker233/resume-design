<template>
  <div class="qq-login-temp">
    <span>qq登录</span>
    <img src="@/assets/images/qq.png" alt="QQ登录" title="QQ登录" @click="qqLogin" />
  </div>
</template>
<script lang="ts" setup>
  import { qqLoginASync } from '@/http/api/user';
  const qqLogin = async () => {
    const params = {
      response_type: 'code',
      client_id: '102066932',
      redirect_uri: encodeURI('https://91huajian.cn/person'),
      state: 'hello'
    };
    const data = await qqLoginASync(params);
    console.log(data);
  };
</script>
<style lang="scss" scoped>
  .qq-login-temp {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 100%;
  }
</style>
