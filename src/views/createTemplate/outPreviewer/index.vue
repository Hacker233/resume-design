<template>
  <div ref="pageWrapperRef" class="page-wrapper">
    <!-- 动态渲染的组件，添加ref -->
    <component
      :is="pageComponents[HJNewJsonStore.props.pageName]"
      ref="dynamicComponentRef"
      :preview="true"
    ></component>
  </div>
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import pageComponents from '@/views/createTemplate/designer/utils/registerPages';
  import appStore from '@/store';
  import { getResumeDataBySerialNumberAsync } from '@/http/api/createTemplate';

  // 初始化JSON数据
  const { HJNewJsonStore, selectedModuleId } = storeToRefs(appStore.useCreateTemplateStore);

  // 根据流水号查询模板数据
  const route = useRoute();
  const getUserTemplate = async () => {
    const data = await getResumeDataBySerialNumberAsync({
      serialNumber: route.query.serialNumber
    });
    if (data.status === 200) {
      HJNewJsonStore.value = data.data.resume;
      HJNewJsonStore.value.props.title = data.data.resume.config.title;
      console.log('HJNewJsonStore.value', HJNewJsonStore.value);
    } else {
      ElMessage.error(data.message);
    }
  };
  getUserTemplate();

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
  .page-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto; /* 自动调整高度 */
    transition: height 0.3s ease; // 可选，添加过渡效果
    width: 820px;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    white-space: pre-line;
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
    }
  }
</style>
