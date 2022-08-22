<template>
  <div ref="tmp2ContentHeightRef" class="classic-box">
    <div ref="leftRef" class="left">
      <template v-for="(item, index) in leftList">
        <model-box-vue :item="item" :components="components"></model-box-vue>
      </template>
    </div>
    <div class="right">
      <!-- 个人姓名与简介 -->
      <div class="name-abstract-box" @click="selectNameModel">
        <name-abstact></name-abstact>
      </div>
      <!-- 右侧模块列表 -->
      <template v-for="item in rightList">
        <model-box-vue :item="item" :components="components"></model-box-vue>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { onMounted, ref, watch } from 'vue';
  import { useModelOptionsComName } from '@/hooks/useModelOptionsComName';
  import BaseInfo from './components/BaseInfo.vue'; // 基础信息
  import SkillSpecialties from './components/SkillSpecialties.vue';
  import NameAbstact from './components/NameAbstact.vue';
  import { IBASEINFO } from '@/interface/model';
  import JobIntention from './components/JobIntention.vue'; // 求职意向
  import EduBackground from './components/EduBackground.vue'; // 教育背景
  import CampusExperience from './components/CampusExperience.vue'; // 校园经历
  import InternshipExperience from './components/InternshipExperience.vue'; // 实习经验
  import WorkExperience from './components/WorkExperience.vue'; // 工作经验
  import ProjectExperience from './components/ProjectExperience.vue'; // 项目经验
  import Awards from './components/Awards.vue'; // 荣誉奖项
  import Hobbies from './components/Hobbies.vue'; // 兴趣爱好
  import SelfEvaluation from './components/SelfEvaluation.vue'; // 自我评价
  import WorksDisplay from './components/WorksDisplay.vue'; // 个人作品
  import ModelBoxVue from '@/components/ModelBox/ModelBox.vue';
  import { IMATERIALITEM } from '@/interface/material';
  defineOptions({ name: 'template2' });
  const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore); // 简历数据

  const emit = defineEmits(['contentHeightChange']);

  // 注册局部组件
  const components: any = {
    BASE_INFO: BaseInfo,
    SKILL_SPECIALTIES: SkillSpecialties,
    JOB_INTENTION: JobIntention,
    EDU_BACKGROUND: EduBackground,
    CAMPUS_EXPERIENCE: CampusExperience,
    INTERNSHIP_EXPERIENCE: InternshipExperience,
    WORK_EXPERIENCE: WorkExperience,
    PROJECT_EXPERIENCE: ProjectExperience,
    AWARDS: Awards,
    HOBBIES: Hobbies,
    SELF_EVALUATION: SelfEvaluation,
    WORKS_DISPLAY: WorksDisplay
  };

  onMounted(() => {
    changeHeight();
  });

  // 监听内容高度发生变化
  const tmp2ContentHeightRef = ref<any>(null);
  let observer: ResizeObserver | null = null;
  let height = 0;
  const changeHeight = () => {
    observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        height = (entry.target as HTMLElement).offsetHeight;
        emit('contentHeightChange', height);
      }
    });
    observer.observe(tmp2ContentHeightRef.value); // 监听元素
  };

  // 左侧组件列表
  let leftList = ref<any>(
    resumeJsonNewStore.value.COMPONENTS.filter((item) => {
      return item.model === 'BASE_INFO' || item.model === 'SKILL_SPECIALTIES';
    })
  );
  watch(resumeJsonNewStore, () => {
    leftList.value = resumeJsonNewStore.value.COMPONENTS.filter((item) => {
      return item.model === 'BASE_INFO' || item.model === 'SKILL_SPECIALTIES';
    });
    rightList.value = resumeJsonNewStore.value.COMPONENTS.filter((item) => {
      return item.model !== 'BASE_INFO' && item.model !== 'SKILL_SPECIALTIES';
    });
  });

  // 基础信息模块
  const modelData: IMATERIALITEM = resumeJsonNewStore.value.COMPONENTS.find((item) => {
    return item.model == 'BASE_INFO';
  });
  // 选择姓名简介模块
  const { updateSelectModel } = appStore.useSelectMaterialStore;
  const selectNameModel = () => {
    let optionsName: string = useModelOptionsComName(`template2-${modelData.model}`) as string;
    let model = modelData.model;
    let title = modelData.data.title;
    let keyId = modelData.keyId;
    updateSelectModel(model, optionsName, title, keyId);
  };

  // 右侧组件列表
  let rightList = ref<any>(
    resumeJsonNewStore.value.COMPONENTS.filter((item) => {
      return item.model !== 'BASE_INFO' && item.model !== 'SKILL_SPECIALTIES';
    })
  );
</script>
<style lang="scss">
  @import '@/style/options.scss';
  .classic-box {
    display: flex;
    .model-box {
      padding: 4px 30px;
      .edit-box {
        z-index: 999;
      }
    }
    .left {
      width: 270px;
      box-sizing: border-box;
      background-color: v-bind('resumeJsonNewStore.GLOBAL_STYLE.themeColor');
      overflow: hidden;
      min-height: 1160px;
      position: absolute;
      height: 100%;
      padding: 50px 0 0 0;
      .model-box {
        padding: 10px 30px;
      }
    }
    .right {
      padding: 40px 0 40px 270px;
      flex: 1;
      .name-abstract-box {
        border: 1px dashed transparent;
        transition: all 0.3s;
        padding: 0 30px;
        margin-bottom: 45px;
        &:hover {
          border-color: #7ec97e !important;
          cursor: pointer;
        }
      }
    }
  }
</style>
