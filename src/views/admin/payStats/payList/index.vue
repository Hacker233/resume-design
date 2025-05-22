<template>
  <!-- 查询表单 -->
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="default">
    <el-form-item label="付费金额大于（元）：">
      <el-input-number v-model="formInline.money" :min="0" :max="1000000" />
    </el-form-item>
    <el-form-item label="是否永久更新版：">
      <el-select v-model="formInline.forever" placeholder="请选择">
        <el-option label="是" value="true" />
        <el-option label="否" value="false" />
      </el-select>
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

  <!-- 永久用户卡片列表 -->
  <el-card class="forever-card-list" shadow="hover">
    <template #header>
      <div class="card-header flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-base font-medium"
            >永久版用户列表（共{{ foreverEmailList.length }}个）</span
          >
          <el-tag type="success" effect="dark" class="ml-2 rounded-md">
            <el-icon class="mr-1"><StarFilled /></el-icon>VIP
          </el-tag>
        </div>
        <el-button
          class="copy-btn"
          type="primary"
          :icon="DocumentCopy"
          size="small"
          style="margin-top: 10px"
          @click="copyEmails"
        >
          一键复制
        </el-button>
      </div>
    </template>

    <div class="card-container px-2">
      <el-row :gutter="8" class="!mx-0">
        <el-col
          v-for="(item, index) in foreverEmailList"
          :key="index"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          :xl="4"
          class="py-2!"
        >
          <el-card
            class="email-card transition-all duration-300 hover:-translate-y-1.5"
            shadow="hover"
            :body-style="{ padding: '10px 14px' }"
          >
            <div class="email-content flex items-center gap-3">
              <el-icon class="user-icon text-blue-500"><User /></el-icon>
              <el-tooltip :content="item.email" placement="top" effect="light">
                <el-text class="email-text text-sm font-medium text-gray-800" truncated>
                  {{ item.email }}
                </el-text>
              </el-tooltip>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
  import PayDialog from './components/PayDialog.vue';
  import { formatListDate } from '@/utils/common';
  import { ElMessageBox } from 'element-plus';
  import { getPaystatsListAsync, paystatsDeleteAsync } from '@/http/api/pay';
  import 'element-plus/es/components/message-box/style/index';
  import { usePayTypeList } from '@/hooks/usePayTypeList';
  import { ElMessage } from 'element-plus';
  import { DocumentCopy } from '@element-plus/icons-vue';

  const dialogPayVisible = ref<boolean>(false);
  const row = ref<any>(null);
  const title = ref<string>('title');
  const btnText = ref<string>('添加');

  // 表单查询
  const formInline = reactive({
    money: 0,
    forever: ''
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
      money: formInline.money,
      forever: formInline.forever
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

  // 查询所有的永久版付费用户列表
  const foreverEmailList = ref<any>([]);
  const getForeverEmailList = async () => {
    const data = await getPaystatsListAsync({ forever: true, page: 1, limit: 10000, money: 0 });
    if (data.data.status === 200) {
      foreverEmailList.value = data.data.data.list;
      console.log('foreverEmailList', foreverEmailList);
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getForeverEmailList();

  // 点击查询
  const onSubmit = () => {
    page.value = 1;
    currentPage.value = 1;
    getPaystatsList();
  };

  // 重置
  const resetForm = () => {
    formInline.money = 0;
    formInline.forever = '';
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

  // 复制邮箱列表
  const copyEmails = async () => {
    try {
      const emails = foreverEmailList.value.map((item: any) => item.email).join('; ');
      await navigator.clipboard.writeText(emails);
      ElMessage.success(`已复制${foreverEmailList.value.length}个邮箱到剪贴板`);
    } catch (error) {
      ElMessage.error('复制失败，请检查浏览器权限设置');
    }
  };
</script>
