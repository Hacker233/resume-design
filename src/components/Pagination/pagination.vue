<template>
  <div class="pagination-box">
    <el-pagination
      background
      :layout="layout"
      :total="total"
      :page-size="limit"
      :page-sizes="[10, 20, 30, 40, 50, 100, 150]"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>
<script lang="ts" setup>
  const emit = defineEmits(['handleCurrentChange', 'handleSizeChange']);
  const props = defineProps<{
    total: number;
    limit: number;
    currentPage: number;
    isPageSizes?: boolean;
  }>();

  // 设置是否有每页展示数量
  let layout = ref<string>('prev, pager, next');
  if (props.isPageSizes) {
    layout.value = 'total, sizes, prev, pager, next, jumper';
  } else {
    layout.value = 'prev, pager, next';
  }

  // 改变页时出发
  const handleCurrentChange = (currentPage: number) => {
    console.log('页码改变');
    emit('handleCurrentChange', currentPage);
  };

  // 改变每页数量时触发
  const handleSizeChange = (val: number) => {
    emit('handleSizeChange', val);
  };
</script>
<style lang="scss" scoped>
  .pagination-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
  }
</style>
