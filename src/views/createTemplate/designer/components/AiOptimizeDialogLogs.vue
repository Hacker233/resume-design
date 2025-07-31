<template>
  <el-dialog
    :model-value="dialogAiOptimizeVisibleLogs"
    title="AI简历诊断记录"
    width="800px"
    append-to-body
    class="custom-dialog"
    @open="handleOpen"
    @close="cancle"
  >
    <div class="ai-content-optimize-dialog-logs">
      <!-- 表格列表 -->
      <el-table class="ai-optimize-logs" :data="logsList" style="width: 100%" size="default" border>
        <el-table-column prop="ai_model" label="模型名称">
          <template #default="scope">
            <el-tag v-if="scope.row.ai_model !== 'glm-4-flash'" type="success" size="default">{{
              scope.row.ai_model
            }}</el-tag>
            <el-tag v-else type="success" size="default">免费模型</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="ai_amount" label="消耗简币">
          <template #default="scope">
            <div class="model-price">
              {{ scope.row.ai_amount
              }}<img width="24" src="@/assets/images/jianB.png" alt="简币" title="简币" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="诊断类型">
          <template #default="scope">
            <el-tag
              :type="scope.row?.resume_type === 'offline' ? 'success' : 'info'"
              size="default"
            >
              {{ scope.row?.resume_type === 'offline' ? '离线简历诊断' : '在线简历诊断' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="诊断日期">
          <template #default="scope">
            <div>
              {{ formatListDate(scope.row.createDate) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
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
  </el-dialog>

  <!-- AI诊断抽屉 -->
  <ai-optimize-drawer
    :drawer="aiDrawer"
    :content="content"
    @close-ai-optimize-drawer="closeAiDrawer"
  ></ai-optimize-drawer>
</template>

<script lang="ts" setup>
  import { ElMessage, ElNotification } from 'element-plus';
  import { getAiOptimizeLogsListAsync } from '@/http/api/ai';
  import { formatListDate } from '@/utils/common';
  import AiOptimizeDrawer from '@/views/createTemplate/designer/components/AiOptimizeDrawer.vue';

  const emit = defineEmits(['cancle', 'detail']);

  const route = useRoute();

  interface TDialog {
    dialogAiOptimizeVisibleLogs: boolean;
  }

  withDefaults(defineProps<TDialog>(), {
    dialogAiOptimizeVisibleLogs: false
  });

  // 分页相关
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);

  // 记录列表
  const logsList = ref<any>([]);

  // 获取模型列表
  const getAiOptimizeLogsList = async () => {
    try {
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
  const content = ref('');
  const aiDrawer = ref<boolean>(false);

  const detail = (row: any) => {
    console.log('row', row);
    content.value = row.ai_content;
    aiDrawer.value = true;
  };

  // AI诊断确认弹窗取消
  const closeAiDrawer = () => {
    aiDrawer.value = false;
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
    .model-price {
      display: flex;
      align-items: center;
      img {
        margin-left: 5px;
      }
    }
  }
</style>
