<!-- 新增文章分类弹窗 -->
<template>
  <el-dialog
    class="vxqun-dialog"
    :model-value="dialogPayVisible"
    :title="title"
    width="500px"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      size="default"
      label-position="left"
    >
      <el-form-item label="网站名称:" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="友情链接:" prop="link">
        <el-input v-model="ruleForm.link" />
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select v-model="ruleForm.audit" placeholder="请选择审核状态" size="default">
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
        <el-button type="primary" :loading="sureLoading" @click="submit(ruleFormRef)">{{
          btnText
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { linksAddAsync, linksUpdateAsync } from '@/http/api/website';
  import { FormInstance, FormRules } from 'element-plus';

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
    title: '新增群'
  });

  const optionsAudit = ref<any>([
    {
      label: '同意',
      value: 1
    },
    {
      label: '拒绝',
      value: 2
    },
    {
      label: '待审核',
      value: 0
    }
  ]);

  watch(
    () => props.row,
    (newVal) => {
      if (newVal) {
        ruleForm.name = props.row.name;
        ruleForm.link = props.row.link;
        ruleForm.audit = props.row.audit;
      }
    },
    {
      deep: true
    }
  );

  interface IPay {
    name: string;
    link: string;
    audit: number;
  }
  // 表单填写数据
  const ruleForm = reactive<IPay>({
    name: '',
    link: '',
    audit: 0
  });
  const rules = reactive<FormRules>({
    name: [{ required: true, message: '网站名称不能为空！', trigger: 'change' }],
    link: [{ required: true, message: '友情链接不能为空！', trigger: 'change' }],
    audit: [{ required: true, message: '请选择审核状态', trigger: 'change' }]
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
        // 添加
        if (props.btnText === '添加') {
          let params = {
            name: ruleForm.name,
            link: ruleForm.link,
            audit: ruleForm.audit
          };
          sureLoading.value = true;
          const data = await linksAddAsync(params);
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
            link: ruleForm.link,
            audit: ruleForm.audit
          };
          const data = await linksUpdateAsync(params);
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

  .vxqun-dialog {
    .avatar-uploader {
      border: 1px dashed #8c939d;
      border-radius: 5px;
    }
    .avatar-uploader .avatar {
      width: 240px;
      height: 300px;
      display: block;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #8c939d;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
      width: 240px;
      height: 300px;
    }

    .avatar-uploader .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 48px;
      color: #8c939d;
      width: 240px;
      height: 300px;
      text-align: center;
    }
  }
</style>
