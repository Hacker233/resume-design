import { IModulesList } from '../../types/IHJNewSchema';
import base_info from './modules/base_info';
import job_intention from './modules/job_intention';
import resume_title from './modules/resume_title';
import edu_background from './modules/edu_background';
import skill_specialties from './modules/skill_specialties';
import campus_experience from './modules/campus_experience';
import internship_experience from './modules/intership_experience';
import work_experience from './modules/work_experience';
import project_experience from './modules/project_experience';
import awards from './modules/awards';
import hobbies from './modules/hobbies';
import self_evaluation from './modules/self_evaluation';
import works_display from './modules/works_display';
import custom from './modules/custom';

const modulesList: IModulesList = {
  resume_title,
  base_info,
  job_intention,
  edu_background,
  skill_specialties,
  campus_experience,
  internship_experience,
  work_experience,
  project_experience,
  awards,
  hobbies,
  self_evaluation,
  works_display,
  custom
};

export default modulesList;
