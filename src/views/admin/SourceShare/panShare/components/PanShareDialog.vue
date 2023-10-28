<!-- 新增或编辑软件资源弹窗弹窗 -->
<template>
  <el-dialog
    :model-value="dialogPanShareVisible"
    :title="title"
    width="850px"
    :show-close="false"
    :close-on-click-modal="false"
    class="pan-source-share-dialog-box"
    :append-to-body="false"
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
      <el-form-item label="资源名称：" prop="panSourceTitle">
        <el-input v-model="ruleForm.panSourceTitle" placeholder="请输入网盘资源名称" />
      </el-form-item>
      <el-form-item label="资源价格：" prop="panSourcePrice">
        <el-input-number v-model="ruleForm.panSourcePrice" :min="0" :max="1000000" />
        <img width="24" src="@/assets/images/jianB.png" alt="简币" style="margin-left: 10px" />
      </el-form-item>
      <el-form-item label="资源分类:" prop="panSourceCategory">
        <el-select
          v-model="ruleForm.panSourceCategory"
          placeholder="请选择网盘资源分类"
          size="default"
          style="width: 100%"
        >
          <el-option
            v-for="item in categoryList"
            :key="item._id"
            :label="item.pan_category_name"
            :value="item.pan_category_name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="资源标签：" prop="panSourceTags">
        <div class="tags-add-box">
          <el-tag
            v-for="tag in ruleForm.panSourceTags"
            :key="tag"
            class="tags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <!-- 标签数目超过5个则不允许添加 -->
          <template v-if="ruleForm.panSourceTags.length < 5">
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
      <el-form-item label="资源封面：">
        <el-upload
          class="pan-source-cover-uploader"
          :action="uploadAddress()"
          :headers="{ Authorization: appStore.useTokenStore.token }"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="ruleForm.panSourceCover" :src="ruleForm.panSourceCover" class="avatar" />
          <el-icon v-else class="pan-source-cover-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="下载链接：">
        <div
          v-for="(item, index) in ruleForm.panSourceDownload"
          :key="index"
          class="download-link-box"
        >
          <div>
            <div>方式{{ index + 1 }}：</div>
            <el-input
              v-model="item.name"
              clearable
              placeholder="请输入资源下载标题"
              :maxlength="100"
              show-word-limit
            ></el-input>
            <el-input
              v-model="item.link"
              clearable
              placeholder="请输入资源下载链接"
              :maxlength="100"
              show-word-limit
            ></el-input>
            <el-input
              v-model="item.pass"
              clearable
              placeholder="请输入提取码"
              :maxlength="100"
              show-word-limit
            ></el-input>
          </div>
          <div class="edit-btn">
            <el-button
              :disabled="index === 0"
              type="danger"
              :icon="SemiSelect"
              circle
              @click="deleteDownload(index)"
            />
            <el-button
              :disabled="index !== ruleForm.panSourceDownload.length - 1"
              type="primary"
              :icon="Plus"
              circle
              @click="addDownload"
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="资源简介:" prop="panSourceAbstract">
        <comm-editor v-model="ruleForm.panSourceAbstract" height="400px"></comm-editor>
      </el-form-item>
      <el-form-item label="资源截图:">
        <el-upload
          ref="uploadRef"
          v-model:file-list="previewFileList"
          class="upload-demo"
          multiple
          :auto-upload="false"
          :action="uploadAddress()"
          :headers="{ Authorization: appStore.useTokenStore.token }"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-upload="beforeWordPreviewUpload"
          list-type="picture"
        >
          <el-button type="primary">上传预览图</el-button>
          <template #tip>
            <div class="el-upload__tip"> 预览图大小每张不能超过4M </div>
          </template>
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
  import { UploadProps } from 'element-plus';
  import { addPanSourceAsync, updatePanSourceAsync } from '@/http/api/panShare';
  import { FormInstance, FormRules } from 'element-plus';
  import { Plus, SemiSelect } from '@element-plus/icons-vue';
  import CONFIG from '@/config';
  import appStore from '@/store';
  import { compressFile } from '@/utils/common';
  import { cloneDeep } from 'lodash';
  import { filesUploadAsync } from '@/http/api/upload';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogPanShareVisible: boolean;
    row?: any;
    btnText?: string;
    title: string;
    categoryList: any;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogPanShareVisible: false,
    row: null,
    btnText: '新增',
    title: '新增分类',
    categoryList: []
  });

  watch(
    () => props.row,
    (newVal) => {
      if (newVal) {
        ruleForm.panSourceTitle = props.row.pan_source_title;
        ruleForm.panSourcePrice = props.row.pan_source_price;
        ruleForm.panSourceCover = props.row.pan_source_cover;
        ruleForm.panSourceAbstract = props.row.pan_source_abstract;
        ruleForm.panSourceTags = props.row.pan_source_tags;
        ruleForm.panSourceCategory = props.row.pan_source_category;
        ruleForm.panSourceDownload = props.row.pan_source_download;
        ruleForm.panSourceScreen = cloneDeep(props.row.pan_source_screen);
        previewFileList.value = cloneDeep(props.row.pan_source_screen);
      }
    },
    {
      deep: true
    }
  );

  interface IPanShare {
    panSourceTitle: string;
    panSourcePrice: number;
    panSourceCover: string;
    panSourceAbstract: string;
    panSourceTags: Array<any>;
    panSourceCategory: string;
    panSourceDownload: Array<any>;
    panSourceScreen: Array<any>;
  }
  // 表单填写数据
  const ruleForm = reactive<IPanShare>({
    panSourceTitle: '',
    panSourcePrice: 0,
    panSourceCover: '',
    panSourceAbstract: '',
    panSourceTags: [],
    panSourceCategory: '',
    panSourceDownload: [
      {
        name: '',
        link: '',
        pass: ''
      }
    ],
    panSourceScreen: []
  });
  const rules = reactive<FormRules>({
    panSourceTitle: [{ required: true, message: '资源名称不能为空', trigger: 'change' }],
    panSourcePrice: [{ required: true, message: '资源价格不能为空', trigger: 'change' }],
    panSourceCategory: [{ required: true, message: '资源分类不能为空', trigger: 'change' }]
  });

  // 添加下载链接
  const addDownload = () => {
    ruleForm.panSourceDownload.push({
      name: '',
      link: '',
      pass: ''
    });
  };

  // 删除下载方式
  const deleteDownload = (index: number): void => {
    ruleForm.panSourceDownload.splice(index, 1);
  };

  // 上传文件地址
  const uploadAddress = () => {
    return CONFIG.serverAddress + '/huajian/upload/file/sourceShare';
  };

  const handleAvatarSuccess: UploadProps['onSuccess'] = (response: {
    data: { data: { fileUrl: string } };
  }) => {
    ruleForm.panSourceCover = response.data.data.fileUrl;
  };

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 5) {
      ElMessage.error('封面不能大于5M');
      return false;
    }
    return true;
  };

  // 预览图列表
  const beforeWordPreviewUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 4) {
      ElMessage.error('文件不能大于4M');
      return false;
    }
  };
  const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log('uploadFile', uploadFile, uploadFiles);
    previewFileList.value = [];
    ruleForm.panSourceScreen = []; // 原来已经上传的文件
    for (let index = 0; index < uploadFiles.length; index++) {
      if (!uploadFiles[index].raw) {
        ruleForm.panSourceScreen.push({
          name: uploadFiles[index].name,
          url: uploadFiles[index].url
        });
      }
      previewFileList.value.push(uploadFiles[index]);
    }

    console.log('移除后的previewFileList', previewFileList.value);
    console.log('移除后的uploadPreviewList', ruleForm.panSourceScreen);
  };

  const handlePreview: UploadProps['onPreview'] = (file) => {
    console.log(file);
  };

  // 手动上传预览图
  const previewFileList = ref<any[]>([]);
  const submitUpload = async () => {
    //判断是否有文件再上传
    if (previewFileList.value.length === 0) {
      ElMessage.warning('请选取文件后再上传');
    }
    // 下面的代码将创建一个空的FormData对象:
    const formData = new FormData();
    // 你可以使用FormData.append来添加键/值对到表单里面；
    console.log('上传的文件列表', previewFileList.value);
    for (let index = 0; index < previewFileList.value.length; index++) {
      if (previewFileList.value[index].raw) {
        console.log('压缩前', previewFileList.value[index].raw);
        const files: any = await compressFile(previewFileList.value[index].raw, 0.9); // 压缩图片
        console.log('压缩后', files);
        if (files) {
          formData.append('files', files);
        }
      }
    }
    // 无上传的文件
    if (!formData.get('files')) {
      return;
    }
    // 添加自定义参数，不传可删除
    const data = await filesUploadAsync(formData, 'sourceShare');
    if (data.data.status === 200) {
      previewFileList.value = ruleForm.panSourceScreen.concat(data.data.data);
      return;
    } else {
      ElMessage.error(data.data.message);
      sureLoading.value = false;
    }
  };

  // 删除一个标签
  const handleClose = (tag: string) => {
    ruleForm.panSourceTags.splice(ruleForm.panSourceTags.indexOf(tag), 1);
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
      ruleForm.panSourceTags.push(inputValue.value);
    }
    inputVisible.value = false;
    inputValue.value = '';
  };

  // 取消
  const cancle = () => {
    emit('cancle');
  };

  // 提交
  const sureLoading = ref<boolean>(false);
  const ruleFormRef = ref<any>(null);
  const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        if (previewFileList.value.length) {
          // 上传预览图文件
          await submitUpload();
        }
        // 新增
        if (props.btnText === '新增') {
          let params = {
            panSourceTitle: ruleForm.panSourceTitle, // 资源名称
            panSourcePrice: ruleForm.panSourcePrice, // 资源价格
            panSourceCover: ruleForm.panSourceCover, // 资源封面
            panSourceAbstract: ruleForm.panSourceAbstract, // 资源简介
            panSourceTags: ruleForm.panSourceTags, // 资源标签
            panSourceCategory: ruleForm.panSourceCategory, // 资源分类
            panSourceDownload: ruleForm.panSourceDownload, // 资源下载链接
            panSourceScreen: previewFileList.value // 资源截图
          };
          sureLoading.value = true;
          const data = await addPanSourceAsync(params);
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
            panSourceId: props.row._id,
            panSourceTitle: ruleForm.panSourceTitle, // 资源名称
            panSourcePrice: ruleForm.panSourcePrice, // 资源价格
            panSourceCover: ruleForm.panSourceCover, // 资源封面
            panSourceAbstract: ruleForm.panSourceAbstract, // 资源简介
            panSourceTags: ruleForm.panSourceTags, // 资源标签
            panSourceCategory: ruleForm.panSourceCategory, // 资源分类
            panSourceDownload: ruleForm.panSourceDownload, // 资源下载链接
            panSourceScreen: previewFileList.value // 资源截图
          };
          const data = await updatePanSourceAsync(params);
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

  // 重置表单数据
  const resetForm = () => {
    previewFileList.value = [];
    ruleForm.panSourceTitle = '';
    ruleForm.panSourcePrice = 0;
    ruleForm.panSourceAbstract = '';
    ruleForm.panSourceCover = '';
    ruleForm.panSourceTags = [];
    ruleForm.panSourceCategory = '';
    ruleForm.panSourceDownload = [
      {
        name: '',
        link: '',
        pass: ''
      }
    ];
    ruleForm.panSourceScreen = [];
  };
</script>
<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }

  .pan-source-share-dialog-box {
    .tags-add-box {
      display: flex;
      .tags {
        margin-right: 10px;
      }
    }
    .download-link-box {
      display: flex;
      align-items: center;
      .el-input {
        margin-bottom: 8px;
      }
      .edit-btn {
        display: flex;
        margin-left: 10px;
        margin-top: 15px;
      }
    }
  }
</style>
<style lang="scss">
  .upload-demo {
    width: 100%;
  }
  .pan-source-cover-uploader {
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
      width: 250px;
      height: 300px;
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.pan-source-cover-uploader-icon {
      font-size: 48px;
      color: #8c939d;
      width: 250px;
      height: 300px;
      text-align: center;
    }
    .avatar {
      max-width: 100%;
    }
  }
</style>
