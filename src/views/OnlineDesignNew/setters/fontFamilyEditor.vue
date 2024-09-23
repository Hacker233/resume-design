<template>
  <div class="font-family-editor-box">
    <el-form-item label="字体选择:">
      <el-select
        v-model="widgetItem.css.fontFamily"
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
  import { useFontFamilyList } from '../hooks/useFontFamlyList';
  import useSelectWidgetItem from '../hooks/useSelectWidgetItem';

  const props = defineProps<{
    id: string;
  }>();

  // 选中的widgetItem
  const { widgetItem } = useSelectWidgetItem(props.id);

  // 字体列表
  const fontFamilyList = useFontFamilyList();

  // 字体变化
  const secondFontFamilyChange = (value: string) => {
    console.log(value);
  };
</script>
