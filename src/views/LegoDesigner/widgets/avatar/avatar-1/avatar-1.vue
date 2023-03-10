<template>
  <div class="avatar-1-box">
    <el-image
      v-if="widgetData?.dataSource.src"
      style="width: 115px; height: 115px"
      :src="widgetData.dataSource.src"
    />
    <el-image v-else style="width: 100%; height: 100%" :src="defaultImg" fit="cover" />
  </div>
</template>
<script lang="ts" setup>
  import defaultAvatar from '@/assets/images/people.jpg';
  import { IWidget } from '@/views/LegoDesigner/types';

  defineOptions({
    name: 'hj-avatar-1'
  });

  interface IAvatar {
    widgetData: IWidget | null; // 模块数据
  }
  const props = withDefaults(defineProps<IAvatar>(), {
    widgetData: null
  });

  const defaultImg = defaultAvatar;
</script>
<style lang="scss" scoped>
  .avatar-1-box {
    width: v-bind('props.widgetData?.css.width + "px"');
    height: v-bind('props.widgetData?.css.height + "px"');
    border-style: v-bind('props.widgetData?.css.borderStyle');
    border-width: v-bind('props.widgetData?.css.borderWidth + "px"');
    padding: v-bind('props.widgetData?.css.padding.top  + "px"')
      v-bind('props.widgetData?.css.padding.right + "px"')
      v-bind('props.widgetData?.css.padding.bottom + "px"')
      v-bind('props.widgetData?.css.padding.left + "px"');
    border-color: v-bind('props.widgetData?.css.borderColor');
    overflow: hidden;
    background-color: v-bind('props.widgetData?.css.backgroundColor');
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: v-bind('props.widgetData?.css.borderRadius + "px"');
    .el-image {
      border-radius: v-bind('props.widgetData?.css.borderRadius + "px"');
    }
  }
</style>
