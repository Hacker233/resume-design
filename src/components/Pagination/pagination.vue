<template>
  <div class="pagination-box">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="limit"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts" setup>
  const emit = defineEmits(['handleCurrentChange']);
  defineProps<{
    total: number;
    limit: number;
    currentPage: number;
  }>();

  // 改变页时出发
  const handleCurrentChange = (currentPage: number) => {
    console.log('页码改变');
    emit('handleCurrentChange', currentPage);
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
