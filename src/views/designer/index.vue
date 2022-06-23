<template>
  <div class="design-box">
    <!-- 导航栏 -->
    <nav class="nav-box">
      <div class="nav-left">
        <img src="@/assets/logo.png" alt="logo" srcset="" @click="toHome" />
        <span @click="toHome">化简</span>
      </div>
      <div class="nav-center">
        <span class="draft-tips">{{ draftTips }}</span>
        <p v-show="!isShowIpt">
          {{ resumeJsonStore.TITLE }}
          <el-icon :size="20" color="#409eff" @click="changeTitle">
            <Edit />
          </el-icon>
        </p>
        <el-input
          ref="titleIpf"
          v-show="isShowIpt"
          v-model="resumeJsonStore.TITLE"
          autofocus
          placeholder="请输入标题"
          @blur="blurTitle"
        />
      </div>
      <div class="nav-right">
        <el-button type="primary" @click="globalStyleSetting">全局样式设置</el-button>
        <el-button type="primary" @click="saveDraft">保存草稿</el-button>
        <!-- <el-button type="primary" @click="pdfPreview">预览</el-button> -->
        <el-button type="primary" @click="generateReport">导出PDF</el-button>
        <el-popconfirm
          title="重置会删除所有已编辑内容，是否继续?"
          @confirm="reset"
          confirmButtonText="确定"
          cancelButtonText="取消"
        >
          <template #reference>
            <el-button type="primary">重置</el-button>
          </template>
        </el-popconfirm>
      </div>
    </nav>
    <!-- 内容区域 -->
    <div class="bottom">
      <!-- 左侧添加模块区域 -->
      <div class="left">
        <Title></Title>
        <model-list></model-list>
      </div>
      <!-- 预览区域 -->
      <div class="center">
        <div class="design" ref="html2Pdf">
          <div class="design-content" ref="htmlContentPdf">
            <component :is="componentName" />
          </div>

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
      <!-- 参数修改区域 -->
      <div class="config">
        <Title :title="title"></Title>
        <component :is="useModel.model" v-if="useModel.model" :key="useModel.id" />
        <global-options v-else></global-options>
        <!-- <el-empty v-else description="请选择简历模块" /> -->
      </div>
    </div>
  </div>

  <!-- 预览弹窗 -->
  <PreviewImage v-show="previewDialog" @close="close">
    <VuePdf v-for="page in numOfPages" :key="page" :src="imgUrl" :page="page" :scale="0.5" />
  </PreviewImage>
</template>

<script setup lang="ts">
  import {
    ComponentInternalInstance,
    getCurrentInstance,
    nextTick,
    onBeforeUnmount,
    onBeforeUpdate,
    onMounted,
    ref,
    watch
  } from 'vue';
  import Title from './components/Title.vue';
  import ModelList from './components/ModelList.vue';
  import GlobalOptions from '@/components/CommonOptions/GlobalOptions.vue';
  import { debounce } from 'lodash'; // 防抖函数
  import TEMPLATE_JSON from '@/schema/model';
  import PreviewImage from '@/components/PreviewImage/PreviewImage.vue';

  import downloadPDF from '@/utils/html2pdf'; // 下载为pdf
  import { useResumeModelStore, useResumeJsonStore } from '@/store/resume';
  import { storeToRefs } from 'pinia';
  import { useRoute, useRouter } from 'vue-router';
  import styles from '@/schema/style';

  // 预览
  import { VuePdf, createLoadingTask } from 'vue3-pdfjs/esm';
  import type { VuePdfPropsType } from 'vue3-pdfjs/components/vue-pdf/vue-pdf-props'; // Prop type definitions can also be imported
  import type { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
  import { IResumeJson } from '@/types/model';

  const { title } = storeToRefs(useResumeModelStore());
  const store = useResumeJsonStore();
  let { resumeJsonStore } = storeToRefs(useResumeJsonStore()); // store里的模板数据
  // 获取全局挂载的moment对象
  const instance = getCurrentInstance() as ComponentInternalInstance;
  const moment = instance.appContext.config.globalProperties.$moment;

  // 判断每一模块是否有style属性，没有则加上
  const addStyle = (resumeJson: IResumeJson) => {
    resumeJson.LIST.map((item, index) => {
      if (!item.style) {
        item.style = styles[resumeJsonStore.value.NAME][item.model];
      }
      resumeJson.LIST[index] = item;
    });
    return resumeJson;
  };

  // 获取本地数据,初始化store里面的简历数据
  const localData = localStorage.getItem('resumeDraft');
  const route = useRoute();
  const { id, name } = route.query; // 模板id和模板名称
  resumeJsonStore.value.ID = id as string;
  resumeJsonStore.value.NAME = name as string;
  const componentName = ref<string>(name as string); // 模板名称,即渲染哪个模板
  if (localData) {
    let localObj = JSON.parse(localData)[id as string];
    if (localObj) {
      localObj = addStyle(localObj);
      store.changeResumeJsonData(localObj);
    } else {
      let resetObj = addStyle(TEMPLATE_JSON); // 初始数据
      store.changeResumeJsonData(resetObj); // 更改store的数据
    }
  } else {
    let resetObj = addStyle(TEMPLATE_JSON); // 初始数据
    store.changeResumeJsonData(resetObj); // 更改store的数据
  }

  // 跳转到首页
  const router = useRouter();
  const toHome = () => {
    router.push({
      path: '/'
    });
  };

  // 更改标题
  const titleIpf = ref<any>(null);
  const isShowIpt = ref<boolean>(false);
  const changeTitle = () => {
    isShowIpt.value = true;
    titleIpf.value.focus();
  };
  const blurTitle = () => {
    isShowIpt.value = false;
  };

  // 生命周期函数
  onMounted(async () => {
    resizeDOM();
  });
  onBeforeUnmount(() => {
    observer?.disconnect();
  });
  onBeforeUpdate(() => {
    lineRefs = [];
  });
  // 保存数据到本地
  let draftTips = ref<string>('');
  const saveDataToLocal = () => {
    let key = resumeJsonStore.value.ID; // 当前模板的id
    let saveData: { [key: string]: object } = {}; // 需要保存的数据
    let localData = localStorage.getItem('resumeDraft'); // 本地缓存数据
    if (localData) {
      saveData = JSON.parse(localData);
      saveData[key] = resumeJsonStore.value;
    } else {
      saveData[key] = resumeJsonStore.value;
    }
    localStorage.setItem('resumeDraft', JSON.stringify(saveData));
    const date = moment(new Date()).format('YYYY.MM.DD HH:mm:ss');
    draftTips.value = `已自动保存草稿  ${date}`;
  };

  // 自动保存草稿
  const debounced = debounce(() => {
    saveDataToLocal();
  }, 1000);
  watch(
    resumeJsonStore.value, // JSON数据发生变化，则保存草稿
    () => {
      debounced();
    },
    {
      deep: true
    }
  );

  // 属性设置
  const useModel = useResumeModelStore();
  // 全局样式设置
  const globalStyleSetting = () => {
    // 重置store选中模块
    useModel.$reset();
  };

  // 保存草稿
  const saveDraft = () => {
    saveDataToLocal();
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
  const reset = () => {
    let resetObj = addStyle(TEMPLATE_JSON); // 初始数据
    store.changeResumeJsonData(resetObj); // 更改store的数据
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
    location.reload();
  };

  // 生成pdf方法
  const generateReport = async () => {
    let temp = linesNumber.value;
    linesNumber.value = 0;
    useModel.$reset(); // 重置选中模块
    await nextTick();
    downloadPDF(html2Pdf.value, '个人简历', false, () => {
      linesNumber.value = temp;
    });
  };

  // 预览

  const imgUrl = ref<VuePdfPropsType['src']>('');
  const numOfPages = ref(0);
  const previewDialog = ref<boolean>(false);
  const pdfPreview = async () => {
    previewDialog.value = true;
    let temp = linesNumber.value;
    linesNumber.value = 0;
    await nextTick();
    downloadPDF(html2Pdf.value, '个人简历', true, (dataUrl: string) => {
      imgUrl.value = dataUrl;
      const loadingTask = createLoadingTask(dataUrl);
      loadingTask.promise.then((pdf: PDFDocumentProxy) => {
        numOfPages.value = pdf.numPages;
      });
      linesNumber.value = temp;
    });
  };
  const close = () => {
    previewDialog.value = false;
  };

  // 监听内容元素高度变化，绘制分割线
  const htmlContentPdf = ref<any>(null);
  let observer: ResizeObserver | null = null;
  let height: number = 0;
  let linesNumber = ref<number>(0);
  const resizeDOM = () => {
    observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        height = (entry.target as HTMLElement).offsetHeight;
        linesNumber.value = Math.ceil(height / 1160); // 有几条分割线
        html2Pdf.value.style.height = 1160 * linesNumber.value + 'px'; // 整个简历的高度
      }
    });
    observer.observe(htmlContentPdf.value); // 监听元素
  };
</script>

<style lang="less" scoped>
  .design-box {
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;

    .nav-box {
      height: 50px;
      width: 100%;
      background-color: #fff;
      position: sticky;
      top: 0;
      display: flex;
      .nav-left {
        width: 300px;
        display: flex;
        align-items: center;
        user-select: none;
        img {
          width: 60px;
          height: 60px;
          margin-left: 30px;
          cursor: pointer;
        }
        span {
          letter-spacing: 4px;
          font-size: 22px;
          font-weight: 600;
          font-family: cursive;
          color: green;
          cursor: pointer;
        }
      }
      .nav-center {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .draft-tips {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translate(0, -50%);
          font-size: 10px;
          color: #999999;
        }
        p {
          display: flex;
          align-items: center;
          font-size: 16px;
          .el-icon {
            margin-left: 10px;
            cursor: pointer;
          }
        }
        .el-input {
          width: 200px;
        }
      }
      .nav-right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .el-button {
          margin-right: 20px;
          margin-left: 0;
        }
      }
    }

    .bottom {
      display: flex;
      width: 100%;

      .left {
        width: 300px;
        background-color: #fff;
        height: calc(100vh - 50px);
        overflow: auto;
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
            height: 32px;
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
        width: 350px;
        background-color: #fff;
        overflow: auto;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 50px);
      }
    }
  }
</style>
