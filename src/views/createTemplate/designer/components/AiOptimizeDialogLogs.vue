<template>
  <el-dialog
    :model-value="dialogAiOptimizeVisibleLogs"
    title="AI简历诊断记录"
    width="1000px"
    append-to-body
    class="custom-dialog"
    @open="handleOpen"
    @close="cancle"
  >
    <div class="ai-content-optimize-dialog-logs">
      <!-- 表格列表 -->
      <div class="table-container">
        <el-table
          v-loading="loading"
          class="ai-optimize-logs"
          :data="logsList"
          size="default"
          border
          element-loading-text="加载中..."
          element-loading-background="rgba(255, 255, 255, 0.8)"
        >
        <el-table-column prop="ai_model" label="模型名称" width="120">
          <template #default="scope">
            <el-tooltip
              :content="scope.row.ai_model !== 'glm-4-flash' ? scope.row.ai_model : '免费模型'"
              placement="top"
              :disabled="!scope.row.ai_model || scope.row.ai_model.length < 10"
            >
              <el-tag
                v-if="scope.row.ai_model !== 'glm-4-flash'"
                type="success"
                size="default"
                class="tag-cell"
              >
                {{ truncateContent(scope.row.ai_model, 10) }}
              </el-tag>
              <el-tag v-else type="success" size="default" class="tag-cell">免费模型</el-tag>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column prop="ai_amount" label="消耗简币" width="100">
          <template #default="scope">
            <div class="model-price">
              {{ scope.row.ai_amount }}
              <img width="24" src="@/assets/images/jianB.png" alt="简币" title="简币" />
            </div>
          </template>
        </el-table-column>

        <el-table-column label="诊断类型" width="130">
          <template #default="scope">
            <el-tooltip :content="getResumeTypeLabel(scope.row?.resume_type)" placement="top">
              <el-tag
                :type="getResumeTypeTagType(scope.row?.resume_type) as any"
                size="default"
                class="tag-cell"
              >
                {{ getResumeTypeText(scope.row?.resume_type) }}
              </el-tag>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="报告格式" width="100">
          <template #default="scope">
            <el-tag
              :type="isNewFormat(scope.row) ? 'primary' : 'info'"
              size="default"
              class="tag-cell"
            >
              {{ isNewFormat(scope.row) ? '结构化' : 'Markdown' }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="createDate" label="诊断日期" width="160">
          <template #default="scope">
            <div>
              {{ formatListDate(scope.row.createDate) }}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="resume_name" label="简历名称" min-width="120" width="120">
          <template #default="scope">
            <el-tooltip
              :content="scope.row.resume_name || '未知简历'"
              placement="top"
              :disabled="!scope.row.resume_name"
            >
              <div class="content-cell-wrapper">
                <div class="content-cell">
                  {{ scope.row.resume_name || '未知简历' }}
                </div>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="诊断状态" width="100">
          <template #default="scope">
            <el-tag
              :type="getDiagnosisStatusType(scope.row?.status) as any"
              size="default"
              class="tag-cell"
            >
              {{ getDiagnosisStatusText(scope.row?.status) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="100" fixed="right">
          <template #default="scope">
            <el-button 
              link 
              size="small" 
              type="primary" 
              @click="detail(scope.row)"
              :disabled="scope.row?.status === 'pending'"
              :title="scope.row?.status === 'pending' ? '诊断进行中，暂不可查看' : ''"
            >
              查看详情
            </el-button>
          </template>
        </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <Pagination
          v-if="logsList.length > 0 && total > limit"
          :total="total"
          :limit="limit"
          :current-page="currentPage"
          @handle-current-change="handleCurrentChange"
          @handle-size-change="handleSizeChange"
        ></Pagination>
      </div>
    </div>
  </el-dialog>

  <!-- 旧的Markdown格式诊断结果抽屉 -->
  <ai-optimize-drawer
    :drawer="showOldDrawer"
    :content="currentRow?.ai_content"
    @close-ai-optimize-drawer="closeOldDrawer"
  ></ai-optimize-drawer>

  <!-- 新的结构化格式诊断结果抽屉 -->
  <diagnostic-report-drawer
    v-model:visible="showNewDrawer"
    :diagnostic-data="currentRow?.ai_content"
    @close="closeNewDrawer"
  ></diagnostic-report-drawer>
</template>

<script lang="ts" setup>
  import { ElMessage, ElNotification, ElEmpty } from 'element-plus';
  import { getAiOptimizeLogsListAsync } from '@/http/api/ai';
  import { getVXQunListUnauthAsync } from '@/http/api/website';
  import { formatListDate } from '@/utils/common';
  import AiOptimizeDrawer from '@/views/createTemplate/designer/components/AiOptimizeDrawer.vue';
  import DiagnosticReportDrawer from '@/components/DiagnosticReportDrawer.vue';
  import { ref, computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';

  const emit = defineEmits(['cancle', 'detail']);

  const route = useRoute();

  interface TDialog {
    dialogAiOptimizeVisibleLogs: boolean;
  }

  withDefaults(defineProps<TDialog>(), {
    dialogAiOptimizeVisibleLogs: false
  });

  // 加载状态
  const loading = ref<boolean>(false);

  // 分页相关
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);

  // 记录列表
  const logsList = ref<any>([]);

  // 当前选中的行
  const currentRow = ref<any>(null);

  // 抽屉显示状态
  const showOldDrawer = ref<boolean>(false);
  const showNewDrawer = ref<boolean>(false);

  // 微信二维码
  const wechatQrCode = ref<string>('');

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

  // 复制微信ID
  const copyWechatId = (wechatId: string) => {
    navigator.clipboard.writeText(wechatId)
      .then(() => {
        ElMessage.success('微信ID复制成功');
      })
      .catch(() => {
        ElMessage.error('复制失败，请手动复制');
      });
  };

  // 组件挂载时获取微信二维码
  onMounted(() => {
    getWechatQrCode();
  });

  // 清理JSON字符串中的非法字符
  const cleanJsonString = (str: string): string => {
    // 移除代码块标记
    let cleaned = str.replace(/^```json\s*/g, "").replace(/\s*```$/g, "").trim();
    cleaned = cleaned.replace(/^```+|```+$/g, "").trim();
    // 移除json前缀
    cleaned = cleaned.replace(/^\s*json\s*\n/g, "").trim();
    // 移除所有控制字符
    cleaned = cleaned.replace(/[\x00-\x1F\x7F]/g, "");
    return cleaned;
  };

  // 解析JSON
  const parseDiagnosticJson = (content: string): any => {
    const cleaned = cleanJsonString(content);
    
    // 尝试使用JSON.parse解析
    try {
      return JSON.parse(cleaned);
    } catch (parseError) {
      console.warn('[诊断报告] JSON.parse失败，尝试使用eval解析:', parseError);
      // 如果JSON.parse失败，尝试使用eval解析
      if (cleaned.trim().startsWith('{') && cleaned.trim().endsWith('}')) {
        try {
          return eval('(' + cleaned + ')');
        } catch (evalError) {
          console.error('[诊断报告] eval解析也失败:', evalError);
        }
      }
      throw parseError;
    }
  };

  // 解析后的诊断数据
  const parsedDiagnosticData = computed(() => {
    if (!currentRow.value?.ai_content) {
      console.log('[诊断报告] 无内容数据');
      return null;
    }
    try {
      // 使用parseDiagnosticJson解析
      const data = parseDiagnosticJson(currentRow.value.ai_content);
      console.log('[诊断报告] 解析成功，数据字段:', Object.keys(data));
      // 检查是否包含新格式的关键字段
      if (data.overallScore || data.detailedDiagnosis || data.priorityList || data.keywords) {
        return data;
      }
      console.log('[诊断报告] 数据缺少必要字段');
      return null;
    } catch (e) {
      console.error('[诊断报告] 解析失败:', e);
      return null;
    }
  });

  // 截断长文本内容
  const truncateContent = (content: string, maxLength = 50) => {
    if (!content) return '';
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  // 判断是否为新的结构化格式
  const isNewFormat = (row: any): boolean => {
    if (!row) return false;
    
    // 根据诊断类型判断格式
    if (row.resume_type === 'paste' || row.resume_type === 'existing') {
      // 粘贴内容和已有简历必然是结构化数据
      return true;
    } else if (row.resume_type === 'online') {
      // 在线简历必然是Markdown格式
      return false;
    } else if (row.resume_type === 'offline' || row.resume_type === 'file') {
      // 离线简历（包括file类型）可能是md，也可能是结构化，需要进一步判断
      if (!row.ai_content) return false;
      try {
        const data = parseDiagnosticJson(row.ai_content);
        return !!(data.overallScore || data.detailedDiagnosis || data.priorityList || data.keywords);
      } catch (e) {
        return false;
      }
    }
    
    // 默认情况，通过内容判断
    if (!row.ai_content) return false;
    try {
      const data = parseDiagnosticJson(row.ai_content);
      return !!(data.overallScore || data.detailedDiagnosis || data.priorityList || data.keywords);
    } catch (e) {
      return false;
    }
  };

  // 获取诊断类型标签
  const getResumeTypeLabel = (type: string): string => {
    const typeMap: Record<string, string> = {
      'online': '在线简历诊断',
      'offline': '附件简历诊断',
      'file': '附件简历诊断',
      'paste': '粘贴内容诊断',
      'existing': '在线简历诊断'
    };
    return typeMap[type] || '未知类型';
  };

  // 获取诊断类型显示文本
  const getResumeTypeText = (type: string): string => {
    const typeMap: Record<string, string> = {
      'online': '在线诊断',
      'offline': '附件诊断',
      'file': '附件诊断',
      'paste': '粘贴诊断',
      'existing': '在线诊断'
    };
    return typeMap[type] || '未知';
  };

  // 获取诊断类型标签样式
  const getResumeTypeTagType = (type: string): string => {
    const typeMap: Record<string, string> = {
      'online': 'success',
      'offline': 'info',
      'file': 'info',
      'paste': 'warning',
      'existing': 'primary'
    };
    return typeMap[type] || 'info';
  };

  // 获取诊断状态显示文本
  const getDiagnosisStatusText = (status: string): string => {
    const statusMap: Record<string, string> = {
      'pending': '诊断中',
      'completed': '已完成',
      'failed': '失败'
    };
    return statusMap[status] || '未知';
  };

  // 获取诊断状态标签样式
  const getDiagnosisStatusType = (status: string): string => {
    const statusMap: Record<string, string> = {
      'pending': 'warning',
      'completed': 'success',
      'failed': 'danger'
    };
    return statusMap[status] || 'info';
  };

  // 获取模型列表
  const getAiOptimizeLogsList = async () => {
    try {
      loading.value = true;
      const params = {
        page: page.value,
        limit: limit.value,
        resumeId: route.params.id
      };
      const response = await getAiOptimizeLogsListAsync(params);
      if (response.data.status === 200) {
        logsList.value = response.data.data.list;
        total.value = response.data.data.page.count;
        currentPage.value = response.data.data.page.currentPage;
      } else {
        ElMessage.error(response.data.message);
      }
    } catch (error) {
      ElMessage.error('获取诊断历史列表失败');
    } finally {
      loading.value = false;
    }
  };

  // 分页事件
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getAiOptimizeLogsList();
  };

  const handleSizeChange = (pageSize: number) => {
    limit.value = pageSize;
    getAiOptimizeLogsList();
  };

  // 弹窗打开
  const handleOpen = async () => {
    try {
      // 获取诊断历史列表
      getAiOptimizeLogsList();
    } catch (error) {
      ElNotification.error('获取诊断历史列表失败');
    }
  };

  // 关闭
  const cancle = () => {
    emit('cancle');
  };

  // 详情
  const detail = (row: any) => {
    currentRow.value = row;
    
    if (isNewFormat(row)) {
      // 新的结构化格式
      showNewDrawer.value = true;
    } else {
      // 旧的Markdown格式
      showOldDrawer.value = true;
    }
    
    emit('detail', row);
  };

  // 关闭旧的抽屉
  const closeOldDrawer = () => {
    showOldDrawer.value = false;
  };

  // 关闭新的抽屉
  const closeNewDrawer = () => {
    showNewDrawer.value = false;
  };
</script>

<style lang="scss">
  .custom-dialog {
    border-radius: 24px;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
    background-color: #ffffff;
    overflow: hidden;
    & .el-dialog__header {
      background-color: transparent;
      padding: 24px;
      color: #333333;
      font-size: 24px;
      font-weight: bold;
      border-bottom: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    & .el-dialog__body {
      padding: 24px;
      max-height: 70vh;
      overflow-y: auto;
    }
    & .el-dialog__footer {
      background-color: #ffffff;
      padding: 24px;
      border-top: none;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
  }

  .ai-content-optimize-dialog-logs {
    min-height: 30vh;

    .table-container {
      width: 100%;
      overflow-x: auto;
    }

    .model-price {
      display: flex;
      align-items: center;
      img {
        margin-left: 5px;
      }
    }

    .content-cell-wrapper {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    .content-cell {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: default;
      max-width: 100%;
      width: 100%;
    }

    .tag-cell {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: default;
      max-width: 100%;
      display: flex;
      align-items: center;
      width: 100%;
    }

    :deep(.el-table) {
      width: 100%;
    }

    :deep(.el-table__body-wrapper) {
      transition: height 0.3s ease;
    }

    :deep(.el-table__empty-block) {
      min-height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :deep(.el-tooltip__popper) {
      max-width: 400px;
      line-height: 1.5;
      word-wrap: break-word;
    }
  }

  .diagnostic-drawer-content {
    padding: 5px;
    height: 100%;
    overflow-y: auto;
  }

  .loading-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 400px;
  }

  /* 微信联系方式 */
  .wechat-contact {
    margin-top: 40px;
    width: 100%;
    max-width: 400px;
  }

  .wechat-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    background: linear-gradient(135deg, #f6f9ff 0%, #e8f0ff 100%);
    border-radius: 16px;
    border: 1px solid #e1e8f0;
    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.1);
  }

  .wechat-icon {
    font-size: 48px;
    color: #07C160;
    margin-bottom: 16px;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  .wechat-text {
    font-size: 16px;
    color: #606266;
    margin: 0 0 20px 0;
    text-align: center;
    line-height: 1.5;
  }

  .wechat-code {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 16px;
    color: #303133;
    font-weight: 600;
    margin: 0;
  }

  .wechat-code .code {
    cursor: pointer;
    color: #667eea;
    font-weight: 700;
    transition: all 0.3s;
  }

  .wechat-code .code:hover {
    color: #764ba2;
    text-decoration: underline;
  }

  .wechat-qrcode {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0 20px 0;
  }

  .qrcode-image {
    width: 160px;
    height: 160px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s;
  }

  .qrcode-image:hover {
    transform: scale(1.05);
  }

  .qrcode-hint {
    font-size: 14px;
    color: #909399;
    margin: 8px 0 0 0;
  }

  .wechat-info .el-button {
    margin-top: 0;
  }
</style>
