<!-- 网站整体配置管理 -->
<template>
  <div class="web-config-box">
    <h3>网站相关配置项</h3>
    <el-divider>
      <el-icon><star-filled /></el-icon>
    </el-divider>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="160px"
      size="default"
      label-position="left"
    >
      <el-form-item label="请输入网站标题:" prop="website_title">
        <el-input v-model="ruleForm.website_title" placeholder="请输入网站标题" />
      </el-form-item>
      <el-form-item label="是否开启注册:" prop="open_sign">
        <el-switch v-model="ruleForm.open_sign" />
      </el-form-item>
      <el-form-item label="是否开启评论:" prop="open_comment">
        <el-switch v-model="ruleForm.open_comment" />
      </el-form-item>
      <el-form-item label="是否开启个人中心入口:" prop="open_person_in">
        <el-switch v-model="ruleForm.open_person_in" />
      </el-form-item>
      <el-form-item label="是否开启源码获取入口:" prop="open_get_source_code">
        <el-switch v-model="ruleForm.open_get_source_code" />
      </el-form-item>
      <el-form-item label="是否开启签到:" prop="open_sign_in">
        <el-switch v-model="ruleForm.open_sign_in" />
      </el-form-item>
      <el-form-item label="是否开启赞助模块:" prop="open_sponsor">
        <el-switch v-model="ruleForm.open_sponsor" />
      </el-form-item>
      <el-form-item label="是否开启商务合作推广:" prop="open_business">
        <el-switch v-model="ruleForm.open_business" />
      </el-form-item>
      <el-form-item label="是否开启会员中心:" prop="open_membership">
        <el-switch v-model="ruleForm.open_membership" />
      </el-form-item>
      <el-form-item label="是否开启首页菜单:" prop="open_homne_menu">
        <el-switch v-model="ruleForm.open_homne_menu" />
      </el-form-item>
      <el-form-item label="是否开启邀请注册:" prop="open_invite_register">
        <el-switch v-model="ruleForm.open_invite_register" />
      </el-form-item>
    </el-form>
    <el-divider>
      <el-icon><star-filled /></el-icon>
    </el-divider>
    <div class="bottom-btn-box">
      <el-button type="primary" @click="submitForm(ruleFormRef)"> 保存配置 </el-button>
      <el-button @click="resetWebsiteConfig"> 恢复默认配置</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { title } from '@/config/seo';
  import {
    getWebsiteConfigAsync,
    resetWebsiteConfigAsync,
    webConfigUpdateAsync
  } from '@/http/api/websiteConfig';
  import { FormInstance, FormRules } from 'element-plus';

  // 表单填写数据
  interface IWebConfig {
    open_sign: boolean;
    open_comment: boolean;
    open_person_in: boolean;
    open_get_source_code: boolean;
    open_sign_in: boolean;
    open_business: boolean;
    open_sponsor: boolean;
    website_title: string;
    open_membership: boolean;
    open_homne_menu: boolean;
    open_invite_register: boolean;
  }
  const ruleForm = reactive<IWebConfig>({
    open_sign: true,
    open_comment: true,
    open_person_in: true,
    open_get_source_code: true,
    open_sign_in: true,
    open_business: true,
    open_sponsor: true,
    website_title: title,
    open_membership: true,
    open_homne_menu: true,
    open_invite_register: true
  });
  const rules = reactive<FormRules>({
    website_title: [{ required: true, message: '网站标题不能为空！', trigger: 'change' }]
  });
  const ruleFormRef = ref<FormInstance>();

  // 查询网站配置信息
  const getWebsiteConfig = async () => {
    const data = await getWebsiteConfigAsync();
    if (data.status === 200) {
      setFormValue(data.data);
    } else {
      ElMessage.error(data.message);
    }
  };
  getWebsiteConfig();

  // 更新配置
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        const data = await webConfigUpdateAsync(ruleForm);
        if (data.data.status === 200) {
          ElMessage.success('更新成功');
        }
      } else {
        console.log('error submit!', fields);
      }
    });
  };

  // 恢复配置到默认值
  const resetWebsiteConfig = async () => {
    const data = await resetWebsiteConfigAsync();
    if (data.data.status === 200) {
      ElMessage.success('还原成功');
      setFormValue(data.data.data);
    } else {
      ElMessage.error(data.data.message);
    }
  };

  // 表单赋值
  const setFormValue = (data: any) => {
    ruleForm.open_comment = data.open_comment;
    ruleForm.open_sign = data.open_sign;
    ruleForm.open_person_in = data.open_person_in;
    ruleForm.open_get_source_code = data.open_get_source_code;
    ruleForm.open_sign_in = data.open_sign_in;
    ruleForm.open_business = data.open_business;
    ruleForm.open_sponsor = data.open_sponsor;
    ruleForm.website_title = data.website_title;
    ruleForm.open_membership = data.open_membership;
    ruleForm.open_homne_menu = data.open_homne_menu;
    ruleForm.open_invite_register = data.open_invite_register;
  };
</script>
<style lang="scss" scoped>
  .web-config-box {
    .bottom-btn-box {
      margin-top: 20px;
    }
  }
</style>
