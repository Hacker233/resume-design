<template>
  <div class="global-font-family-editor-box">
    <el-form-item label="字体选择:">
      <el-select
        v-model="HJSchemaJsonStore.css.fontFamily"
        :teleported="false"
        placeholder="请选择字体"
        @change="selectFontFamilyChange"
      >
        <el-option
          v-for="(item, index) in fontFamilyList"
          :key="index"
          :label="item"
          :value="item"
          :style="{ fontFamily: item }"
        />
      </el-select>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { useFontFamilyList } from '../hooks/useFontFamlyList';

  const { HJSchemaJsonStore } = storeToRefs(appStore.useLegoJsonStore);

  // 字体列表
  const fontFamilyList = useFontFamilyList();

  // 字体变化
  const selectFontFamilyChange = (val: string) => {
    HJSchemaJsonStore.value.componentsTree.forEach((pageItem, pageIndex) => {
      for (let i = 0; i < pageItem.children.length; i++) {
        if (pageItem.children[i].css['fontFamily']) {
          HJSchemaJsonStore.value.componentsTree[pageIndex].children[i].css.fontFamily = val;
        }
      }
    });
  };
</script>
