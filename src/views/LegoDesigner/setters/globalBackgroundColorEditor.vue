<template>
  <div class="background-color-editor-box">
    <el-form-item label="背景颜色:">
      <color-picker-custom-vue
        v-model="HJSchemaJsonStore.css.backgroundColor"
      ></color-picker-custom-vue>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import ColorPickerCustomVue from '../components/ColorPicker/ColorPickerCustom.vue';

  const { HJSchemaJsonStore } = storeToRefs(appStore.useLegoJsonStore);
</script>
