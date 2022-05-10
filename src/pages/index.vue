<template>
  <img alt="Vue logo" src="./../assets/logo.png" />
  <el-button>我是element按钮</el-button>
  <UsePinia />
  <br />
  <router-link to="/login">点击跳转至login</router-link>
  <br /><br />
  <router-link to="/vueUse">点击跳转至vueUse页面</router-link>
  <br /><br />
  <router-link to="/request">点击跳转至request请求页面</router-link>
</template>

<script lang="ts" setup>
  import UsePinia from '@/components/UsePinia.vue';
</script>
