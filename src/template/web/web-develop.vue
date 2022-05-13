<template>
  <template v-for="(item, index) in componentData.LIST" :key="item.id">
    <!-- 标题 -->
    <resume-title
      v-if="item.model === 'RESUME_TITLE' && item.show"
      :resumeTitle="item"
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
    <!-- 技能特长 -->
    <skill-specialties
      v-if="item.model === 'SKILL_SPECIALTIES' && item.show"
      :skillSpecialties="item"
    ></skill-specialties>
    <!-- 校园经历 -->
    <campus-experience
      v-if="item.model === 'CAMPUS_EXPERIENCE' && item.show"
      :campusExperience="item"
    ></campus-experience>
    <!-- 实习经验 -->
    <internship-experience
      v-if="item.model === 'INTERNSHIP_EXPERIENCE' && item.show"
      :internshipExperience="item"
    ></internship-experience>
    <!-- 工作经验 -->
    <work-expreience
      v-if="item.model === 'WORK_EXPERIENCE' && item.show"
      :workExperience="item"
    ></work-expreience>
    <!-- 项目经验 -->
    <project-experience
      v-if="item.model === 'PROJECT_EXPERIENCE' && item.show"
      :projectExperience="item"
    ></project-experience>
    <!-- 荣誉奖项 -->
    <awards v-if="item.model === 'AWARDS' && item.show" :awards="item"></awards>
    <!-- 兴趣爱好 -->
    <hobbies v-if="item.model === 'HOBBIES' && item.show" :hobbies="item"></hobbies>
    <!-- 自我评价 -->
    <self-evaluation
      v-if="item.model === 'SELF_EVALUATION' && item.show"
      :selfEvaluation="item"
    ></self-evaluation>
    <!-- 作品展示 -->
    <works-display
      v-if="item.model === 'WORKS_DISPLAY' && item.show"
      :worksDisplay="item"
    ></works-display>
  </template>
  <!-- 底部 -->
  <div class="model-bottom"></div>
</template>
<script setup lang="ts">
  import ResumeTitle from './components/ResumeTitle.vue'; // 简历标题
  import BaseInfo from './components/BaseInfo.vue'; // 基础资料
  import JobIntention from './components/JobIntention.vue'; // 求职意向
  import EduBackground from './components/EduBackground.vue'; // 学历背景
  import SkillSpecialties from './components/SkillSpecialties.vue'; // 技能特长
  import CampusExperience from './components/CampusExperience.vue'; // 校园经历
  import InternshipExperience from './components/InternshipExperience.vue'; // 实习经验
  import WorkExpreience from './components/WorkExperience.vue'; // 工作经验
  import ProjectExperience from './components/ProjectExperience.vue'; // 项目经验
  import Awards from './components/Awards.vue'; // 荣誉奖项
  import Hobbies from './components/Hobbies.vue'; // 兴趣爱好
  import SelfEvaluation from './components/SelfEvaluation.vue'; // 自我评价
  import WorksDisplay from './components/WorksDisplay.vue'; // 作品展示
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
<style lang="less" scoped>
  .model-bottom {
    height: 12px;
    background-color: #254665;
    padding-left: 30px;
    &::before {
      content: '';
      float: left;
      width: 200px;
      height: 12px;
      background-color: #258bb1;
      z-index: 1;
    }
  }
</style>
