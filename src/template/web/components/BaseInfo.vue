<template>
  <div class="base-info-box">
    <!-- 个人头像 -->
    <div class="avatar-box">
      <el-image style="width: 115px; height: 115px" :src="baseInfo.avatar" />
    </div>
    <!-- 基础信息 -->
    <div class="user-info">
      <h1>{{ baseInfo.name }}</h1>
      <!-- 一句话简介 -->
      <p class="user-abstract">{{ baseInfo.abstract }}</p>
      <!-- 年龄、地点、经验等信息 -->
      <ul>
        <li class="li-border">{{ baseInfo.age }}岁</li>
        <li class="li-border">{{ baseInfo.address }}</li>
        <li class="li-border">{{ baseInfo.workService }}年经验</li>
        <li class="li-border">{{ baseInfo.phoneNumber }}</li>
        <li>{{ baseInfo.email }}</li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
  interface IBaseInfo {
    id: number;
    model: string;
    show: boolean;
    title: string;
    name: string;
    age: number;
    address: string; // 所在地址
    avatar: string; // 头像地址
    workService: number; // 工作年限
    phoneNumber: string; // 联系电话
    email: string; // 邮箱
    abstract: string; // 简介
    degree: string;
  }
  defineProps<{
    baseInfo: IBaseInfo;
  }>();
</script>

<style scoped lang="less">
  .base-info-box {
    display: flex;
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
        font-size: 30px;
        font-weight: 500;
        margin-bottom: 20px;
      }
      p {
        color: #878585;
        font-size: 14px;
        margin-bottom: 20px;
      }
      ul {
        display: flex;
        margin: 0;
        padding: 0;
        li {
          list-style: none;
          font-size: 14px;
          padding-right: 12px;
          height: 20px;
          margin-right: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7c7b7b;
        }
        .li-border {
          border-right: 2px solid #b4b4b4;
        }
      }
    }
  }
</style>
