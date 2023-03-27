<!-- 审核弹窗 -->
<template>
  <el-dialog
    class="download-resume-select"
    :model-value="dialogDownloadVisible"
    title="下载简历"
    width="500px"
    append-to-body
    @close="handleClose"
  >
    <div class="content-box">
      <!-- 下载为图片 -->
      <div class="download-img-box" @click="download('img')">
        <div class="download-com-box img-box">
          <svg-icon icon-name="icon-tupian" color="#fff" size="26px"></svg-icon>
          <span>下载图片</span>
        </div>
        <p>适合微信、QQ发送</p>
      </div>
      <!-- 下载PDF -->
      <div class="download-pdf-box" @click="download('pdf')">
        <div class="download-com-box pdf-box">
          <svg-icon icon-name="icon-pdf" color="#fff" size="26px"></svg-icon>
          <span>下载PDF</span>
        </div>
        <p> 适合打印、在线投递等(<span>推荐</span>)</p>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
  const emit = defineEmits(['closeDownloadDialog', 'downloadFile']);
  interface TDialog {
    dialogDownloadVisible: boolean;
  }
  withDefaults(defineProps<TDialog>(), {
    dialogDownloadVisible: false
  });

  // 点击下载
  const download = (type: string) => {
    emit('downloadFile', type);
  };

  // 取消
  const handleClose = () => {
    emit('closeDownloadDialog');
  };
</script>
<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
  .download-resume-select {
    .content-box {
      display: flex;
      justify-content: center;
      .download-img-box,
      .download-pdf-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        margin: 0 20px;
        .download-com-box {
          width: 100px;
          height: 110px;
          border-radius: 5px;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #fff;
          span {
            margin-top: 10px;
          }
        }
        p {
          color: #888;
          font-size: 12px;
          margin-top: 10px;
        }

        .img-box {
          background: linear-gradient(90deg, #a986ff 0, #9861ff 100%);
          &:hover {
            background: linear-gradient(90deg, #a986ff 0, #9861ff 50%);
          }
        }
        .pdf-box {
          background: linear-gradient(149deg, #ffa98f 0, #ff6464 100%);
          &:hover {
            background: linear-gradient(149deg, #ffa98f 0, #ff6464 50%);
          }
        }
      }
    }
  }
</style>
