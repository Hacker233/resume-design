<!-- 新增或编辑软件资源弹窗弹窗 -->
<template>
  <el-dialog
    :model-value="dialogWebsiteVisible"
    :title="title"
    width="700px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
    @open="handleOpen"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      size="default"
      label-position="left"
      @submit.prevent
    >
      <el-form-item label="网站类型:" prop="websiteTypeId">
        <el-select
          v-model="ruleForm.websiteTypeId"
          placeholder="请选择所属类型"
          size="default"
          style="width: 100%"
          @change="handleSelectChange"
        >
          <el-option
            v-for="item in typeList"
            :key="item._id"
            :label="item.website_type_name"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="网站分类" prop="websiteCategory">
        <el-select
          v-model="ruleForm.websiteCategory"
          placeholder="请选择分类"
          size="default"
          style="width: 100%"
          :disabled="ruleForm.websiteTypeId ? false : true"
        >
          <el-option
            v-for="item in categoryListByType"
            :key="item._id"
            :label="item.website_category"
            :value="item.website_category"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="网站标题" prop="websiteTitle">
        <el-input v-model.trim="ruleForm.websiteTitle" :maxlength="100" show-word-limit />
      </el-form-item>
      <el-form-item label="网站简介" prop="websiteAbstract">
        <el-input v-model.trim="ruleForm.websiteAbstract" type="textarea" :rows="5" />
      </el-form-item>
      <el-form-item label="网站链接" prop="websiteLink">
        <el-input v-model.trim="ruleForm.websiteLink" />
      </el-form-item>
      <el-form-item label="网站标签" prop="websiteTags">
        <div class="tags-add-box">
          <el-tag
            v-for="tag in ruleForm.websiteTags"
            :key="tag"
            class="tags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <!-- 标签数目超过5个则不允许添加 -->
          <template v-if="ruleForm.websiteTags.length < 5">
            <el-input
              v-if="inputVisible"
              ref="saveTagInput"
              v-model="inputValue"
              class="input-new-tag"
              :maxlength="10"
              show-word-limit
              size="small"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput"
              >添加标签</el-button
            >
          </template>
        </div>
      </el-form-item>
      <el-form-item label="网站图标:" prop="websiteIcon">
        <el-upload
          class="website-icon-uploader"
          :action="uploadAddress()"
          :headers="{ Authorization: appStore.useTokenStore.token }"
          :show-file-list="false"
          :on-success="handleWebsiteIconSuccess"
          :before-upload="beforeWebsiteIconUpload"
        >
          <img v-if="ruleForm.websiteIcon" :src="ruleForm.websiteIcon" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="网站快照:" prop="websiteScreen">
        <el-upload
          class="website-screen-uploader"
          :action="uploadAddress()"
          :headers="{ Authorization: appStore.useTokenStore.token }"
          :show-file-list="false"
          :on-success="handleWebsiteScreenSuccess"
          :before-upload="beforeWebsiteScreenUpload"
        >
          <img v-if="ruleForm.websiteScreen" :src="ruleForm.websiteScreen" class="avatar" />
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
  import CONFIG from '@/config';
  import { addWebsiteAsync, updateWebsiteAsync } from '@/http/api/websiteShare';
  import { FormInstance, FormRules, UploadProps } from 'element-plus';
  import appStore from '@/store';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogWebsiteVisible: boolean;
    row?: any;
    typeList: any;
    btnText?: string;
    title: string;
    categoryList: any;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogWebsiteVisible: false,
    row: null,
    typeList: [],
    btnText: '新增',
    title: '新增分类',
    categoryList: []
  });

  watch(
    () => props.row,
    (newVal) => {
      if (newVal) {
        ruleForm.websiteTypeName = props.row.website_type_name;
        ruleForm.websiteTypeId = props.row.website_type_id;
        ruleForm.websiteCategory = props.row.website_category;
        ruleForm.websiteTitle = props.row.website_title;
        ruleForm.websiteAbstract = props.row.website_abstract;
        ruleForm.websiteLink = props.row.website_link;
        ruleForm.websiteTags = props.row.website_tags;
        ruleForm.websiteIcon = props.row.website_icon;
        ruleForm.websiteScreen = props.row.website_screen;
      }
    },
    {
      deep: true
    }
  );

  interface ICategory {
    websiteTypeName: string;
    websiteTypeId: string;
    websiteCategory: string;
    websiteTitle: string;
    websiteAbstract: string;
    websiteLink: string;
    websiteTags: any;
    websiteIcon: string;
    websiteScreen: string;
  }
  // 表单填写数据
  const ruleForm = reactive<ICategory>({
    websiteTypeName: '',
    websiteTypeId: '',
    websiteCategory: '',
    websiteTitle: '',
    websiteAbstract: '',
    websiteLink: '',
    websiteTags: [],
    websiteIcon: '',
    websiteScreen: ''
  });
  const rules = reactive<FormRules>({
    websiteTypeId: [{ required: true, message: '网站类型不能为空', trigger: 'change' }],
    websiteCategory: [{ required: true, message: '分类名不能为空', trigger: 'change' }],
    websiteTitle: [{ required: true, message: '网站标题不能为空', trigger: 'change' }],
    websiteAbstract: [{ required: true, message: '网站简介不能为空', trigger: 'change' }],
    websiteLink: [{ required: true, message: '网站链接不能为空', trigger: 'change' }],
    websiteTags: [{ required: true, message: '网站标签不能为空', trigger: 'change' }],
    websiteIcon: [{ required: true, message: '网站图标不能为空', trigger: 'change' }]
    // websiteScreen: [{ required: true, message: '网站快照不能为空', trigger: 'change' }]
  });

  // 删除一个标签
  const handleClose = (tag: string) => {
    ruleForm.websiteTags.splice(ruleForm.websiteTags.indexOf(tag), 1);
  };

  const inputVisible = ref<boolean>(false); // 标签输入框
  const inputValue = ref<string>('');
  const saveTagInput = ref<any>(null);
  const showInput = async () => {
    inputVisible.value = true;
    await nextTick();
    saveTagInput.value.input.focus();
  };

  const handleInputConfirm = () => {
    if (inputValue.value) {
      ruleForm.websiteTags.push(inputValue.value);
    }
    inputVisible.value = false;
    inputValue.value = '';
    console.log('标签', ruleForm.websiteTags);
  };

  // 上传文件地址
  const uploadAddress = () => {
    return CONFIG.serverAddress + '/huajian/upload/file/sourceShare';
  };

  // 网站图标
  const handleWebsiteIconSuccess: UploadProps['onSuccess'] = (response: {
    data: { data: { fileUrl: string } };
  }) => {
    ruleForm.websiteIcon = response.data.data.fileUrl;
  };

  const beforeWebsiteIconUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 3) {
      ElMessage.error('图标不能大于3M');
      return false;
    }
    return true;
  };

  // 网站快照
  const handleWebsiteScreenSuccess: UploadProps['onSuccess'] = (response: {
    data: { data: { fileUrl: string } };
  }) => {
    ruleForm.websiteScreen = response.data.data.fileUrl;
  };

  const beforeWebsiteScreenUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 4) {
      ElMessage.error('图片不能大于4M');
      return false;
    }
    return true;
  };

  // 取消
  const cancle = () => {
    emit('cancle');
  };

  // 类型选择变化
  const categoryListByType = ref<any>([]);
  const handleSelectChange = (id: string) => {
    props.typeList.forEach((item: { _id: string; website_type_name: string }) => {
      if (item._id === id) {
        ruleForm.websiteTypeName = item.website_type_name;
      }
    });
    // 根据类型筛选出分类
    categoryListByType.value = [];
    props.categoryList.forEach((item: { website_type_id: string }) => {
      if (item.website_type_id === id) {
        categoryListByType.value.push(item);
      }
    });
  };

  // 提交
  const sureLoading = ref<boolean>(false);
  const ruleFormRef = ref<any>(null);
  const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        // 新增
        if (props.btnText === '新增') {
          let params = {
            websiteTypeName: ruleForm.websiteTypeName,
            websiteTypeId: ruleForm.websiteTypeId,
            websiteCategory: ruleForm.websiteCategory,
            websiteTitle: ruleForm.websiteTitle,
            websiteAbstract: ruleForm.websiteAbstract,
            websiteLink: ruleForm.websiteLink,
            websiteTags: ruleForm.websiteTags,
            websiteIcon: ruleForm.websiteIcon,
            websiteScreen: ruleForm.websiteScreen
          };
          sureLoading.value = true;
          const data = await addWebsiteAsync(params);
          if (data.data.status === 200) {
            ElMessage.success('添加成功');
            sureLoading.value = false;
            emit('updateSuccess');
            ruleFormRef.value.resetFields();
            resetForm();
          } else {
            sureLoading.value = false;
            ElMessage.error(data.data.message);
          }
        } else {
          let params = {
            websiteId: props.row._id,
            websiteTypeId: ruleForm.websiteTypeId,
            websiteCategory: ruleForm.websiteCategory,
            websiteTitle: ruleForm.websiteTitle,
            websiteAbstract: ruleForm.websiteAbstract,
            websiteLink: ruleForm.websiteLink,
            websiteTags: ruleForm.websiteTags,
            websiteIcon: ruleForm.websiteIcon,
            websiteScreen: ruleForm.websiteScreen
          };
          const data = await updateWebsiteAsync(params);
          if (data.data.status === 200) {
            ElMessage.success('修改成功');
            sureLoading.value = false;
            emit('updateSuccess');
            ruleFormRef.value.resetFields();
            resetForm();
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

  // 弹窗打开回调
  const handleOpen = () => {
    if (props.btnText === '新增') {
      ruleFormRef.value.resetFields();
      resetForm();
    }
  };

  // 重置表单
  const resetForm = () => {
    ruleForm.websiteTypeName = '';
    ruleForm.websiteTypeId = '';
    ruleForm.websiteCategory = '';
    ruleForm.websiteTitle = '';
    ruleForm.websiteAbstract = '';
    ruleForm.websiteLink = '';
    ruleForm.websiteTags = [];
    ruleForm.websiteIcon = '';
    ruleForm.websiteScreen = '';
  };
</script>
<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
  .tags-add-box {
    display: flex;
    .tags {
      margin-right: 10px;
    }
  }

  :deep(.website-icon-uploader) {
    border: 1px dashed #4dd3b2;
    width: 60px;
    height: 60px;
    border-radius: 6px;
    .el-upload {
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: #4dd3b2;
      width: 60px;
      height: 60px;
    }

    .el-upload:hover {
      border-color: #4dd3b2;
    }

    .el-icon.avatar-uploader-icon {
      font-size: 20px;
      color: #8c939d;
      width: 60px;
      height: 60px;
      text-align: center;
    }
    .avatar {
      max-width: 100%;
    }
  }

  :deep(.website-screen-uploader) {
    border: 1px dashed #4dd3b2;
    border-radius: 6px;
    .el-upload {
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: #4dd3b2;
      width: 300px;
      height: 200px;
    }

    .el-upload:hover {
      border-color: #4dd3b2;
    }

    .el-icon.avatar-uploader-icon {
      font-size: 50px;
      color: #8c939d;
      width: 300px;
      height: 200px;
      text-align: center;
    }
    .avatar {
      max-width: 100%;
    }
  }
</style>
