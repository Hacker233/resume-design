// 模板组件
import Template1Vue from '@/template/template1/template1.vue'; // 前端开发简历模板组件
import Template2Vue from '@/template/template2/template2.vue';

// 模板之间通用的属性设置面板
import COMBaseInfoOptionsVue from '@/components/CommonOptions/BaseInfoOptions.vue'; // 基础信息属性设置面板
import COMResumeTitleOptionsVue from '@/components/CommonOptions/ResumeTitleOptions.vue'; // 简历标题属性设置面板

// 模板1属性设置组件

import JobIntentionOptionsVue from '@/template/template1/options/JobIntentionOptions.vue';
import EduBackgroundOptionsVue from '@/template/template1/options/EduBackgroundOptions.vue';
import SkillSpecialtiesOptionsVue from '@/template/template1/options/SkillSpecialtiesOptions.vue';
import CampusExperienceOptionsVue from '@/template/template1/options/CampusExperienceOptions.vue';
import InternshipExperienceOptionsVue from '@/template/template1/options/InternshipExperienceOptions.vue';
import WorkExperienceOptionsVue from '@/template/template1/options/WorkExperienceOptions.vue';
import ProjectExperienceOptionsVue from '@/template/template1/options/ProjectExperienceOptions.vue';
import AwardsOptionsVue from '@/template/template1/options/AwardsOptions.vue';
import HobbiesOptionsVue from '@/template/template1/options/HobbiesOptions.vue';
import SelfEvalutionOptionsVue from '@/template/template1/options/SelfEvalutionOptions.vue';
import WorksDisplayOptionsVue from '@/template/template1/options/WorksDisplayOptions.vue';

const componentList: Array<any> = [
  Template1Vue,
  Template2Vue,
  COMResumeTitleOptionsVue,
  COMBaseInfoOptionsVue,
  JobIntentionOptionsVue,
  EduBackgroundOptionsVue,
  SkillSpecialtiesOptionsVue,
  CampusExperienceOptionsVue,
  InternshipExperienceOptionsVue,
  WorkExperienceOptionsVue,
  ProjectExperienceOptionsVue,
  AwardsOptionsVue,
  HobbiesOptionsVue,
  SelfEvalutionOptionsVue,
  WorksDisplayOptionsVue
];

export default {
  install(app: any) {
    componentList.map((component) => {
      app.component(component.name, component);
    });
  }
};
