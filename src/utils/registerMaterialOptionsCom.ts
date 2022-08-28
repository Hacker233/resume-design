// 注册每一个物料组件的属性面板
import BaseInfoOptionsVue from '@/options/BaseInfoOptions.vue'; // 基础资料模块属性设置
import BaseInfoOptions_1 from '@/options/BaseInfoOptions_1.vue';
import ResumeTitleOptionsVue from '@/options/ResumeTitleOptions.vue';
import EduBackgroundOptionsVue from '@/options/EduBackgroundOptions.vue';
import JobIntentionOptionsVue from '@/options/JobIntentionOptions.vue';
import SkillSpecialtiesOptionsVue from '@/options/SkillSpecialtiesOptions.vue';
import CampusExperienceOptionsVue from '@/options/CampusExperienceOptions.vue';
import InternshipExperienceOptionsVue from '@/options/InternshipExperienceOptions.vue';
import WorkExperienceOptionsVue from '@/options/WorkExperienceOptions.vue';
import ProjectExperienceOptionsVue from '@/options/ProjectExperienceOptions.vue';
import AwardsOptionsVue from '@/options/AwardsOptions.vue';
import HobbiesOptionsVue from '@/options/HobbiesOptions.vue';
import SelfEvalutionOptionsVue from '@/options/SelfEvalutionOptions.vue';
import WorksDisplayOptionsVue from '@/options/WorksDisplayOptions.vue';
import SkillSpecialtiesOptions1Vue from '@/options/SkillSpecialtiesOptions_1.vue';
import EduBackgroundOptions1Vue from '@/options/EduBackgroundOptions_1.vue';
import CustomOptions_1Vue from '@/options/CustomOptions_1.vue';
import CustomOptions_2Vue from '@/options/CustomOptions_2.vue';
// 定义属性组件列表
const optionsComponents: any = {
  BASE_INFO_OPTIONS: BaseInfoOptionsVue,
  BASE_INFO_OPTIONS_1: BaseInfoOptions_1,
  RESUME_TITLE_OPTIONS: ResumeTitleOptionsVue,
  EDU_BACKGROUND_OPTIONS: EduBackgroundOptionsVue,
  JOB_INTENTION_OPTIONS: JobIntentionOptionsVue,
  SKILL_SPECIALTIES_OPTIONS: SkillSpecialtiesOptionsVue,
  CAMPUS_EXPERIENCE_OPTIONS: CampusExperienceOptionsVue,
  INTERNSHIP_EXPERIENCE_OPTIONS: InternshipExperienceOptionsVue,
  WORK_EXPERIENCE_OPTIONS: WorkExperienceOptionsVue,
  PROJECT_EXPERIENCE_OPTIONS: ProjectExperienceOptionsVue,
  AWARDS_OPTIONS: AwardsOptionsVue,
  HOBBIES_OPTIONS: HobbiesOptionsVue,
  SELF_EVALUATION_OPTIONS: SelfEvalutionOptionsVue,
  WORKS_DISPLAY_OPTIONS: WorksDisplayOptionsVue,
  SKILL_SPECIALTIES_OPTIONS_1: SkillSpecialtiesOptions1Vue,
  EDU_BACKGROUND_OPTIONS_1: EduBackgroundOptions1Vue,
  CUSTOM_OPTIONS_1: CustomOptions_1Vue,
  CUSTOM_OPTIONS_2: CustomOptions_2Vue
};
export default optionsComponents;
