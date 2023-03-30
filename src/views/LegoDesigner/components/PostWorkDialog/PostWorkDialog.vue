<template>
  <el-dialog
    :model-value="dialogPostWorkVisible"
    title="发布为模板"
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
      <el-form-item label="模板名称:">
        <el-input v-model="ruleForm.title" placeholder="请输入模板标题" />
      </el-form-item>
      <el-form-item label="模板分类：" prop="category">
        <el-select v-model="ruleForm.category" placeholder="请选择模板分类">
          <el-option
            v-for="(item, index) in categoryList"
            :key="index"
            :label="item.label"
            :value="item.label"
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
          <img v-if="ruleForm.previewUrl" :src="ruleForm.previewUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" :loading="sureLoading" @click="submit(ruleFormRef)"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { getLegoCategoryListAsync, legoTemplateAddAsync } from '@/http/api/lego';
  import { FormInstance, FormRules, UploadProps } from 'element-plus';
  import appStore from '@/store';
  import CONFIG from '@/config';
  import { storeToRefs } from 'pinia';
  import { getUuid } from '@/utils/common';

  const { HJSchemaJsonStore } = storeToRefs(appStore.useLegoJsonStore);

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogPostWorkVisible: boolean;
  }
  withDefaults(defineProps<TDialog>(), {
    dialogPostWorkVisible: false
  });

  interface ITemplate {
    title: string;
    category: string;
    previewUrl: string;
    how_much: number;
  }
  // 表单填写数据
  const ruleForm = reactive<ITemplate>({
    title: '',
    category: '',
    previewUrl: '',
    how_much: 0
  });
  const rules = reactive<FormRules>({});

  // 取消
  const cancle = () => {
    emit('cancle');
  };

  // 查询分类列表
  const categoryList = ref<any>([]);
  const getCategoryList = async () => {
    const data = await getLegoCategoryListAsync();
    if (data.data.status) {
      categoryList.value = data.data.data.map((item: { _id: any; name: any }) => {
        return {
          label: item.name,
          value: item._id
        };
      });
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getCategoryList();

  // 上传文件地址
  const uploadAddress = () => {
    return CONFIG.serverAddress + '/huajian/upload/file/templatePreview';
  };

  const handleAvatarSuccess: UploadProps['onSuccess'] = (response: {
    data: { data: { fileUrl: string } };
  }) => {
    ruleForm.previewUrl = response.data.data.fileUrl;
  };

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 10) {
      ElMessage.error('预览图不能大于10M');
      return false;
    }
    return true;
  };

  // 提交
  const sureLoading = ref<boolean>(false);
  const ruleFormRef = ref<any>(null);
  const router = useRouter();
  const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        HJSchemaJsonStore.value.id = getUuid(); // 每次发布作品都要生成id
        let params = {
          lego_json: HJSchemaJsonStore.value,
          previewUrl: ruleForm.previewUrl,
          category: ruleForm.category,
          how_much: ruleForm.how_much,
          title: ruleForm.title
        };
        sureLoading.value = true;
        const data = await legoTemplateAddAsync(params);
        if (data.data.status === 200) {
          ElMessage.success('发布成功');
          router.push({
            path: '/postWorkSuccess'
          });
          sureLoading.value = false;
          emit('updateSuccess');
          ruleFormRef.value.resetFields();
        } else {
          sureLoading.value = false;
          ElMessage.error(data.data.message);
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
  :deep(.avatar-uploader) {
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
      width: 260px;
      height: 365px;
    }

    .el-upload:hover {
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
