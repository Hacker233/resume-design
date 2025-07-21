<!-- 首页导航菜单管理 -->
<template>
  <div class="admin-menu-manage-box">
    <!-- 新增 -->
    <div class="top-box">
      <el-button type="primary" size="default" @click="openAddDialog"> 新增菜单 </el-button>
    </div>
    <!-- 表格列表 -->
    <el-table
      class="article-list-table"
      :data="tableData"
      style="width: 100%"
      size="default"
      row-key="_id"
      border
    >
      <el-table-column prop="iconfont" label="菜单图标">
        <template #default="scope">
          <svg-icon
            v-if="scope.row.iconfont"
            :icon-name="scope.row.iconfont"
            size="30px"
            color="#00c091"
          ></svg-icon>
          <span v-else>-</span>
        </template>
      </el-table-column>

      <el-table-column prop="index" label="菜单权重" />
      <el-table-column prop="title" label="菜单中文名" />
      <el-table-column prop="name" label="菜单英文名" />
      <el-table-column prop="path" label="菜单路径">
        <template #default="scope">
          <span v-if="scope.row.path">{{ scope.row.path }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="菜单状态">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 1" type="success">启用中</el-tag>
          <el-tag v-else type="danger">未启用</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="createDate" label="创建日期">
        <template #default="scope">
          <div>
            {{ formatListDate(scope.row.createDate) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="updateDate" label="更新日期" sortable>
        <template #default="scope">
          <div>
            {{ formatListDate(scope.row.updateDate) }}
          </div>
        </template>
      </el-table-column>

      <!-- 操作区域 -->
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="addMenu(scope.row)"
            >新增子菜单</el-button
          >
          <el-button link type="primary" size="small" @click="editMenu(scope.row)">编辑</el-button>
          <el-button link type="primary" size="small" @click="deleteMenu(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 新增或者编辑弹窗 -->
  <admin-menu-dialog
    :dialog-add-menu-visible="dialogAddMenuVisible"
    :title="title"
    :row="row"
    :btn-text="btnText"
    :parent-id="parentId"
    @cancle="handleCancle"
    @update-success="handleSuccess"
  ></admin-menu-dialog>
</template>
<script lang="ts" setup>
  import { deleteOrgAdminMenuAsync, getOrgAdminMenuListAsync } from '@/http/api/menu';
  import { buildTree, formatListDate } from '@/utils/common';
  import AdminMenuDialog from './components/AdminMenuDialog.vue';
  import { ElMessageBox } from 'element-plus';

  // 查询菜单列表
  let tableData = ref<any>([]);
  const getAdminMenuList = async () => {
    const data = await getOrgAdminMenuListAsync();
    if (data.data.status === 200) {
      tableData.value = buildTree(data.data.data);
      console.log('tableData', tableData);
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getAdminMenuList();

  const title = ref<string>('新增分类');
  const btnText = ref<string>('新增');
  const row = ref<any>(null);

  // 打开新增弹窗
  const dialogAddMenuVisible = ref<boolean>(false);
  const openAddDialog = () => {
    btnText.value = '新增';
    parentId.value = '';
    title.value = '新增菜单';
    dialogAddMenuVisible.value = true;
  };

  // 取消弹窗
  const handleCancle = () => {
    dialogAddMenuVisible.value = false;
  };

  // 弹窗成功
  const handleSuccess = () => {
    dialogAddMenuVisible.value = false;
    getAdminMenuList();
  };

  // 编辑菜单
  const editMenu = (item: any) => {
    parentId.value = item.parentId;
    row.value = item;
    btnText.value = '修改';
    title.value = '编辑菜单';
    dialogAddMenuVisible.value = true;
  };

  // 新增子菜单
  const parentId = ref<string>('');
  const addMenu = (row: any) => {
    parentId.value = row._id;
    btnText.value = '新增';
    title.value = '新增子菜单';
    dialogAddMenuVisible.value = true;
  };

  // 删除菜单
  const deleteMenu = async (row: any) => {
    ElMessageBox.confirm('确认删除该菜单以及所有子菜单？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const data = await deleteOrgAdminMenuAsync(row._id);
        if (data.data.status === 200) {
          ElMessage.success('删除成功');
          getAdminMenuList();
        } else {
          ElMessage.error(data.data.message);
        }
      })
      .catch(() => {});
  };
</script>
<style lang="scss" scoped>
  .admin-menu-manage-box {
    .top-box {
      margin-bottom: 20px;
    }
  }
</style>
