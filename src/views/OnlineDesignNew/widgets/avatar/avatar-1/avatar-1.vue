<template>
  <div class="avatar-1-box" :style="boxStyles">
    <el-image
      v-if="widgetData?.dataSource.avatarSrc"
      style="width: 115px; height: 115px"
      :src="widgetData.dataSource.avatarSrc"
    />
    <img v-else :src="defaultImg" style="width: 100%; height: 100%" alt="touxiang" srcset="" />
  </div>
</template>
<script lang="ts" setup>
  import defaultAvatar from '@/assets/images/people.jpg';
  interface IAvatar {
    widgetData: any; // 模块数据
  }
  const props = withDefaults(defineProps<IAvatar>(), {
    widgetData: {}
  });

  const defaultImg = defaultAvatar;

  const boxStyles = computed(() => ({
    width: `${props.widgetData.css.width || 0}px`,
    height: `${props.widgetData.css.height || 0}px`,
    backgroundColor: props.widgetData.css.backgroundColor || '#ffffff',
    borderWidth: `${props.widgetData.css.borderWidth || 0}px`,
    borderRadius: `${props.widgetData.css.borderRadius || 0}px`,
    borderColor: props.widgetData.css.borderColor || 'transparent',
    borderStyle: props.widgetData.css.borderStyle || 'solid',
    paddingTop: `${props.widgetData.css.padding.top || 0}px`,
    paddingLeft: `${props.widgetData.css.padding.left || 0}px`,
    paddingRight: `${props.widgetData.css.padding.right || 0}px`,
    paddingBottom: `${props.widgetData.css.padding.bottom || 0}px`,
    overflow: props.widgetData.css.overflow || 'hidden',
    display: props.widgetData.css.display || 'flex',
    alignItems: props.widgetData.css.alignItems || 'center',
    justifyContent: props.widgetData.css.justifyContent || 'center'
  }));
</script>
<style lang="scss" scoped>
  .avatar-1-box {
    .el-image {
      border-radius: v-bind('props.widgetData?.css.borderRadius + "px"');
    }
  }
</style>
