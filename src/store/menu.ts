import { getIndexMenuListAsync } from '@/http/api/menu';
import { buildTree } from '@/utils/common';
import { defineStore } from 'pinia';

// 用户信息
export const useIndexMenuStore = defineStore('indexMenuStore', () => {
  const indexMenuList = ref<any>([]);
  function saveIndexMenu(indexMenu: any) {
    indexMenuList.value = indexMenu;
  }

  // 查询用户当前用户简币信息
  async function getIndexMenuList() {
    const data = await getIndexMenuListAsync();
    if (data.status === 200) {
      const treeData = buildTree(data.data);
      console.log('首页导航菜单', treeData);
      saveIndexMenu(treeData);
    } else {
      ElMessage({
        message: data.message,
        type: 'error'
      });
    }
  }
  return {
    indexMenuList,
    saveIndexMenu,
    getIndexMenuList
  };
});
