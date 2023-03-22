<template>
  <div class="global-setting-box">
    <el-form label-width="80px" label-position="left">
      <global-width-editor></global-width-editor>
      <global-height-editor></global-height-editor>
      <global-font-family-editor></global-font-family-editor>
      <global-background-color-editor></global-background-color-editor>
      <global-opacity-editor></global-opacity-editor>
      <global-background-img-editor></global-background-img-editor>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
  import globalWidthEditor from '../../setters/globalWidthEditor.vue';
  import globalHeightEditor from '../../setters/globalHeightEditor.vue';
  import globalFontFamilyEditor from '../../setters/globalFontFamilyEditor.vue';
  import globalBackgroundColorEditor from '../../setters/globalBackgroundColorEditor.vue';
  import globalOpacityEditor from '../../setters/globalOpacityEditor.vue';
  import globalBackgroundImgEditor from '../../setters/globalBackgroundImgEditor.vue';
</script>
