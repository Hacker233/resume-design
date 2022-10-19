<template>
  <div class="ppt-template-list-box">
    <!-- 筛选 -->
    <div class="top-box">
      <el-button type="primary" size="default" @click="openAddDialog"> 新增PPT模板 </el-button>
    </div>
  </div>
  <!-- 表格列表 -->
  <el-table class="template-list-table" :data="tableData" style="width: 100%" size="default" border>
    <el-table-column prop="name" label="模板名称" />
    <el-table-column prop="profile" label="模板简介" />
    <el-table-column prop="category" label="模板分类">
      <template #default="scope">
        <div>
          {{ categoryLabel(scope.row.category) }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="tags" label="模板标签" />
    <el-table-column prop="likes" label="点赞量" />
    <el-table-column prop="views" label="浏览量" />
    <el-table-column prop="collections" label="收藏量" />
    <el-table-column prop="effect" label="模板效果" />
    <el-table-column prop="proportion" label="比例" />
    <el-table-column prop="pages" label="页数" />
    <el-table-column prop="fileUrl" label="文件地址">
      <template #default="scope">
        <el-tooltip
          v-if="scope.row.fileUrl"
          class="box-item"
          effect="dark"
          :content="JSON.parse(scope.row.fileUrl)[0].url"
        >
          <a
            v-for="(item, index) in JSON.parse(scope.row.fileUrl)"
            :key="index"
            href="javascript: void(0)"
            class="file-url-link"
            @click="downloadFile(item.url)"
            >{{ item.url }}</a
          >
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="cover" label="封面图">
      <template #default="scope">
        <div v-if="scope.row.cover" class="preview-box-div">
          <img
            v-for="(item, index) in JSON.parse(scope.row.cover)"
            :key="index"
            class="preview-img"
            :src="item.url"
            alt=""
            srcset=""
          />
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="previewUrl" label="预览图">
      <template #default="scope">
        <div v-if="scope.row.previewUrl" class="preview-box-div">
          <img
            class="preview-img"
            :src="JSON.parse(scope.row.previewUrl)[0].url"
            alt=""
            srcset=""
          />
        </div>
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
        <el-button link type="primary" size="small" @click="deleteTemplate(scope.row)"
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
  <!-- 新增和编辑模板弹窗 -->
  <ppt-dialog
    :dialog-ppt-visible="dialogPPTVisible"
    :row="row"
    :title="title"
    :category-list="categoryList"
    @cancle="cancle"
    @update-success="updateSuccess"
  ></ppt-dialog>
</template>
<script lang="ts" setup>
  import PptDialog from './components/PptDialog.vue';
  import { downloadFileUtil, formatListDate } from '@/utils/common';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';
  import { deletePPTAsync, getPPTCategoryListAsync, pptListAsync } from '@/http/api/pptTemplate';

  const row = ref<any>(null);
  const title = ref<string>('新增模板');

  // 查询ppt模板列表
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  let tableData = ref<any>([]);
  const pptList = async () => {
    let params = {
      page: page.value,
      limit: limit.value
    };
    const data = await pptListAsync(params);
    if (data.data.status === 200) {
      tableData.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      console.log('tableData', tableData);
    } else {
      ElMessage.error(data.data.message);
    }
  };
  pptList();
  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    pptList();
  };

  // 查询ppt模板分类列表
  const categoryList = ref<any>(null);
  const getPPTCategoryList = async () => {
    const data = await getPPTCategoryListAsync();
    if (data.status === 200) {
      categoryList.value = data.data.map((item: any) => {
        return {
          value: item._id,
          label: item.name
        };
      });
    } else {
      ElMessage.error(data.message);
    }
  };
  getPPTCategoryList();

  // 返回分类名称
  const categoryLabel = (list: any) => {
    let cateArr: Array<string> = [];
    list.forEach((listItem: any) => {
      categoryList.value.forEach((item: any) => {
        if (item.value === listItem) {
          cateArr.push(item.label);
        }
      });
    });

    return cateArr.join('、');
  };

  // 下载文件
  const downloadFile = (url: string) => {
    downloadFileUtil(url);
  };

  const dialogPPTVisible = ref<boolean>(false);
  // 打开弹窗
  const openAddDialog = () => {
    console.log('打开弹窗');
    title.value = '新增模板';
    dialogPPTVisible.value = true;
  };

  // 取消审核弹窗
  const cancle = () => {
    dialogPPTVisible.value = false;
  };

  // 提交成功
  const updateSuccess = () => {
    dialogPPTVisible.value = false;
    pptList();
  };

  // 删除模板
  const deleteTemplate = (row: any) => {
    ElMessageBox.confirm('删除该模板后无法恢复，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const data = await deletePPTAsync(row._id);
        if (data.data.status === 200) {
          ElMessage.success('删除成功');
          pptList();
        } else {
          ElMessage.error(data.data.message);
        }
      })
      .catch(() => {});
  };

  // 编辑模板
  const edit = (rowItem: any) => {
    title.value = '修改模板';
    row.value = rowItem;
    dialogPPTVisible.value = true;
  };
</script>
<style lang="scss" scoped>
  .ppt-template-list-box {
    display: flex;
    flex-direction: column;
  }
  .template-list-table {
    margin-top: 20px;
    .preview-box-div {
      display: flex;
      overflow: auto;
      .preview-img {
        max-width: 100px;
      }
    }

    .file-url-link {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
</style>
