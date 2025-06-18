<!-- 新增或编辑会员弹窗 -->
<template>
  <el-dialog
    :model-value="dialogMembershipVisible"
    :title="title"
    width="800px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      size="default"
      label-position="left"
    >
      <el-form-item label="会员邮箱:" prop="email">
        <el-input v-model="ruleForm.email" placeholder="请输入会员邮箱" />
      </el-form-item>
      <el-form-item label="会员类型:" prop="type">
        <el-select
          v-model="ruleForm.type"
          placeholder="请选择会员类型"
          size="default"
          style="width: 100%"
        >
          <el-option
            v-for="item in typeList"
            :key="item.type"
            :label="item.membershipName"
            :value="item.type"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" :loading="sureLoading" @click="submit(ruleFormRef)"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { createMembershipAsync, updateMembershipAsync } from '@/http/api/membership';
  import { FormInstance, FormRules } from 'element-plus';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogMembershipVisible: boolean;
    row: any;
    title: string;
    typeList: any;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogMembershipVisible: false,
    row: null,
    title: '新增会员记录',
    typeList: []
  });

  watch(
    () => props.row,
    (newVal) => {
      if (newVal) {
        ruleForm.email = props.row.email;
        ruleForm.type = props.row.type;
      }
    },
    {
      deep: true
    }
  );

  interface IMembership {
    email: string;
    type: string;
  }
  // 表单填写数据
  const ruleForm = reactive<IMembership>({
    email: '', // 会员邮箱
    type: '' // 会员类型
  });
  const rules = reactive<FormRules>({
    email: [{ required: true, message: '会员邮箱不能为空', trigger: 'change' }],
    type: [{ required: true, message: '会员类型不能为空', trigger: 'change' }]
  });

  // 取消
  const cancle = () => {
    resetFields();
    emit('cancle');
  };

  // 提交
  const sureLoading = ref<boolean>(false);
  const ruleFormRef = ref<any>(null);
  const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        // 添加
        let params = {
          email: ruleForm.email, // 会员邮箱
          type: ruleForm.type, // 会员类型
          channelType: '3'
        };
        if (props.row) {
          const data = await updateMembershipAsync(props.row._id, params);
          if (data.data.status === 200) {
            ElMessage.success('修改成功');
            sureLoading.value = false;
            emit('updateSuccess');
            resetFields();
          } else {
            sureLoading.value = false;
            ElMessage.error(data.data.message);
          }
        } else {
          // 添加
          sureLoading.value = true;
          const data = await createMembershipAsync(params);
          if (data.data.status === 200) {
            ElMessage.success('会员开通成功');
            sureLoading.value = false;
            emit('updateSuccess');
            resetFields();
          } else {
            sureLoading.value = false;
            ElMessage.error(data.data.message);
          }
        }
      } else {
        sureLoading.value = false;
        console.log('error submit!', fields);
      }
    });
  };

  // 重置表单数据
  const resetFields = () => {
    ruleForm.email = '';
    ruleForm.type = '';
    ruleFormRef.value.clearValidate();
    ruleFormRef.value.resetFields();
  };
</script>
<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
