<template>
  <div class="template-select-box" ref="templateRef">
    <div class="title">
      <h1>免费模板 + 用心设计</h1>
      <p>用心设计每一套模板，适合各行各业从业者</p>
    </div>
    <!-- 模板列表 -->
    <div class="card-list">
      <template v-for="(item, index) in templateList">
        <template-card :cardData="item" @toDesign="toDesign"> </template-card>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
  import templateList from '@/template';
  import TemplateCard from './TemplateCard.vue';
  import IntroduceTitleVue from './IntroduceTitle.vue';
  import { ITempList } from '@/template/type';
  import { useRouter } from 'vue-router';
  import { onUnmounted, ref } from 'vue';
  import { closeGlobalLoading, openGlobalLoading } from '@/utils/common';
  import { useAuthStore } from '@/store/auth';

  // 跳转至设计页面
  const authStore = useAuthStore();
  const router = useRouter();
  const toDesign = (item: ITempList) => {
    if (authStore.isLogin) {
      openGlobalLoading(); // 等待动画层
    }

    router.push({
      path: '/designer',
      query: {
        id: item.id,
        name: item.name
      }
    });
  };

  // 出现在可视区
  const templateRef = ref<any>(null);
  const scrollIntoView = () => {
    templateRef.value.scrollIntoView({ behavior: 'smooth' });
  };
  defineExpose({
    scrollIntoView
  });

  // 页面销毁
  onUnmounted(() => {
    closeGlobalLoading(); // 关闭全局等待层
  });
</script>
<style lang="scss">
  .template-select-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 750px;
    .card-list {
      display: flex;
    }
  }
</style>
