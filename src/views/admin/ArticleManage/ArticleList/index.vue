<template>
  <div class="article-list-box">
    <!-- 表格列表 -->
    <el-table
      class="article-list-table"
      :data="tableData"
      style="width: 100%"
      size="default"
      border
    >
      <el-table-column prop="article_title" label="文章标题" />
      <el-table-column prop="article_abstract" label="文章摘要" />
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
          <el-tooltip effect="light" :content="scope.row.article_html_content" raw-content>
            <div class="article-content-box">
              {{ scope.row.article_text_content }}
            </div>
          </el-tooltip>
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
      :current-page="currentPage"
      @handle-current-change="handleCurrentChange"
    ></Pagination>
  </div>
</template>
<script lang="ts" setup>
  import { articleAllListAsync, articleDeleteAsync } from '@/http/api/article';
  import { formatListDate } from '@/utils/common';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';

  // 查询所有文章列表
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  let tableData = ref<any>([]);
  const articleAllList = async () => {
    let params = {
      page: page.value,
      limit: limit.value
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

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
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
        width: 200px;
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
