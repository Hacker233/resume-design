import IDESIGNJSON from '@/interface/design';
import { IMATERIALITEM } from '@/interface/material';
import { DESIGN_JSON } from '@/schema/design';
import { defineStore } from 'pinia';
export const useDesignStore = defineStore('designStore', () => {
  const designJsonStore = ref<IDESIGNJSON>(DESIGN_JSON);
  function pushComponent(data: IMATERIALITEM) {
    designJsonStore.value.COMPONENTS.push(data);
  }
  return {
    designJsonStore,
    pushComponent
  };
});

export const useSelectMaterialStore = defineStore('selectMaterialStore', () => {
  const cptName = ref<string>(''); // 选中的模块名称
  const cptOptionsName = ref<string>(''); // 选中的组件属性面板名称
  const cptTitle = ref<string>('全局主题设置'); // 选中的模块名称
  const cptKeyId = ref<string>(''); // 选中的模块KeyID

  // 更新
  function updateSelectModdel(
    cptNameTxt: string,
    cptOptionsNameTxt: string,
    cptTitleTxt: string,
    cptKeyIdTxt: string
  ) {
    cptName.value = cptNameTxt;
    cptOptionsName.value = cptOptionsNameTxt;
    cptTitle.value = cptTitleTxt;
    cptKeyId.value = cptKeyIdTxt;
  }
  // 重置
  function resetSelectModel() {
    cptName.value = '';
    cptOptionsName.value = '';
    cptTitle.value = '全局主题设置';
    cptKeyId.value = '';
  }
  return {
    cptName,
    cptOptionsName,
    cptTitle,
    cptKeyId,
    updateSelectModdel,
    resetSelectModel
  };
});
