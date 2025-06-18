<template>
  <div class="category-list-box">
    <!-- 模版风格 -->
    <div class="list-item-box">
      <span
        :class="['all-label li', { active: !filterValue.templateStyle }]"
        @click="filterValue.templateStyle = ''"
        >风格</span
      >
      <ul>
        <li
          v-for="(item, index) in categoryList"
          :key="index"
          :class="['li', { active: filterValue.templateStyle === item.value }]"
          @click="handleSelectStyle(item)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <!-- 简历用途 -->
    <div class="list-item-box">
      <span
        :class="['all-label li', { active: !filterValue.templateUse }]"
        @click="filterValue.templateUse = ''"
        >用途</span
      >
      <ul>
        <li
          v-for="(item, index) in templateUseList"
          :key="index"
          :class="['li', { active: filterValue.templateUse === item.label }]"
          @click="handleSelectUse(item)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>

    <!-- 简历行业 -->
    <div class="list-item-box">
      <span
        :class="['all-label li', { active: !filterValue.templateIndustry }]"
        @click="templateIndustryClick"
        >行业</span
      >
      <ul>
        <li
          v-for="(item, index) in templateIndustryList"
          :key="index"
          :class="['li', { active: filterValue.templateIndustry === item.label }]"
          @click="handleSelectIndustry(item)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>

    <!-- 具体职业 -->
    <div class="list-item-box">
      <span
        :class="['all-label li', { active: !filterValue.templatePost }]"
        @click="filterValue.templatePost = ''"
        >职业</span
      >
      <ul>
        <li
          v-for="(item, index) in templatePostListCP"
          :key="index"
          :class="['li', { active: filterValue.templatePost === item }]"
          @click="handleSelectTemplatePost(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { getTemplateStyleListAsync } from '@/http/api/createTemplate';
  import {
    templateUseList,
    templateIndustryList,
    templatePostList
  } from '@/dictionary/createTemplate';
  import { deleteNull } from '@/utils/common';

  const emit = defineEmits(['categoryChange']);

  const filterValue = reactive<any>({
    templateStyle: '',
    templateUse: '',
    templateIndustry: '',
    templatePost: ''
  });

  // 初始化筛选
  const route = useRoute();
  const { templateStyle, templateUse, templateIndustry, templatePost } = route.query;
  filterValue.templateStyle = templateStyle || '';
  filterValue.templateUse = templateUse;
  filterValue.templateIndustry = templateIndustry;
  filterValue.templatePost = templatePost;

  // 查询模版风格
  const categoryList = ref<any>([]);
  const getCategoryList = async () => {
    const data = await getTemplateStyleListAsync();
    if (data.status) {
      categoryList.value = data.data.map(
        (item: { category_value: string; category_label: string }) => {
          return {
            label: item.category_label,
            value: item.category_value
          };
        }
      );
    } else {
      ElMessage.error(data.message);
    }
  };
  getCategoryList();

  // 简历具体职业
  const defaultIndustryList = ref<any>([
    '前端开发',
    '广告设计',
    '内容运营',
    '产品经理',
    '新媒体运营'
  ]);
  const templatePostListCP = computed(() => {
    if (filterValue.templateIndustry) {
      const filter: any = templatePostList.find(
        (item: any) => item.title === filterValue.templateIndustry
      );
      return filter.job;
    } else {
      return defaultIndustryList.value;
    }
  });

  // 选择模版风格
  const handleSelectStyle = (item: any) => {
    filterValue.templateStyle = item.value;
  };

  // 选择简历用途
  const handleSelectUse = (item: any) => {
    filterValue.templateUse = item.label;
  };

  // 选择简历行业
  const handleSelectIndustry = (item: any) => {
    filterValue.templatePost = '';
    filterValue.templateIndustry = item.label;
  };

  // 点击行业
  const templateIndustryClick = () => {
    filterValue.templatePost = '';
    filterValue.templateIndustry = '';
  };

  // 选择职业
  const handleSelectTemplatePost = (item: any) => {
    filterValue.templatePost = item;
  };

  watch(
    () => filterValue,
    () => {
      updateRouter();
      emit('categoryChange');
    },
    { deep: true }
  );

  // 更新路由
  const router = useRouter();
  const updateRouter = () => {
    // 重置路由
    router.replace({
      path: route.path,
      query: {
        ...deleteNull(filterValue)
      }
    });
  };

  defineExpose({
    filterValue
  });
</script>
<style lang="scss" scoped>
  .category-list-box {
    margin: 20px 0;
    padding: 15px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.08);
    position: -webkit-sticky;
    position: sticky;
    top: 65px;
    z-index: 10;
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
    border-radius: 5px;
    padding: 10px;
    margin: 20px -5px 10px -5px;
    .list-item-box {
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      align-items: flex-start;

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }

      .all-label {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        width: 80px;
        font-weight: bold;
        font-size: 15px;
        color: #303133;
      }

      ul {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .li {
        list-style: none;
        padding: 0 15px;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 16px;
        transition: all 0.3s;
        background: #f5f7fa;
        user-select: none;
        margin-right: 0;
        margin-bottom: 0;
        &:hover {
          color: #409eff;
          background: #ecf5ff;
        }
      }
      .active {
        color: #fff;
        background: linear-gradient(135deg, #409eff, #337ecc);
        box-shadow: 0 2px 6px rgba(64, 158, 255, 0.3);
        border: none;
      }
    }
  }
</style>
