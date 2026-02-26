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

        <el-table-column label="生成类型" width="150">
          <template #default="scope">
            <el-tooltip
              :content="scope.row?.resume_type === 'MD' ? 'Markdown简历' : '模版简历'"
              placement="top"
            >
              <el-tag
                :type="scope.row?.resume_type === 'MD' ? 'success' : 'info'"
                size="default"
                class="tag-cell"
              >
                {{ scope.row?.resume_type === 'MD' ? 'Markdown简历' : '模版简历' }}
              </el-tag>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column prop="createDate" label="生成日期" width="180">
          <template #default="scope">
            <div>
              {{ formatListDate(scope.row.createDate) }}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="ai_content" label="生成内容" min-width="200">
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
            <el-button
              v-if="scope.row?.resume_type === 'MD'"
              link
              size="small"
              @click="detail(scope.row)"
              >详情</el-button
            >
            <el-button v-else link size="small" @click="goEdit(scope.row)">去编辑</el-button>
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
  <ai-md-generate-drawer
    :drawer="aiDrawer"
    :content="content"
    @close-ai-md-generate-drawer="closeAiDrawer"
  ></ai-md-generate-drawer>
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus';
  import { getGenerateResumeDataListAsync } from '@/http/api/ai';
  import { formatListDate } from '@/utils/common';
  import AiMdGenerateDrawer from '@/views/createTemplate/designer/components/AiMdGenerateDrawer.vue';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { getUsertemplateAsync } from '@/http/api/createTemplate';
import appStore from '@/store';

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

  // 查询用户AI简历生成列表
  const getGenerateResumeDataList = async () => {
    try {
      loading.value = true;
      const params = {
        page: page.value,
        limit: limit.value,
        resumeId: route.params.id
      };
      const response = await getGenerateResumeDataListAsync(params);
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
    getGenerateResumeDataList();
  };

  const handleSizeChange = (pageSize: number) => {
    limit.value = pageSize;
    getGenerateResumeDataList();
  };

  // 组件挂载时获取数据
  onMounted(() => {
    getGenerateResumeDataList();
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

  // 前往编辑
  const router = useRouter();
  const { HJNewJsonStore, fromAiGenerate } = storeToRefs(appStore.useCreateTemplateStore);
  const goEdit = async (row: any) => {
    try {
      // 查询用户是否使用过该模版创建过简历
      const { data } = await getUsertemplateAsync(row.resume_id);
      if (data.status === 200) {
        // 使用ElMessageBox代替ElMessage.warning
        try {
          await ElMessageBox.confirm(
            '检测到您已经使用过该模板创建过简历，此操作将覆盖原有数据，请谨慎操作？',
            '提示',
            {
              confirmButtonText: '继续编辑',
              cancelButtonText: '取消',
              type: 'warning'
            }
          );
          fromAiGenerate.value = true;
          HJNewJsonStore.value = JSON.parse(row.ai_content);
          router.push({
            path: `/designResume/${row.resume_id}`
          });
        } catch (error) {
          // 用户点击了"取消"或关闭了对话框
          console.log('用户取消了编辑操作');
          return;
        }
      } else {
        fromAiGenerate.value = true;
        HJNewJsonStore.value = JSON.parse(row.ai_content);
        router.push({
          path: `/designResume/${row.resume_id}`
        });
      }
    } catch (error) {
      ElMessage.error('处理编辑请求时出错');
    }
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
