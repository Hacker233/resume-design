<template>
  <div ref="tmp1ContentHeightRef">
    <template v-for="item in resumeJsonNewStore.COMPONENTS">
      <model-box-vue v-if="item" :item="item" :components="components"></model-box-vue>
    </template>
  </div>
  <!-- 底部 -->
  <div class="model-bottom"></div>
</template>
<script setup lang="ts">
  import ResumeTitle from '@/material/ResumeTitle/ResumeTitle1/index.vue'; // 简历标题
  import BaseInfo from '@/material/BaseInfo/BaseInfo1/index.vue'; // 基础资料
  import JobIntention from '@/material/JobIntention/JobIntention1/index.vue'; // 求职意向
  import EduBackground from '@/material/EduBackground/EduBackground1/index.vue'; // 学历背景
  import SkillSpecialties from '@/material/SkillSpecialties/SkillSpecialties1/index.vue'; // 技能特长
  import CampusExperience from '@/material/CampusExperience/CampusExperience1/index.vue'; // 校园经历
  import InternshipExperience from '@/material/InternshipExperience/InternshipExperience1/index.vue'; // 实习经验
  import WorkExpreience from '@/material/WorkExperience/WorkExperience1/index.vue'; // 工作经验
  import ProjectExperience from '@/material/ProjectExperience/ProjectExperience1/index.vue'; // 项目经验
  import Awards from '@/material/Awards/Awards1/index.vue'; // 荣誉奖项
  import Hobbies from '@/material/Hobbies/Hobbies1/index.vue'; // 兴趣爱好
  import SelfEvaluation from '@/material/SelfEvaluation/SelfEvaluation1/index.vue'; // 自我评价
  import WorksDisplay from '@/material/WorksDisplay/WorksDisplay1/index.vue'; // 作品展示
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { onMounted, ref } from 'vue';
  import ModelBoxVue from '@/components/ModelBox/ModelBox.vue';
  defineOptions({
    name: 'template1'
  });
  const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore);

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
  };
  const emit = defineEmits(['contentHeightChange']);

  onMounted(() => {
    changeHeight();
  });

  // 监听内容高度发生变化
  const tmp1ContentHeightRef = ref<any>(null);
  let observer: ResizeObserver | null = null;
  let height = 0;
  const changeHeight = () => {
    observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        height = (entry.target as HTMLElement).offsetHeight;
        emit('contentHeightChange', height);
      }
    });
    observer.observe(tmp1ContentHeightRef.value); // 监听元素
  };
</script>
<style lang="scss" scoped>
  @import '../../style/options.scss';
  .model-bottom {
    height: 12px;
    background-color: #254665;
    padding-left: 30px;
    position: absolute;
    bottom: 10px;
    width: 100%;
    box-sizing: border-box;
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
