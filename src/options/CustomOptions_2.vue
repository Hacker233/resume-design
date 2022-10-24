<!-- 简历标题属性配置 -->
<template>
  <el-tabs v-model="activeName" type="card" class="demo-tabs" stretch>
    <el-tab-pane label="样式设置" name="style">
      <el-form label-width="100px" label-position="left">
        <!-- 标题样式属性 -->
        <common-title-options></common-title-options>
        <!-- 公共样式属性 -->
        <common-options></common-options>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="数据配置" name="data">
      <el-form label-width="70px" label-position="left">
        <el-form-item label="标题:">
          <el-input v-model="modelItem.data.name" type="text" maxlength="15" show-word-limit />
        </el-form-item>
        <el-form-item label="一句话:">
          <comm-editor v-model="modelItem.data.abstract"></comm-editor>
          <el-switch v-model="modelItem.data.isShow.abstract" />
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
  import CommonOptions from './CommonOptions.vue';
  import CommonTitleOptions from './CommonTitleOptions.vue';
  import useDesignSelectModelItem from '@/hooks/material/useDesignSelectModelItem';
  defineOptions({ name: 'CUSTOM_OPTIONS_2' });
  // 选中的模块
  const { modelItem } = useDesignSelectModelItem();

  let activeName = ref('style');
</script>
<style lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    height: 150px;
    width: 150px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
</style>
