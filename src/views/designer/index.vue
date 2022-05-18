<template>
  <div class="design-box">
    <!-- 导航栏 -->
    <nav class="nav-box">
      <el-button @click="generateReport">下载</el-button>
    </nav>
    <!-- 内容区域 -->
    <div class="bottom">
      <!-- 左侧添加模块区域 -->
      <div class="left">
        <Title title="模块选择"></Title>
        <model-list></model-list>
      </div>
      <!-- 预览区域 -->
      <div class="center">
        <div class="design" ref="html2Pdf">
          <component :is="componentName" />
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
        <Title></Title>
        <component :is="useModel.model" v-if="useModel.model" />
        <el-empty v-else description="请选择简历模块" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, onBeforeUnmount, onBeforeUpdate, onMounted, ref } from 'vue';
  import Title from './components/Title.vue';
  import ModelList from './components/ModelList.vue';

  import downloadPDF from '@/utils/html2pdf'; // 下载为pdf
  import { useResumeModelStore } from '@/store/resume';

  // 声明周期函数
  onMounted(async () => {
    resizeDOM();
  });
  onBeforeUnmount(() => {
    observer?.disconnect();
  });
  onBeforeUpdate(() => {
    lineRefs = [];
  });

  const componentName = ref<string>('web-develop'); // 模板名称

  // 属性设置
  const useModel = useResumeModelStore();

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
  // 生成pdf方法
  const generateReport = async () => {
    let temp = linesNumber.value;
    linesNumber.value = 0;
    await nextTick();
    downloadPDF(html2Pdf.value, '个人简历', () => {
      linesNumber.value = temp;
    });
  };

  // 监听元素高度变化，绘制分割线
  let observer: ResizeObserver | null = null;
  let height: number = 0;
  let linesNumber = ref<number>(0);
  const resizeDOM = () => {
    observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        height = (entry.target as HTMLElement).offsetHeight;
        linesNumber.value = Math.ceil(height / 1160); // 有几条分割线
        html2Pdf.value.style.height = 1160 * linesNumber.value + 'px';
        console.log(html2Pdf.value);
      }
    });
    observer.observe(html2Pdf.value); // 监听元素
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
