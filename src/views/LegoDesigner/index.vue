<template>
  <c-scrollbar trigger="hover">
    <div class="lego-designer-box">
      <!-- 导航栏 -->
      <lego-nav :pages-refs="pagesRefs"></lego-nav>

      <!-- 主设计区 -->
      <div class="main-designer-box">
        <!-- 物料列表区域 -->
        <left-com-list
          @add-widget="addWidgetToCenter"
          @select-widget="selectWidget"
        ></left-com-list>
        <!-- 设计面板容器区域 -->
        <div class="designer-box">
          <!-- 画布相关设置 -->
          <designer-top-setting
            @add-size="addSize"
            @reduce-size="reduceSize"
          ></designer-top-setting>
          <div class="design-bottom-box">
            <!-- 画布区域 -->
            <div :key="refreshUuid" ref="designerRef" class="designer">
              <DraggableContainer>
                <template
                  v-for="(pages, pageIndex) in HJSchemaJsonStore.componentsTree"
                  :key="pages.id"
                >
                  <!-- 分割块 -->
                  <split-block :page-index="pageIndex"></split-block>
                  <div
                    :ref="(el) => setPagesRef(el, pageIndex)"
                    class="pages"
                    @drop="drop($event, pageIndex)"
                    @dragover.prevent
                  >
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
                        v-model:active="widgetActiveObj[item.id]"
                        :init-w="item.css.width"
                        :init-h="item.css.height"
                        :z-index="item.css.zIndex"
                        :rotate="item.css.rotate"
                        @deactivated="handleDeactivated(item.id)"
                        @activated="activatedHandle(item, pageIndex)"
                        @drag-end="dragEndHandle(item, index, pageIndex)"
                      >
                        <component
                          :is="getWidgetCom(item)"
                          class="drag-component"
                          :widget-data="item"
                        ></component>
                      </Vue3DraggableResizable>
                    </div>
                  </div>
                </template>
              </DraggableContainer>
            </div>
            <!-- 添加一页 -->
            <div class="add-page-box">
              <div class="add-page-btn" @click="addOnePage">添加一页</div>
            </div>
          </div>
        </div>
        <!-- 设置器面板区域 -->
        <right-setter :key="refreshUuid"></right-setter>
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
  </c-scrollbar>
</template>
<script lang="ts" setup>
  import LegoNav from './components/LegoNav.vue';
  import LeftComList from './components/LeftComList.vue';
  import RightSetter from './components/RightSetter.vue';
  import SplitBlock from './components/SplitBlock/SplitBlock.vue';
  import Vue3DraggableResizable from './components/draggableResizable/Vue3DraggableResizable';
  import DraggableContainer from './components/draggableResizable/DraggableContainer';
  import DesignerTopSetting from './components/DesignerTopSetting.vue/DesignerTopSetting.vue';

  import appStore from '@/store';
  import { IWidget } from './types';
  import { WIDGET_MAP } from './widgets';
  import { storeToRefs } from 'pinia';
  import { getUuid } from '@/utils/common';
  import { cloneDeep } from 'lodash';
  import { HJSchema } from './schema/index';
  import {
    getLegoUserResumeByIdAsync,
    getLegoUserTemplateByIdAndJsonIdAsync
  } from '@/http/api/lego';

  // 设计区刷新id
  const { refreshUuid } = storeToRefs(appStore.useUuidStore);
  const { setUuid } = appStore.useUuidStore;

  // 初始页面JSON
  const { HJSchemaJsonStore } = storeToRefs(appStore.useLegoJsonStore);
  const { changeHJSchemaJsonData } = appStore.useLegoJsonStore;

  // url参数
  const { id, templateId, jsonId } = useRoute().query;
  console.log('url参数', id);

  // 查询个人制作数据
  const getPersonLegoJson = async () => {
    const params = {
      id: id
    };
    const data = await getLegoUserResumeByIdAsync(params);
    if (data.data.status === 200) {
      changeHJSchemaJsonData(data.data.data.lego_json);
    } else {
      ElMessage.error(data.data.message);
    }
  };

  // 查询个人创作的模板数据
  const getLegoUserTemplateByIdAndJsonId = async () => {
    const params = {
      id: id,
      jsonId: jsonId
    };
    const data = await getLegoUserTemplateByIdAndJsonIdAsync(params);
    if (data.data.status === 200) {
      changeHJSchemaJsonData(data.data.data.lego_json);
    } else {
      ElMessage.error(data.data.message);
    }
  };

  if (templateId) {
    // 查找模板数据
  } else if (id && jsonId) {
    // 编辑模板
    getLegoUserTemplateByIdAndJsonId();
  } else if (id) {
    // 查询用户个人模板数据
    getPersonLegoJson();
  } else {
    // 新的空白页
    HJSchemaJsonStore.value.id = getUuid();
  }
  if (id) {
    // 发送请求查找
  }

  const { pushComponent } = appStore.useLegoJsonStore;
  console.log('页面初始化JSON', HJSchemaJsonStore);

  onMounted(async () => {
    window.addEventListener('mousedown', handleKeepActive); // 监听页面鼠标点击事件
    document.addEventListener('keydown', handleKeyDown); // 监听页面键盘点击事件
  });
  onBeforeUnmount(() => {
    window.removeEventListener('mousedown', handleKeepActive);
    document.removeEventListener('keydown', handleKeyDown);
  });

  // 当前页面每个组件对应的选中关系
  const { selectedWidgetId, widgetActiveObj, pageActiveIndex } = storeToRefs(
    appStore.useLegoSelectWidgetStore
  ); // 选中的组件id

  // 组件放下
  const drop = (event: any, pageIndex: number) => {
    const widgetItem: IWidget = JSON.parse(event.dataTransfer.getData('widgetItem'));
    event.preventDefault();
    addWidget(widgetItem, pageIndex, event.offsetX, event.offsetY);
  };

  // 点击左侧添加组件
  const addWidgetToCenter = (widgetItem: IWidget) => {
    addWidget(widgetItem, 0);
    // 滚动到可视区
    // selectWidget();
  };

  // 中间区域新增组件
  const addWidget = (widgetItem: IWidget, pageIndex: number, x = 0, y = 0) => {
    // 将拖动元素旋转到目标区域中
    widgetItem.css.left = x;
    widgetItem.css.top = y;
    widgetItem.id = getUuid();
    selectedWidgetId.value = widgetItem.id;
    // 取消原来选中的组件
    if (selectedWidgetId.value !== '') {
      for (const key in widgetActiveObj.value) {
        if (widgetActiveObj.value[key]) {
          widgetActiveObj.value[key] = false;
        }
      }
    }
    pageActiveIndex.value = pageIndex;
    pushComponent(widgetItem, pageIndex); // 压入组件

    // 存储组件选中状态
    widgetActiveObj.value[widgetItem.id] = true;
    activatedHandle(widgetItem, pageActiveIndex.value); // 组件从非活跃状态变为活跃状态
  };

  // 组件从活跃状态变为非活跃状态
  const handleDeactivated = (id: string) => {
    // 切换选中状态
    widgetActiveObj.value[id] = false;
  };

  // 组件从非活跃状态变为活跃状态
  const activatedHandle = (widgetItem: IWidget, pageIndex: number) => {
    selectedWidgetId.value = widgetItem.id;
    pageActiveIndex.value = pageIndex; // 当前选中组件所属页面索引
    // 切换选中状态
    widgetActiveObj.value[widgetItem.id] = true;
  };

  // 组件拖拽结束，处理组件拖入下一页的情况
  const dragEndHandle = (widgetItem: IWidget, index: number, pageIndex: number) => {
    let maxTop = HJSchemaJsonStore.value.css.height;
    let minTop = -50;
    const pages = HJSchemaJsonStore.value.componentsTree.length;
    // 只有一页，无需处理
    if (pages === 1) {
      return;
    }
    // 移入下一页
    if (widgetItem.css.top > maxTop) {
      if (pageIndex === pages - 1) {
        return; // 最后一页不处理
      }
      HJSchemaJsonStore.value.componentsTree[pageIndex].children.splice(index, 1);
      widgetItem.css.top = widgetItem.css.top - HJSchemaJsonStore.value.css.height - 50;
      HJSchemaJsonStore.value.componentsTree[pageIndex + 1].children.push(widgetItem);
      pageActiveIndex.value = pageIndex + 1;
      setUuid();
    } else if (widgetItem.css.top < minTop) {
      // 移入上一页
      if (pageIndex === 0) {
        return; // 第一页不处理
      }
      HJSchemaJsonStore.value.componentsTree[pageIndex].children.splice(index, 1);
      widgetItem.css.top = widgetItem.css.top + HJSchemaJsonStore.value.css.height + 50;
      HJSchemaJsonStore.value.componentsTree[pageIndex - 1].children.push(widgetItem);
      pageActiveIndex.value = pageIndex - 1;
      setUuid();
    } else {
      pageActiveIndex.value = pageIndex;
    }
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

  // 点击图层组件，滚动到可视区
  const selectWidget = () => {
    pagesRefs[pageActiveIndex.value].scrollIntoView({
      behavior: 'smooth'
    });
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
      // 查询是否选中组件
      let isHaveActive = false;
      for (const key in widgetActiveObj.value) {
        if (widgetActiveObj.value[key]) {
          isHaveActive = true;
        }
      }
      if (!isHaveActive) {
        selectedWidgetId.value = '';
      }
    } else {
      // 点击画布外，如果选中的索引不为空，则持续选中
      if (selectedWidgetId.value !== '') {
        widgetActiveObj.value[selectedWidgetId.value] = true;
      }
    }
  };

  // 处理页面的上下左右按键事件
  const { undo, redo } = appStore.useUndoAndRedoStore;
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
    } else if (event && event.keyCode === 46) {
      // 删除键
      event.preventDefault();
      deleteWidget();
    } else if (event.ctrlKey && event.keyCode === 90) {
      // ctrl+z
      undo();
      setUuid();
    } else if (event.ctrlKey && event.keyCode === 89) {
      // ctrl+y
      redo();
      setUuid();
    } else if (event.ctrlKey && event.keyCode === 67) {
      // ctrl + c
      if (selectedWidgetId.value) {
        contextPageIndex.value = pageActiveIndex.value;
        contextComIndex.value = HJSchemaJsonStore.value.componentsTree[
          pageActiveIndex.value
        ].children.findIndex((item: { id: string }) => item.id === selectedWidgetId.value);
        copyWidget();
      }
    }
  };
  // 组件移动
  const handleWidgetMove = (direction: string, value: number) => {
    // 判断是否选中组件
    if (selectedWidgetId.value !== '') {
      // 组件在children中的索引
      const widgetIndex = HJSchemaJsonStore.value.componentsTree[
        pageActiveIndex.value
      ].children.findIndex((item: { id: string }) => item.id === selectedWidgetId.value);
      if (direction === 'leftRight') {
        HJSchemaJsonStore.value.componentsTree[pageActiveIndex.value].children[
          widgetIndex
        ].css.left += value;
      } else {
        HJSchemaJsonStore.value.componentsTree[pageActiveIndex.value].children[
          widgetIndex
        ].css.top += value;
      }
      return;
    } else {
      return;
    }
  };

  // 删除组件
  const deleteWidget = () => {
    // 判断是否选中组件
    if (selectedWidgetId.value !== '') {
      // 组件在children中的索引
      const widgetIndex = HJSchemaJsonStore.value.componentsTree[
        pageActiveIndex.value
      ].children.findIndex((item: { id: string }) => item.id === selectedWidgetId.value);
      const pageIndex = pageActiveIndex.value;
      // 删除组件的选中状态
      delete widgetActiveObj.value[selectedWidgetId.value];
      // 取消选中
      selectedWidgetId.value = '';
      pageActiveIndex.value = -1;
      // 删除组件
      HJSchemaJsonStore.value.componentsTree[pageIndex].children.splice(widgetIndex, 1);
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
      if (
        HJSchemaJsonStore.value.componentsTree[contextPageIndex.value].children[
          contextComIndex.value
        ].css.zIndex === 0
      ) {
        ElMessage.warning('已在最底层');
        return;
      }
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
      copyWidget();
    } else if (value === 6) {
      // 删除组件的选中状态
      delete widgetActiveObj.value[selectedWidgetId.value];
      // 取消选中
      selectedWidgetId.value = '';
      pageActiveIndex.value = -1;

      // 删除组件
      HJSchemaJsonStore.value.componentsTree[contextPageIndex.value].children.splice(
        contextComIndex.value,
        1
      );
    }
  };

  // 复制当前组件
  const copyWidget = () => {
    // 复制当前组件
    const currentWidget = cloneDeep(
      HJSchemaJsonStore.value.componentsTree[contextPageIndex.value].children[contextComIndex.value]
    );

    currentWidget.css.left =
      HJSchemaJsonStore.value.componentsTree[contextPageIndex.value].children[contextComIndex.value]
        .css.left + 30;
    currentWidget.css.top =
      HJSchemaJsonStore.value.componentsTree[contextPageIndex.value].children[contextComIndex.value]
        .css.top +
      30 -
      HJSchemaJsonStore.value.css.height * contextPageIndex.value;
    addWidget(currentWidget, contextPageIndex.value, currentWidget.css.left, currentWidget.css.top);
  };

  // 放大缩小center
  const sizeCenter = ref<number>(1);
  const addSize = (number: number) => {
    sizeCenter.value = number;
  };
  const reduceSize = (number: number) => {
    sizeCenter.value = number;
  };
</script>
<style lang="scss" scoped>
  ::-webkit-scrollbar {
    display: block;
    width: 6px;
    height: 6px;
  }
  .lego-designer-box {
    height: 100vh;
    min-width: 1200px;
    .main-designer-box {
      display: flex;
      justify-content: space-between;
      .designer-box {
        flex: 1;
        overflow: auto;
        box-sizing: border-box;
        height: calc(100vh - 60px);
        min-width: 850px;
        display: flex;
        flex-direction: column;
        .design-bottom-box {
          padding: 15px;
          overflow: auto;
          flex: 1;
          .designer {
            display: grid;
            position: relative;
            margin: 0 auto;
            overflow: hidden;
            margin-bottom: 30px;
            width: v-bind('HJSchemaJsonStore.css.width + "px"');
            min-height: v-bind('HJSchemaJsonStore.css.height + "px"');
            zoom: v-bind('sizeCenter');

            .pages {
              height: v-bind('HJSchemaJsonStore.css.height + "px"');
              box-shadow: 0 2px 8px rgba(14, 19, 24, 0.07);
              border-radius: 2px;
              background: v-bind('HJSchemaJsonStore.css.background');
              background-image: v-bind('"url(" + HJSchemaJsonStore.css.backgroundImage + ")"');
              background-size: 100% 100%;
              fill-opacity: v-bind('HJSchemaJsonStore.css.opacity');
              position: relative;
              .drag-component {
                cursor: move;
              }
            }
          }
          .add-page-box {
            height: 60px;
            display: flex;
            justify-content: center;
            zoom: v-bind('sizeCenter');
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
