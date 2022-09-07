<template>
  <div class="add-template-box">
    <div class="add-left">
      <h1 class="title">请将JSON数据粘贴到下面的编辑器中:</h1>
      <!-- 代码编辑器 -->
      <div class="code-mirror-box">
        <codemirror
          v-model="ruleForm.code"
          placeholder="请将你在自定义模板下载的JSON数据粘贴在此处哦~~"
          :style="{ height: '90vh' }"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="2"
          :extensions="extensions"
        />
      </div>
    </div>
    <div class="add-right">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        size="default"
        status-icon
        label-position="top"
      >
        <el-form-item label="模板预览图:">
          <el-upload
            class="avatar-uploader"
            :action="uploadAddress()"
            :headers="{ Authorization: appStore.useTokenStore.token }"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button
            class="add-btn"
            @click="addTemplate(ruleFormRef)"
            type="primary"
            :loading="isAddLoading"
            >提 交</el-button
          ></el-form-item
        >
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { Codemirror } from 'vue-codemirror';
  import { javascript } from '@codemirror/lang-javascript';
  import { oneDark } from '@codemirror/theme-one-dark';
  import { json } from '@codemirror/lang-json';
  import { FormInstance, FormRules, UploadProps } from 'element-plus';
  import { addTemplateAsync } from '@/http/api/resume';
  import appStore from '@/store';
  import CONFIG from '@/config';
  import { isJSON } from '@/utils/common';

  // 上传文件地址
  const uploadAddress = () => {
    return CONFIG.serverAddress + '/huajian/upload/file';
  };

  // 代码编辑器
  const extensions = [javascript(), oneDark, json()];

  const rules = reactive<FormRules>({
    name: [
      { required: true, message: 'Please input Activity name', trigger: 'blur' },
      { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
    ]
  });
  const ruleForm = reactive({
    code: '',
    imageUrl: ''
  });

  const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    ruleForm.imageUrl = response.data.data.fileUrl;
  };

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 10) {
      ElMessage.error('预览图不能大于10M');
      return false;
    }
    return true;
  };

  // 提交
  const isAddLoading = ref<boolean>(false);
  const ruleFormRef = ref<FormInstance>();
  const addTemplate = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        if (!ruleForm.code) {
          ElMessage({
            message: 'JSON数据不能为空！',
            type: 'error',
            center: true
          });
          return;
        }
        let isCurrentJSON = isJSON(ruleForm.code);
        if (!isCurrentJSON) {
          ElMessage({
            message: 'JSON格式不正确！',
            type: 'error',
            center: true
          });
          return;
        }
        let resumeDate = JSON.parse(ruleForm.code);
        let params = {
          previewUrl: ruleForm.imageUrl,
          ID: resumeDate.ID,
          NAME: resumeDate.NAME,
          TITLE: resumeDate.TITLE,
          LAYOUT: resumeDate.LAYOUT,
          COMPONENTS: resumeDate.COMPONENTS,
          GLOBAL_STYLE: resumeDate.GLOBAL_STYLE
        };
        isAddLoading.value = true;
        const data = await addTemplateAsync(params);
        if (data.data.status === 200) {
          isAddLoading.value = false;
          ElMessage({
            message: '模板添加成功',
            type: 'success'
          });
          ruleForm.code = '';
          ruleForm.imageUrl = '';
        } else {
          isAddLoading.value = false;
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
  .add-template-box {
    width: 100%;
    height: 100%;
    display: flex;
    .add-left {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      .title {
        margin-bottom: 15px;
        font-size: 18px;
      }
    }
    .add-right {
      width: 350px;
      padding-left: 20px;
      padding-top: 35px;
      display: flex;
      justify-content: center;
      .avatar-uploader .avatar {
        width: 260px;
        height: 365px;
        display: block;
      }
      .add-btn {
        width: 100%;
      }
    }
  }
</style>
<style lang="scss">
  .add-template-box {
    .code-mirror-box {
      flex: 1;
      .v-codemirror {
        height: 100%;
        .cm-editor {
          height: calc(100vh - 160px) !important;
        }
      }
    }
    .avatar-uploader .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
      width: 260px;
      height: 365px;
    }

    .avatar-uploader .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 48px;
      color: #8c939d;
      width: 260px;
      height: 365px;
      text-align: center;
    }
  }
</style>
