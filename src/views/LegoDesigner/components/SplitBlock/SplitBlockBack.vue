<template>
  <div class="split-block-box" :style="{ top: pageIndex * 1210 + 'px' }">
    <!-- 左侧 -->
    <div class="split-left">
      <h3>第{{ pageIndex + 1 }}页</h3>
    </div>
    <!-- 右侧 -->
    <div class="split-right">
      <div :class="['icon-box', { disabled: pageIndex === 0 }]" title="上移" @click="up">
        <svg-icon icon-name="icon-shangyi" color="green" size="17px"></svg-icon>
      </div>
      <div
        :class="[
          'icon-box',
          'icon-shangyi',
          { disabled: pageIndex === HJSchemaJsonStore.componentsTree.length - 1 }
        ]"
        title="下移"
        @click="down"
      >
        <svg-icon icon-name="icon-shangyi" color="green" size="17px"></svg-icon>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';

  const emit = defineEmits(['pageExchange']);

  const props = defineProps<{
    pageIndex: number;
  }>();
  const { HJSchemaJsonStore } = storeToRefs(appStore.useLegoJsonStore);
  const { setUuid } = appStore.useUuidStore;
  // 上移
  const up = () => {
    if (props.pageIndex === 0) {
      return;
    }
    console.log('交换前', HJSchemaJsonStore.value.componentsTree, props.pageIndex);
    // 交换顺序
    swapArrayLocs(props.pageIndex, props.pageIndex - 1);
    emit('pageExchange', props.pageIndex - 1, props.pageIndex); // 新的pageIndex, 旧的pageIndex
    setUuid();
  };

  // 下移
  const down = () => {
    if (props.pageIndex === HJSchemaJsonStore.value.componentsTree.length - 1) {
      return;
    }
    console.log('交换前', HJSchemaJsonStore.value.componentsTree, props.pageIndex);
    // 交换顺序
    swapArrayLocs(props.pageIndex, props.pageIndex + 1);
    emit('pageExchange', props.pageIndex + 1, props.pageIndex); // 新的pageIndex, 旧的pageIndex
    setUuid();
  };

  // 交换顺序
  const swapArrayLocs = (index1: number, index2: number) => {
    const temp = HJSchemaJsonStore.value.componentsTree[index1];
    HJSchemaJsonStore.value.componentsTree[index1] = HJSchemaJsonStore.value.componentsTree[index2];
    HJSchemaJsonStore.value.componentsTree[index2] = temp;
    if (index1 < index2) {
      for (let i = 0; i < HJSchemaJsonStore.value.componentsTree[index1].children.length; i++) {
        HJSchemaJsonStore.value.componentsTree[index1].children[i].css.top =
          HJSchemaJsonStore.value.componentsTree[index1].children[i].css.top - 1160 - 50;
      }

      for (let i = 0; i < HJSchemaJsonStore.value.componentsTree[index2].children.length; i++) {
        HJSchemaJsonStore.value.componentsTree[index2].children[i].css.top =
          HJSchemaJsonStore.value.componentsTree[index2].children[i].css.top + 1160 + 50;
      }
    } else {
      for (let i = 0; i < HJSchemaJsonStore.value.componentsTree[index1].children.length; i++) {
        HJSchemaJsonStore.value.componentsTree[index1].children[i].css.top =
          HJSchemaJsonStore.value.componentsTree[index1].children[i].css.top + 1160 + 50;
      }

      for (let i = 0; i < HJSchemaJsonStore.value.componentsTree[index2].children.length; i++) {
        HJSchemaJsonStore.value.componentsTree[index2].children[i].css.top =
          HJSchemaJsonStore.value.componentsTree[index2].children[i].css.top - 1160 - 50;
      }
    }
    console.log('交换后', HJSchemaJsonStore.value.componentsTree, props.pageIndex);
  };

  // 页面发生交换后，交换页面中组件选中状态
  // const pageExchange = (newPageIndex: number, oldPageIndex: number) => {
  //   const temp = widgetActive.value[newPageIndex];
  //   widgetActive.value[newPageIndex] = widgetActive.value[oldPageIndex];
  //   widgetActive.value[oldPageIndex] = temp;
  // };
</script>
<style lang="scss" scoped>
  .split-block-box {
    width: 100%;
    height: 50px;
    position: absolute;
    top: -50px;
    left: 0;
    background-color: #f3f3f3;
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .split-left {
      h3 {
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 2px;
        color: #0d1216;
      }
    }
    .split-right {
      display: flex;
      .icon-box {
        height: 30px;
        width: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba($color: #ccc, $alpha: 0);
        transition: all 0.3s;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
          background-color: rgba($color: #ccc, $alpha: 0.3);
        }
      }
      .icon-shangyi {
        transform: rotate(180deg);
      }
      .disabled {
        cursor: not-allowed;
      }
    }
  }
</style>
