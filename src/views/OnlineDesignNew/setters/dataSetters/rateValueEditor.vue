<template>
  <div class="font-weight-editor-box">
    <el-form-item label="评级:">
      <el-select v-model="widgetItem.dataSource.rateValue" placeholder="请选择大小">
        <el-option
          v-for="(item, index) in rateValueList"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import useSelectWidgetItem from '../../hooks/useSelectWidgetItem';

  const props = defineProps<{
    id: string;
    pageIndex: number;
  }>();

  // 选中的widgetItem
  const { widgetItem } = useSelectWidgetItem(props.id, props.pageIndex);

  // 下拉选择列表
  const rateValueList = [
    {
      label: '了解',
      value: 1
    },
    {
      label: '一般',
      value: 2
    },
    {
      label: '熟悉',
      value: 3
    },
    {
      label: '掌握',
      value: 4
    },
    {
      label: '精通',
      value: 5
    }
  ];
</script>
