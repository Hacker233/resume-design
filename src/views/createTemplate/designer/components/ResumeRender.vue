<template>
  <div ref="pageWrapperRef" v-loading="isLoading" class="page-wrapper">
    <div ref="componentBoxRef" class="components-wrapper">
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
          <span v-if="route.query.type !== 'create'" class="page-tips-one">第{{ index }}页</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import pageComponents from '../utils/registerPages';
  import appStore from '@/store';

  const route = useRoute();

  // 初始化JSON数据
  const { HJNewJsonStore, selectedModuleId, pageCount } = storeToRefs(
    appStore.useCreateTemplateStore
  );

  const props = defineProps({
    isLoading: {
      type: Boolean,
      default: false
    }
  });

  const isLoading = computed(() => {
    if (route.query.type === 'create') {
      return false;
    } else {
      return props.isLoading;
    }
  });

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
  const componentBoxRef = ref<any>(null);
  const minHeight = 1160; // 最小高度 1160px
  const lineNumber = ref<number>(0);
  // 动态调整 pageWrapperRef 的高度
  const adjustPageWrapperHeight = () => {
    const pageWrapperEl = componentBoxRef.value;
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
      pageCount.value = lineNumber.value;
      // console.log('调整 pageWrapperRef 高度为:', newHeight, lineNumber.value);
      // 设置新的高度
      pageWrapperRef.value.style.height = `${newHeight}px`;
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
  .page-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto; /* 自动调整高度 */
    transition: height 0.3s ease; // 可选，添加过渡效果
    width: 820px;
    min-height: 820px;
    flex-shrink: 0;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    border-radius: 4px;
    overflow: hidden;
    background-color: #fff;
    .components-wrapper {
      min-height: 1160px;
    }
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
</style>
