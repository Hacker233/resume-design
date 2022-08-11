<template>
  <div class="main-right-box">
    <Title :title="appStore.useSelectMaterialStore.cptTitle"></Title>
    <c-scrollbar trigger="hover">
      <div class="options-box">
        <component
          :is="optionsComponent[appStore.useSelectMaterialStore.cptOptionsName]"
          v-if="appStore.useSelectMaterialStore.cptOptionsName"
          :key="appStore.useSelectMaterialStore.cptKeyId"
        />
      </div>
    </c-scrollbar>
  </div>
</template>
<script lang="ts" setup>
  import Title from './Title.vue';
  import appStore from '@/store';
  import ResumeThemeVue from '@/components/ResumeTheme/ResumeTheme.vue';
  import BaseInfoOptionsVue from '../options/BaseInfoOptions.vue'; // 基础资料模块属性设置
  import ResumeTitleOptionsVue from '../options/ResumeTitleOptions.vue';
  import EduBackgroundOptionsVue from '../options/EduBackgroundOptions.vue';
  import JobIntentionOptionsVue from '../options/JobIntentionOptions.vue';
  // 定义属性组件列表
  const optionsComponent: any = {
    BASE_INFO_OPTIONS: BaseInfoOptionsVue,
    RESUME_TITLE_OPTIONS: ResumeTitleOptionsVue,
    EDU_BACKGROUND_OPTIONS: EduBackgroundOptionsVue,
    JOB_INTENTION_OPTIONS: JobIntentionOptionsVue
  };
</script>
<style lang="scss" scoped>
  .main-right-box {
    width: 355px;
    background-color: #fff;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 50px);
  }
</style>
