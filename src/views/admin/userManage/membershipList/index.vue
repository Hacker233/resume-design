<template>
  <!-- 查询表单 -->
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="default">
    <el-form-item label="用户邮箱：">
      <el-input v-model="formInline.queryEmail" placeholder="用户邮箱" />
    </el-form-item>
    <el-form-item label="所属组织：">
      <el-select
        v-model="formInline.organizationId"
        placeholder="请选择组织"
        size="default"
        clearable
      >
        <el-option
          v-for="item in organizationList"
          :key="item.id"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onCreate">新增会员</el-button>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button @click="resetForm">重置</el-button>
      <!-- <el-tooltip :disabled="multipleSelection.length > 0" effect="light" content="请先选择用户">
        <el-button :disabled="multipleSelection.length <= 0" @click="sendEmailToSelectedUsers"
          >发送邮件</el-button
        >
      </el-tooltip>
      <el-button @click="sendEmailToAllUsers">发送全体邮件</el-button> -->
    </el-form-item>
  </el-form>

  <el-table
    class="template-list-table"
    :data="tableData"
    style="width: 100%"
    size="default"
    row-key="email"
    border
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="50" align="center" :reserve-selection="true" />
    <el-table-column label="序号" prop="serialNumber" width="60" align="center"></el-table-column>
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="type" label="会员类型">
      <template #default="scope">
        <div class="membership-type-box">
          <el-tag type="success" size="default">{{ typeListDic[scope.row.type] }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="tradeNo" label="订单号">
      <template #default="scope">
        <span v-if="scope.row.tradeNo">
          {{ scope.row.tradeNo }}
        </span>
        <span v-else>-</span>
      </template>
    </el-table-column>
    <el-table-column prop="outTradeNo" label="商户订单号">
      <template #default="scope">
        <span v-if="scope.row.outTradeNo">
          {{ scope.row.outTradeNo }}
        </span>
        <span v-else>-</span>
      </template>
    </el-table-column>
    <el-table-column prop="channelType" label="开通渠道">
      <template #default="scope">
        <div class="membership-type-box">
          <el-tag v-if="scope.row.channelType" type="success" size="default">{{
            channelTypeDic[scope.row.channelType as keyof typeof channelTypeDic]
          }}</el-tag>
          <span v-else>-</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="startDate" label="开通日期" sortable>
      <template #default="scope">
        <div>
          {{ formatListDate(scope.row.startDate) }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="endDate" label="到期日期" sortable>
      <template #default="scope">
        <div>
          {{ formatListDate(scope.row.endDate) }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="isExpired" label="是否到期">
      <template #default="scope">
        <el-tag v-if="scope.row.isExpired" type="danger" size="default">已到期</el-tag>
        <el-tag v-else type="success" size="default">正常</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="daysRemaining" label="剩余天数">
      <template #default="scope">
        <span>{{ scope.row.daysRemaining }}天</span>
      </template>
    </el-table-column>
    <el-table-column prop="organization" label="所属组织" sortable>
      <template #default="scope">
        <div>
          {{ scope.row.organization || '-' }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="140">
      <template #default="scope">
        <el-button link size="small" @click="edit(scope.row)">编辑</el-button>
        <el-button link type="primary" size="small" @click="deleteMembership(scope.row)"
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

  <!-- 编辑或新增弹窗 -->
  <add-and-edit-dialog
    :dialog-membership-visible="dialogMembershipVisible"
    :row="row"
    :title="title"
    :type-list="typeList"
    @cancle="cancle"
    @update-success="updateSuccess"
  ></add-and-edit-dialog>
</template>
<script lang="ts" setup>
  import { formatListDate } from '@/utils/common';
  import Pagination from '@/components/Pagination/pagination.vue';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';
  import AddAndEditDialog from './components/AddAndEditDialog.vue';
  import {
    deleteMembershipAsync,
    getMembershipConfigsAsync,
    getMembershipListAsync
  } from '@/http/api/membership';
  import { getOrgListAsync } from '@/http/api/organization';
  let tableData = ref<any>([]);

  // 表单查询
  const formInline = reactive({
    queryEmail: '',
    organizationId: ''
  });

  // 查询
  const onSubmit = () => {
    page.value = 1;
    currentPage.value = 1;
    getMembershipList();
  };

  // 重置
  const resetForm = () => {
    formInline.queryEmail = '';
    formInline.organizationId = '';
    page.value = 1;
    currentPage.value = 1;
    getMembershipList();
  };

  // 当选择项发生变化时会触发该事件
  const multipleSelection = ref<any>([]);
  const handleSelectionChange = (val: any) => {
    multipleSelection.value = val;
    console.log('当前选中项', multipleSelection.value, val.updateDate);
  };

  // 查询组织列表
  const organizationList = ref<any>([]);
  const getOrgList = async () => {
    // 查询组织列表
    const params = {
      limit: 1000,
      page: 1
    };
    const data = await getOrgListAsync(params);
    if (data.data.status === 200) {
      organizationList.value = data.data.data.list.map((item: any) => {
        return {
          label: item.name,
          value: item._id
        };
      });
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getOrgList();

  // 获取会员用户列表
  const page = ref<number>(1);
  const limit = ref<number>(15);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const getMembershipList = async () => {
    let params = {
      email: formInline.queryEmail,
      organizationId: formInline.organizationId,
      page: page.value,
      limit: limit.value
    };
    const data = await getMembershipListAsync(params);
    if (data.data.status === 200) {
      tableData.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      // 过滤数据
      tableData.value = tableData.value.map((item: any, index: number) => {
        return {
          _id: item._id,
          email: item.email,
          createDate: item.createDate,
          updateDate: item.updateDate || '-',
          type: item.type, // 会员类型
          startDate: item.startDate,
          endDate: item.endDate,
          isExpired: item.isExpired,
          daysRemaining: item.daysRemaining, // 剩余天数
          channelType: item.channelType, // 开通渠道
          outTradeNo: item.outTradeNo, // 商户订单号
          tradeNo: item.tradeNo, // 订单号
          serialNumber: limit.value * (page.value - 1) + index + 1, // 序号
          organization: item.organization // 所属组织
        };
      });
      console.log('tableData', tableData);
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getMembershipList();

  // 打开会员修改弹窗
  const title = ref<string>('新增会员记录');
  const row = ref<any>(null);
  const dialogMembershipVisible = ref<boolean>(false);
  const edit = (rowData: any) => {
    row.value = rowData;
    title.value = '编辑会员记录';
    dialogMembershipVisible.value = true;
  };

  // 打开新增会员弹窗
  const onCreate = () => {
    row.value = null;
    title.value = '新增会员记录';
    dialogMembershipVisible.value = true;
  };

  // 关闭弹窗
  const cancle = () => {
    row.value = null;
    dialogMembershipVisible.value = false;
  };

  // 更新成功
  const updateSuccess = () => {
    getMembershipList();
    dialogMembershipVisible.value = false;
  };

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    console.log('页码改变', currentPage);
    getMembershipList();
  };

  // 改变每页数量
  const handleSizeChange = (pageSize: number) => {
    limit.value = pageSize;
    console.log('改变每页数量', pageSize);
    getMembershipList();
  };

  // 点击删除
  const deleteMembership = (row: any) => {
    ElMessageBox.confirm('删除该用户会员记录后用户将失去会员资格，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const data = await deleteMembershipAsync(row._id);
        if (data.data.status === 200) {
          ElMessage({
            type: 'success',
            message: '删除成功'
          });
          getMembershipList();
        } else {
          ElMessage.error(data.data.message);
        }
      })
      .catch(() => {});
  };

  const channelTypeDic = {
    '1': '支付宝',
    '2': '微信',
    '3': '管理员'
  };

  // 获取会员类型列表
  const typeList = ref<any>([]);
  const typeListDic = reactive<any>({});
  const getMembershipConfigs = async () => {
    const data = await getMembershipConfigsAsync();
    if (data.data.status === 200) {
      typeList.value = data.data.data;
      data.data.data.forEach((item: any) => {
        typeListDic[item.type] = item.membershipName;
      });

      console.log('tableData', tableData);
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getMembershipConfigs();
</script>
<style lang="scss" scoped>
  :deep(.membership-type-box) {
    display: flex;
    align-items: center;
  }
</style>
