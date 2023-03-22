<template>
  <div class="global-font-family-editor-box">
    <el-form-item label="字体选择:">
      <el-select
        v-model="HJSchemaJsonStore.css.fontFamily"
        :teleported="false"
        placeholder="请选择字体"
        @change="secondFontFamilyChange"
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
  const secondFontFamilyChange = (value: string) => {
    console.log(value);
  };
</script>
<style lang="scss" scoped>
  .global-height-editor-box {
    .unit {
      margin-left: 10px;
      color: #929292;
      letter-spacing: 2px;
    }
  }
</style>
