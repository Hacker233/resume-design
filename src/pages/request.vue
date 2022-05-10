<template>
  <h2> 这里是request请求页面 </h2>
  <br />
  <router-link to="/">点击跳转至首页</router-link>
  <button @click="requestRes()"></button>
</template>
<script lang="ts" setup>
  import request from '@/utils/axios';
  import API from '@/api';

  const requestRes = async () => {
    let result = await request({
      url: '/api/xxx',
      method: 'get'
    });

    console.log(result);
  };

  const requestResAPI = async () => {
    let result = await API.login('zhangsan', '123456');
    console.log(result);
  };
</script>
