<template>
  <div class="base-info">
    <!-- 基本信息 -->
    <div class="user-info">
      <div class="head">
        <h1>{{ modelData.name }}</h1>
        <p>{{ modelData.abstract }}</p>
      </div>
      <div class="detail">
        <ul>
          <li v-show="isShow.age" class="li-border">{{ modelData.age }}岁</li>
          <li v-show="isShow.address" class="li-border">{{ modelData.address }}</li>
          <li v-show="isShow.workService" class="li-border">{{ modelData.workService }}年经验</li>
          <li v-show="isShow.phoneNumber" class="li-border">{{ modelData.phoneNumber }}</li>
          <li v-show="isShow.email">{{ modelData.email }}</li>
        </ul>
      </div>
    </div>
    <!-- 头像 -->
    <div v-show="isShow.avatar" class="avatar-box">
      <el-image style="width: 116px; height: 146px" :src="modelData.avatar" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { IBASEINFO } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import { reactive } from 'vue';

  const props = defineProps<{
    modelData: IBASEINFO; // 模块数据
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
  const isShow = reactive(props.modelData.isShow);
</script>
<style lang="scss" scoped>
  .base-info {
    background: url(../../../assets/images/template3_bg_2.png);
    background-repeat: no-repeat;
    width: 100%;
    height: 250px;
    border-bottom: 1px dashed #cfcfcf;
    box-sizing: border-box;
    padding: 40px 50px;
    padding-left: 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    .user-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .head {
        display: flex;
        justify-content: center;
        flex-direction: column;
        h1 {
          font-size: v-bind('modelStyle.titleFontSize');
          color: v-bind('modelStyle.titleColor');
          font-weight: v-bind('modelStyle.titleFontWeight');
          margin-bottom: 10px;
        }
        p {
          font-size: v-bind('modelStyle.textFontSize');
          color: v-bind('modelStyle.titleColor');
          font-weight: v-bind('modelStyle.titleFontWeight');
        }
      }
      .detail {
        ul {
          display: flex;
          li {
            list-style: none;
            font-size: v-bind('modelStyle.textFontSize');
            font-weight: v-bind('modelStyle.textFontWeight');
            padding-right: 24px;
            height: 18px;
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
    .avatar-box {
      width: 116px;
      height: 146px;
      border: 3px solid #eee;
    }
  }
</style>
