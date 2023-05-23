<template>
  <!-- 新增 -->
  <div class="top-box">
    <el-button type="primary" size="default" @click="openAddDialog"> 新增类型 </el-button>
  </div>
  <!-- 表格列表 -->
  <el-table
    class="template-list-table"
    :data="categoryList"
    style="width: 100%; margin-top: 20px"
    size="default"
    border
  >
    <el-table-column prop="website_type_name" label="类型名称" />
    <el-table-column prop="website_type_sort" label="类型排序" />
    <el-table-column prop="website_type_icon" label="类型图标">
      <template #default="scope">
        <svg-icon :icon-name="scope.row.website_type_icon" size="30px" color="#00c091"></svg-icon>
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
    <el-table-column label="操作" width="150">
      <template #default="scope">
        <el-button link size="small" @click="edit(scope.row)">编辑</el-button>
        <el-button link type="primary" size="small" @click="deleteWebsiteType(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <!-- 新增或者编辑弹窗 -->
  <website-type-dialog
    :dialog-category-visible="dialogCategoryVisible"
    :title="title"
    :row="row"
    :btn-text="btnText"
    @cancle="handleCancle"
    @update-success="handleSuccess"
  ></website-type-dialog>
</template>
<script lang="ts" setup>
  import WebsiteTypeDialog from './components/WebsiteTypeDialog.vue';
  import { formatListDate } from '@/utils/common';
  import { deleteWebsiteTypeAsync, getWebsiteTypeListAsync } from '@/http/api/websiteShare';

  const title = ref<string>('新增类型');
  const btnText = ref<string>('新增');
  const row = ref<any>(null);

  // 打开新增弹窗
  const dialogCategoryVisible = ref<boolean>(false);
  const openAddDialog = () => {
    title.value = '新增类型';
    btnText.value = '新增';
    dialogCategoryVisible.value = true;
  };

  // 取消弹窗
  const handleCancle = () => {
    dialogCategoryVisible.value = false;
  };

  // 弹窗成功
  const handleSuccess = () => {
    dialogCategoryVisible.value = false;
    getCategoryList();
  };

  // 查询类型列表
  const categoryList = ref<any>();
  const getCategoryList = async () => {
    const data = await getWebsiteTypeListAsync();
    if (data.status === 200) {
      categoryList.value = data.data;
    } else {
      ElMessage.error(data.message);
    }
  };
  getCategoryList();

  // 编辑
  const edit = (item: any) => {
    btnText.value = '修改';
    title.value = '修改类型';
    row.value = item;
    dialogCategoryVisible.value = true;
  };

  // 删除类型
  const deleteWebsiteType = (row: any) => {
    ElMessageBox.confirm('删除该类型后无法恢复，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const data = await deleteWebsiteTypeAsync(row._id);
        if (data.data.status === 200) {
          ElMessage.success('删除成功');
          getCategoryList();
        } else {
          ElMessage.error(data.data.message);
        }
      })
      .catch(() => {});
  };
</script>
