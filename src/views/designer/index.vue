<template>
  <div class="design-box">
    <!-- 导航栏 -->
    <nav class="nav-box"> 导航栏 </nav>
    <!-- 内容区域 -->
    <div class="bottom">
      <!-- 左侧添加模块区域 -->
      <div class="left">
        <Title title="模块选择"></Title>
        <model-list :componentData="componentData"></model-list>
      </div>
      <!-- 预览区域 -->
      <div class="center">
        <div class="design">
          <component :is="componentName" :componentData="componentData" />
        </div>
      </div>
      <!-- 参数修改区域 -->
      <div class="config">
        <Title title="基础资料"></Title>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import Title from './components/Title.vue';
  import ModelList from './components/ModelList.vue';

  import TEMPLATE_JSON from '@/schema/model';
  import { IResumeJson } from '@/types/model'; // JSON数据格式

  const componentName = ref<string>('web-develop'); // 模板名称
  const componentData = reactive<IResumeJson>(TEMPLATE_JSON); // 模板数据
</script>

<style lang="less" scoped>
  .design-box {
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;

    .nav-box {
      height: 50px;
      width: 100%;
      background-color: #fff;
      position: sticky;
      top: 0;
    }

    .bottom {
      display: flex;
      width: 100%;

      .left {
        width: 300px;
        background-color: #fff;
        height: calc(100vh - 50px);
        overflow: auto;
      }

      .center {
        display: flex;
        justify-content: center;
        flex: 1;
        height: calc(100vh - 50px);
        overflow: auto;

        .design {
          background: white;
          width: 820px;
          min-height: 1160px;
          margin: 30px 0;
        }
      }

      .config {
        width: 350px;
        background-color: #fff;
        overflow: auto;
      }
    }
  }
</style>
