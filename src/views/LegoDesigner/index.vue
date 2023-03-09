<template>
  <div class="lego-designer-box">
    <!-- 导航栏 -->
    <lego-nav></lego-nav>

    <!-- 主设计区 -->
    <div class="main-designer-box">
      <!-- 物料列表区域 -->
      <left-com-list></left-com-list>
      <!-- 设计面板容器区域 -->
      <div class="designer-box">
        <c-scrollbar trigger="hover">
          <!-- 画布区域 -->
          <div ref="designerRef" class="designer">
            <DraggableContainer @drop="drop" @dragover.prevent>
              <Vue3DraggableResizable
                v-for="(item, index) in HJSchemaJson.componentsTree"
                :key="index"
                v-model:x="item.location.x"
                v-model:y="item.location.y"
                v-model:w="item.css.width"
                v-model:h="item.css.height"
                v-model:active="widgetActive[index].isActive"
                :init-w="item.css.width"
                :init-h="item.css.height"
                :z-index="item.css.zIndex"
                @deactivated="handleDeactivated(index)"
                @activated="activatedHandle(item, index)"
              >
                <component :is="getWidgetCom(item)" :widget-data="item"></component>
              </Vue3DraggableResizable>
            </DraggableContainer>
          </div>
        </c-scrollbar>
      </div>
      <!-- 设置器面板区域 -->
      <right-setter :widget-id="widgetId"></right-setter>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import LegoNav from './components/LegoNav.vue';
  import LeftComList from './components/LeftComList.vue';
  import RightSetter from './components/RightSetter.vue';
  import Vue3DraggableResizable from './components/draggableResizable/Vue3DraggableResizable';
  import DraggableContainer from './components/draggableResizable/DraggableContainer';

  import appStore from '@/store';
  import { IWidget } from './types';
  import { WIDGET_MAP } from './widgets';
  import { storeToRefs } from 'pinia';
  import { getUuid } from '@/utils/common';

  const rightSetterRef = ref<any>(null);
  onMounted(() => {
    console.log('rightSetterRef', rightSetterRef);
    window.addEventListener('mousedown', handleKeepActive);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('mousedown', handleKeepActive);
  });

  // 初始页面JSON
  const { HJSchemaJson } = storeToRefs(appStore.useLegoJsonStore);
  const { pushComponent } = appStore.useLegoJsonStore;

  // 组件是否选中列表
  const widgetActive = ref<any>([]);
  const widgetActiveIndex = ref<any>('');

  // 组件放下
  const widgetId = ref<string>(''); // 选中的组件id
  const drop = (event: any) => {
    const widgetItem: IWidget = JSON.parse(event.dataTransfer.getData('widgetItem'));
    event.preventDefault();
    // 将拖动元素旋转到目标区域中
    widgetItem.location.x = event.offsetX;
    widgetItem.location.y = event.offsetY;
    widgetItem.id = getUuid();
    widgetId.value = widgetItem.id;
    widgetActiveIndex.value = pushComponent(widgetItem);
    // 组件选中状态
    widgetActive.value.push({
      id: widgetItem.id,
      isActive: true
    });
    activatedHandle(widgetItem, widgetActiveIndex.value); // 组件从非活跃状态变为活跃状态
    console.log('目标区放下', event, event.offsetX, event.offsetY);
  };

  // 组件从活跃状态变为非活跃状态
  const handleDeactivated = (index: number) => {
    // 切换选中状态
    widgetActive.value[index].isActive = false;
  };

  // 组件从非活跃状态变为活跃状态
  const activatedHandle = (widgetItem: IWidget, index: number) => {
    widgetId.value = widgetItem.id;
    widgetActiveIndex.value = index;
    // 切换选中状态
    widgetActive.value[index].isActive = true;
    console.log('组件选中', widgetItem);
  };

  // 返回渲染组件
  const getWidgetCom = (item: IWidget) => {
    return WIDGET_MAP[item.componentName];
  };

  // 处理监听，在画布外需要保持选中状态
  const designerRef = ref<any>(null);
  const handleKeepActive = (e: any) => {
    const target = e.target || e.srcElement;
    if (designerRef.value.contains(target)) {
      // 插叙是否选中组件
      const index = widgetActive.value.findIndex(
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
        widgetActive.value[widgetActiveIndex.value].isActive = true;
      }
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
        .designer {
          display: grid;
          position: relative;
          margin: 30px auto;
          width: v-bind('HJSchemaJson.css.width');
          min-height: v-bind('HJSchemaJson.css.height');
          background: v-bind('HJSchemaJson.css.background');
        }
      }
    }
  }
</style>
