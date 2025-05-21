<template>
  <!-- 查询表单 -->
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="default">
    <el-form-item label="付费金额大于（元）：">
      <el-input-number v-model="formInline.money" :min="0" :max="1000000" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button @click="resetForm">重置</el-button>
      <el-button type="primary" size="default" @click="openAddDialog"> 新增付费用户 </el-button>
    </el-form-item>
  </el-form>

  <!-- 表格列表 -->
  <el-table class="template-list-table" :data="payList" style="width: 100%" size="default" border>
    <el-table-column prop="email" label="用户邮箱" />
    <el-table-column prop="forever" label="是否永久版">
      <template #default="scope">
        <el-tag v-if="scope.row.forever" type="success">是</el-tag>
        <el-tag v-else type="danger">否</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="付费类型">
      <template #default="scope">
        <div> {{ payType(scope.row.type) }} </div>
      </template>
    </el-table-column>
    <el-table-column prop="money" label="付费金额">
      <template #default="scope">
        <div> {{ scope.row.money }}元 </div>
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
  <!-- 新增和编辑分类弹窗 -->
  <pay-dialog
    :dialog-pay-visible="dialogPayVisible"
    :row="row"
    :title="title"
    :btn-text="btnText"
    @cancle="cancle"
    @update-success="updateSuccess"
  ></pay-dialog>

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
  import PayDialog from './components/PayDialog.vue';
  import { formatListDate } from '@/utils/common';
  import { ElMessageBox } from 'element-plus';
  import { getPaystatsListAsync, paystatsDeleteAsync } from '@/http/api/pay';
  import 'element-plus/es/components/message-box/style/index';
  import { usePayTypeList } from '@/hooks/usePayTypeList';

  const dialogPayVisible = ref<boolean>(false);
  const row = ref<any>(null);
  const title = ref<string>('title');
  const btnText = ref<string>('添加');

  // 表单查询
  const formInline = reactive({
    money: 0
  });

  // 付费类型映射
  const payTypeList = usePayTypeList();
  const payType = (val: string) => {
    for (let index = 0; index < payTypeList.length; index++) {
      if (payTypeList[index].value === val) {
        return payTypeList[index].label;
      }
    }
  };

  // 打开弹窗
  const openAddDialog = () => {
    btnText.value = '添加';
    title.value = '添加用户';
    dialogPayVisible.value = true;
  };

  // 取消弹窗
  const cancle = () => {
    dialogPayVisible.value = false;
  };

  // 提交成功
  const updateSuccess = () => {
    dialogPayVisible.value = false;
    getPaystatsList();
  };

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getPaystatsList();
  };

  // 改变每页数量
  const handleSizeChange = (pageSize: number) => {
    limit.value = pageSize;
    console.log('改变每页数量', pageSize);
    getPaystatsList();
  };

  // 查询付费列表
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  let payList = ref<any>([]);
  const getPaystatsList = async () => {
    let params = {
      page: page.value,
      limit: limit.value,
      money: formInline.money
    };
    const data = await getPaystatsListAsync(params);
    if (data.data.status === 200) {
      payList.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      console.log('payList', payList);
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getPaystatsList();

  // 点击查询
  const onSubmit = () => {
    page.value = 1;
    currentPage.value = 1;
    getPaystatsList();
  };

  // 重置
  const resetForm = () => {
    formInline.money = 0;
    page.value = 1;
    currentPage.value = 1;
    getPaystatsList();
  };

  // 编辑
  const edit = (item: any) => {
    btnText.value = '修改';
    title.value = '修改分类';
    row.value = item;
    dialogPayVisible.value = true;
  };

  // 删除付费用户
  const deleteTemplate = (row: any) => {
    ElMessageBox.confirm('删除该付费用户后无法恢复，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const data = await paystatsDeleteAsync(row._id);
        if (data.data.status === 200) {
          ElMessage.success('删除成功');
          getPaystatsList();
        } else {
          ElMessage.error(data.data.message);
        }
      })
      .catch(() => {});
  };
</script>
