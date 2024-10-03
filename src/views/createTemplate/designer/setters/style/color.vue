<template>
  <div class="font-color-editor-box">
    <el-form-item label="字体颜色:">
      <color-picker-custom-vue v-model="module.css.color"></color-picker-custom-vue>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import ColorPickerCustomVue from '../../components/ColorPickerCustom.vue';
  import { useGetSelectedModule } from '../../hooks/useGetSelectedModule';

  const props = defineProps<{
    id: string;
  }>();

  // 选中的module
  const module = useGetSelectedModule(props.id);
</script>
