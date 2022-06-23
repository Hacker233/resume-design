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
  import { IBASEINFO } from '@/types/model';
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
    }
  }
</style>
