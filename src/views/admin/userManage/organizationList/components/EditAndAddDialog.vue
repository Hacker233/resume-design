<!-- 新增组织弹窗 -->
<template>
  <el-dialog
    class="organization-dialog"
    :model-value="dialogOrgVisible"
    :title="title"
    width="700px"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="150px"
      label-position="left"
    >
      <el-form-item label="组织名称" prop="name">
        <el-input v-model="ruleForm.name" autocomplete="off" placeholder="请输入组织名称" />
      </el-form-item>
      <el-form-item label="组织描述" prop="description">
        <el-input v-model="ruleForm.description" autocomplete="off" placeholder="请输入组织描述" />
      </el-form-item>
      <el-form-item label="组织管理员" prop="adminIds">
        <el-select
          v-model="ruleForm.adminIds"
          filterable
          multiple
          remote
          reserve-keyword
          placeholder="请输入管理员邮箱或名称搜索"
          :remote-method="handleSearch"
          :loading="adminLoading"
          style="width: 100%"
        >
          <el-option
            v-for="user in userList"
            :key="user.email"
            :label="`${user.name} (${user.email})`"
            :value="user.email"
          ></el-option>
          <div v-if="adminLoading && userList.length > 0" class="loading-more">加载中...</div>
        </el-select>
      </el-form-item>
      <el-form-item label="组织创建时间" prop="startDate">
        <el-date-picker
          v-model="ruleForm.startDate"
          type="datetime"
          style="width: 100%"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="选择日期时间"
          :default-time="defaultTime"
        />
      </el-form-item>
      <el-form-item label="组织过期时间" prop="endDate">
        <el-date-picker
          v-model="ruleForm.endDate"
          type="datetime"
          style="width: 100%"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="选择日期时间"
          :default-time="defaultTime"
          :disabled-date="disabledEndDate"
        />
      </el-form-item>
      <el-form-item label="组织总支付金额" prop="totalPayment">
        <el-input-number v-model="ruleForm.totalPayment" :min="0" style="width: 100%" />
      </el-form-item>
      <el-form-item label="是否全部免费" prop="isAllFree">
        <el-switch v-model="ruleForm.isAllFree" :active-value="true" :inactive-value="false" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" :loading="sureLoading" @click="submit(ruleFormRef)">{{
          btnText
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { searchUsersAsync } from '@/http/api/user';
  import { addOrgAsync, updateOrgAsync } from '@/http/api/organization';
  import { FormInstance, FormRules } from 'element-plus';
  import { ElMessage } from 'element-plus';
  import moment from 'moment';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  const ruleFormRef = ref<FormInstance>();

  interface User {
    _id: string;
    name: string;
    email: string;
  }

  interface Organization {
    _id?: string;
    name: string;
    description: string;
    adminIds: string[];
    adminDetails: User[];
    startDate: string;
    endDate: string;
    totalPayment: number;
    isAllFree: boolean;
  }

  interface TDialog {
    dialogOrgVisible: boolean;
    row: any;
    btnText: string;
    title: string;
  }

  const props = withDefaults(defineProps<TDialog>(), {
    dialogOrgVisible: false,
    row: null,
    btnText: '添加',
    title: '新增组织'
  });

  // 默认时间设置为当前时间
  const defaultTime = [
    new Date(2000, 1, 1, new Date().getHours(), new Date().getMinutes(), new Date().getSeconds())
  ];

  // 表单填写数据
  const ruleForm = reactive<Organization>({
    name: '',
    description: '',
    adminIds: [],
    adminDetails: [],
    startDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    endDate: '',
    totalPayment: 0,
    isAllFree: false
  });

  const rules = reactive<FormRules<Organization>>({
    name: [{ required: true, message: '组织名称不能为空！', trigger: 'blur' }],
    description: [{ required: true, message: '组织描述不能为空！', trigger: 'blur' }],
    adminIds: [{ required: true, message: '请选择组织管理员', trigger: 'change' }],
    startDate: [{ required: true, message: '请选择组织创建时间', trigger: 'change' }],
    endDate: [
      { required: true, message: '请选择组织过期时间', trigger: 'change' },
      {
        validator: (_, value, callback) => {
          if (!value) {
            callback(new Error('请选择组织过期时间'));
          } else if (moment(value).isBefore(moment(ruleForm.startDate))) {
            callback(new Error('结束时间不能早于开始时间'));
          } else {
            callback();
          }
        },
        trigger: 'change'
      }
    ],
    totalPayment: [{ required: true, message: '请输入组织总支付金额', trigger: 'blur' }],
    isAllFree: [{ required: true, message: '请选择是否全部免费', trigger: 'change' }]
  });

  // 用户搜索相关
  const userList = ref<User[]>([]);
  const adminLoading = ref(false);
  const searchQuery = ref('');

  // 禁用结束日期早于开始日期的选项
  const disabledEndDate = (time: Date) => {
    return ruleForm.startDate && time < new Date(ruleForm.startDate);
  };

  // 加载管理员详情
  const loadAdminDetails = async (ids: string[]) => {
    try {
      if (ids.length === 0) {
        ruleForm.adminDetails = [];
        return;
      }
      const response = await searchUsersAsync({ ids: ids.join(',') });
      ruleForm.adminDetails = response.data.data.list || [];
    } catch (error) {
      console.error('加载管理员详情失败:', error);
      ruleForm.adminDetails = [];
    }
  };

  // 初始化表单数据
  const initFormData = () => {
    if (props.row) {
      Object.assign(ruleForm, {
        ...props.row,
        adminIds: props.row.admin || [],
        adminDetails: [],
        startDate: props.row.startDate || moment().format('YYYY-MM-DD HH:mm:ss')
      });
      loadAdminDetails(props.row.admin || []);
    } else {
      resetForm();
    }
  };

  // 重置表单
  const resetForm = () => {
    if (ruleFormRef.value) {
      ruleFormRef.value.resetFields();
    }
    Object.assign(ruleForm, {
      name: '',
      description: '',
      adminIds: [],
      adminDetails: [],
      startDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      endDate: '',
      totalPayment: 0,
      isAllFree: false
    });
  };

  // 监听adminIds变化，加载对应的用户详情
  watch(
    () => ruleForm.adminIds,
    (newIds) => {
      loadAdminDetails(newIds);
    },
    { deep: true }
  );

  watch(
    () => props.row,
    () => {
      initFormData();
    },
    { immediate: true, deep: true }
  );

  // 用户搜索
  const handleSearch = async (query: string) => {
    searchQuery.value = query;
    if (!query.trim()) {
      userList.value = [];
      return;
    }

    try {
      adminLoading.value = true;
      const response = await searchUsersAsync({
        keyword: searchQuery.value
      });
      userList.value = response.data.data.list || [];
    } catch (error) {
      ElMessage.error('用户搜索失败');
      console.error('搜索用户错误:', error);
    } finally {
      adminLoading.value = false;
    }
  };

  // 取消
  const cancle = () => {
    resetForm();
    emit('cancle');
  };

  // 提交
  const sureLoading = ref<boolean>(false);
  const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;

    try {
      await formEl.validate();
      sureLoading.value = true;

      let params: any = {
        name: ruleForm.name,
        description: ruleForm.description,
        admin: ruleForm.adminIds,
        startDate: ruleForm.startDate,
        endDate: ruleForm.endDate,
        totalPayment: ruleForm.totalPayment,
        isAllFree: ruleForm.isAllFree
      };

      let data;
      if (props.btnText === '新增') {
        data = await addOrgAsync(params);
      } else {
        params._id = props.row?._id;
        data = await updateOrgAsync(params);
      }

      if (data.data.status === 200) {
        ElMessage.success(`${props.btnText}成功`);
        emit('updateSuccess');
        resetForm();
      } else {
        ElMessage.error(data.data.message);
      }
    } catch (error) {
      console.error('表单提交错误:', error);
    } finally {
      sureLoading.value = false;
    }
  };
</script>

<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }

  .loading-more {
    text-align: center;
    padding: 8px 0;
    color: var(--el-text-color-secondary);
    font-size: 12px;
  }

  .selected-admins {
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .admin-tag {
    padding: 4px 8px;
    background-color: var(--el-color-primary-light-9);
    border-radius: 4px;
    font-size: 12px;
  }
</style>
