<!-- 简历标题属性配置 -->
<template>
  <el-tabs v-model="activeName" type="card" class="demo-tabs" stretch>
    <el-tab-pane label="样式设置" name="style">
      <el-form label-width="100px" label-position="left">
        <el-form-item label="背景颜色:">
          <color-picker-custom-vue v-model="modelItem.style.themeColor"></color-picker-custom-vue>
        </el-form-item>
        <!-- 公共样式属性 -->
        <common-options></common-options>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="数据配置" name="data">
      <el-form label-width="100px" label-position="left">
        <el-form-item label="标题名称:">
          <el-input v-model="modelItem.data.title" type="text" maxlength="15" show-word-limit />
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
  import CommonOptions from './CommonOptions.vue';
  import useDesignSelectModelItem from '@/hooks/material/useDesignSelectModelItem';
  import ColorPickerCustomVue from '@/components/ColorPicker/ColorPickerCustom.vue';
  defineOptions({ name: 'RESUME_TITLE_OPTIONS' });
  // 选中的模块
  const { modelItem } = useDesignSelectModelItem();

  let activeName = ref('style');
</script>
