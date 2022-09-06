<template>
  <div class="right-content-box">
    <!-- 菜单标题 -->
    <content-title-vue title="个人信息"></content-title-vue>
    <div class="router-box">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import ContentTitleVue from './ContentTitle.vue';
</script>
<style lang="scss" scoped>
  .right-content-box {
    flex: 1;
    min-height: 300px;
    margin: 270px 0 0px 30px;
    box-sizing: border-box;
    .router-box {
      padding: 20px 0;
    }
  }
</style>