<template>
  <div class="soft-download-box"> 软件下载 </div>
</template>
<script lang="ts" setup>
  import { getSoftListAsync, querySocategoryAllAsync } from '@/http/api/soft';

  // 获取软件列表
  const page = ref<number>(1);
  const pageSize = ref<number>(10);
  const sourceCategory = ref<string>('影视');
  const sourceList = ref<any>([]);
  const getSoftList = async () => {
    const params = {
      page: page.value,
      pageSize: pageSize.value,
      sourceCategory: sourceCategory.value
    };
    const data = await getSoftListAsync(params);
    if (data.code === '00000') {
      sourceList.value = data.data.data;
    } else {
      ElMessage.error(data.message);
    }
  };
  getSoftList();

  // 获取分类列表
  const categoryList = ref<any>([]);
  const querySocategoryAll = async () => {
    const data = await querySocategoryAllAsync();
    if (data.code === '00000') {
      categoryList.value = data.data;
    } else {
      ElMessage.error(data.message);
    }
  };
  querySocategoryAll();
</script>
