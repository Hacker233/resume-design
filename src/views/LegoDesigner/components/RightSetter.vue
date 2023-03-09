<template>
  <div class="right-setter-box">
    <el-tabs v-if="widgetId" v-model="activeName" type="card" class="demo-tabs">
      <el-tab-pane label="样式" name="style">
        <el-form label-width="100px" label-position="left">
          <div
            v-for="(value, key, index) in HJSchemaJson.componentsTree[widgetIndex].css"
            :key="index"
          >
            <component :is="getSetterCom(key)" :id="widgetId" :value="value"></component>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="数据" name="second">数据设置</el-tab-pane>
    </el-tabs>
    <!-- 没有选中组件时展示 -->
    <div v-else class="no-data">没有选中组件</div>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { SETTERS_MAP } from '../setters/settersMap';

  interface ISetter {
    widgetId: string;
  }
  const props = withDefaults(defineProps<ISetter>(), {
    widgetId: ''
  });

  // HJSchemaJSON数据
  const { HJSchemaJson } = storeToRefs(appStore.useLegoJsonStore);

  // 返回选中组件的索引
  const widgetIndex = ref(0);
  watch(
    () => props.widgetId,
    (newVal) => {
      if (newVal) {
        widgetIndex.value = HJSchemaJson.value.componentsTree.findIndex(
          (item) => props.widgetId === item.id
        );
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
    width: 400px;
    :deep(.el-tabs) {
      height: 100%;
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
        }
      }
    }
  }
</style>
