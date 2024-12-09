<!-- 根据简历用途选择模版 -->
<template>
  <div class="select-template-by-use-box">
    <introduce-title-vue
      title="选择简历用途"
      subtitle="根据简历实际用途来挑选模版，社招、校招等简历模版一应俱全"
      title-color="#000"
      subtitle-color="#7f8b96"
    ></introduce-title-vue>
    <resume-use-card></resume-use-card>
  </div>
</template>
<script lang="ts" setup>
  import IntroduceTitleVue from './IntroduceTitle.vue';
  import ResumeUseCard from '@/components/ResumeUseCard/ResumeUseCard.vue';
</script>
<style lang="scss" scoped>
  .select-template-by-use-box {
    background-image: linear-gradient(-225deg, #fffeff 0%, #d7fffe 100%);
    padding-bottom: 10vh;
  }
</style>
