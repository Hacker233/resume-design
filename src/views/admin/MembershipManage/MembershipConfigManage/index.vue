<template>
  <!-- 查询表单 -->
  <el-form :inline="true" class="demo-form-inline" size="default">
    <el-form-item>
      <el-button type="primary" @click="onCreate">新增会员项</el-button>
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
    <el-table-column prop="type" label="会员类型">
      <template #default="scope">
        <div class="membership-type-box">
          <el-tag type="success" size="default">{{ scope.row.membershipName }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="durationDays" label="会员天数">
      <template #default="scope">
        <span>{{ scope.row.durationDays }}天</span>
      </template>
    </el-table-column>
    <el-table-column prop="price" label="会员当前价格">
      <template #default="scope">
        <span>{{ scope.row.price }}￥</span>
      </template>
    </el-table-column>
    <el-table-column prop="originalPrice" label="会员原价">
      <template #default="scope">
        <span>{{ scope.row.originalPrice }}￥</span>
      </template>
    </el-table-column>
    <el-table-column prop="createDate" label="创建日期" sortable>
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
    <el-table-column label="操作" width="140">
      <template #default="scope">
        <el-button link size="small" @click="edit(scope.row)">编辑</el-button>
        <el-button link type="primary" size="small" @click="deleteMembership(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <!-- 编辑或新增弹窗 -->
  <add-and-edit-dialog
    :dialog-membership-visible="dialogMembershipVisible"
    :row="row"
    :title="title"
    @cancle="cancle"
    @update-success="updateSuccess"
  ></add-and-edit-dialog>
</template>
<script lang="ts" setup>
  import { formatListDate } from '@/utils/common';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';
  import AddAndEditDialog from './components/AddAndEditDialog.vue';
  import { deleteMembershipConfigAsync, getMembershipConfigsAsync } from '@/http/api/membership';
  let tableData = ref<any>([]);

  // 当选择项发生变化时会触发该事件
  const multipleSelection = ref<any>([]);
  const handleSelectionChange = (val: any) => {
    multipleSelection.value = val;
    console.log('当前选中项', multipleSelection.value, val.updateDate);
  };

  // 获取会员配置列表
  const getMembershipConfigs = async () => {
    const data = await getMembershipConfigsAsync();
    if (data.data.status === 200) {
      tableData.value = data.data.data;
      console.log('tableData', tableData);
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getMembershipConfigs();

  // 打开会员修改弹窗
  const title = ref<string>('新增会员项');
  const row = ref<any>(null);
  const dialogMembershipVisible = ref<boolean>(false);
  const edit = (rowData: any) => {
    row.value = rowData;
    title.value = '编辑会员项';
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
    getMembershipConfigs();
    dialogMembershipVisible.value = false;
  };

  // 点击删除
  const deleteMembership = (row: any) => {
    ElMessageBox.confirm('删除该会员项，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const data = await deleteMembershipConfigAsync(row._id);
        if (data.data.status === 200) {
          ElMessage({
            type: 'success',
            message: '删除成功'
          });
          getMembershipConfigs();
        } else {
          ElMessage.error(data.data.message);
        }
      })
      .catch(() => {});
  };
</script>
<style lang="scss" scoped>
  :deep(.membership-type-box) {
    display: flex;
    align-items: center;
  }
</style>
