/**
 * @description 返回选中模块所需要的属性设置面板组件
 */
export const useModelOptionsComName = (templateModel: string): string => {
  let optionsName: string = '';
  switch (templateModel) {
    // 基础信息
    case 'template1-BASE_INFO':
    case 'template2-BASE_INFO':
    case 'template3-BASE_INFO':
      optionsName = 'COM_BASE_INFO_OPTIONS';
      break;
    // 技能特长
    case 'template1-SKILL_SPECIALTIES':
    case 'template3-SKILL_SPECIALTIES':
      optionsName = 'SKILL_SPECIALTIES';
      break;
    case 'template2-SKILL_SPECIALTIES':
      optionsName = 'TEMPLATE2_SKILL_SPECIALTIES';
      break;
    case 'template2-NAME_ABSTRACT':
      optionsName = 'TEMPLATE2_NAME_ABSTRACT_OPTIONS';
      break;
    // 简历标题
    case 'template1-RESUME_TITLE':
    case 'template2-RESUME_TITLE':
    case 'template3-RESUME_TITLE':
      optionsName = 'COM_RESUME_TITLE_OPTIONS';
      break;
    // 求职意向
    case 'template1-JOB_INTENTION':
    case 'template2-JOB_INTENTION':
    case 'template3-JOB_INTENTION':
      optionsName = 'JOB_INTENTION_OPTIONS';
      break;
    // 教育背景
    case 'template1-EDU_BACKGROUND':
      optionsName = 'EDU_BACKGROUND_OPTIONS';
      break;
    case 'template2-EDU_BACKGROUND':
    case 'template3-EDU_BACKGROUND':
      optionsName = 'TEMPLATE2_EDU_BACKGROUND_OPTIONS';
      break;
    // 校园经历
    case 'template1-CAMPUS_EXPERIENCE':
    case 'template2-CAMPUS_EXPERIENCE':
    case 'template3-CAMPUS_EXPERIENCE':
      optionsName = 'CAMPUS_EXPERIENCE';
      break;
    // 实习经验
    case 'template1-INTERNSHIP_EXPERIENCE':
    case 'template2-INTERNSHIP_EXPERIENCE':
    case 'template3-INTERNSHIP_EXPERIENCE':
      optionsName = 'INTERNSHIP_EXPERIENCE';
      break;
    // 工作经验
    case 'template1-WORK_EXPERIENCE':
    case 'template2-WORK_EXPERIENCE':
    case 'template3-WORK_EXPERIENCE':
      optionsName = 'WORK_EXPERIENCE';
      break;
    // 项目经验
    case 'template1-PROJECT_EXPERIENCE':
    case 'template2-PROJECT_EXPERIENCE':
    case 'template3-PROJECT_EXPERIENCE':
      optionsName = 'PROJECT_EXPERIENCE';
      break;
    // 荣誉奖项
    case 'template1-AWARDS':
    case 'template2-AWARDS':
    case 'template3-AWARDS':
      optionsName = 'AWARDS';
      break;
    // 兴趣爱好
    case 'template1-HOBBIES':
    case 'template2-HOBBIES':
    case 'template3-HOBBIES':
      optionsName = 'HOBBIES';
      break;
    // 自我评价
    case 'template1-SELF_EVALUATION':
    case 'template2-SELF_EVALUATION':
    case 'template3-SELF_EVALUATION':
      optionsName = 'SELF_EVALUATION';
      break;
    // 作品展示
    case 'template1-WORKS_DISPLAY':
    case 'template2-WORKS_DISPLAY':
    case 'template3-WORKS_DISPLAY':
      optionsName = 'WORKS_DISPLAY';
      break;
    default:
      optionsName = '';
      break;
  }
  return optionsName;
};
