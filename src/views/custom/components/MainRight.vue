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
        <global-style-options-vue v-else></global-style-options-vue>
      </div>
    </c-scrollbar>
  </div>
</template>
<script lang="ts" setup>
  import Title from './Title.vue';
  import appStore from '@/store';
  import GlobalStyleOptionsVue from '@/options/GlobalStyleOptions.vue';
  import BaseInfoOptionsVue from '@/options/BaseInfoOptions.vue'; // 基础资料模块属性设置
  import ResumeTitleOptionsVue from '@/options/ResumeTitleOptions.vue';
  import EduBackgroundOptionsVue from '@/options/EduBackgroundOptions.vue';
  import JobIntentionOptionsVue from '@/options/JobIntentionOptions.vue';
  import SkillSpecialtiesOptionsVue from '@/options/SkillSpecialtiesOptions.vue';
  import CampusExperienceOptionsVue from '@/options/CampusExperienceOptions.vue';
  import InternshipExperienceOptionsVue from '@/options/InternshipExperienceOptions.vue';
  import WorkExperienceOptionsVue from '@/options/WorkExperienceOptions.vue';
  import ProjectExperienceOptionsVue from '@/options/ProjectExperienceOptions.vue';
  import AwardsOptionsVue from '@/options/AwardsOptions.vue';
  import HobbiesOptionsVue from '@/options/HobbiesOptions.vue';
  import SelfEvalutionOptionsVue from '@/options/SelfEvalutionOptions.vue';
  import WorksDisplayOptionsVue from '@/options/WorksDisplayOptions.vue';
  // 定义属性组件列表
  const optionsComponent: any = {
    BASE_INFO_OPTIONS: BaseInfoOptionsVue,
    RESUME_TITLE_OPTIONS: ResumeTitleOptionsVue,
    EDU_BACKGROUND_OPTIONS: EduBackgroundOptionsVue,
    JOB_INTENTION_OPTIONS: JobIntentionOptionsVue,
    SKILL_SPECIALTIES_OPTIONS: SkillSpecialtiesOptionsVue,
    CAMPUS_EXPERIENCE_OPTIONS: CampusExperienceOptionsVue,
    INTERNSHIP_EXPERIENCE_OPTIONS: InternshipExperienceOptionsVue,
    WORK_EXPERIENCE_OPTIONS: WorkExperienceOptionsVue,
    PROJECT_EXPERIENCE_OPTIONS: ProjectExperienceOptionsVue,
    AWARDS_OPTIONS: AwardsOptionsVue,
    HOBBIES_OPTIONS: HobbiesOptionsVue,
    SELF_EVALUATION_OPTIONS: SelfEvalutionOptionsVue,
    WORKS_DISPLAY_OPTIONS: WorksDisplayOptionsVue
  };
</script>
<style lang="scss" scoped>
  @import '../../../style/options.scss';
  .main-right-box {
    width: 355px;
    background-color: #fff;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 50px);
  }
</style>
