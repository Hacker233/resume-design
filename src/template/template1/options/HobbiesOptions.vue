<!-- 兴趣爱好属性面板设置 -->
<template>
  <el-tabs v-model="activeName" type="card" class="demo-tabs" stretch>
    <el-tab-pane label="样式设置" name="style">
      <el-form label-width="100px" label-position="left">
        <!-- 公共样式属性 -->
        <common-options></common-options>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="数据配置" name="data">
      <el-form label-width="80px" label-position="left">
        <el-form-item label="兴趣爱好:">
          <el-input
            type="textarea"
            v-model="modelItem.content"
            maxlength="500"
            show-word-limit
            :rows="5"
          />
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { IHOBBIES } from '@/interface/model';
  import appStore from '@/store';
  import CommonOptions from '@/components/CommonOptions/CommonOptions.vue'; // 公共属性设置
  import { useModelIndex } from '@/hooks/useModelIndex';
  // store
  const { resumeJsonStore } =appStore.useResumeJsonStore;

  // 选中的模块
  const index = useModelIndex(); // 选中的索引
  const modelItem = reactive<IHOBBIES>(resumeJsonStore.LIST[index] as IHOBBIES);
  let activeName = ref('style');
</script>
<script lang="ts">
  export default {
    name: 'HOBBIES'
  };
</script>
