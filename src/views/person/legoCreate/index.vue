<template>
  <div class="lego-create-box">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="我的创作" name="myCreate">
        <my-create></my-create>
      </el-tab-pane>
      <el-tab-pane label="作品发布" name="postWork">
        <post-work></post-work>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
  import MyCreate from './components/MyCreate.vue';
  import PostWork from './components/PostWork.vue';
  const activeName = ref('myCreate');
</script>
