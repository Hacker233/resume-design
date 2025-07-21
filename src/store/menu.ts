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
      console.log('首页导航菜单', treeData);
      saveIndexMenu(treeData);
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
