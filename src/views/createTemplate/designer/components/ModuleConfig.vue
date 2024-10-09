<!-- 模块属性配置面板 -->
<template>
  <div class="right-setter-box">
    <el-tabs
      v-if="selectedModuleId"
      :key="selectedModuleId"
      v-model="activeName"
      type="card"
      class="demo-tabs"
    >
      <el-tab-pane label="基本配置" name="style">
        <el-collapse v-model="activeNames">
          <div class="collapse-line-bolck">
            <h1>组件相关属性设置</h1>
          </div>
          <!-- 组件属性 -->
          <el-collapse-item
            v-if="module && Object.keys(module.props).length"
            title="组件属性"
            name="cptProp"
          >
            <el-form label-width="90px" label-position="left">
              <div v-for="(value, key, index) in module.props" :key="index">
                <component
                  :is="getPropsSetterCom(key)"
                  :id="selectedModuleId"
                  :value="value"
                ></component>
              </div>
            </el-form>
          </el-collapse-item>
          <div class="collapse-line-bolck">
            <h1>组件整体样式属性设置</h1>
          </div>
          <el-collapse-item
            v-if="module && Object.keys(module.css).length"
            title="组件整体样式"
            name="styleProp"
          >
            <el-form label-width="90px" label-position="left">
              <div v-for="(value, key, index) in module.css" :key="index">
                <component
                  :is="getStyleSetterCom(key)"
                  :id="selectedModuleId"
                  :value="value"
                ></component>
              </div>
            </el-form>
          </el-collapse-item>
          <!-- 自定义的样式属性 -->
          <div class="collapse-line-bolck">
            <h1>内部子组件样式属性设置</h1>
          </div>
          <el-collapse-item
            v-for="(customItem, customIndex) in module.customCss"
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
                  :id="selectedModuleId"
                  :custom-css-prop="customItem.prop"
                  :value="value"
                ></component>
              </div>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane class="data-tab-pane" label="数据配置" name="second">
        <el-collapse v-model="activeDataNames">
          <el-collapse-item title="数据配置" name="dataProp">
            <el-form label-width="100px" label-position="left">
              <div v-for="(value, key, index) in module.dataSource" :key="index">
                <component
                  :is="getDataSetterCom(key)"
                  :id="selectedModuleId"
                  :value="value"
                ></component>
              </div>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
    <!-- 没有选中组件时展示 -->
    <div v-else class="no-data">
      <no-data></no-data>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import NoData from './NoData.vue';
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { useGetSelectedModule } from '../hooks/useGetSelectedModule';
  import settersStyleCptMap from '../setters/style/settersStyleCptMap';
  import settersPropsCptMap from '../setters/props/settersPropsCptMap';
  import settersDataCptMap from '../setters/data/settersDataCptMap';
  import { IModule } from '../../types/IHJNewSchema';

  const { selectedModuleId } = storeToRefs(appStore.useCreateTemplateStore);

  const activeName = ref('style');

  // 折叠面板
  const activeNames = ref([]);

  // 数据配置折叠面板
  const activeDataNames = ref<string>('dataProp');

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

  // 返回属性设置组件
  const getPropsSetterCom = (key: string | number) => {
    return settersPropsCptMap[key];
  };

  // 返回数据设置组件
  const getDataSetterCom = (key: string | number) => {
    return settersDataCptMap[key];
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
        .el-collapse {
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
      }
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
