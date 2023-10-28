<template>
  <div class="pan-share-box">
    <div class="pan-share-content-box">
      <!-- 分类筛选 -->
      <category-vue
        :category-list="categoryList"
        :tags-list="tagsList"
        @get-template-list-by-cate="getPanShareListByCategory"
      ></category-vue>
      <!-- 模板列表 -->
      <template-list-vue
        v-if="panShareList.length && !isShowSkeleton"
        :template-list="panShareList"
      ></template-list-vue>
      <!-- 暂无数据 -->
      <div v-if="!panShareList.length && !isShowSkeleton" class="no-data-box">
        <no-data-vue></no-data-vue>
      </div>
      <!-- 等待动画 -->
      <div v-if="isShowSkeleton" class="no-data-box">
        <common-loading></common-loading>
      </div>

      <!-- 分页组件 -->
      <Pagination
        v-if="panShareList.length && panShareList.length < total && !isShowSkeleton"
        :total="total"
        :limit="limit"
        :current-page="currentPage"
        @handle-current-change="handleCurrentChange"
      ></Pagination>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import {
    panShareCategroyListAsync,
    getPanShareTagsListAsync,
    getPanShareListAsync
  } from '@/http/api/panShare';
  import CategoryVue from './components/Category.vue';
  import TemplateListVue from './components/TemplateList.vue';
  import NoDataVue from '@/components/NoData/NoData.vue';
  import CommonLoading from '@/components/CommonLoading/CommonLoading.vue';

  // 根据分类获取模板列表
  const category = ref<string>();
  const sort = ref<string>();
  const tag = ref<string>();
  const getPanShareListByCategory = async (item: any) => {
    category.value = item.category;
    tag.value = item.tag;
    sort.value = item.sort;
    page.value = 1;
    limit.value = 12;
    getPanShareList();
  };

  // 查询分类列表
  const categoryList = ref<any>([]);
  const getCategoryList = async () => {
    const data = await panShareCategroyListAsync();
    if (data.status === 200) {
      categoryList.value = data.data.map((item: any) => {
        return {
          category_label: item.pan_category_name,
          category_value: item._id
        };
      });
      // 添加全部选项
      categoryList.value.unshift({
        category_label: '全部',
        category_value: ''
      });
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getCategoryList();

  // 查询标签列表
  const tagsList = ref<any>([]);
  const getPanShareTagsList = async () => {
    const data = await getPanShareTagsListAsync();
    if (data.status === 200) {
      tagsList.value = data.data;
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getPanShareTagsList();

  // 查询模板列表
  const page = ref<number>(1);
  const limit = ref<number>(12);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const panShareList = ref<any>([]);
  const isShowSkeleton = ref<boolean>(true); // 是否显示骨架
  const getPanShareList = async () => {
    isShowSkeleton.value = true;
    let params = {
      page: page.value,
      limit: limit.value,
      category: category.value,
      sort: sort.value,
      tag: tag.value
    };
    const data = await getPanShareListAsync(params);
    if (data.status === 200) {
      panShareList.value = data.data.list;
      total.value = data.data.page.count;
      currentPage.value = data.data.page.currentPage;
      isShowSkeleton.value = false;
    } else {
      ElMessage.error(data.message);
      isShowSkeleton.value = false;
    }
  };
  getPanShareList();

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getPanShareList();
  };
</script>
<style lang="scss" scoped>
  .pan-share-box {
    width: 100%;
    .pan-share-content-box {
      width: 1300px;
      min-height: 500px;
      padding: 20px 0;
      margin: 0 auto;
    }
  }
</style>
