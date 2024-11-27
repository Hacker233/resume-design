<!-- 提交审核弹窗 -->
<template>
  <el-dialog
    :model-value="dialogVisible"
    title="提交模板"
    width="650px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
    class="template-audit"
    @open="handleOpen"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      size="default"
      label-position="right"
    >
      <el-form-item label="模版名称:" prop="templateTitle">
        <el-input v-model="ruleForm.templateTitle" placeholder="请输入模版名称" />
      </el-form-item>
      <el-form-item label="模板风格：" prop="templateStyle">
        <el-select
          v-model="ruleForm.templateStyle"
          placeholder="请选择模板风格"
          style="width: 100%"
          clearable
        >
          <el-option
            v-for="(item, index) in categoryList"
            :key="index"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="模版用途:" prop="templateUse">
        <el-select
          v-model="ruleForm.templateUse"
          placeholder="请选择模版用途"
          style="width: 100%"
          clearable
        >
          <el-option
            v-for="(item, index) in templateUseList"
            :key="index"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所属行业:" prop="templateIndustry">
        <el-select
          v-model="ruleForm.templateIndustry"
          placeholder="请选择所属行业"
          style="width: 100%"
          clearable
        >
          <el-option
            v-for="(item, index) in templatePost"
            :key="index"
            :label="item.title"
            :value="item.title"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="职位选择:" prop="templatePost">
        <el-select
          v-model="ruleForm.templatePost"
          placeholder="请选择职业"
          style="width: 100%"
          :disabled="postDisabled"
          filterable
          clearable
        >
          <el-option v-for="(item, index) in postList" :key="index" :label="item" :value="item" />
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
          <img v-if="ruleForm.templateCover" :src="ruleForm.templateCover" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <!-- 选择更新模板还是创建一个新模板 -->
      <el-form-item v-if="id" label="更新或创建:">
        <el-radio-group v-model="ruleForm.handle">
          <el-radio label="add">新增</el-radio>
          <el-radio label="edit">更新</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="submit(ruleFormRef)"
          >确认提交</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
  import CONFIG from '@/config';
  import { FormInstance, FormRules, UploadProps } from 'element-plus';
  import appStore from '@/store';
  import { getTemplateStyleListAsync, templateAddAsync } from '@/http/api/createTemplate';
  import { templateUseList, templatePost } from '@/dictionary/createTemplate';
  import { storeToRefs } from 'pinia';

  const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);

  const emit = defineEmits(['cancle', 'success']);

  const route = useRoute();

  interface TDialog {
    dialogVisible: boolean;
    templateInfo: any;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogVisible: false,
    templateInfo: null
  });
  // 表单填写数据
  const ruleForm = reactive<any>({
    templateTitle: '',
    templateStyle: '',
    templateUse: '',
    templateIndustry: '',
    templatePost: '',
    templateCover: '',
    handle: 'add'
  });

  const rules = reactive<FormRules>({
    templateTitle: [{ required: true, message: '模板名称不能为空', trigger: 'change' }]
  });

  // 是否可以选择职业
  const postDisabled = computed(() => {
    return ruleForm.templateIndustry ? false : true;
  });

  // 职业列表
  const postList = computed(() => {
    for (let i = 0; i < templatePost.length; i++) {
      const element = templatePost[i];
      if (element.title === ruleForm.templateIndustry) {
        return element.job;
      }
    }
    return [];
  });

  // 弹窗打开回调
  let id = ref<any>('');
  const handleOpen = () => {
    id.value = route.query.id; // 获取模版id
    if (props.templateInfo) {
      ruleForm.templateTitle = props.templateInfo.template_title;
      ruleForm.templateStyle = props.templateInfo.template_style;
      ruleForm.templateUse = props.templateInfo.template_use;
      ruleForm.templateIndustry = props.templateInfo.template_industry;
      ruleForm.templatePost = props.templateInfo.template_post;
      ruleForm.templateCover = props.templateInfo.template_cover;
    } else {
      resetForm();
    }
  };

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
        if (!ruleForm.templateCover) {
          ElMessage.error('模板预览图不能为空');
          return;
        }
        submitLoading.value = true;
        let params = {
          ...ruleForm,
          templateJson: HJNewJsonStore.value
        };
        if (ruleForm.handle === 'edit') {
          params.id = id.value;
        }
        const data = await templateAddAsync(params);
        if (data.data.status === 200) {
          submitLoading.value = false;
          ElMessage({
            message: '提交成功，待管理员审核过后方可展示',
            type: 'success'
          });
          resetForm();
          emit('success', data.data.data);
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
    const data = await getTemplateStyleListAsync();
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
      ElMessage.error(data.message);
    }
  };
  getCategoryList();

  // 上传文件地址
  const uploadAddress = () => {
    return CONFIG.serverAddress + '/huajian/upload/file/createTemplate';
  };

  const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    ruleForm.templateCover = response.data.data.fileUrl;
  };

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 10) {
      ElMessage.error('预览图不能大于10M');
      return false;
    }
    return true;
  };

  // 重置表单
  const resetForm = () => {
    ruleForm.templateTitle = '';
    ruleForm.templateStyle = '';
    ruleForm.templateUse = '';
    ruleForm.templateIndustry = '';
    ruleForm.templatePost = '';
    ruleForm.templateCover = '';
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

    .avatar-uploader .avatar {
      max-width: 100%;
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
