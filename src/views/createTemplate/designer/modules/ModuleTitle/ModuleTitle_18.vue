<template>
  <div class="module-title-18" :style="moduleTitleStyle">
    <hj-h1-1 :title="module.title" :style="moduleTitleFontStyle"></hj-h1-1>
    <!-- 新增的 div，用于实现三角形 -->
    <div class="triangle" :style="afterStyle"></div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import HjH11 from '../components/hj-h1-1.vue';
  import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';

  const props = defineProps<{
    module: IModule;
  }>();

  // 返回模块整体样式
  const moduleTitleStyle: any = useGetCustomStyle(props.module, 'moduleTitle');
  // 返回标题字体样式
  const moduleTitleFontStyle = useGetCustomStyle(props.module, 'moduleTitleFont');

  // 返回三角形样式
  const afterStyle: any = computed(() => {
    return {
      position: 'absolute',
      top: '100%', // 定位到父元素的底部
      left: '50px', // 水平偏移
      marginLeft: '-10px', // 调整居中
      width: '0',
      height: '0',
      borderWidth: '8px 5px', // 控制三角形的大小
      borderStyle: 'solid',
      borderColor: `${moduleTitleStyle.value.background} transparent transparent transparent` // 三角形颜色
    };
  });
</script>

<style scoped>
  .triangle {
    /* 基础样式 */
    position: absolute;
    pointer-events: none; /* 防止三角形干扰点击事件 */
  }
</style>
