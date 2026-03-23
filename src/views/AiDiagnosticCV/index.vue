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
    type="offline"
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
        model: modelInfoObj.value.selectedModel,
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
    background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 50%, #f0f4f8 100%);
    background-size: 400% 400%;
    animation: gradientShift 20s ease infinite;
    color: #333;
    padding: 30px 20px;
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
      Arial, sans-serif;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="0.5" fill="rgba(102, 126, 234, 0.08)"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
      pointer-events: none;
    }

    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    &.light-theme {
      .page-header .title {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
    padding: 50px 0 40px;
    position: relative;
    z-index: 1;

    .title {
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 16px;
      letter-spacing: -0.5px;
      animation: titleFloat 3s ease-in-out infinite;
    }

    @keyframes titleFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }

    .subtitle {
      font-size: 1.15rem;
      max-width: 650px;
      margin: 0 auto;
      font-weight: 400;
      line-height: 1.6;
    }
  }

  /* 主内容区 */
  .main-content {
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* 上传区域 */
  .upload-container {
    max-width: 800px;
    margin: 0 auto 35px;
    text-align: center;

    :deep(.el-upload) {
      width: 100%;
    }

    :deep(.el-upload-dragger) {
      width: 100%;
      padding: 60px 24px;
      border-radius: 20px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border: 3px dashed rgba(102, 126, 234, 0.3);
      backdrop-filter: blur(10px);

      &:hover {
        border-color: #667eea;
        box-shadow: 0 12px 40px rgba(102, 126, 234, 0.2), 0 4px 12px rgba(0, 0, 0, 0.08);
        transform: translateY(-4px);
      }

      &:active {
        transform: translateY(-2px);
      }
    }
  }

  .upload-content {
    .upload-icon {
      margin-bottom: 24px;
      animation: iconBounce 2s ease-in-out infinite;
    }

    @keyframes iconBounce {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    .upload-title {
      font-size: 1.4rem;
      margin-bottom: 8px;
      color: #2d3748;
      font-weight: 600;
    }
    .browse-btn {
      color: #667eea;
      cursor: pointer;
      text-decoration: underline;
      text-underline-offset: 3px;
      margin-left: 4px;
      font-weight: 600;
      transition: color 0.3s ease;

      &:hover {
        color: #764ba2;
      }
    }
    .upload-subtitle {
      color: #718096;
      margin-bottom: 12px;
      font-size: 0.95rem;
    }
  }

  .selected-file {
    margin-top: 20px;
    animation: slideUp 0.4s ease-out;

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    :deep(.el-card) {
      border-radius: 14px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
      border: 1px solid rgba(102, 126, 234, 0.2);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;

      &:hover {
        box-shadow: 0 8px 30px rgba(102, 126, 234, 0.15);
        transform: translateY(-2px);
      }
    }

    .file-info {
      display: flex;
      align-items: center;
      padding: 16px 20px;
    }
    .file-icon {
      margin-right: 14px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 10px;
      padding: 8px;
      color: white;
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    }
    .file-name {
      flex: 1;
      text-align: left;
      font-size: 1rem;
      font-weight: 500;
      color: #2d3748;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .file-size {
      color: #718096;
      font-size: 0.85rem;
      margin-left: 10px;
      background: rgba(102, 126, 234, 0.1);
      padding: 2px 8px;
      border-radius: 4px;
    }
    .remove-file {
      margin-left: 16px;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(245, 101, 101, 0.1);
        transform: scale(1.1);
      }
    }
  }

  /* 自定义漂亮进度条 */
  .upload-status {
    margin-top: 20px;
    width: 100%;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    animation: slideUp 0.4s ease-out;

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .pretty-progress {
      position: relative;
      width: 100%;
      height: 16px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 999px;
      overflow: hidden;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(10px);
    }

    .pretty-progress__bar {
      height: 100%;
      width: 0%;
      border-radius: 999px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      background-size: 200% 100%;
      animation: progressGradient 2s ease infinite;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        animation: progressShine 1.5s ease-in-out infinite;
      }
    }

    @keyframes progressGradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes progressShine {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    .pretty-progress__text {
      margin-top: 10px;
      font-size: 1rem;
      font-weight: 700;
      color: #fff;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }

    .status-message {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      color: #1f2937;
      margin-top: 8px;
      font-weight: 700;
      text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);

      .status-icon {
        margin-right: 8px;
        font-size: 1.2rem;
      }
    }
  }

  /* 操作按钮：只显示其一 */
  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 24px;

    .upload-btn,
    .diagnose-btn {
      width: 200px;
      height: 52px;
      font-size: 1.05rem;
      font-weight: 700;
      border-radius: 12px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        transition: left 0.5s ease;
      }

      &:hover::before {
        left: 100%;
      }

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      }

      &:active {
        transform: translateY(-1px);
      }

      :deep(.el-icon) {
        margin-right: 8px;
        font-size: 1.1rem;
      }
    }

    .upload-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      color: white;

      &:hover {
        background: linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%);
      }
    }

    .diagnose-btn {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      border: none;
      color: white;

      &:hover {
        background: linear-gradient(135deg, #0ea371 0%, #047857 100%);
      }
    }
  }

  /* 报告卡片 */
  .detailed-report {
    margin-top: 30px;
    animation: slideUp 0.5s ease-out;

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    :deep(.el-card) {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
      border-radius: 20px;
      border: 1px solid rgba(102, 126, 234, 0.2);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;

      &:hover {
        box-shadow: 0 12px 48px rgba(102, 126, 234, 0.15);
      }
    }

    :deep(.el-card__body) {
      padding: 28px;
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 30px;
      color: #2d3748;
      font-weight: 700;
    }

    .report-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid rgba(102, 126, 234, 0.1);

      h3 {
        font-size: 1.4rem;
        color: #2d3748;
        margin: 0;
        font-weight: 700;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .download-btn {
        font-size: 0.9rem;
        padding: 10px 20px;
        height: auto;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        border-radius: 10px;
        font-weight: 600;
        color: white;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        transition: all 0.3s ease;

        &:hover:not(:disabled) {
          background: linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          transform: translateY(-2px);
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }

    .report-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 20px;

      .loading-tip {
        margin-top: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        color: #718096;
        font-size: 1rem;
        font-weight: 500;
      }
    }
  }

  /* 过渡 */
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .fade-enter-from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }

  /* 滚动条美化 */
  .scrollable-content {
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(102, 126, 234, 0.05);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 4px;
      transition: all 0.3s ease;

      &:hover {
        background: linear-gradient(135deg, #764ba2 0%, #f093fb 100%);
      }
    }
  }

  /* 按钮点击波纹效果 */
  .action-buttons {
    .upload-btn,
    .diagnose-btn {
      &:active {
        transform: translateY(-1px) scale(0.98);
      }
    }
  }

  /* 卡片悬停效果增强 */
  .upload-container {
    :deep(.el-upload-dragger) {
      &:hover {
        .upload-icon {
          animation: iconPulse 0.6s ease-in-out;
        }
      }
    }
  }

  @keyframes iconPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.15); }
  }

  /* 加载状态优化 */
  .el-icon.is-loading {
    animation: rotate 1s linear infinite;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* 成功/失败图标动画 */
  .status-message {
    .status-icon {
      transition: all 0.3s ease;

      &.el-icon-circle-check-filled {
        animation: successPop 0.5s ease-out;
      }

      &.el-icon-circle-close-filled {
        animation: errorShake 0.5s ease-out;
      }
    }
  }

  @keyframes successPop {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); opacity: 1; }
  }

  @keyframes errorShake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }

  /* 响应式 */
  @media (max-width: 768px) {
    .ai-diagnostic-cv {
      padding: 20px 16px;
    }

    .page-header {
      padding: 30px 0 25px;

      .title {
        font-size: 2rem;
        letter-spacing: -0.3px;
      }

      .subtitle {
        font-size: 1rem;
        max-width: 100%;
        padding: 0 10px;
      }
    }

    .main-content {
      max-width: 100%;
    }

    .upload-container {
      max-width: 100%;
      margin: 0 auto 25px;

      :deep(.el-upload-dragger) {
        padding: 40px 16px;
        border-radius: 16px;
      }
    }

    .upload-content {
      .upload-icon {
        margin-bottom: 16px;
      }

      .upload-title {
        font-size: 1.2rem;
      }

      .upload-subtitle {
        font-size: 0.85rem;
      }
    }

    .selected-file {
      :deep(.el-card) {
        border-radius: 12px;
      }

      .file-info {
        padding: 12px 16px;
      }

      .file-name {
        font-size: 0.9rem;
      }
    }

    .upload-status {
      max-width: 100%;
      margin-top: 16px;
    }

    .action-buttons {
      flex-direction: column;
      gap: 12px;
      margin-top: 20px;

      .upload-btn,
      .diagnose-btn {
        width: 100%;
        height: 48px;
        font-size: 1rem;
      }
    }

    .detailed-report {
      margin-top: 24px;

      :deep(.el-card) {
        border-radius: 16px;
      }

      :deep(.el-card__body) {
        padding: 20px 16px;
      }

      .report-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
        padding-bottom: 16px;

        h3 {
          font-size: 1.2rem;
        }

        .download-btn {
          width: 100%;
          padding: 12px 20px;
        }
      }

      .report-loading {
        padding: 30px 16px;
      }
    }

    .scrollable-content {
      padding: 20px 16px;
      font-size: 0.95rem;

      :deep(h1) {
        font-size: 1.5rem;
      }

      :deep(h2) {
        font-size: 1.3rem;
      }

      :deep(h3) {
        font-size: 1.1rem;
      }
    }
  }

  @media (max-width: 480px) {
    .page-header {
      padding: 25px 0 20px;

      .title {
        font-size: 1.7rem;
      }

      .subtitle {
        font-size: 0.9rem;
      }
    }

    .upload-container {
      :deep(.el-upload-dragger) {
        padding: 30px 12px;
      }
    }

    .upload-content {
      .upload-icon {
        margin-bottom: 12px;
      }

      .upload-title {
        font-size: 1.1rem;
      }

      .upload-subtitle {
        font-size: 0.8rem;
      }
    }

    .action-buttons {
      .upload-btn,
      .diagnose-btn {
        height: 44px;
        font-size: 0.95rem;
      }
    }

    .detailed-report {
      :deep(.el-card__body) {
        padding: 16px 12px;
      }

      .report-header {
        h3 {
          font-size: 1.1rem;
        }
      }
    }

    .scrollable-content {
      padding: 16px 12px;
      font-size: 0.9rem;

      :deep(h1) {
        font-size: 1.3rem;
      }

      :deep(h2) {
        font-size: 1.15rem;
      }

      :deep(h3) {
        font-size: 1rem;
      }
    }
  }
  .scrollable-content {
    padding: 28px;
    border: 1px solid rgba(102, 126, 234, 0.15);
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%);
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.03);
    line-height: 1.8;
    font-size: 1rem;

    :deep(h1),
    :deep(h2),
    :deep(h3),
    :deep(h4) {
      color: #2d3748;
      font-weight: 700;
      margin-top: 24px;
      margin-bottom: 16px;
    }

    :deep(h1) {
      font-size: 1.8rem;
      border-bottom: 3px solid rgba(102, 126, 234, 0.2);
      padding-bottom: 12px;
    }

    :deep(h2) {
      font-size: 1.5rem;
      border-bottom: 2px solid rgba(102, 126, 234, 0.15);
      padding-bottom: 8px;
    }

    :deep(h3) {
      font-size: 1.3rem;
    }

    :deep(p) {
      color: #4a5568;
      margin-bottom: 16px;
    }

    :deep(ul),
    :deep(ol) {
      margin-bottom: 20px;
      padding-left: 24px;
    }

    :deep(li) {
      color: #4a5568;
      margin-bottom: 8px;
      line-height: 1.7;
    }

    :deep(code) {
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
    }

    :deep(pre) {
      background: rgba(102, 126, 234, 0.05);
      border: 1px solid rgba(102, 126, 234, 0.2);
      border-radius: 8px;
      padding: 16px;
      overflow-x: auto;
      margin-bottom: 20px;
    }

    :deep(pre code) {
      background: none;
      padding: 0;
      color: #2d3748;
    }

    :deep(blockquote) {
      border-left: 4px solid #667eea;
      padding-left: 16px;
      margin: 20px 0;
      color: #718096;
      font-style: italic;
      background: rgba(102, 126, 234, 0.05);
      padding: 12px 16px;
      border-radius: 0 8px 8px 0;
    }

    :deep(table) {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    :deep(th),
    :deep(td) {
      border: 1px solid rgba(102, 126, 234, 0.2);
      padding: 12px;
      text-align: left;
    }

    :deep(th) {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-weight: 600;
    }

    :deep(tr:nth-child(even)) {
      background: rgba(102, 126, 234, 0.03);
    }

    :deep(a) {
      color: #667eea;
      text-decoration: none;
      border-bottom: 1px dashed #667eea;
      transition: all 0.3s ease;

      &:hover {
        color: #764ba2;
        border-bottom-style: solid;
      }
    }

    :deep(strong) {
      color: #667eea;
      font-weight: 700;
    }

    :deep(hr) {
      border: none;
      border-top: 2px solid rgba(102, 126, 234, 0.2);
      margin: 30px 0;
    }
  }

  .scroll-to-bottom-btn {
    position: fixed;
    bottom: 80px; /* 距离底部，可调整 */
    right: 40px; /* 距离右侧 */
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
</style>
