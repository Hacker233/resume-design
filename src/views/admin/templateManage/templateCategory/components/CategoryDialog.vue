<!-- 新增文章分类弹窗 -->
<template>
  <el-dialog
    :model-value="dialogArticleVisible"
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
      label-width="100px"
      size="default"
      label-position="left"
    >
      <el-form-item label="分类英文名:" prop="category_value">
        <el-input v-model="ruleForm.category_value" />
      </el-form-item>
      <el-form-item label="分类名称:" prop="category_label">
        <el-input v-model="ruleForm.category_label" />
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
  import { templateCategoryAddAsync, templateCategoryUpdateAsync } from '@/http/api/resume';
  import { FormInstance, FormRules } from 'element-plus';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogArticleVisible: boolean;
    row: any;
    btnText: string;
    title: string;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogArticleVisible: false,
    row: null,
    btnText: '添加',
    title: '新增分类'
  });

  watch(
    () => props.row,
    (newVal) => {
      if (newVal) {
        ruleForm.category_value = props.row.category_value;
        ruleForm.category_label = props.row.category_label;
      }
    },
    {
      deep: true
    }
  );

  interface ICategory {
    category_label: string;
    category_value: string;
  }
  // 表单填写数据
  const ruleForm = reactive<ICategory>({
    category_label: '',
    category_value: ''
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
        // 添加
        if (props.btnText === '添加') {
          let params = {
            category_label: ruleForm.category_label,
            category_value: ruleForm.category_value
          };
          sureLoading.value = true;
          const data = await templateCategoryAddAsync(params);
          if (data.data.status === 200) {
            ElMessage.success('添加成功');
            sureLoading.value = false;
            emit('updateSuccess');
            ruleFormRef.value.resetFields();
          } else {
            sureLoading.value = false;
            ElMessage.error(data.data.message);
          }
        } else {
          let params = {
            id: props.row._id,
            category_label: ruleForm.category_label,
            category_value: ruleForm.category_value
          };
          const data = await templateCategoryUpdateAsync(params);
          if (data.data.status === 200) {
            ElMessage.success('修改成功');
            sureLoading.value = false;
            emit('updateSuccess');
            ruleFormRef.value.resetFields();
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
</script>
<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
