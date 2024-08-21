<!-- 删除评论弹窗弹窗 -->
<template>
  <el-dialog
    :model-value="dialogDeleteVisible"
    title="删除评论"
    width="500px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
      size="default"
      label-position="left"
    >
      <el-form-item label="评论id:" prop="name">
        <el-input v-model="ruleForm.id" disabled />
      </el-form-item>
      <el-form-item label="删除原因:" prop="name">
        <el-select v-model="ruleForm.integralPayDesc" placeholder="请选择删除原因">
          <el-option
            v-for="(item, index) in integralPayDescList"
            :key="index"
            :label="item.label"
            :value="item.label"
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
  import { deleteCommentByAdminAsync } from '@/http/api/comment';
  import { FormInstance, FormRules } from 'element-plus';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogDeleteVisible: boolean;
    row: any;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogDeleteVisible: false,
    row: null
  });

  watch(
    () => props.row,
    (newVal) => {
      if (newVal) {
        ruleForm.id = props.row._id;
      }
    },
    {
      deep: true
    }
  );

  // 删除原因列表
  const integralPayDescList = [
    {
      label: '评论判定违规被删除且扣除-1简币',
      value: '1'
    },
    {
      label: '评论被删除，且扣除-1简币',
      value: '2'
    },
    {
      label: '系统检测到恶意刷评论，删除评论且扣除-1简币',
      value: '3'
    }
  ];

  interface ICategory {
    id: string;
    integralPayDesc: string;
  }
  // 表单填写数据
  const ruleForm = reactive<ICategory>({
    id: '',
    integralPayDesc: ''
  });
  const rules = reactive<FormRules>({});

  // 取消
  const cancle = () => {
    emit('cancle');
  };

  // 提交
  const sureLoading = ref<boolean>(false);
  const ruleFormRef = ref<any>(null);
  const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        sureLoading.value = true;
        const params = {
          id: ruleForm.id,
          integralPayDesc: ruleForm.integralPayDesc,
          email: props.row.email
        };
        const data = await deleteCommentByAdminAsync(params);
        if (data.data.status === 200) {
          ElMessage({
            type: 'success',
            message: '删除成功，简币-1'
          });
          emit('updateSuccess');
          sureLoading.value = false;
        } else {
          ElMessage.error(data.data.message);
          sureLoading.value = false;
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
