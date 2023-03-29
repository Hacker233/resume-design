<template>
  <div class="lego-create-box">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="我的创作" name="myCreate">
        <my-create></my-create>
      </el-tab-pane>
      <el-tab-pane label="简币记录" name="integralLog"> </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
  import MyCreate from './components/MyCreate.vue';
  const activeName = ref('myCreate');
</script>
