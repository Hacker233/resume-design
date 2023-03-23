<template>
  <div class="widget-list-box">
    <!-- 组件列表 -->
    <div v-for="(item, index) in WIDGET_CONFIG_LIST" :key="index" class="com-list-box">
      <el-collapse>
        <el-collapse-item :title="item.title" :name="item.title">
          <div
            v-for="(itemCom, itemIndex) in item.list"
            :key="itemIndex"
            draggable="true"
            class="widget-item"
            :style="{
              width: itemCom.screenShot.width,
              height: itemCom.screenShot.height,
              borderRadius: itemCom.screenShot.borderRadius
            }"
            @dragstart="dragStart($event, item, itemCom)"
            @dragend="dragEnd($event)"
            @click="addWidgetToCenter(item, itemCom)"
          >
            <img :src="getAssetsFile(itemCom.screenShot.src)" />
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { cloneDeep } from 'lodash';
  import { WIDGET_CONFIG_LIST } from '../../schema/widgetConfig';
  import { IWidget, IWidgetTab } from '../../types';
  import { getAssetsFile } from '../../utils/common';

  const emit = defineEmits(['addWidget']);

  //拖拽开始的事件
  const dragStart = (event: any, item: IWidgetTab, itemCom: IWidget) => {
    console.log('拖拽开始', itemCom);
    const widgetItem = cloneDeep(itemCom);
    widgetItem.dataSource = Object.assign(item.dataSource, itemCom.dataSource);
    event.dataTransfer.setData('widgetItem', JSON.stringify(widgetItem));
  };

  // 点击组件
  const addWidgetToCenter = (item: IWidgetTab, itemCom: IWidget) => {
    const widgetItem = cloneDeep(itemCom);
    widgetItem.dataSource = Object.assign(item.dataSource, itemCom.dataSource);
    emit('addWidget', widgetItem);
  };

  // 拖拽结束事件
  const dragEnd = (event: any) => {
    event.dataTransfer.clearData();
  };
</script>
<style lang="scss" scoped>
  .widget-list-box {
    width: 100%;
    .com-list-box {
      :deep(.el-collapse) {
        border-top: none;
        .el-collapse-item__header {
          padding: 0 15px;
        }
        .el-collapse-item__content {
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .widget-item {
          border-radius: 2px;
          // box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 1px;
          overflow: hidden;
          cursor: move;
          transition: all 0.3s;
          &:hover {
            box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 3px;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
