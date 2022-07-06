import { useResumeJsonStore, useResumeModelStore } from '@/store/resume';

/**
 * @description 返回选中模块的索引
 */
export const useModelIndex = () => {
  const { resumeJsonStore } = useResumeJsonStore();
  const useModel = useResumeModelStore();
  return resumeJsonStore.LIST.findIndex((item) => item.id === useModel.id); // 选中的索引
};

/**
 * @description 返回选中模块所需要的属性设置面板组件
 */
export const useModelOptionsComName = (templateModel: string): string => {
  let optionsName: string = '';
  switch (templateModel) {
    case 'template1-BASE_INFO':
    case 'template2-BASE_INFO':
      optionsName = 'COM_BASE_INFO_OPTIONS';
      break;
    case 'template2-SKILL_SPECIALTIES':
      optionsName = 'TEMPLATE2_SKILL_SPECIALTIES';
      break;
    case 'template2-NAME_ABSTRACT':
      optionsName = 'TEMPLATE2_NAME_ABSTRACT_OPTIONS';
      break;
    case 'template1-RESUME_TITLE':
      optionsName = 'COM_RESUME_TITLE_OPTIONS';
      break;
    case 'template1-JOB_INTENTION':
      optionsName = 'JOB_INTENTION_OPTIONS';
      break;
    case 'template2-JOB_INTENTION':
      optionsName = 'TEMPLATE2_JOB_INTENTION_OPTIONS';
      break;
    case 'template1-EDU_BACKGROUND':
      optionsName = 'EDU_BACKGROUND_OPTIONS';
      break;
    case 'template2-EDU_BACKGROUND':
      optionsName = 'TEMPLATE2_EDU_BACKGROUND_OPTIONS';
      break;
    case 'template1-SKILL_SPECIALTIES':
      optionsName = 'SKILL_SPECIALTIES';
      break;
    case 'template1-CAMPUS_EXPERIENCE':
    case 'template2-CAMPUS_EXPERIENCE':
      optionsName = 'CAMPUS_EXPERIENCE';
      break;
    case 'template1-INTERNSHIP_EXPERIENCE':
    case 'template2-INTERNSHIP_EXPERIENCE':
      optionsName = 'INTERNSHIP_EXPERIENCE';
      break;
    case 'template1-WORK_EXPERIENCE':
    case 'template2-WORK_EXPERIENCE':
      optionsName = 'WORK_EXPERIENCE';
      break;
    case 'template1-PROJECT_EXPERIENCE':
    case 'template2-PROJECT_EXPERIENCE':
      optionsName = 'PROJECT_EXPERIENCE';
      break;
    case 'template1-AWARDS':
    case 'template2-AWARDS':
      optionsName = 'AWARDS';
      break;
    case 'template1-HOBBIES':
    case 'template2-HOBBIES':
      optionsName = 'HOBBIES';
      break;
    case 'template1-SELF_EVALUATION':
      optionsName = 'SELF_EVALUATION';
      break;
    case 'template1-WORKS_DISPLAY':
    case 'template2-WORKS_DISPLAY':
      optionsName = 'WORKS_DISPLAY';
      break;
    default:
      optionsName = '';
      break;
  }
  return optionsName;
};
