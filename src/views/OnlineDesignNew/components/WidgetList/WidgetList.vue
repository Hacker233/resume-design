<template>
  <div class="widget-list-box">
    <!-- 组件列表 -->
    <div v-for="(item, index) in WIDGET_CONFIG_LIST" :key="index" class="com-list-box">
      <el-collapse>
        <el-collapse-item :name="item.title">
          <template #title>
            <div class="icon-box"
              ><svg-icon
                :icon-name="item.icon"
                color="#4c4948"
                size="18px"
                class-name="title-icon"
              ></svg-icon
            ></div>
            {{ item.title }}
          </template>
          <draggable
            class="dragArea"
            :sort="false"
            :list="item.list"
            :clone="cloneData"
            :group="{ name: 'components', pull: 'clone', put: false }"
            item-key="id"
          >
            <template #item="{ element }">
              <div
                class="dragable-component widget-item"
                :style="{
                  width: element.screenShot.width,
                  height: element.screenShot.height,
                  borderRadius: element.screenShot.borderRadius
                }"
              >
                <lego-design-icon
                  v-if="element.category === 'icon'"
                  :widget-data="element"
                ></lego-design-icon>
                <lego-li-list
                  v-else-if="item.category === 'li'"
                  :widget-data="element"
                ></lego-li-list>
                <image-list-vue
                  v-else-if="item.category === 'image'"
                  :widget-data="element"
                ></image-list-vue>
                <img v-else :src="getAssetsFile(element.screenShot.src)" />
              </div>
            </template>
          </draggable>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import Draggable from 'vuedraggable';
  import { cloneDeep } from 'lodash';
  import { WIDGET_CONFIG_LIST } from '../../schema/widgetConfig';
  import { IWidget, IWidgetTab } from '../../types';
  import { getAssetsFile } from '../../utils/common';
  import LegoDesignIcon from '../../widgets/icon/LegoDesignIconList.vue';
  import LegoLiList from '../../widgets/li/LegoLiList.vue';
  import ImageListVue from '../../widgets/image/ImageList.vue';
  import { useIconfontItem } from '../../widgets/icon/useIconfontItem';
  import { iconfontList } from '../../widgets/icon/iconfont';
  import { ListStyleTypeList } from '../../widgets/li/liList';
  import { useLiListItem } from '../../widgets/li/useLiListItem';
  import { useImageListItem } from '../../widgets/image/useImageListItem';
  import { imageList } from '../../widgets/image/imageList';
  import { getUuid } from '@/utils/common';

  const emit = defineEmits(['addWidget']);

  const cloneData = (data: IWidget) => {
    const cptData = cloneDeep(data);
    cptData.id = getUuid();
    console.log('cloneData', cptData);
    return cptData;
  };

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

  // 初始化列表组件
  const initLiList = () => {
    WIDGET_CONFIG_LIST.forEach((cptList) => {
      if (cptList.category === 'li') {
        ListStyleTypeList.forEach((listStyleTypeItem) =>
          cptList.list.push(useLiListItem(listStyleTypeItem))
        );
      }
    });
  };
  initLiList();

  // 初始化图片列表
  const initImgList = () => {
    WIDGET_CONFIG_LIST.forEach((cptList) => {
      if (cptList.category === 'image') {
        imageList.forEach((imgItem) => cptList.list.push(useImageListItem(imgItem)));
      }
    });
  };
  initImgList();
</script>
<style lang="scss" scoped>
  .widget-list-box {
    width: 100%;
    position: relative;
    .icon-box {
      margin-right: 10px;
      height: 100%;
      display: flex;
      align-items: center;
    }
    .com-list-box {
      :deep(.el-collapse) {
        border-top: none;
        .el-collapse-item__header {
          padding: 0 15px;
          user-select: none;
        }
        .el-collapse-item__content {
          padding: 0;
        }
        .dragArea {
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
      :deep(.dragable-component) {
        cursor: move;
        transition: all 0.3s;
        border: 1px dashed transparent;
        &:hover {
          border-color: #4dd3b2;
        }
      }
    }
  }
</style>
