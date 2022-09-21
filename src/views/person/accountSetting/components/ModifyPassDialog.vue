<template>
  <el-dialog
    :model-value="dialogVisible"
    title="修改密码"
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
      <el-form-item label="邮箱:" prop="email">
        <el-input v-model="ruleForm.email" type="email" />
      </el-form-item>
      <el-form-item label="旧密码:" prop="oldPassword">
        <el-input v-model="ruleForm.oldPassword" />
      </el-form-item>
      <el-form-item label="新密码:" prop="newPassword">
        <el-input v-model="ruleForm.newPassword" type="password" />
      </el-form-item>
      <el-form-item label="确认密码:" prop="sureNewPassword">
        <el-input v-model="ruleForm.sureNewPassword" type="password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" :loading="sureLoading" @click="submit(ruleFormRef)"
          >确认修改</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { resetPasswordAsync } from '@/http/api/user';
  import appStore from '@/store';
  import { FormInstance, FormRules } from 'element-plus';

  const emit = defineEmits(['cancle']);
  interface TDialog {
    dialogVisible: boolean;
  }
  withDefaults(defineProps<TDialog>(), {
    dialogVisible: false
  });

  interface IPerson {
    email: string;
    oldPassword: string;
    newPassword: string;
    sureNewPassword: string;
  }
  // 表单填写数据
  const ruleForm = reactive<IPerson>({
    email: '',
    oldPassword: '',
    newPassword: '',
    sureNewPassword: ''
  });

  // 密码校验规则
  const passwordValidator = (rule: any, value: string, callback: Function) => {
    let pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}');
    if (!value) {
      callback(new Error('新密码不能为空'));
    } else if (!pwdRegex.test(value)) {
      callback(new Error('密码中必须包含字母、数字,至少8个字符'));
    } else {
      callback();
    }
  };
  // 确认密码的自定义规则
  const surePassValidator = (rule: any, value: string, callback: Function) => {
    if (!value) {
      callback(new Error('请再次确认密码'));
    } else if (ruleForm.newPassword !== value) {
      callback(new Error('两次输入密码不一致'));
    } else {
      callback();
    }
  };
  const rules = reactive<FormRules>({
    email: [{ required: true, message: '邮箱不能为空', trigger: 'change' }],
    oldPassword: [{ required: true, message: '旧密码不能为空', trigger: 'change' }],
    newPassword: [
      {
        required: true,
        validator: passwordValidator,
        trigger: 'change'
      }
    ],
    sureNewPassword: [{ required: true, validator: surePassValidator, trigger: 'change' }]
  });

  // 取消
  const cancle = () => {
    emit('cancle');
  };

  // 确认修改
  const sureLoading = ref<boolean>(false);
  const ruleFormRef = ref<FormInstance>();
  const router = useRouter();
  const { saveUserInfo } = appStore.useUserInfoStore;
  const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        let params = {
          email: ruleForm.email,
          currentPassword: ruleForm.oldPassword,
          newPassword: ruleForm.newPassword
        };
        sureLoading.value = true;
        const data = await resetPasswordAsync(params);
        if (data.status === 200) {
          ElMessage.success('修改成功，请重新登录！');
          sureLoading.value = false;
          localStorage.removeItem('token');
          localStorage.removeItem('userInfo');
          saveUserInfo('');
          router.push('/');
          emit('cancle');
        } else {
          sureLoading.value = false;
          ElMessage.error(data.message);
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
