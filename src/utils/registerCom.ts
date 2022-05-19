// 注册全局组件
import WEB_DEVELOP from '@/template/template1/web-develop.vue'; // 前端开发简历模板组件
import ResumeTitleOptionsVue from '@/template/template1/options/ResumeTitleOptions.vue'; // 模板1属性设置组件
import BaseInfoOptionsVue from '@/template/template1/options/BaseInfoOptions.vue';
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
  WEB_DEVELOP,
  ResumeTitleOptionsVue,
  BaseInfoOptionsVue,
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
