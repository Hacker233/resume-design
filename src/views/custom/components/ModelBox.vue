<template>
  <div class="material-model-box" @click="selectModel">
    <component
      :class="['mode-item', { isHover: hoverId === item.keyId }]"
      :is="components[item.cptName]"
      :modelData="item.data"
      :modelStyle="item.style"
      :style="getDynamicStyle(item)"
      @mouseover="handleMouseover()"
      @mouseleave="handleMouseleave"
    ></component>
  </div>
</template>
<script lang="ts" setup>
  import { IMATERIALITEM } from '@/interface/material';
  import appStore from '@/store';

  const props = defineProps<{
    item: IMATERIALITEM;
    components: any;
  }>();
  console.log('当前移入模块', props.item);
  // 鼠标移入效果
  const hoverId = ref<string>('');
  const handleMouseover = () => {
    hoverId.value = props.item.keyId;
  };
  // 鼠标移出效果
  const handleMouseleave = () => {
    hoverId.value = '';
  };
  // 添加样式
  const getDynamicStyle = (item: IMATERIALITEM) => {
    return {
      width: item.cptWidth
    };
  };
  // 点击选择模块
  const { updateSelectModdel } = appStore.useSelectMaterialStore;
  const selectModel = () => {
    // 更新store
    updateSelectModdel(props.item.model, props.item.cptTitle, props.item.keyId);
  };
</script>
<style lang="scss" scoped>
  .material-model-box {
    .mode-item {
      border: 1px dashed transparent;
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      user-select: none;
      &:hover {
        border: 1px dashed #7ec97e;
        cursor: move;
      }
    }
    .isHover {
      position: relative;
      &::after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba($color: #000000, $alpha: 0.1);
      }
    }
  }
</style>
