<!-- 新增ppt模板弹窗弹窗 -->
<template>
  <el-dialog
    :model-value="dialogPptVisible"
    :title="title"
    width="500px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
    custom-class="ppt-template-dialog"
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
          :reserve-keyppt="false"
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
      <el-form-item label="模板效果:" prop="effect">
        <el-select v-model="ruleForm.effect" placeholder="请选择效果">
          <el-option
            v-for="item in effectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="模板比列:" prop="proportion">
        <el-select v-model="ruleForm.proportion" placeholder="请选择模板比列">
          <el-option
            v-for="item in proportionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="模板页数:" prop="pages">
        <el-input-number v-model="ruleForm.pages" :min="1" :max="300" />
      </el-form-item>
      <el-form-item label="模板简介:" prop="profile">
        <el-input
          v-model="ruleForm.profile"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
        />
      </el-form-item>
      <el-form-item label="模板封面:">
        <el-upload
          ref="uploadRef"
          v-model:file-list="coverFileList"
          class="upload-demo"
          :action="uploadAddress()"
          :headers="{ Authorization: appStore.useTokenStore.token }"
          :limit="1"
          :on-success="handlePPTCoverFileSuccess"
          :on-remove="handlePPTCoverFileRemove"
          :before-upload="beforePPTCoverFileUpload"
          list-type="picture"
        >
          <el-button type="primary">上传封面图</el-button>
          <template #tip>
            <div class="el-upload__tip"> 预览图大小每张不能超过4M </div>
          </template>
        </el-upload>
      </el-form-item>

      <el-form-item label="上传文件:">
        <el-upload
          v-model:file-list="fileList"
          :action="uploadAddress()"
          :headers="{ Authorization: appStore.useTokenStore.token }"
          :limit="1"
          :on-success="handlePPTFileSuccess"
          :on-remove="handlePPTFileRemove"
          :before-upload="beforePPTFileUpload"
        >
          <el-button type="primary">上传ppt模板</el-button>
          <template #tip>
            <div class="el-upload__tip"> ppt模板大小不能超过20M. </div>
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
          :before-upload="beforePPTPreviewUpload"
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
  import {
    FormInstance,
    FormRules,
    UploadFile,
    UploadFiles,
    UploadInstance,
    UploadProps,
    UploadUserFile
  } from 'element-plus';
  import appStore from '@/store';
  import { pptAddAsync, updatePPTAsync } from '@/http/api/pptTemplate';
  import { filesUploadAsync } from '@/http/api/upload';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogPptVisible: boolean;
    row: any;
    title: string;
    categoryList: any;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogPptVisible: false,
    row: null,
    title: '新增模板',
    categoryList: []
  });

  watch(
    () => props.row,
    (newVal) => {
      if (newVal) {
        ruleForm.category = props.row.category;
        ruleForm.fileUrl = props.row.fileUrl ? JSON.parse(props.row.fileUrl) : [];
        ruleForm.name = props.row.name;
        ruleForm.profile = props.row.profile;
        ruleForm.tagsValue = props.row.tags;
        ruleForm.effect = props.row.effect;
        ruleForm.proportion = props.row.proportion;
        ruleForm.pages = props.row.pages;
        ruleForm.uploadPreviewList = props.row.previewUrl ? JSON.parse(props.row.previewUrl) : [];
        fileList.value = props.row.fileUrl ? JSON.parse(props.row.fileUrl) : [];
        previewFileList.value = props.row.previewUrl ? JSON.parse(props.row.previewUrl) : [];
        coverFileList.value = props.row.cover ? JSON.parse(props.row.cover) : [];
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
    cover: any;
    uploadPreviewList: any;
    effect: string; // 效果
    proportion: string; // 比列
    pages: number; // 总页数
  }
  // 表单填写数据
  const ruleForm = reactive<IAudit>({
    name: '',
    profile: '', // 模板简介
    category: [],
    tagsValue: [],
    fileUrl: [],
    cover: [],
    uploadPreviewList: [],
    effect: '', // 效果
    proportion: '', // 比列
    pages: 0 // 总页数
  });
  const rules = reactive<FormRules>({
    name: [{ required: true, message: '模板名称不能为空！', trigger: 'change' }],
    category: [{ required: true, message: '模板分类不能为空！', trigger: 'change' }],
    profile: [{ required: true, message: '模板简介不能为空！', trigger: 'change' }],
    tags: [{ type: 'array', required: true, message: '模板标签不能为空！', trigger: 'change' }],
    fileUrl: [{ required: true, message: '请上传模板文件！', trigger: 'change' }],
    effect: [{ required: true, message: '请选择模板效果！', trigger: 'change' }],
    proportion: [{ required: true, message: '请选择模板比例！', trigger: 'change' }],
    pages: [{ required: true, message: '请选择模板页数！', trigger: 'change' }]
  });

  // 模板标签
  const tagsOptions = [
    {
      value: '动态',
      label: '动态'
    }
  ];
  // 模板效果
  const effectOptions = [
    {
      value: '动态',
      label: '动态'
    },
    {
      value: '静态',
      label: '静态'
    }
  ];
  // 模板比列
  const proportionOptions = [
    {
      value: '16：9',
      label: '16：9'
    },
    {
      value: '4：3',
      label: '4：3'
    },
    {
      value: 'A4',
      label: 'A4'
    },
    {
      value: '1',
      label: '1'
    },
    {
      value: '其它',
      label: '其它'
    }
  ];
  // 标签内容变化
  const tagsChange = (value: any) => {
    console.log(value, ruleForm.tagsValue);
  };

  // 手动上传
  const previewFileList = ref<any>([]);
  const uploadRef = ref<UploadInstance>();
  const submitUpload = async () => {
    //判断是否有文件再上传
    if (previewFileList.value.length === 0) {
      ElMessage.warning('请选取文件后再上传');
    }
    // 下面的代码将创建一个空的FormData对象:
    const formData = new FormData();
    // 你可以使用FormData.append来添加键/值对到表单里面；
    console.log('上传的文件列表', previewFileList.value);
    previewFileList.value.forEach((file: any) => {
      if (file.raw) {
        formData.append('files', file.raw);
      }
    });
    // 无上传的文件
    if (!formData.get('files')) {
      return;
    }
    // 添加自定义参数，不传可删除
    const data = await filesUploadAsync(formData, 'pptTemplate');
    if (data.data.status === 200) {
      previewFileList.value = ruleForm.uploadPreviewList.concat(data.data.data);
      return;
    } else {
      ElMessage.error(data.data.message);
      sureLoading.value = false;
    }
  };

  // 文件上传
  const fileList = ref<UploadUserFile[]>([]);
  const handlePPTFileSuccess: UploadProps['onSuccess'] = (
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
  const handlePPTFileRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
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

  const beforePPTFileUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 20) {
      ElMessage.error('文件不能大于20M');
      return false;
    }
    return true;
  };

  // 上传模板封面
  const coverFileList = ref<UploadUserFile[]>([]);
  const handlePPTCoverFileSuccess: UploadProps['onSuccess'] = (
    response: any,
    uploadFile: UploadFile,
    uploadFiles: UploadFiles
  ) => {
    console.log('response', response);
    console.log('uploadFile', uploadFile);
    console.log('UploadFiles', uploadFiles);
    ruleForm.cover = uploadFiles.map((item: any) => {
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
  const handlePPTCoverFileRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log('uploadFile', uploadFile);
    ruleForm.cover = uploadFiles.map((item: any) => {
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

  const beforePPTCoverFileUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 20) {
      ElMessage.error('文件不能大于20M');
      return false;
    }
    return true;
  };

  // 上传文件地址
  const uploadAddress = () => {
    return CONFIG.serverAddress + '/huajian/upload/file/pptTemplate';
  };

  // 预览图列表
  const beforePPTPreviewUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 4) {
      ElMessage.error('文件不能大于4M');
      return false;
    }
    return true;
  };
  const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log('uploadFile', uploadFile);
    previewFileList.value = uploadFiles.map((item: any) => {
      if (item.response) {
        return {
          name: item.name,
          url: item.response.data.data.fileUrl
        };
      } else {
        return item;
      }
    });
    console.log('移除后的ruleForm.uploadPreviewList', previewFileList.value);
  };

  const handlePreview: UploadProps['onPreview'] = (file) => {
    console.log(file);
  };

  // 取消
  const cancle = () => {
    emit('cancle');
  };

  // 提交
  const sureLoading = ref<boolean>(false);
  const ruleFormRef = ref<FormInstance>();
  const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        sureLoading.value = true;
        // 上传文件
        await submitUpload();
        if (props.title === '新增模板') {
          let params = {
            name: ruleForm.name, // ppt模板名称
            profile: ruleForm.profile, // 模板简介
            category: ruleForm.category, // 模板分类
            previewUrl: JSON.stringify(previewFileList.value), // 模板预览图
            fileUrl: JSON.stringify(ruleForm.fileUrl), // 文件地址
            cover: JSON.stringify(ruleForm.cover),
            tags: ruleForm.tagsValue, // 模板标签
            effect: ruleForm.effect,
            proportion: ruleForm.proportion,
            pages: ruleForm.pages
          };

          const data = await pptAddAsync(params);
          if (data.data.status === 200) {
            ElMessage.success('新增成功');
            sureLoading.value = false;
            emit('updateSuccess');
          } else {
            sureLoading.value = false;
            ElMessage.error(data.data.message);
          }
        } else {
          let params = {
            id: props.row._id,
            name: ruleForm.name, // ppt模板名称
            profile: ruleForm.profile, // 模板简介
            category: ruleForm.category, // 模板分类
            previewUrl: JSON.stringify(previewFileList.value), // 模板预览图
            fileUrl: JSON.stringify(ruleForm.fileUrl), // 文件地址
            cover: JSON.stringify(ruleForm.cover),
            tags: ruleForm.tagsValue, // 模板标签
            effect: ruleForm.effect,
            proportion: ruleForm.proportion,
            pages: ruleForm.pages
          };

          const data = await updatePPTAsync(params);
          if (data.data.status === 200) {
            ElMessage.success('更新成功');
            sureLoading.value = false;
            emit('updateSuccess');
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

  .ppt-template-dialog {
    .el-select {
      width: 100%;
    }

    .upload-demo {
      width: 100%;
    }
  }
</style>
