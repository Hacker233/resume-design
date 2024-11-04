import { IModulesList } from '../../types/IHJNewSchema';
import base_info from './modules/base_info';
import job_intention from './modules/job_intention';
import resume_title from './modules/resume_title';
import edu_background from './modules/edu_background';
import skill_specialties from './modules/skill_specialties';

const modulesList: IModulesList = {
  resume_title,
  base_info,
  job_intention,
  edu_background,
  skill_specialties
};

export default modulesList;
