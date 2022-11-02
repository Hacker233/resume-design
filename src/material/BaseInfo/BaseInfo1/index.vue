<template>
  <div class="base-info">
    <!-- 个人头像 -->
    <template v-if="!modelData.avatarShape">
      <div v-show="isShow.avatar" class="avatar-box">
        <el-image style="width: 115px; height: 115px" :src="modelData.avatar" />
      </div>
    </template>
    <template v-else>
      <div v-show="isShow.avatar" class="avatar-shape-box">
        <component :is="avatarComponents[modelData.avatarShape]"></component>
      </div>
    </template>

    <!-- 基础信息 -->
    <div class="user-info">
      <h1>{{ modelData.name }}</h1>
      <!-- 一句话简介 -->
      <p v-show="isShow.abstract" v-dompurify-html="modelData.abstract" class="user-abstract"></p>
      <!-- 年龄、地点、经验等信息 -->
      <ul>
        <li v-show="isShow.age" class="li-border">{{ modelData.age }}岁</li>
        <li v-show="isShow.address" class="li-border">{{ modelData.address }}</li>
        <li v-show="isShow.workService" class="li-border">{{ modelData.workService }}年经验</li>
        <li v-show="isShow.phoneNumber" class="li-border">{{ modelData.phoneNumber }}</li>
        <li v-show="isShow.email">{{ modelData.email }}</li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { IBASEINFO } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle.js';
  import avatarComponents from '@/utils/registerAvatarCom';
  defineOptions({
    name: 'BASE_INFO_1'
  });
  const props = defineProps<{
    modelData: IBASEINFO; // 模块数据
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
  const isShow = reactive(props.modelData.isShow);
</script>
<style scoped lang="scss">
  .base-info {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
    .avatar-box {
      width: 120px;
      height: 120px;
      box-shadow: 5px 5px #254665;
      border-radius: 8%;
      overflow: hidden;
      background-color: #eee;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 40px;
      .el-image {
        border-radius: 8%;
      }
    }
    .avatar-shape-box {
      margin-right: 40px;
    }
    .user-info {
      flex: 1;
      padding-top: 5px;
      h1 {
        margin: 0;
        font-size: v-bind('modelStyle.titleFontSize');
        color: v-bind('modelStyle.titleColor');
        font-weight: v-bind('modelStyle.titleFontWeight');
        margin-bottom: 20px;
      }
      p {
        color: v-bind('modelStyle.textColor');
        font-size: v-bind('modelStyle.textFontSize');
        font-weight: v-bind('modelStyle.textFontWeight');
        margin-bottom: 20px;
      }
      ul {
        display: flex;
        li {
          list-style: none;
          font-size: v-bind('modelStyle.textFontSize');
          font-weight: v-bind('modelStyle.textFontWeight');
          padding-right: 12px;
          height: 20px;
          margin-right: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: v-bind('modelStyle.textColor');
        }
        .li-border {
          border-right: 2px solid #b4b4b4;
        }
      }
    }
  }
</style>
