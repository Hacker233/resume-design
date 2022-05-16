<!-- 简历标题属性配置 -->
<template>
  <el-tabs v-model="activeName" type="card" class="demo-tabs" stretch>
    <el-tab-pane label="样式设置" name="style">
      <el-form label-width="100px" label-position="left">
        <el-form-item label="姓名字体颜色:">
          <color-picker v-model:rgba="modelItem.style.titleColor"></color-picker>
        </el-form-item>
        <el-form-item label="姓名字体大小:">
          <el-select v-model="modelItem.style.titleFontSize" class="m-2" placeholder="Select">
            <el-option
              v-for="(item, index) in fontSizeList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="姓名字体粗细:">
          <el-select v-model="modelItem.style.titleFontWeight" class="m-2" placeholder="Select">
            <el-option
              v-for="(item, index) in fontWeightList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="内容字体颜色:">
          <color-picker v-model:rgba="modelItem.style.textColor"></color-picker>
        </el-form-item>
        <el-form-item label="上外边距:">
          <el-input-number v-model="mTop" :min="-100" :max="100" @change="handleChange" />
        </el-form-item>
        <el-form-item label="下外边距:">
          <el-input-number v-model="mBottom" :min="-100" :max="100" @change="handleChangeMBottom" />
        </el-form-item>
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
  import { useResumeModelStore, useResumeJsonStore } from '@/store/resume';
  import { ElMessage } from 'element-plus';
  import type { UploadProps } from 'element-plus';
  // store
  const useModel = useResumeModelStore();
  const useResumeJson = useResumeJsonStore();

  // 选中的模块
  const modelItem = reactive<IBASEINFO>(useResumeJson.LIST[useModel.index] as IBASEINFO);
  let activeName = ref('style');

  // 字体大小
  const fontSizeList = reactive<Array<string>>([
    '10px',
    '12px',
    '14px',
    '16px',
    '18px',
    '20px',
    '22px',
    '24px',
    '26px',
    '28px',
    '30px',
    '32px',
    '34px',
    '36px',
    '38px',
    '40px',
    '42px'
  ]);
  // 字体粗细
  const fontWeightList = reactive<Array<number>>([100, 200, 300, 400, 500, 600, 700, 800, 900]);

  // 工具方法--px转数字
  const pxTonumber = (value: string | undefined): number => {
    if (value) {
      return Number(value.split('px')[0]);
    } else {
      return 0;
    }
  };

  // 上外边距
  const defaultMtop: number = pxTonumber(modelItem.style.mTop);
  const mTop = ref<number>(defaultMtop);
  const handleChange = (value: number): void => {
    modelItem.style.mTop = value + 'px';
  };

  // 下外边距
  const defaultMbottom: number = pxTonumber(modelItem.style.mBottom);
  const mBottom = ref<number>(defaultMbottom);
  const handleChangeMBottom = (value: number): void => {
    modelItem.style.mBottom = value + 'px';
  };

  /**
   * 数据配置
   */
  // 头像设置
  const imageUrl = ref(modelItem.avatar);
  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
      ElMessage.error('Avatar picture must be JPG format!');
      return false;
    } else if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error('Avatar picture size can not exceed 2MB!');
      return false;
    }
    imageUrl.value = URL.createObjectURL(rawFile);
    modelItem.avatar = imageUrl.value;
    return false;
  };
</script>
<script lang="ts">
  export default {
    name: 'BASE_INFO'
  };
</script>
<style lang="less">
  @import '../style/options.less';
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
