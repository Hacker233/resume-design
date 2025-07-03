<template>
  <el-drawer
    :model-value="drawer"
    :size="820"
    class="ai-json-to-md-drawer"
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
          <span class="header-title">markdown转换</span>
        </div>
        <el-tooltip
          :content="streamingActive ? '请等待内容传输完成' : '下载为Markdown文件'"
          placement="bottom"
        >
          <div class="download-wrapper">
            <el-button
              type="primary"
              size="small"
              :disabled="!aiContent || streamingActive"
              :loading="downloadLoading"
              @click.stop="downloadMarkdown"
            >
              <el-icon><Download /></el-icon>
              <span v-if="!downloadLoading">下载Markdown</span>
              <span v-else>生成中...</span>
            </el-button>
            <div v-if="streamingActive" class="streaming-indicator">
              <el-icon class="streaming-icon"><Loading /></el-icon>
              <span>内容生成中...</span>
            </div>
          </div>
        </el-tooltip>
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
    cancelToMarkdownStreamAsync,
    getSerialNumberAsync,
    jsonToMarkdownStreamByAiAsync
  } from '@/http/api/ai';
  import appStore from '@/store';
  import { extractResumeData } from '@/utils/common';
  import { ElNotification, ElMessage } from 'element-plus';
  import { storeToRefs } from 'pinia';
  import MarkdownIt from 'markdown-it';
  import { Download, Loading } from '@element-plus/icons-vue';
  import { nextTick, ref, computed, watch } from 'vue';

  const emit = defineEmits(['closeAiOptimizeDrawer']);

  interface IJsonDrawer {
    drawer: boolean;
    content?: string;
  }
  const props = withDefaults(defineProps<IJsonDrawer>(), {
    drawer: false,
    content: ''
  });

  const md = new MarkdownIt();
  const isLoading = ref(false);
  const downloadLoading = ref(false);
  const streamingActive = ref(false); // 新增流式传输状态
  const streamController = ref<AbortController | null>(null);
  const aiContent = ref('');
  const contentRef = ref<HTMLElement | null>(null);

  const renderedContent = computed(() => {
    return md.render(aiContent.value);
  });

  // 监听内容变化自动滚动
  watch(aiContent, () => {
    nextTick(() => {
      if (contentRef.value && !props.content) {
        contentRef.value.scrollTop = contentRef.value.scrollHeight;
      }
    });
  });

  // 下载Markdown文件
  const downloadMarkdown = async () => {
    if (!aiContent.value) {
      ElMessage.warning('没有可下载的内容');
      return;
    }

    if (streamingActive.value) {
      ElMessage.warning('请等待内容传输完成');
      return;
    }

    downloadLoading.value = true;

    try {
      await new Promise((resolve) => setTimeout(resolve, 100));

      const blob = new Blob([aiContent.value], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = generateFilename();
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        downloadLoading.value = false;
      }, 100);

      ElMessage.success('下载开始');
    } catch (error) {
      downloadLoading.value = false;
      ElMessage.error('下载失败');
      console.error('下载Markdown失败:', error);
    }
  };

  // 生成文件名
  const generateFilename = () => {
    const now = new Date();
    const dateStr = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0')
    ].join('-');

    const timeStr = [
      String(now.getHours()).padStart(2, '0'),
      String(now.getMinutes()).padStart(2, '0')
    ].join('-');
    const { HJNewJsonStore } = appStore.useCreateTemplateStore;
    return `${HJNewJsonStore.props.title}_${dateStr}_${timeStr}.md`;
  };

  // 关闭弹窗
  const handleClose = () => {
    if (streamController.value) {
      cancelToMarkdownStreamAsync(streamController.value);
    }
    streamingActive.value = false;
    emit('closeAiOptimizeDrawer');
  };

  // 打开抽屉
  const serialNumber = ref('');
  const handleOpen = async () => {
    if (props.content) {
      aiContent.value = props.content;
      isLoading.value = false;
      streamingActive.value = false;
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
    streamingActive.value = true; // 开始流式传输

    const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);
    const dataSource = extractResumeData(HJNewJsonStore.value, true);

    const params = {
      template: JSON.stringify(dataSource),
      serialNumber: serialNumber.value,
      model: 'glm-4-flash'
    };

    const controller = jsonToMarkdownStreamByAiAsync(
      params,
      handleStreamData,
      (error: any) => {
        ElMessage.error(error.message || '转换Markdown失败');
        isLoading.value = false;
        streamingActive.value = false;
        console.error('转换Markdown失败', error);
      },
      () => {
        isLoading.value = false;
        streamingActive.value = false; // 传输完成
        console.log('转换Markdown完成', aiContent.value);
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
        }
      }
    });
  };
</script>

<style src="@/style/markdown.css"></style>
<style lang="scss" scoped>
  .ai-json-to-md-drawer {
    :deep(.el-drawer__body) {
      padding: 0;
      overflow: hidden;
    }

    .ai-optimize-content {
      overflow-y: auto;
      height: 100%;
      padding: 16px 25px 20px 25px;
      white-space: normal;
    }

    .optimize-drawer-custom-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-right: 20px;

      .left {
        display: flex;
        align-items: center;

        .header-title {
          margin: 0 10px;
          font-size: 16px;
          font-weight: 500;
        }
      }

      .download-wrapper {
        position: relative;
        display: flex;
        align-items: center;

        :deep(.el-button) {
          display: flex;
          align-items: center;
          gap: 6px;

          .el-icon {
            font-size: 16px;
          }

          &[disabled] {
            opacity: 0.7;
          }
        }

        .streaming-indicator {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          font-size: 12px;
          color: var(--el-color-primary);

          .streaming-icon {
            animation: rotate 1.5s linear infinite;
          }
        }
      }
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

<style lang="scss">
  .ai-json-to-md-drawer {
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

      :deep(.el-drawer__headerbtn) {
        position: static;
        margin-left: 20px;
      }
    }
  }
</style>
