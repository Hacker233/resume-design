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
          <div class="designer">
            <DraggableContainer @drop="drop" @dragover.prevent>
              <Vue3DraggableResizable> 123gfdsh </Vue3DraggableResizable>
              <Vue3DraggableResizable> Another test </Vue3DraggableResizable>
            </DraggableContainer>
          </div>
        </c-scrollbar>
      </div>
      <!-- 设置器面板区域 -->
      <right-setter></right-setter>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import LegoNav from './components/LegoNav.vue';
  import LeftComList from './components/LeftComList.vue';
  import RightSetter from './components/RightSetter.vue';
  import { HJSchema } from './schema/index';
  import { IHJSchema } from './types';

  // 初始页面JSON
  const HJSchemaJson = ref<IHJSchema>(HJSchema);

  const drop = (event: any) => {
    const widgetItem = JSON.parse(event.dataTransfer.getData('widgetItem'));
    event.preventDefault();
    // 将拖动元素旋转到目标区域中
    console.log('目标区放下', widgetItem);
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
          position: relative;
          height: 1160px;
          margin: 30px auto;
          width: v-bind('HJSchemaJson.css.width');
          min-height: v-bind('HJSchemaJson.css.height');
          background: v-bind('HJSchemaJson.css.background');
        }
      }
    }
  }
</style>
