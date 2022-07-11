<template>
  <div class="classic-box" ref="tmp2ContentHeightRef">
    <div class="left" ref="leftRef">
      <template v-for="(item, index) in leftList">
        <div
          class="model-box"
          v-if="item.show"
          :ref="(el) => setRefItem(el, item.model, item.id)"
          @click="selectModel(item.model, item.title, item.id)"
        >
          <component v-if="item.style" :is="components[item.model]" :modelData="item"></component>
        </div>
      </template>
    </div>
    <div class="right">
      <!-- 个人姓名与简介 -->
      <div class="name-abstract-box" @click="selectNameModel">
        <name-abstact></name-abstact>
      </div>
      <!-- 右侧模块列表 -->
      <template v-for="(item, index) in rightList">
        <div
          class="model-box"
          v-if="item.show"
          :ref="(el) => setRefItem(el, item.model, item.id)"
          @click="selectModel(item.model, item.title, item.id)"
        >
          <component v-if="item.style" :is="components[item.model]" :modelData="item"></component>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useResumeJsonStore, useResumeModelStore } from '@/store/resume';
  import { storeToRefs } from 'pinia';
  import { ComponentPublicInstance, onMounted, reactive, ref, watch } from 'vue';
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

  const { resumeJsonStore } = storeToRefs(useResumeJsonStore()); // 简历数据

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
  let height: number = 0;
  const changeHeight = () => {
    observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        height = (entry.target as HTMLElement).offsetHeight;
        emit('contentHeightChange', height);
      }
    });
    observer.observe(tmp2ContentHeightRef.value); // 监听元素
  };

  // 左侧锚点定位
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

  // 模块列表ref
  const modelObj = reactive<any>({});
  const setRefItem = (el: ComponentPublicInstance | null | Element, model: string, id: string) => {
    if (el) {
      modelObj[id] = {
        id: id,
        el: el
      };
    }
  };
  //选中组件模块
  const resumeModelStore = useResumeModelStore();
  const selectModel = (model: string, title: string, id: string) => {
    let optionsName: string = useModelOptionsComName(`template2-${model}`);
    resumeModelStore.setResumeModel({ model, optionsName, title, id });
  };

  // 左侧组件列表
  let leftList = ref<any>(
    resumeJsonStore.value.LIST.filter((item) => {
      return item.model === 'BASE_INFO' || item.model === 'SKILL_SPECIALTIES';
    })
  );
  watch(resumeJsonStore.value, () => {
    leftList.value = resumeJsonStore.value.LIST.filter((item) => {
      return item.model === 'BASE_INFO' || item.model === 'SKILL_SPECIALTIES';
    });
    rightList.value = resumeJsonStore.value.LIST.filter((item) => {
      return item.model !== 'BASE_INFO' && item.model !== 'SKILL_SPECIALTIES';
    });
  });

  // 基础信息模块
  const modelData: IBASEINFO = resumeJsonStore.value.LIST.find((item) => {
    return item.model == 'BASE_INFO';
  }) as IBASEINFO;
  // 选择姓名简介模块
  const selectNameModel = () => {
    let optionsName: string = useModelOptionsComName(`template2-${modelData?.model}`);
    let model = modelData?.model;
    let title = modelData?.title;
    let id = modelData?.id;
    resumeModelStore.setResumeModel({ model, optionsName, title, id });
  };

  // 右侧组件列表
  let rightList = ref<any>(
    resumeJsonStore.value.LIST.filter((item) => {
      return item.model !== 'BASE_INFO' && item.model !== 'SKILL_SPECIALTIES';
    })
  );
</script>
<script lang="ts">
  export default {
    name: 'template2'
  };
</script>
<style lang="less">
  @import '../../styles/options.less';
  .classic-box {
    display: flex;
    .model-box {
      border: 2px dashed transparent;
      transition: all 0.3s;
      padding: 4px 30px;
      &:hover {
        border-color: #7ec97e !important;
        cursor: pointer;
      }
    }
    .left {
      width: 270px;
      box-sizing: border-box;
      background-color: #254665;
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
        border: 2px dashed transparent;
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
