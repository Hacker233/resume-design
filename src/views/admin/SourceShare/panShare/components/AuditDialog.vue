<!-- 审核弹窗 -->
<template>
  <el-dialog
    :model-value="dialogAuditVisible"
    title="审核"
    width="400px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      size="default"
      label-position="left"
    >
      <el-form-item label="审核状态">
        <el-select v-model="ruleForm.panSourceStatus" placeholder="请选择审核状态" size="default">
          <el-option
            v-for="item in optionsAudit"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" :loading="sureLoading" @click="submit(ruleFormRef)"
          >审核</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { auditPanShareByAdminAsync } from '@/http/api/panShare';
  import { FormInstance, FormRules } from 'element-plus';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogAuditVisible: boolean;
    auditRow: any;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogAuditVisible: false,
    auditRow: null
  });

  watch(
    () => props.auditRow,
    (newVal) => {
      if (newVal) {
        console.log(newVal);
        ruleForm.panSourceStatus = newVal.pan_source_status;
      }
    },
    {
      deep: true
    }
  );

  interface IAudit {
    panSourceStatus: number;
  }
  // 表单填写数据
  const ruleForm = reactive<IAudit>({
    panSourceStatus: 0
  });
  const rules = reactive<FormRules>({
    passAudit: [{ required: true, message: '请选择审核状态', trigger: 'change' }]
  });

  const optionsAudit = ref<any>([
    {
      label: '同意',
      value: '3'
    },
    {
      label: '拒绝',
      value: '2'
    },
    {
      label: '待审核',
      value: '1'
    }
  ]);

  // 取消
  const cancle = () => {
    emit('cancle');
  };

  // 确认修改
  const sureLoading = ref<boolean>(false);
  const ruleFormRef = ref<FormInstance>();
  const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        let params = {
          panSourceStatus: ruleForm.panSourceStatus,
          id: props.auditRow._id
        };
        sureLoading.value = true;
        const data = await auditPanShareByAdminAsync(params);
        if (data.data.status === 200) {
          ElMessage.success('审核成功');
          sureLoading.value = false;
          emit('updateSuccess');
        } else {
          sureLoading.value = false;
          ElMessage.error(data.data.message);
        }
      } else {
        sureLoading.value = false;
        console.log('error submit!', fields);
      }
    });
  };
</script>
<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
