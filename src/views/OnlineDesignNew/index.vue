<template>
  <div ref="scrollContainer" class="design-bottom-box">
    <!-- 画布区域 -->
    <div :key="refreshUuid" ref="designerRef" class="designer">
      <template v-for="(page, index) in HJSchemaJsonStore.componentsTree" :key="page.id">
        <PageComponent :component="page" />
        <div v-if="index < HJSchemaJsonStore.componentsTree.length - 1" class="page-divider"></div>
      </template>
    </div>
    <!-- 添加一页 -->
    <div class="add-page-box">
      <div class="add-page-btn" @click="addOnePage">添加一页</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import PageComponent from './components/designComponent/PageComponent.vue';
  import { storeToRefs } from 'pinia';
  import appStore from '@/store';

  const { HJSchemaJsonStore } = storeToRefs(appStore.useOnlineDesignNewJsonStore);

  const refreshUuid = ref(Date.now());

  const scrollContainer = ref<HTMLElement | null>(null);

  const handleAutoScroll = (event: MouseEvent) => {
    if (!scrollContainer.value) return;

    const rect = scrollContainer.value.getBoundingClientRect();
    const threshold = 50; // 滚动触发区高度
    const scrollSpeed = 5; // 滚动速度

    if (event.clientY < rect.top + threshold) {
      // 向上滚动
      scrollContainer.value.scrollTop -= scrollSpeed;
    } else if (event.clientY > rect.bottom - threshold) {
      // 向下滚动
      scrollContainer.value.scrollTop += scrollSpeed;
    }
  };

  onMounted(() => {
    // 监听拖拽过程中的鼠标移动事件
    window.addEventListener('mousemove', handleAutoScroll);
  });

  onBeforeUnmount(() => {
    // 清除事件监听器
    window.removeEventListener('mousemove', handleAutoScroll);
  });

  const addOnePage = () => {
    // 你的添加页面逻辑
  };
</script>

<style scoped>
  .design-bottom-box {
    height: 100%; /* 根据实际需求设置高度 */
    overflow-y: auto;
    position: relative;
    height: 100%;
    overflow-y: auto;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .designer {
    display: flex;
    flex-direction: column;
  }

  .page-divider {
    height: 10px;
    background-color: #ccc;
  }

  .add-page-box {
    margin-top: 10px;
    text-align: center;
  }

  .add-page-btn {
    cursor: pointer;
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border-radius: 5px;
  }
</style>
