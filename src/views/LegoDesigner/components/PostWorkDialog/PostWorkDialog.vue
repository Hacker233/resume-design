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
      <!-- <el-form-item label="是否免费：" prop="is_free">
        <el-radio-group v-model="howMuchRadio">
          <el-radio label="free" size="default">免费</el-radio>
          <el-radio label="pay" size="default">付费</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="howMuchRadio === 'pay'" label="模板价格：" prop="how_much">
        <el-input-number v-model="ruleForm.how_much" :min="1" disabled />
        <span class="how-much">简币</span>
        <img width="18" src="@/assets/images/jianB.png" alt="简币" />
      </el-form-item> -->
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
        <el-button type="primary" :loading="sureLoading" @click="submit(ruleFormRef)">{{
          postWorkInfo ? '确认修改' : '提交审核'
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import {
    getLegoCategoryListAsync,
    legoTemplateAddAsync,
    legoTemplateUpdateAsync
  } from '@/http/api/lego';
  import { FormInstance, FormRules, UploadProps } from 'element-plus';
  import appStore from '@/store';
  import CONFIG from '@/config';
  import { storeToRefs } from 'pinia';
  import { getUuid } from '@/utils/common';

  const { HJSchemaJsonStore } = storeToRefs(appStore.useLegoJsonStore);

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogPostWorkVisible: boolean;
    postWorkInfo: any;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogPostWorkVisible: false,
    postWorkInfo: null
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
    how_much: 5
  });
  const rules = reactive<FormRules>({});

  watch(
    () => props.postWorkInfo,
    (newVal) => {
      if (newVal) {
        ruleForm.title = newVal.title;
        ruleForm.category = newVal.category;
        ruleForm.previewUrl = newVal.previewUrl;
        ruleForm.how_much = newVal.how_much;
      }
    }
  );

  // 付费免费单选按钮
  // const howMuchRadio = ref<string>(props.postWorkInfo?.how_much === 0 ? 'free' : 'pay');

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
    return CONFIG.serverAddress + '/huajian/upload/file/legoTemplatePreview';
  };

  const handleAvatarSuccess: UploadProps['onSuccess'] = (response: {
    data: { data: { fileUrl: string } };
  }) => {
    ruleForm.previewUrl = response.data.data.fileUrl;
  };

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 5) {
      ElMessage.error('预览图不能大于5M');
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
        // 新增
        if (!props.postWorkInfo) {
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
          // 更新
          let params = {
            _id: props.postWorkInfo._id,
            lego_json: HJSchemaJsonStore.value,
            previewUrl: ruleForm.previewUrl,
            category: ruleForm.category,
            how_much: ruleForm.how_much,
            title: ruleForm.title
          };
          sureLoading.value = true;
          const data = await legoTemplateUpdateAsync(params);
          if (data.data.status === 200) {
            ElMessage.success('更新成功');
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
  .how-much {
    margin: 0 5px 0 10px;
  }
</style>
