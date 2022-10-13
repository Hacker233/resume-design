<template>
  <div class="word-template-list-box">
    <!-- 筛选 -->
    <div class="top-box">
      <el-button type="primary" size="default" @click="openAddDialog"> 新增模板分类 </el-button>
    </div>
    <!-- 表格列表 -->
    <el-table
      class="template-list-table"
      :data="categoryList"
      style="width: 100%"
      size="default"
      border
    >
      <el-table-column prop="_id" label="分类id" />
      <el-table-column prop="name" label="分类名称" />
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
          <el-button link type="primary" size="small" @click="deleteTemplate(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 新增和编辑模板弹窗 -->
  <category-dialog
    :dialog-word-visible="dialogWordVisible"
    :row="row"
    :title="title"
    :btn-text="btnText"
    @cancle="cancle"
    @update-success="updateSuccess"
  ></category-dialog>
</template>
<script lang="ts" setup>
  import CategoryDialog from './components/CategoryDialog.vue';
  import { formatListDate } from '@/utils/common';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';
  import { getPPTCategoryListAsync, pptCategoryDeleteAsync } from '@/http/api/pptTemplate';

  const row = ref<any>(null);
  const title = ref<string>('title');
  const btnText = ref<string>('添加');
  const dialogWordVisible = ref<boolean>(false);
  // 新增
  const openAddDialog = () => {
    btnText.value = '添加';
    title.value = '添加分类';
    dialogWordVisible.value = true;
  };

  // 查询分类列表
  const categoryList = ref<any>();
  const getPPTCategoryList = async () => {
    const data = await getPPTCategoryListAsync();
    if (data.status === 200) {
      categoryList.value = data.data;
    } else {
      ElMessage.error(data.message);
    }
  };
  getPPTCategoryList();

  // 取消审核弹窗
  const cancle = () => {
    dialogWordVisible.value = false;
  };

  // 提交成功
  const updateSuccess = () => {
    dialogWordVisible.value = false;
    getPPTCategoryList();
  };

  // 编辑
  const edit = (item: any) => {
    btnText.value = '修改';
    title.value = '修改分类';
    row.value = item;
    dialogWordVisible.value = true;
  };

  // 删除分类
  const deleteTemplate = (row: any) => {
    ElMessageBox.confirm('删除该分类后无法恢复，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const data = await pptCategoryDeleteAsync(row._id);
        if (data.data.status === 200) {
          ElMessage.success('删除成功');
          getPPTCategoryList();
        } else {
          ElMessage.error(data.data.message);
        }
      })
      .catch(() => {});
  };
</script>
<style lang="scss" scoped>
  .word-template-list-box {
    display: flex;
    flex-direction: column;
    .top-box {
      margin-bottom: 20px;
    }
  }
</style>
