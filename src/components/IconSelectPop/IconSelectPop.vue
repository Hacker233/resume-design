<template>
  <el-popover
    popper-class="icon-editor-pop-box"
    :teleported="teleported"
    :width="400"
    trigger="click"
  >
    <template #reference>
      <div class="icon-popper-box">
        <svg-icon :icon-name="iconfont" color="#74a274" size="22px"></svg-icon>
      </div>
    </template>
    <div class="icon-select-box">
      <div
        v-for="(item, index) in iconfontList.glyphs"
        :key="index"
        class="icon-list-item"
        @click="handleIcon(item)"
      >
        <svg-icon :icon-name="'icon-' + item.font_class" color="#74a274" size="20px"></svg-icon>
      </div>
    </div>
  </el-popover>
</template>
<script lang="ts" setup>
  import { iconfontList } from '@/views/LegoDesigner/widgets/icon/iconfont';

  interface IIcon {
    modelValue?: any;
    teleported?: boolean;
  }
  const props = withDefaults(defineProps<IIcon>(), {
    modelValue: '',
    teleported: true
  });

  const emit = defineEmits(['update:modelValue', 'change']);

  const iconfont = ref<string>(props.modelValue ? props.modelValue : '');

  // 选中图标
  const handleIcon = (item: { font_class: string }) => {
    iconfont.value = 'icon-' + item.font_class;
    emit('update:modelValue', 'icon-' + item.font_class);
    emit('change', 'icon-' + item.font_class);
  };
</script>
<style lang="scss">
  .icon-popper-box {
    display: flex;
    align-items: center;
    height: 30px;
    border-radius: 5px;
    padding: 0 10px;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      background-color: rgba($color: #ccc, $alpha: 0.2);
    }
  }

  .icon-editor-pop-box {
    .icon-select-box {
      width: 100%;
      height: 500px;
      overflow: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .icon-list-item {
        display: flex;
        align-items: center;
        height: 30px;
        border-radius: 5px;
        padding: 0 10px;
        transition: all 0.3s;
        cursor: pointer;
        &:hover {
          background-color: rgba($color: #ccc, $alpha: 0.2);
        }
      }
    }
  }
</style>
