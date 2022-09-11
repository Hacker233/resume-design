<template>
  <div :key="refreshUuid" ref="html2Pdf" class="design">
    <div ref="htmlContentPdf" class="design-content">
      <component :is="custom" @content-height-change="contentHeightChange" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { getTemplateInfoAsync } from '@/http/api/resume';
  import IDESIGNJSON from '@/interface/design';
  import appStore from '@/store';
  import { closeGlobalLoading } from '@/utils/common';
  import { storeToRefs } from 'pinia';
  import custom from '@/template/custom/index.vue';
  closeGlobalLoading();

  const route = useRoute();
  let TEMPLATE_JSON: IDESIGNJSON;
  const { setUuid } = appStore.useUuidStore;
  const { refreshUuid } = storeToRefs(appStore.useUuidStore);
  const { changeResumeJsonData } = appStore.useResumeJsonNewStore;
  const { token, id, height } = route.query; // 模板id和模板名称
  console.log({ 'route-query': route.query });
  const getResumeData = async () => {
    if (token && id) {
      localStorage.setItem('token', token as string);
      const data = await getTemplateInfoAsync(id);
      if (data.data.status === 200) {
        TEMPLATE_JSON = data.data.data as IDESIGNJSON;
      } else {
        ElMessage.error('查询模板失败！');
        return;
      }
      changeResumeJsonData(TEMPLATE_JSON); // 更改store的数据
      setUuid();
    }
  };
  getResumeData();

  // 监听内容元素高度变化，绘制分割线
  const htmlContentPdf = ref<any>(null);
  const html2Pdf = ref<any>(null); // 获取元素节点
  let observer: ResizeObserver | null = null;
  const resizeDOM = () => {
    observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      for (let entry of entries) {
        html2Pdf.value.style.height = height; // 整个简历的高度
        htmlContentPdf.value.style.height = html2Pdf.value.style.height;
      }
    });
    observer.observe(htmlContentPdf.value); // 监听元素
  };

  // 子组件内容高度发生变化---需要重新计算高度，触发resizeDOM
  const contentHeightChange = async () => {
    await nextTick();
    resizeDOM();
  };
</script>
<style lang="scss" scoped>
  .design {
    background: white;
    width: 820px;
    min-height: 1160px;
    display: table;
    position: relative;
    margin: 0 auto;
  }
</style>
