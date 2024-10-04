<!-- 创建模版页导航栏 -->
<template>
  <div class="nav-bar-box">
    <div class="nav-left">
      <logo-com icon-color="#74a274" font-color="#74a274"></logo-com>
    </div>
    <div class="nav-center">
      <p v-show="!isShowIpt">
        {{ HJNewJsonStore.config.title }}
        <el-icon :size="20" color="#409eff" @click="changeTitle">
          <Edit />
        </el-icon>
      </p>
      <el-input
        v-show="isShowIpt"
        ref="titleIpf"
        v-model="HJNewJsonStore.config.title"
        autofocus
        placeholder="请输入标题"
        @blur="blurTitle"
      />
    </div>
    <div class="nav-right"></div>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';

  const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);
  // 更改标题
  const titleIpf = ref<any>(null);
  const isShowIpt = ref<boolean>(false);
  const changeTitle = () => {
    isShowIpt.value = true;
    titleIpf.value.focus();
  };
  const blurTitle = () => {
    isShowIpt.value = false;
  };
</script>
<style lang="scss" scoped>
  .nav-bar-box {
    width: 100%;
    height: 50px;
    background-color: #fff;
    box-shadow: 0 5px 21px 0 rgb(78 78 78 / 5%);
    flex-shrink: 0;
    position: sticky;
    top: 0;
    z-index: 10;
    padding: 0 60px;
    display: flex;
    justify-content: space-between;
    .nav-left {
      width: 300px;
      height: 100%;
      display: flex;
      align-items: center;
      user-select: none;
    }
    .nav-center {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      p {
        display: flex;
        align-items: center;
        font-size: 16px;
        .el-icon {
          margin-left: 10px;
          cursor: pointer;
        }
      }
      .el-input {
        width: 200px;
      }
    }
    .nav-right {
      width: 300px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .audit-btn {
        margin-right: 15px;
      }
      .icon-box {
        width: 35px;
        height: 35px;
        background-color: #74a274;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-right: 15px;
        transition: all 0.3s;
        &:hover {
          background-color: rgba(0, 192, 145, 0.8);
        }
      }
    }
  }
</style>
