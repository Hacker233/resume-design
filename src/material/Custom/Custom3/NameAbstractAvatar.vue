<!-- 姓名与简介 -->
<template>
  <div v-if="modelData" class="name-introduce">
    <div v-show="isShow.avatar" class="avatar-shape-box">
      <component :is="avatarComponents[modelData.avatarShape]" :model-data="modelData"></component>
    </div>
    <h1>{{ modelData.name }}</h1>
    <p v-show="isShow.abstract" v-dompurify-html="modelData.abstract"></p>
  </div>
</template>
<script lang="ts" setup>
  import { ICUSTOM3 } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import avatarComponents from '@/utils/registerAvatarCom';
  const props = defineProps<{
    modelData: ICUSTOM3;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
  const isShow = reactive(props.modelData.isShow);
</script>
<style lang="scss" scoped>
  .name-introduce {
    width: 100%;
    cursor: pointer;
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    box-sizing: border-box;
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
    background-color: v-bind('modelStyle.themeColor');
    clip-path: ellipse(110% 100% at 50% 0%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .avatar-shape-box {
      margin-bottom: 25px;
    }
    h1 {
      height: 30px;
      line-height: 29px;
      font-size: v-bind('modelStyle.titleFontSize');
      color: v-bind('modelStyle.titleColor');
      font-weight: v-bind('modelStyle.titleFontWeight');
      margin: 0 0 25px 0;
    }
    p {
      font-size: v-bind('modelStyle.textFontSize');
      color: v-bind('modelStyle.textColor');
      font-weight: v-bind('modelStyle.textFontWeight');
      text-align: center;
    }
  }
</style>
