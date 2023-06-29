<template>
  <div class="integral-pay-config-box">
    <!-- 新增简币消费配置 -->
    <div class="top-box">
      <el-button type="primary" size="default" @click="openAddDialog"> 新增消费配置 </el-button>
    </div>
  </div>

  <!-- 表格列表 -->
  <el-table
    class="template-list-table"
    :data="configPayList"
    style="width: 100%"
    size="default"
    border
  >
    <el-table-column prop="integral_pay_type" label="消费类型" />
    <el-table-column prop="integral_pay_name" label="消费名称" />
    <el-table-column prop="integral_pay_num" label="消费数量" />
    <el-table-column prop="integral_pay_desc" label="消费描述" />
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
  <integral-pay-config-dialog
    :dialog-pay-visible="dialogPayVisible"
    :row="row"
    :title="title"
    :btn-text="btnText"
    @cancle="cancle"
    @update-success="updateSuccess"
  ></integral-pay-config-dialog>
</template>
<script lang="ts" setup>
  import IntegralPayConfigDialog from './components/IntegralPayConfigDialog.vue';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';
  import { deleteIntegralPayConfigAsync, getIntegralPayConfigAsync } from '@/http/api/integral';

  const dialogPayVisible = ref<boolean>(false);
  const row = ref<any>(null);
  const title = ref<string>('title');
  const btnText = ref<string>('添加');

  // 打开弹窗
  const openAddDialog = () => {
    row.value = null;
    btnText.value = '添加';
    title.value = '添加配置';
    dialogPayVisible.value = true;
  };

  // 取消弹窗
  const cancle = () => {
    dialogPayVisible.value = false;
  };

  // 提交成功
  const updateSuccess = () => {
    dialogPayVisible.value = false;
    getIntegralPayConfigList();
  };

  // 查询消费配置列表
  let configPayList = ref<any>([]);
  const getIntegralPayConfigList = async () => {
    const data = await getIntegralPayConfigAsync();
    if (data.data.status === 200) {
      configPayList.value = data.data.data;
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getIntegralPayConfigList();

  // 编辑
  const edit = (item: any) => {
    btnText.value = '修改';
    title.value = '修改配置';
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
        const data = await deleteIntegralPayConfigAsync(row._id);
        if (data.data.status === 200) {
          ElMessage.success('删除成功');
          getIntegralPayConfigList();
        } else {
          ElMessage.error(data.data.message);
        }
      })
      .catch(() => {});
  };
</script>
<style lang="scss" scoped>
  .integral-pay-config-box {
    .top-box {
      margin-bottom: 20px;
    }
  }
</style>
