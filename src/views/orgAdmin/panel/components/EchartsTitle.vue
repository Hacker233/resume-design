<template>
  <div class="echarts-title-box">
    <h1>{{ title }}</h1>
    <p v-if="subtitle">{{ subtitle }}</p>
  </div>
</template>
<script setup lang="ts">
  interface Props {
    title: string; // 标题
    subtitle?: string; // 副标题，可选
  }

  withDefaults(defineProps<Props>(), {
    title: '模块标题',
    subtitle: ''
  });
</script>
<style lang="scss" scoped>
  .echarts-title-box {
    margin: 0 0 30px 0;

    h1 {
      font-size: 24px;
      background: linear-gradient(45deg, #409eff, #53c4ff);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      position: relative;
      padding-bottom: 12px;
      margin-bottom: 8px;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 40px;
        height: 3px;
        background: linear-gradient(90deg, #409eff 0%, rgba(64, 158, 255, 0.2) 100%);
      }
    }

    p {
      font-size: 14px;
      color: #909399;
      margin-top: 8px;
      line-height: 1.5;
    }
  }
</style>
