<!-- 提交审核弹窗 -->
<template>
  <el-dialog
    :model-value="dialogVisible"
    title="提交审核"
    width="500px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
    class="template-audit"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      size="default"
      label-position="left"
    >
      <el-form-item label="模板ID:">
        <el-input :model-value="id" disabled />
      </el-form-item>
      <el-form-item label="模板分类：" prop="category">
        <el-select v-model="ruleForm.category" placeholder="请选择模板分类" multiple>
          <el-option
            v-for="(item, index) in categoryList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
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
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="submit(ruleFormRef)"
          >确认修改</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
  import CONFIG from '@/config';
  import { getCategoryListAsync } from '@/http/api/category';
  import { FormInstance, FormRules, UploadProps } from 'element-plus';
  import appStore from '@/store';
  import { addTemplateAsync } from '@/http/api/resume';
  import { storeToRefs } from 'pinia';
  const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore);
  const emit = defineEmits(['cancle']);
  interface TDialog {
    dialogVisible: boolean;
    id: string;
    previewUrl: string;
    category: any;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogVisible: false,
    id: '',
    previewUrl: '',
    category: []
  });

  interface ITemplate {
    category: Array<string>;
    imageUrl: string;
  }
  // 表单填写数据
  const ruleForm = reactive<ITemplate>({
    category: props.category,
    imageUrl: props.previewUrl
  });

  const rules = reactive<FormRules>({
    category: [{ required: true, message: '模板分类不能为空', trigger: 'change' }]
  });

  // 取消
  const cancle = () => {
    emit('cancle');
  };

  // 提交审核
  const submitLoading = ref<boolean>(false);
  const ruleFormRef = ref<FormInstance>();
  const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        if (!ruleForm.imageUrl) {
          ElMessage.error('模板预览图不能为空');
          return;
        }
        submitLoading.value = true;
        let params = {
          previewUrl: ruleForm.imageUrl,
          CATEGORY: ruleForm.category,
          ID: props.id,
          NAME: resumeJsonNewStore.value.NAME,
          TITLE: resumeJsonNewStore.value.TITLE,
          LAYOUT: resumeJsonNewStore.value.LAYOUT,
          COMPONENTS: resumeJsonNewStore.value.COMPONENTS,
          GLOBAL_STYLE: resumeJsonNewStore.value.GLOBAL_STYLE
        };
        const data = await addTemplateAsync(params);
        if (data.data.status === 200) {
          submitLoading.value = false;
          ElMessage({
            message: '提交审核成功，审核结果将在个人中心可以查询',
            type: 'success'
          });
          ruleForm.imageUrl = '';
          ruleForm.category = [];
          emit('cancle');
        } else {
          submitLoading.value = false;
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

  // 查询分类列表
  const categoryList = ref<any>([]);
  const getCategoryList = async () => {
    const data = await getCategoryListAsync();
    if (data.status) {
      categoryList.value = data.data.map(
        (item: { category_value: string; category_label: string }) => {
          return {
            label: item.category_label,
            value: item.category_value
          };
        }
      );
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getCategoryList();

  // 上传文件地址
  const uploadAddress = () => {
    return CONFIG.serverAddress + '/huajian/upload/file/templatePreview';
  };

  const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    ruleForm.imageUrl = response.data.data.fileUrl;
  };

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 10) {
      ElMessage.error('预览图不能大于10M');
      return false;
    }
    return true;
  };
</script>
<style lang="scss">
  .template-audit {
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
