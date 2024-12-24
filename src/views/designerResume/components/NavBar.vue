<template>
  <nav class="nav-box">
    <div class="nav-left">
      <div class="return-icon" @click="returnPage">
        <el-icon><ArrowLeftBold /></el-icon>
      </div>
      <!-- 简历标题 -->
      <div class="resume-title">
        <p v-show="!isShowIpt">
          {{ HJNewJsonStore.config.title }}
          <el-icon :size="20" color="#74a274" @click="changeTitle">
            <Edit />
          </el-icon>
        </p>
        <el-input
          v-show="isShowIpt"
          ref="titleIpf"
          v-model="HJNewJsonStore.config.title"
          autofocus
          placeholder="请输入标题"
          @blur="blurTitle"
        />
      </div>
      <!-- 最近保存时间 -->
      <div v-if="draftTips" class="draft-tips-box">
        <span class="draft-tips">{{ draftTips }}</span>
        <svg-icon icon-name="icon-shijian1" color="#999999" size="14px"></svg-icon>
      </div>
    </div>
    <div class="nav-center"> </div>
    <div class="nav-right">
      <el-button type="text" style="margin-right: 10px" @click="toOld">旧版入口</el-button>
      <el-tooltip effect="dark" content="下载到本地" placement="bottom">
        <div class="icon-box icon-download" @click="downloadResume">
          <svg-icon icon-name="icon-xiazai" color="#fff" size="17px"></svg-icon>
          <span class="icon-tips">导出</span>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="保存为草稿" placement="bottom">
        <div class="icon-box" @click="saveDraft">
          <svg-icon icon-name="icon-caogaoxiang1" color="#555" size="17px"></svg-icon>
          <span class="icon-tips">暂存</span>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="预览简历" placement="bottom">
        <div class="icon-box" @click="previewResume">
          <svg-icon icon-name="icon-yulan1" color="#555" size="19px"></svg-icon>
          <span class="icon-tips">预览</span>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="重置所有设置" placement="bottom">
        <div class="icon-box" @click="reset">
          <svg-icon icon-name="icon-zhongzhi" color="#555" size="17px"></svg-icon>
          <span class="icon-tips">重置</span>
        </div>
      </el-tooltip>
    </div>
  </nav>

  <!-- 下载弹窗 -->
  <download-dialog
    :dialog-download-visible="dialogDownloadVisible"
    :export-pdf-pay-integral="exportPdfPayIntegral"
    :export-img-pay-integral="exportImgPayIntegral"
    @close-download-dialog="closeDownloadDialog"
    @download-file="downloadResumeFile"
  ></download-dialog>

  <!-- 预览窗口 -->
  <PreviewImage v-if="dialogPreviewVisible" @close="closePreview">
    <resume-preview :show-line="true"></resume-preview>
  </PreviewImage>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { ElMessageBox, ElNotification } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';
  import { storeToRefs } from 'pinia';
  import DownloadDialog from '../../designer/components/DownloadDialog.vue';
  import { getIntegralPayNumber } from '@/views/LegoDesigner/utils/common';
  import { debounce } from 'lodash';
  import { saveDraftAsync } from '@/http/api/createTemplate';
  import { formatListDate } from '@/utils/common';
  import ResumePreview from '@/views/createTemplate/previewer/index.vue';

  const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);
  const emit = defineEmits([
    'generateReport',
    'generateReportNew',
    'reset',
    'saveDataToLocal',
    'publishComment'
  ]);
  const route = useRoute();
  const id = route.params.id;

  // 返回上一页
  const router = useRouter();
  const returnPage = () => {
    router.go(-1);
  };

  // 跳转至旧版本
  const toOld = () => {
    router.push('/template');
  };

  // 更改标题
  const titleIpf = ref<any>(null);
  const isShowIpt = ref<boolean>(false);
  const changeTitle = () => {
    isShowIpt.value = true;
    titleIpf.value.focus();
  };
  const blurTitle = () => {
    isShowIpt.value = false;
  };

  // 查询导出为pdf需要的简币数
  const exportPdfPayIntegral = ref<number>(0);
  // 查询导出为图片需要的简币数
  const exportImgPayIntegral = ref<number>(0);
  onMounted(async () => {
    exportImgPayIntegral.value = Number(await getIntegralPayNumber('9'));
    exportPdfPayIntegral.value = Number(await getIntegralPayNumber('8'));
  });

  // 保存草稿
  let draftTips = ref<string>('');
  const saveDataToLocal = () => {
    return new Promise(async (resolve) => {
      const data = {
        templateId: id,
        templateJson: HJNewJsonStore.value
      };
      const result = await saveDraftAsync(data);
      if (result.data.status === 200) {
        draftTips.value = `已保存：${formatListDate(result.data.data.updateDate)}`;
        resolve('保存草稿成功');
      } else {
        // ElMessage.error(result.data.message);
        ElNotification({
          title: '保存失败',
          message: result.data.message,
          type: 'error'
        });
        resolve(null);
      }
    });
  };

  // 预览简历
  const dialogPreviewVisible = ref<boolean>(false);
  const previewResume = () => {
    dialogPreviewVisible.value = true;
    // router.push({
    //   path: '/resumePreview',
    //   query: {
    //     type: 'page',
    //     id: route.params.id
    //   }
    // });
  };

  // 关闭预览弹窗
  const closePreview = () => {
    dialogPreviewVisible.value = false;
  };

  // 保存草稿
  const saveDraft = () => {
    saveDataToLocal();
  };

  // 自动保存草稿
  const debounced = debounce(() => {
    saveDataToLocal();
  }, 5000);
  watch(
    () => HJNewJsonStore.value, // JSON数据发生变化，则保存草稿
    (newval, oldVal) => {
      if (newval && oldVal.id) {
        debounced();
      }
    },
    {
      deep: true
    }
  );

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
    const data = await saveDataToLocal();
    if (data) {
      emit('generateReport', type);
      closeDownloadDialog();
    }
  };

  // 重置
  const reset = () => {
    ElMessageBox.confirm('此操作会重置简历至初始状态，是否继续?', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        emit('reset');
        draftTips.value = '';
      })
      .catch(() => {});
  };
  defineExpose({
    saveDataToLocal
  });
</script>
<style lang="scss" scopeds>
  .nav-box {
    height: 50px;
    width: 100%;
    background-color: #fff;
    position: sticky;
    top: 0;
    display: flex;
    box-shadow: 0 5px 21px 0 rgb(78 78 78 / 5%);
    z-index: 20;
    .nav-left {
      display: flex;
      align-items: center;
      user-select: none;
      padding: 0 0 0 40px;
      .return-icon {
        width: 30px;
        height: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20px;
        transition: all 0.3s;
        &:hover {
          opacity: 0.8;
        }
      }
      .resume-title {
        flex-shrink: 0;
        p {
          display: flex;
          align-items: center;
          font-size: 16px;
          .el-icon {
            margin-left: 5px;
            cursor: pointer;
            margin-top: 1px;
          }
        }
        .el-input {
          width: 200px;
        }
      }
      .draft-tips-box {
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 15px;
        flex-shrink: 0;
        .draft-tips {
          margin-right: 7px;
          font-size: 12px;
          color: #999999;
        }
      }
    }
    .nav-center {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      height: 100%;
      .left {
        display: flex;
        height: 100%;
        .nav-center-left-box {
          height: 100%;
          display: flex;
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
        }
        .draft-tips-box {
          height: 100%;
          display: flex;
          align-items: center;
          margin-left: 10px;
          .draft-tips {
            font-size: 10px;
            color: #999999;
          }
        }
      }
    }
    .nav-right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 50px;
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
