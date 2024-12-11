import { ISetterMap } from '@/views/createTemplate/types/IHJNewSchema';
import hjInput from './hj-input.vue';
import hjAvatar from './hj-avatar.vue';
import hjSelect from './hj-select.vue';
import hjList from './hj-list.vue';
import hjDatePicker from './hj-datePicker.vue';
import hjEditor from './hj-editor.vue';
import hjTextarea from './hj-textarea.vue';
import hjDate from './hj-date.vue';

const dataSourceCptMap: ISetterMap = {
  input: hjInput,
  avatar: hjAvatar,
  select: hjSelect,
  list: hjList,
  datePicker: hjDatePicker,
  editor: hjEditor,
  textarea: hjTextarea,
  date: hjDate
};

// 组件切换对照
export const cptSwitchList = (type: string) => {
  let list: any = [];
  switch (type) {
    // case 'input':
    //   list = [
    //     {
    //       label: '富文本编辑器',
    //       value: 'editor'
    //     },
    //     {
    //       label: '多行文本输入框',
    //       value: 'textarea'
    //     }
    //   ];
    //   break;
    case 'editor':
      list = [
        {
          label: '多行文本输入框',
          value: 'textarea'
        }
      ];
      break;
    case 'textarea':
      list = [
        {
          label: '富文本编辑器',
          value: 'editor'
        }
      ];
      break;
    default:
      list = [];
      break;
  }
  return list;
};
export default dataSourceCptMap;
