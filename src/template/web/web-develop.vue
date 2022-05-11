<template>
  <template v-for="(item, index) in componentData.LIST" :key="item.id">
    <!-- 标题 -->
    <resume-title
      v-if="item.model === 'RESUM_TITLE' && item.show"
      :resumeTitlt="item"
    ></resume-title>
    <!-- 基础资料 -->
    <base-info v-if="item.model === 'BASE_INFO' && item.show" :baseInfo="item"></base-info>
    <!-- 求职意向 -->
    <job-intention
      v-if="item.model === 'JOB_INTENTION' && item.show"
      :jobIntention="item"
    ></job-intention>
    <!-- 教育背景 -->
    <edu-background
      v-if="item.model === 'EDU_BACKGROUND' && item.show"
      :eduBackground="item"
    ></edu-background>
  </template>
</template>
<script setup lang="ts">
  import ResumeTitle from './components/ResumeTitle.vue'; // 简历标题
  import BaseInfo from './components/BaseInfo.vue'; // 基础资料
  import JobIntention from './components/JobIntention.vue';
  import EduBackground from './components/EduBackground.vue';
  const props = defineProps({
    componentData: {
      type: Object,
      default: (): object => {
        return {};
      }
    }
  });
</script>
<script lang="ts">
  export default {
    name: 'web-develop'
  };
</script>
