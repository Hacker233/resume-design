<template>
  <div class="lego-template-list-box"> </div>
</template>
<script lang="ts" setup>
  import {
    getLegoTemplateCategoryListAsync,
    getLegoTemplateListByCategoryAsync
  } from '@/http/api/lego';

  // 查询分类列表
  const categoryList = ref<any>([]);
  const getLegoTemplateCategoryList = async () => {
    const data = await getLegoTemplateCategoryListAsync();
    if (data.status === 200) {
      categoryList.value = data.data;
      categoryList.value.forEach((item: { name: string }) => {
        getLegoTemplateListByCategory(item.name);
      });
    } else {
      ElMessage.error(data.message);
    }
  };
  getLegoTemplateCategoryList();

  // 根据分类查询模板列表
  const legoTemplateList = ref<any>({});
  const getLegoTemplateListByCategory = async (category: string) => {
    let params = {
      category: category
    };
    const data = await getLegoTemplateListByCategoryAsync(params);
    if (data.status === 200) {
      legoTemplateList[category] = data.data.list;
    } else {
      ElMessage.error(data.data.message);
    }
  };
</script>
