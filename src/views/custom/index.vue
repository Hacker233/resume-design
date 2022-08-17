<template>
  <div class="custom-resume-box">
    <!-- 导航栏 -->
    <nav-com @generate-report="generateReport"></nav-com>
    <!-- 主区 -->
    <div class="main-box">
      <!-- 左侧物料区 -->
      <main-left></main-left>
      <!-- 中间设计区 -->
      <main-center ref="mainCenterRef" :components="components"></main-center>
      <!-- 右侧属性区 -->
      <main-right></main-right>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import NavCom from './components/NavCom.vue'; // 导航栏
  import MainLeft from './components/MainLeft.vue'; // 左侧区域
  import MainCenter from './components/MainCenter.vue'; // 中间区域
  import MainRight from './components/MainRight.vue'; // 右侧区域

  import EDU_BACKGROUND_1 from '@/material/EduBackground/EduBackground1/index.vue';
  import BASE_INFO_1 from '@/material/BaseInfo/BaseInfo1/index.vue';
  import RESUME_TITLE_1 from '@/material/ResumeTitle/ResumeTitle1/index.vue';
  import JOB_INTENTION_1 from '@/material/JobIntention/JobIntention1/index.vue';
  import SKILL_SPECIALTIES_1 from '@/material/SkillSpecialties/SkillSpecialties1/index.vue';
  import CAMPUS_EXPERIENCE_1 from '@/material/CampusExperience/CampusExperience1/index.vue';
  import INTERNSHIP_EXPERIENCE_1 from '@/material/InternshipExperience/InternshipExperience1/index.vue';
  import WORK_EXPERIENCE_1 from '@/material/WorkExperience/WorkExperience1/index.vue';
  import PROJECT_EXPERIENCE_1 from '@/material/ProjectExperience/ProjectExperience1/index.vue';
  import AWARDS_1 from '@/material/Awards/Awards1/index.vue';
  import HOBBIES_1 from '@/material/Hobbies/Hobbies1/index.vue';
  import SELF_EVALUATION_1 from '@/material/SelfEvaluation/SelfEvaluation1/index.vue';
  import WORKS_DISPLAY_1 from '@/material/WorksDisplay/WorksDisplay1/index.vue';

  // 注册所有物料组件
  const components = {
    EDU_BACKGROUND_1: EDU_BACKGROUND_1,
    BASE_INFO_1: BASE_INFO_1,
    RESUME_TITLE_1: RESUME_TITLE_1,
    JOB_INTENTION_1: JOB_INTENTION_1,
    SKILL_SPECIALTIES_1: SKILL_SPECIALTIES_1,
    CAMPUS_EXPERIENCE_1: CAMPUS_EXPERIENCE_1,
    INTERNSHIP_EXPERIENCE_1: INTERNSHIP_EXPERIENCE_1,
    WORK_EXPERIENCE_1: WORK_EXPERIENCE_1,
    PROJECT_EXPERIENCE_1: PROJECT_EXPERIENCE_1,
    AWARDS_1: AWARDS_1,
    HOBBIES_1: HOBBIES_1,
    SELF_EVALUATION_1: SELF_EVALUATION_1,
    WORKS_DISPLAY_1: WORKS_DISPLAY_1
  };

  // 打印为pdf
  const mainCenterRef = ref<any>(null);
  const generateReport = () => {
    mainCenterRef.value.generateReport();
  };
</script>
<style lang="scss" scoped>
  .custom-resume-box {
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .main-box {
      flex: 1;
      display: flex;
      box-sizing: border-box;
    }
  }
</style>
