<template>
  <el-dialog
    ref="ruleFormRef"
    :model-value="dialogVisible"
    width="600px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
    custom-class="import-json"
  >
    <!-- 头部 -->
    <template #title>
      <div class="header">
        <div class="header-left">
          <h1 class="title">请在编辑器内修改简历模板数据：</h1>
        </div>
      </div>
    </template>

    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="90px"
      class="demo-ruleForm"
      size="default"
      status-icon
      label-position="left"
    >
      <el-form-item label="昵称:" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input v-model="ruleForm.email" type="email" />
      </el-form-item>
      <el-form-item label="是否验证:" prop="valid">
        <el-select v-model="ruleForm.valid" class="m-2" placeholder="请选择状态">
          <el-option
            v-for="item in validList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="角色:" prop="roles">
        <el-select-v2
          v-model="ruleForm.roles"
          :options="rolesList"
          placeholder="请选择角色"
          style="width: 100%"
          multiple
        />
      </el-form-item>
      <el-form-item label="头像:">
        <el-upload
          class="avatar-uploader"
          :action="uploadAddress()"
          :headers="{ Authorization: appStore.useTokenStore.token }"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="ruleForm.profilePic" :src="ruleForm.profilePic" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" @click="confirmJson(ruleFormRef)">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage, FormInstance, FormRules } from 'element-plus';
  import { updateUserInfoByAdminAsync } from '@/http/api/user';
  import CONFIG from '@/config';
  import { UploadProps } from 'element-plus';
  import appStore from '@/store';

  const emit = defineEmits(['cancle', 'updateSuccess']);

  interface TDialog {
    dialogVisible: boolean;
    row: any;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogVisible: false,
    row: null
  });
  watch(
    () => props.row,
    (newVal) => {
      if (newVal) {
        ruleForm.name = newVal.name;
        ruleForm.email = newVal.email;
        ruleForm.valid = newVal.valid === '已验证' ? true : false;
        ruleForm.roles = newVal.roles;
        ruleForm.profilePic = newVal.profilePic;
      }
    },
    {
      deep: true
    }
  );
  const validList = reactive<Array<{ label: string; value: boolean }>>([
    {
      label: '已验证',
      value: true
    },
    {
      label: '未验证',
      value: false
    }
  ]);
  const rolesList = reactive<Array<{ label: string; value: string }>>([
    {
      label: '普通用户',
      value: 'User'
    },
    {
      label: '管理员',
      value: 'Admin'
    }
  ]);
  const rules = reactive<FormRules>({
    name: [{ required: true, message: '昵称不能为空', trigger: 'change' }],
    email: [{ required: true, message: '邮箱不能为空', trigger: 'change' }],
    valid: [{ required: true, message: '请选择验证状态', trigger: 'change' }],
    roles: [{ required: true, message: '请选择角色', trigger: 'change' }]
  });
  const ruleForm = reactive({
    name: '',
    email: '',
    valid: false,
    profilePic: '',
    roles: ''
  });

  // 上传文件地址
  const uploadAddress = () => {
    return CONFIG.serverAddress + '/huajian/upload/file/avatar';
  };
  const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    ruleForm.profilePic = response.data.data.fileUrl;
  };

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 10) {
      ElMessage.error('预览图不能大于10M');
      return false;
    }
    return true;
  };
  // 取消
  const cancle = () => {
    emit('cancle');
  };

  // 点击提交
  const ruleFormRef = ref<FormInstance>();
  const confirmJson = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        const data = await updateUserInfoByAdminAsync(ruleForm);
        if (data.data.status === 200) {
          ElMessage.success('更新成功');
          emit('updateSuccess');
        } else {
          ElMessage.error(data.data.message);
          emit('cancle');
        }
      } else {
        console.log('error submit!', fields);
      }
    });
  };
</script>
<style lang="scss">
  .import-json {
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .header-left {
        display: flex;
        flex-direction: column;
        height: 10px;
        justify-content: space-between;
        .title {
          font-size: 20px;
        }
        span {
          font-size: 12px;
          color: red;
          display: flex;
          align-items: center;
          .svg-icon {
            margin-right: 5px;
          }
        }
      }
    }
    .avatar-uploader .avatar {
      width: 80px;
      height: 80px;
      display: block;
    }
    .el-dialog__header {
      padding: 20px;
    }
    .el-dialog__body {
      padding: 20px;
    }
    .el-dialog__footer {
      padding: 20px;
    }

    .avatar-uploader .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
      width: 80px;
      height: 80px;
    }

    .avatar-uploader .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 15px;
      color: #8c939d;
      width: 80px;
      height: 80px;
      text-align: center;
    }
  }

  .el-overlay-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    .el-dialog {
      padding: 0;
      margin: 0;
    }
  }
</style>
