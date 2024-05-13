<template>
  <!-- 新增 -->
  <div class="top-box">
    <el-button type="primary" size="default" @click="openAddDialog"> 新增资源 </el-button>
  </div>

  <el-table
    class="soft-share-list-table"
    :data="tableData"
    style="width: 100%"
    size="default"
    border
  >
    <el-table-column prop="source_title" label="软件标题" />
    <el-table-column prop="source_abstract" label="软件简介">
      <template #default="scope">
        <el-tooltip effect="light" :content="scope.row.source_abstract" raw-content>
          <div class="article-content-box">
            {{ scope.row.source_abstract }}
          </div>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="source_tags" label="软件标签">
      <template #default="scope">
        <el-tag
          v-for="(item, index) in scope.row.source_tags"
          :key="index"
          type="success"
          size="default"
          style="margin-right: 6px; margin-bottom: 5px"
          >{{ item }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column prop="source_category" label="软件分类" />
    <el-table-column prop="source_download" label="下载方式">
      <template #default="scope">
        <div class="download-box">
          <div v-for="(item, index) in scope.row.source_download" :key="index">
            <el-tooltip class="box-item" effect="dark" :content="item.link">
              <a
                :key="index"
                href="javascript: void(0)"
                class="file-url-link"
                @click="downloadFile(item.link)"
                >{{ item.name }}
                <span v-if="item.pass">({{ item.pass }})</span>
              </a>
            </el-tooltip>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="source_cover" label="软件封面">
      <template #default="scope">
        <img v-viewer class="cover-img" :src="scope.row.source_cover" alt="" srcset="" />
      </template>
    </el-table-column>
    <el-table-column prop="source_screen" label="软件图片">
      <template #default="scope">
        <div v-viewer class="source-screen-box">
          <div v-for="(item, index) in scope.row.source_screen" :key="index">
            <img v-if="item.url" class="preview-img" :src="item.url" alt="图片" srcset="" />
            <img
              v-else
              class="preview-img"
              :src="item.response.data.fileUrl"
              alt="图片"
              srcset=""
            />
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="source_create_date" label="创建日期">
      <template #default="scope">
        <div>
          {{ formatListDate(scope.row.source_create_date) }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="updateDate" label="更新日期">
      <template #default="scope">
        <div v-if="scope.row.updateDate">
          {{ formatListDate(scope.row.updateDate) }}
        </div>
        <div v-else> - </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180">
      <template #default="scope">
        <el-button link size="small" @click="edit(scope.row)">编辑</el-button>
        <el-button link size="small" @click="toDetail(scope.row)">详情</el-button>
        <el-button link type="primary" size="small" @click="deleteSoft(scope.row)">删除</el-button>
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

  <!-- 新增或者编辑弹窗 -->
  <soft-share-dialog
    :dialog-soft-visible="dialogSoftVisible"
    :title="title"
    :btn-text="btnText"
    :row="row"
    :category-list="categoryList"
    @cancle="handleCancle"
    @update-success="handleUpdateSuccess"
  ></soft-share-dialog>
</template>
<script lang="ts" setup>
  import {
    deleteSoftAsync,
    getSoftCategoryListAsync,
    getSoftShareListAsync
  } from '@/http/api/softShare';
  import SoftShareDialog from './components/SoftShareDialog.vue';
  import { downloadFileUtil, formatListDate } from '@/utils/common';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';

  const title = ref<string>('新增软件');
  const btnText = ref<string>('新增');
  const row = ref<any>(null);

  // 打开新增弹窗
  const dialogSoftVisible = ref<boolean>(false);
  const openAddDialog = () => {
    title.value = '新增软件';
    btnText.value = '新增';
    dialogSoftVisible.value = true;
  };

  // 下载文件
  const downloadFile = (url: string) => {
    downloadFileUtil(url);
  };

  // 取消弹窗
  const handleCancle = () => {
    dialogSoftVisible.value = false;
  };

  // 查询软件分享列表
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const tableData = ref<any>([]);
  const getSoftShareList = async () => {
    let params = {
      page: page.value,
      limit: limit.value
    };
    const data = await getSoftShareListAsync(params);
    if (data.data.status === 200) {
      tableData.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getSoftShareList();

  // 查询分类列表
  const categoryList = ref<any>();
  const getCategoryList = async () => {
    const data = await getSoftCategoryListAsync();
    if (data.status === 200) {
      categoryList.value = data.data;
    } else {
      ElMessage.error(data.message);
    }
  };
  getCategoryList();

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getSoftShareList();
  };

  // 改变每页数量
  const handleSizeChange = (pageSize: number) => {
    limit.value = pageSize;
    console.log('改变每页数量', pageSize);
    getSoftShareList();
  };

  // 添加成功
  const handleUpdateSuccess = () => {
    dialogSoftVisible.value = false;
    getSoftShareList();
  };

  // 编辑
  const edit = (rowItem: any) => {
    title.value = '修改软件信息';
    btnText.value = '更新';
    row.value = rowItem;
    // 处理软件图片资源，数据迁移遗留问题
    if (row.value.source_screen.length) {
      for (let i = 0; i < row.value.source_screen.length; i++) {
        if (row.value.source_screen[i].response) {
          row.value.source_screen[i] = {
            name: row.value.source_screen[i].name,
            size: row.value.source_screen[i].size,
            status: row.value.source_screen[i].status,
            uid: row.value.source_screen[i].uid,
            url: row.value.source_screen[i].response.data.fileUrl
          };
        }
      }
    }
    dialogSoftVisible.value = true;
  };

  // 打开详情
  const router = useRouter();
  const toDetail = (row: any) => {
    const newpage = router.resolve({
      path: '/softDetail',
      query: {
        sourceId: row._id
      }
    });
    window.open(newpage.href, '_blank');
  };

  // 删除资源
  const deleteSoft = (row: any) => {
    ElMessageBox.confirm('删除该资源后无法恢复，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const data = await deleteSoftAsync(row._id);
        if (data.data.status === 200) {
          ElMessage.success('删除成功');
          getSoftShareList();
        } else {
          ElMessage.error(data.data.message);
        }
      })
      .catch(() => {});
  };
</script>
<style lang="scss" scoped>
  .top-box {
    margin-bottom: 20px;
  }
  .soft-share-list-table {
    .cover-img {
      max-height: 100px;
    }
    .article-content-box {
      max-width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .source-screen-box {
      display: flex;
      overflow: auto;
      .preview-img {
        max-height: 100px;
        border: 1px solid #eee;
      }
    }
    .download-box {
      display: flex;
      flex-direction: column;
    }
  }
</style>
