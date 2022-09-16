<template>
  <el-table class="template-list-table" :data="tableData" style="width: 100%" size="default" border>
    <el-table-column prop="id" label="id" />
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="link" label="跳转链接" />
    <el-table-column prop="vaild" label="是否审核通过">
      <template #default="scope">
        <el-tag v-if="scope.row.vaild === '已通过'" type="success" size="default">{{
          scope.row.vaild
        }}</el-tag>
        <el-tag v-else type="danger" size="default">{{ scope.row.vaild }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="logo_url" label="logo">
      <template #default="scope">
        <el-avatar :size="100" shape="square" :src="scope.row.logo_url" />
      </template>
    </el-table-column>
    <el-table-column prop="sponsor_img" label="支付凭证">
      <template #default="scope">
        <img class="preview-img" :src="scope.row.sponsor_img" alt="" srcset="" />
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
  </el-table>

  <!-- 分页组件 -->
  <Pagination
    :total="total"
    :limit="limit"
    @handle-current-change="handleCurrentChange"
  ></Pagination>
</template>
<script lang="ts" setup>
  import { formatListDate } from '@/utils/common';
  import Pagination from '@/components/Pagination/pagination.vue';
  import { getSponsorListAsync } from '@/http/api/sponsor';
  import 'element-plus/es/components/message-box/style/index';
  let tableData = ref<any>([]);

  // 获取用户列表
  const page = ref<number>(1);
  const limit = ref<number>(15);
  const total = ref<number>(0);
  const getSponsorList = async () => {
    let params = {
      page: page.value,
      limit: limit.value
    };
    const data = await getSponsorListAsync(params);
    if (data.status === 200) {
      tableData.value = data.data.list;
      total.value = data.data.page.count;
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
          vaild: item.vaild ? '已通过' : '未通过',
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
</script>
<style lang="scss" scoped>
  .preview-img {
    max-width: 100px;
    cursor: pointer;
  }
</style>
