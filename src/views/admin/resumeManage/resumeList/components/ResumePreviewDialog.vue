<template>
  <el-dialog
    ref="ruleFormRef"
    :model-value="dialogVisible"
    width="820px"
    :show-close="false"
    lock-scroll
    destroy-on-close
    custom-class="import-json"
    :close-on-click-modal="false"
    title="预览简历"
  >
    <c-scrollbar trigger="hover" style="height: 80vh">
      <div v-if="row" :key="refreshUuid" ref="html2Pdf" class="design">
        <div ref="htmlContentPdf" class="design-content">
          <component :is="custom" @content-height-change="contentHeightChange" />
        </div>
      </div>
    </c-scrollbar>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancle">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import custom from '@/template/custom/index.vue';
  import { storeToRefs } from 'pinia';
  const emit = defineEmits(['cancle']);
  interface TDialog {
    dialogVisible: boolean;
    row: any;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogVisible: false,
    row: null
  });

  // 取消
  const cancle = () => {
    emit('cancle');
  };
  const { setUuid } = appStore.useUuidStore;
  const { changeResumeJsonData } = appStore.useResumeJsonNewStore;
  changeResumeJsonData(props.row); // 更改store的数据
  setUuid();

  const { refreshUuid } = storeToRefs(appStore.useUuidStore);

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
        if ((entry.target as HTMLElement).offsetHeight) {
          height = (entry.target as HTMLElement).offsetHeight;
          linesNumber.value = Math.ceil(height / 1160); // 有几条分割线
          html2Pdf.value.style.height = 1160 * linesNumber.value + 'px'; // 整个简历的高度
          htmlContentPdf.value.style.height = html2Pdf.value.style.height;
        }
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
