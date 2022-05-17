<template>
  <template v-for="(item, index) in useResumeJson.LIST" :key="item.id">
    <template v-if="item.show">
      <component :is="components[item.model]" :modelData="item"></component>
    </template>
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
  import { useResumeJsonStore } from '@/store/resume';
  import { IResumeJson } from '@/types/model';

  const useResumeJson: IResumeJson = useResumeJsonStore();

  // 注册局部组件
  const components: any = {
    RESUME_TITLE: ResumeTitle,
    BASE_INFO: BaseInfo,
    JOB_INTENTION: JobIntention,
    EDU_BACKGROUND: EduBackground,
    SKILL_SPECIALTIES: SkillSpecialties,
    CAMPUS_EXPERIENCE: CampusExperience,
    INTERNSHIP_EXPERIENCE: InternshipExperience,
    WORK_EXPERIENCE: WorkExpreience,
    PROJECT_EXPERIENCE: ProjectExperience,
    AWARDS: Awards,
    HOBBIES: Hobbies,
    SELF_EVALUATION: SelfEvaluation,
    WORKS_DISPLAY: WorksDisplay
  }
</script>
<script lang="ts">
  export default {
    name: 'web-develop'
  };
</script>
<style lang="less">
@import './style/options.less';
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
