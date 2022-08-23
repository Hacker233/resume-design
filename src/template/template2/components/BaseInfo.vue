<template>
  <div class="base-info">
    <!-- 个人头像 -->
    <div v-show="data.isShow.avatar" class="avatar-box">
      <el-image style="width: 120px; height: 150px" :src="data.avatar" />
    </div>
    <!-- 基础信息 -->
    <div class="user-info">
      <ul>
        <li v-show="isShow.age" class="li-border">
          <svg-icon icon-name="icon-renwu-ren" color="#fff"></svg-icon>
          <span>{{ data.age }}岁</span>
        </li>
        <li v-show="isShow.address" class="li-border">
          <svg-icon icon-name="icon-dizhi" color="#fff" size="16px"></svg-icon>
          <span>{{ data.address }}</span>
        </li>
        <li v-show="isShow.workService" class="li-border">
          <svg-icon icon-name="icon-gongzuojingyan" color="#fff"></svg-icon>
          <span>{{ data.workService }}年经验</span>
        </li>
        <li v-show="isShow.phoneNumber" class="li-border">
          <svg-icon icon-name="icon-dianhua1" color="#fff"></svg-icon>
          <span>{{ data.phoneNumber }}</span>
        </li>
        <li v-show="isShow.email">
          <svg-icon icon-name="icon-youxiang" color="#fff"></svg-icon>
          <span>{{ data.email }}</span>
        </li>
      </ul>
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
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    padding: v-bind('modelData.style.pTopBottom') v-bind('modelData.style.pLeftRight');
    margin-bottom: v-bind('modelData.style.mBottom');
    margin-top: v-bind('modelData.style.mTop');

    .avatar-box {
      border: 3px solid #e5e5e5;
      overflow: hidden;
      background-color: #eee;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 40px;
    }
    .user-info {
      width: 100%;
      ul {
        display: flex;
        flex-direction: column;
        li {
          height: 35px;
          display: flex;
          align-items: center;
          list-style: none;
          color: v-bind('modelData.style.textColor');
          font-size: v-bind('modelData.style.textFontSize');
          font-weight: v-bind('modelData.style.textFontWeight');
          & :first-child {
            margin-right: 10px;
          }
          span {
            letter-spacing: 2px;
          }
        }
      }
    }
  }
</style>
