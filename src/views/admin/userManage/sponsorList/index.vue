<template>
  <el-table class="template-list-table" :data="tableData" style="width: 100%" size="default" border>
    <el-table-column prop="id" label="id" />
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="vx" label="微信" />
    <el-table-column prop="link" label="跳转链接" />
    <el-table-column prop="vaild" label="是否审核通过">
      <template #default="scope">
        <el-tag v-if="scope.row.vaildLabel === '已通过'" type="success" size="default">{{
          scope.row.vaildLabel
        }}</el-tag>
        <el-tag v-else type="danger" size="default">{{ scope.row.vaildLabel }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="logo_url" label="logo">
      <template #default="scope">
        <el-avatar :size="100" shape="square" :src="scope.row.logo_url" />
      </template>
    </el-table-column>
    <el-table-column prop="sponsor_img" label="支付凭证">
      <template #default="scope">
        <div v-viewer>
          <img class="preview-img" :src="scope.row.sponsor_img" alt="" srcset="" />
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="createDate" label="注册日期" sortable>
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
        <el-button type="primary" size="small" @click="audit(scope.row)">审核</el-button>
        <el-button type="primary" size="small" @click="deleteSponsor(scope.row)">删除</el-button>
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

  <!-- 审核弹窗 -->
  <audit-dialog-vue
    :dialog-audit-visible="dialogAuditVisible"
    :row="row"
    @cancle="cancleAudit"
    @update-success="updateAuditSuccess"
  ></audit-dialog-vue>
</template>
<script lang="ts" setup>
  import { formatListDate } from '@/utils/common';
  import Pagination from '@/components/Pagination/pagination.vue';
  import { deleteSponsorAsync, getSponsorListAsync } from '@/http/api/sponsor';
  import 'element-plus/es/components/message-box/style/index';
  import AuditDialogVue from './components/AuditDialog.vue';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';

  let tableData = ref<any>([]);

  // 获取用户列表
  const page = ref<number>(1);
  const limit = ref<number>(15);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const getSponsorList = async () => {
    let params = {
      page: page.value,
      limit: limit.value
    };
    const data = await getSponsorListAsync(params);
    if (data.status === 200) {
      tableData.value = data.data.list;
      total.value = data.data.page.count;
      currentPage.value = data.data.page.currentPage;
      // 过滤数据
      tableData.value = tableData.value.map((item: any) => {
        return {
          id: item._id,
          createDate: item.createDate,
          email: item.email,
          link: item.link,
          logo_url: item.logo_url,
          name: item.name,
          sponsor_img: item.sponsor_img,
          updateDate: item.updateDate,
          vaildLabel: item.vaild ? '已通过' : '未通过',
          vaild: item.vaild,
          vx: item.vx
        };
      });
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getSponsorList();

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    console.log('页码改变', currentPage);
    getSponsorList();
  };

  // 打开审核弹窗
  const row = ref<any>(null);
  const dialogAuditVisible = ref<boolean>(false);
  const audit = (rowData: any) => {
    row.value = rowData;
    console.log('row', row.value);
    dialogAuditVisible.value = true;
  };
  // 取消审核弹窗
  const cancleAudit = () => {
    dialogAuditVisible.value = false;
  };

  // 审核成功
  const updateAuditSuccess = () => {
    getSponsorList();
    dialogAuditVisible.value = false;
  };

  // 删除赞助
  const deleteSponsor = (rowItem: any) => {
    ElMessageBox.confirm('删除该赞助后无法恢复，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        console.log('rowItem', rowItem);
        const data = await deleteSponsorAsync(rowItem.id);
        if (data.data.status === 200) {
          ElMessage.success('删除成功');
          getSponsorList();
        } else {
          ElMessage.error(data.data.message);
        }
      })
      .catch(() => {});
  };
</script>
<style lang="scss" scoped>
  .preview-img {
    max-width: 100px;
    cursor: pointer;
  }
</style>
