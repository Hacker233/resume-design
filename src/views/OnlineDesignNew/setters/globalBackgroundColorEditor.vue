<template>
  <div class="background-color-editor-box">
    <el-form-item label="背景颜色:">
      <color-picker-custom-new-vue
        v-model="HJSchemaJsonStore.css.background"
      ></color-picker-custom-new-vue>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import ColorPickerCustomNewVue from '../components/ColorPicker/ColorPickerCustom.vue';

  const { HJSchemaJsonStore } = storeToRefs(appStore.useLegoJsonStore);
</script>
