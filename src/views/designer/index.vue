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
          <div
            class="lines"
            v-for="(item, index) in linesNumber"
            :style="{ top: `${(index + 1) * 1160}px` }"
          ></div>
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
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import Title from './components/Title.vue';
  import ModelList from './components/ModelList.vue';

  import downloadPDF from '@/utils/html2pdf'; // 下载为pdf
  import { useResumeModelStore } from '@/store/resume';

  // 声明周期函数
  onMounted(() => {
    resizeDOM();
  });
  onBeforeUnmount(() => {
    observer?.disconnect();
  });

  const componentName = ref<string>('web-develop'); // 模板名称

  // 属性设置
  const useModel = useResumeModelStore();

  // 导出pdf
  const html2Pdf = ref<any>(null); // 获取元素节点
  const generateReport = () => {
    downloadPDF(html2Pdf.value, '个人简历');
  };

  // 监听元素高度变化，绘制分割线
  let observer: ResizeObserver | null = null;
  let height: number = 0;
  let linesNumber = ref<number>(0);
  const resizeDOM = () => {
    observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        height = (entry.target as HTMLElement).offsetHeight;
        linesNumber.value = Math.floor(height / 1160); // 有几条分割线
        console.log('高度', (entry.target as HTMLElement).offsetHeight);
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
        flex: 1;
        height: calc(100vh - 50px);
        overflow: auto;

        .design {
          background: white;
          width: 820px;
          // min-height: 1160px;
          margin: 30px 0;
          display: table;
          position: relative;
          .lines {
            height: 10px;
            width: 100%;
            position: absolute;
            background-image: url(@/assets/images/paging_bg.png);
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
