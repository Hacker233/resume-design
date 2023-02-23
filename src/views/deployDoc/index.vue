<template>
  <div class="template-box">
    <div class="content-box">
      <!-- 分类筛选 -->
      <category-vue
        :category-list="categoryList"
        @get-article-list-by-category="getArticleListByCategory"
      ></category-vue>
      <!-- 文章列表 -->
      <template v-if="articleList.length && !isShowSkeleton">
        <article-card
          v-for="(item, index) in articleList"
          :key="index"
          :article-info="item"
        ></article-card>
      </template>
      <!-- 暂无数据 -->
      <div v-if="!articleList.length && !isShowSkeleton" class="no-data-box">
        <no-data-vue></no-data-vue>
      </div>
      <!-- 等待动画 -->
      <div v-if="isShowSkeleton" class="no-data-box">
        <common-loading></common-loading>
      </div>
      <!-- 分页组件 -->
      <Pagination
        v-if="articleList.length && articleList.length < total"
        :total="total"
        :limit="limit"
        :current-page="currentPage"
        @handle-current-change="handleCurrentChange"
      ></Pagination>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import CategoryVue from './components/Category.vue';
  import NoDataVue from '@/components/NoData/NoData.vue';
  import CommonLoading from '@/components/CommonLoading/CommonLoading.vue';
  import ArticleCard from './components/ArticleCard.vue';
  import { getArticleCategoryListAsync, userGetArticleListAsync } from '@/http/api/article';

  // 是否显示骨架
  const isShowSkeleton = ref<boolean>(true);

  // 根据分类查询文章列表
  const category = ref<string>();
  const sort = ref<string>();
  const getArticleListByCategory = async (item: any) => {
    category.value = item.category;
    sort.value = item.sort;
    page.value = 1;
    limit.value = 8;
    userGetArticleList();
  };

  // 查询分类列表
  const categoryList = ref<any>([]);
  const getCategoryList = async () => {
    const data = await getArticleCategoryListAsync();
    if (data.data.status === 200) {
      categoryList.value = data.data.data.map((item: { name: string; _id: string }) => {
        return {
          category_label: item.name,
          category_value: item._id
        };
      });
      // 添加全部选项
      categoryList.value.unshift({
        category_label: '全部',
        category_value: ''
      });
      console.log('文章分类列表');
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getCategoryList();

  // 查询文章列表
  const page = ref<number>(1);
  const limit = ref<number>(8);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const articleList = ref<any>([]);
  const userGetArticleList = async () => {
    isShowSkeleton.value = true;
    let params = {
      page: page.value,
      limit: limit.value,
      category: category.value,
      sort: sort.value
    };
    const data = await userGetArticleListAsync(params);
    if (data.data.status === 200) {
      articleList.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      isShowSkeleton.value = false;
    } else {
      ElMessage.error(data.message);
      isShowSkeleton.value = false;
    }
  };
  userGetArticleList();

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    userGetArticleList();
  };
</script>
<style lang="scss" scoped>
  .template-box {
    width: 100%;
    .content-box {
      margin: 0 auto;
      min-height: 500px;
      padding: 20px 0;
      width: 1100px;
      .no-data-box {
        margin-top: 80px;
      }
    }
  }
</style>
