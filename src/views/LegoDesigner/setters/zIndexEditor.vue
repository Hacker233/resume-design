<template>
  <div class="z-index-editor-box">
    <el-form-item label="层级:">
      <el-button type="primary" plain @click="up">
        向上一层<el-icon class="el-icon--right"><Upload /></el-icon>
      </el-button>
      <el-button type="primary" plain @click="down">
        向下一层<el-icon class="el-icon--right"><Download /></el-icon>
      </el-button>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import useSelectWidgetItem from '../hooks/useSelectWidgetItem';

  const props = defineProps<{
    id: string;
    pageIndex: number;
  }>();

  // 选中的widgetItem
  const { widgetItem } = useSelectWidgetItem(props.id, props.pageIndex);

  // 上移
  const up = () => {
    widgetItem.css.zIndex++;
  };

  // 下移
  const down = () => {
    widgetItem.css.zIndex--;
  };
</script>
