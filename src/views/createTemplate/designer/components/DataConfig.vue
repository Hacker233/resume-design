<template>
  <div class="data-config-box">
    <div
      v-for="(moduleItem, index) in HJNewJsonStore.componentsTree"
      :key="index"
      class="module-box"
    >
      <!-- 模块标题 -->
      <div class="module-title-box">
        <h1 class="title">{{ moduleItem.title }}</h1>
      </div>
      <!-- 模块数据填写区域 -->
      <div class="module-content-box">
        <!-- 组件 -->
        <div
          v-for="(value, key, dataIndex) in moduleItem.dataSource"
          :key="dataIndex"
          class="module-filed-box"
        >
          <component
            :is="dataSourceCptMap[value.type]"
            :id="moduleItem.id"
            :key-value="key"
          ></component>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import dataSourceCptMap from '../setters/components/index';

  const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);
</script>
<style lang="scss" scoped>
  .data-config-box {
    height: 100%;
    width: 100%;
    padding: 40px;
    box-sizing: border-box;
    .module-box {
      .module-title-box {
        margin-bottom: 20px;
        height: 50px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        .title {
          font-size: 20px;
        }
      }
      .module-content-box {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .module-filed-box {
          width: 49%;
        }
      }
    }
  }
</style>
