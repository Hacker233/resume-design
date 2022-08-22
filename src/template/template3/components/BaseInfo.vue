<template>
  <div class="base-info">
    <!-- 基本信息 -->
    <div class="user-info">
      <div class="head">
        <h1>{{ data.name }}</h1>
        <p>{{ data.abstract }}</p>
      </div>
      <div class="detail">
        <ul>
          <li v-show="isShow.age" class="li-border">{{ data.age }}岁</li>
          <li v-show="isShow.address" class="li-border">{{ data.address }}</li>
          <li v-show="isShow.workService" class="li-border">{{ data.workService }}年经验</li>
          <li v-show="isShow.phoneNumber" class="li-border">{{ data.phoneNumber }}</li>
          <li v-show="isShow.email">{{ data.email }}</li>
        </ul>
      </div>
    </div>
    <!-- 头像 -->
    <div v-show="data.isShow.avatar" class="avatar-box">
      <el-image style="width: 116px; height: 146px" :src="data.avatar" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { IMATERIALITEM } from '@/interface/material';
  import { IBASEINFO } from '@/interface/model';
  import { reactive } from 'vue';

  const props = defineProps<{
    modelData: IMATERIALITEM;
    data: IBASEINFO;
  }>();
  const isShow = reactive(props.data.isShow);
</script>
<style lang="scss" scoped>
  .base-info {
    width: 100%;
    height: 250px;
    border-bottom: 1px dashed #cfcfcf;
    box-sizing: border-box;
    padding: 40px 50px;
    padding-left: 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: v-bind('modelData.style.mBottom');
    margin-top: v-bind('modelData.style.mTop');
    .user-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .head {
        display: flex;
        justify-content: center;
        flex-direction: column;
        h1 {
          font-size: v-bind('modelData.style.titleFontSize');
          color: v-bind('modelData.style.titleColor');
          font-weight: v-bind('modelData.style.titleFontWeight');
          margin-bottom: 10px;
        }
        p {
          font-size: v-bind('modelData.style.textFontSize');
          color: v-bind('modelData.style.titleColor');
          font-weight: v-bind('modelData.style.titleFontWeight');
        }
      }
      .detail {
        ul {
          display: flex;
          li {
            list-style: none;
            font-size: v-bind('modelData.style.textFontSize');
            font-weight: v-bind('modelData.style.textFontWeight');
            padding-right: 24px;
            height: 18px;
            margin-right: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: v-bind('modelData.style.textColor');
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
