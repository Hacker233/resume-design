<template>
  <div class="base-info">
    <!-- 个人头像 -->
    <div class="avatar-box" v-show="modelData.isShow.avatar">
      <el-image style="width: 115px; height: 115px" :src="modelData.avatar" />
    </div>
    <!-- 基础信息 -->
    <div class="user-info">
      <h1>{{ modelData.name }}</h1>
      <!-- 一句话简介 -->
      <p class="user-abstract" v-show="isShow.abstract">{{ modelData.abstract }}</p>
      <!-- 年龄、地点、经验等信息 -->
      <ul>
        <li class="li-border" v-show="isShow.age">{{ modelData.age }}岁</li>
        <li class="li-border" v-show="isShow.address">{{ modelData.address }}</li>
        <li class="li-border" v-show="isShow.workService">{{ modelData.workService }}年经验</li>
        <li class="li-border" v-show="isShow.phoneNumber">{{ modelData.phoneNumber }}</li>
        <li v-show="isShow.email">{{ modelData.email }}</li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { IBASEINFO } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle.js';
  import { reactive } from 'vue';
  const props = defineProps<{
    modelData: IBASEINFO; // 模块数据
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
  const isShow = reactive(props.modelData.isShow);
</script>
<script lang="ts">
  export default {
    name: 'BASE_INFO_1'
  };
</script>
<style scoped lang="scss">
  .base-info {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 0;
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
