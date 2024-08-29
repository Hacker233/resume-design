<template>
  <div class="avatar-6-box">
    <div class="img-box">
      <el-image
        v-if="widgetData?.dataSource.avatarSrc"
        style="width: 115px; height: 115px"
        :src="widgetData.dataSource.avatarSrc"
      />
      <img v-else :src="defaultImg" style="width: 100%; height: 100%" alt="touxiang" srcset="" />
    </div>
    <!-- 边框 -->
    <div class="border-box"></div>
  </div>
</template>
<script lang="ts" setup>
  import defaultAvatar from '@/assets/images/people.jpg';
  import { IWidget } from '@/views/LegoDesigner/types';

  interface IAvatar {
    widgetData: IWidget | null; // 模块数据
  }
  const props = withDefaults(defineProps<IAvatar>(), {
    widgetData: null
  });
  const defaultImg = defaultAvatar;
</script>
<style lang="scss" scoped>
  .avatar-6-box {
    .img-box {
      width: v-bind('props.widgetData?.css.width + "px"');
      height: v-bind('props.widgetData?.css.height + "px"');
      position: relative;
      background-size: cover;
      clip-path: polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%);
      padding: v-bind('props.widgetData?.css.padding.top  + "px"')
        v-bind('props.widgetData?.css.padding.right + "px"')
        v-bind('props.widgetData?.css.padding.bottom + "px"')
        v-bind('props.widgetData?.css.padding.left + "px"');
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .border-box {
      width: v-bind('props.widgetData?.css.width + props.widgetData?.css.borderWidth + 2 + "px"');
      height: v-bind('props.widgetData?.css.height + props.widgetData?.css.borderWidth + 2 + "px"');
      background-color: v-bind('props.widgetData?.css.borderColor');
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      clip-path: polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%);
      z-index: 0;
    }
  }
</style>
