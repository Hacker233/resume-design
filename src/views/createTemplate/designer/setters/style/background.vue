<template>
  <div class="font-color-editor-box">
    <el-form-item label="背景颜色:">
      <color-picker-custom-vue v-model="module.css.background"></color-picker-custom-vue>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import ColorPickerCustomVue from '../../components/ColorPickerCustom.vue';
  import { useModuleWithStyle } from './useModuleWithStyle';

  const props = defineProps<{
    id: string;
    customCssProp?: string; // 有值，则代表是自定义样式属性设置
  }>();

  const { module } = useModuleWithStyle(props.id, props.customCssProp);
</script>
