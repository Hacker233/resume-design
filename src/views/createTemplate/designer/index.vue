<template>
  <div class="create-template-box">
    <!-- 导航栏 -->
    <nav-bar></nav-bar>
    <!-- 内容区容器 -->
    <div class="content-wrapper">
      <!-- 左侧物料区 -->
      <div class="module-left">
        <module-select></module-select>
      </div>
      <!-- 中间设计区 -->
      <div class="design-center">
        <div class="center-wrapper">
          <div ref="pageWrapperRef" class="page-wrapper">
            <!-- 动态渲染的组件，添加ref -->
            <component
              :is="pageComponents[HJNewJsonStore.props.pageName]"
              ref="dynamicComponentRef"
            ></component>
            <!-- 分页线 -->
            <template v-if="lineNumber > 0">
              <div
                v-for="index in lineNumber"
                :key="index"
                class="lines"
                :style="{ top: `${1160 * index}px` }"
              >
                <span class="page-tips-one">第{{ index }}页</span>
              </div>
            </template>
          </div>
          <!-- 右侧悬浮图标 -->
          <div class="page-eidtor-box">
            <page-editor-list></page-editor-list>
          </div>
        </div>
      </div>
      <!-- 右侧属性面板区 -->
      <div class="prop-right">
        <module-config></module-config>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import NavBar from './components/NavBar.vue';
  import ModuleSelect from './components/ModuleSelect.vue';
  import ModuleConfig from './components/ModuleConfig.vue';
  import { storeToRefs } from 'pinia';
  import appStore from '@/store';
  import pageComponents from './utils/registerPages';
  import PageEditorList from './components/PageEditorList.vue';
  import { getUuid } from '@/utils/common';
  import pageSchemas from './schema/pageSchema';

  // 初始化JSON数据
  const { HJNewJsonStore, selectedModuleId, selectedPageName } = storeToRefs(
    appStore.useCreateTemplateStore
  );
  HJNewJsonStore.value = pageSchemas[selectedPageName.value];
  HJNewJsonStore.value.id = getUuid();

  // 动态组件的 ref
  const dynamicComponentRef = ref<any>(null);

  // 点击其他区域，取消模块选中
  const initClickListen = () => {
    window.addEventListener('click', dealClick);
  };

  const getTargetNode = (ele: any, target: any): boolean => {
    if (!ele || ele === document) return false;
    return ele === target ? true : getTargetNode(ele.parentNode, target);
  };

  const dealClick = (e: MouseEvent) => {
    const dynamicComponentEl = dynamicComponentRef.value?.$el || dynamicComponentRef.value;
    const bool = getTargetNode(dynamicComponentEl, e.target);
    // 如果动态组件已渲染，并且点击目标不在该组件内
    if (bool) {
      selectedModuleId.value = ''; // 取消选中
    }
  };

  // 生命周期钩子，绑定和解绑事件监听器
  onMounted(() => {
    initClickListen();
    adjustPageWrapperHeight(); // 初始话高度
  });

  onBeforeUnmount(() => {
    window.removeEventListener('click', dealClick);
  });

  // 监听高度变化，绘制分割线
  const pageWrapperRef = ref<any>(null);
  const minHeight = 1160; // 最小高度 1160px
  const lineNumber = ref<number>(0);
  // 动态调整 pageWrapperRef 的高度
  const adjustPageWrapperHeight = () => {
    const pageWrapperEl = pageWrapperRef.value;
    if (pageWrapperEl) {
      // 获取元素的当前高度
      let newHeight = pageWrapperEl.scrollHeight - 4;
      // console.log('当前 scrollHeight:', newHeight, pageWrapperEl);

      // 确保高度为 1160 的倍数
      if (newHeight < minHeight) {
        newHeight = minHeight;
      } else {
        newHeight = Math.ceil(newHeight / minHeight) * minHeight;
      }
      lineNumber.value = Math.ceil(newHeight / minHeight);
      // console.log('调整 pageWrapperRef 高度为:', newHeight, lineNumber.value);
      // 设置新的高度
      pageWrapperEl.style.height = `${newHeight}px`;
    } else {
      console.error('pageWrapperRef 为 null');
    }
  };

  watch(
    () => HJNewJsonStore.value.componentsTree,
    async (newVal) => {
      if (newVal) {
        await nextTick(() => {
          adjustPageWrapperHeight();
        });
      }
    },
    {
      deep: true
    }
  );
</script>

<style lang="scss" scoped>
  .create-template-box {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    .content-wrapper {
      width: 100%;
      flex: 1;
      display: flex;
      overflow: auto;
      .module-left {
        height: 100%;
        background-color: #fff;
        flex: 1;
        max-width: 500px;
        min-width: 300px;
      }
      .design-center {
        height: calc(100vh - 50px);
        flex: 1;
        min-width: 970px;
        position: relative;
        .center-wrapper {
          width: 100%;
          height: 100%;
          overflow: auto;
          padding: 20px 0;
          .page-eidtor-box {
            width: 60px;
            min-height: 300px;
            position: absolute;
            right: 15px;
            top: 20px;
          }
          .page-wrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: auto; /* 自动调整高度 */
            transition: height 0.3s ease; // 可选，添加过渡效果
            .lines {
              z-index: 10;
              width: 820px;
              height: 4px;
              background: #f3f3f3 url(@/assets/images/paging_bg.png) center top no-repeat;
              user-select: none;
              pointer-events: none;
              position: absolute;
              display: flex;
              align-items: center;
              .page-tips-one {
                position: absolute;
                top: -17px;
                right: 0px;
                font-size: 12px;
                background: #ff9971;
                color: #fff;
                padding: 2px 8px;
                border-radius: 8px 0 0 0;
              }
            }
          }
        }
      }
      .prop-right {
        height: 100%;
        min-width: 500px;
        background-color: #fff;
        flex: 1;
      }
    }
  }
</style>
