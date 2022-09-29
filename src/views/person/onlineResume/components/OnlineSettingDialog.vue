<!-- 审核弹窗 -->
<template>
  <el-dialog
    :model-value="dialogOnlineVisible"
    title="在线简历设置"
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
      <el-form-item label="是否公开：">
        <el-switch v-model="ruleForm.isOnline" />
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
  import { updateOnlineResumeAsync } from '@/http/api/userResume';
  import { FormInstance, FormRules } from 'element-plus';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogOnlineVisible: boolean;
    row: any;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogOnlineVisible: false,
    row: null
  });

  watch(
    () => props.row,
    (newVal) => {
      if (newVal) {
        ruleForm.isOnline = props.row.IS_ONLINE;
      }
    },
    {
      deep: true
    }
  );

  interface IAudit {
    isOnline: boolean;
  }
  // 表单填写数据
  const ruleForm = reactive<IAudit>({
    isOnline: true
  });
  const rules = reactive<FormRules>({
    passAudit: [{ required: true, message: '请选择审核状态', trigger: 'change' }]
  });

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
          isOnline: ruleForm.isOnline,
          _id: props.row._id
        };
        sureLoading.value = true;
        const data = await updateOnlineResumeAsync(params);
        if (data.data.status === 200) {
          ElMessage.success('设置成功');
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
