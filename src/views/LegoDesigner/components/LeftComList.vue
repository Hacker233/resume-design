<template>
  <div class="left-com-list-box">
    <div v-for="(item, index) in WIDGET_CONFIG_LIST" :key="index" class="com-list-box">
      <el-collapse>
        <el-collapse-item :title="item.title" :name="item.title">
          <div
            v-for="(itemCom, itemIndex) in item.list"
            :key="itemIndex"
            draggable="true"
            class="widget-item"
            :style="{ width: itemCom.screenShot.width, height: itemCom.screenShot.height }"
            @dragstart="dragStart($event, item, itemCom)"
            @dragend="dragEnd($event)"
          >
            <el-image :src="itemCom.screenShot.src" lazy />
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { WIDGET_CONFIG_LIST } from '../schema/widgetConfig';
  import { IWidget, IWidgetTab } from '../types';

  //拖拽开始的事件
  const dragStart = (event: any, item: IWidgetTab, itemCom: IWidget) => {
    console.log('拖拽开始', itemCom);
    const commonData = JSON.stringify(item.dataSource); // 该组件分类下公用数据源
    const itemData = JSON.stringify(itemCom);
    event.dataTransfer.setData('widgetItem', commonData, itemData);
  };

  // 拖拽结束事件
  const dragEnd = (event: any) => {
    console.log('拖拽结束');
    event.dataTransfer.clearData();
  };
</script>
<style lang="scss" scoped>
  .left-com-list-box {
    background-color: #fff;
    height: calc(100vh - 60px);
    width: 300px;
    .com-list-box {
      :deep(.el-collapse) {
        .el-collapse-item__header {
          padding: 0 15px;
        }
        .el-collapse-item__content {
          padding: 15px;
        }
        .widget-item {
          box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
          border-radius: 2px;
          cursor: move;
          transition: all 0.3s;
          background-color: green;
          &:hover {
            box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 4px;
          }
        }
      }
    }
  }
</style>
