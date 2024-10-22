import { ISetterMap } from '@/views/createTemplate/types/IHJNewSchema';
import hjInput from './hj-input.vue';
import hjAvatar from './hj-avatar.vue';
import hjSelect from './hj-select.vue';

const dataSourceCptMap: ISetterMap = {
  input: hjInput,
  avatar: hjAvatar,
  select: hjSelect
};
export default dataSourceCptMap;
