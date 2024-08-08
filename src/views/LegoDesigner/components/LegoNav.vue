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
      <el-tooltip
        v-if="templateId && templateInfo"
        effect="dark"
        content="快来一起参与评论吧！"
        placement="bottom"
      >
        <div class="icon-box" @click="publishComment">
          <svg-icon icon-name="icon-pinglun" color="#555" size="18px"></svg-icon>
          <span class="icon-tips">评论({{ templateInfo.commentCount }})</span>
        </div>
      </el-tooltip>
      <el-tooltip
        v-if="!templateId"
        effect="dark"
        content="发布为模板供他人使用"
        placement="bottom"
      >
        <div class="icon-box icon-download" @click="publishTemplate">
          <svg-icon icon-name="icon-fabu1" color="#fff" size="17px"></svg-icon>
          <span class="icon-tips">{{ postWorkInfo ? '更新作品' : '发布作品' }}</span>
        </div>
      </el-tooltip>
    </div>
  </div>

  <!-- 下载弹窗 -->
  <download-dialog
    :dialog-download-visible="dialogDownloadVisible"
    :export-pdf-pay-integral="exportPdfPayIntegral"
    :export-img-pay-integral="exportImgPayIntegral"
    @close-download-dialog="closeDownloadDialog"
    @download-file="downloadResumeFile"
  ></download-dialog>

  <!-- 预览 -->
  <preview-image v-show="dialogPreviewVisible" @close="closePreview">
    <render-page></render-page>
  </preview-image>

  <!-- 发布作品弹窗 -->
  <post-work-dialog
    :dialog-post-work-visible="dialogPostWorkVisible"
    :post-work-info="postWorkInfo"
    @cancle="canclePostWork"
    @update-success="handlePostWorkSuccess"
  ></post-work-dialog>

  <!-- 导出pdf进度弹窗 -->
  <process-bar-dialog
    :dialog-visible="dialogVisible"
    :percentage-num="percentage"
    @cancle="cancleProgress"
  ></process-bar-dialog>

  <!-- 评论抽屉 -->
  <el-drawer
    v-model="commentDrawer"
    append-to-body
    class="lego-comment-box"
    modal-class="lego-comment-box-modal"
    :show-close="false"
    direction="rtl"
  >
    <comment-com
      v-config:open_comment
      :comment-type-id="templateId"
      comment-type="legoTemplate"
      width="100%"
    ></comment-com>
  </el-drawer>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { ElMessageBox } from 'element-plus';
  import FileSaver from 'file-saver';
  import { cloneDeep } from 'lodash';
  import { storeToRefs } from 'pinia';
  import DownloadDialog from './DownloadDialog/DownloadDialog.vue';
  import PreviewImage from '../render/PreviewImage/PreviewImage.vue';
  import RenderPage from '../render/index.vue';
  import { CONFIG } from '../config/lego';
  import moment from 'moment';
  import { getImgBase64URL } from '../utils/html2img';
  import { legoUserResumeAsync } from '@/http/api/lego';
  import PostWorkDialog from './PostWorkDialog/PostWorkDialog.vue';
  import { exportLegoPNG, exportLegoPdf } from '../utils/pdf';
  import ProcessBarDialog from '@/components/ProcessBarDialog/ProcessBarDialog.vue';
  import { onBeforeRouteLeave } from 'vue-router';
  import { getIntegralPayNumber } from '../utils/common';

  const { HJSchemaJsonStore, draftTips } = storeToRefs(appStore.useLegoJsonStore);
  const { resetHJSchemaJsonData } = appStore.useLegoJsonStore;
  const { setUuid } = appStore.useRefreshStore;
  const { resetSelectWidget } = appStore.useLegoSelectWidgetStore;
  const { templateId, category } = useRoute().query;

  const props = defineProps<{
    pagesRefs: any;
    postWorkInfo: any;
    templateInfo: any;
  }>();

  // 查询导出为pdf需要的简币数
  const exportPdfPayIntegral = ref<number>(0);
  // 查询导出为图片需要的简币数
  const exportImgPayIntegral = ref<number>(0);
  onMounted(async () => {
    exportImgPayIntegral.value = Number(await getIntegralPayNumber('6'));
    exportPdfPayIntegral.value = Number(await getIntegralPayNumber('5'));
  });

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
    // 先保存草稿
    await saveDraft();
    generateReport(type); // 导出
  };

  // 生成pdf方法
  const dialogVisible = ref<boolean>(false);
  const percentage = ref<number>(10);
  let timer: any = null;
  const generateReport = async (type: string) => {
    dialogVisible.value = true;
    timer = setInterval(() => {
      percentage.value += 5;
      if (percentage.value > 95) {
        percentage.value = 98;
        clearInterval(timer);
      }
    }, 500);
    let token = localStorage.getItem('token') as string;
    if (type === 'pdf') {
      await exportLegoPdf(token, _id.value);
    } else {
      await exportLegoPNG(token, _id.value);
    }

    clearInterval(timer);
    percentage.value = 100;
  };

  // 关闭进度弹窗
  const cancleProgress = () => {
    dialogVisible.value = false;
    percentage.value = 10;
  };

  // 预览
  const dialogPreviewVisible = ref<boolean>(false);
  const previewResume = () => {
    dialogPreviewVisible.value = true;
  };

  // 关闭预览弹窗
  const closePreview = () => {
    dialogPreviewVisible.value = false;
  };

  // 发布作品
  const dialogPostWorkVisible = ref<boolean>(false);
  const publishTemplate = () => {
    dialogPostWorkVisible.value = true;
  };

  // 取消发布弹窗
  const canclePostWork = () => {
    dialogPostWorkVisible.value = false;
  };

  // 发布或更新作品成功
  const router = useRouter();
  const handlePostWorkSuccess = async () => {
    router.push({
      path: '/postWorkSuccess'
    });
  };

  // 保存草稿
  const imgUrl = ref<string>('');
  const isCanSave = ref<boolean>(true);
  const _id = ref<string>('');
  const saveDraft = async () => {
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
      draftTips.value = `已保存草稿  ${time}`;
      ElMessage.success('保存成功');
    } else {
      if (isCanSave.value) {
        isCanSave.value = false;
        draftTips.value = '保存中......';
        imgUrl.value = await getImgBase64URL(props.pagesRefs[0]);
        const params = {
          previewUrl: imgUrl.value,
          category: category,
          lego_json: HJSchemaJsonStore.value
        };
        const data = await legoUserResumeAsync(params);
        if (data.data.status === 200) {
          const time = moment(new Date()).format('YYYY.MM.DD HH:mm:ss');
          draftTips.value = `已保存草稿  ${time}`;
          _id.value = data.data.data._id;
          ElMessage.success('保存成功');
        } else {
          ElMessage.error(data.data.message);
        }
        isCanSave.value = true;
      } else {
        return;
      }
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
        const id = HJSchemaJsonStore.value.id;
        resetHJSchemaJsonData(id);
        console.log('HJSchemaJsonStore', HJSchemaJsonStore);
        // 重置选中状态
        resetSelectWidget();
        setUuid();
      })
      .catch(() => {});
  };

  // 发布公开简历
  const publishOnlineResume = () => {};

  // 离开页面之前
  onBeforeUnmount(async () => {
    draftTips.value = '';
    // 重置JSON
    resetHJSchemaJsonData();
    // 重置选中状态
    resetSelectWidget();
    setUuid();
  });

  // 打开评论弹窗
  const commentDrawer = ref<boolean>(false);
  const publishComment = () => {
    commentDrawer.value = true;
  };

  // 监听路由离开
  onBeforeRouteLeave((to, from, next) => {
    if (to.path === '/postWorkSuccess') {
      next();
      return true;
    }
    // 编辑状态离开时
    ElMessageBox.confirm('离开前请确保您编辑的内容已保存草稿！', '警告', {
      confirmButtonText: '保存草稿并离开',
      cancelButtonText: '直接离开',
      showCancelButton: true,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      distinguishCancelAndClose: true,
      type: 'warning',
      beforeClose: async (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true;
          // 保存草稿并离开
          await saveDraft();
          instance.confirmButtonLoading = false;
          done();
        } else if (action === 'close') {
          done();
          return;
        } else {
          done();
          next();
        }
      }
    })
      .then(async () => {
        next();
      })
      .catch(() => {});
  });
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
<style lang="scss">
  .lego-comment-box-modal {
    display: flex;
    .lego-comment-box {
      .el-drawer__header {
        display: none;
      }
      .el-drawer__body {
        padding: 0;
        .comment-view {
          margin: 0 0 20px 0;
          .u-comment {
            padding: 0 20px;
            .comment-form {
              padding: 0;
            }
          }
        }
      }
    }
  }
</style>
