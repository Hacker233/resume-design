<!-- 模块属性配置面板 -->
<template>
  <div class="right-setter-box">
    <data-config v-if="selectedModuleId"></data-config>

    <!-- 全局样式配置 -->
    <el-collapse v-else v-model="pageActiveNames">
      <div class="collapse-line-bolck">
        <h1>全局样式配置</h1>
      </div>
      <el-collapse-item
        v-if="HJNewJsonStore && Object.keys(HJNewJsonStore.css).length"
        title="主题配置"
        name="styleProp"
      >
        <el-form label-width="90px" label-position="left">
          <div v-for="(value, key, index) in HJNewJsonStore.css" :key="index">
            <component :is="getStyleSetterCom(key)" :value="value"></component>
          </div>
        </el-form>
      </el-collapse-item>
      <!-- 自定义的样式属性 -->
      <div v-if="HJNewJsonStore.customCss.length" class="collapse-line-bolck">
        <h1>内部子组件样式属性设置</h1>
      </div>
      <el-collapse-item
        v-for="(customItem, customIndex) in HJNewJsonStore.customCss"
        :key="customIndex"
        :title="customItem.title"
        :name="customItem.prop"
      >
        <el-form label-width="90px" label-position="left">
          <el-form-item label="自定义Prop:">
            <el-input v-model="customItem.prop" disabled />
          </el-form-item>
          <div v-for="(value, key, index) in customItem.css" :key="index">
            <component
              :is="getStyleSetterCom(key)"
              :custom-css-prop="customItem.prop"
              :value="value"
            ></component>
          </div>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { useGetSelectedModule } from '../hooks/useGetSelectedModule';
  import settersStyleCptMap from '../setters/style/settersStyleCptMap';
  import { IModule } from '../../types/IHJNewSchema';
  import DataConfig from './DataConfig.vue';

  const { selectedModuleId, HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);

  // 页面配置折叠面吧
  const pageActiveNames = ref([]);

  const module = ref<IModule | any>({});
  watch(
    () => selectedModuleId.value,
    (newVal) => {
      if (newVal) {
        module.value = useGetSelectedModule(selectedModuleId.value);
        console.log('selectedModuleId变化', module.value);
      }
    }
  );

  // 返回样式属性设置组件
  const getStyleSetterCom = (key: string | number) => {
    return settersStyleCptMap[key];
  };
</script>
<style lang="scss" scoped>
  .right-setter-box {
    background-color: #fff;
    height: 100%;
    width: 100%;
    :deep(.el-tabs) {
      height: calc(100vh - 50px);
      overflow: auto;
      display: flex;
      flex-direction: column;
      .el-tabs__header {
        margin-bottom: 0;
        height: 50px;
        position: sticky;
        top: 0;
        z-index: 1000;
        background: #fff;
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
        // justify-content: center;
        // padding: 30px 20px 10px 20px;
        box-sizing: border-box;
        // height: calc(100vh - 170px);
        overflow: auto;
        flex: 1;
        .el-tab-pane {
          width: 100%;
        }
      }
    }
    :deep(.el-collapse) {
      width: 100%;
      height: 100%;
      .el-collapse-item__header {
        padding: 0 20px;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 2px;
        border-bottom: 1px solid #ebeef5;
      }
      .el-collapse-item__content {
        padding: 30px 20px 10px 20px;
      }
      .el-collapse-item__wrap {
        border-bottom: none;
      }
    }
    .c-scrollbar {
      padding: 30px 20px;
    }
    .no-data {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .collapse-line-bolck {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 5px 21px 0 rgba(78, 78, 78, 0.05);
      background: linear-gradient(0deg, #f3e7e9 0%, #e3eeff 100%);
      user-select: none;
      h1 {
        font-size: 16px;
        margin: 0;
        letter-spacing: 1px;
        font-weight: bold;
        font-family: '微软雅黑';
      }
    }
  }
</style>
