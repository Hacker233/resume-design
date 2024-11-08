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
export default dataSourceCptMap;
