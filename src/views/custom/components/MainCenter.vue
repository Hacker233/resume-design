<template>
  <!-- <c-scrollbar trigger="hover"> -->
  <div class="main-center-box">
    <!-- 设计区域 -->
    <component :is="resumeBackgroundName" ref="html2Pdf">
      <div ref="htmlContentPdf" class="content-box">
        <!-- 传统布局 -->
        <template v-if="resumeJsonNewStore.LAYOUT === 'classical'">
          <draggable
            class="dragArea list-group"
            :list="resumeJsonNewStore.COMPONENTS"
            animation="500"
            group="custom"
            :sort="true"
            item-key="id"
          >
            <template #item="{ element }">
              <div class="list-group-item">
                <model-box :components="components" :item="element"></model-box>
              </div>
            </template>
          </draggable>
        </template>

        <!-- 左右两列布局 -->
        <template v-else>
          <div class="left-box">
            <draggable
              class="left-drag-area"
              :list="leftList"
              animation="500"
              group="custom"
              :sort="true"
              item-key="id"
            >
              <template #item="{ element }">
                <div class="list-group-item">
                  <model-box
                    :components="components"
                    :item="element"
                    @left-right-delete="leftDelete"
                    @left-right-add="leftAdd"
                  ></model-box>
                </div>
              </template>
            </draggable>
          </div>
          <div class="right-box">
            <draggable
              class="right-drag-area"
              :list="rightList"
              animation="500"
              group="custom"
              :sort="true"
              item-key="id"
            >
              <template #item="{ element }">
                <div class="list-group-item">
                  <model-box
                    :components="components"
                    :item="element"
                    @left-right-delete="rightDelete"
                    @left-right-add="rightAdd"
                  ></model-box>
                </div>
              </template>
            </draggable>
          </div>
        </template>

        <!-- 拖拽提示 -->
        <div
          v-if="!resumeJsonNewStore.COMPONENTS.length && resumeJsonNewStore.LAYOUT === 'classical'"
          class="drag-tip-box"
        >
          <svg-icon icon-name="icon-jia" class-name="yulan" size="70px" color="#2ddd9d"></svg-icon>
          <p>请将组件拖拽或者点击放置此处~</p>
        </div>
        <!-- 分割线 -->
        <template v-if="linesNumber > 0">
          <div
            v-for="(item, index) in linesNumber"
            :key="index"
            :ref="(el) => setLinesRef(el, index)"
            class="lines"
            :style="{ top: `${1128 + 1132 * index}px` }"
          >
            <p class="tips">如果分割线遮挡内容，请通过调整模块上下边距以显示内容！</p>
            <p class="page">{{ index + 1 }}/{{ linesNumber }}</p>
          </div>
        </template>
      </div>
      <!-- 布局模式切换组件 -->
      <mode-switch></mode-switch>
    </component>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import ModelBox from './ModelBox.vue';
  import draggable from 'vuedraggable';
  import downloadPDF from '@/utils/html2pdf';
  import ModeSwitch from './ModeSwitch.vue';
  import { IMATERIALITEM } from '@/interface/material';
  import { getUuid } from '@/utils/common';
  import { cloneDeep } from 'lodash';
  import IDESIGNJSON from '@/interface/design';
  import { getResetTemplateInfoAsync } from '@/http/api/resume';
  import resumeBackgroundComponents from '@/utils/registerResumeBackgroundCom';

  defineProps<{
    components: any;
  }>();

  // 生命周期函数
  const route = useRoute();
  onMounted(async () => {
    if (route.query.ID) {
      resetStoreAndLocal(route.query.ID as string);
    }
    resizeDOM();
    initClickListen();
  });

  // store相关数据
  const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore);
  const resumeBackgroundName = computed(() => {
    return resumeJsonNewStore.value.GLOBAL_STYLE.resumeBackgroundCom
      ? resumeBackgroundComponents[resumeJsonNewStore.value.GLOBAL_STYLE.resumeBackgroundCom]
      : resumeBackgroundComponents['RESUME_BACKGROUND_DEFAULT'];
  });

  // 如果传了ID，则通过ID查询数据
  const { changeResumeJsonData } = appStore.useResumeJsonNewStore;
  const { setUuid } = appStore.useUuidStore;
  const resetStoreAndLocal = async (ID: string) => {
    let TEMPLATE_JSON: IDESIGNJSON;
    let data = await getResetTemplateInfoAsync(ID);
    if (data.data.status === 200) {
      TEMPLATE_JSON = data.data.data as IDESIGNJSON;
    } else {
      ElMessage.error('查询模板失败！');
      return;
    }
    changeResumeJsonData(TEMPLATE_JSON); // 更改store的数据
    // 如果是左右布局，需要手动赋值左右组件
    if (resumeJsonNewStore.value.LAYOUT !== 'classical') {
      resumeJsonNewStore.value.COMPONENTS.forEach((item: IMATERIALITEM) => {
        if (item.layout === 'left') {
          leftList.value.push(item);
        } else {
          rightList.value.push(item);
        }
      });
    }
    console.log('leftList', leftList.value);
    console.log('rightList', rightList.value);
    setUuid();
    console.log('简历JSON数据', resumeJsonNewStore.value);
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
  let height = 0;
  const resizeDOM = () => {
    observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        height = (entry.target as HTMLElement).offsetHeight;
        console.log('htmlContentPdf高度发生变化', height);
        linesNumber.value = Math.ceil(height / 1160); // 有几条分割线
        console.log('分割线数目', linesNumber.value, height);
        console.log('htmlPdf', html2Pdf.value);
        html2Pdf.value.$el.style.height = 1160 * linesNumber.value + 'px'; // 整个简历的高度
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
    downloadPDF(html2Pdf.value.$el, resumeJsonNewStore.value.TITLE, false, () => {
      linesNumber.value = temp;
    });
  };

  /**
   * 左右两列布局
   */
  // 左侧列表
  const leftList = ref<any>([]);
  // 右侧列表
  const rightList = ref<any>([]);

  watch(
    () => leftList.value,
    () => {
      leftList.value.forEach((item: IMATERIALITEM) => {
        item.layout = 'left';
      });
      resumeJsonNewStore.value.COMPONENTS = leftList.value.concat(rightList.value);
      console.log('最新designJsonStore', resumeJsonNewStore.value.COMPONENTS, leftList.value);
    },
    {
      deep: true
    }
  );
  watch(
    () => rightList.value,
    () => {
      rightList.value.forEach((item: IMATERIALITEM) => {
        item.layout = 'right';
      });
      resumeJsonNewStore.value.COMPONENTS = leftList.value.concat(rightList.value);
      console.log('最新designJsonStore', resumeJsonNewStore.value.COMPONENTS, rightList.value);
    },
    {
      deep: true
    }
  );
  // 左侧模块删除
  const leftDelete = (keyId: string) => {
    let index: number = leftList.value.findIndex((item: IMATERIALITEM) => item.keyId === keyId);
    leftList.value.splice(index, 1);
    resumeJsonNewStore.value.COMPONENTS = leftList.value.concat(rightList.value);
  };
  // 右侧模块删除
  const rightDelete = (keyId: string) => {
    let index: number = rightList.value.findIndex((item: IMATERIALITEM) => item.keyId === keyId);
    rightList.value.splice(index, 1);
    resumeJsonNewStore.value.COMPONENTS = leftList.value.concat(rightList.value);
  };
  // 左侧模块复制
  const leftAdd = (modeItem: IMATERIALITEM) => {
    let index: number = leftList.value.findIndex(
      (item: IMATERIALITEM) => item.keyId === modeItem.keyId
    );
    let insert = cloneDeep(modeItem);
    insert.keyId = getUuid();
    leftList.value.splice(index, 0, insert);
    resumeJsonNewStore.value.COMPONENTS = leftList.value.concat(rightList.value);
  };
  // 右侧模块复制
  const rightAdd = (modeItem: IMATERIALITEM) => {
    let index: number = rightList.value.findIndex(
      (item: IMATERIALITEM) => item.keyId === modeItem.keyId
    );
    let insert = cloneDeep(modeItem);
    insert.keyId = getUuid();
    rightList.value.splice(index, 0, insert);
    resumeJsonNewStore.value.COMPONENTS = leftList.value.concat(rightList.value);
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
    padding: 65px 0;
    box-sizing: border-box;
    overflow: auto;
    .design {
      width: 820px;
      min-height: 1160px;
      display: table;
      position: relative;
      .content-box {
        // position: relative;
        .dragArea {
          min-width: 820px;
          min-height: 300px;
          width: 820px;
          min-height: 1160px;
          // background-color: #fff;
          box-sizing: border-box;
          position: relative;
          z-index: 0;
        }
        .left-box {
          width: v-bind('resumeJsonNewStore.GLOBAL_STYLE.leftWidth');
          box-sizing: border-box;
          background-color: v-bind('resumeJsonNewStore.GLOBAL_STYLE.leftThemeColor');
          min-height: 1160px;
          position: absolute;
          height: 100%;
          .left-drag-area {
            min-height: 1160px;
            width: 100%;
          }
        }
        .right-box {
          min-height: 1160px;
          width: v-bind('resumeJsonNewStore.GLOBAL_STYLE.rightWidth');
          margin-left: v-bind('resumeJsonNewStore.GLOBAL_STYLE.leftWidth');
          background-color: v-bind('resumeJsonNewStore.GLOBAL_STYLE.rightThemeColor');
          .right-drag-area {
            min-height: 1160px;
            width: 100%;
          }
        }
        // 拖拽提示
        .drag-tip-box {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          width: 70%;
          height: 250px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          justify-content: center;
          background-color: rgba(#2ddd9d, 0.2);
          border-radius: 10px;
          // border: 2px dashed #2ddd9d;
          p {
            font-size: 20px;
            color: #2ddd9d;
            margin-top: 20px;
          }
        }
        // 分割线
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
