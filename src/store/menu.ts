import {
  getAdminMenuListAsync,
  getIndexMenuListAsync,
  getOrgAdminMenuListAsync
} from '@/http/api/menu';
import { buildTree } from '@/utils/common';
import { defineStore } from 'pinia';

// 用户信息
export const useIndexMenuStore = defineStore('indexMenuStore', () => {
  const indexMenuList = ref<any>([]);
  const adminMenuList = ref<any>([]);
  const orgAdminMenuList = ref<any>([]);

  function saveIndexMenu(indexMenu: any) {
    indexMenuList.value = indexMenu;
  }

  function saveAdminMenu(indexMenu: any) {
    adminMenuList.value = indexMenu;
  }

  function saveOrgAdminMenu(indexMenu: any) {
    orgAdminMenuList.value = indexMenu;
  }

  // 查询首页导航信息
  async function getIndexMenuList() {
    const data = await getIndexMenuListAsync();
    if (data.status === 200) {
      const treeData = buildTree(data.data);

      // 需要排除的菜单项中文名（title）
      const excludedMenuTitles = [
        '简历修改', // 主菜单
        '简历模板', // 子菜单
        '私有部署', // 主菜单
        'AI面试助手' // 子菜单
      ];

      // 过滤函数
      const filterMenu = (menu: any) => {
        // 如果当前菜单的title在排除列表中，直接过滤掉
        if (excludedMenuTitles.includes(menu.title)) {
          return false;
        }

        // 如果有子菜单，递归过滤子菜单
        if (menu.children && menu.children.length > 0) {
          menu.children = menu.children.filter(filterMenu);
        }

        return true;
      };

      // 过滤菜单数据
      const filteredTreeData = treeData.filter(filterMenu);

      console.log('过滤后的首页导航菜单', filteredTreeData, JSON.stringify(filteredTreeData));
      saveIndexMenu(filteredTreeData);
    } else {
      ElMessage({
        message: data.message,
        type: 'error'
      });
    }
  }

  // 查询管理页菜单信息
  async function getAdminMenuList() {
    const data = await getAdminMenuListAsync();
    if (data.data.status === 200) {
      const treeData = buildTree(data.data.data);
      console.log('首页导航菜单', treeData);
      saveAdminMenu(treeData);
    } else {
      ElMessage({
        message: data.data.message,
        type: 'error'
      });
    }
  }

  // 查询组织管理员管理页菜单
  async function getOrgAdminMenuList() {
    const data = await getOrgAdminMenuListAsync();
    if (data.data.status === 200) {
      const treeData = buildTree(data.data.data);
      console.log('组织管理员管理页菜单', treeData);
      saveOrgAdminMenu(treeData);
    } else {
      ElMessage({
        message: data.data.message,
        type: 'error'
      });
    }
  }

  return {
    indexMenuList,
    adminMenuList,
    orgAdminMenuList,
    saveIndexMenu,
    getAdminMenuList,
    getIndexMenuList,
    getOrgAdminMenuList
  };
});
