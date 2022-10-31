<template>
  <div class="rectangle-avatar-box">
    <el-image v-if="modelData" style="width: 115px; height: 145px" :src="modelData.avatar" />
    <el-image v-else style="width: 100%; height: 100%" :src="defaultImg" fit="cover" />
  </div>
</template>
<script lang="ts" setup>
  import { IBASEINFO } from '@/interface/model';
  import defaultAvatar from '@/assets/images/people.jpg';

  defineOptions({
    name: 'RECTABGLE_AVATAR'
  });

  interface IAvatar {
    width?: string;
    height?: string;
    modelData?: IBASEINFO | null; // 模块数据
  }
  const props = withDefaults(defineProps<IAvatar>(), {
    width: '118px',
    height: '150px',
    modelData: null
  });

  const defaultImg = defaultAvatar;
</script>
<style lang="scss" scoped>
  .rectangle-avatar-box {
    width: v-bind('props.width');
    height: v-bind('props.height');
    border: 3px solid #e5e5e5;
    overflow: hidden;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
