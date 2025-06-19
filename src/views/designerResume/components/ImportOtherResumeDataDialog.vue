<template>
  <el-dialog
    :model-value="dialogImportOtherDataVisible"
    title="导入已保存简历数据"
    width="870px"
    :show-close="true"
    :close-on-click-modal="true"
    class="import-other-resume-data-dialog"
    append-to-body
    @open="handleOpen"
    @close="cancle"
  >
    <div class="import-other-resume-data-content">
      <!-- 全局加载层 -->
      <div v-if="loading" class="global-loading-overlay">
        <div class="loading-spinner"></div>
      </div>

      <template v-if="!loading">
        <div v-if="legoCreateList.length" class="create-list-box">
          <template v-for="(item, index) in legoCreateList" :key="index">
            <resume-card :card-data="item" type="new" />
          </template>
        </div>

        <!-- 无数据页 -->
        <template v-else>
          <div class="audit-no-data-box">
            <no-data-vue width="200px" height="200px" />
          </div>
        </template>

        <!-- 分页组件 -->
        <Pagination
          v-if="total > limit"
          :limit="limit"
          :total="total"
          :current-page="currentPage"
          @handle-current-change="handleCurrentChange"
        />
      </template>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
  import NoDataVue from '@/components/NoData/NoData.vue';
  import { getMyResumeListAsync } from '@/http/api/createTemplate';
  import ResumeCard from './ResumeCard.vue';

  const emit = defineEmits(['cancle']);
  interface TDialog {
    dialogImportOtherDataVisible: boolean;
  }
  withDefaults(defineProps<TDialog>(), {
    dialogImportOtherDataVisible: false
  });

  // 取消
  const cancle = () => {
    emit('cancle');
  };

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getUserTemplateList();
  };

  // 弹窗打开回调
  const loading = ref<boolean>(false);
  const route = useRoute();
  const resumeId = ref<string>('');
  const handleOpen = async () => {
    resumeId.value = route.params.id as string;
    loading.value = true;
    await getUserTemplateList();
  };

  // 查询当前用户的其他已保存简历
  const legoCreateList = ref<Array<any>>([]);
  const page = ref<number>(1);
  const limit = ref<number>(6);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const getUserTemplateList = async () => {
    try {
      loading.value = true;
      const params = {
        page: page.value,
        limit: limit.value
      };
      const data = await getMyResumeListAsync(params);
      if (data.data.status === 200) {
        legoCreateList.value = data.data.data.list
          .filter((item: any) => resumeId.value !== item.template_id)
          .map((item: any) => ({
            ...item,
            previewUrl: item.template_cover
          }));
        total.value = data.data.data.page.count;
        currentPage.value = data.data.data.page.currentPage;

        // 添加空数据提示
        if (legoCreateList.value.length === 0) {
          ElMessage.info('没有找到可导入的简历数据');
        }
      } else {
        ElMessage.error(data.data.message);
      }
    } catch (error) {
      console.error('获取简历列表失败:', error);
      ElMessage.error('获取简历列表失败，请稍后重试');
    } finally {
      loading.value = false;
    }
  };
</script>

<style lang="scss">
  .import-other-resume-data-dialog {
    .el-dialog__body {
      max-height: 80vh;
      overflow: auto;
      position: relative;
    }

    .import-other-resume-data-content {
      display: flex;
      flex-direction: column;
      gap: 20px;
      min-height: 300px;
      position: relative;

      .global-loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #409eff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
      }

      .create-list-box {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;
        gap: 15px;

        > * {
          width: 260px;
          height: 365px;
          flex: 0 0 auto;
        }
      }

      .audit-no-data-box {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 300px;
      }
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
