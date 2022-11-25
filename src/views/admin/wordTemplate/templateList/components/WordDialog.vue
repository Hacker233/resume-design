<!-- 新增word模板弹窗弹窗 -->
<template>
  <el-dialog
    :model-value="dialogWordVisible"
    :title="title"
    width="500px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
    class="word-template-dialog"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="90px"
      size="default"
      label-position="left"
    >
      <el-form-item label="模板名称:" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="模板分类:" prop="category">
        <el-select v-model="ruleForm.category" placeholder="请选择模板分类" size="default" multiple>
          <el-option
            v-for="item in categoryList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="模板标签:">
        <el-select
          v-model="ruleForm.tagsValue"
          multiple
          :multiple-limit="6"
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="请输入标签，最多6个"
          suffix-icon=""
          @change="tagsChange"
        >
          <el-option
            v-for="item in tagsOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="模板简介:" prop="profile">
        <el-input
          v-model="ruleForm.profile"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
        />
      </el-form-item>
      <el-form-item label="上传文件:">
        <el-upload
          v-model:file-list="fileList"
          :action="uploadAddress()"
          :headers="{ Authorization: appStore.useTokenStore.token }"
          :limit="1"
          :on-success="handleWordFileSuccess"
          :on-remove="handleWordFileRemove"
          :before-upload="beforeWordFileUpload"
        >
          <el-button type="primary">上传word模板</el-button>
          <template #tip>
            <div class="el-upload__tip"> word模板大小不能超过20M. </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="预览图:">
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
        <el-button type="primary" :loading="sureLoading" @click="submit(ruleFormRef)"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import CONFIG from '@/config';
  import { updateWordAsync, wordAddAsync } from '@/http/api/wordTemplate';
  import {
    FormInstance,
    FormRules,
    UploadFile,
    UploadFiles,
    UploadProps,
    UploadUserFile
  } from 'element-plus';
  import appStore from '@/store';
  import { compressFile } from '@/utils/common';
  import { filesUploadAsync } from '@/http/api/upload';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogWordVisible: boolean;
    row: any;
    title: string;
    categoryList: any;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogWordVisible: false,
    row: null,
    title: '新增模板',
    categoryList: []
  });

  watch(
    () => props.row,
    (newVal) => {
      if (newVal) {
        ruleForm.category = props.row.category;
        ruleForm.fileUrl = JSON.parse(props.row.fileUrl);
        ruleForm.name = props.row.name;
        ruleForm.profile = props.row.profile;
        ruleForm.tagsValue = props.row.tags;
        ruleForm.uploadPreviewList = props.row.previewUrl ? JSON.parse(props.row.previewUrl) : [];
        previewFileList.value = props.row.previewUrl ? JSON.parse(props.row.previewUrl) : [];
        fileList.value = JSON.parse(props.row.fileUrl);
        console.log('ruleForm', ruleForm);
      }
    },
    {
      deep: true
    }
  );

  interface IAudit {
    name: string;
    profile: string;
    category: any;
    tagsValue: any;
    fileUrl: any;
    uploadPreviewList: any;
  }
  // 表单填写数据
  const ruleForm = reactive<IAudit>({
    name: '',
    profile: '', // 模板简介
    category: [],
    tagsValue: [],
    fileUrl: [],
    uploadPreviewList: []
  });
  const rules = reactive<FormRules>({
    name: [{ required: true, message: '模板名称不能为空！', trigger: 'change' }],
    category: [{ required: true, message: '模板分类不能为空！', trigger: 'change' }],
    profile: [{ required: true, message: '模板简介不能为空！', trigger: 'change' }],
    tags: [{ type: 'array', required: true, message: '模板标签不能为空！', trigger: 'change' }],
    fileUrl: [{ required: true, message: '请上传模板文件！', trigger: 'change' }]
  });

  // 模板标签
  const tagsOptions = [
    {
      value: 'A4',
      label: 'A4'
    }
  ];
  // 标签内容变化
  const tagsChange = (value: any) => {
    console.log(value, ruleForm.tagsValue);
  };

  // 文件上传
  const fileList = ref<UploadUserFile[]>([]);
  const handleWordFileSuccess: UploadProps['onSuccess'] = (
    response: any,
    uploadFile: UploadFile,
    uploadFiles: UploadFiles
  ) => {
    console.log('response', response);
    console.log('uploadFile', uploadFile);
    console.log('UploadFiles', uploadFiles);
    ruleForm.fileUrl = uploadFiles.map((item: any) => {
      if (item.response) {
        return {
          name: item.name,
          url: item.response.data.data.fileUrl
        };
      } else {
        return item;
      }
    });
  };
  const handleWordFileRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log('uploadFile', uploadFile);
    ruleForm.fileUrl = uploadFiles.map((item: any) => {
      if (item.response) {
        return {
          name: item.name,
          url: item.response.data.data.fileUrl
        };
      } else {
        return item;
      }
    });
  };

  const beforeWordFileUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 20) {
      ElMessage.error('文件不能大于20M');
      return false;
    }
    return true;
  };
  // 上传文件地址
  const uploadAddress = () => {
    return CONFIG.serverAddress + '/huajian/upload/file/wordTemplate';
    // return 'https://91huajian.cn/huajian/upload/file/wordTemplate';
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
    ruleForm.uploadPreviewList = []; // 原来已经上传的文件
    for (let index = 0; index < uploadFiles.length; index++) {
      if (!uploadFiles[index].raw) {
        ruleForm.uploadPreviewList.push({
          name: uploadFiles[index].name,
          url: uploadFiles[index].url
        });
      }
      previewFileList.value.push(uploadFiles[index]);
    }

    console.log('移除后的previewFileList', previewFileList.value);
    console.log('移除后的uploadPreviewList', ruleForm.uploadPreviewList);
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
        const files: any = await compressFile(previewFileList.value[index].raw, 0.3); // 压缩图片
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
    const data = await filesUploadAsync(formData, 'wordTemplate');
    if (data.data.status === 200) {
      previewFileList.value = ruleForm.uploadPreviewList.concat(data.data.data);
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
        // 上传预览图文件
        await submitUpload();
        if (props.title === '新增模板') {
          let params = {
            name: ruleForm.name, // word模板名称
            profile: ruleForm.profile, // 模板简介
            category: ruleForm.category, // 模板分类
            previewUrl: JSON.stringify(previewFileList.value), // 模板预览图
            fileUrl: JSON.stringify(ruleForm.fileUrl), // 文件地址
            tags: ruleForm.tagsValue // 模板标签
          };
          sureLoading.value = true;
          const data = await wordAddAsync(params);
          if (data.data.status === 200) {
            ElMessage.success('新增成功');
            sureLoading.value = false;
            emit('updateSuccess');
            // 重置表单
            ruleFormRef.value.resetFields();
            fileList.value = [];
            previewFileList.value = [];
            ruleForm.tagsValue = [];
          } else {
            sureLoading.value = false;
            ElMessage.error(data.data.message);
          }
        } else {
          let params = {
            id: props.row._id,
            name: ruleForm.name, // word模板名称
            profile: ruleForm.profile, // 模板简介
            category: ruleForm.category, // 模板分类
            previewUrl: JSON.stringify(previewFileList.value), // 模板预览图
            fileUrl: JSON.stringify(ruleForm.fileUrl), // 文件地址
            tags: ruleForm.tagsValue // 模板标签
          };
          sureLoading.value = true;
          const data = await updateWordAsync(params);
          if (data.data.status === 200) {
            ElMessage.success('更新成功');
            sureLoading.value = false;
            emit('updateSuccess');
            // 重置表单
            ruleFormRef.value.resetFields();
            fileList.value = [];
            previewFileList.value = [];
            ruleForm.tagsValue = [];
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

  .word-template-dialog {
    .el-select {
      width: 100%;
    }

    .upload-demo {
      width: 100%;
    }
  }
</style>
