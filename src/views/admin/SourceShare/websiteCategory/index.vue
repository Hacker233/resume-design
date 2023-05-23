<template>
  <!-- 查询表单 -->
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="default">
    <el-form-item label="网站类型:" prop="integral_sort">
      <el-select v-model="formInline.websiteTypeId" placeholder="请选择网站类型">
        <el-option
          v-for="(item, index) in typeList"
          :key="index"
          :label="item.website_type_name"
          :value="item._id"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button @click="resetForm">重置</el-button>
      <el-button type="primary" @click="getCategoryList">查询</el-button>
      <el-button type="primary" size="default" @click="openAddDialog"> 新增分类 </el-button>
    </el-form-item>
  </el-form>
  <!-- 表格列表 -->
  <el-table
    class="template-list-table"
    :data="categoryList"
    style="width: 100%; margin-top: 20px"
    size="default"
    border
  >
    <el-table-column prop="website_type_name" label="所属类型" />
    <el-table-column prop="website_type_id" label="类型id" />
    <el-table-column prop="website_category" label="分类名称" />
    <el-table-column prop="website_category_sort" label="分类排序" />
    <el-table-column prop="website_category_icon" label="分类图标">
      <template #default="scope">
        <svg-icon
          :icon-name="scope.row.website_category_icon"
          size="30px"
          color="#00c091"
        ></svg-icon>
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

  <!-- 分页组件 -->
  <Pagination
    :total="total"
    :limit="limit"
    :current-page="currentPage"
    @handle-current-change="handleCurrentChange"
  ></Pagination>

  <!-- 新增或者编辑弹窗 -->
  <website-category-dialog
    :dialog-category-visible="dialogCategoryVisible"
    :title="title"
    :type-list="typeList"
    :row="row"
    :btn-text="btnText"
    @cancle="handleCancle"
    @update-success="handleSuccess"
  ></website-category-dialog>
</template>
<script lang="ts" setup>
  import WebsiteCategoryDialog from './components/WebsiteCategoryDialog.vue';
  import { formatListDate } from '@/utils/common';
  import {
    deleteWebsiteCategoryAsync,
    getWebsiteCategoryListPageAsync,
    getWebsiteTypeListAsync
  } from '@/http/api/websiteShare';

  const title = ref<string>('新增分类');
  const btnText = ref<string>('新增');
  const row = ref<any>(null);

  // 表单查询
  const formInline = reactive({
    websiteTypeId: ''
  });

  // 打开新增弹窗
  const dialogCategoryVisible = ref<boolean>(false);
  const openAddDialog = () => {
    title.value = '新增分类';
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

  // 查询分类列表
  const categoryList = ref<any>([]);
  const page = ref<number>(1);
  const limit = ref<number>(15);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const getCategoryList = async () => {
    const params = {
      websiteTypeId: formInline.websiteTypeId,
      page: page.value,
      limit: limit.value
    };
    const data = await getWebsiteCategoryListPageAsync(params);
    if (data.data.status === 200) {
      categoryList.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
    } else {
      ElMessage.error(data.message);
    }
  };
  getCategoryList();

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getCategoryList();
  };

  // 编辑
  const edit = (item: any) => {
    btnText.value = '修改';
    title.value = '修改分类';
    row.value = item;
    dialogCategoryVisible.value = true;
  };

  // 删除分类
  const deleteWebsiteType = (row: any) => {
    ElMessageBox.confirm('删除该分类后无法恢复，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const data = await deleteWebsiteCategoryAsync(row._id);
        if (data.data.status === 200) {
          ElMessage.success('删除成功');
          getCategoryList();
        } else {
          ElMessage.error(data.data.message);
        }
      })
      .catch(() => {});
  };

  // 查询类型列表
  const typeList = ref<Array<any>>([]);
  const getTypeList = async () => {
    const data = await getWebsiteTypeListAsync();
    if (data.status === 200) {
      typeList.value = data.data;
    } else {
      ElMessage.error(data.message);
    }
  };
  getTypeList();

  // 重置
  const resetForm = () => {
    formInline.websiteTypeId = '';
    getCategoryList();
  };
</script>
