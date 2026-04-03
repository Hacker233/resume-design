<template>
  <div class="ai-diagnostic-cv light-theme">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="title">AI简历智能诊断</h1>
      <p class="subtitle">上传您的简历文件，获取AI专业分析和优化建议</p>
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 操作区域 -->
      <div class="operation-area">
        <!-- 操作指南 -->
        <div class="operation-guide">
          <h3 class="guide-title">使用指南</h3>
          <div class="guide-steps">
            <div class="guide-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>选择上传方式</h4>
                <p>您可以通过上传文件、复制粘贴内容或选择已有简历三种方式进行诊断</p>
              </div>
            </div>
            <div class="guide-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>开始AI诊断</h4>
                <p>点击「开始AI诊断」按钮，系统会分析您的简历内容</p>
              </div>
            </div>
            <div class="guide-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>查看诊断报告</h4>
                <p>诊断完成后，点击「查看诊断报告」按钮查看详细分析</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 上传方式选择 -->
        <div class="upload-container">
          <el-tabs v-model="activeTab" class="upload-tabs">
            <el-tab-pane label="上传文件" name="upload">
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
            </el-tab-pane>
            <el-tab-pane label="复制粘贴" name="paste">
              <div class="paste-container">
                <div class="paste-header">
                  <span class="paste-title">简历内容</span>
                  <span class="char-count" :class="{ 'over-limit': pastedContent.length > 15000 }">
                    {{ pastedContent.length }} / 15000 字
                  </span>
                </div>
                <el-input
                  v-model="pastedContent"
                  type="textarea"
                  :rows="8"
                  placeholder="请在此粘贴您的简历内容..."
                  :disabled="isProcessing || isDiagnosing"
                  maxlength="15000"
                  show-word-limit
                />
                <div class="paste-hint">
                  <el-icon color="#4096ff"><InfoFilled /></el-icon>
                  <div class="hint-content">
                    <p>请确保粘贴的内容包含您的教育背景、工作经历、技能等关键信息</p>
                    <p class="hint-warning">注意：请勿粘贴包含敏感信息（如身份证号、银行卡号等）的内容</p>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="选择已有简历" name="existing">
                <div class="existing-resume-container">
                  <!-- 骨架屏 -->
                  <el-skeleton v-if="isShowSkeleton" :rows="12" animated />
                  
                  <!-- 简历卡片列表 -->
                  <div v-else-if="existingResumes.length" class="resume-cards">
                    <div
                      v-for="resume in existingResumes"
                      :key="resume.id"
                      class="resume-card"
                      :class="{ 'selected': selectedExistingResume && selectedExistingResume.id === resume.id }"
                      @click="selectResume(resume)"
                    >
                      <div class="card-image">
                        <img :src="resume.previewUrl || 'https://via.placeholder.com/300x400?text=No+Preview'" alt="简历预览" />
                      </div>
                      <div class="card-info">
                        <h4 class="card-title">{{ resume.name }}</h4>
                      </div>
                      <div v-if="selectedExistingResume && selectedExistingResume.id === resume.id" class="selected-indicator">
                        <el-icon color="#4096ff"><Check /></el-icon>
                      </div>
                    </div>
                  </div>
                  <div v-else class="no-resumes">
                    <el-empty description="暂无可用的简历" />
                  </div>
                  
                  <!-- 分页组件 -->
                  <Pagination
                    v-if="!isShowSkeleton && total > limit"
                    :limit="limit"
                    :total="total"
                    :current-page="currentPage"
                    @handle-current-change="handleCurrentChange"
                    @handle-size-change="handleSizeChange"
                  />
                </div>
              </el-tab-pane>
          </el-tabs>

          <!-- 操作按钮（只显示其一） -->
          <div class="action-buttons">
            <!-- 上传文件按钮 -->
            <el-button
              v-if="activeTab === 'upload' && !isUploadSuccess"
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

            <!-- 复制粘贴和选择已有简历的诊断按钮 -->
            <el-button
              v-else-if="(activeTab === 'paste' || activeTab === 'existing') && !isUploadSuccess"
              class="diagnose-btn"
              type="primary"
              :disabled="isDiagnosing || (activeTab === 'paste' && !pastedContent.trim()) || (activeTab === 'existing' && !selectedExistingResume)"
              @click="startDiagnosisFromContent"
            >
              <template v-if="!isDiagnosing">
                {{ aiContent ? '重新诊断' : '开始AI诊断' }}
              </template>
              <template v-else>
                <el-icon class="is-loading"><Loading /></el-icon> 诊断中...
              </template>
            </el-button>

            <!-- 诊断完成后的重新诊断按钮 -->
            <el-button
              v-else
              class="diagnose-btn"
              type="primary"
              :disabled="isDiagnosing"
              @click="aiOptimize"
            >
              <template v-if="!isDiagnosing">
                {{ aiContent ? '重新诊断' : '开始AI诊断' }}
              </template>
              <template v-else>
                <el-icon class="is-loading"><Loading /></el-icon> 诊断中...
              </template>
            </el-button>
          </div>

          <!-- 查看报告按钮 -->
          <el-button
            v-if="showReportArea && diagnosticData"
            class="view-report-btn"
            type="success"
            :icon="Document"
            @click="openReportDrawer"
          >
            查看诊断报告
          </el-button>
        </div>
      </div>
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

  <!-- 等待提示弹窗 -->
  <el-dialog
    v-model="showWaitDialog"
    :title="isWaitDialogCompleted ? '诊断完成' : 'AI诊断提示'"
    width="450px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    class="wait-dialog"
  >
    <div class="wait-dialog-content">
      <div v-if="!isWaitDialogCompleted" class="loading-container">
        <el-icon class="is-loading loading-icon"><Loading /></el-icon>
        <div class="loading-spinner"></div>
      </div>
      <div v-else class="completed-container">
        <el-icon class="completed-icon"><Check /></el-icon>
      </div>
      
      <h3 v-if="!isWaitDialogCompleted">诊断过程可能需要几分钟</h3>
      <h3 v-else class="completed-title">诊断已完成</h3>
      
      <p v-if="!isWaitDialogCompleted" class="wait-message">AI正在分析您的简历内容，这可能需要一些时间，请耐心等待...</p>
      <p v-else class="completed-message">您的简历诊断已完成，现在可以查看详细报告</p>
      
      <div class="wait-tip">
        <el-icon color="#4096ff"><InfoFilled /></el-icon>
        <span>您可以在诊断完成后在右侧查看报告，也可以在个人中心查看历史诊断记录</span>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer" v-if="!isWaitDialogCompleted">
        <el-button size="large" class="secondary-button" @click="goToPersonCenter">查看个人中心</el-button>
        <el-button type="primary" size="large" class="primary-button" @click="showWaitDialog = false">我知道了</el-button>
      </span>
      <span class="dialog-footer" v-else>
        <el-button size="large" class="secondary-button" @click="goToPersonCenter">查看历史记录</el-button>
        <el-button type="primary" size="large" class="primary-button" @click="handleViewReport">查看报告</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 诊断报告抽屉 -->
  <el-drawer
    v-model="reportDrawerVisible"
    title="详细分析报告"
    direction="rtl"
    size="50%"
    :destroy-on-close="false"
  >
    <div class="drawer-content">
      <!-- 等待效果 -->
      <div v-if="isLoading" class="report-loading">
        <el-skeleton :rows="6" animated />
        <div class="loading-tip">
          <el-icon class="is-loading"><Loading /></el-icon>
          正在生成诊断报告，请稍候...
        </div>
      </div>

      <!-- 诊断内容滚动区域 -->
      <div v-if="diagnosticData" class="scrollable-content">
        <div class="report-header">
        </div>
        <DiagnosticReport :diagnosticData="diagnosticData" />
      </div>
      <div v-else-if="!isLoading" class="no-data">
        <el-empty description="诊断报告加载失败" />
        <div class="wechat-contact">
          <el-divider content-position="center">联系客服</el-divider>
          <div class="wechat-info">
            <el-icon class="wechat-icon"><ChatLineSquare /></el-icon>
            <p class="wechat-text">报告解析失败，请添加客服微信处理</p>
            <div class="wechat-qrcode" v-if="wechatQrCode">
              <img :src="wechatQrCode" alt="微信二维码" class="qrcode-image" />
              <p class="qrcode-hint">扫码添加客服微信</p>
            </div>
            <p class="wechat-code">
              微信：<span class="code" @click="copyWechatId('LHQfighting')">LHQfighting</span>
              <el-button
                type="primary"
                size="small"
                plain
                @click="copyWechatId('LHQfighting')"
              >
                复制
              </el-button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
  import { ref, computed, onBeforeUnmount, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
import {
  Upload,
  Document,
  Delete,
  Loading,
  CircleCheckFilled,
  CircleCloseFilled,
  InfoFilled,
  ChatLineSquare,
  Check
} from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import CONFIG from '@/config';
import appStore from '@/store';
import {
  aiOptimizeResumeByPdfTextAsync,
  getAiDiagnosisResultAsync
} from '@/http/api/ai';
import { getVXQunListUnauthAsync } from '@/http/api/website';
import { getMyResumeListAsync } from '@/http/api/createTemplate';
import axios from 'axios';
import AiOptimizeDialog from '@/views/createTemplate/designer/components/AiOptimizeDialog.vue';
import DiagnosticReport from './components/DiagnosticReport.vue';
import Pagination from '@/components/Pagination/pagination.vue';
import { resumeJsonToMarkdown, markdownToPlainText } from '@/utils/jsonToMd';

  const selectedFile = ref<File | null>(null);
  const isProcessing = ref(false);
  const isUploading = ref(false);
  const isDiagnosing = ref(false);
  const isUploadSuccess = ref(false);

  // 选项卡控制
  const activeTab = ref('upload');
  const pastedContent = ref('');
  const existingResumes = ref<any[]>([]);
  const selectedExistingResume = ref<any>(null);
  
  // 分页控制
  const page = ref<number>(1);
  const limit = ref<number>(8);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const isShowSkeleton = ref<boolean>(false);
  
  // 等待提示弹窗
  const showWaitDialog = ref<boolean>(false);
  const isWaitDialogCompleted = ref<boolean>(false);
  
  // 路由
  const router = useRouter();

  const uploadProgress = ref(0);
  const uploadStatus = ref<'success' | 'exception' | ''>('');
  const statusMessage = ref('');

  const pdfText = ref('');

  // 报告控制
  const showReportArea = ref(false); // 点击“开始AI诊断”后显示
  const isLoading = ref(false); // 报告区的加载效果
  const aiContent = ref('');
  const diagnosticData = ref<any>(null);
  const reportDrawerVisible = ref(false); // 诊断报告抽屉可见性

  // 微信二维码
  const wechatQrCode = ref<string>('');

  // 验证诊断数据完整性
  const validateDiagnosticData = (data: any) => {
    if (!data) {
      console.warn('诊断数据为空');
      return;
    }
    
    // 检查必需字段
    const requiredFields = {
      'overallScore': ['totalScore', 'dimensions', 'overallEvaluation', 'strengthAreas', 'improvementAreas'],
      'detailedDiagnosis': ['structure', 'language', 'content', 'timeline', 'jobMatch', 'skills', 'format', 'personalBrand'],
      'priorityList': ['high', 'medium', 'low'],
      'keywords': ['technical', 'softSkills', 'industry', 'results', 'usageTips']
    };
    
    const missingFields: string[] = [];
    
    for (const [section, fields] of Object.entries(requiredFields)) {
      if (!data[section]) {
        missingFields.push(section);
        console.warn(`缺少主要字段: ${section}`);
      } else {
        for (const field of fields) {
          if (data[section][field] === undefined || data[section][field] === null) {
            missingFields.push(`${section}.${field}`);
            console.warn(`缺少字段: ${section}.${field}`);
          }
        }
      }
    }
    
    if (missingFields.length > 0) {
      console.warn('诊断数据缺少以下字段:', missingFields);
    } else {
      console.log('诊断数据结构完整');
    }
    
    return missingFields;
  };

  // 解析JSON数据
  const parseDiagnosticData = () => {
    try {
      // 移除Markdown代码块标记
      let cleanContent = aiContent.value.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.replace(/^```json\s*/, '');
        cleanContent = cleanContent.replace(/\s*```$/, '');
      } else if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.replace(/^```\s*/, '');
        cleanContent = cleanContent.replace(/\s*```$/, '');
      }
      
      // 清理JSON字符串
      // 移除所有控制字符
      cleanContent = cleanContent.replace(/[\x00-\x1F\x7F]/g, '');
      
      // 移除可能的前缀和后缀
      cleanContent = cleanContent.replace(/^\s*json\s*/i, '');
      cleanContent = cleanContent.trim();
      
      console.log('清理后的JSON内容长度:', cleanContent.length);
      console.log('清理后的JSON内容前200字符:', cleanContent.substring(0, 200));
      
      // 尝试使用JSON.parse解析
      try {
        diagnosticData.value = JSON.parse(cleanContent);
        console.log('JSON.parse成功');
      } catch (parseError) {
        // 如果JSON.parse失败，尝试使用eval解析
        console.warn('JSON.parse失败，尝试使用eval解析:', parseError);
        // 确保字符串是有效的JavaScript对象
        if (cleanContent.trim().startsWith('{') && cleanContent.trim().endsWith('}')) {
          try {
            diagnosticData.value = eval('(' + cleanContent + ')');
            console.log('eval解析成功');
          } catch (evalError) {
            console.error('eval解析失败:', evalError);
            throw new Error('JSON格式无效');
          }
        } else {
          throw new Error('JSON格式无效');
        }
      }
      
      console.log('解析后的诊断数据:', diagnosticData.value);
      
      // 验证数据结构完整性
      validateDiagnosticData(diagnosticData.value);
      
      // 确保数据结构正确
      if (!diagnosticData.value) {
        throw new Error('解析后的数据为空');
      }

    } catch (e) {
      console.error('解析JSON失败:', e);
      console.error('原始内容:', aiContent.value);
      ElMessage.error('解析诊断报告失败，请重试');
      // 即使解析失败，也要确保diagnosticData有默认值
      diagnosticData.value = null;
    }
  };



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
    isWaitDialogCompleted.value = false;
  };

  // 处理查看报告
  const handleViewReport = () => {
    showWaitDialog.value = false;
    reportDrawerVisible.value = true;
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
    if (activeTab.value === 'upload') {
      startDiagnosis();
    } else {
      startDiagnosisFromContent();
    }
  };

  // 开始诊断（异步+轮询）
  const serialNumber = ref('');
  const pollInterval = ref<NodeJS.Timeout | null>(null);
  const isPolling = ref(false);

  // 开始诊断（统一使用异步模式）
  const startDiagnosis = async () => {
    if (!selectedFile.value || !isUploadSuccess.value) return;

    if (!modelInfoObj.value.selectedModel) {
      // 弹出AI优化对话框，让用户选择模型
      dialogAiOptimizeVisible.value = true;
      return;
    }

    // 重置等待弹窗状态
    isWaitDialogCompleted.value = false;
    // 重置诊断数据
    aiContent.value = '';
    diagnosticData.value = null;
    reportDrawerVisible.value = false;
    // 显示等待提示弹窗
    showWaitDialog.value = true;

    try {
      const params = {
        model: modelInfoObj.value.selectedModel,
        pdfText: pdfText.value,
        resumeType: 'offline',
        resumeName: selectedFile.value?.name || ''
      };

      // 使用异步API启动诊断
      const response = await aiOptimizeResumeByPdfTextAsync(params);
      
      if (response.data.status === 200) {
        serialNumber.value = response.data.data.serialNumber;
        
        // 检查是否是已存在的任务
        if (response.data.data.isExisting) {
          ElMessage({
            message: '已有诊断任务进行中，继续查询结果...',
            type: 'info',
            duration: 3000
          });
        } else {
          ElMessage({
            message: '诊断任务已启动，正在查询结果...',
            type: 'success',
            duration: 3000
          });
        }
        
        // 开始轮询查询诊断结果
        startPolling(serialNumber.value);
      } else {
        throw new Error(response.data.message || '启动诊断任务失败');
      }
    } catch (error: any) {
      if (error?.message && error.message.includes('您有正在进行的诊断任务')) {
        // 显示弹窗提示
        ElMessageBox.alert(
          '您有正在进行的诊断任务，请稍等片刻后再提交',
          '提示',
          {
            confirmButtonText: '我知道了',
            type: 'info'
          }
        );
      } else {
        ElMessage.error('启动诊断任务失败: ' + (error?.message || '未知错误'));
      }
      showWaitDialog.value = false;
    }
  };

  // 开始轮询查询诊断结果
  const startPolling = (sn: string) => {
    isPolling.value = true;
    isDiagnosing.value = true;
    isProcessing.value = true;

    // 显示报告区域（但不关闭等待弹窗，等第一次查询后再关闭）
    showReportArea.value = true;
    isLoading.value = true;
    aiContent.value = '';
    statusMessage.value = 'AI诊断中，请稍候...';

    // 每3秒查询一次
    pollInterval.value = setInterval(async () => {
      try {
        // 调用查询诊断结果的API
        const response = await getAiDiagnosisResultAsync({ serialNumber: sn });

        if (response.data.status === 200) {
          const data = response.data.data;

          if (data.isComplete) {
            // 诊断完成，更新等待弹窗状态
            isWaitDialogCompleted.value = true;
            
            // 停止轮询并显示结果
            stopPolling();
            
            // 保持等待弹窗打开，让用户看到完成状态
            // 等待用户点击"查看报告"按钮后再关闭弹窗
            
            aiContent.value = data.result;
            try {
              parseDiagnosticData();
            } catch (error) {
              console.error('解析诊断数据失败:', error);
              ElMessage.error('解析诊断报告失败，请重试');
            }
            isLoading.value = false;
            isDiagnosing.value = false;
            isProcessing.value = false;
          } else {
            // 诊断未完成，更新状态信息
            statusMessage.value = data.message || 'AI诊断中，请稍候...';
            // 弹窗保持打开，等待用户点击"我知道了"或诊断完成
          }
        } else {
          console.warn('查询诊断结果失败:', response.data.message);
        }
      } catch (error) {
        console.error('轮询查询失败:', error);
      }
    }, 3000);

    // 设置超时（10分钟后自动停止轮询）
    setTimeout(() => {
      if (isPolling.value) {
        stopPolling();
        isLoading.value = false;
        isDiagnosing.value = false;
        isProcessing.value = false;
        // 关闭等待弹窗
        showWaitDialog.value = false;
        ElMessage.info('诊断时间较长，请在个人中心查看结果');
      }
    }, 600000); // 10分钟
  };

  // 停止轮询
  const stopPolling = () => {
    if (pollInterval.value) {
      clearInterval(pollInterval.value);
      pollInterval.value = null;
    }
    isPolling.value = false;
  };

  // 跳转到个人中心
  const goToPersonCenter = () => {
    router.push('/person/aiOptimizeLogs');
    showWaitDialog.value = false;
  };

  // 页面卸载时停止轮询
  onBeforeUnmount(() => {
    stopPolling();
  });



  // 从内容开始诊断
  const startDiagnosisFromContent = async () => {
    if (!modelInfoObj.value.selectedModel) {
      // 弹出AI优化对话框，让用户选择模型
      dialogAiOptimizeVisible.value = true;
      return;
    }

    // 重置等待弹窗状态
    isWaitDialogCompleted.value = false;
    // 重置诊断数据
    aiContent.value = '';
    diagnosticData.value = null;
    reportDrawerVisible.value = false;
    // 显示等待提示弹窗
    showWaitDialog.value = true;

    try {
      let content = '';
      let resumeType = '';
      let resumeId = '';
      let resumeName = '';

      if (activeTab.value === 'paste') {
        content = pastedContent.value;
        resumeType = 'paste';
      } else if (activeTab.value === 'existing') {
        resumeId = selectedExistingResume.value?.id || '';
        resumeName = selectedExistingResume.value?.name || '';
        resumeType = 'existing';
        
        // 直接使用已选中的简历数据中的template_json（getMyResumeList接口已返回）
        if (selectedExistingResume.value?.template_json) {
          // 转换为Markdown
          const rawMarkdown = resumeJsonToMarkdown(selectedExistingResume.value.template_json);
          // 转换为纯文本（去除所有Markdown格式）
          content = markdownToPlainText(rawMarkdown);
        } else {
          throw new Error('简历数据格式不正确，缺少template_json字段');
        }
      }

      // 检查内容是否为空
      if (!content.trim()) {
        throw new Error('简历内容为空，无法进行诊断');
      }

      // 检查内容长度
      if (content.length > 15000) {
        throw new Error('简历内容过长，请限制在15000个字符以内');
      }

      // 检查内容长度是否过短
      if (content.length < 50) {
        throw new Error('简历内容过短，请提供更详细的简历信息');
      }

      const params = {
        model: modelInfoObj.value.selectedModel,
        pdfText: content,
        resumeType: resumeType,
        resumeId: resumeId,
        resumeName: resumeName
      };

      // 使用异步API启动诊断
      const response = await aiOptimizeResumeByPdfTextAsync(params);
      
      if (response.data.status === 200) {
        serialNumber.value = response.data.data.serialNumber;
        
        // 检查是否是已存在的任务
        if (response.data.data.isExisting) {
          ElMessage({
            message: '已有诊断任务进行中，继续查询结果...',
            type: 'info',
            duration: 3000
          });
        } else {
          ElMessage({
            message: '诊断任务已启动，正在查询结果...',
            type: 'success',
            duration: 3000
          });
        }
        
        // 开始轮询查询诊断结果
        startPolling(serialNumber.value);
      } else {
        throw new Error(response.data.message || '启动诊断任务失败');
      }
    } catch (error: any) {
      if (error?.message && error.message.includes('您有正在进行的诊断任务')) {
        // 显示弹窗提示
        ElMessageBox.alert(
          '您有正在进行的诊断任务，请稍等片刻后再提交',
          '提示',
          {
            confirmButtonText: '我知道了',
            type: 'info'
          }
        );
      } else {
        ElMessage.error('启动诊断任务失败: ' + (error?.message || '未知错误'));
      }
      showWaitDialog.value = false;
    }
  };





  // 加载已有简历列表
  const loadExistingResumes = async () => {
    try {
      isShowSkeleton.value = true;
      // 调用后端API获取用户的已有简历列表
      const params = {
        page: page.value,
        limit: limit.value
      };
      console.log('开始加载已有简历列表，参数:', params);
      const response = await getMyResumeListAsync(params);
      console.log('获取简历列表响应:', response);
      if (response.data.status === 200 && response.data.data) {
        console.log('简历列表数据:', response.data.data);
        existingResumes.value = response.data.data.list.map((item: any) => ({
          id: item._id,
          name: item.template_json?.config?.title || item.template_name || item.name || item.title || '未命名简历',
          previewUrl: item.template_cover || item.previewUrl || '',
          template_json: item.template_json // 保存template_json用于诊断
        }));
        total.value = response.data.data.page.count;
        currentPage.value = response.data.data.page.currentPage;
        console.log('处理后的简历列表:', existingResumes.value);
        console.log('分页信息:', { total: total.value, currentPage: currentPage.value });
      } else {
        console.warn('获取简历列表失败:', response.data);
        ElMessage.warning('获取简历列表失败: ' + (response.data.message || '未知错误'));
      }
    } catch (error: any) {
      console.error('加载已有简历失败:', error);
      console.error('错误详情:', error.message, error.response);
      ElMessage.error('加载已有简历失败: ' + (error.message || '网络错误'));
    } finally {
      isShowSkeleton.value = false;
    }
  };

  // 获取微信二维码
  const getWechatQrCode = async () => {
    try {
      const data = await getVXQunListUnauthAsync();
      if (data.status === 200) {
        const wechatItem = data.data.find((item: any) => item.name === '添加微信');
        if (wechatItem) {
          wechatQrCode.value = wechatItem.qr_code;
        }
      }
    } catch (error) {
      console.error('获取微信二维码失败:', error);
    }
  };

  // 组件挂载时加载已有简历
  onMounted(() => {
    loadExistingResumes();
    getWechatQrCode();
  });

  // 工具：格式化文件大小
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };



  // 打开诊断报告抽屉
  const openReportDrawer = () => {
    reportDrawerVisible.value = true;
  };

  // 选择简历
  const selectResume = (resume: any) => {
    selectedExistingResume.value = resume;
  };

  // 分页处理
  const handleCurrentChange = (current: number) => {
    page.value = current;
    loadExistingResumes();
  };

  // 每页数量变化处理
  const handleSizeChange = (size: number) => {
    limit.value = size;
    page.value = 1;
    loadExistingResumes();
  };

  // 复制微信ID
  const copyWechatId = (wechatId: string) => {
    navigator.clipboard.writeText(wechatId)
      .then(() => {
        ElMessage.success('微信ID复制成功');
      })
      .catch(err => {
        console.error('复制失败:', err);
        ElMessage.error('复制失败，请手动复制');
      });
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
    }
  }

  /* 诊断报告布局优化 */
  .detailed-report {
    max-width: 1400px;
    margin: 0 auto;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }



  .subtitle {
    font-size: 1.15rem;
    max-width: 650px;
    margin: 0 auto;
    font-weight: 400;
    line-height: 1.6;
  }

  /* 主内容区 */
  .main-content {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* 操作区域 */
  .operation-area {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.9) 100%);
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(102, 126, 234, 0.2);
    backdrop-filter: blur(12px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      box-shadow: 0 16px 48px rgba(102, 126, 234, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
  }

  /* 操作指南 */
  .operation-guide {
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 2px solid rgba(102, 126, 234, 0.1);
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100px;
      height: 2px;
      background: linear-gradient(90deg, #667eea, #764ba2);
      border-radius: 2px;
    }
  }

  .guide-title {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 20px;
    color: #2d3748;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .guide-steps {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }

  .guide-step {
    flex: 1;
    min-width: 280px;
    display: flex;
    gap: 16px;
  }

  .step-number {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  .step-content {
    flex: 1;
  }

  .step-content h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: #2d3748;
  }

  .step-content p {
    font-size: 0.95rem;
    color: #718096;
    line-height: 1.5;
  }

  /* 查看报告按钮 */
  .view-report-btn {
    margin-top: 20px;
    width: 100%;
    height: 44px;
    font-size: 0.95rem;
    font-weight: 700;
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
    }
    
    &:active {
      transform: translateY(-1px);
    }
  }

  /* 抽屉内容 */
  .drawer-content {
    height: 100%;
    overflow: hidden;
  }

  /* 已有简历容器 */
  .existing-resume-container {
    margin-bottom: 20px;
  }

  /* 简历卡片容器 */
  .resume-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 20px;
  }

  /* 简历卡片 */
  .resume-card {
    position: relative;
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    background: #fff;
    flex: 1 1 220px;
    min-width: 220px;
    max-width: calc(25% - 12px);
    height: 430px;
    display: flex;
    flex-direction: column;
    
    @media (max-width: 992px) {
      max-width: calc(33.333% - 10px);
    }
    
    @media (max-width: 768px) {
      max-width: calc(50% - 7.5px);
    }
    
    @media (max-width: 576px) {
      max-width: 100%;
    }
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      border-color: #4096ff;
    }
    
    &.selected {
      border-color: #4096ff;
      box-shadow: 0 0 0 2px rgba(64, 150, 255, 0.2);
    }
  }

  /* 卡片图片 */
  .card-image {
    width: 100%;
    flex: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f0f0f0;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: transform 0.3s ease;
    }
    
    .resume-card:hover img {
      transform: scale(1.05);
    }
  }

  /* 卡片信息 */
  .card-info {
    padding: 15px;
    
    .card-title {
      font-size: 14px;
      font-weight: 600;
      margin: 0;
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  /* 选中指示器 */
  .selected-indicator {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  /* 无简历提示 */
  .no-resumes {
    margin-top: 40px;
    text-align: center;
  }

  /* 等待提示弹窗 */
  .wait-dialog {
    .el-dialog__header {
      text-align: center;
      padding: 24px 24px 0;
      
      .el-dialog__title {
        font-size: 18px;
        font-weight: 600;
        color: #303133;
      }
    }
    
    .el-dialog__body {
      padding: 30px 24px;
    }
  }
  
  .wait-dialog-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 10px 0;
    
    .loading-container {
      position: relative;
      width: 80px;
      height: 80px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .loading-icon {
        font-size: 48px;
        color: #4096ff;
        animation: spin 1s linear infinite;
        z-index: 1;
      }
      
      .loading-spinner {
        position: absolute;
        top: 14%;
        left: 12%;
        transform: translate(-50%, -50%);
        border: 3px solid #f3f3f3;
        border-top: 3px solid #4096ff;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        animation: spin 1s linear infinite;
      }
    }
    
    .completed-container {
      width: 80px;
      height: 80px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f0fdf4;
      border-radius: 50%;
      
      .completed-icon {
        font-size: 48px;
        color: #22c55e;
      }
    }
    
    h3 {
      margin: 0 0 16px;
      font-size: 18px;
      font-weight: 600;
      color: #303133;
    }
    
    .completed-title {
      color: #166534;
    }
    
    .wait-message {
      margin: 0 0 20px;
      font-size: 14px;
      color: #606266;
      line-height: 1.5;
    }
    
    .completed-message {
      margin: 0 0 20px;
      font-size: 14px;
      color: #166534;
      line-height: 1.5;
    }
    
    .wait-tip {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background-color: #ecf5ff;
      border-radius: 4px;
      font-size: 14px;
      color: #4096ff;
      line-height: 1.4;
      width: 100%;
      
      span {
        flex: 1;
        text-align: left;
      }
    }
  }
  
  .dialog-footer {
    display: flex;
    justify-content: center;
    gap: 12px;
    padding: 0 24px 24px;
    
    button {
      flex: 1;
      height: 40px;
      font-size: 14px;
      font-weight: 500;
      min-width: 120px;
    }
    
    .secondary-button {
      background: #ffffff;
      border: 1px solid #d1d5db;
      color: #374151;
      
      &:hover {
        background: #f9fafb;
        border-color: #9ca3af;
      }
    }
    
    .primary-button {
      background: linear-gradient(135deg, #4096ff 0%, #1677ff 100%);
      border: none;
      
      &:hover {
        background: linear-gradient(135deg, #1677ff 0%, #0958d9 100%);
      }
    }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* 诊断报告容器 */
  .diagnostic-report {
    width: 100%;
    overflow-x: auto;
  }

  /* 微信联系方式 */
  .wechat-contact {
    margin-top: 30px;
    width: 100%;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    background-color: #f5f7fa;
    border-radius: 12px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .wechat-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      .wechat-icon {
        font-size: 48px;
        color: #4CAF50;
        margin-bottom: 16px;
      }

      .wechat-text {
        font-size: 16px;
        color: #303133;
        margin-bottom: 12px;
      }

      .wechat-code {
        font-size: 18px;
        color: #303133;
        font-weight: 600;

        .code {
          color: #4CAF50;
          margin-left: 8px;
        }
      }
    }
  }



  /* 上传区域 */
  .upload-container {
    width: 100%;
    text-align: center;

    :deep(.el-upload) {
      width: 100%;
    }

    :deep(.el-upload-dragger) {
      width: 100%;
      padding: 40px 20px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.7);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border: 2px dashed rgba(102, 126, 234, 0.3);

      &:hover {
        border-color: #667eea;
        box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15), 0 2px 8px rgba(0, 0, 0, 0.06);
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(-1px);
      }
    }
  }

  .upload-content {
    .upload-icon {
      margin-bottom: 16px;
      animation: iconBounce 2s ease-in-out infinite;
    }

    @keyframes iconBounce {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    .upload-title {
      font-size: 1.1rem;
      margin-bottom: 6px;
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
      margin-bottom: 10px;
      font-size: 0.85rem;
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
    flex-direction: column;
    gap: 12px;
    margin-top: 20px;

    .upload-btn,
    .diagnose-btn {
      width: 100%;
      height: 44px;
      font-size: 0.95rem;
      font-weight: 700;
      border-radius: 10px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
        transform: translateY(-2px);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
      }

      &:active {
        transform: translateY(-1px);
      }

      :deep(.el-icon) {
        margin-right: 6px;
        font-size: 1rem;
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
    margin-top: 0;
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
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.9) 100%);
      border-radius: 20px;
      border: 1px solid rgba(102, 126, 234, 0.2);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08);
      backdrop-filter: blur(12px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;

      &:hover {
        box-shadow: 0 16px 48px rgba(102, 126, 234, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
      }
    }

    :deep(.el-card__body) {
      padding: 32px;
      position: relative;
    }

    .report-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      padding-bottom: 24px;
      border-bottom: 2px solid rgba(102, 126, 234, 0.1);
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100px;
        height: 2px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        border-radius: 2px;
      }

      h3 {
        font-size: 1.6rem;
        color: #2d3748;
        margin: 0;
        font-weight: 800;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .download-buttons {
        display: flex;
        gap: 12px;
      }

      .download-btn {
        font-size: 0.9rem;
        padding: 10px 20px;
        height: auto;
        border: none;
        border-radius: 10px;
        font-weight: 600;
        color: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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

        &:hover:not(:disabled) {
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
          transform: translateY(-2px);
        }

        &:hover:not(:disabled)::before {
          left: 100%;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        &.el-button--primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

          &:hover:not(:disabled) {
            background: linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%);
          }
        }

        &.el-button--success {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);

          &:hover:not(:disabled) {
            background: linear-gradient(135deg, #0ea371 0%, #047857 100%);
          }
        }
      }
    }

    .report-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 60px 20px;

      .loading-tip {
        margin-top: 30px;
        display: flex;
        align-items: center;
        gap: 12px;
        color: #718096;
        font-size: 1.1rem;
        font-weight: 600;
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

  /* 滚动内容 */
  .scrollable-content {
    max-height: calc(100vh - 200px);
    overflow-y: auto;
    padding-right: 12px;
    
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(102, 126, 234, 0.05);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 3px;
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

    /* 响应式布局：小屏幕设备切换为单栏 */
    .layout-container {
      flex-direction: column;
    }

    .left-panel {
      flex: 1;
      position: static;
      max-height: none;
    }

    .report-nav {
      margin-top: 20px;
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

  .scroll-to-bottom-btn {
    position: fixed;
    bottom: 80px; /* 距离底部，可调整 */
    right: 40px; /* 距离右侧 */
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  /* 选项卡样式 */
  .upload-tabs {
    margin-bottom: 20px;

    :deep(.el-tabs__header) {
      margin-bottom: 20px;
    }

    :deep(.el-tabs__nav) {
      justify-content: center;
    }

    :deep(.el-tabs__item) {
      font-size: 0.95rem;
      font-weight: 600;
      color: #666;

      &.is-active {
        color: #667eea;
      }
    }

    :deep(.el-tabs__active-bar) {
      background: linear-gradient(90deg, #667eea, #764ba2);
    }
  }

  /* 粘贴内容容器 */
  .paste-container {
    margin-bottom: 24px;
    padding: 24px;
    background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%);
    border-radius: 16px;
    border: 1px solid #e1e8f0;
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.08);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 6px 24px rgba(102, 126, 234, 0.12);
      border-color: #c5d1e8;
    }

    .paste-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;

      .paste-title {
        font-size: 16px;
        font-weight: 600;
        color: #2d3748;
      }

      .char-count {
        font-size: 13px;
        color: #718096;
        padding: 4px 10px;
        background: rgba(102, 126, 234, 0.1);
        border-radius: 20px;
        transition: all 0.3s ease;

        &.over-limit {
          color: #e53e3e;
          background: rgba(229, 62, 62, 0.1);
        }
      }
    }

    :deep(.el-textarea__inner) {
      border-radius: 12px;
      border: 2px solid #e1e8f0;
      padding: 16px;
      font-size: 15px;
      line-height: 1.8;
      background: #ffffff;
      transition: all 0.3s ease;
      resize: vertical;
      min-height: 200px;

      &::placeholder {
        color: #a0aec0;
        font-size: 14px;
      }

      &:hover {
        border-color: #b8c5db;
      }

      &:focus {
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }
    }

    :deep(.el-input__count) {
      background: transparent;
      color: #718096;
      font-size: 13px;
    }

    .paste-hint {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin-top: 16px;
      padding: 14px 18px;
      background: linear-gradient(135deg, #e8f4ff 0%, #f0f8ff 100%);
      border-radius: 10px;
      border-left: 4px solid #4096ff;

      .el-icon {
        font-size: 18px;
        margin-top: 2px;
        flex-shrink: 0;
      }

      .hint-content {
        flex: 1;

        p {
          font-size: 14px;
          color: #4a5568;
          line-height: 1.6;
          margin: 0;

          &.hint-warning {
            margin-top: 6px;
            color: #e53e3e;
            font-size: 13px;
            font-weight: 500;
          }
        }
      }
    }
  }

  /* 已有简历容器 */
  .existing-resume-container {
    margin-bottom: 20px;
  }

  /* 无简历提示 */
  .no-resumes {
    margin-top: 20px;
  }
</style>