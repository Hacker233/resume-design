<template>
  <div class="img-compress-box">
    <!-- 图片压缩规格选择 -->
    <div class="img-compress-size-box">
      <size-compress></size-compress>
    </div>
    <!-- 图片上传盒子 -->
    <div class="img-upload-box">
      <!-- 没有图片是显示上传界面 -->
      <el-upload
        v-show="!oldFile"
        class="upload-img-demo"
        drag
        action="#"
        :limit="1"
        :show-file-list="false"
        accept="image/png,image/jpeg"
        :before-upload="handleBeforeUpload"
      >
        <el-icon class="el-icon--upload"><upload-filled :size="100" /></el-icon>
        <div class="el-upload__text"> 拖拽图片到此或者 <em>点击上传</em> </div>
        <p>（仅支持png、jpg、jpeg图片格式上传，单张图片不可超过100M）</p>
      </el-upload>
      <div v-show="oldFile" class="img-box">
        <div class="left">
          <img :src="oldImgUrl" alt="原始图片" />
          <!-- 蒙版 -->
          <div class="old-img-masks" @click="previewOldImg">
            <div class="icon-box" title="预览">
              <svg-icon
                icon-name="icon-liulanliang1"
                color="#fff"
                size="35px"
                :is-hover="true"
              ></svg-icon>
            </div>
            <div class="icon-box" title="删除" @click="deleteOldImg">
              <svg-icon
                icon-name="icon-shanchu1"
                color="#fff"
                size="35px"
                :is-hover="true"
              ></svg-icon>
            </div>
          </div>
        </div>
        <div v-if="oldFile" class="right">
          <p> <span>图片名称：</span>{{ oldFile.name }} </p>
          <p> <span>图片大小：</span>{{ getFileSize(oldFile.size) }} </p>
          <p> <span>图片宽度：</span>{{ oldImgWidth }} 像素 </p>
          <p> <span>图片高度：</span>{{ oldImgHeight }} 像素 </p>
        </div>
      </div>
    </div>

    <!-- 图片压缩按钮 -->
    <div class="img-compress-btn">
      <div class="button" @click="toCompress"> 开始压缩 </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { UploadRawFile } from 'element-plus';
  import SizeCompress from './components/SizeCompress.vue';
  import { getFileSize } from '@/utils/common';
  import { api as viewerApi } from 'v-viewer';

  // 已上传的文件列表
  const oldFile = ref<any>(null);

  // 文件上传之前
  const oldImgUrl = ref<any>('');
  const oldImgWidth = ref<number>(0); // 原始宽度
  const oldImgHeight = ref<number>(0); // 原始高度
  const windowURL = window.URL || window.webkitURL;
  const handleBeforeUpload = (rawFile: UploadRawFile) => {
    oldFile.value = rawFile;
    // 获取图片的宽高
    oldImgUrl.value = URL.createObjectURL(rawFile); // 转化为图片链接
    const img = new Image();
    img.src = oldImgUrl.value;
    img.onload = () => {
      oldImgWidth.value = img.width;
      oldImgHeight.value = img.height;
    };
    return false;
  };

  // 预览原始图片
  const previewOldImg = () => {
    viewerApi({ images: [oldImgUrl.value] });
  };

  // 删除原始图片
  const deleteOldImg = () => {
    oldFile.value = null; // 删除文件
    oldImgUrl.value = '';
    oldImgWidth.value = 0;
    oldImgHeight.value = 0;
  };

  // 压缩图片
  const toCompress = () => {
    console.log('压缩前', oldFile.value);
  };

  // 组件销毁前
  onBeforeUnmount(() => {
    windowURL.revokeObjectURL(oldImgUrl.value);
  });
</script>
<style lang="scss" scoped>
  .img-compress-box {
    width: 1300px;
    margin: 0 auto;
    min-height: 300px;
    .img-compress-size-box {
      margin: 30px 0;
      padding: 30px 20px;
      border-radius: 10px;
      width: 100%;
      background-color: #fff;
    }
    .img-upload-box {
      width: 100%;
      height: 500px;
      border: 5px dashed #ccc;
      border-radius: 10px;
      :deep(.upload-img-demo) {
        width: 100%;
        height: 100%;
        .el-upload {
          width: 100%;
          height: 100%;
          .el-upload-dragger {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            border: none;
            background: #fff;
            .el-upload__text {
              font-size: 17px;
            }
            p {
              margin-top: 15px;
              color: #909399;
            }
          }
        }
      }

      .img-box {
        background-color: #fff;
        height: 100%;
        width: 100%;
        display: flex;
        .left {
          width: 70%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 20px;
          &:hover .old-img-masks {
            opacity: 1;
            background-color: rgba(#000, 0.6);
          }
          img {
            height: 100%;
            box-shadow: 0px 16px 22px 2px rgba($color: rgb(167, 165, 165), $alpha: 0.2);
          }
          .old-img-masks {
            position: absolute;
            left: 0;
            top: 0;
            border-radius: 10px;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: all 0.3s;
          }
          .old-img-masks {
            display: flex;
            align-items: center;
            justify-content: center;
            .icon-box {
              margin: 0 20px;
              cursor: pointer;
            }
          }
        }
        .right {
          flex: 1;
          border-left: 1px solid #eee;
          padding-left: 20px;
          margin: 20px 20px 20px 0;
          p {
            font-size: 15px;
            display: flex;
            align-items: flex-start;
            color: #333;
            margin-bottom: 20px;
            line-height: 1.5;
            span {
              color: rgb(100, 100, 100);
              font-weight: 700;
              display: flex;
              min-width: 90px;
            }
          }
        }
      }
    }

    .img-compress-btn {
      display: flex;
      align-items: center;
      height: 90px;
      justify-content: center;
      .button {
        width: 150px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        letter-spacing: 2px;
        color: #fff;
        font-size: 14px;
        background-image: -webkit-linear-gradient(to right, #2ddd9d, #1cc7cf);
        background-image: -moz-linear-gradient(to right, #2ddd9d, #1cc7cf);
        background-image: -ms-linear-gradient(to right, #2ddd9d, #1cc7cf);
        background-image: linear-gradient(to right, #2ddd9d, #1cc7cf);
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
        border-radius: 50px;
        background-color: #2ddd9d;
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        -ms-transition: all 0.3s;
        -o-transition: all 0.3s;
        transition: all 0.3s;
        cursor: pointer;
        user-select: none;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
</style>
