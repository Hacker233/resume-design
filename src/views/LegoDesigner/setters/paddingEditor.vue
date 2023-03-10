<template>
  <div class="padding-editor-box">
    <el-form-item label="内边距:">
      <div class="padding-setting-box">
        <div class="left">
          <el-input-number
            v-model="widgetItem.css.padding.left"
            :min="0"
            controls-position="right"
          />
        </div>
        <div class="center">
          <el-input-number
            v-model="widgetItem.css.padding.top"
            :min="0"
            controls-position="right"
          />
          <el-input-number
            v-model="widgetItem.css.padding.bottom"
            :min="0"
            controls-position="right"
          />
        </div>
        <div class="right">
          <el-input-number
            v-model="widgetItem.css.padding.right"
            :min="0"
            controls-position="right"
          />
        </div>
      </div>
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
</script>
<style lang="scss" scoped>
  .padding-editor-box {
    .el-form-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .padding-setting-box {
        display: flex;
        justify-content: space-between;
        width: 70%;
        align-items: center;
        :deep(.el-input__wrapper) {
          padding-left: 0;
          padding-right: 25px;
        }
        .left,
        .right,
        .center {
          width: 30px;
          .el-input-number {
            width: 65px;
          }
        }
        .center {
          .el-input-number {
            margin: 12px 0;
          }
        }
      }
    }
  }
</style>
