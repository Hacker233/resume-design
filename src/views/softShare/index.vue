<template>
  <div class="soft-download-box">
    <div class="soft-content-box">
      <!-- 分类筛选 -->
      <category-vue
        :category-list="categoryList"
        @get-soft-list-by-cate="getSoftListByCate"
      ></category-vue>

      <!-- 软件列表 -->
      <div v-if="sourceList.length && !isShowSkeleton" class="soft-list-box">
        <soft-card v-for="(item, index) in sourceList" :key="index" :card-data="item"></soft-card>
      </div>

      <!-- 暂无数据 -->
      <div v-if="!sourceList.length && !isShowSkeleton" class="no-data-box">
        <no-data-vue></no-data-vue>
      </div>
      <!-- 等待动画 -->
      <div v-if="isShowSkeleton" class="no-data-box">
        <common-loading></common-loading>
      </div>

      <!-- 分页组件 -->
      <Pagination
        v-if="sourceList.length && sourceList.length < total && !isShowSkeleton"
        :total="total"
        :limit="limit"
        :current-page="currentPage"
        @handle-current-change="handleCurrentChange"
      ></Pagination>
    </div>

    <!-- 回到顶部 -->
    <el-backtop :right="50" :bottom="80" />
  </div>
</template>
<script lang="ts" setup>
  import CategoryVue from './components/Category.vue';
  import SoftCard from './components/SoftCard.vue';
  import NoDataVue from '@/components/NoData/NoData.vue';
  import { getSoftCategoryListAsync, getSoftShareCardListAsync } from '@/http/api/softShare';

  // 是否显示骨架
  const isShowSkeleton = ref<boolean>(true);

  // 获取软件列表
  const page = ref<number>(1);
  const limit = ref<number>(12);
  const sourceCategory = ref<string>('');
  const sourceList = ref<any>([]);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const getSoftList = async () => {
    isShowSkeleton.value = true;
    const params = {
      page: page.value,
      limit: limit.value,
      sourceCategory: sourceCategory.value
    };
    const data = await getSoftShareCardListAsync(params);
    if (data.status === 200) {
      sourceList.value = data.data.list;
      total.value = data.data.page.count;
      currentPage.value = data.data.page.currentPage;
      isShowSkeleton.value = false;
    } else {
      ElMessage.error(data.message);
      isShowSkeleton.value = false;
    }
  };
  getSoftList();

  // 获取分类列表
  const categoryList = ref<any>([]);
  const querySocategoryAll = async () => {
    const data = await getSoftCategoryListAsync();
    if (data.status === 200) {
      categoryList.value = data.data;
      // 添加全部选项
      categoryList.value.unshift({
        socategory_icon: '',
        socategory_name: '全部',
        socategory_id: ''
      });
    } else {
      ElMessage.error(data.message);
    }
  };
  querySocategoryAll();

  // 根据分类获取软件列表
  const getSoftListByCate = async (value: string) => {
    sourceCategory.value = value;
    page.value = 1;
    getSoftList();
  };

  // 页码改变
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getSoftList();
  };
</script>
<style lang="scss" scoped>
  .soft-download-box {
    width: 100%;
    .soft-content-box {
      width: 1300px;
      min-height: 500px;
      padding: 20px 0;
      margin: 0 auto;
      .soft-list-box {
        display: flex;
        flex-wrap: wrap;
        padding: 30px 0 0 0;
      }
    }
  }
</style>
