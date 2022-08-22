<template>
  <div ref="tmp3ContentHeightRef" class="template3-box">
    <!-- 简历模块 -->
    <template v-for="(item, index) in resumeJsonNewStore.COMPONENTS" :key="index">
      <model-box-vue v-if="!isTitleAndBaseInfo(item)" :item="item" :components="components">
      </model-box-vue>
      <div v-else class="model-box-wraper">
        <model-box-vue :item="item" :components="components" class="model-other-class">
        </model-box-vue>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import BaseInfoVue from './components/BaseInfo.vue';
  import JobIntentionVue from './components/JobIntention.vue';
  import EduBackgroundComVue from './components/EduBackground.vue';
  import SkillSpecialtiesVue from './components/SkillSpecialties.vue';
  import CampusExperienceVue from './components/CampusExperience.vue';
  import InternshipExperienceVue from './components/InternshipExperience.vue';
  import WorkExperienceComVue from './components/WorkExperienceCom.vue';
  import ProjectExperienceVue from './components/ProjectExperience.vue';
  import SelfEvaluationVue from './components/SelfEvaluation.vue';
  import WorksDisplayVue from './components/WorksDisplay.vue';
  import HobbiesVue from './components/Hobbies.vue';
  import AwardsVue from './components/Awards.vue';
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import ModelBoxVue from '@/components/ModelBox/ModelBox.vue';
  import { onMounted, ref } from 'vue';
  defineOptions({ name: 'template3' });

  const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore);
  // 注册局部组件
  const components: any = {
    BASE_INFO: BaseInfoVue,
    JOB_INTENTION: JobIntentionVue,
    EDU_BACKGROUND: EduBackgroundComVue,
    SKILL_SPECIALTIES: SkillSpecialtiesVue,
    CAMPUS_EXPERIENCE: CampusExperienceVue,
    INTERNSHIP_EXPERIENCE: InternshipExperienceVue,
    WORK_EXPERIENCE: WorkExperienceComVue,
    PROJECT_EXPERIENCE: ProjectExperienceVue,
    AWARDS: AwardsVue,
    HOBBIES: HobbiesVue,
    SELF_EVALUATION: SelfEvaluationVue,
    WORKS_DISPLAY: WorksDisplayVue
  };

  // 判断是否是我的简历和基础资料模块
  const isTitleAndBaseInfo = (item: { model: string }) => {
    return item.model !== 'RESUME_TITLE' && item.model !== 'BASE_INFO';
  };

  const emit = defineEmits(['contentHeightChange']);

  onMounted(() => {
    changeHeight();
  });

  // 监听内容高度发生变化
  const tmp3ContentHeightRef = ref<any>(null);
  let observer: ResizeObserver | null = null;
  let height = 0;
  const changeHeight = () => {
    observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        height = (entry.target as HTMLElement).offsetHeight;
        emit('contentHeightChange', height);
      }
    });
    observer.observe(tmp3ContentHeightRef.value); // 监听元素
  };
</script>
<style lang="scss" scoped>
  .template3-box {
    background: url(../../assets/images/template3_bg_2.png);
    background-repeat: no-repeat;
    min-height: 1160px;
    .model-box-wraper {
      position: relative;
      &::before {
        content: '';
        position: absolute;
        width: 1px;
        height: 100%;
        background-color: v-bind('resumeJsonNewStore.GLOBAL_STYLE.themeColor');
        left: 55px;
        top: 1px;
      }
      .model-other-class {
        padding: 0 40px;
      }
    }
  }
</style>
