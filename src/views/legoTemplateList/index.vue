<template>
  <div class="lego-template-list-box">
    <div class="content-box">
      <!-- 分类筛选 -->
      <category-vue
        :category-list="categoryList"
        :default-current="defaultCurrent"
        @get-template-list-by-cate="getTemplateListByCategory"
      ></category-vue>
      <!-- 模板列表 -->
      <template-list-vue
        v-if="templateList.length && !isShowSkeleton"
        :template-list="templateList"
        :category="category"
        :category-list="categoryList"
      ></template-list-vue>
      <!-- 暂无数据 -->
      <div v-if="!templateList.length && !isShowSkeleton" class="no-data-box">
        <no-data-vue></no-data-vue>
      </div>
      <!-- 等待动画 -->
      <div v-if="isShowSkeleton" class="no-data-box">
        <common-loading></common-loading>
      </div>
      <!-- 分页组件 -->
      <Pagination
        v-if="templateList.length && templateList.length < total"
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
    getLegoTemplateCategoryListAsync,
    getLegoTemplateListByCategoryAsync
  } from '@/http/api/lego';
  import CategoryVue from './components/Category.vue';
  import NoDataVue from '@/components/NoData/NoData.vue';
  import CommonLoading from '@/components/CommonLoading/CommonLoading.vue';
  import TemplateListVue from './components/TemplateList.vue';

  // 是否显示骨架
  const isShowSkeleton = ref<boolean>(true);

  // 根据分类获取模板列表
  const sort = ref<string>();
  const getTemplateListByCategory = async (item: any) => {
    category.value = item.category;
    sort.value = item.sort;
    page.value = 1;
    limit.value = 12;
    getTemplateList();
  };

  // 查询分类列表
  const categoryList = ref<any>([]);
  const defaultCurrent = ref<string>('');
  const getLegoTemplateCategoryList = async () => {
    const data = await getLegoTemplateCategoryListAsync();
    if (data.status === 200) {
      categoryList.value = data.data.map(
        (item: { name: any; _id: any; width: any; height: any }) => {
          return {
            category_label: item.name,
            category_value: item._id,
            width: item.width,
            height: item.height
          };
        }
      );
      category.value = categoryList.value[0].category_label;
      defaultCurrent.value = categoryList.value[0].category_label;
      getTemplateList();
    } else {
      ElMessage.error(data.message);
    }
  };
  getLegoTemplateCategoryList();

  // 查询模板列表
  const page = ref<number>(1);
  const limit = ref<number>(12);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const templateList = ref<any>([]);
  const category = ref<string>('');
  const getTemplateList = async () => {
    isShowSkeleton.value = true;
    let params = {
      page: page.value,
      limit: limit.value,
      category: category.value,
      sort: sort.value
    };
    const data = await getLegoTemplateListByCategoryAsync(params);
    if (data.status === 200) {
      templateList.value = data.data.list.map((item: any) => {
        categoryList.value.forEach(
          (categoryItem: { category_label: any; width: string; height: string }) => {
            if (categoryItem.category_label === item.category) {
              item.width = categoryItem.width + 'px';
              item.height = categoryItem.height + 'px';
            }
          }
        );
        return item;
      });
      console.log('templateList', templateList.value);
      total.value = data.data.page.count;
      currentPage.value = data.data.page.currentPage;
      isShowSkeleton.value = false;
    } else {
      ElMessage.error(data.message);
      isShowSkeleton.value = false;
    }
  };

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getTemplateList();
  };
</script>
<style lang="scss" scoped>
  .lego-template-list-box {
    width: 100%;
    .content-box {
      margin: 0 auto;
      min-height: 500px;
      padding: 20px 0;
      width: 1300px;
      .no-data-box {
        margin-top: 80px;
      }
    }
  }
</style>
