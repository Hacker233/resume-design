<template>
  <template v-if="!modelData.avatarShape">
    <div v-show="isShow.avatar" class="avatar-box">
      <el-image style="width: 115px; height: 145px" :src="modelData.avatar" />
    </div>
  </template>
  <template v-else>
    <div v-show="isShow.avatar" class="avatar-shape-box">
      <component :is="avatarComponents[modelData.avatarShape]"></component>
    </div>
  </template>
</template>
<script lang="ts" setup>
  import { IBASEINFO } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import avatarComponents from '@/utils/registerAvatarCom';
  const props = defineProps<{
    modelData: IBASEINFO; // 模块数据
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
  const isShow = reactive(props.modelData.isShow);
</script>
<style lang="scss" scoped>
  .avatar-box {
    width: 118px;
    height: 150px;
    overflow: hidden;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4px solid #eee;
    margin-right: 50px;
  }
</style>
