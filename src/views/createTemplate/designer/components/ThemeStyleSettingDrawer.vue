<template>
  <el-drawer
    :model-value="drawer"
    :modal="true"
    :size="700"
    class="module-style-setting-drawer"
    modal-class="modal-style-setting-drawer"
    direction="rtl"
    title="模块样式设置"
    destroy-on-close
    @close="handleClose"
  >
    <!-- 全局样式配置 -->
    <el-collapse v-model="pageActiveNames">
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
  </el-drawer>
</template>
<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import settersStyleCptMap from '../setters/style/settersStyleCptMap';
  import appStore from '@/store';

  const emit = defineEmits(['closeStyleDrawer']);

  defineProps<{
    drawer: boolean;
  }>();

  const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);

  // 关闭弹窗
  const handleClose = () => {
    pageActiveNames.value = [];
    emit('closeStyleDrawer');
  };

  // 页面配置折叠面吧
  const pageActiveNames = ref([]);

  // 返回样式属性设置组件
  const getStyleSetterCom = (key: string | number) => {
    return settersStyleCptMap[key];
  };
</script>
<style lang="scss">
  .modal-style-setting-drawer {
    background-color: rgba(78, 78, 78, 0);
  }
  .module-style-setting-drawer {
    .el-drawer__body {
      padding: 0;
      display: flex;
      flex-direction: column;
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
    }
  }
</style>
