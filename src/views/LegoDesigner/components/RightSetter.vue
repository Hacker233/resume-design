<template>
  <div class="right-setter-box">
    <el-tabs
      v-if="selectedWidgetId"
      :key="selectedWidgetId"
      v-model="activeName"
      type="card"
      class="demo-tabs"
    >
      <el-tab-pane label="样式" name="style">
        <el-form label-width="80px" label-position="left">
          <div
            v-for="(value, key, index) in HJSchemaJsonStore.componentsTree[pageActiveIndex]
              .children[widgetIndex].css"
            :key="index"
          >
            <component
              :is="getSetterCom(key)"
              :id="selectedWidgetId"
              :page-index="pageActiveIndex"
              :value="value"
            ></component>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="数据" name="second">数据设置</el-tab-pane>
    </el-tabs>
    <!-- 没有选中组件时展示 -->
    <div v-else class="no-data">
      <no-data></no-data>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import NoData from './NoData/NoData.vue';
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { SETTERS_MAP } from '../setters/settersMap';

  // HJSchemaJSON数据
  const { HJSchemaJsonStore } = storeToRefs(appStore.useLegoJsonStore);
  const { selectedWidgetId, pageActiveIndex } = storeToRefs(appStore.useLegoSelectWidgetStore);

  // 返回选中组件的索引
  const widgetIndex = ref(0);
  watch(
    () => selectedWidgetId.value,
    (newVal) => {
      if (newVal) {
        widgetIndex.value = HJSchemaJsonStore.value.componentsTree[
          pageActiveIndex.value
        ].children.findIndex((item: { id: string }) => selectedWidgetId.value === item.id);
      }
    }
  );

  // 返回属性设置组件
  const getSetterCom = (key: string | number) => {
    return SETTERS_MAP[key];
  };

  const activeName = ref('style');
</script>
<style lang="scss" scoped>
  .right-setter-box {
    background-color: #fff;
    height: calc(100vh - 60px);
    width: 350px;
    min-width: 350px;
    :deep(.el-tabs) {
      height: 100%;
      .el-tabs__header {
        margin-bottom: 0;
        height: 50px;
      }
      .el-tabs__nav {
        width: 100%;
        display: flex;
        justify-content: space-between;
        border-radius: 0;
        border-top: none;
        border-left: none;
        border-right: none;
        .el-tabs__item {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50px;
        }
      }

      .el-tabs__content {
        display: flex;
        justify-content: center;
        padding: 30px 30px 10px 30px;
        box-sizing: border-box;
        height: calc(100vh - 170px);
        overflow: auto;
        .c-scrollbar {
          padding: 30px 20px;
        }
      }
    }
    .no-data {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
