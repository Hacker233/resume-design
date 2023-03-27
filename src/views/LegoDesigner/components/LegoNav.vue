<template>
  <div class="lego-nav-box">
    <div class="nav-left">
      <logo-com icon-color="#74a274" font-color="#74a274"></logo-com>
    </div>
    <div class="nav-right">
      <el-tooltip effect="dark" content="下载到本地" placement="bottom">
        <div class="icon-box icon-download" @click="downloadResume">
          <svg-icon icon-name="icon-xiazai" color="#fff" size="17px"></svg-icon>
          <span class="icon-tips">导出</span>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="预览简历" placement="bottom">
        <div class="icon-box" @click="previewResume">
          <svg-icon icon-name="icon-yulan1" color="#555" size="19px"></svg-icon>
          <span class="icon-tips">预览</span>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="保存为草稿" placement="bottom">
        <div class="icon-box" @click="saveDraft">
          <svg-icon icon-name="icon-caogaoxiang1" color="#555" size="17px"></svg-icon>
          <span class="icon-tips">保存</span>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="重置所有设置" placement="bottom">
        <div class="icon-box" @click="reset">
          <svg-icon icon-name="icon-zhongzhi" color="#555" size="17px"></svg-icon>
          <span class="icon-tips">重置</span>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="导出为JSON数据" placement="bottom">
        <div class="icon-box" @click="exportJSON">
          <svg-icon icon-name="icon-xiazai" color="#555" size="17px"></svg-icon>
          <span class="icon-tips">JSON</span>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="将你的简历分享给别人" placement="bottom">
        <div class="icon-box" @click="publishOnlineResume">
          <svg-icon icon-name="icon-fenxiang" color="#555" size="17px"></svg-icon>
          <span class="icon-tips">分享</span>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="快来一起参与评论吧！" placement="bottom">
        <div class="icon-box" @click="publishComment">
          <svg-icon icon-name="icon-pinglun" color="#555" size="18px"></svg-icon>
          <span class="icon-tips">评论</span>
        </div>
      </el-tooltip>
    </div>
  </div>

  <!-- 下载弹窗 -->
  <download-dialog
    :dialog-download-visible="dialogDownloadVisible"
    @close-download-dialog="closeDownloadDialog"
    @download-file="downloadResumeFile"
  ></download-dialog>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { ElMessageBox } from 'element-plus';
  import FileSaver from 'file-saver';
  import { cloneDeep } from 'lodash';
  import { storeToRefs } from 'pinia';
  import DownloadDialog from './DownloadDialog/DownloadDialog.vue';
  import { CONFIG } from '../config/lego';
  import moment from 'moment';

  const { HJSchemaJsonStore, draftTips } = storeToRefs(appStore.useLegoJsonStore);
  const { resetHJSchemaJsonData } = appStore.useLegoJsonStore;
  const { setUuid } = appStore.useRefreshStore;
  const { resetSelectWidget } = appStore.useLegoSelectWidgetStore;

  // 导出JSON
  const exportJSON = () => {
    let JSONData = cloneDeep(HJSchemaJsonStore.value);
    const data = JSON.stringify(JSONData, null, 4);
    const blob = new Blob([data], { type: '' });
    FileSaver.saveAs(blob, HJSchemaJsonStore.value.config.title + '.json');
  };

  // 打开导出弹窗
  const dialogDownloadVisible = ref<boolean>(false);
  const downloadResume = () => {
    dialogDownloadVisible.value = true;
  };

  // 关闭弹窗
  const closeDownloadDialog = () => {
    dialogDownloadVisible.value = false;
  };

  // 点击下载
  const downloadResumeFile = async (type: string) => {
    console.log('type', type);
  };

  // 预览
  const previewResume = () => {};

  // 保存草稿
  const saveDraft = () => {
    if (CONFIG.SAVE_LOCAL) {
      // 保存本地
      let LeogLocal = localStorage.getItem('LegoLogo');
      if (LeogLocal) {
        const temp = JSON.parse(LeogLocal);
        temp[HJSchemaJsonStore.value.id] = HJSchemaJsonStore.value;
        localStorage.setItem('LegoLogo', JSON.stringify(temp));
      } else {
        const temp: { [propName: string]: any } = {};
        temp[HJSchemaJsonStore.value.id] = HJSchemaJsonStore.value;
        localStorage.setItem('LegoLogo', JSON.stringify(temp));
      }
      const time = moment(new Date()).format('YYYY.MM.DD HH:mm:ss');
      draftTips.value = `已自动保存草稿  ${time}`;
      ElMessage.success('保存成功');
    } else {
      // 保存到服务器
    }
  };

  // 重置
  const reset = () => {
    ElMessageBox.confirm('此操作会重置画布至初始状态，是否继续?', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        // 重置JSON
        resetHJSchemaJsonData();
        console.log('HJSchemaJsonStore', HJSchemaJsonStore);
        // 重置选中状态
        resetSelectWidget();
        setUuid();
      })
      .catch(() => {});
  };

  // 发布公开简历
  const publishOnlineResume = () => {};

  // 参与评论
  const publishComment = () => {};
</script>
<style lang="scss" scoped>
  .lego-nav-box {
    background-color: #fff;
    height: 60px;
    width: 100%;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    .nav-left {
      width: 300px;
      height: 100%;
      display: flex;
      align-items: center;
      user-select: none;
      padding: 0 0 0 40px;
    }
    .nav-right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 30px;
      .icon-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #555;
        cursor: pointer;
        padding: 0 15px;
        height: 100%;
        transition: all 0.3s;
        &:hover {
          background-color: rgba($color: #74a274, $alpha: 0.1);
          color: #74a274;
        }
        .icon-tips {
          font-size: 12px;
          margin-top: 8px;
        }
      }
      .icon-download {
        background-color: rgba($color: #74a274, $alpha: 1);
        color: #fff;
        &:hover {
          background-color: rgba($color: #74a274, $alpha: 0.9);
          color: #fff;
        }
      }
    }
  }
</style>
