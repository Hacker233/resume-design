<template>
  <c-scrollbar trigger="hover">
    <div class="lego-designer-box">
      <!-- 主设计区 -->
      <div class="main-designer-box">
        <!-- 物料列表区域 -->
        <left-com-list></left-com-list>
        <!-- 设计面板容器区域 -->
        <div class="designer-box">
          <!-- 画布相关设置 -->
          <designer-top-setting
            @add-size="addSize"
            @reduce-size="reduceSize"
          ></designer-top-setting>
          <div ref="scrollContainer" class="design-bottom-box">
            <!-- 画布区域 -->
            <div :key="refreshUuid" ref="designerRef" class="designer">
              <template v-for="(page, index) in HJSchemaJsonStore.componentsTree" :key="page.id">
                <div :ref="(el) => setPagesRef(el, index)">
                  <PageComponent :component="page" />
                </div>
                <!-- 分割块 -->
                <split-block
                  v-if="index < HJSchemaJsonStore.componentsTree.length - 1"
                  :page-index="index"
                ></split-block>
              </template>
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
    </div>
  </c-scrollbar>
</template>
<script lang="ts" setup>
  import LeftComList from './components/LeftComList.vue';
  import RightSetter from './components/RightSetter.vue';
  import SplitBlock from './components/SplitBlock/SplitBlock.vue';
  import DesignerTopSetting from './components/DesignerTopSetting.vue/DesignerTopSetting.vue';
  import PageComponent from './components/designComponent/PageComponent.vue';

  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { getUuid } from '@/utils/common';
  import { cloneDeep } from 'lodash';
  import { HJSchema } from './schema/index';

  // 设计区刷新id
  const { refreshUuid } = storeToRefs(appStore.useUuidStore);

  // 初始页面JSON
  const { HJSchemaJsonStore } = storeToRefs(appStore.useOnlineDesignNewJsonStore);

  const scrollContainer = ref<HTMLElement | null>(null);
  let isDragging = false;

  const handleAutoScroll = (event: MouseEvent) => {
    if (!scrollContainer.value) return;

    const rect = scrollContainer.value.getBoundingClientRect();
    const threshold = 50; // 滚动触发区高度
    const maxScrollSpeed = 15; // 最大滚动速度
    const minScrollSpeed = 3; // 最小滚动速度

    if (isDragging) {
      if (event.clientY < rect.top + threshold) {
        // 向上滚动，速度根据距离计算
        const speed = Math.min(
          maxScrollSpeed,
          minScrollSpeed + (rect.top + threshold - event.clientY) / 10
        );
        scrollContainer.value.scrollTop -= speed;
      } else if (event.clientY > rect.bottom - threshold) {
        // 向下滚动，速度根据距离计算
        const speed = Math.min(
          maxScrollSpeed,
          minScrollSpeed + (event.clientY - rect.bottom + threshold) / 10
        );
        scrollContainer.value.scrollTop += speed;
      }
    }
  };

  const handleDragStart = () => {
    isDragging = true;
  };

  const handleDragEnd = () => {
    isDragging = false;
  };

  onMounted(() => {
    // 监听拖拽过程中的鼠标移动事件
    window.addEventListener('mousemove', handleAutoScroll);
    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('dragend', handleDragEnd);
  });

  onBeforeUnmount(() => {
    // 清除事件监听器
    window.removeEventListener('mousemove', handleAutoScroll);
    window.removeEventListener('dragstart', handleDragStart);
    window.removeEventListener('dragend', handleDragEnd);
  });

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

  // 放大缩小center
  const sizeCenter = ref<number>(1);
  const addSize = (number: number) => {
    sizeCenter.value = number;
  };
  const reduceSize = (number: number) => {
    sizeCenter.value = number;
  };

  // pages透明度
  const pagesOpacity = computed(() => {
    return `opacity(${HJSchemaJsonStore.value.css.opacity})`;
  });

  // 背景图
  const backgroundImage = computed(() => {
    return `url("${HJSchemaJsonStore.value.css.backgroundImage}")`;
  });
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
        height: 100vh;
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
              position: relative;
              &::after {
                /*使用before 选择器在被选元素的内容前面插入内容。*/
                width: 100%;
                height: 100%; /*设置为全屏背景模式*/
                background: v-bind('HJSchemaJsonStore.css.background');
                background-image: v-bind('backgroundImage');
                background-size: 100% 100%;
                position: absolute; /*图片定位*/
                top: 0;
                left: 0;
                content: '';
                z-index: -1; /*设置该标签等级，让其始终位于最上层*/
                filter: v-bind('pagesOpacity');
              }
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
