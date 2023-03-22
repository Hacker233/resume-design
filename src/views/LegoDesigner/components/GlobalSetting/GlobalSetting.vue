<template>
  <div class="global-setting-box">
    <el-form label-width="70px" label-position="left">
      <global-width-editor></global-width-editor>
      <global-height-editor></global-height-editor>
      <global-background-color-editor></global-background-color-editor>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
  import globalWidthEditor from '../../setters/globalWidthEditor.vue';
  import globalHeightEditor from '../../setters/globalHeightEditor.vue';
  import globalBackgroundColorEditor from '../../setters/globalBackgroundColorEditor.vue';
</script>
