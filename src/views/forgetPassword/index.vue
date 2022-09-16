<template>
  <div class="forget-password-box">
    <div v-if="!isSendSuccess" class="icon-box">
      <svg-icon icon-name="icon-guanbi" color="red" size="100px"></svg-icon>
    </div>
    <div v-else class="icon-box success-box">
      <svg-icon icon-name="icon-icon" color="#00c091" size="100px"></svg-icon>
      <p>邮件发送成功,请前往您的邮箱重置密码!</p>
    </div>
    <!-- 邮箱填写 -->
    <div class="email-box">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="160px"
        class="demo-ruleForm"
        status-icon
        size="normal"
        label-position="top"
      >
        <el-form-item label="请填写您的邮箱地址" prop="email">
          <el-input v-model="ruleForm.email" type="email" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="isLoading" @click="submitForm(ruleFormRef)"
            >发送重置密码链接</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { forgetPasswordAsync } from '@/http/api/user';
  import { FormInstance, FormRules } from 'element-plus';

  const isSendSuccess = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  const ruleForm = reactive({
    email: ''
  });
  const ruleFormRef = ref<FormInstance>();
  const rules = reactive<FormRules>({
    email: [{ required: true, message: '请正确填写你的邮箱地址', trigger: 'blur' }]
  });

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        isLoading.value = true;
        const data = await forgetPasswordAsync(ruleForm.email);
        if (data.status === 200) {
          isSendSuccess.value = true;
          ElMessage({
            message: '邮件发送成功',
            type: 'success'
          });
          isLoading.value = false;
        } else {
          isSendSuccess.value = false;
          isLoading.value = false;
          ElMessage({
            message: data.message,
            type: 'error'
          });
        }
      } else {
        console.log('error submit!', fields);
      }
    });
  };
</script>
<style lang="scss" scoped>
  .forget-password-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
    .success-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #00c091;
      p {
        margin-top: 15px;
      }
    }
    .email-box {
      margin-top: 30px;
    }
  }
</style>
