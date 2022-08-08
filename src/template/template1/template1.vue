<template>
  <div ref="tmp1ContentHeightRef">
    <template v-for="item in resumeJsonStore.LIST">
      <model-box-vue
        v-if="item"
        :key="item.id"
        :item="item"
        :components="components"
      ></model-box-vue>

      <!-- <component v-if="item" :is="components[item.model]" :modelData="item"></component> -->
    </template>
    <!-- 底部 -->
    <div class="model-bottom"></div>
  </div>
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
  import appStore from '@/store';
  import { cloneDeep } from 'lodash-es';
  import { storeToRefs } from 'pinia';
  import { onMounted, ref } from 'vue';
  import ModelBoxVue from '@/components/ModelBox/ModelBox.vue';
  import { useResumeJsonStore } from '@/store/resume';
  import { random } from 'lodash-es';
  import { DIVIDE, IResumeJson } from '@/interface/model';
  const { resumeJsonStore } = storeToRefs(appStore.useResumeJsonStore);
  const useResumeJson = useResumeJsonStore();
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
  const tmp1ContentHeightRef = ref<HTMLDivElement | null>(null);
  // let observer: ResizeObserver | null = null;
  // let height:number = 0;
  watch(
    () => resumeJsonStore.value,
    (newVal, oldVal) => {
      console.log(
        'contentHeightChange',
        tmp1ContentHeightRef.value?.getBoundingClientRect().height
      );
      if (!tmp1ContentHeightRef.value) return false;
      // 分割高度
      let pageHeight = 1160;
      // 总高度
      const allHeight = tmp1ContentHeightRef.value.getBoundingClientRect().height;
      let bucket = 0;
      const children = tmp1ContentHeightRef.value.children;
      for (const i in children) {
        if (typeof i === 'number') {
          break;
        }
        const item = children[i];
        debugger;
        let itemHeight = item.getBoundingClientRect().height;
        if (bucket >= pageHeight) {
          console.log('fully');
          console.log(bucket);
          // 在这里节点上插入分割item
          const divideItem: DIVIDE = {
            divide: true,
            id: random(20, 50).toString()
          };
          console.log('index', i);
          console.log('useResumeJson', useResumeJson);
          // useResumeJson.changeResumeJsonData()
          console.log('list', resumeJsonStore.value.LIST);
          const newResumeList: IResumeJson = cloneDeep(resumeJsonStore.value);
          newResumeList.LIST.splice(Number(i), 0, divideItem);
          useResumeJson.changeResumeJsonData(newResumeList);

          console.log('list', resumeJsonStore.value.LIST);

          bucket = 0;
        }
        bucket += itemHeight;
        console.log('itemHeight', itemHeight);
      }

      // 页面数量
      let page: number = Math.ceil(allHeight / pageHeight);
      console.log('pageHeight', pageHeight);
      console.log('allHeight', allHeight);
      console.log('page', page);
    },
    {
      deep: true
    }
  );
  const changeHeight = () => {
    console.log('changeHeight');

    emit('contentHeightChange', tmp1ContentHeightRef.value?.getBoundingClientRect().height);
    // observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
    //   for (let entry of entries) {
    //     const el = entry.target;
    //     console.log('el', el);
    //     // 分割高度
    //     let pageHeight = 1160;
    //     // 总高度
    //     const allHeight = entry.target!.getBoundingClientRect().height;
    //     // 页面数量
    //     let page: number = Math.ceil(allHeight / pageHeight);
    //     // 高度1160就分割
    //     // if(allHeight/1160)
    //     // 添加div
    //     const divList: HTMLDivElement[] = Array(page).fill(document.createElement('div'));
    //     // 当前填充元素的索引
    //     let curPageIndex = 0;
    //     // 当前最后卡片的高度
    //     let curPageElAllHeight = 0;
    //     console.log('el', el);
    //     const elChildren: HTMLDivElement[] = cloneDeep(el.children);
    //     // console.log(el.firstElementChild);

    //     console.log('elChildren', elChildren);

    //     if (!elChildren) continue;
    //     for (const child_el of Array.from(elChildren)) {
    //       let elHeight = ~~child_el.getBoundingClientRect().height + 1;
    //       console.log('elHeight', elHeight);
    //       curPageElAllHeight += elHeight;
    //       if (curPageElAllHeight < pageHeight) {
    //         divList[curPageIndex].appendChild(child_el);
    //       } else {
    //         curPageIndex++;
    //         curPageElAllHeight = elHeight;
    //         divList[curPageIndex].appendChild(child_el);
    //       }
    //       console.log('divList', divList);
    //     }
    //     console.log('---------------------');

    //     // console.log('divList', divList);
    //     // tmp1ContentHeightRef.value = document.createElement('div');
    //     // for (const page of divList) {
    //     //   tmp1ContentHeightRef.value?.appendChild(page);
    //     // }
    //     // height = (entry.target as HTMLElement).offsetHeight;
    //     // emit('contentHeightChange', height);
    //   }
    // });
    // observer.observe(tmp1ContentHeightRef.value!); // 监听元素
  };
</script>
<script lang="ts">
  export default {
    name: 'Template1'
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
