<template>
  <el-drawer
    :model-value="drawer"
    :size="820"
    class="ai-optimize-drawer"
    direction="rtl"
    title="AI诊断结果"
    @close="handleClose"
    @open="handleOpen"
  >
    <!-- 自定义头部 -->
    <template #header>
      <div class="optimize-drawer-custom-header">
        <div class="left">
          <img src="@/assets/images/ai-translate.webp" width="24" height="24" />
          <span class="header-title">AI诊断结果</span>
        </div>
        <!-- 剩余简币 -->
        <div class="content-box">
          <p class="jb-num">
            {{ formattedIntegral }}
            <img width="18" src="@/assets/images/jianB.png" alt="简币" />
          </p>
        </div>
      </div>
    </template>
    <div
      ref="contentRef"
      v-loading="isLoading"
      v-dompurify-html="renderedContent"
      class="ai-optimize-content markdown-body"
    ></div>
  </el-drawer>
</template>

<script lang="ts" setup>
  import {
    aiFailAsync,
    cancelOptimizeResumeStreamAsync,
    getSerialNumberAsync,
    optimizeResumeStreamAsync
  } from '@/http/api/ai';
  import appStore from '@/store';
  import { extractResumeData, formatNumberWithCommas } from '@/utils/common';
  import { ElNotification, ElMessage } from 'element-plus';
  import { storeToRefs } from 'pinia';
  import MarkdownIt from 'markdown-it';

  const emit = defineEmits(['closeAiOptimizeDrawer']);

  const route = useRoute();

  interface IJsonDrawer {
    drawer: boolean;
    modelInfoObj?: any;
    content?: string;
  }
  const props = withDefaults(defineProps<IJsonDrawer>(), {
    drawer: false,
    modelInfoObj: {},
    content: ''
  });

  const md = new MarkdownIt();

  // 关闭弹窗
  const handleClose = () => {
    if (streamController.value) {
      cancelOptimizeResumeStreamAsync(streamController.value);
    }
    emit('closeAiOptimizeDrawer');
  };

  // 计算属性
  const formattedIntegral = computed(() => {
    return formatNumberWithCommas(appStore.useUserInfoStore.userIntegralInfo.integralTotal);
  });

  // 是否等待
  const isLoading = ref(false);

  const { getAndUpdateUserInfo } = appStore.useUserInfoStore;
  const streamController = ref<AbortController | null>(null); // 流式请求控制器
  const aiContent = ref('');
  const renderedContent = computed(() => {
    return md.render(aiContent.value);
  });

  const contentRef = ref<HTMLElement | null>(null);

  // 监听 aiContent 的变化，自动滚动到底部
  watch(aiContent, () => {
    nextTick(() => {
      if (contentRef.value && !props.content) {
        // 强制滚动到底部
        contentRef.value.scrollTop = contentRef.value.scrollHeight;
      }
    });
  });

  // 打开抽屉
  const serialNumber = ref('');
  const handleOpen = async () => {
    if (props.content) {
      aiContent.value = props.content;
      isLoading.value = false;
      return;
    }
    // 先获取流水号
    const serialNumberResult = await getSerialNumberAsync();
    if (serialNumberResult.data.status == 200) {
      serialNumber.value = serialNumberResult.data.data;
    } else {
      ElMessage.error('流水号生成失败');
      return;
    }

    aiContent.value = '';
    isLoading.value = true;
    // 获取简历数据
    const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);
    // 提取 dataSource 数据
    const dataSource = extractResumeData(HJNewJsonStore.value, true);
    console.log('dataSource', JSON.stringify(dataSource));
    const params = {
      model: props.modelInfoObj.selectedModel,
      text: JSON.stringify(dataSource),
      resumeId: route.params.id,
      resumeName: HJNewJsonStore.value.config.title,
      serialNumber: serialNumber.value
    };
    const controller = optimizeResumeStreamAsync(
      params,
      handleStreamData,
      (error: any) => {
        ElMessage.error(error.message || 'AI诊断失败');
        isLoading.value = false;
        console.log('AI诊断失败', error);
        aiFailAsync({
          serialNumber: serialNumber.value,
          errorMsg: 'error.message || AI诊断失败'
        });
      },
      () => {
        getAndUpdateUserInfo();
        if (props.modelInfoObj.selectedModel) {
          // 手动更新用户简币数量
          appStore.useUserInfoStore.userIntegralInfo.integralTotal =
            appStore.useUserInfoStore.userIntegralInfo.integralTotal + props.modelInfoObj.payValue;
        }
        isLoading.value = false;
        ElMessage.success('AI诊断成功');
      }
    );
    streamController.value = controller;
  };

  // 处理流式数据
  const handleStreamData = (chunk: string) => {
    const lines = chunk.split('\n');
    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('data:')) {
        const dataPart = trimmedLine.slice(5).trim();
        try {
          const parsedData = JSON.parse(dataPart);
          const content = parsedData.data;
          if (content) {
            aiContent.value += content;
            isLoading.value = false;
          }
        } catch (e) {
          isLoading.value = false;
          ElNotification({ title: '提示', message: trimmedLine, type: 'error' });
          aiFailAsync({
            serialNumber: serialNumber.value,
            errorMsg: 'e.message || AI诊断失败'
          });
        }
      }
    });
  };
</script>
<style src="../../../../style/markdown.css"></style>
<style lang="scss" scoped>
  .ai-optimize-drawer {
    :deep(.el-drawer__body) {
      padding: 0;
      overflow: hidden; // 禁止父容器滚动
    }
    .ai-optimize-content {
      overflow-y: auto; // 允许内容滚动
      height: 100%; // 撑满父容器
      padding: 16px 25px 20px 25px; // 添加内边距，避免内容贴边
      white-space: normal;
      text-align: justify;
    }

    .optimize-drawer-custom-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        .header-title {
          margin: 0 10px;
        }
      }

      .content-box {
        font-size: 12px;
        color: #777777;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-bottom: none;
        margin-right: 15px;
        p {
          height: 40px;
          font-size: 14px;
          display: flex;
          align-items: center;
          color: #fb8444;
          img {
            margin-left: 5px;
            margin-bottom: 1px;
          }
        }
        .jb-num {
          font-size: 16px;
          font-weight: 600;
          background: -webkit-linear-gradient(top, #ff0000, #00ff00); /*设置线性渐变*/
          /*为了支持更多的浏览器*/
          background-clip: text; /*背景被裁剪到文字*/
          -webkit-text-fill-color: transparent; /*设置文字的填充颜色*/
          letter-spacing: 1px;
        }
      }
    }
  }
</style>
<style lang="scss">
  .ai-optimize-drawer {
    .el-drawer__body {
      padding: 0;
    }
    .el-drawer__header {
      border-bottom: 1px solid #ebeef5;
      height: 65px;
      margin: 0;
      display: flex;
      align-items: center;
      padding: 0 30px;
    }
  }
</style>
