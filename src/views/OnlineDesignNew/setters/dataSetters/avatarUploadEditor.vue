<template>
  <div class="avatar-editor">
    <el-form-item label="头像上传:">
      <el-upload
        class="hj-avatar-uploader"
        :action="uploadAddress()"
        :headers="{ Authorization: appStore.useTokenStore.token }"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.PNG,.GIF"
      >
        <img
          v-if="widgetItem.dataSource.avatarSrc"
          :src="widgetItem.dataSource.avatarSrc"
          class="avatar"
        />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <p class="tips">头像大小不能超过3M，仅支持（jpg、jpeg、png、gif）格式</p>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import CONFIG from '@/config';
  import appStore from '@/store';
  import { UploadProps } from 'element-plus';
  import useSelectWidgetItem from '../../hooks/useSelectWidgetItem';

  const props = defineProps<{
    id: string;
  }>();

  // 选中的widgetItem
  const { widgetItem } = useSelectWidgetItem(props.id);

  // 上传文件地址
  const uploadAddress = () => {
    return CONFIG.serverAddress + '/huajian/upload/file/avatar';
  };

  const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    widgetItem.dataSource.avatarSrc = response.data.data.fileUrl;
  };

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 3) {
      ElMessage.error('头像不能大于3M');
      return false;
    }
    return true;
  };
</script>
<style lang="scss">
  .hj-avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    height: 150px;
    width: 120px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .hj-avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }

  .avatar-editor {
    .tips {
      color: #8c939d;
      font-size: 12px;
      margin-top: 5px;
    }
  }
</style>
