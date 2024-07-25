<!-- 新增或编辑软件资源弹窗弹窗 -->
<template>
  <el-dialog
    :model-value="dialogSoftVisible"
    :title="title"
    width="800px"
    :show-close="false"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    append-to-body
    class="soft-share-dialog-box"
    @open="handleOpen"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
      size="default"
      label-position="left"
    >
      <el-form-item label="软件名称:" prop="sourceTitle">
        <el-input v-model="ruleForm.sourceTitle" />
      </el-form-item>
      <el-form-item label="软件分类:" prop="socategoryName">
        <el-select
          v-model="ruleForm.socategoryName"
          placeholder="请选择软件分类分类"
          size="default"
          style="width: 100%"
        >
          <el-option
            v-for="item in categoryList"
            :key="item._id"
            :label="item.socategory_name"
            :value="item.socategory_name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="添加标签" prop="sourceTags">
        <div class="tags-add-box">
          <el-tag
            v-for="tag in ruleForm.sourceTags"
            :key="tag"
            class="tags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <!-- 标签数目超过3个则不允许添加 -->
          <template v-if="ruleForm.sourceTags.length < 3">
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
      <el-form-item label="软件简介:" prop="sourceAbstract">
        <comm-editor v-model="ruleForm.sourceAbstract" height="300px"></comm-editor>
      </el-form-item>
      <el-form-item label="下载链接">
        <div
          v-for="(item, index) in ruleForm.sourceDownload"
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
              :disabled="index !== ruleForm.sourceDownload.length - 1"
              type="primary"
              :icon="Plus"
              circle
              @click="addDownload"
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="软件封面:">
        <el-upload
          class="avatar-uploader"
          :action="uploadAddress()"
          :headers="{ Authorization: appStore.useTokenStore.token }"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="ruleForm.sourceCover" :src="ruleForm.sourceCover" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="软件图片:">
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
  import { FormInstance, FormRules, UploadProps } from 'element-plus';
  import { Plus, SemiSelect } from '@element-plus/icons-vue';
  import CONFIG from '@/config';
  import appStore from '@/store';
  import { filesUploadAsync } from '@/http/api/upload';
  import { compressFile } from '@/utils/common';
  import { addSoftAsync, updateSoftAsync } from '@/http/api/softShare';
  import { cloneDeep } from 'lodash';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogSoftVisible: boolean;
    row: any;
    btnText: string;
    title: string;
    categoryList: any;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogSoftVisible: false,
    row: null,
    btnText: '新增',
    title: '新增分类',
    categoryList: []
  });

  watch(
    () => props.row,
    (newVal) => {
      if (newVal) {
        ruleForm.sourceTitle = props.row.source_title;
        ruleForm.sourceCover = props.row.source_cover;
        ruleForm.sourceAbstract = props.row.source_abstract;
        ruleForm.sourceTags = props.row.source_tags;
        ruleForm.socategoryName = props.row.source_category;
        ruleForm.sourceDownload = props.row.source_download;
        ruleForm.sourceScreen = cloneDeep(props.row.source_screen);
        previewFileList.value = cloneDeep(props.row.source_screen);
      }
    },
    {
      deep: true
    }
  );

  interface ISoftShare {
    sourceTitle: string;
    sourceCover: string;
    sourceAbstract: string;
    sourceTags: Array<string>;
    socategoryName: string;
    sourceDownload: Array<any>;
    sourceScreen: Array<any>;
  }
  // 表单填写数据
  let ruleForm = reactive<ISoftShare>({
    sourceTitle: '',
    sourceCover: '',
    sourceAbstract: '',
    sourceTags: [],
    socategoryName: '',
    sourceDownload: [
      {
        name: '',
        link: '',
        pass: ''
      }
    ],
    sourceScreen: []
  });
  const rules = reactive<FormRules>({});

  // 弹窗打开回调
  const handleOpen = () => {
    if (props.btnText === '新增') {
      ruleFormRef.value.resetFields();
      resetForm();
    }
  };

  // 删除一个标签
  const handleClose = (tag: string) => {
    ruleForm.sourceTags.splice(ruleForm.sourceTags.indexOf(tag), 1);
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
      ruleForm.sourceTags.push(inputValue.value);
    }
    inputVisible.value = false;
    inputValue.value = '';
  };

  // 添加下载链接
  const addDownload = () => {
    ruleForm.sourceDownload.push({
      name: '',
      link: '',
      pass: ''
    });
  };

  // 删除下载方式
  const deleteDownload = (index: number): void => {
    ruleForm.sourceDownload.splice(index, 1);
  };

  // 上传文件地址
  const uploadAddress = () => {
    return CONFIG.serverAddress + '/huajian/upload/file/sourceShare';
  };

  const handleAvatarSuccess: UploadProps['onSuccess'] = (response: {
    data: { data: { fileUrl: string } };
  }) => {
    ruleForm.sourceCover = response.data.data.fileUrl;
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
    ruleForm.sourceScreen = []; // 原来已经上传的文件
    for (let index = 0; index < uploadFiles.length; index++) {
      if (!uploadFiles[index].raw) {
        ruleForm.sourceScreen.push({
          name: uploadFiles[index].name,
          url: uploadFiles[index].url
        });
      }
      previewFileList.value.push(uploadFiles[index]);
    }

    console.log('移除后的previewFileList', previewFileList.value);
    console.log('移除后的uploadPreviewList', ruleForm.sourceScreen);
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
      previewFileList.value = ruleForm.sourceScreen.concat(data.data.data);
      return;
    } else {
      ElMessage.error(data.data.message);
      sureLoading.value = false;
    }
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
        sureLoading.value = true;
        // 上传预览图文件
        await submitUpload();
        // 新增
        if (props.btnText === '新增') {
          let params = {
            sourceTitle: ruleForm.sourceTitle,
            sourceCover: ruleForm.sourceCover,
            sourceAbstract: ruleForm.sourceAbstract,
            sourceTags: ruleForm.sourceTags,
            socategoryName: ruleForm.socategoryName,
            sourceDownload: ruleForm.sourceDownload,
            sourceScreen: previewFileList.value
          };
          const data = await addSoftAsync(params);
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
            sourceId: props.row._id,
            sourceTitle: ruleForm.sourceTitle,
            sourceCover: ruleForm.sourceCover,
            sourceAbstract: ruleForm.sourceAbstract,
            sourceTags: ruleForm.sourceTags,
            socategoryName: ruleForm.socategoryName,
            sourceDownload: ruleForm.sourceDownload,
            sourceScreen: previewFileList.value
          };
          const data = await updateSoftAsync(params);
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
    ruleForm.sourceTitle = '';
    ruleForm.sourceAbstract = '';
    ruleForm.sourceCover = '';
    ruleForm.sourceTags = [];
    ruleForm.socategoryName = '';
    ruleForm.sourceDownload = [
      {
        name: '',
        link: '',
        pass: ''
      }
    ];
    ruleForm.sourceScreen = [];
  };
</script>
<style lang="scss">
  .soft-share-dialog-box {
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
    .upload-demo {
      width: 100%;
    }
    .avatar-uploader {
      .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
        width: 200px;
        height: 200px;
      }

      .el-upload:hover {
        border-color: var(--el-color-primary);
      }

      .el-icon.avatar-uploader-icon {
        font-size: 48px;
        color: #8c939d;
        width: 200px;
        height: 200px;
        text-align: center;
      }
      .avatar {
        max-width: 100%;
      }
    }
  }
</style>
