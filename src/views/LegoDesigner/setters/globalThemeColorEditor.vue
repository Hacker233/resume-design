<template>
  <div class="background-color-editor-box">
    <el-form-item label="主题设置:">
      <color-picker-custom-new-vue
        v-model="HJSchemaJsonStore.css.themeColor"
        @change="handleChange"
      ></color-picker-custom-new-vue>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import ColorPickerCustomNewVue from '../components/ColorPicker/ColorPickerCustom.vue';

  const { HJSchemaJsonStore } = storeToRefs(appStore.useLegoJsonStore);

  // 主题色改变
  const handleChange = (item: any) => {
    console.log(item);
    for (let i = 0; i < HJSchemaJsonStore.value.componentsTree.length; i++) {
      for (let j = 0; j < HJSchemaJsonStore.value.componentsTree[i].children.length; j++) {
        if (HJSchemaJsonStore.value.componentsTree[i].children[j].css.backgroundColor) {
          HJSchemaJsonStore.value.componentsTree[i].children[j].css.backgroundColor = item;
        }
      }
    }
  };
</script>
