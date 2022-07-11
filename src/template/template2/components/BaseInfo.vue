<template>
  <div class="base-info">
    <!-- 个人头像 -->
    <div class="avatar-box" v-show="modelData.isShow.avatar">
      <el-image style="width: 120px; height: 150px" :src="modelData.avatar" />
    </div>
    <!-- 基础信息 -->
    <div class="user-info">
      <!-- <h1>{{ modelData.name }}</h1> -->
      <!-- 一句话简介 -->
      <!-- <p class="user-abstract" v-show="isShow.abstract">{{ modelData.abstract }}</p> -->
      <!-- 年龄、地点、经验等信息 -->
      <ul>
        <li class="li-border" v-show="isShow.age">
          <svg-icon iconName="icon-renwu-ren" color="#fff"></svg-icon>
          <span>{{ modelData.age }}岁</span>
        </li>
        <li class="li-border" v-show="isShow.address">
          <svg-icon iconName="icon-dizhi" color="#fff" size="16px"></svg-icon>
          <span>{{ modelData.address }}</span>
        </li>
        <li class="li-border" v-show="isShow.workService">
          <svg-icon iconName="icon-gongzuojingyan" color="#fff"></svg-icon>
          <span>{{ modelData.workService }}年经验</span>
        </li>
        <li class="li-border" v-show="isShow.phoneNumber">
          <svg-icon iconName="icon-dianhua1" color="#fff"></svg-icon>
          <span>{{ modelData.phoneNumber }}</span>
        </li>
        <li v-show="isShow.email">
          <svg-icon iconName="icon-youxiang" color="#fff"></svg-icon>
          <span>{{ modelData.email }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { IBASEINFO } from '@/interface/model';
  import { reactive } from 'vue';
  const props = defineProps<{
    modelData: IBASEINFO;
  }>();
  const isShow = reactive(props.modelData.isShow);
</script>
<style lang="less" scoped>
  .base-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
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
