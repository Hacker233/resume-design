<template>
  <el-dialog
    :model-value="dialogPayVisible"
    :title="title"
    width="500px"
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
      <el-form-item label="模型名称:" prop="model_name">
        <el-input v-model="ruleForm.model_name" placeholder="请输入模型名称" />
      </el-form-item>
      <el-form-item label="模型价格:" prop="model_price">
        <el-input-number v-model="ruleForm.model_price" :min="0" :max="1000000" />
      </el-form-item>
      <el-form-item label="是否免费:" prop="model_is_free">
        <el-switch v-model="ruleForm.model_is_free" />
      </el-form-item>
      <el-form-item label="模型描述:" prop="model_description">
        <el-input
          v-model="ruleForm.model_description"
          type="textarea"
          placeholder="请输入模型描述"
        />
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
  import { ref, reactive, watch } from 'vue';
  import { ElMessage, FormInstance, FormRules } from 'element-plus';
  import { addModelAsync, updateModelAsync } from '@/http/api/ai';

  const emit = defineEmits(['cancle', 'updateSuccess']);

  interface TDialog {
    dialogPayVisible: boolean;
    row: any;
    btnText: string;
    title: string;
  }

  const props = withDefaults(defineProps<TDialog>(), {
    dialogPayVisible: false,
    row: null,
    btnText: '添加',
    title: '新增模型'
  });

  // 表单数据
  interface IModel {
    model_name: string;
    model_price: number;
    model_is_free: boolean;
    model_description: string;
  }

  const initialForm: IModel = {
    model_name: '',
    model_price: 0,
    model_is_free: false,
    model_description: ''
  };

  const ruleForm = reactive<IModel>({ ...initialForm });

  // 表单校验规则
  const rules = reactive<FormRules>({
    model_name: [{ required: true, message: '请输入模型名称', trigger: 'blur' }],
    model_price: [{ required: true, message: '请输入模型价格', trigger: 'blur' }],
    model_description: [{ required: true, message: '请输入模型描述', trigger: 'blur' }]
  });

  // 监听传入的 row 数据，用于回显表单
  watch(
    () => props.row,
    (newVal) => {
      if (newVal) {
        ruleForm.model_name = props.row.model_name;
        ruleForm.model_price = props.row.model_price;
        ruleForm.model_is_free = props.row.model_is_free;
        ruleForm.model_description = props.row.model_description;
      } else {
        // 如果 row 为 null，重置表单数据
        Object.assign(ruleForm, initialForm);
      }
    },
    { deep: true, immediate: true }
  );

  // 取消
  const cancle = () => {
    emit('cancle');
  };

  // 提交
  const sureLoading = ref<boolean>(false);
  const ruleFormRef = ref<FormInstance | null>(null); // 明确类型

  const submit = async (formEl: FormInstance | undefined | null) => {
    if (!formEl) return;
    await formEl.validate(async (valid) => {
      if (valid) {
        sureLoading.value = true;
        try {
          if (props.btnText === '添加') {
            // 新增模型
            const response = await addModelAsync(ruleForm);
            if (response.data.status === 200) {
              ElMessage.success('新增成功');
              emit('updateSuccess');
              formEl.resetFields();
            }
          } else {
            // 修改模型
            const params = {
              id: props.row._id,
              ...ruleForm
            };
            const response = await updateModelAsync(params);
            if (response.data.status === 200) {
              ElMessage.success('修改成功');
              emit('updateSuccess');
              formEl.resetFields();
            }
          }
        } catch (error: any) {
          ElMessage.error(error.message || '操作失败');
        } finally {
          sureLoading.value = false;
        }
      } else {
        sureLoading.value = false;
        ElMessage.error('请填写完整表单');
      }
    });
  };
</script>

<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
