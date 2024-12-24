<template>
  <div class="design-resume-box">
    <!-- 导航栏 -->
    <!-- <nav-bar @reset="getTemplateData" @generate-report="generateReport"></nav-bar> -->
    <!-- 底部区域 -->
    <div class="bottom-box">
      <!-- 数据配置 -->
      <div v-loading="!HJNewJsonStore.componentsTree.length" class="left">
        <data-config v-if="HJNewJsonStore.componentsTree.length"></data-config>
      </div>
      <!-- 简历预览 -->
      <div id="resume-container" class="right">
        <!-- 主题配置 -->
        <global-theme-setting-bar></global-theme-setting-bar>
        <div
          v-loading="!HJNewJsonStore.componentsTree.length"
          class="resume-container"
          :style="{ zoom: zoomScale }"
        >
          <resume-render></resume-render>
        </div>
      </div>
      <!-- 操作列 -->
      <div class="page-eidtor-box">
        <page-editor-list></page-editor-list>
      </div>
    </div>

    <!-- 导出pdf进度弹窗 -->
    <process-bar-dialog
      :dialog-visible="dialogVisible"
      :percentage-num="percentage"
      @cancle="cancleProgress"
    ></process-bar-dialog>
  </div>
</template>

<script lang="ts" setup>
  // import NavBar from './components/NavBar.vue';
  import DataConfig from '../createTemplate/designer/components/DataConfig.vue';
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { getTemplateByIdAsync, getUsertemplateAsync } from '@/http/api/createTemplate';
  import { closeGlobalLoading, getUuid } from '@/utils/common';
  import pageSchemas from '../createTemplate/designer/schema/pageSchema';
  import { useRoute } from 'vue-router';
  import ResumeRender from '../createTemplate/designer/components/ResumeRender.vue';
  import PageEditorList from './components/PageEditorList.vue';
  import { exportPdfNew, exportPNGNew } from '@/utils/pdf';
  import ProcessBarDialog from '@/components/ProcessBarDialog/ProcessBarDialog.vue';
  import { useHead } from '@vueuse/head';
  import GlobalThemeSettingBar from '../createTemplate/designer/components/GlobalThemeSettingBar.vue';

  const { HJNewJsonStore, selectedPageName } = storeToRefs(appStore.useCreateTemplateStore);
  const route = useRoute();

  // 响应式缩放比例
  const zoomScale = ref(1);
  const adjustZoomScale = () => {
    const rightBox = document.getElementById('resume-container') as HTMLElement;
    const fixedWidth = 820; // ResumeRender 的固定宽度
    if (rightBox) {
      // 获取容器宽度，减去左右 padding 的宽度
      const styles = window.getComputedStyle(rightBox);
      const paddingLeft = parseFloat(styles.paddingLeft || '0');
      const paddingRight = parseFloat(styles.paddingRight || '0');

      const availableWidth = rightBox.clientWidth - paddingLeft - paddingRight - 90; // 可用宽度
      zoomScale.value = availableWidth / fixedWidth; // 计算缩放比例
      if (zoomScale.value > 1) zoomScale.value = 1; // 限制最大比例为 1
    }
  };

  // 查询模版数据
  const getTemplateData = async () => {
    const data = await getTemplateByIdAsync(route.params.id);
    if (data.status === 200) {
      HJNewJsonStore.value = data.data.template_json;
      HJNewJsonStore.value.props.title = data.data.template_title;
      ElMessage.success('初始化成功');
      useHead({
        title: HJNewJsonStore.value.props.title || '91化简-开源简历制作神器',
        meta: [
          {
            name: 'description',
            content:
              '91化简-开源简历制作神器！免费制作一份精美的简历！内置两款设计器、快速设计、简历、封面、海报均可免费制作，支持一键导出高清PDF、JSON数据等。'
          },
          {
            name: 'keywords',
            content: '简历 开源 设计器 制作 PDF 高清简历 免费开源'
          }
        ]
      });
    } else {
      defaultTemplate();
    }
  };

  // 查询用户数据
  const getUserTemplate = async () => {
    const data = await getUsertemplateAsync(route.params.id);
    if (data.data.status === 200) {
      HJNewJsonStore.value = data.data.data.template_json;
      HJNewJsonStore.value.props.title = data.data.data.template_json.config.title;
      useHead({
        title: HJNewJsonStore.value.props.title || '91化简-开源简历制作神器',
        meta: [
          {
            name: 'description',
            content:
              '91化简-开源简历制作神器！免费制作一份精美的简历！内置两款设计器、快速设计、简历、封面、海报均可免费制作，支持一键导出高清PDF、JSON数据等。'
          },
          {
            name: 'keywords',
            content: '简历 开源 设计器 制作 PDF 高清简历 免费开源'
          }
        ]
      });
    } else {
      defaultTemplate();
    }
  };

  // 默认模版数据
  const defaultTemplate = () => {
    HJNewJsonStore.value = pageSchemas[selectedPageName.value];
    HJNewJsonStore.value.id = getUuid();
  };

  const { token } = appStore.useTokenStore;
  if (token) {
    // 查询用户简历
    getUserTemplate();
  } else {
    getTemplateData();
  }

  // 初始化和窗口变化事件绑定
  onMounted(async () => {
    adjustZoomScale();
    window.addEventListener('resize', adjustZoomScale);
    closeGlobalLoading(); // 闭全局等待层
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', adjustZoomScale);
  });

  // 生成pdf方法
  const dialogVisible = ref<boolean>(false);
  const percentage = ref<number>(10);
  let timer: any = null;
  const generateReport = async (type: string) => {
    dialogVisible.value = true;
    timer = setInterval(() => {
      percentage.value += 5;
      if (percentage.value > 95) {
        percentage.value = 98;
        clearInterval(timer);
      }
    }, 500);
    if (type === 'pdf') {
      await exportPdfNew(route.params.id as string);
    } else {
      await exportPNGNew(route.params.id as string);
    }

    clearInterval(timer);
    percentage.value = 100;
    // 查询用简币信息
    const { getUserIntegralTotal } = appStore.useUserInfoStore;
    getUserIntegralTotal();
  };

  // 关闭进度弹窗
  const cancleProgress = () => {
    dialogVisible.value = false;
    generateReport('pds');
    percentage.value = 10;
  };
</script>

<style lang="scss" scoped>
  .design-resume-box {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow-y: hidden;

    .bottom-box {
      width: 100%;
      flex: 1;
      display: flex;
      box-sizing: border-box;
      overflow: hidden;
      overflow-x: auto;
      // background-image: linear-gradient(to right, rgb(203 213 225) 1px, transparent 1px),
      //   linear-gradient(to bottom, rgb(203 213 225) 1px, transparent 1px);
      // background-size: 10px 10px;
      // background-position: center center;
      background-image: linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);

      .left {
        flex: 0 0 40%; // 固定宽度占比
        max-width: 40%; // 防止超出
        min-width: 450px; // 设置最小宽度（可以根据需求调整）
        background: #fff;

        .no-data {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #fff;

          p {
            font-size: 16px;
            letter-spacing: 1px;
            color: #2cbd99;
          }

          :deep(img) {
            width: 40%;
            height: auto;
          }
        }
      }

      .right {
        flex: 1; // 动态占据剩余空间
        min-width: 500px; // 设置最小宽度
        overflow-x: hidden;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 20px;
        position: relative;

        .resume-container {
          margin-top: 20px;
          width: 820px; // 固定宽度
          height: auto;
        }
      }
      .page-eidtor-box {
        width: 60px;
        min-height: 300px;
        position: absolute;
        right: 15px;
        top: 130px;
      }
    }

    :deep(.full-screen) {
      display: none;
      .el-drawer__body {
        overflow: hidden;
      }
    }
  }
</style>
