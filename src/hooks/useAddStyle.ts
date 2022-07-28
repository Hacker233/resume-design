import { IResumeJson } from '@/interface/model';
import styles from '@/schema/style';
import { useResumeJsonStore } from '@/store/resume';
import { cloneDeep } from 'lodash';

/**
 * @description 给每个模块添加基础样式
 */
const useAddStyle = (resumeJson: IResumeJson) => {
  let { resumeJsonStore } = useResumeJsonStore(); // store里的模板数据
  let deepStyles = cloneDeep(styles);
  // 判断每一模块是否有style属性，没有则加上
  let temp: IResumeJson = JSON.parse(JSON.stringify(resumeJson));
  temp.LIST.map((item, index) => {
    if (!item.style) {
      item.style = deepStyles[resumeJsonStore.NAME][item.model];
    }
    temp.LIST[index] = item;
  });
  temp.GLOBAL_STYLE = deepStyles[resumeJsonStore.NAME]['GLOBAL_STYLE']; // 全局样式
  return temp;
};
export default useAddStyle;
