<template>
  <div class="integral-list-box">
    <!-- 查询表单 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="default">
      <el-form-item label="用户邮箱：">
        <el-input v-model="formInline.queryEmail" placeholder="用户邮箱" />
      </el-form-item>
      <el-form-item label="简币类型:" prop="type">
        <el-select v-model="formInline.integralType" placeholder="请选择付费类型">
          <el-option
            v-for="(item, index) in integralTypeList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="formInline.createDate"
          type="date"
          placeholder="请选择日期"
          size="default"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
        <!-- 新增简币记录 -->
        <el-button type="primary" @click="openDialog">增加记录</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格列表 -->
    <el-table
      class="article-list-table"
      :data="tableData"
      style="width: 100%"
      size="default"
      border
    >
      <el-table-column prop="_id" label="id" />
      <el-table-column prop="integral_user_email" label="用户邮箱" />
      <el-table-column prop="integral_type" label="类型">
        <template #default="scope">
          <el-tag v-if="scope.row.integral_type === '1'" type="success" size="default"
            >获取简币</el-tag
          >
          <el-tag v-else type="danger" size="default">消费简币</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="integral_reason" label="具体原因" />
      <el-table-column prop="integral_value" label="简币值">
        <template #default="scope">
          <div class="integral-value-box">
            <span>{{ getFormatIntegral(scope.row.integral_value) }}</span>
            <img
              width="24"
              src="@/assets/images/jianB.png"
              alt="简币"
              title="简币 - 您的专属虚拟货币"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="integral_pay_goods_id" label="消费简币资源id">
        <template #default="scope">
          <span v-if="scope.row.integral_pay_goods_id">{{ scope.row.integral_pay_goods_id }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="integral_add_goods_id" label="获得简币资源id">
        <template #default="scope">
          <span v-if="scope.row.integral_add_goods_id">{{ scope.row.integral_add_goods_id }}</span>
          <span v-else>-</span>
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
      <!-- 操作区域 -->
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="deleteIntegral(scope.row)"
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

    <!-- 新增简币记录弹窗 -->
    <integral-log-dialog
      :dialog-intergal-log-visible="dialogIntergalLogVisible"
      @cancle="cancleDialog"
      @update-success="successDialog"
    ></integral-log-dialog>
  </div>
</template>
<script lang="ts" setup>
  import { getAllIntegralListAsync, integralDeleteAsync } from '@/http/api/integral';
  import { formatListDate } from '@/utils/common';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';
  import IntegralLogDialog from './components/IntegralLogDialog.vue';

  // 表单查询
  const formInline = reactive({
    queryEmail: '',
    integralType: '', // 消费还是获取
    createDate: ''
  });

  // 简币类型
  const integralTypeList = reactive([
    {
      label: '消费简币',
      value: '2'
    },
    {
      label: '获取简币',
      value: '1'
    }
  ]);
  // 查询所有简币列表
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  let tableData = ref<any>([]);
  const getAllIntegralList = async () => {
    let params = {
      integralType: formInline.integralType,
      email: formInline.queryEmail,
      createDate: formInline.createDate,
      page: page.value,
      limit: limit.value
    };
    const data = await getAllIntegralListAsync(params);
    if (data.data.status === 200) {
      tableData.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      console.log('tableData', tableData);
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getAllIntegralList();

  // 查询
  const onSubmit = () => {
    page.value = 1;
    currentPage.value = 1;
    getAllIntegralList();
  };

  // 重置
  const resetForm = () => {
    formInline.integralType = '';
    formInline.queryEmail = '';
    page.value = 1;
    currentPage.value = 1;
    getAllIntegralList();
  };

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getAllIntegralList();
  };

  // 改变每页数量
  const handleSizeChange = (pageSize: number) => {
    limit.value = pageSize;
    console.log('改变每页数量', pageSize);
    getAllIntegralList();
  };

  // 返回格式化后的简币展示
  const getFormatIntegral = (value: number) => {
    if (value > 0) {
      return '+' + value;
    } else {
      return value;
    }
  };

  // 删除简币记录
  const deleteIntegral = (row: any) => {
    ElMessageBox.confirm('删除后该条简币记录无法恢复，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const data = await integralDeleteAsync(row._id);
        if (data.data.status === 200) {
          ElMessage.success('删除成功');
          getAllIntegralList();
        } else {
          ElMessage.error(data.data.message);
        }
      })
      .catch(() => {});
  };

  // 打开记录弹窗
  const dialogIntergalLogVisible = ref<boolean>(false);
  const openDialog = () => {
    dialogIntergalLogVisible.value = true;
  };

  // 取消弹窗
  const cancleDialog = () => {
    dialogIntergalLogVisible.value = false;
  };

  // 弹窗提交成功
  const successDialog = () => {
    dialogIntergalLogVisible.value = false;
    getAllIntegralList();
  };
</script>
<style lang="scss" scoped>
  .integral-list-box {
    :deep(.integral-value-box) {
      display: flex;
      align-items: center;
      img {
        margin: 0 5px;
      }
    }
  }
</style>
