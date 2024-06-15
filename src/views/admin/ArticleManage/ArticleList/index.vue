<template>
  <div class="article-list-box">
    <!-- 查询表单 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="default">
      <el-form-item label="文章分类:" prop="articleCategory">
        <el-select v-model="formInline.articleCategory" placeholder="请选择文章分类">
          <el-option
            v-for="(item, index) in categoryList"
            :key="index"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格列表 -->
    <el-table
      class="article-list-table"
      :data="tableData"
      style="width: 100%"
      size="default"
      border
    >
      <el-table-column prop="article_title" label="文章标题" />
      <el-table-column prop="article_abstract" label="文章摘要">
        <template #default="scope">
          <el-tooltip effect="light" :content="scope.row.article_abstract" raw-content>
            <div class="article-content-box">
              {{ scope.row.article_abstract }}
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="article_auther_email" label="作者邮箱" />
      <el-table-column prop="article_category" label="文章分类" />
      <el-table-column prop="article_tags" label="文章标签">
        <template #default="scope">
          <div class="article-tags-box">
            <el-tag
              v-for="(item, index) of scope.row.article_tags"
              :key="index"
              size="default"
              :hit="false"
              type="success"
              >{{ item }}</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="article_html_content" label="文章内容">
        <template #default="scope">
          <div class="article-content-box" :title="scope.row.article_text_content">
            {{ scope.row.article_text_content }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="article_cover" label="封面图">
        <template #default="scope">
          <div v-if="scope.row.article_cover" v-viewer class="preview-box-div">
            <img class="preview-img" :src="scope.row.article_cover" alt="" srcset="" />
          </div>
          <div v-else> - </div>
        </template>
      </el-table-column>
      <el-table-column prop="article_views" label="浏览量" />
      <el-table-column prop="article_likes" label="点赞量" />
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
          <el-button link type="primary" size="small" @click="deleteArticle(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination
      :total="total"
      :limit="limit"
      is-page-sizes
      :current-page="currentPage"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange"
    ></Pagination>
  </div>
</template>
<script lang="ts" setup>
  import {
    articleAllListAsync,
    articleDeleteAsync,
    getArticleCategoryListAsync
  } from '@/http/api/article';
  import { formatListDate } from '@/utils/common';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';

  // 表单查询
  const formInline = reactive({
    articleCategory: ''
  });

  // 查询所有文章列表
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  let tableData = ref<any>([]);
  const articleAllList = async () => {
    let params = {
      page: page.value,
      limit: limit.value,
      articleCategory: formInline.articleCategory
    };
    const data = await articleAllListAsync(params);
    if (data.data.status === 200) {
      tableData.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      console.log('tableData', tableData);
    } else {
      ElMessage.error(data.data.message);
    }
  };
  articleAllList();

  // 查询文章分类列表
  const categoryList = ref<any>();
  const getArticleCategoryList = async () => {
    const data = await getArticleCategoryListAsync();
    if (data.data.status === 200) {
      categoryList.value = data.data.data;
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getArticleCategoryList();

  // 点击查询
  const onSubmit = () => {
    page.value = 1;
    currentPage.value = 1;
    articleAllList();
  };

  // 重置
  const resetForm = () => {
    formInline.articleCategory = '';
    page.value = 1;
    currentPage.value = 1;
    articleAllList();
  };

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    articleAllList();
  };

  // 改变每页数量
  const handleSizeChange = (pageSize: number) => {
    limit.value = pageSize;
    console.log('改变每页数量', pageSize);
    articleAllList();
  };

  // 编辑文章
  const router = useRouter();
  const edit = (row: any) => {
    router.push({
      path: '/admin/addArticle',
      query: {
        articleId: row._id
      }
    });
  };

  // 删除文章
  const deleteArticle = (row: any) => {
    ElMessageBox.confirm('删除该文章后无法恢复，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const data = await articleDeleteAsync(row._id);
        if (data.data.status === 200) {
          ElMessage.success('删除成功');
          articleAllList();
        } else {
          ElMessage.error(data.data.message);
        }
      })
      .catch(() => {});
  };
</script>
<style lang="scss" scoped>
  .article-list-box {
    .top-box {
      margin-bottom: 20px;
    }
    .article-list-table {
      .preview-box-div {
        display: flex;
        overflow: auto;
        .preview-img {
          max-width: 200px;
        }
      }

      // 文章内容
      :deep(.article-content-box) {
        max-width: 200px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .article-tags-box {
        .el-tag {
          margin-right: 5px;
        }
      }
    }
  }
</style>
