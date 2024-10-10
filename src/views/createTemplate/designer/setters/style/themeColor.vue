<template>
  <div class="font-color-editor-box">
    <el-form-item label="主题颜色:">
      <color-picker-custom-vue v-model="module.css.themeColor"></color-picker-custom-vue>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import ColorPickerCustomVue from '../../components/ColorPickerCustom.vue';
  import { useModuleWithStyle } from './useModuleWithStyle';

  const props = defineProps<{
    id?: string;
    customCssProp?: string;
  }>();

  // 选中的module
  const { module } = useModuleWithStyle(props.id, props.customCssProp);
</script>
