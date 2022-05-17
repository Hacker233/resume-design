<!-- 简历标题属性配置 -->
<template>
  <el-tabs v-model="activeName" type="card" class="demo-tabs" stretch>
    <el-tab-pane label="样式设置" name="style">
      <el-form label-width="100px" label-position="left">
        <el-form-item label="背景颜色:">
          <color-picker v-model:rgba="modelItem.style.backgroundColor"></color-picker>
        </el-form-item>
        <!-- 公共样式属性 -->
        <common-options></common-options>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="数据配置" name="data">
      <el-form label-width="100px" label-position="left">
        <el-form-item label="标题名称:">
          <el-input type="text" v-model="modelItem.title" maxlength="15" show-word-limit />
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { IRESUMETITLE } from '@/types/model';
  import { useResumeModelStore, useResumeJsonStore } from '@/store/resume';
  import CommonOptions from '@/components/CommonOptions/CommonOptions.vue';
  // store
  const useModel = useResumeModelStore();
  const useResumeJson = useResumeJsonStore();

  // 选中的模块
  const modelItem = reactive<IRESUMETITLE>(useResumeJson.LIST[useModel.index] as IRESUMETITLE);
  let activeName = ref('style');
</script>
<script lang="ts">
  export default {
    name: 'RESUME_TITLE'
  };
</script>
