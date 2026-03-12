<template>
  <div class="my-resume-new">
    <div class="resume-stats">
      <div class="stat-item">
        <span class="stat-value">{{ total }}</span>
        <span class="stat-label">总简历数</span>
      </div>
    </div>
    
    <div class="create-list-container" :class="{ 'loading': isLoading }">
      <div v-if="legoCreateList.length" class="create-list-box">
        <template v-for="(item, index) in legoCreateList" :key="index">
          <resume-card
            :card-data="item"
            type="new"
            @to-design="toDesign"
            @delete="deleteUserCreate"
          >
          </resume-card>
        </template>
      </div>

      <!-- 无数据页 -->
      <template v-else-if="!isLoading">
        <div class="audit-no-data-box">
          <no-data-vue width="200px" height="200px"></no-data-vue>
          <p class="no-data-text">您还没有创建任何简历</p>
          <el-button type="primary" @click="toTemplate" class="create-resume-button">
            <svg-icon icon-name="icon-jiahao" size="16px" color="#fff" />
            创建简历
          </el-button>
        </div>
      </template>

      <!-- 加载中遮罩 -->
      <div v-if="isLoading" class="loading-overlay">
        <div class="loading-spinner"></div>
        <span class="loading-text">加载中...</span>
      </div>
    </div>

    <!-- 分页组件 -->
    <div class="pagination-container">
      <Pagination
        v-if="total > limit"
        :limit="limit"
        :total="total"
        :current-page="currentPage"
        :loading="isLoading"
        @handle-current-change="handleCurrentChange"
      ></Pagination>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import ResumeCard from '../components/ResumeCard.vue';
  import NoDataVue from '@/components/NoData/NoData.vue';
  import { deleteUserResumeAsync, getMyResumeListAsync } from '@/http/api/createTemplate';
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  
  const router = useRouter();

  // 查询个人简历列表
  const legoCreateList = ref<Array<any>>([]);
  const page = ref<number>(1);
  const limit = ref<number>(6);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const isLoading = ref<boolean>(true);
  const getUserTemplateList = async () => {
    let params = {
      page: page.value,
      limit: limit.value
    };
    const data = await getMyResumeListAsync(params);
    if (data.data.status === 200) {
      legoCreateList.value = data.data.data.list;
      legoCreateList.value.map((item: any) => {
        item.previewUrl = item.template_cover;
      });
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      isLoading.value = false;
    } else {
      isLoading.value = false;
      ElMessage.error(data.data.message);
    }
  };
  getUserTemplateList();

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    isLoading.value = true;
    getUserTemplateList();
  };

  // 点击删除创作
  const deleteUserCreate = async (id: string) => {
    let params = {
      id: id
    };
    const data = await deleteUserResumeAsync(params);
    if (data.data.status === 200) {
      ElMessage.success('删除成功');
      isLoading.value = true;
      getUserTemplateList();
    } else {
      ElMessage.error(data.data.message);
    }
  };

  // 去设计
  const toDesign = () => {};

  // 去模板页面
  const toTemplate = () => {
    router.push('/template');
  };
</script>
<style lang="scss" scoped>
  .my-resume-new {
    .resume-stats {
      display: flex;
      gap: 20px;
      margin-bottom: 30px;
      
      .stat-item {
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        border: 1px solid #f0f0f0;
        flex: 1;
        text-align: center;
        transition: all 0.3s ease;
        
        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }
        
        .stat-value {
          display: block;
          font-size: 28px;
          font-weight: 700;
          color: #667eea;
          margin-bottom: 8px;
        }
        
        .stat-label {
          font-size: 14px;
          color: #666;
        }
      }
    }
    
    .create-list-container {
      position: relative;
      min-height: 400px;
      transition: opacity 0.3s ease;
      
      &.loading {
        opacity: 0.7;
      }
      
      .create-list-box {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        transition: all 0.3s ease;
      }
      
      .loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.9);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 10;
        
        .loading-spinner {
          width: 48px;
          height: 48px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .loading-text {
          font-size: 16px;
          color: #666;
          font-weight: 500;
        }
      }
      
      .audit-no-data-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 60px 0;
        
        .no-data-text {
          margin-top: 16px;
          margin-bottom: 24px;
          font-size: 16px;
          color: #666;
          font-weight: 500;
        }
        
        .create-resume-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          font-weight: 600;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          
          &:hover {
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          }
        }
      }
    }
    
    .pagination-container {
      margin-top: 30px;
      display: flex;
      justify-content: center;
    }
  }

  @media (max-width: 1200px) {
    .my-resume-new {
      .create-list-container {
        .create-list-box {
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .my-resume-new {
      .resume-stats {
        flex-direction: column;
        gap: 12px;
        
        .stat-item {
          padding: 16px;
          
          .stat-value {
            font-size: 24px;
          }
        }
      }
      
      .create-list-container {
        padding: 20px;
        
        .create-list-box {
          gap: 16px;
        }
        
        .audit-no-data-box {
          padding: 40px 0;
        }
      }
      
      .pagination-container {
        margin-top: 20px;
      }
    }
  }
</style>
