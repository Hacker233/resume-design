<template>
  <div class="create-template-box">
    <!-- 导航栏 -->
    <nav-bar
      :template-info="templateInfo"
      @publish-success="publishSuccess"
      @refresh="generateSuccess"
    ></nav-bar>
    <!-- 内容区容器 -->
    <div :key="resetKey" class="content-wrapper">
      <!-- 左侧物料区 -->
      <div class="module-left">
        <module-select></module-select>
      </div>
      <!-- 中间设计区 -->
      <div class="design-center">
        <!-- 全局主题设置 -->
        <global-theme-setting-bar></global-theme-setting-bar>
        <div class="center-wrapper">
          <!-- 简历渲染区域 -->
          <resume-render></resume-render>
          <!-- 右侧悬浮图标 -->
          <div class="page-eidtor-box">
            <page-editor-list></page-editor-list>
          </div>
        </div>
      </div>
      <!-- 右侧属性面板区 -->
      <div class="prop-right">
        <module-config></module-config>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import NavBar from './components/NavBar.vue';
  import ModuleSelect from './components/ModuleSelect.vue';
  import ModuleConfig from './components/ModuleConfig.vue';
  import { storeToRefs } from 'pinia';
  import appStore from '@/store';
  import PageEditorList from './components/PageEditorList.vue';
  import { getUuid } from '@/utils/common';
  import pageSchemas from './schema/pageSchema';
  import { getTemplateByIdAsync } from '@/http/api/createTemplate';
  import ResumeRender from './components/ResumeRender.vue';
  import GlobalThemeSettingBar from './components/GlobalThemeSettingBar.vue';

  const templateInfo = ref<any>(null);
  const route = useRoute();
  const id = ref<any>('');
  id.value = route.query.id; // 获取模版id

  // 重置
  const { resetKey, fromAiGenerate } = storeToRefs(appStore.useCreateTemplateStore);
  const generateSuccess = async () => {
    resetKey.value++; // 增加key，强制重新渲染
    await nextTick();
    fromAiGenerate.value = false;
  };

  // 初始化JSON数据
  const { HJNewJsonStore, selectedPageName } = storeToRefs(appStore.useCreateTemplateStore);

  // 查询模版数据
  const getTemplateData = async () => {
    const data = await getTemplateByIdAsync(id.value);
    if (data.status === 200) {
      templateInfo.value = data.data;
      HJNewJsonStore.value = data.data.template_json;
      HJNewJsonStore.value.props.title = templateInfo.value.template_title;
    } else {
      templateInfo.value = null;
      defaultTemplate();
    }
    console.log(HJNewJsonStore.value);
  };

  // 默认模版数据
  const defaultTemplate = () => {
    HJNewJsonStore.value = pageSchemas[selectedPageName.value];
    HJNewJsonStore.value.id = getUuid();
  };

  if (id.value) {
    // 查询模版数据
    getTemplateData();
  } else {
    // 默认模版数据
    defaultTemplate();
  }

  // 模版上传成功
  const router = useRouter();
  const publishSuccess = (templateId: string) => {
    // 重置路由
    router.replace({
      path: route.path,
      query: {
        ...route.query,
        id: templateId
      }
    });
    id.value = templateId;
    getTemplateData();
  };
</script>

<style lang="scss" scoped>
  .create-template-box {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    .content-wrapper {
      width: 100%;
      flex: 1;
      display: flex;
      overflow: auto;
      .module-left {
        height: 100%;
        background-color: #fff;
        flex: 1;
        max-width: 500px;
        min-width: 300px;
      }
      .design-center {
        height: calc(100vh - 100px);
        flex: 1;
        min-width: 970px;
        position: relative;
        .center-wrapper {
          width: 100%;
          height: 100%;
          overflow: auto;
          padding: 20px 0;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          .page-eidtor-box {
            width: 60px;
            min-height: 300px;
            position: absolute;
            right: 15px;
            top: 70px;
          }
        }
      }
      .prop-right {
        height: 100%;
        min-width: 500px;
        background-color: #fff;
        flex: 1;
      }
    }
  }
</style>
