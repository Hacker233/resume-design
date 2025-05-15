<template>
  <div ref="chartRef" :style="{ width: props.width, height: props.height }"></div>
</template>

<script lang="ts" setup>
  import { onMounted, onBeforeUnmount, ref, watch, toRaw } from 'vue';
  import * as echarts from 'echarts';
  import type { EChartsOption } from 'echarts';
  import { useResizeObserver } from '@vueuse/core';

  interface Props {
    options: EChartsOption | any;
    theme?: string | object;
    width?: string;
    height?: string;
    autoResize?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    theme: 'default',
    width: '100%',
    height: '400px',
    autoResize: true
  });

  const chartRef = ref<HTMLElement>();
  let chartInstance: echarts.ECharts | null = null;

  const initChart = () => {
    if (!chartRef.value) return;
    chartInstance = echarts.init(chartRef.value, props.theme);
    chartInstance.setOption(props.options);
  };

  const resizeChart = () => {
    chartInstance?.resize();
  };

  watch(
    () => props.options,
    (newOptions) => {
      chartInstance?.setOption(toRaw(newOptions));
    },
    { deep: true }
  );

  useResizeObserver(chartRef, () => {
    if (props.autoResize) resizeChart();
  });

  onMounted(() => {
    initChart();
  });

  onBeforeUnmount(() => {
    chartInstance?.dispose();
  });
</script>

<style lang="scss" scoped>
  :deep(.echarts-tooltip) {
    box-shadow: var(--el-box-shadow-light) !important;
  }
</style>
