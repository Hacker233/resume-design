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
      <el-form-item label="会员名称:" prop="membershipName">
        <el-input v-model="ruleForm.membershipName" placeholder="请输入会员名称" />
      </el-form-item>
      <el-form-item v-if="props.row" label="会员类型:" prop="type">
        <el-input v-model="ruleForm.type" placeholder="请输入会员类型" />
      </el-form-item>
      <el-form-item label="会员价格:" prop="price">
        <el-input-number
          v-model="ruleForm.price"
          :min="0"
          :max="100000"
          :step="1"
          placeholder="请输入会员价格"
        />
      </el-form-item>
      <el-form-item label="会员原价:" prop="originalPrice">
        <el-input-number
          v-model="ruleForm.originalPrice"
          :min="0"
          :max="100000"
          :step="1"
          placeholder="请输入会员原价"
        />
      </el-form-item>
      <el-form-item label="会员天数:" prop="durationDays">
        <el-input-number
          v-model="ruleForm.durationDays"
          :min="0"
          :max="100000"
          :step="1"
          placeholder="请输入会员天数"
        />
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
  import { createMembershipConfigAsync, updateMembershipConfigAsync } from '@/http/api/membership';
  import { FormInstance, FormRules } from 'element-plus';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogMembershipVisible: boolean;
    row: any;
    title: string;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogMembershipVisible: false,
    row: null,
    title: '新增会员项'
  });

  watch(
    () => props.row,
    (newVal) => {
      if (newVal) {
        ruleForm.membershipName = props.row.membershipName;
        ruleForm.type = props.row.type;
        ruleForm.price = props.row.price;
        ruleForm.originalPrice = props.row.originalPrice;
        ruleForm.durationDays = props.row.durationDays;
      }
    },
    {
      deep: true
    }
  );

  interface IMembership {
    membershipName: string; // 会员名称
    type: string; // 会员类型
    price: number; // 会员价格
    originalPrice: number; // 会员原价
    durationDays: number; // 会员有效天数
  }
  // 表单填写数据
  const ruleForm = reactive<IMembership>({
    membershipName: '', // 会员名称
    type: '', // 会员类型
    price: 0, // 会员价格
    originalPrice: 0, // 会员原价
    durationDays: 0 // 会员有效天数
  });
  const rules = reactive<FormRules>({
    membershipName: [{ required: true, message: '会员名称不能为空', trigger: 'change' }],
    price: [{ required: true, message: '会员价格不能为空', trigger: 'change' }],
    originalPrice: [{ required: true, message: '会员原价不能为空', trigger: 'change' }],
    durationDays: [{ required: true, message: '会员天数不能为空', trigger: 'change' }]
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
        if (props.row) {
          let params = {
            ...ruleForm
          };
          const data = await updateMembershipConfigAsync(props.row._id, params);
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
          let params = {
            membershipName: ruleForm.membershipName, // 会员名称
            price: ruleForm.price, // 会员价格
            originalPrice: ruleForm.originalPrice, // 会员原价
            durationDays: ruleForm.durationDays // 会员有效天数
          };
          const data = await createMembershipConfigAsync(params);
          if (data.data.status === 200) {
            ElMessage.success('会员项新增成功');
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
    ruleForm.durationDays = 0;
    ruleForm.type = '';
    ruleForm.price = 0;
    ruleForm.membershipName = '';
    ruleForm.originalPrice = 0;
    ruleFormRef.value.clearValidate();
    ruleFormRef.value.resetFields();
  };
</script>
<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
