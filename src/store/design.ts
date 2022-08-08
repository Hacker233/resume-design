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
  const materialModelName = ref<string>(''); // 选中的模块名称
  const materialModelTitle = ref<string>('全局主题设置'); // 选中的模块名称
  const materialModelKeyId = ref<string>(''); // 选中的模块KeyID

  function updateSelectModdel(
    materialModelNameTxt: string,
    materialModelTitleTxt: string,
    materialModelKeyIdTxt: string
  ) {
    materialModelName.value = materialModelNameTxt;
    materialModelTitle.value = materialModelTitleTxt;
    materialModelKeyId.value = materialModelKeyIdTxt;
  }
  return {
    materialModelName,
    materialModelTitle,
    materialModelKeyId,
    updateSelectModdel
  };
});
