// 注册全局组件
import WEB_DEVELOP from '@/template/web/web-develop.vue'; // 前端开发简历模板组件
import ResumeTitleOptionsVue from '@/template/web/options/ResumeTitleOptions.vue'; // 模板1属性设置组件
import BaseInfoOptionsVue from '@/template/web/options/BaseInfoOptions.vue';
import JobIntentionOptionsVue from '@/template/web/options/JobIntentionOptions.vue';
import EduBackgroundOptionsVue from '@/template/web/options/EduBackgroundOptions.vue';
import SkillSpecialtiesOptionsVue from '@/template/web/options/SkillSpecialtiesOptions.vue';
import CampusExperienceOptionsVue from '@/template/web/options/CampusExperienceOptions.vue';
import InternshipExperienceOptionsVue from '@/template/web/options/InternshipExperienceOptions.vue';
import WorkExperienceOptionsVue from '@/template/web/options/WorkExperienceOptions.vue';
import ProjectExperienceOptionsVue from '@/template/web/options/ProjectExperienceOptions.vue';
import AwardsOptionsVue from '@/template/web/options/AwardsOptions.vue';
import HobbiesOptionsVue from '@/template/web/options/HobbiesOptions.vue';
import SelfEvalutionOptionsVue from '@/template/web/options/SelfEvalutionOptions.vue';
import WorksDisplayOptionsVue from '@/template/web/options/WorksDisplayOptions.vue';

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
