<!-- 简历标题属性配置 -->
<template>
  <el-tabs v-model="activeName" type="card" class="demo-tabs" stretch>
    <el-tab-pane label="样式设置" name="style">
      <el-form label-width="100px" label-position="left">
        <!-- 公共样式属性 -->
        <common-options></common-options>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="数据配置" name="data">
      <el-form label-width="70px" label-position="left">
        <el-form-item label="姓名:">
          <el-input type="text" v-model="modelItem.name" maxlength="15" show-word-limit />
        </el-form-item>
        <el-form-item label="简介:">
          <el-input
            type="textarea"
            v-model="modelItem.abstract"
            maxlength="50"
            show-word-limit
            :rows="4"
          />
          <el-switch v-model="modelItem.isShow.abstract" />
        </el-form-item>
        <el-form-item label="年龄:">
          <el-input type="text" v-model="modelItem.age" maxlength="2" show-word-limit />
          <el-switch v-model="modelItem.isShow.age" />
        </el-form-item>
        <el-form-item label="地址:">
          <el-input type="text" v-model="modelItem.address" maxlength="30" show-word-limit />
          <el-switch v-model="modelItem.isShow.address" />
        </el-form-item>
        <el-form-item label="工作经验:">
          <el-input type="text" v-model="modelItem.workService" maxlength="10" show-word-limit />
          <el-switch v-model="modelItem.isShow.workService" />
        </el-form-item>
        <el-form-item label="联系方式:">
          <el-input type="text" v-model="modelItem.phoneNumber" maxlength="11" show-word-limit />
          <el-switch v-model="modelItem.isShow.phoneNumber" />
        </el-form-item>
        <el-form-item label="邮箱地址:">
          <el-input type="text" v-model="modelItem.email" maxlength="30" show-word-limit />
          <el-switch v-model="modelItem.isShow.email" />
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
          <el-switch v-model="modelItem.isShow.avatar" />
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { IBASEINFO } from '@/types/model';
  import { useResumeJsonStore } from '@/store/resume';
  import { ElMessage } from 'element-plus';
  import type { UploadProps } from 'element-plus';
  import CommonOptions from '@/components/CommonOptions/CommonOptions.vue';
  import { useModelIndex } from '@/hooks/useModelIndex';
  // store
  const { resumeJsonStore } = useResumeJsonStore();

  // 选中的模块
  const index = useModelIndex(); // 选中的索引
  const modelItem = reactive<IBASEINFO>(resumeJsonStore.LIST[index] as IBASEINFO);
  let activeName = ref('style');

  /**
   * 数据配置
   */
  // 头像设置
  const imageUrl = ref(modelItem.avatar);
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
      modelItem.avatar = e.target?.result as string;
    };
    return false;
  };
</script>
<script lang="ts">
  export default {
    name: 'TEMPLATE1_BASE_INFO_OPTIONS'
  };
</script>
<style lang="less">
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
