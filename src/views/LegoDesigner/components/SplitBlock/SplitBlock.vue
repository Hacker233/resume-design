<template>
  <div class="split-block-box" :style="{ top: pageIndex * 1210 + 'px' }">
    <!-- 左侧 -->
    <div class="split-left">
      <h3>第{{ pageIndex + 1 }}页</h3>
    </div>
    <!-- 右侧 -->
    <div class="split-right">
      <div :class="['icon-box', { disabled: pageIndex === 0 }]" title="删除" @click="deletePage">
        <svg-icon icon-name="icon-shanchu" color="green" size="17px"></svg-icon> </div
    ></div>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';

  const props = defineProps<{
    pageIndex: number;
  }>();

  const { HJSchemaJsonStore } = storeToRefs(appStore.useLegoJsonStore);

  // 删除当前页
  const deletePage = () => {
    HJSchemaJsonStore.value.componentsTree.splice(props.pageIndex, 1);
  };
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
