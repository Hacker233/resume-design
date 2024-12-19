<template>
  <el-drawer
    :model-value="drawer"
    :modal="true"
    :size="700"
    class="module-style-setting-drawer"
    modal-class="modal-style-setting-drawer"
    :direction="route.query.type !== 'create' ? 'ltr' : 'rtl'"
    title="模块样式设置"
    destroy-on-close
    @close="handleClose"
    @open="handleOpen"
  >
    <el-collapse v-model="activeNames">
      <div class="collapse-line-bolck">
        <h1>组件整体样式属性设置</h1>
      </div>
      <el-collapse-item title="组件整体样式" name="styleProp">
        <el-form label-width="100px" label-position="right">
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
      <div v-if="module?.customCss?.length" class="collapse-line-bolck">
        <h1>内部子组件样式属性设置</h1>
      </div>
      <el-collapse-item
        v-for="(customItem, customIndex) in module.customCss"
        :key="customIndex"
        :title="customItem.title"
        :name="customItem.prop"
      >
        <el-form label-width="100px" label-position="right">
          <el-form-item v-if="route.query.type === 'create'" label="Prop">
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
  </el-drawer>
</template>
<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { useGetSelectedModule } from '../hooks/useGetSelectedModule';
  import settersStyleCptMap from '../setters/style/settersStyleCptMap';
  import appStore from '@/store';
  import { IModule } from '../../types/IHJNewSchema';

  const route = useRoute();

  const emit = defineEmits(['closeStyleDrawer']);

  defineProps<{
    drawer: boolean;
  }>();

  const { selectedModuleId } = storeToRefs(appStore.useCreateTemplateStore);

  // 关闭弹窗
  const handleClose = () => {
    module.value = [];
    activeNames.value = [];
    emit('closeStyleDrawer');
  };

  // 打开弹窗
  const module = ref<IModule | any>({});
  const handleOpen = () => {
    module.value = useGetSelectedModule(selectedModuleId.value);
  };

  // 折叠面板
  const activeNames = ref([]);

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
        .el-form-item {
          margin-bottom: 22px;
        }
        .el-form-item__label {
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 1px;
          width: 100px;
          margin-right: 20px;
          padding: 0 10px 0 5px;
          border-radius: 4px;
          background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
        }
      }
    }
  }
</style>
