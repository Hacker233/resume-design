<!-- 新增文章分类弹窗 -->
<template>
  <el-dialog
    :model-value="dialogLegoVisible"
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
      label-width="80px"
      size="default"
      label-position="left"
    >
      <el-form-item label="分类名称:" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="卡片宽度:" prop="width">
        <el-input-number v-model="ruleForm.width" :min="0" :max="1000000" />
      </el-form-item>
      <el-form-item label="卡片高度:" prop="width">
        <el-input-number v-model="ruleForm.height" :min="0" :max="1000000" />
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
  import { addLegoCategoryAsync, legoCategoryUpdateAsync } from '@/http/api/lego';
  import { FormInstance, FormRules } from 'element-plus';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogLegoVisible: boolean;
    row: any;
    btnText: string;
    title: string;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogLegoVisible: false,
    row: null,
    btnText: '添加',
    title: '新增分类'
  });

  watch(
    () => props.row,
    (newVal) => {
      if (newVal) {
        ruleForm.name = props.row.name;
        ruleForm.width = props.row.width;
        ruleForm.height = props.row.height;
      }
    },
    {
      deep: true
    }
  );

  interface ICategory {
    name: string;
    width: number;
    height: number;
  }
  // 表单填写数据
  const ruleForm = reactive<ICategory>({
    name: '',
    width: 300,
    height: 400
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
            name: ruleForm.name,
            width: ruleForm.width,
            height: ruleForm.height
          };
          sureLoading.value = true;
          const data = await addLegoCategoryAsync(params);
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
            name: ruleForm.name,
            width: ruleForm.width,
            height: ruleForm.height
          };
          const data = await legoCategoryUpdateAsync(params);
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
