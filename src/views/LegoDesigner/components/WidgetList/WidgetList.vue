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
            <!-- 图标 -->
            <lego-design-icon
              v-if="item.category === 'icon'"
              :widget-data="itemCom"
            ></lego-design-icon>
            <!-- 普通组件 -->
            <img v-else :src="getAssetsFile(itemCom.screenShot.src)" />
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
  import LegoDesignIcon from '../../widgets/icon/LegoDesignIconList.vue';
  import { useIconfontItem } from '../../widgets/icon/useIconfontItem';
  import { iconfontList } from '../../widgets/icon/iconfont';

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

  // 初始化图标列表
  const initIconfontList = () => {
    WIDGET_CONFIG_LIST.forEach((cptList) => {
      if (cptList.category === 'icon') {
        iconfontList['glyphs'].forEach((iconItem) => cptList.list.push(useIconfontItem(iconItem)));
      }
    });
  };
  initIconfontList();
</script>
<style lang="scss" scoped>
  .widget-list-box {
    width: 100%;
    position: relative;
    .com-list-box {
      :deep(.el-collapse) {
        border-top: none;
        .el-collapse-item__header {
          padding: 0 15px;
          user-select: none;
        }
        .el-collapse-item__content {
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .widget-item {
          border-radius: 2px;
          // box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 1px;
          overflow: hidden;
          cursor: move;
          transition: all 0.3s;
          margin-bottom: 20px;
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
