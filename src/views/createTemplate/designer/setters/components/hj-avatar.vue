<template>
  <div class="avatar-editor">
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
        v-if="moduleItem.dataSource[keyValue].value"
        :src="moduleItem.dataSource[keyValue].value"
        class="avatar"
      />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <div class="tips-box">
      <slot name="label-right"></slot>
      <span>{{ moduleItem.dataSource[keyValue].label || '上传照片' }}</span>
      <p class="tips">头像大小不能超过3M，仅支持（jpg、jpeg、png、gif）格式</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import CONFIG from '@/config';
  import appStore from '@/store';
  import { UploadProps } from 'element-plus';
  import { useGetSelectedModule } from '../../hooks/useGetSelectedModule';
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';

  const props = defineProps<{
    modelValue: string;
    label: string;
    keyValue: string;
    module: IModule;
  }>();

  // 选中的module
  const moduleItem = useGetSelectedModule(props.module.id);

  // 上传文件地址
  const uploadAddress = () => {
    return CONFIG.serverAddress + '/huajian/upload/file/avatar';
  };

  const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    moduleItem.dataSource[props.keyValue].value = response.data.data.fileUrl;
  };

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 3) {
      ElMessage.error('头像不能大于3M');
      return false;
    }
    return true;
  };
</script>
<style lang="scss" scoped>
  .avatar-editor {
    display: flex;
    height: 80px;
    .hj-avatar-uploader {
      height: 100%;
      :deep(.el-upload) {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
        height: 100% !important;
        width: 80px !important;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .hj-avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .tips-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
    flex: 1;
    height: 100%;
    position: relative;
    span {
      font-size: 16px;
      line-height: 20px;
      color: rgb(130, 139, 162);
      margin-bottom: 2px;
    }
    .tips {
      margin-top: 2px;
      color: #8c939d;
      font-size: 12px;
      margin-top: 5px;
    }
    :deep(.field-label-right-box) {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
</style>
