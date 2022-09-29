<!-- 自定义创建的模板数据 -->
<template>
  <div ref="customContentPdf" class="content-box">
    <!-- 传统布局 -->
    <template v-if="resumeJsonNewStore.LAYOUT === 'classical'">
      <div
        v-for="(element, index) in resumeJsonNewStore.COMPONENTS"
        :key="index"
        class="list-group-item"
      >
        <model-box :components="MaterialComponents" :item="element"></model-box>
      </div>
    </template>

    <!-- 左右两列布局 -->
    <template v-else-if="resumeJsonNewStore.LAYOUT === 'leftRight'">
      <div class="left-box">
        <div v-for="(element, index) in leftList" :key="index" class="list-group-item">
          <model-box :components="MaterialComponents" :item="element"></model-box>
        </div>
      </div>
      <div class="right-box">
        <div v-for="(element, index) in rightList" :key="index" class="list-group-item">
          <model-box :components="MaterialComponents" :item="element"></model-box>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import ModelBox from './ModelBox.vue';
  import { IMATERIALITEM } from '@/interface/material';
  import MaterialComponents from '@/utils/registerMaterialCom'; // 所有物料组件
  defineOptions({ name: 'onlinePreview' });
  const emit = defineEmits(['contentHeightChange']);
  // 生命周期函数
  onMounted(() => {
    changeHeight();
  });

  // store相关数据
  const { resumeJsonNewStore } = appStore.useResumeJsonNewStore;

  // 监听内容高度发生变化
  const customContentPdf = ref<any>(null);
  let observer: ResizeObserver | null = null;
  let height = 0;
  const changeHeight = () => {
    observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        height = (entry.target as HTMLElement).offsetHeight;
        console.log('内容高度发生变化', height);
        emit('contentHeightChange', height);
      }
    });
    observer.observe(customContentPdf.value); // 监听元素
  };

  /**
   * 左右两列布局
   */
  // 左侧列表
  const leftList = ref<any>([]);
  const rightList = ref<any>([]);
  if (resumeJsonNewStore.LAYOUT === 'leftRight') {
    leftList.value = resumeJsonNewStore.COMPONENTS.filter((item) => item.layout === 'left');
    // 右侧列表
    rightList.value = resumeJsonNewStore.COMPONENTS.filter((item) => item.layout === 'right');
  }

  watch(
    () => leftList.value,
    () => {
      leftList.value.forEach((item: IMATERIALITEM) => {
        item.layout = 'left';
      });
      resumeJsonNewStore.COMPONENTS = leftList.value.concat(rightList.value);
      console.log('最新designJsonStore', resumeJsonNewStore.COMPONENTS, leftList.value);
    },
    {
      deep: true
    }
  );
  watch(
    () => rightList.value,
    () => {
      rightList.value.forEach((item: IMATERIALITEM) => {
        item.layout = 'right';
      });
      resumeJsonNewStore.COMPONENTS = leftList.value.concat(rightList.value);
      console.log('最新designJsonStore', resumeJsonNewStore.COMPONENTS, rightList.value);
    },
    {
      deep: true
    }
  );
</script>
<style lang="scss" scoped>
  .content-box {
    // position: relative;
    .dragArea {
      min-width: 820px;
      min-height: 300px;
      width: 820px;
      min-height: 1160px;
      background-color: #fff;
      box-sizing: border-box;
      position: relative;
      z-index: 0;
    }
    .left-box {
      width: v-bind('resumeJsonNewStore.GLOBAL_STYLE.leftWidth');
      box-sizing: border-box;
      background-color: v-bind('resumeJsonNewStore.GLOBAL_STYLE.leftThemeColor');
      min-height: 1160px;
      position: absolute;
      height: 100%;
      .left-drag-area {
        min-height: 1160px;
        width: 100%;
      }
    }
    .right-box {
      min-height: 1160px;
      width: v-bind('resumeJsonNewStore.GLOBAL_STYLE.rightWidth');
      margin-left: v-bind('resumeJsonNewStore.GLOBAL_STYLE.leftWidth');
      background-color: v-bind('resumeJsonNewStore.GLOBAL_STYLE.rightThemeColor');
      .right-drag-area {
        min-height: 1160px;
        width: 100%;
      }
    }
  }
</style>
