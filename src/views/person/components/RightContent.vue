<template>
  <div class="right-content-box">
    <div class="menu-title">
      <!-- 菜单标题 -->
      <content-title-vue v-if="showTitle" :title="(route.meta.title as string)"></content-title-vue>
    </div>
    <div class="router-box">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import ContentTitleVue from './ContentTitle.vue';

  const route = useRoute();
  const showTitle = computed(() => {
    return route.meta.showTitle;
  });
</script>
<style lang="scss" scoped>
  .right-content-box {
    flex: 1;
    min-height: 300px;
    margin: 270px 0 0px 30px;
    box-sizing: border-box;
    .router-box {
      padding: 0 0 20px 0;
    }
  }
</style>
