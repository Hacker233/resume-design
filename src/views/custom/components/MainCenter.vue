<template>
  <!-- <c-scrollbar trigger="hover"> -->
  <div class="main-center-box">
    <!-- 设计区域 -->
    <div class="design" ref="html2Pdf">
      <div
        ref="htmlContentPdf"
        class="center-box"
        @dragenter="handleDragenter"
        @dragover="handleDragover"
        @dragleave="handleDragleave"
        @drop="handleDrop"
      >
        <!-- 常规布局 -->
        <draggable
          :list="designJsonStore.components"
          itemKey="id"
          ghost-class="ghost"
          chosen-class="chosenClass"
          animation="300"
          @start="onStart"
          @end="onEnd"
        >
          <template #item="{ element, index }">
            <model-box :components="components" :item="element"></model-box
          ></template>
        </draggable>
        <!-- <template v-for="(item, index) in designJsonStore.components">
          <model-box :components="components" :item="item"></model-box>
        </template> -->
        <!-- 拖拽提示 -->
        <!-- <div class="drag-tip-box" v-show="isShowDragTip">
          <svg-icon iconName="icon-jia" className="yulan" size="50px" color="#2ddd9d"></svg-icon>
          <p>组件将会放置在此处~</p>
        </div> -->
        <!-- 分页线 -->
        <template v-if="linesNumber > 0">
          <div
            class="lines"
            v-for="(item, index) in linesNumber"
            :ref="(el) => setLinesRef(el, index)"
            :style="{ top: `${1128 + 1132 * index}px` }"
          >
            <p class="tips">如果分割线遮挡内容，请通过调整模块上下边距以显示内容！</p>
            <p class="page">{{ index + 1 }}/{{ linesNumber }}</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { IMATERIALITEM } from '@/interface/material.js';
  import MODEL_DATA_JSON from '@/schema/modelData';
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import ModelBox from './ModelBox.vue';
  import { getUuid } from '@/utils/common';
  import draggable from 'vuedraggable';
  import { cloneDeep } from 'lodash'; // 深拷贝
  import downloadPDF from '@/utils/html2pdf';

  defineProps<{
    components: any;
  }>();

  // 生命周期函数
  onMounted(async () => {
    resizeDOM();
    initClickListen();
  });

  // 是否是当前页面拖拽
  const isCurrentPage = ref<boolean>(false);
  const onStart = () => {
    isCurrentPage.value = true;
  };
  const onEnd = () => {
    isCurrentPage.value = false;
  };

  // store相关数据
  const { designJsonStore } = storeToRefs(appStore.useDesignStore);
  const { pushComponent } = appStore.useDesignStore;

  // 源对象进入目标对象时
  const isShowDragTip = ref<boolean>(false); // 是否显示拖拽提示
  const handleDragenter = (evt: DragEvent) => {
    // console.log('目标对象被源对象拖动着进入');
  };

  // 源对象悬停在目标对象上时
  const handleDragover = (evt: DragEvent) => {
    evt.preventDefault();
    // console.log('源对象悬停在目标对象上时', evt);
  };

  // 拖拽对象离开
  const handleDragleave = (evt: DragEvent) => {
    console.log('拖拽对象离开');
  };

  // 源对象在目标对象上松手
  const handleDrop = (evt: DragEvent) => {
    if (isCurrentPage.value) {
      return;
    }
    let cptData: IMATERIALITEM = JSON.parse(evt.dataTransfer?.getData('cptData') as string);
    // 处理组件数据
    // cptData.cptWidth = '100%';
    cptData.data = cloneDeep(MODEL_DATA_JSON[cptData.model]); // 为模块添加数据
    cptData.keyId = getUuid();
    pushComponent(cptData); // 添加模块
    // console.log('designJsonStore.components', designJsonStore.value.components);
    // console.log('源对象在目标对象上松手', cptData);
  };

  // 分割线
  const linesNumber = ref<number>(1);
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

  // 监听内容元素高度变化，绘制分割线
  const htmlContentPdf = ref<any>(null);
  let observer: ResizeObserver | null = null;
  let height: number = 0;
  const resizeDOM = () => {
    observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        height = (entry.target as HTMLElement).offsetHeight;
        console.log('htmlContentPdf高度发生变化', height);
        linesNumber.value = Math.ceil(height / 1160); // 有几条分割线
        html2Pdf.value.style.height = 1160 * linesNumber.value + 'px'; // 整个简历的高度
        // htmlContentPdf.value.style.height = html2Pdf.value.style.height;
      }
    });
    observer.observe(htmlContentPdf.value); // 监听元素
  };

  // 全局样式设置
  const { resetSelectModel } = appStore.useSelectMaterialStore;
  const globalStyleSetting = () => {
    // 重置store选中模块
    resetSelectModel();
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

  // 生成pdf方法
  const generateReport = async () => {
    let temp = linesNumber.value;
    linesNumber.value = 0;
    resetSelectModel(); // 重置选中模块
    await nextTick();
    downloadPDF(html2Pdf.value, designJsonStore.value.TITLE, false, () => {
      linesNumber.value = temp;
    });
  };

  defineExpose({
    generateReport
  });
</script>
<style lang="scss" scoped>
  .c-scrollbar {
    flex: 1;
  }
  .main-center-box {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex: 1;
    height: calc(100vh - 50px);
    padding: 30px 0;
    box-sizing: border-box;
    overflow: auto;
    .design {
      background: white;
      width: 820px;
      min-height: 1160px;
      display: table;
      position: relative;
      .center-box {
        width: 820px;
        min-height: 1160px;
        background-color: #fff;
        box-sizing: border-box;
        position: relative;
        z-index: 0;
        .drag-tip-box {
          width: 100%;
          height: 150px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          justify-content: center;
          background-color: rgba(#2ddd9d, 0.2);
          border-radius: 10px;
          border: 2px dashed #2ddd9d;
          p {
            font-size: 16px;
            color: #2ddd9d;
            margin-top: 20px;
          }
        }
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
  }
</style>
