<template>
  <div class="my-resume-new-tab-box">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="我的简历（旧）" name="myCreate">
        <my-resume-old v-if="activeName === 'myCreate'"></my-resume-old>
      </el-tab-pane>
      <el-tab-pane label="我的简历（新）" name="myResumeNew">
        <my-resume-new v-if="activeName === 'myResumeNew'"></my-resume-new>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
  import MyResumeOld from './myResumeOld/index.vue';
  import MyResumeNew from './myResumeNew/index.vue';

  const activeName = ref('myCreate');
</script>
<style lang="scss" scoped>
  .my-resume-new-tab-box {
    :deep(.el-tabs__content) {
      padding: 0;
    }
  }
</style>
