<!-- 简历标题属性配置 -->
<template>
  <el-tabs v-model="activeName" type="card" class="demo-tabs" stretch>
    <el-tab-pane label="样式设置" name="style">
      <el-form label-width="100px" label-position="left">
        <!-- 标题样式属性 -->
        <common-title-options
          color-label="姓名字体颜色"
          font-size-label="姓名字体大小"
          font-weight-label="姓名字体粗细"
        ></common-title-options>
        <!-- 公共样式属性 -->
        <common-options></common-options>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="数据配置" name="data">
      <el-form label-width="70px" label-position="left">
        <el-form-item label="姓名:">
          <el-input v-model="modelItem.data.name" type="text" maxlength="15" show-word-limit />
        </el-form-item>
        <el-form-item label="简介:">
          <el-input
            v-model="modelItem.data.abstract"
            type="textarea"
            maxlength="50"
            show-word-limit
            :rows="4"
          />
          <el-switch v-model="modelItem.data.isShow.abstract" />
        </el-form-item>
        <el-form-item label="年龄:">
          <el-input v-model="modelItem.data.age" type="text" maxlength="2" show-word-limit />
          <el-switch v-model="modelItem.data.isShow.age" />
        </el-form-item>
        <el-form-item label="地址:">
          <el-input v-model="modelItem.data.address" type="text" maxlength="30" show-word-limit />
          <el-switch v-model="modelItem.data.isShow.address" />
        </el-form-item>
        <el-form-item label="工作经验:">
          <el-input
            v-model="modelItem.data.workService"
            type="text"
            maxlength="10"
            show-word-limit
          />
          <el-switch v-model="modelItem.data.isShow.workService" />
        </el-form-item>
        <el-form-item label="联系方式:">
          <el-input
            v-model="modelItem.data.phoneNumber"
            type="text"
            maxlength="11"
            show-word-limit
          />
          <el-switch v-model="modelItem.data.isShow.phoneNumber" />
        </el-form-item>
        <el-form-item label="邮箱地址:">
          <el-input v-model="modelItem.data.email" type="text" maxlength="30" show-word-limit />
          <el-switch v-model="modelItem.data.isShow.email" />
        </el-form-item>
        <el-form-item label="头像上传:">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
          <el-switch v-model="modelItem.data.isShow.avatar" />
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import type { UploadProps } from 'element-plus';
  import CommonOptions from './CommonOptions.vue';
  import CommonTitleOptions from './CommonTitleOptions.vue';
  import useDesignSelectModelItem from '@/hooks/material/useDesignSelectModelItem';
  defineOptions({ name: 'BASE_INFO_OPTIONS' });
  // 选中的模块
  const { modelItem } = useDesignSelectModelItem();

  let activeName = ref('style');

  /**
   * 数据配置
   */
  // 头像设置
  const imageUrl = ref(modelItem.data.avatar);
  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
      ElMessage.error('只支持jpg格式的图片');
      return false;
    } else if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error('Avatar picture size can not exceed 2MB!');
      return false;
    }
    // 图片转成base64
    let reader = new FileReader();
    reader.readAsDataURL(rawFile);
    reader.onload = (e) => {
      imageUrl.value = e.target?.result as string;
      modelItem.data.avatar = e.target?.result as string;
    };
    return false;
  };
</script>
<style lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    height: 150px;
    width: 150px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
</style>
