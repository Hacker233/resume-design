<!-- 新增或编辑软件资源弹窗弹窗 -->
<template>
  <el-dialog
    :model-value="dialogCategoryVisible"
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
      @submit.prevent
    >
      <el-form-item label="分类名称：" prop="socategoryName">
        <el-input v-model="ruleForm.socategoryName" />
      </el-form-item>
      <el-form-item label="分类图标：" prop="socategoryIcon">
        <icon-select-pop v-model="ruleForm.socategoryIcon"></icon-select-pop>
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
  import { addSoftCategoryAsync, updateSoftCategoryAsync } from '@/http/api/softShare';
  import { FormInstance, FormRules } from 'element-plus';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogCategoryVisible: boolean;
    row?: any;
    btnText?: string;
    title: string;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogCategoryVisible: false,
    row: null,
    btnText: '新增',
    title: '新增分类'
  });

  watch(
    () => props.row,
    (newVal) => {
      if (newVal) {
        ruleForm.socategoryName = props.row.socategory_name;
        ruleForm.socategoryIcon = props.row.socategory_icon;
      }
    },
    {
      deep: true
    }
  );

  interface ICategory {
    socategoryName: string;
    socategoryIcon: string;
  }
  // 表单填写数据
  const ruleForm = reactive<ICategory>({
    socategoryName: '',
    socategoryIcon: 'icon-hezuo'
  });
  const rules = reactive<FormRules>({
    socategoryName: [{ required: true, message: '分类名不能为空', trigger: 'change' }],
    socategoryIcon: [{ required: true, message: '图标不能为空', trigger: 'change' }]
  });

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
        // 新增
        if (props.btnText === '新增') {
          let params = {
            socategoryName: ruleForm.socategoryName,
            socategoryIcon: ruleForm.socategoryIcon
          };
          sureLoading.value = true;
          const data = await addSoftCategoryAsync(params);
          if (data.data.status === 200) {
            ElMessage.success('添加成功');
            sureLoading.value = false;
            emit('updateSuccess');
            ruleFormRef.value.resetFields();
            ruleForm.socategoryIcon = 'icon-hezuo';
          } else {
            sureLoading.value = false;
            ElMessage.error(data.data.message);
          }
        } else {
          let params = {
            socategoryId: props.row._id,
            socategoryName: ruleForm.socategoryName,
            socategoryIcon: ruleForm.socategoryIcon
          };
          const data = await updateSoftCategoryAsync(params);
          if (data.data.status === 200) {
            ElMessage.success('修改成功');
            sureLoading.value = false;
            emit('updateSuccess');
            ruleFormRef.value.resetFields();
            ruleForm.socategoryIcon = 'icon-hezuo';
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
