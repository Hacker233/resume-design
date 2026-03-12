<template>
  <div class="right-content">
    <!-- 页面标题 -->
    <div class="page-header" v-if="showTitle">
      <ContentTitleVue :title="(route.meta.title as string)" />
    </div>
    
    <!-- 内容区域 -->
    <div class="content-area">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  import ContentTitleVue from './ContentTitle.vue';

  const route = useRoute();
  const showTitle = computed(() => {
    return route.meta.showTitle;
  });
</script>
<style lang="scss" scoped>
  .right-content {
    flex: 1;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    min-height: 600px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    .page-header {
      padding: 24px 30px;
      border-bottom: 1px solid #f0f0f0;
      background: #fafafa;
      transition: background 0.3s ease;

      &:hover {
        background: #f5f7fa;
      }
    }

    .content-area {
      padding: 30px;
      min-height: 500px;

      @media (max-width: 768px) {
        padding: 20px;
      }
    }
  }

  @media (max-width: 1240px) {
    .right-content {
      width: 100%;
      margin-top: 20px;
    }
  }

  @media (max-width: 768px) {
    .right-content {
      min-height: 500px;

      .page-header {
        padding: 20px 20px;
      }

      .content-area {
        padding: 20px;
        min-height: 400px;
      }
    }
  }
</style>
