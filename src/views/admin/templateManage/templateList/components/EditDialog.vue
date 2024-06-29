<template>
  <el-dialog
    :model-value="dialogVisible"
    width="60%"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
    class="import-json"
  >
    <!-- 头部 -->
    <template #header>
      <div class="header">
        <div class="header-left">
          <h1 class="title">请在编辑器内修改简历模板数据：</h1>
        </div>
      </div>
    </template>
    <!-- 代码编辑器 -->
    <div class="code-mirror-box">
      <div class="left">
        <codemirror
          v-model="code"
          placeholder="请将你在自定义模板下载的JSON数据粘贴在此处哦~~"
          :style="{ height: '400px' }"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="2"
          :extensions="extensions"
        />
      </div>
      <div class="right">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          size="default"
          status-icon
        >
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
          <el-form-item label="模板封面：">
            <el-upload
              class="avatar-uploader"
              :action="uploadAddress()"
              :headers="{ Authorization: appStore.useTokenStore.token }"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="previewUrl" :src="previewUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </el-form>

        <div class="confirm-btn">
          <el-button @click="cancle">取消</el-button>
          <el-button type="primary" @click="confirmJson">确定</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { Codemirror } from 'vue-codemirror';
  import { javascript } from '@codemirror/lang-javascript';
  import { oneDark } from '@codemirror/theme-one-dark';
  import { json } from '@codemirror/lang-json';
  import { ref } from 'vue';
  import { ElMessage, FormInstance, FormRules } from 'element-plus';
  import { isJSON } from '@/utils/common';
  import appStore from '@/store';
  import CONFIG from '@/config';
  import { UploadProps } from 'element-plus';
  import { updateTemplateAsync } from '@/http/api/resume';
  import { getCategoryListAsync } from '@/http/api/category';

  const emit = defineEmits(['cancle', 'updateSuccess']);

  interface TDialog {
    dialogVisible: boolean;
    row: any;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogVisible: false,
    row: null
  });
  // 表单相关
  const categoryList = ref<any>([]);
  const ruleFormRef = ref<FormInstance>();
  const ruleForm = reactive({
    category: ''
  });
  const rules = reactive<FormRules>({
    category: [{ required: true, message: '请选择分类', trigger: 'change' }]
  });

  watch(
    () => props.row,
    (newVal) => {
      if (newVal) {
        console.log(newVal);
        previewUrl.value = newVal.previewUrl;
        code.value = JSON.stringify(newVal, null, 2);
        ruleForm.category = newVal.CATEGORY;
      }
    },
    {
      deep: true
    }
  );
  const previewUrl = ref<string>('');

  // 查询分类列表
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
    previewUrl.value = response.data.data.fileUrl;
  };

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 10) {
      ElMessage.error('预览图不能大于10M');
      return false;
    }
    return true;
  };

  // 代码编辑器
  const code = ref<any>('');
  const extensions = [javascript(), oneDark, json()];

  // 取消
  const cancle = () => {
    emit('cancle');
  };

  // 点击提交
  const confirmJson = async () => {
    if (!code.value) {
      ElMessage({
        message: '数据不能为空！',
        type: 'error',
        center: true
      });
      return;
    }
    let isCurrentJSON = isJSON(code.value);
    if (!isCurrentJSON) {
      ElMessage({
        message: 'JSON格式不正确！',
        type: 'error',
        center: true
      });
      return;
    }
    // // 处理数据
    let updateJSON = JSON.parse(code.value);
    let params = {
      ID: updateJSON.ID,
      USER: updateJSON.USER,
      EMAIL: updateJSON.EMAIL,
      previewUrl: previewUrl.value,
      NAME: updateJSON.NAME,
      TITLE: updateJSON.TITLE,
      LAYOUT: updateJSON.LAYOUT,
      COMPONENTS: updateJSON.COMPONENTS,
      GLOBAL_STYLE: updateJSON.GLOBAL_STYLE,
      CATEGORY: ruleForm.category
    };
    const data = await updateTemplateAsync(params);
    if (data.data.status === 200) {
      ElMessage.success('更新成功');
      emit('updateSuccess');
    } else {
      ElMessage.error(data.data.message);
      emit('cancle');
    }
  };
</script>
<style lang="scss">
  .import-json {
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .header-left {
        display: flex;
        flex-direction: column;
        height: 10px;
        justify-content: space-between;
        .title {
          font-size: 20px;
        }
        span {
          font-size: 12px;
          color: red;
          display: flex;
          align-items: center;
          .svg-icon {
            margin-right: 5px;
          }
        }
      }
    }
    .code-mirror-box {
      padding: 20px;
      display: flex;
      .left {
        width: 70%;
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        .avatar-uploader .avatar {
          width: 260px;
          height: 365px;
          display: block;
        }
        .confirm-btn {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
        }
      }
    }
    .el-dialog__header {
      padding: 20px;
    }
    .el-dialog__body {
      padding: 0;
    }
    .el-dialog__footer {
      padding: 20px;
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

  .cm-editor {
    height: 70vh;
  }
  .el-overlay-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    // .el-dialog {
    //   padding: 0;
    //   margin: 0;
    // }
  }
</style>
