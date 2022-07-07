<template>
  <div ref="tmp1ContentHeightRef">
    <template v-for="(item, index) in resumeJsonStore.LIST" :key="item.id">
      <div
        class="model-box"
        v-if="item.show && item.style"
        :ref="(el) => setRefItem(el, item.model, item.id)"
        @click="selectModel(item.model, item.title, item.id)"
      >
        <component v-if="item.style" :is="components[item.model]" :modelData="item"></component>
      </div>
    </template>
  </div>
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
  import { useResumeJsonStore, useResumeModelStore } from '@/store/resume';
  import { storeToRefs } from 'pinia';
  import { ComponentPublicInstance, onMounted, reactive, ref, watch } from 'vue';
  import { useModelOptionsComName } from '@/hooks/useModelOptionsComName';

  const { resumeJsonStore } = storeToRefs(useResumeJsonStore());

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
  let height: number = 0;
  const changeHeight = () => {
    observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        height = (entry.target as HTMLElement).offsetHeight;
        emit('contentHeightChange', height);
      }
    });
    observer.observe(tmp1ContentHeightRef.value); // 监听元素
  };

  // 锚点定位
  const { id } = storeToRefs(useResumeModelStore());
  watch(
    id,
    (newVal, oldVal) => {
      // 判断是否选中复选框
      if (oldVal && modelObj[oldVal]) {
        modelObj[oldVal].el.style.borderColor = 'transparent';
      }
      // 如果选中了模块
      if (newVal && modelObj[newVal]) {
        modelObj[newVal].el.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 该模块显示在可视区域内
        modelObj[newVal].el.style.borderColor = '#7ec97e';
      }
    },
    {
      deep: true
    }
  );
  // 模块ref
  const modelObj = reactive<any>({});
  const setRefItem = (el: ComponentPublicInstance | null | Element, model: string, id: string) => {
    if (el) {
      modelObj[id] = {
        id: id,
        el: el
      };
    }
  };

  // 点击模块
  const resumeModelStore = useResumeModelStore();
  const selectModel = (model: string, title: string, id: string) => {
    let optionsName: string = useModelOptionsComName(`template1-${model}`);
    console.log('optionsName', optionsName);
    resumeModelStore.setResumeModel({ model, optionsName, title, id });
  };
</script>
<script lang="ts">
  export default {
    name: 'template1'
  };
</script>
<style lang="less" scoped>
  @import '../../styles/options.less';
  .model-box {
    border: 2px dashed transparent;
    transition: all 0.3s;
    &:hover {
      border-color: #7ec97e !important;
      cursor: pointer;
    }
  }
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
