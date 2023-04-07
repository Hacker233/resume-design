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
      label-width="80px"
      size="default"
      label-position="left"
    >
      <el-form-item label="群名称:" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="群二维码:">
        <el-upload
          class="avatar-uploader"
          :action="uploadAddress()"
          :headers="{ Authorization: appStore.useTokenStore.token }"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="ruleForm.qr_code" :src="ruleForm.qr_code" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
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
  import { vxqunAddAsync, vxqunUpdateAsync } from '@/http/api/website';
  import { FormInstance, FormRules, UploadProps } from 'element-plus';
  import appStore from '@/store';
  import CONFIG from '@/config';

  // 上传文件地址
  const uploadAddress = () => {
    return CONFIG.serverAddress + '/huajian/upload/file/avatar';
  };

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

  watch(
    () => props.row,
    (newVal) => {
      if (newVal) {
        ruleForm.name = props.row.name;
        ruleForm.qr_code = props.row.qr_code;
      }
    },
    {
      deep: true
    }
  );

  interface IPay {
    name: string;
    qr_code: string;
  }
  // 表单填写数据
  const ruleForm = reactive<IPay>({
    name: '',
    qr_code: ''
  });
  const rules = reactive<FormRules>({});

  // 取消
  const cancle = () => {
    emit('cancle');
  };

  const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    ruleForm.qr_code = response.data.data.fileUrl;
  };

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 10) {
      ElMessage.error('二维码不能大于10M');
      return false;
    }
    return true;
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
            qr_code: ruleForm.qr_code
          };
          sureLoading.value = true;
          const data = await vxqunAddAsync(params);
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
            qr_code: ruleForm.qr_code
          };
          const data = await vxqunUpdateAsync(params);
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
