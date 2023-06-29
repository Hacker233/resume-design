<template>
  <!-- 查询表单 -->
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="default">
    <el-form-item label="网站类型:" prop="integral_sort">
      <el-select
        v-model="formInline.websiteTypeId"
        placeholder="请选择网站类型"
        @change="handleSelectChange"
      >
        <el-option
          v-for="(item, index) in typeList"
          :key="index"
          :label="item.website_type_name"
          :value="item._id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="网站分类" prop="websiteCategory">
      <el-select
        v-model="formInline.websiteCategory"
        placeholder="请选择分类"
        size="default"
        style="width: 100%"
        :disabled="formInline.websiteTypeId ? false : true"
      >
        <el-option
          v-for="item in categoryListByType"
          :key="item._id"
          :label="item.website_category"
          :value="item.website_category"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button @click="resetForm">重置</el-button>
      <el-button type="primary" @click="getWebsiteList">查询</el-button>
      <el-button type="primary" size="default" @click="openAddDialog"> 新增网站 </el-button>
    </el-form-item>
  </el-form>
  <!-- 表格列表 -->
  <el-table
    class="template-list-table"
    :data="websiteList"
    style="width: 100%; margin-top: 20px"
    size="default"
    border
  >
    <el-table-column prop="website_type_name" label="网站类型" />
    <el-table-column prop="website_category" label="网站分类" />
    <el-table-column prop="website_title" label="网站标题" />
    <el-table-column prop="website_abstract" label="网站简介">
      <template #default="scope">
        <el-tooltip class="box-item" effect="light" :content="scope.row.website_abstract">
          <div class="website-link">{{ scope.row.website_abstract }}</div>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="website_icon" label="网站图标">
      <template #default="scope">
        <img v-viewer class="cover-img" :src="scope.row.website_icon" alt="" srcset="" />
      </template>
    </el-table-column>
    <el-table-column prop="website_link" label="网站链接">
      <template #default="scope">
        <el-tooltip class="box-item" effect="light" :content="scope.row.website_link">
          <a class="website-link" :href="scope.row.website_link">{{ scope.row.website_link }}</a>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="website_tags" label="网站标签" />
    <el-table-column prop="website_screen" label="网站快照">
      <template #default="scope">
        <img
          v-if="scope.row.website_screen"
          v-viewer
          class="screen-img"
          :src="scope.row.website_screen"
          alt=""
          srcset=""
        />
        <div v-else>-</div>
      </template>
    </el-table-column>
    <el-table-column prop="website_views" label="网站浏览量" />

    <el-table-column prop="createDate" label="创建日期">
      <template #default="scope">
        <div>
          {{ formatListDate(scope.row.createDate) }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="updateDate" label="更新日期">
      <template #default="scope">
        <div>
          {{ formatListDate(scope.row.updateDate) }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150">
      <template #default="scope">
        <el-button link size="small" @click="edit(scope.row)">编辑</el-button>
        <el-button link type="primary" size="small" @click="deleteWebsite(scope.row)"
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
  <website-dialog
    :dialog-website-visible="dialogWebsiteVisible"
    :category-list="categoryList"
    :title="title"
    :type-list="typeList"
    :row="row"
    :btn-text="btnText"
    @cancle="handleCancle"
    @update-success="handleSuccess"
  ></website-dialog>
</template>
<script lang="ts" setup>
  import WebsiteDialog from './components/WebsiteDialog.vue';
  import { formatListDate } from '@/utils/common';
  import {
    deleteWebsiteAsync,
    getWebsiteCategoryListAsync,
    getWebsiteListPageAsync,
    getWebsiteTypeListAsync
  } from '@/http/api/websiteShare';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';

  const title = ref<string>('新增网站');
  const btnText = ref<string>('新增');
  const row = ref<any>(null);

  // 表单查询
  const formInline = reactive({
    websiteTypeId: '',
    websiteCategory: ''
  });

  // 打开新增弹窗
  const dialogWebsiteVisible = ref<boolean>(false);
  const openAddDialog = () => {
    title.value = '新增网站';
    btnText.value = '新增';
    dialogWebsiteVisible.value = true;
  };

  // 类型选择变化
  const categoryListByType = ref<any>([]);
  const handleSelectChange = (id: string) => {
    // 根据类型筛选出分类
    categoryListByType.value = [];
    categoryList.value.forEach((item: { website_type_id: string }) => {
      if (item.website_type_id === id) {
        categoryListByType.value.push(item);
      }
    });
  };

  // 取消弹窗
  const handleCancle = () => {
    dialogWebsiteVisible.value = false;
  };

  // 弹窗成功
  const handleSuccess = () => {
    dialogWebsiteVisible.value = false;
    getWebsiteList();
  };

  // 查询网站列表
  const websiteList = ref<any>();
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const getWebsiteList = async () => {
    const params = {
      websiteTypeId: formInline.websiteTypeId,
      websiteCategory: formInline.websiteCategory,
      page: page.value,
      limit: limit.value
    };
    const data = await getWebsiteListPageAsync(params);
    if (data.data.status === 200) {
      websiteList.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
    } else {
      ElMessage.error(data.message);
    }
  };
  getWebsiteList();

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getWebsiteList();
  };

  // 编辑
  const edit = (item: any) => {
    btnText.value = '修改';
    title.value = '修改网站';
    row.value = item;
    dialogWebsiteVisible.value = true;
  };

  // 删除网站
  const deleteWebsite = (row: any) => {
    ElMessageBox.confirm('删除该网站后无法恢复，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const data = await deleteWebsiteAsync(row._id);
        if (data.data.status === 200) {
          ElMessage.success('删除成功');
          getWebsiteList();
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

  // 查询分类列表
  const categoryList = ref<any>();
  const getCategoryList = async () => {
    const params = {
      websiteTypeId: formInline.websiteTypeId
    };
    const data = await getWebsiteCategoryListAsync(params);
    if (data.status === 200) {
      categoryList.value = data.data;
    } else {
      ElMessage.error(data.message);
    }
  };
  getCategoryList();

  // 重置
  const resetForm = () => {
    formInline.websiteTypeId = '';
    getWebsiteList();
  };
</script>
<style lang="scss" scoped>
  .cover-img {
    max-height: 60px;
  }

  .screen-img {
    max-width: 150px;
  }

  .website-link {
    // max-width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  :deep(.el-tooltip__popper) {
    max-width: 100px;
  }
</style>
