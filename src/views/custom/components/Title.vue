<template>
  <div :class="['title']">
    <h1>{{ title }}</h1>
    <el-tooltip class="box-item" effect="dark" content="全局主题设置">
      <div
        :class="['right-icon', { isHover: isHover }, { notAllowed: isAllowed }]"
        @mouseover="handleMousver"
        @mouseleave="handleMouselaave"
        @click="themeSetting"
      >
        <svg-icon
          iconName="icon-jingzi"
          className="icon icon-jingzi"
          :color="themeColorIcon"
          size="20px"
        ></svg-icon>
      </div>
    </el-tooltip>
  </div>
</template>
<script setup lang="ts">
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';

  interface ITitle {
    title?: string;
  }
  withDefaults(defineProps<ITitle>(), {
    title: '属性设置'
  });

  // 图标是否可用
  const { cptKeyId } = storeToRefs(appStore.useSelectMaterialStore);
  const isAllowed = computed(() => {
    return cptKeyId.value ? false : true;
  });

  // 主题图标颜色
  const themeColorIcon = computed(() => {
    return isAllowed.value ? '#ccc' : 'green';
  });

  // 鼠标移入
  const isHover = ref<boolean>(false);
  const handleMousver = () => {
    isHover.value = true;
  };

  // 鼠标移出
  const handleMouselaave = () => {
    isHover.value = false;
  };

  // 主题设置
  const { resetSelectModel } = appStore.useSelectMaterialStore;
  const themeSetting = () => {
    resetSelectModel();
  };
</script>
<style lang="scss" scoped>
  .title {
    height: 60px;
    width: 100%;
    display: flex;
    background-color: #fff;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 10;
    padding: 0 12px;
    box-sizing: border-box;
    box-shadow: 0 5px 21px 0 rgb(78 78 78 / 8%);
    &::after {
      content: '';
      width: 100%;
      height: 1px;
      background-color: #eee;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0);
    }

    h1 {
      font-size: 14px;
      color: #333333;
      font-weight: bold;
      letter-spacing: 3px;
      height: 60px;
      line-height: 60px;
    }
    .right-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .isHover {
      background-color: #eee;
    }
    .notAllowed {
      cursor: not-allowed;
    }
  }
</style>
