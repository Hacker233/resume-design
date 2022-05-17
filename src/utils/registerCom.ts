// 注册全局组件

import WEB_DEVELOP from '@/template/web/web-develop.vue'; // 前端开发简历模板组件
import ResumeTitleOptionsVue from '@/template/web/options/ResumeTitleOptions.vue'; // 模板1属性设置组件
import BaseInfoOptionsVue from '@/template/web/options/BaseInfoOptions.vue';
import JobIntentionOptionsVue from '@/template/web/options/JobIntentionOptions.vue';
import EduBackgroundOptionsVue from '@/template/web/options/EduBackgroundOptions.vue';
import SkillSpecialtiesOptionsVue from '@/template/web/options/SkillSpecialtiesOptions.vue';
import CampusExperienceOptionsVue from '@/template/web/options/CampusExperienceOptions.vue';
import InternshipExperienceOptionsVue from '@/template/web/options/InternshipExperienceOptions.vue';

const componentList: Array<any> = [
  WEB_DEVELOP,
  ResumeTitleOptionsVue,
  BaseInfoOptionsVue,
  JobIntentionOptionsVue,
  EduBackgroundOptionsVue,
  SkillSpecialtiesOptionsVue,
  CampusExperienceOptionsVue,
  InternshipExperienceOptionsVue
];

export default {
  install(app: any) {
    componentList.map((component) => {
      app.component(component.name, component);
    });
  }
};
