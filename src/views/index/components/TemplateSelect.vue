<template>
  <div ref="templateRef" class="template-select-box">
    <introduce-title-vue
      title="免费模板 + 用心设计"
      subtitle="用心设计每一套模板，适合各行各业从业者"
      title-color="#000"
      subtitle-color="#7f8b96"
    ></introduce-title-vue>
    <!-- 模板列表 -->
    <div class="card-list">
      <template v-for="(item, index) in templateList" :key="index">
        <template-card :card-data="item" @to-design="toDesign"> </template-card>
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
  import appStore from '@/store';

  // 跳转至设计页面
  const { resetResumeJson } = appStore.useResumeJsonNewStore;
  const { resetSelectModel } = appStore.useSelectMaterialStore;
  const router = useRouter();
  const toDesign = (item: ITempList) => {
    openGlobalLoading(); // 等待动画层
    resetResumeJson(); // 重置json数据
    resetSelectModel(); // 重置选中模块
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
