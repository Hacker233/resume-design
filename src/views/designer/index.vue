<template>
  <div class="design-box">
    <!-- 导航栏 -->
    <design-nav ref="navRef" @generate-report="generateReport" @reset="reset"></design-nav>
    <!-- 内容区域 -->
    <div class="bottom">
      <!-- 左侧添加模块区域 -->
      <div ref="leftRef" class="left">
        <c-scrollbar trigger="hover">
          <Title show-collapse @unfold-or-collapse="unfoldOrCollapse"></Title>
          <model-list :key="refreshUuid" :left-show-status="leftShowStatus"></model-list>
        </c-scrollbar>
      </div>

      <!-- 预览区域 -->
      <div :key="refreshUuid" class="center">
        <div ref="html2Pdf" class="design">
          <div ref="htmlContentPdf" class="design-content">
            <component :is="custom" @content-height-change="contentHeightChange" />
          </div>
          <!-- 分页线 -->
          <template v-if="linesNumber > 0">
            <div
              v-for="(item, index) in linesNumber"
              :ref="(el) => setLinesRef(el, index)"
              :key="index"
              class="lines"
              :style="{ top: `${1128 + 1132 * index}px` }"
            >
              <p class="tips">如果分割线遮挡内容，请通过调整模块上下边距以显示内容！</p>
              <p class="page">{{ index + 1 }}/{{ linesNumber }}</p>
            </div>
          </template>
        </div>
      </div>
      <!-- 属性设置面板 -->
      <div :key="refreshUuid" ref="configRef" class="config">
        <title-config :title="cptTitle" @unfold-or-collapse="unfoldOrCollapseConfig">
        </title-config>
        <c-scrollbar
          trigger="hover"
          :h-thumb-style="{
            'background-color': 'rgba(0,0,0,0.4)'
          }"
        >
          <component
            :is="optionsComponents[appStore.useSelectMaterialStore.cptOptionsName]"
            v-if="appStore.useSelectMaterialStore.cptName"
            :key="appStore.useSelectMaterialStore.cptKeyId"
          />
          <!-- 全局主题样式设置 -->
          <global-style-options-vue v-else></global-style-options-vue>
        </c-scrollbar>
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

<script setup lang="ts">
  import Title from './components/Title.vue';
  import TitleConfig from './components/TitleConfig.vue';
  import ModelList from './components/ModelList.vue';
  import GlobalStyleOptionsVue from '@/options/GlobalStyleOptions.vue';
  import custom from '@/template/custom/index.vue';
  import ProcessBarDialog from '@/components/ProcessBarDialog/ProcessBarDialog.vue';
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { useRoute } from 'vue-router';
  import { CScrollbar } from 'c-scrollbar'; // 滚动条
  import DesignNav from './components/DesignNav.vue';
  import { ElMessage } from 'element-plus';
  import optionsComponents from '@/utils/registerMaterialOptionsCom';
  import IDESIGNJSON from '@/interface/design';
  import { closeGlobalLoading } from '@/utils/common';
  import { getTemplateInfoAsync, getResetTemplateInfoAsync } from '@/http/api/resume';
  import exportPdf from '@/utils/pdf';

  const { cptTitle } = storeToRefs(appStore.useSelectMaterialStore);
  const { changeResumeJsonData } = appStore.useResumeJsonNewStore;
  const { refreshUuid } = storeToRefs(appStore.useUuidStore);
  const { setUuid } = appStore.useUuidStore;
  const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore); // store里的模板数据
  const route = useRoute();
  const { id } = route.query; // 模板id和模板名称

  // 查询简历数据，有草稿返回草稿，没有草稿返回简历数据
  const resetStoreAndLocal = async (isReset = false) => {
    let TEMPLATE_JSON: IDESIGNJSON;
    let data;
    if (isReset) {
      data = await getResetTemplateInfoAsync(id); // 重置
    } else {
      data = await getTemplateInfoAsync(id);
    }
    if (data.data.status === 200) {
      TEMPLATE_JSON = data.data.data as IDESIGNJSON;
    } else {
      ElMessage.error('查询模板失败！');
      return;
    }
    changeResumeJsonData(TEMPLATE_JSON); // 更改store的数据
    setUuid();
    console.log('简历JSON数据', resumeJsonNewStore.value);
  };
  resetStoreAndLocal();

  // 生命周期函数
  onMounted(async () => {
    resizeDOM();
    initClickListen();

    await nextTick();
    closeGlobalLoading(); // 关闭全局等待层
  });
  onBeforeUnmount(() => {
    observer?.disconnect();
  });
  onBeforeUpdate(() => {
    lineRefs = [];
  });

  // 属性设置
  const { resetSelectModel } = appStore.useSelectMaterialStore;
  // 全局样式设置
  const globalStyleSetting = () => {
    // 重置store选中模块
    resetSelectModel();
  };

  // 导出pdf
  const html2Pdf = ref<any>(null); // 获取元素节点
  let lineRefs: Array<any> = []; // 分割线的ref
  const setLinesRef = (el: any, index: number) => {
    if (el) {
      if (linesNumber.value === index + 1) {
        el.style.top = linesNumber.value * 1160 + 'px'; // 最后一条分割线出现在底部
      }
      lineRefs.push(el);
    }
  };

  // 重置数据
  const reset = async () => {
    resetStoreAndLocal(true); // 重置store数据
    globalStyleSetting(); // 重置选中模块
    ElMessage({
      message: '重置成功!',
      type: 'success',
      center: true
    });
    setUuid(); // 重新渲染左侧列表和右侧属性面板设置
    await nextTick();
    resizeDOM();
  };

  // 生成pdf方法
  const dialogVisible = ref<boolean>(false);
  const percentage = ref<number>(10);
  let timer: any = null;
  const generateReport = async () => {
    dialogVisible.value = true;
    timer = setInterval(() => {
      percentage.value += 5;
      if (percentage.value > 95) {
        percentage.value = 98;
        clearInterval(timer);
      }
    }, 500);
    let token = localStorage.getItem('token') as string;
    let height = htmlContentPdf.value.style.height;
    await exportPdf(token, id as string, height);
    clearInterval(timer);
    percentage.value = 100;
  };

  // 关闭进度弹窗
  const cancleProgress = () => {
    dialogVisible.value = false;
    percentage.value = 10;
  };

  // 监听内容元素高度变化，绘制分割线
  const htmlContentPdf = ref<any>(null);
  let observer: ResizeObserver | null = null;
  let height = 0;
  let linesNumber = ref<number>(0);
  const resizeDOM = () => {
    observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        height = (entry.target as HTMLElement).offsetHeight;
        linesNumber.value = Math.ceil(height / 1160); // 有几条分割线
        html2Pdf.value.style.height = 1160 * linesNumber.value + 'px'; // 整个简历的高度
        htmlContentPdf.value.style.height = html2Pdf.value.style.height;
      }
    });
    observer.observe(htmlContentPdf.value); // 监听元素
  };

  // 子组件内容高度发生变化---需要重新计算高度，触发resizeDOM
  const contentHeightChange = async (height: number) => {
    htmlContentPdf.value.style.height = height + 'px';
    await nextTick();
    resizeDOM();
    console.log('子组件内容高度发生变化---需要重新计算高度', htmlContentPdf.value.style.height);
  };

  // 点击其它区域，取消模块选择，即取消模块选中效果
  const initClickListen = () => {
    window.addEventListener('click', dealClick);
  };
  const dealClick = (e: MouseEvent) => {
    const bool = getTargetNode(htmlContentPdf.value, e.target);
    if (bool) {
      globalStyleSetting();
    }
  };
  const getTargetNode = (ele: any, target: any): boolean => {
    if (!ele || ele === document) return false;
    return ele === target ? true : getTargetNode(ele.parentNode, target);
  };
  onBeforeUnmount(() => {
    window.removeEventListener('click', dealClick);
  });

  // 展开或收起左侧栏
  const leftRef = ref<any>(null);
  const leftShowStatus = ref<boolean>(true);
  const unfoldOrCollapse = (status: boolean) => {
    if (status) {
      setTimeout(() => {
        leftShowStatus.value = status;
      }, 100);
      leftRef.value.style.width = '300px';
    } else {
      setTimeout(() => {
        leftShowStatus.value = status;
      }, 100);
      leftRef.value.style.width = '70px';
    }
  };

  // 展开或收起属性面板设置
  const configRef = ref<any>(null);
  const unfoldOrCollapseConfig = (status: boolean) => {
    if (status) {
      configRef.value.style.width = '355px';
      configRef.value.style.flex = 'inherit';
    } else {
      configRef.value.style.flex = 1;
    }
  };
  // 页面销毁前自动保存草稿
  // const navRef = ref<any>(null);
  // onBeforeUnmount(() => {
  //   navRef.value.saveDataToLocal();
  // });

  // 页面销毁
  onUnmounted(() => {
    if (timer) {
      clearInterval(timer);
    } // 关闭全局等待层
  });
</script>
<style lang="scss">
  @import '../../style/options.scss';
</style>
<style lang="scss" scoped>
  .design-box {
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    font-family: 'Microsoft YaHei';
    .bottom {
      display: flex;
      width: 100%;

      .left {
        width: 300px;
        background-color: #fff;
        height: calc(100vh - 50px);
        overflow: auto;
        transition: all 0.3s;
      }

      .center {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex: 1;
        min-width: 840px;
        height: calc(100vh - 50px);
        overflow: auto;

        .design {
          background: white;
          width: 820px;
          min-height: 1160px;
          margin: 30px 0;
          display: table;
          position: relative;
          .lines {
            z-index: 10;
            width: 820px;
            height: 24px;
            background: #f3f3f3 url(@/assets/images/paging_bg.png) center top no-repeat;
            user-select: none;
            pointer-events: none;
            position: absolute;
            display: flex;
            align-items: center;
            .tips {
              font-size: 9px;
              color: #c7c7c7;
            }
            .page {
              font-size: 9px;
              color: #999999;
            }
            .page {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
          }
          .design-content {
            font-family: 'Microsoft YaHei';
          }
        }
      }

      .config {
        min-width: 355px;
        // max-width: 1000px;
        background-color: #fff;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 50px);
        transition: all 0.3s;
      }
    }
  }
</style>
