<!-- 自我评价属性面板设置 -->
<template>
  <el-tabs v-model="activeName" type="card" class="demo-tabs" stretch>
    <el-tab-pane label="样式设置" name="style">
      <el-form label-width="100px" label-position="left">
        <!-- 公共样式属性 -->
        <common-options></common-options>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="数据配置" name="data">
      <el-form label-width="100px" label-position="left">
        <el-form-item label="标题名称:">
          <el-input type="text" v-model="modelItem.data.title" maxlength="15" show-word-limit />
        </el-form-item>
        <el-form-item label="自我评价:">
          <el-input
            type="textarea"
            v-model="modelItem.data.content"
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
  import useDesignSelectModelItem from '@/hooks/material/useDesignSelectModelItem';
  import CommonOptions from './CommonOptions.vue'; // 公共属性设置
  // 选中的模块
  const { modelItem } = useDesignSelectModelItem();
  let activeName = ref('style');
</script>
<script lang="ts">
  export default {
    name: 'SELF_EVALUATION_OPTIONS'
  };
</script>
