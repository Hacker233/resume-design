import IDESIGNJSON from '@/interface/design';
import { IMATERIALITEM } from '@/interface/material';
import { defineStore } from 'pinia';
export const useDesignStore = defineStore('designStore', () => {
  const designJsonStore = ref<IDESIGNJSON>({
    ID: '', // 模板Id
    NAME: '',
    TITLE: '',
    components: [], // 模板内组件列表
    GLOBAL_STYLE: {
      themeColor: '#079cfa', // 主题色
      firstTitleFontSize: '20px', // 一级标题
      secondTitleFontSize: '14px', // 二级标题
      textFontSize: '14px', // 正文
      secondTitleColor: '#666', // 二级标题字体颜色
      textFontColor: '#757575', // 正文字体颜色
      secondTitleWeight: 600, // 二级标题字体粗细
      textFontWeight: 500, // 正文字体粗细
      modelMarginTop: '0px',
      modelMarginBottom: '45px'
    }
  });
  function pushComponent(data: IMATERIALITEM) {
    designJsonStore.value.components.push(data);
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
