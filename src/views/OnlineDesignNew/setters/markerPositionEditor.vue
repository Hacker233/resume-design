<template>
  <div class="marker-position-editor-box">
    <el-form-item label="标记对齐:">
      <div class="layout-box">
        <div
          v-for="(item, index) in textAlignList"
          :key="index"
          :class="['icon-box', { 'icon-active': item.layout === widgetItem.css.markerPosition }]"
          @click="handleSelect(item)"
        >
          <svg-icon :icon-name="item.iconfont" color="#67c23a" size="18px"></svg-icon>
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

  // 对齐方式列表
  const textAlignList = [
    {
      iconfont: 'icon-zuoduiqi',
      layout: 'inside',
      label: '左对齐'
    },
    {
      iconfont: 'icon-zuoyouduiqi',
      layout: 'outside',
      label: '两端对齐'
    }
  ];

  // 选择对齐方式
  const handleSelect = (item: { layout: string }) => {
    widgetItem.css.markerPosition = item.layout;
  };
</script>
<style lang="scss" scoped>
  .marker-position-editor-box {
    .layout-box {
      display: flex;

      .icon-box {
        height: 30px;
        width: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba($color: #ccc, $alpha: 0);
        transition: all 0.3s;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
          background-color: rgba($color: #ccc, $alpha: 0.2);
        }
        margin-right: 10px;
        cursor: pointer;
      }
      .icon-active {
        background-color: rgba($color: #ccc, $alpha: 0.2);
      }
    }
  }
</style>
