<template>
  <div class="person-detail-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      size="default"
      label-position="left"
    >
      <el-form-item label="昵称:" prop="name">
        <el-input v-if="isEdit" v-model="ruleForm.name" />
        <p v-else>{{ appStore.useUserInfoStore.userInfo.name }}</p>
      </el-form-item>
      <el-form-item label="个性签名:" prop="surname">
        <el-input v-if="isEdit" v-model="ruleForm.surname" />
        <p v-else>{{ appStore.useUserInfoStore.userInfo.surname }}</p>
      </el-form-item>
    </el-form>
    <div class="button-box">
      <el-button v-if="!isEdit" type="primary" @click="edit">编辑</el-button>
      <div v-else>
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="submit(ruleFormRef)"
          >保存更改</el-button
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { updatePersonInfoAsync } from '@/http/api/user';
  import appStore from '@/store';
  import { FormInstance, FormRules } from 'element-plus';

  interface IPerson {
    name: string;
    surname: string;
  }
  // 表单填写数据
  const ruleForm = reactive<IPerson>({
    name: '',
    surname: ''
  });
  const rules = reactive<FormRules>({
    name: [{ required: true, message: '昵称不能为空', trigger: 'change' }],
    surname: [{ required: true, message: '个性签名不能为空', trigger: 'change' }]
  });

  // 查询用户信息
  const { getAndUpdateUserInfo } = appStore.useUserInfoStore;
  getAndUpdateUserInfo();

  // 点击编辑
  const isEdit = ref<boolean>(false);
  const edit = () => {
    ruleForm.name = appStore.useUserInfoStore.userInfo.name;
    ruleForm.surname = appStore.useUserInfoStore.userInfo.surname;
    isEdit.value = true;
  };

  // 取消更改
  const cancle = () => {
    isEdit.value = false;
  };
  // 保存更改
  const submitLoading = ref<boolean>(false);
  const ruleFormRef = ref<FormInstance>();
  const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        submitLoading.value = true;
        const data = await updatePersonInfoAsync(ruleForm);
        if (data.data.status === 200) {
          ElMessage.success('更新成功');
          isEdit.value = false;
          submitLoading.value = false;
          getAndUpdateUserInfo(); // 查询用户信息
        } else {
          ElMessage.error(data.data.message);
          submitLoading.value = false;
        }
      } else {
        submitLoading.value = false;
        console.log('error submit!', fields);
      }
    });
  };
</script>
<style lang="scss" scoped>
  .person-detail-box {
    width: 60%;
  }
</style>
