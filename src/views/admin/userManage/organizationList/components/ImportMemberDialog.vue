<!-- 新增组织弹窗 -->
<template>
  <el-dialog
    class="import-member-dialog"
    :model-value="dialogImportVisible"
    title="导入组织成员"
    width="700px"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <el-upload
      v-if="!previewData.length"
      class="upload-demo"
      drag
      action=""
      :auto-upload="false"
      :on-change="handleFileChange"
      :accept="'.xlsx,.xls'"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text"> 将Excel文件拖到此处，或<em>点击上传</em> </div>
      <template #tip>
        <div class="el-upload__tip"> 只能上传Excel文件 </div>
      </template>
    </el-upload>

    <el-table v-else :data="previewData" border style="width: 100%">
      <el-table-column
        v-for="(header, index) in tableHeaders"
        :key="index"
        :prop="header"
        :label="header"
      />
    </el-table>

    <div v-if="previewData.length" class="reupload-btn">
      <el-button type="primary" plain @click="handleReupload">重新上传</el-button>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button
          v-if="previewData.length"
          type="primary"
          :loading="sureLoading"
          @click="submitImport"
          >确认导入</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { UploadFilled } from '@element-plus/icons-vue';
  import * as XLSX from 'xlsx';
  import { batchAddUserByAdminAsync } from '@/http/api/user';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  const previewData = ref<any[]>([]);
  const tableHeaders = ref<string[]>([]);
  const sureLoading = ref(false);

  interface TDialog {
    dialogImportVisible: boolean;
    row: any;
  }

  const props = withDefaults(defineProps<TDialog>(), {
    dialogImportVisible: false,
    row: null
  });

  // 处理文件上传
  const handleFileChange = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // 获取第二行作为表头
      const headers = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 1 })[0] as string[];

      // 验证表头
      const expectedHeaders = ['用户名称', '用户账号', '初始密码', '头像地址'];
      if (!expectedHeaders.every((h) => headers.includes(h))) {
        ElMessage.error('表头格式不正确，请确保包含：用户名称、用户账号、初始密码、头像地址');
        return;
      }

      // 从第三行开始获取数据并映射到指定格式
      const rawData = XLSX.utils.sheet_to_json(worksheet, { header: headers, range: 2 });

      previewData.value = rawData;

      tableHeaders.value = headers;
      console.log('previewData:', previewData.value); // 调试用
    };
    reader.readAsArrayBuffer(file.raw);
  };

  // 重新上传
  const handleReupload = () => {
    previewData.value = [];
    tableHeaders.value = [];
  };

  // 提交导入
  const submitImport = async () => {
    sureLoading.value = true;
    const filterData = previewData.value.map((row) => ({
      name: row['用户名称'] || '',
      email: row['用户账号'] || '',
      password: row['初始密码'] || '',
      profilePic: row['头像地址'] || ''
    }));
    const params = {
      userList: filterData,
      organizationId: props.row._id,
      organization: props.row.name
    };
    const data = await batchAddUserByAdminAsync(params);
    if (data.data.status === 200) {
      ElMessage.success('导入成功');
      emit('updateSuccess');
    }
  };

  // 弹窗取消
  const cancle = () => {
    previewData.value = [];
    tableHeaders.value = [];
    emit('cancle');
  };
</script>

<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }

  .upload-demo {
    margin-bottom: 20px;
  }

  .reupload-btn {
    margin-top: 20px;
    text-align: center;
  }
</style>
