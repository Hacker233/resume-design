<template>
  <div class="aimodel-select">
    <!-- 添加了动态科技边框 -->
    <div class="cyber-border"></div>
    <AiModelSelect :ai-type="aiType" />
  </div>
</template>
<script setup lang="ts">
  import AiModelSelect from '@/components/AiModelSelect/AiModelSelect.vue';

  // 使用的AI用途
  const aiType = ref('generateResume');
</script>
<style lang="scss" scoped>
  .aimodel-select {
    width: 80%;
    padding: 2.5rem;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(8px);
    box-shadow: 0 0 20px rgba(143, 102, 214, 0.15), inset 0 0 15px rgba(143, 102, 214, 0.1);
    .cyber-border {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 2px solid transparent;
      border-radius: 16px;
      background: linear-gradient(45deg, #8f66d6, #5a4ff3) border-box;
      mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      mask-composite: exclude;
      animation: borderGlow 2s infinite alternate;
    }
  }
</style>
