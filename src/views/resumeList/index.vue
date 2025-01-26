<template>
  <div class="resume-list-box">
    <div class="content-box">
      <!-- 分类列表 -->
      <category-list ref="categoryDom" @category-change="categoryChange"></category-list>
      <!-- 模板列表 -->
      <template-list-vue
        v-if="templateList.length && !isShowSkeleton"
        :template-list="templateList"
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
<script setup lang="ts">
  import CategoryList from './components/CategoryList.vue';
  import TemplateListVue from './components/TemplateList.vue';
  import NoDataVue from '@/components/NoData/NoData.vue';
  import CommonLoading from '@/components/CommonLoading/CommonLoading.vue';
  import { templateListAsync } from '@/http/api/createTemplate';
  import { useHead } from '@vueuse/head';
  import { keywords } from '@/config/seo';
  useHead({
    title: '在线制作模版',
    meta: [
      {
        name: 'description',
        content: '提供海量、精美的在线制作简历模版'
      },
      {
        name: 'keywords',
        content: keywords
      }
    ]
  });

  // 是否显示骨架
  const isShowSkeleton = ref<boolean>(true);

  const categoryDom = ref<any>(null);

  // 查询模板列表
  const page = ref<number>(1);
  const limit = ref<number>(12);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const templateList = ref<any>([]);
  const getTemplateList = async () => {
    isShowSkeleton.value = true;
    let params = {
      page: page.value,
      limit: limit.value,
      templateStatus: 1,
      ...categoryDom.value.filterValue
    };
    const data = await templateListAsync(params);
    if (data.status === 200) {
      templateList.value = data.data.list;
      total.value = data.data.page.count;
      currentPage.value = data.data.page.currentPage;
      isShowSkeleton.value = false;
    } else {
      ElMessage.error(data.message);
      isShowSkeleton.value = false;
    }
  };

  // 分类发生变化
  const categoryChange = () => {
    page.value = 1;
    templateList.value = [];
    getTemplateList();
  };

  onMounted(() => {
    getTemplateList();
  });

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getTemplateList();
  };
</script>
<style lang="scss" scoped>
  .resume-list-box {
    width: 100%;
    .content-box {
      width: 1300px;
      margin: 0 auto;
      padding-bottom: 30px;
    }
  }
</style>
