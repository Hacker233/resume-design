<template>
  <div class="ai-template-select-box">
    <div v-loading="loading" class="ai-card-list">
      <div v-for="(item, index) in templateList" :key="index" class="card-box-item">
        <template-card
          :card-data="item"
          :select-template-id="selectTemplateId"
          @to-design="selectTemplate"
          @cancle-select="cancleSelect"
        ></template-card>
      </div>
    </div>
    <!-- 暂无数据 -->
    <div v-if="!templateList.length && !loading" class="no-data-box">
      <no-data-vue></no-data-vue>
    </div>

    <!-- 分页组件 -->
    <Pagination
      :total="total"
      :limit="limit"
      :current-page="currentPage"
      @handle-current-change="handleCurrentChange"
    ></Pagination>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import { templateListAsync } from '@/http/api/createTemplate';
  import TemplateCard from './TemplateCard.vue';
  import NoDataVue from '@/components/NoData/NoData.vue';

  const loading = ref<boolean>(true);
  // 选中的模版的id
  const selectTemplateId = ref<string>('');
  // 查询模板列表
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const templateList = ref<any>([]);

  const getTemplateList = async () => {
    loading.value = true;
    templateList.value = [];
    let params = {
      page: page.value,
      limit: limit.value,
      templateStatus: 1
    };
    const data = await templateListAsync(params);
    if (data.status === 200) {
      templateList.value = data.data.list;
      total.value = data.data.page.count;
      currentPage.value = data.data.page.currentPage;
    } else {
      ElMessage.error(data.message);
    }
    loading.value = false;
  };

  getTemplateList();

  // 选中模版
  const selectTemplate = (id: any) => {
    selectTemplateId.value = id;
    ElMessage.success('已选择模版');
  };

  // 取消选中模版
  const cancleSelect = () => {
    selectTemplateId.value = '';
    ElMessage.success('已取消选择模版');
  };

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getTemplateList();
  };

  defineExpose({
    selectTemplateId
  });
</script>

<style lang="scss" scoped>
  .ai-template-select-box {
    .ai-card-list {
      display: grid;
      min-width: 1200px;
      height: 740px;
      grid-template-columns: repeat(5, 1fr); /* 每行显示4列 */
      gap: 20px; /* 卡片之间的间距 */
    }
  }
</style>
