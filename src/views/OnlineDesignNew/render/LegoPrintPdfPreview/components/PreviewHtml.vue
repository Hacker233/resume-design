<!-- 渲染 -->
<template>
  <div id="lego-preview-designer" class="designer">
    <template v-for="pages in HJSchemaJsonStore.componentsTree" :key="pages.id">
      <div class="pages">
        <div v-for="item in pages.children" :key="item.id">
          <div
            class="widget-box"
            :style="{
              left: item.css.left + 'px',
              top: item.css.top + 'px',
              zIndex: item.css.zIndex,
              transform: `rotate(${item.css.rotate})`
            }"
          >
            <component
              :is="getWidgetCom(item)"
              class="drag-component"
              :widget-data="item"
            ></component>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { IWidget } from '@/views/LegoDesigner/types';
  import { storeToRefs } from 'pinia';
  import { WIDGET_MAP } from '../../../widgets';

  const { HJSchemaJsonStore } = storeToRefs(appStore.useLegoJsonStore);
  console.log('renderJSON', HJSchemaJsonStore.value);
  // 返回渲染组件
  const getWidgetCom = (item: IWidget) => {
    return WIDGET_MAP[item.componentName];
  };

  // 背景图
  const backgroundImage = computed(() => {
    return `url("${HJSchemaJsonStore.value.css.backgroundImage}")`;
  });
</script>
<style lang="scss" scoped>
  .designer {
    display: grid;
    position: relative;
    margin: 0 auto;
    overflow: hidden;
    width: v-bind('HJSchemaJsonStore.css.width + "px"');
    min-height: v-bind('HJSchemaJsonStore.css.height + "px"');
    position: relative;

    .pages {
      height: v-bind('HJSchemaJsonStore.css.height + "px"');
      box-shadow: 0 2px 8px rgba(14, 19, 24, 0.07);
      border-radius: 2px;
      background: v-bind('HJSchemaJsonStore.css.background');
      background-image: v-bind('backgroundImage');
      background-size: 100% 100%;
      fill-opacity: v-bind('HJSchemaJsonStore.css.opacity');
      position: relative;
      .widget-box {
        position: absolute;
      }
    }
  }
</style>
