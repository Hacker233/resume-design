<template>
  <div class="ai-optimize-logs-container">
    <div class="ai-content-optimize-dialog-logs">
      <!-- 表格列表 -->
      <el-table
        v-loading="loading"
        class="ai-optimize-logs"
        :data="logsList"
        style="width: 100%"
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

        <el-table-column prop="ai_amount" label="消耗简币" width="120">
          <template #default="scope">
            <div class="model-price">
              {{ scope.row.ai_amount }}
              <img width="24" src="@/assets/images/jianB.png" alt="简币" title="简币" />
            </div>
          </template>
        </el-table-column>

        <el-table-column label="诊断类型" width="150">
          <template #default="scope">
            <el-tooltip
              :content="scope.row?.resume_type === 'offline' ? '离线简历诊断' : '在线简历诊断'"
              placement="top"
            >
              <el-tag
                :type="scope.row?.resume_type === 'offline' ? 'success' : 'info'"
                size="default"
                class="tag-cell"
              >
                {{ scope.row?.resume_type === 'offline' ? '离线简历诊断' : '在线简历诊断' }}
              </el-tag>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column prop="createDate" label="诊断日期" width="180">
          <template #default="scope">
            <div>
              {{ formatListDate(scope.row.createDate) }}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="ai_content" label="诊断内容" min-width="200">
          <template #default="scope">
            <el-tooltip
              :content="truncateContent(scope.row.ai_content, 50)"
              placement="top"
              :disabled="!scope.row.ai_content || scope.row.ai_content.length < 50"
              popper-class="ai-content-tooltip"
            >
              <div class="content-cell">
                {{ truncateContent(scope.row.ai_content, 50) }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="100" fixed="right">
          <template #default="scope">
            <el-button link size="small" @click="detail(scope.row)">详情</el-button>
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

  <!-- AI诊断抽屉 -->
  <ai-optimize-drawer
    :drawer="aiDrawer"
    :content="content"
    @close-ai-optimize-drawer="closeAiDrawer"
  ></ai-optimize-drawer>
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus';
  import { getAiOptimizeLogsListAsync } from '@/http/api/ai';
  import { formatListDate } from '@/utils/common';
  import AiOptimizeDrawer from '@/views/createTemplate/designer/components/AiOptimizeDrawer.vue';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';

  const emit = defineEmits(['detail']);

  const route = useRoute();

  // 加载状态
  const loading = ref<boolean>(false);

  // 分页相关
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);

  // 记录列表
  const logsList = ref<any>([]);

  // 截断长文本内容
  const truncateContent = (content: string, maxLength = 50) => {
    if (!content) return '';
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
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

  // 组件挂载时获取数据
  onMounted(() => {
    getAiOptimizeLogsList();
  });

  // 详情
  const content = ref('');
  const aiDrawer = ref<boolean>(false);

  const detail = (row: any) => {
    content.value = row.ai_content;
    aiDrawer.value = true;
    emit('detail', row);
  };

  // AI诊断确认弹窗取消
  const closeAiDrawer = () => {
    aiDrawer.value = false;
  };
</script>

<style lang="scss" scoped>
  .ai-optimize-logs-container {
    background-color: #ffffff;
    overflow: hidden;
    min-height: 400px;
    position: relative;
  }

  .ai-content-optimize-dialog-logs {
    min-height: 30vh;

    .model-price {
      display: flex;
      align-items: center;
      img {
        margin-left: 5px;
      }
    }

    .content-cell,
    .tag-cell {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: default;
      max-width: 100%;
      display: flex;
    }

    .tag-cell {
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
      max-height: 3em; /* 两行高度 */
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
