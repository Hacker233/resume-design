<template>
  <div class="online-preview-box">
    <!-- 简历 -->
    <div :key="refreshUuid" ref="html2Pdf" class="design">
      <div ref="htmlContentPdf" class="design-content">
        <component :is="OnlineResumeVue" @content-height-change="contentHeightChange" />
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
          <p class="page">{{ index + 1 }}/{{ linesNumber }}</p>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import IDESIGNJSON from '@/interface/design';
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { getOnlineResumeAsync } from '@/http/api/userResume';
  import OnlineResumeVue from './components/OnlineResume.vue';

  const route = useRoute();
  let TEMPLATE_JSON: IDESIGNJSON;
  const { setUuid } = appStore.useUuidStore;
  const { refreshUuid } = storeToRefs(appStore.useUuidStore);
  const { changeResumeJsonData } = appStore.useResumeJsonNewStore;
  const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore); // store里的模板数据

  // 查询在线简历数据
  const getOnlineResume = async () => {
    const data = await getOnlineResumeAsync(route.params.id);
    if (data.status === 200) {
      TEMPLATE_JSON = data.data as IDESIGNJSON;
      changeResumeJsonData(TEMPLATE_JSON); // 更改store的数据
      setUuid();
    } else {
      ElMessage.error(data.message);
    }
  };

  getOnlineResume();

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
  const html2Pdf = ref<any>(null); // 获取元素节点
  let observer: ResizeObserver | null = null;
  let height = 0;
  let linesNumber = ref<number>(0);
  const resizeDOM = () => {
    observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
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
  };
</script>

<style lang="scss" scoped>
  .online-preview-box {
    padding: 30px 0;
    .design {
      background: white;
      width: 820px;
      min-height: 1160px;
      display: flex;
      position: relative;
      margin: 0 auto;
      border-radius: 5px;
      box-shadow: 0px 16px 22px 2px rgb(0 37 58 / 10%);
      .design-content {
        font-family: v-bind(
          'resumeJsonNewStore.GLOBAL_STYLE.fontFamily ? resumeJsonNewStore.GLOBAL_STYLE.fontFamily : "微软雅黑"'
        );
      }

      .lines {
        z-index: 10;
        width: 880px;
        height: 24px;
        background: #f3f3f3;
        user-select: none;
        pointer-events: none;
        position: absolute;
        display: flex;
        align-items: center;
        left: -30px;
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
</style>
