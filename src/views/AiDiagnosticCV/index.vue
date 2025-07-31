<template>
  <div class="ai-diagnostic-cv light-theme">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="title">AI简历智能诊断</h1>
      <p class="subtitle">上传您的简历文件，获取AI专业分析和优化建议</p>
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 文件上传区域 -->
      <div class="upload-container">
        <el-upload
          class="upload-card"
          drag
          :auto-upload="false"
          :show-file-list="false"
          :before-upload="beforeFileUpload"
          :on-change="handleFileChange"
          accept=".pdf,.docx"
          :disabled="!!selectedFile || isProcessing || isDiagnosing"
        >
          <div class="upload-content">
            <div class="upload-icon">
              <el-icon :size="64" color="#4096ff">
                <Upload />
              </el-icon>
            </div>
            <h3 class="upload-title">
              拖放文件至此处或 <span class="browse-btn">浏览文件</span>
            </h3>
            <p class="upload-subtitle">支持 .pdf、.docx 格式，文件大小不超过 5MB</p>
          </div>
        </el-upload>

        <!-- 已选择文件 -->
        <div v-if="selectedFile" class="selected-file">
          <el-card shadow="hover">
            <div class="file-info">
              <div class="file-icon">
                <el-icon :size="24" color="#4096ff">
                  <Document />
                </el-icon>
              </div>
              <div class="file-name">
                {{ selectedFile.name }}
                <span class="file-size">({{ formatFileSize(selectedFile.size) }})</span>
              </div>
              <el-button
                class="remove-file"
                type="danger"
                :disabled="isUploading || isDiagnosing"
                text
                :icon="Delete"
                circle
                @click="removeFile"
              />
            </div>
          </el-card>
        </div>

        <!-- 上传进度（自定义样式） -->
        <div v-if="isUploading || uploadProgress > 0" class="upload-status">
          <div class="pretty-progress">
            <div class="pretty-progress__bar" :style="{ width: uploadProgress + '%' }"></div>
            <div class="pretty-progress__text">{{ uploadProgress }}%</div>
          </div>
          <div class="status-message">
            <el-icon v-if="uploadStatus === 'success'" color="#67C23A" class="status-icon">
              <CircleCheckFilled />
            </el-icon>
            <el-icon v-else-if="uploadStatus === 'exception'" color="#F56C6C" class="status-icon">
              <CircleCloseFilled />
            </el-icon>
            <el-icon v-else class="status-icon is-loading">
              <Loading />
            </el-icon>
            <span>{{ statusMessage }}</span>
          </div>
        </div>

        <!-- 操作按钮（只显示其一） -->
        <div class="action-buttons">
          <el-button
            v-if="!isUploadSuccess"
            class="upload-btn"
            type="primary"
            :disabled="!selectedFile || isUploading || isDiagnosing"
            @click="uploadResumeFile"
          >
            <template v-if="!isUploading">上传简历</template>
            <template v-else>
              <el-icon class="is-loading"><Loading /></el-icon> 上传中...
            </template>
          </el-button>

          <el-button
            v-else
            class="diagnose-btn"
            type="primary"
            :disabled="isDiagnosing"
            @click="aiOptimize"
          >
            <template v-if="!isDiagnosing">
              {{ aiContent ? '重新诊断' : '开始AI诊断' }}
              <!-- 改这里 -->
            </template>
            <template v-else>
              <el-icon class="is-loading"><Loading /></el-icon> 诊断中...
            </template>
          </el-button>
        </div>
      </div>

      <!-- 诊断报告：点击“开始AI诊断”后才显示；先显示等待效果，收到内容后渲染 -->
      <transition name="fade">
        <el-card v-if="showReportArea" class="detailed-report" shadow="hover">
          <div class="report-header">
            <h3>详细分析报告</h3>
            <el-button
              class="download-btn"
              type="primary"
              size="small"
              :icon="Download"
              :disabled="!aiContent || isDiagnosing"
              @click="downloadReport"
            >
              下载报告
            </el-button>
          </div>

          <!-- 等待效果 -->
          <div v-if="isLoading" class="report-loading">
            <el-skeleton :rows="6" animated />
            <div class="loading-tip">
              <el-icon class="is-loading"><Loading /></el-icon>
              正在生成诊断报告，请稍候...
            </div>
          </div>

          <!-- 诊断内容滚动区域 -->
          <div
            ref="reportContentRef"
            v-dompurify-html="renderedContent"
            class="ai-optimize-content markdown-body scrollable-content"
          ></div>
        </el-card>
      </transition>
    </div>
  </div>
  <footer-com></footer-com>
  <el-backtop :right="100" :bottom="100" />

  <!-- AI诊断确认弹窗 -->
  <ai-optimize-dialog
    :dialog-ai-optimize-visible="dialogAiOptimizeVisible"
    @cancle="aiDialogCancle"
    @update-success="updateSuccess"
  ></ai-optimize-dialog>
</template>

<script lang="ts" setup>
  import { ref, computed, onBeforeUnmount } from 'vue';
  import {
    Upload,
    Document,
    Delete,
    Loading,
    CircleCheckFilled,
    CircleCloseFilled,
    Download
  } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';
  import CONFIG from '@/config';
  import appStore from '@/store';
  import {
    aiFailAsync,
    aiOptimizeResumeByPdfTextStreamAsync,
    getSerialNumberAsync
  } from '@/http/api/ai';
  import MarkdownIt from 'markdown-it';
  import axios from 'axios';
  import AiOptimizeDialog from '@/views/createTemplate/designer/components/AiOptimizeDialog.vue';

  const selectedFile = ref<File | null>(null);
  const isProcessing = ref(false);
  const isUploading = ref(false);
  const isDiagnosing = ref(false);
  const isUploadSuccess = ref(false);

  const uploadProgress = ref(0);
  const uploadStatus = ref<'success' | 'exception' | ''>('');
  const statusMessage = ref('');

  const pdfText = ref('');

  // 报告控制
  const showReportArea = ref(false); // 点击“开始AI诊断”后显示
  const isLoading = ref(false); // 报告区的加载效果
  const aiContent = ref('');

  // Markdown 渲染
  const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  });
  const renderedContent = computed(() => md.render(aiContent.value));

  // 上传地址
  const uploadAddress = () => CONFIG.serverAddress + '/huajian/ai/uploadResumeFile/AiDiagnosticCV';

  // 选择文件
  const handleFileChange = (file: any) => {
    if (selectedFile.value) {
      ElMessage.warning('请先删除已上传文件');
      return;
    }

    selectedFile.value = file.raw;
    resetUploadStatus();
    resetReportArea();
  };

  // 下载报告
  const downloadReport = () => {
    const blob = new Blob([aiContent.value], { type: 'text/markdown;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `简历诊断报告_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reportContentRef = ref<HTMLElement | null>(null);

  // 文件校验
  const beforeFileUpload = (rawFile: File) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    const fileExtension = rawFile.name.split('.').pop()?.toLowerCase();
    if (!allowedTypes.includes(rawFile.type) && !['pdf', 'docx'].includes(fileExtension || '')) {
      ElMessage.error('请上传.pdf或.docx格式的文件');
      return false;
    }
    if (rawFile.size > 5 * 1024 * 1024) {
      ElMessage.error('文件大小不能超过5MB');
      return false;
    }
    return true;
  };

  // 移除文件
  const removeFile = () => {
    selectedFile.value = null;
    resetUploadStatus();
    resetReportArea();
  };

  // 重置上传状态
  const resetUploadStatus = () => {
    uploadProgress.value = 0;
    uploadStatus.value = '';
    statusMessage.value = '';
    isUploadSuccess.value = false;
  };

  // 重置报告区
  const resetReportArea = () => {
    showReportArea.value = false;
    isLoading.value = false;
    aiContent.value = '';
  };

  // 手动上传
  const uploadResumeFile = async () => {
    if (!selectedFile.value) return;

    resetUploadStatus();
    isProcessing.value = true;
    isUploading.value = true;
    statusMessage.value = '准备上传文件...';

    try {
      const formData = new FormData();
      formData.append('file', selectedFile.value);

      const result = await axios.post(uploadAddress(), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: appStore.useTokenStore.token
        },
        onUploadProgress: (evt) => {
          if (evt.total) {
            const percent = Math.round((evt.loaded * 100) / evt.total);
            uploadProgress.value = percent;
            statusMessage.value = percent < 100 ? `文件上传中... ${percent}%` : '服务器处理中...';
          }
        }
      });

      uploadStatus.value = 'success';
      statusMessage.value = '文件上传成功，您可以开始AI诊断';
      isUploadSuccess.value = true;
      pdfText.value = result.data?.data?.plainText || '';
      ElMessage.success('文件上传成功');
    } catch (error: any) {
      uploadStatus.value = 'exception';
      statusMessage.value = '文件上传失败，请重试';
      ElMessage.error('上传失败：' + (error?.message || '未知错误'));
    } finally {
      isProcessing.value = false;
      isUploading.value = false;
    }
  };

  // 打开AI诊断确认弹窗
  const dialogAiOptimizeVisible = ref<boolean>(false);
  const aiOptimize = () => {
    dialogAiOptimizeVisible.value = true;
  };

  // AI诊断确认弹窗取消
  const aiDialogCancle = () => {
    dialogAiOptimizeVisible.value = false;
  };

  // AI诊断确认弹窗确认
  const modelInfoObj = ref<any>({}); // 选择的模型
  const updateSuccess = (modelInfo: any) => {
    dialogAiOptimizeVisible.value = false;
    modelInfoObj.value = modelInfo;
    startDiagnosis();
  };

  // 开始诊断（流式）
  const serialNumber = ref('');
  const streamController = ref<AbortController | null>(null);

  const startDiagnosis = async () => {
    if (!selectedFile.value || !isUploadSuccess.value) return;

    // 初始化报告区：显示卡片 + Loading，待有内容再切换到渲染
    showReportArea.value = true;
    isLoading.value = true;
    aiContent.value = '';

    isProcessing.value = true;
    isDiagnosing.value = true;
    statusMessage.value = '开始AI诊断...';

    try {
      const serialNumberResult = await getSerialNumberAsync();
      if (serialNumberResult.data?.status === 200) {
        serialNumber.value = serialNumberResult.data.data;
      } else {
        throw new Error('流水号生成失败');
      }

      const params = {
        model: 'glm-4-flash',
        serialNumber: serialNumber.value,
        pdfText: pdfText.value
      };

      const controller = aiOptimizeResumeByPdfTextStreamAsync(
        params,
        handleStreamData,
        (err: any) => {
          ElMessage.error(err?.message || 'AI诊断失败');
          isLoading.value = false;
          isDiagnosing.value = false;
          isProcessing.value = false;
          aiFailAsync({
            serialNumber: serialNumber.value,
            errorMsg: err
          });
        },
        () => {
          // 流完成：若没有内容，也结束loading；若已有内容，已在首次chunk时展示
          isLoading.value = false;
          isDiagnosing.value = false;
          isProcessing.value = false;
          ElMessage.success('诊断完成');
        }
      );

      streamController.value = controller;
    } catch (error: any) {
      ElMessage.error('诊断过程中出现错误: ' + (error?.message || '未知错误'));
      isLoading.value = false;
      isDiagnosing.value = false;
      isProcessing.value = false;
    }
  };

  // 处理流式数据：首次收到内容 -> 立刻切换为Markdown渲染
  const handleStreamData = (chunk: string) => {
    const lines = chunk.split('\n');
    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (!trimmedLine.startsWith('data:')) return;

      const dataPart = trimmedLine.slice(5).trim();
      try {
        const parsed = JSON.parse(dataPart);
        const content = parsed?.data;
        if (content) {
          // 累加内容
          aiContent.value += content;
          // 一旦有内容，展示渲染（关闭Skeleton）
          if (isLoading.value) isLoading.value = false;
        }
      } catch (e) {
        // 忽略非JSON行（如keep-alive）
        // console.debug('解析流数据失败:', e);
        aiFailAsync({
          serialNumber: serialNumber.value,
          errorMsg: `${e.message}` || '解析流数据失败'
        });
      }
    });
  };

  // 组件卸载时中断流
  onBeforeUnmount(() => {
    if (streamController.value) {
      streamController.value.abort();
      streamController.value = null;
    }
  });

  // 工具：格式化文件大小
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };
</script>
<style src="../../style/markdown.css"></style>
<style lang="scss" scoped>
  .ai-diagnostic-cv {
    min-height: calc(100vh - 65px);
    background: linear-gradient(180deg, #efe5fd 0%, #fbf9fe 100%);
    color: #333;
    padding: 20px;
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
      Arial, sans-serif;

    &.light-theme {
      .page-header .title {
        background: linear-gradient(90deg, #4096ff, #6f7ad3);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      .subtitle {
        color: #666;
      }
    }
  }

  /* 页面标题 */
  .page-header {
    text-align: center;
    padding: 40px 0;

    .title {
      font-size: 2.2rem;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .subtitle {
      font-size: 1.05rem;
      max-width: 600px;
      margin: 0 auto;
    }
  }

  /* 主内容区 */
  .main-content {
    max-width: 1000px;
    margin: 0 auto;
  }

  /* 上传区域 */
  .upload-container {
    max-width: 760px;
    margin: 0 auto 28px;
    text-align: center;

    :deep(.el-upload) {
      width: 100%;
    }

    :deep(.el-upload-dragger) {
      width: 100%;
      padding: 48px 20px;
      border-radius: 16px;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
      transition: all 0.3s ease;
      border: 2px dashed #dcdfe6;

      &:hover {
        border-color: #4096ff;
      }
    }
  }

  .upload-content {
    .upload-icon {
      margin-bottom: 20px;
    }
    .upload-title {
      font-size: 1.3rem;
      margin-bottom: 6px;
      color: #333;
    }
    .browse-btn {
      color: #4096ff;
      cursor: pointer;
      text-decoration: underline;
      text-underline-offset: 2px;
      margin-left: 4px;
    }
    .upload-subtitle {
      color: #666;
      margin-bottom: 8px;
    }
  }

  .selected-file {
    margin-top: 16px;

    :deep(.el-card) {
      border-radius: 10px;
      background-color: #fff;
      border: 1px solid #ebeef5;
    }

    .file-info {
      display: flex;
      align-items: center;
      padding: 12px 16px;
    }
    .file-icon {
      margin-right: 10px;
    }
    .file-name {
      flex: 1;
      text-align: left;
      font-size: 0.95rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .file-size {
      color: #666;
      font-size: 0.85rem;
      margin-left: 8px;
    }
    .remove-file {
      margin-left: 12px;
    }
  }

  /* 自定义漂亮进度条 */
  .upload-status {
    margin-top: 16px;
    width: 100%;
    max-width: 520px;
    margin-left: auto;
    margin-right: auto;

    .pretty-progress {
      position: relative;
      width: 100%;
      height: 12px;
      background: #eef2f7;
      border-radius: 999px;
      overflow: hidden;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
    }
    .pretty-progress__bar {
      height: 100%;
      width: 0%;
      border-radius: 999px;
      background: linear-gradient(90deg, #69adff, #6f7ad3);
      transition: width 0.25s ease;
    }
    .pretty-progress__text {
      margin-top: 6px;
      font-size: 0.9rem;
      font-weight: 600;
      color: #4096ff;
    }

    .status-message {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      color: #666;
      margin-top: 6px;

      .status-icon {
        margin-right: 6px;
      }
    }
  }

  /* 操作按钮：只显示其一 */
  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 16px;

    .upload-btn,
    .diagnose-btn {
      width: 180px;
      height: 44px;
      font-size: 1rem;
      font-weight: 600;

      :deep(.el-icon) {
        margin-right: 8px;
      }
    }
    .diagnose-btn {
      background-color: #10b981;
      border-color: #10b981;
      &:hover {
        background-color: #0ea371;
        border-color: #0ea371;
      }
    }
  }

  /* 报告卡片 */
  .detailed-report {
    margin-top: 22px;

    :deep(.el-card__body) {
      padding: 20px;
    }

    h3 {
      font-size: 1.2rem;
      margin-bottom: 30px;
      color: #333;
    }
    .report-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;

      h3 {
        font-size: 1.2rem;
        color: #333;
        margin: 0;
      }

      .download-btn {
        font-size: 0.85rem;
        padding: 6px 12px;
        height: auto;
        background-color: #4096ff;
        border-color: #4096ff;

        &:hover {
          background-color: #337ecc;
          border-color: #337ecc;
        }
      }
    }

    .report-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      .loading-tip {
        margin-top: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
        color: #888;
        font-size: 0.95rem;
      }
    }
  }

  /* 过渡 */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  /* 响应式 */
  @media (max-width: 768px) {
    .page-header .title {
      font-size: 1.9rem;
    }
    .action-buttons {
      flex-direction: column;
    }
    .upload-btn,
    .diagnose-btn {
      width: 100%;
    }
    .report-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
  }
  .scrollable-content {
    padding: 20px;
    border: 1px solid #ebeef5;
    border-radius: 6px;
    background-color: #fff;
  }

  .scroll-to-bottom-btn {
    position: fixed;
    bottom: 80px; /* 距离底部，可调整 */
    right: 40px; /* 距离右侧 */
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
</style>
