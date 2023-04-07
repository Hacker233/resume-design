<template>
  <div class="lego-template-list-box">
    <div class="content-box">
      <!-- 最近的设计 -->
      <div class="latest-design-box">
        <latest-design
          :lego-person-list="legoPersonList"
          :card-width="cardWidth"
          :card-height="cardHeight"
          :category="category"
          @delete-person-template="deletePersonTemplate"
        ></latest-design>
        <!-- 查看更多 -->
        <div v-if="personTotal > personLimit" class="see-more-box">
          <p @click="toPersonLego"
            >查看全部
            <svg-icon icon-name="icon-chakangengduo" color="#737373" size="18px"></svg-icon>
          </p>
        </div>
      </div>
      <!-- 分类筛选 -->
      <category-vue
        :category-list="categoryList"
        @get-template-list-by-cate="getTemplateListByCategory"
      ></category-vue>
      <!-- 模板列表 -->
      <template-list-vue
        v-if="templateList.length && !isShowSkeleton"
        :template-list="templateList"
        :lego-person-list="legoPersonList"
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
    deleteLegoUserResumeAsync,
    getLegoTemplateCategoryListAsync,
    getLegoTemplateListByCategoryAsync,
    legoUserResumeListAsync
  } from '@/http/api/lego';
  import CategoryVue from './components/Category.vue';
  import NoDataVue from '@/components/NoData/NoData.vue';
  import CommonLoading from '@/components/CommonLoading/CommonLoading.vue';
  import TemplateListVue from './components/TemplateList.vue';
  import LatestDesign from './components/LatestDesign.vue';

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
      // 添加全部选项
      categoryList.value.unshift({
        category_label: '全部',
        category_value: '',
        width: 300,
        height: 400
      });
    } else {
      ElMessage.error(data.message);
    }
  };
  getLegoTemplateCategoryList();

  // 查询个人积木创作历史列表
  const legoPersonList = ref<Array<any>>([]);
  const personTotal = ref<number>(0);
  const personLimit = ref<number>(3);
  const getLegoUserResumeList = async () => {
    let params = {
      page: 1,
      limit: personLimit.value
    };
    const data = await legoUserResumeListAsync(params);
    if (data.data.status === 200) {
      legoPersonList.value = data.data.data.list;
      personTotal.value = data.data.data.page.count;
    } else {
      ElMessage.error(data.data.message);
    }
  };
  // 查询个人创作历史
  if (localStorage.getItem('token')) {
    getLegoUserResumeList();
  }

  // 卡片宽度
  const cardWidth = computed(() => {
    let width = '';
    categoryList.value.forEach((item: { category_label: string; width: string }) => {
      if (item.category_label === category.value) {
        width = item.width + 'px';
        return;
      }
    });
    return width ? width : '300px';
  });

  // 卡片高度
  const cardHeight = computed(() => {
    let height = '';
    categoryList.value.forEach((item: { category_label: string; height: string }) => {
      if (item.category_label === category.value) {
        height = item.height + 'px';
        return;
      }
    });
    return height ? height : '400px';
  });

  // 查询模板列表
  const page = ref<number>(1);
  const limit = ref<number>(12);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const templateList = ref<any>([]);
  const category = ref<string>('全部');
  const getTemplateList = async () => {
    isShowSkeleton.value = true;
    let params = {
      page: page.value,
      limit: limit.value,
      category: category.value === '全部' ? '' : category.value,
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
  getTemplateList(); // 获取模板列表

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getTemplateList();
  };

  // 跳转至个人中心积木创作菜单
  const router = useRouter();
  const toPersonLego = () => {
    router.push({
      path: '/person/legoCreate'
    });
  };

  // 删除记录
  const deletePersonTemplate = async (id: string) => {
    let params = {
      id: id
    };
    const data = await deleteLegoUserResumeAsync(params);
    if (data.data.status === 200) {
      ElMessage.success('删除成功');
      getLegoUserResumeList();
    } else {
      ElMessage.error(data.data.message);
    }
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
      .latest-design-box {
        .see-more-box {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
          p {
            cursor: pointer;
            letter-spacing: 3px;
            font-size: 14px;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            color: #737373;
            &:hover {
              color: green;
            }
          }
        }
      }
      .no-data-box {
        margin-top: 80px;
      }
    }
  }
</style>
