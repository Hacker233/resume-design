<template>
  <div class="comment-list-box">
    <!-- 查询表单 -->
    <el-form :inline="true" :model="formInline" class="comment-form-inline" size="default">
      <el-form-item>
        <el-select v-model="formInline.isDelete" placeholder="请选择是否删除">
          <el-option
            v-for="(item, index) in isDeleteOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.commentType" placeholder="评论所属类型">
          <el-option
            v-for="(item, index) in commentTypeOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="initCommentList">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格列表 -->
    <el-table
      class="template-list-table"
      :data="tableData"
      style="width: 100%"
      size="default"
      border
    >
      <el-table-column prop="email" label="用户邮箱" />
      <el-table-column prop="username" label="用户昵称" />
      <el-table-column prop="avatar" label="头像">
        <template #default="scope">
          <el-avatar :size="50" :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="comment_type" label="评论所属">
        <template #default="scope">
          <div>{{ commentType[scope.row.comment_type].label }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="like" label="点赞数" />
      <el-table-column prop="content" label="是否被删除">
        <template #default="scope">
          <el-tag v-if="!scope.row.is_delete" type="success" size="default">正常</el-tag>
          <el-tag v-else type="danger" size="default">已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="评论内容">
        <template #default="scope">
          <div v-dompurify-html="scope.row.content"> </div>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="评论日期">
        <template #default="scope">
          <div>
            {{ formatListDate(scope.row.createDate) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template #default="scope">
          <el-button
            v-if="!scope.row.is_delete"
            type="primary"
            size="small"
            @click="deleteComment(scope.row)"
            >删除</el-button
          >
          <el-button v-else type="primary" size="small" @click="recoverComment(scope.row)"
            >恢复</el-button
          >
          <el-button type="primary" size="small" @click="toDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 删除评论弹窗 -->
  <delete-comment-dialog
    :dialog-delete-visible="dialogDeleteVisible"
    :row="row"
    @cancle="cancle"
    @update-success="updateSuccess"
  ></delete-comment-dialog>

  <!-- 分页组件 -->
  <Pagination
    :total="total"
    :limit="limit"
    :current-page="currentPage"
    @handle-current-change="handleCurrentChange"
  ></Pagination>
</template>
<script lang="ts" setup>
  import { getAllCommentPageAsync, recoverCommentByAdminAsync } from '@/http/api/comment';
  import { formatListDate } from '@/utils/common';
  import { commentType } from '@/dictionary/commentType';
  import { toCommentDetail } from '@/utils/commentToDetail';
  import DeleteCommentDialog from './components/DeleteCommentDialog.vue';

  // 表单查询
  const formInline = reactive({
    isDelete: '', // 是否删除
    commentType: '' // 评论类型
  });

  // 是否删除下拉
  const isDeleteOptions = reactive<Array<any>>([
    {
      label: '已删除',
      value: true
    },
    {
      label: '未删除',
      value: false
    }
  ]);

  // 评论所属类型下拉
  const commentTypeOptions = reactive<Array<any>>([
    {
      label: '在线简历',
      value: 'resumeOnline'
    },
    {
      label: '简历模板',
      value: 'resumeTemplate'
    },
    {
      label: '软件分享',
      value: 'soft'
    }
  ]);

  // 获取评论列表
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const tableData = ref<any>([]);
  const initCommentList = async () => {
    let params = {
      page: page.value,
      limit: limit.value,
      isDelete: formInline.isDelete,
      commentType: formInline.commentType
    };
    const data = await getAllCommentPageAsync(params);
    if (data.data.status === 200) {
      tableData.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      console.log('tableData', tableData);
    } else {
      ElMessage.error(data.data.message);
    }
  };
  initCommentList();

  // 重置
  const resetForm = () => {
    formInline.commentType = '';
    formInline.isDelete = '';
    page.value = 1;
    currentPage.value = 1;
    initCommentList();
  };

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    initCommentList();
  };

  // 取消弹窗
  const cancle = () => {
    dialogDeleteVisible.value = false;
  };

  // 提交成功
  const updateSuccess = () => {
    dialogDeleteVisible.value = false;
    initCommentList();
  };

  // 删除评论
  const dialogDeleteVisible = ref<boolean>(false);
  const row = ref<any>(null);
  const deleteComment = (rowItem: any) => {
    dialogDeleteVisible.value = true;
    row.value = rowItem;
  };

  // 恢复一条评论
  const recoverComment = async (row: any) => {
    const params = {
      id: row._id
    };

    const data = await recoverCommentByAdminAsync(params);
    if (data.data.status === 200) {
      ElMessage({
        type: 'success',
        message: '恢复成功'
      });
      initCommentList();
    } else {
      ElMessage.error(data.data.message);
    }
  };

  // 跳转至评论详情
  const router = useRouter();
  const toDetail = (item: any) => {
    toCommentDetail(item, router);
  };
</script>
