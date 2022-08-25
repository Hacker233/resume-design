<template>
  <div class="design-box">
    <!-- 导航栏 -->
    <design-nav @generate-report="generateReport" @reset="reset"></design-nav>
    <!-- 内容区域 -->
    <div class="bottom">
      <!-- 左侧添加模块区域 -->
      <div ref="leftRef" class="left">
        <c-scrollbar trigger="hover">
          <Title show-collapse @unflod-or-collapse="unflodOrCollapse"></Title>
          <model-list
            :key="refreshUuid"
            :left-show-status="leftShowStatus"
          ></model-list>
        </c-scrollbar>
      </div>

      <!-- 预览区域 -->
      <div :key="refreshUuid" class="center">
        <div ref="html2Pdf" class="design">
          <div ref="htmlContentPdf" class="design-content">
            <component is="custom" @content-height-change="contentHeightChange" />
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
      <div :key="refreshUuid" class="config">
        <Title :title="cptTitle"></Title>
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
  </div>
</template>

<script setup lang="ts">
  import Title from './components/Title.vue';
  import ModelList from './components/ModelList.vue';
  import GlobalStyleOptionsVue from '@/options/GlobalStyleOptions.vue';

  import downloadPDF from '@/utils/html2pdf'; // 下载为pdf
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { useRoute } from 'vue-router';
  import { CScrollbar } from 'c-scrollbar'; // 滚动条
  import DesignNav from './components/DesignNav.vue';
  import { ElMessage } from 'element-plus';
  import MODEL_DATA_JSON from '@/schema/modelData';
  import optionsComponents from '@/utils/registerMaterialOptionsCom';
  import { getTemplateJson } from '@/service/template/template';
  import IDESIGNJSON from '@/interface/design';

  const { cptTitle } = storeToRefs(appStore.useSelectMaterialStore);
  const { changeResumeJsonData } = appStore.useResumeJsonNewStore;
  const { refreshUuid } = storeToRefs(appStore.useUuidStore);
  const { setUuid } = appStore.useUuidStore;
  const { resumeJsonNewStore, importJson } = storeToRefs(appStore.useResumeJsonNewStore); // store里的模板数据

  // 重置数据方法
  const resetStoreAndLocal = async () => {
    let TEMPLATE_JSON;
    const url = `${location.origin}/json/${name}/template.json`;
    const data: IDESIGNJSON = await getTemplateJson(url);
    TEMPLATE_JSON = data;
    TEMPLATE_JSON.ID = id as string;
    TEMPLATE_JSON.NAME = name as string;
    TEMPLATE_JSON.COMPONENTS.forEach((item) => {
      item.data = MODEL_DATA_JSON[item.model];
    });
    changeResumeJsonData(TEMPLATE_JSON); // 更改store的数据
    setUuid();
    console.log('简历JSON数据', resumeJsonNewStore.value);
  };
  // 获取本地数据,初始化store里面的简历数据
  const localData = localStorage.getItem('resumeDraft');
  const route = useRoute();
  const { id, name } = route.query; // 模板id和模板名称
  // 模板1、模板2、模板3处理逻辑
  resumeJsonNewStore.value.ID = id as string;
  resumeJsonNewStore.value.NAME = name as string;
  if (localData) {
    let localObj = JSON.parse(localData)[id as string];
    if (localObj) {
      changeResumeJsonData(localObj);
    } else {
      resetStoreAndLocal();
    }
  } else {
    resetStoreAndLocal();
  }

  // 生命周期函数
  onMounted(async () => {
    resizeDOM();
    initClickListen();
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
    // console.log("reset",appStore)
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
    resetStoreAndLocal(); // 重置store数据
    globalStyleSetting(); // 重置选中模块
    // 删除本地该条数据
    let localData = localStorage.getItem('resumeDraft'); // 本地缓存数据
    if (localData) {
      let allData = JSON.parse(localData);
      if (Object.keys(allData).length > 1) {
        if (allData[id as string]) {
          delete allData[id as string]; // 删除该条数据
          localStorage.setItem('resumeDraft', JSON.stringify(allData));
        }
      } else {
        localStorage.removeItem('resumeDraft');
      }
    }
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
  const generateReport = async () => {
    let temp = linesNumber.value;
    linesNumber.value = 0;
    resetSelectModel(); // 重置选中模块
    await nextTick();
    downloadPDF(html2Pdf.value, resumeJsonNewStore.value.TITLE, false, () => {
      linesNumber.value = temp;
    });
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
  const unflodOrCollapse = (status: boolean) => {
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
</script>

<style lang="scss" scoped>
  .design-box {
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
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
        }
      }

      .config {
        width: 355px;
        background-color: #fff;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 50px);
      }
    }
  }
</style>
