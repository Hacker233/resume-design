<template>
  <!-- 查询表单 -->
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="default">
    <el-form-item label="是否收费：">
      <el-select v-model="formInline.model_is_free" placeholder="请选择是否收费">
        <el-option label="全部" :value="null" />
        <el-option label="免费" :value="true" />
        <el-option label="收费" :value="false" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button @click="resetForm">重置</el-button>
      <el-button type="primary" size="default" @click="openAddDialog"> 新增模型 </el-button>
    </el-form-item>
  </el-form>

  <!-- 表格列表 -->
  <el-table class="model-list-table" :data="aiModelList" style="width: 100%" size="default" border>
    <el-table-column prop="model_name" label="模型名称" />
    <el-table-column prop="model_description" label="模型描述" />
    <el-table-column prop="model_is_free" label="是否收费">
      <template #default="scope">
        <el-tag v-if="scope.row.model_is_free" type="success" size="default">免费</el-tag>
        <el-tag v-else type="warning" size="default">收费</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="model_api" label="模型API" />
    <el-table-column prop="model_key" label="模型KEY" />
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
        <el-button link type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 新增和编辑弹窗 -->
  <add-and-edit-dialog
    :dialog-pay-visible="dialogAiModelVisible"
    :row="row"
    :title="title"
    :btn-text="btnText"
    @cancle="cancle"
    @update-success="updateSuccess"
  ></add-and-edit-dialog>

  <!-- 分页组件 -->
  <Pagination
    :total="total"
    :limit="limit"
    is-page-sizes
    :current-page="currentPage"
    @handle-current-change="handleCurrentChange"
    @handle-size-change="handleSizeChange"
  ></Pagination>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import AddAndEditDialog from './components/AddAndEditDialog.vue';
  import { formatListDate } from '@/utils/common';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { aiModelListAsync, deleteModelAsync } from '@/http/api/ai';

  // 弹窗相关
  const dialogAiModelVisible = ref<boolean>(false);
  const row = ref<any>(null);
  const title = ref<string>('新增模型');
  const btnText = ref<string>('添加');

  // 查询表单
  const formInline = reactive({
    model_is_free: null // 是否收费：null（全部），true（免费），false（收费）
  });

  // 分页相关
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);

  // 模型列表
  const aiModelList = ref<any>([]);

  // 获取模型列表
  const getAiModelList = async () => {
    try {
      const params = {
        page: page.value,
        limit: limit.value,
        model_is_free: formInline.model_is_free // 添加是否收费查询条件
      };
      const response = await aiModelListAsync(params);
      if (response.data.status === 200) {
        aiModelList.value = response.data.data.list;
        total.value = response.data.data.page.count;
        currentPage.value = response.data.data.page.currentPage;
      } else {
        ElMessage.error(response.data.message);
      }
    } catch (error) {
      ElMessage.error('获取模型列表失败');
    }
  };

  // 初始化加载列表
  getAiModelList();

  // 查询
  const onSubmit = () => {
    page.value = 1;
    currentPage.value = 1;
    getAiModelList();
  };

  // 重置
  const resetForm = () => {
    formInline.model_is_free = null;
    page.value = 1;
    currentPage.value = 1;
    getAiModelList();
  };

  // 打开新增弹窗
  const openAddDialog = () => {
    btnText.value = '添加';
    title.value = '新增模型';
    row.value = null;
    dialogAiModelVisible.value = true;
  };

  // 打开编辑弹窗
  const edit = (item: any) => {
    btnText.value = '修改';
    title.value = '修改模型';
    row.value = item;
    dialogAiModelVisible.value = true;
  };

  // 取消弹窗
  const cancle = () => {
    dialogAiModelVisible.value = false;
  };

  // 提交成功
  const updateSuccess = () => {
    dialogAiModelVisible.value = false;
    getAiModelList();
  };

  // 分页事件
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getAiModelList();
  };

  const handleSizeChange = (pageSize: number) => {
    limit.value = pageSize;
    getAiModelList();
  };

  // 删除模型
  const handleDelete = async (item: any) => {
    try {
      // 确认弹窗
      await ElMessageBox.confirm('确定要删除该模型吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      });

      // 调用删除接口
      const response = await deleteModelAsync(item._id);
      if (response.data.status === 200) {
        ElMessage.success('删除成功');
        getAiModelList(); // 重新加载列表
      } else {
        ElMessage.error(response.data.message);
      }
    } catch (error) {
      // 用户点击取消时，不执行删除操作
      if (error !== 'cancel') {
        ElMessage.error('删除失败');
      }
    }
  };
</script>

<style lang="scss" scoped>
  .demo-form-inline {
    margin-bottom: 20px;
  }
</style>
