<template>
  <div class="article-category-box">
    <!-- 新增模板分类 -->
    <div class="top-box">
      <el-button type="primary" size="default" @click="openAddDialog"> 新增风格 </el-button>
    </div>
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
    <el-table-column prop="category_label" label="分类名称" />
    <el-table-column prop="category_value" label="分类英文名" />
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
  <!-- 新增和编辑分类弹窗 -->
  <category-dialog
    :dialog-article-visible="dialogArticleVisible"
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
  import { getTemplateStyleListAsync, templateStyleDeleteAsync } from '@/http/api/createTemplate';

  const dialogArticleVisible = ref<boolean>(false);
  const row = ref<any>(null);
  const title = ref<string>('title');
  const btnText = ref<string>('添加');

  // 打开弹窗
  const openAddDialog = () => {
    btnText.value = '添加';
    title.value = '添加分类';
    dialogArticleVisible.value = true;
  };

  // 取消弹窗
  const cancle = () => {
    dialogArticleVisible.value = false;
  };

  // 提交成功
  const updateSuccess = () => {
    dialogArticleVisible.value = false;
    getTemplateCategoryList();
  };

  // 查询模板分类列表
  const categoryList = ref<any>();
  const getTemplateCategoryList = async () => {
    const data = await getTemplateStyleListAsync();
    if (data.status === 200) {
      categoryList.value = data.data;
    } else {
      ElMessage.error(data.message);
    }
  };
  getTemplateCategoryList();

  // 编辑
  const edit = (item: any) => {
    btnText.value = '修改';
    title.value = '修改分类';
    row.value = item;
    dialogArticleVisible.value = true;
  };

  // 删除分类
  const deleteTemplate = (row: any) => {
    ElMessageBox.confirm('删除该分类后无法恢复，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const data = await templateStyleDeleteAsync(row._id);
        if (data.data.status === 200) {
          ElMessage.success('删除成功');
          getTemplateCategoryList();
        } else {
          ElMessage.error(data.data.message);
        }
      })
      .catch(() => {});
  };
</script>
<style lang="scss" scoped>
  .article-category-box {
    .top-box {
      margin-bottom: 20px;
    }
  }
</style>
