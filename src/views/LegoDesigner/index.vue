<template>
  <div class="lego-designer-box">
    <!-- 导航栏 -->
    <lego-nav></lego-nav>

    <!-- 主设计区 -->
    <div class="main-designer-box">
      <!-- 物料列表区域 -->
      <left-com-list @add-widget="addWidgetToCenter"></left-com-list>
      <!-- 设计面板容器区域 -->
      <div class="designer-box">
        <c-scrollbar trigger="hover">
          <!-- 画布相关设置 -->
          <div class="designer-setting-box"></div>
          <!-- 画布区域 -->
          <div :key="refreshUuid" ref="designerRef" class="designer">
            <DraggableContainer>
              <div
                v-for="(pages, pageIndex) in HJSchemaJsonStore.componentsTree"
                :key="pages.id"
                :ref="(el) => setPagesRef(el, pageIndex)"
                class="pages"
                @drop="drop($event, pageIndex)"
                @dragover.prevent
              >
                <!-- 分割块 -->
                <split-block :page-index="pageIndex"></split-block>
                <div
                  v-for="(item, index) in pages.children"
                  :key="item.id"
                  v-contextmenu:contextmenu
                  @contextmenu.prevent="handleContextMenu(pageIndex, index)"
                >
                  <Vue3DraggableResizable
                    v-model:x="item.css.left"
                    v-model:y="item.css.top"
                    v-model:w="item.css.width"
                    v-model:h="item.css.height"
                    v-model:active="widgetActive[pageIndex][index].isActive"
                    :init-w="item.css.width"
                    :init-h="item.css.height"
                    :z-index="item.css.zIndex"
                    :rotate="item.css.rotate"
                    @deactivated="handleDeactivated(index, pageIndex)"
                    @activated="activatedHandle(item, index, pageIndex)"
                  >
                    <component :is="getWidgetCom(item)" :widget-data="item"></component>
                  </Vue3DraggableResizable>
                </div>
              </div>
            </DraggableContainer>
          </div>
          <!-- 添加一页 -->
          <div class="add-page-box">
            <div class="add-page-btn" @click="addOnePage">添加一页</div>
          </div>
        </c-scrollbar>
      </div>
      <!-- 设置器面板区域 -->
      <right-setter :page-index="pageActiveIndex" :widget-id="widgetId"></right-setter>
    </div>

    <!-- 右键菜单 -->
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="handleContextMenuItem(1)">向上一层</v-contextmenu-item>
      <v-contextmenu-item @click="handleContextMenuItem(2)">向下一层</v-contextmenu-item>
      <v-contextmenu-item @click="handleContextMenuItem(3)">置于顶层</v-contextmenu-item>
      <v-contextmenu-item @click="handleContextMenuItem(4)">置于底层</v-contextmenu-item>
      <v-contextmenu-item @click="handleContextMenuItem(5)">复制组件</v-contextmenu-item>
      <v-contextmenu-item @click="handleContextMenuItem(6)">删除组件</v-contextmenu-item>
    </v-contextmenu>
  </div>
</template>
<script lang="ts" setup>
  import LegoNav from './components/LegoNav.vue';
  import LeftComList from './components/LeftComList.vue';
  import RightSetter from './components/RightSetter.vue';
  import SplitBlock from './components/SplitBlock/SplitBlock.vue';
  import Vue3DraggableResizable from './components/draggableResizable/Vue3DraggableResizable';
  import DraggableContainer from './components/draggableResizable/DraggableContainer';

  import appStore from '@/store';
  import { IWidget } from './types';
  import { WIDGET_MAP } from './widgets';
  import { storeToRefs } from 'pinia';
  import { getUuid } from '@/utils/common';
  import { cloneDeep } from 'lodash';
  import { HJSchema } from './schema/index';

  // 设计区刷新id
  const { refreshUuid } = storeToRefs(appStore.useUuidStore);

  onMounted(async () => {
    window.addEventListener('mousedown', handleKeepActive); // 监听页面鼠标点击事件
    document.addEventListener('keydown', handleKeyDown); // 监听页面键盘点击事件
  });
  onBeforeUnmount(() => {
    window.removeEventListener('mousedown', handleKeepActive);
    document.removeEventListener('keydown', handleKeyDown);
  });

  // 初始页面JSON
  const { HJSchemaJsonStore } = storeToRefs(appStore.useLegoJsonStore);
  const { pushComponent } = appStore.useLegoJsonStore;
  console.log('页面初始化JSON', HJSchemaJsonStore);

  // 当前页面每个组件对应的选中关系
  const widgetActive = ref<any>({});
  const widgetActiveIndex = ref<any>(''); // 选中的组件的索引
  const pageActiveIndex = ref<any>(-1); // 当前选中组件对应的页码

  // 组件放下
  const widgetId = ref<string>(''); // 选中的组件id
  const drop = (event: any, pageIndex: number) => {
    const widgetItem: IWidget = JSON.parse(event.dataTransfer.getData('widgetItem'));
    event.preventDefault();
    addWidget(widgetItem, pageIndex, event.offsetX, event.offsetY);
  };

  // 点击左侧添加组件
  const addWidgetToCenter = (widgetItem: IWidget) => {
    addWidget(widgetItem, 0);
  };

  // 中间区域新增组件
  const addWidget = (widgetItem: IWidget, pageIndex: number, x = 0, y = 50) => {
    // 将拖动元素旋转到目标区域中
    widgetItem.css.left = x;
    widgetItem.css.top = 1160 * pageIndex + y;
    widgetItem.id = getUuid();
    widgetId.value = widgetItem.id;
    // 取消原来选中的组件
    if (widgetActiveIndex.value !== '') {
      for (const key in widgetActive.value) {
        widgetActive.value[key].forEach((item: { isActive: any }, index: string | number) => {
          if (item.isActive) {
            widgetActive.value[key][index].isActive = false;
          }
        });
      }
    }
    pageActiveIndex.value = pageIndex;
    widgetActiveIndex.value = pushComponent(widgetItem, pageIndex); // 当前选中组件的索引

    // 存储组件选中状态
    if (widgetActive.value[pageIndex]) {
      widgetActive.value[pageIndex].push({
        id: widgetItem.id,
        isActive: true
      });
    } else {
      widgetActive.value[pageIndex] = [
        {
          id: widgetItem.id,
          isActive: true
        }
      ];
    }
    activatedHandle(widgetItem, widgetActiveIndex.value, pageActiveIndex.value); // 组件从非活跃状态变为活跃状态
  };

  // 组件从活跃状态变为非活跃状态
  const handleDeactivated = (index: number, pageIndex: number) => {
    // 切换选中状态
    widgetActive.value[pageIndex][index].isActive = false;
  };

  // 组件从非活跃状态变为活跃状态
  const activatedHandle = (widgetItem: IWidget, index: number, pageIndex: number) => {
    widgetId.value = widgetItem.id;
    widgetActiveIndex.value = index;
    pageActiveIndex.value = pageIndex; // 当前选中组件所属页面索引
    // 切换选中状态
    widgetActive.value[pageIndex][index].isActive = true;
  };

  // 返回渲染组件
  const getWidgetCom = (item: IWidget) => {
    return WIDGET_MAP[item.componentName];
  };

  // 点击添加一页
  const addOnePage = async () => {
    const copyDate = cloneDeep(HJSchema.componentsTree[0]);
    copyDate.id = getUuid();
    copyDate.children = [];
    HJSchemaJsonStore.value.componentsTree.push(copyDate);

    // 滚动到可视区
    await nextTick();
    pagesRefs[HJSchemaJsonStore.value.componentsTree.length - 1].scrollIntoView({
      behavior: 'smooth'
    });
  };

  // 添加一页后，滚动到可视区
  let pagesRefs: { [key: number]: any } = {};
  const setPagesRef = (el: any, pageIndex: number) => {
    if (el) {
      pagesRefs[pageIndex] = el;
    }
  };

  // 点击画布外不取消组件选择状态
  const designerRef = ref<any>(null);
  const handleKeepActive = (e: any) => {
    const target = e.target || e.srcElement;
    if (pageActiveIndex.value < 0) {
      return;
    }
    // 点击画布内
    if (designerRef.value.contains(target)) {
      // 插叙是否选中组件
      const index = widgetActive.value[pageActiveIndex.value].findIndex(
        (item: { isActive: boolean }) => item.isActive === true
      );
      if (index === -1) {
        widgetActiveIndex.value = '';
        widgetId.value = '';
      } else {
        widgetActiveIndex.value = index;
      }
    } else {
      // 点击画布外，如果选中的索引不为空，则持续选中
      if (widgetActiveIndex.value !== '') {
        widgetActive.value[pageActiveIndex.value][widgetActiveIndex.value].isActive = true;
      }
    }
  };

  // 处理页面的上下左右按键事件
  const handleKeyDown = (event: any) => {
    //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
    if (event && event.keyCode === 37) {
      handleWidgetMove('leftRight', -1);
    } else if (event && event.keyCode === 39) {
      handleWidgetMove('leftRight', 1);
    } else if (event && event.keyCode === 40) {
      event.preventDefault();
      handleWidgetMove('topBottom', 1);
    } else if (event && event.keyCode === 38) {
      event.preventDefault();
      handleWidgetMove('topBottom', -1);
    }
  };
  // 组件移动
  const handleWidgetMove = (direction: string, value: number) => {
    // 判断是否选中组件
    if (widgetActiveIndex.value !== '') {
      if (direction === 'leftRight') {
        HJSchemaJsonStore.value.componentsTree[pageActiveIndex.value].children[
          widgetActiveIndex.value
        ].css.left += value;
      } else {
        HJSchemaJsonStore.value.componentsTree[pageActiveIndex.value].children[
          widgetActiveIndex.value
        ].css.top += value;
      }
      return;
    } else {
      return;
    }
  };

  // 右键菜单选中的组件页面以及索引
  const contextPageIndex = ref<any>(-1);
  const contextComIndex = ref<any>(-1);
  const handleContextMenu = (pageIndex: number, index: number) => {
    contextPageIndex.value = pageIndex;
    contextComIndex.value = index;
  };

  // 右键菜单点击事件
  const handleContextMenuItem = (value: number) => {
    if (value === 1) {
      // 向上一层
      HJSchemaJsonStore.value.componentsTree[contextPageIndex.value].children[contextComIndex.value]
        .css.zIndex++;
    } else if (value === 2) {
      // 向下一层
      HJSchemaJsonStore.value.componentsTree[contextPageIndex.value].children[contextComIndex.value]
        .css.zIndex--;
    } else if (value === 3) {
      // 置于顶层
      let indexMaxList: Array<number> = [];
      HJSchemaJsonStore.value.componentsTree.forEach((item) => {
        let temp = item.children[0].css.zIndex; // 以第一个为标准
        item.children.forEach((cItem: { css: { zIndex: number } }) => {
          if (cItem.css.zIndex > temp) {
            temp = cItem.css.zIndex;
          }
        });
        indexMaxList.push(temp);
      });
      HJSchemaJsonStore.value.componentsTree[contextPageIndex.value].children[
        contextComIndex.value
      ].css.zIndex = indexMaxList.sort()[indexMaxList.length - 1] + 1;
    } else if (value === 4) {
      // 置于底层
      HJSchemaJsonStore.value.componentsTree[contextPageIndex.value].children[
        contextComIndex.value
      ].css.zIndex = 0;
    } else if (value === 5) {
      // 复制当前组件
      const currentWidget = cloneDeep(
        HJSchemaJsonStore.value.componentsTree[contextPageIndex.value].children[
          contextComIndex.value
        ]
      );

      currentWidget.css.left =
        HJSchemaJsonStore.value.componentsTree[contextPageIndex.value].children[
          contextComIndex.value
        ].css.left + 30;
      currentWidget.css.top =
        HJSchemaJsonStore.value.componentsTree[contextPageIndex.value].children[
          contextComIndex.value
        ].css.top + 30;
      addWidget(
        currentWidget,
        contextPageIndex.value,
        currentWidget.css.left,
        currentWidget.css.top
      );
    } else if (value === 6) {
      // 取消选中
      widgetId.value = '';
      pageActiveIndex.value = -1;
      widgetActiveIndex.value = ''; // 选中的组件的索引
      // 删除组件
      HJSchemaJsonStore.value.componentsTree[contextPageIndex.value].children.splice(
        contextComIndex.value,
        1
      );
      // 删除选中状态索引数组中的元素
      widgetActive.value[contextPageIndex.value].splice(contextComIndex.value, 1);
    }
  };
</script>
<style lang="scss" scoped>
  .lego-designer-box {
    height: 100vh;
    overflow: hidden;
    .main-designer-box {
      display: flex;
      justify-content: space-between;
      .designer-box {
        flex: 1;
        box-sizing: border-box;
        height: calc(100vh - 60px);
        .designer-setting-box {
          width: 100%;
          height: 50px;
          background-color: #fff;
          border-top: 1px solid #eee;
          position: sticky;
          top: 0;
          left: 0;
          z-index: 9;
          margin-bottom: 30px;
          z-index: 10000;
        }
        .designer {
          display: grid;
          position: relative;
          margin: 0 auto;
          overflow: hidden;
          margin-bottom: 30px;
          width: v-bind('HJSchemaJsonStore.css.width');
          min-height: v-bind('HJSchemaJsonStore.css.height');
          background: v-bind('HJSchemaJsonStore.css.background');
          .pages {
            height: 1160px;
            margin-top: 50px;
            box-shadow: 0 2px 8px rgba(14, 19, 24, 0.07);
            border-radius: 2px;
          }
        }
        .add-page-box {
          height: 60px;
          display: flex;
          justify-content: center;
          .add-page-btn {
            width: 100px;
            height: 30px;
            margin-right: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            letter-spacing: 2px;
            color: #fff;
            font-size: 14px;
            background-image: -webkit-linear-gradient(to right, #2ddd9d, #1cc7cf);
            background-image: -moz-linear-gradient(to right, #2ddd9d, #1cc7cf);
            background-image: -ms-linear-gradient(to right, #2ddd9d, #1cc7cf);
            background-image: linear-gradient(to right, #2ddd9d, #1cc7cf);
            -webkit-border-radius: 50px;
            -moz-border-radius: 50px;
            border-radius: 50px;
            background-color: #2ddd9d;
            -webkit-transition: all 0.3s;
            -moz-transition: all 0.3s;
            -ms-transition: all 0.3s;
            -o-transition: all 0.3s;
            transition: all 0.3s;
            cursor: pointer;
            user-select: none;
            &:hover {
              opacity: 0.8;
            }
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .v-contextmenu {
    z-index: 10001;
    border: none;
    .v-contextmenu-inner {
      padding: 0;
      width: 100px;
      border-radius: 5px;
      overflow: hidden;
      border: none;
      .v-contextmenu-item {
        padding: 0;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 5px;
        border: none;
      }
      .v-contextmenu-item--hover {
        color: #fff;
        background-image: linear-gradient(to right, #2ddd9d, #1cc7cf);
        transition: all 0.1s;
      }
    }
  }
</style>
