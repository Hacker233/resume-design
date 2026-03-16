<template>
  <nav class="nav-box">
    <div class="design-nav-left">
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
      <!-- <el-button type="text" style="margin-right: 10px" @click="toOld">旧版入口</el-button> -->
      <!-- <el-tooltip effect="dark" content="AI面试助手" placement="bottom">
        <div class="ai-bot-container ai-optimize-box" @click="toJobzx"
          ><img src="@/assets/images/home/ai-edit.svg" width="24" height="24" /><div
            class="ai-bot-text"
            >AI面试助手</div
          >
        </div>
      </el-tooltip> -->
      <el-tooltip effect="dark" content="AI智能诊断" placement="bottom">
        <div class="ai-bot-container ai-optimize-box" @click="aiOptimize"
          ><img src="@/assets/images/home/ai-optimize.svg" width="24" height="24" /><div
            class="ai-bot-text"
            >AI简历诊断</div
          >
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="AI智能语种切换" placement="bottom">
        <div class="ai-bot-container" @click="languageSelect"
          ><img src="../../../assets/images/ai-translate.webp" width="24" height="24" /><div
            class="ai-bot-text"
            >AI翻译</div
          ></div
        >
      </el-tooltip>
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
      <el-tooltip effect="dark" content="历史版本" placement="bottom" :disabled="true">
        <div class="icon-box">
          <el-dropdown @command="handleVersionSelect" @click="refreshVersionHistory" :teleported="false">
            <div>
              <svg-icon icon-name="icon-lishixiao" color="#555" size="17px"></svg-icon>
              <span class="icon-tips">历史</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <div class="version-history-header">
                  <span>版本历史</span>
                  <el-button type="text" size="small" class="clear-history-btn" @click.stop="clearVersionHistory">
                    <el-icon><Delete /></el-icon>
                    <span>清空历史</span>
                  </el-button>
                </div>
                <el-dropdown-item disabled class="version-history-tip">
                  仅存储最近7次修改
                </el-dropdown-item>
                <el-dropdown-item
                  v-for="version in versions"
                  :key="version.version"
                  :command="version"
                  class="version-item"
                >
                  <div class="version-item-content">
                    <span class="version-number">版本 {{ version.version }}</span>
                    <span class="version-date">({{ formatDate(version.createDate) }})</span>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item v-if="versions.length === 0" disabled>
                  暂无版本历史
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
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
    @download-markdown="downloadMDNav"
  ></download-dialog>

  <!-- 预览窗口 -->
  <!-- <PreviewImage v-if="dialogPreviewVisible" @close="closePreview">
    <resume-preview :show-line="true"></resume-preview>
  </PreviewImage> -->

  <!-- 语种切换弹窗 -->
  <translate-dialog
    :dialog-translate-visible="dialogTranslateVisible"
    @cancle="translateCancle"
  ></translate-dialog>

  <!-- AI诊断确认弹窗 -->
  <ai-optimize-dialog
    :dialog-ai-optimize-visible="dialogAiOptimizeVisible"
    @cancle="aiDialogCancle"
    @update-success="updateSuccess"
  ></ai-optimize-dialog>

  <!-- AI诊断抽屉 -->
  <ai-optimize-drawer
    :drawer="aiDrawer"
    :model-info-obj="modelInfoObj"
    @close-ai-optimize-drawer="closeAiDrawer"
  ></ai-optimize-drawer>
</template>
<script lang="ts" setup>
  import { ref, onMounted, watch } from 'vue';
  import appStore from '@/store';
  import { ElMessageBox, ElNotification, ElMessage } from 'element-plus';
  import { Delete } from '@element-plus/icons-vue';
  import 'element-plus/es/components/message-box/style/index';
  import { storeToRefs } from 'pinia';
  import DownloadDialog from '../../designer/components/DownloadDialog.vue';
  import { getIntegralPayNumber } from '@/views/LegoDesigner/utils/common';
  import { debounce } from 'lodash';
  import { saveDraftAsync, getVersionHistoryAsync, rollbackVersionAsync, clearVersionHistoryAsync } from '@/http/api/createTemplate';
  import { formatListDate } from '@/utils/common';
  import moment from 'moment';
  // import ResumePreview from '@/views/createTemplate/previewer/index.vue';
  import TranslateDialog from './TranslateDialog.vue';
  import LoginDialog from '@/components/LoginDialog/LoginDialog';
  import AiOptimizeDrawer from '@/views/createTemplate/designer/components/AiOptimizeDrawer.vue';
  import AiOptimizeDialog from '@/views/createTemplate/designer/components/AiOptimizeDialog.vue';
  import { useHead } from '@vueuse/head';
  import { title } from '@/config/seo';
  // import { useToJobzxAi } from '@/hooks/useToJobzxAi';

  const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);
  const emit = defineEmits([
    'generateReport',
    'generateReportNew',
    'reset',
    'saveDataToLocal',
    'publishComment',
    'downloadMD',
    'previewResume'
  ]);
  const route = useRoute();
  const id = route.params.id;

  // 版本历史相关
  const versions = ref<any[]>([]);

  // 获取版本历史
  const getVersionHistory = async () => {
    if (!id) return;
    try {
      const data = await getVersionHistoryAsync({ templateId: id });
      if (data.data.status === 200) {
        versions.value = data.data.data;
      }
    } catch (error) {
      console.error('获取版本历史失败:', error);
    }
  };

  // 处理版本选择
  const { resetKey } = storeToRefs(appStore.useCreateTemplateStore);
  const handleVersionSelect = async (version: any) => {
    ElMessageBox.confirm(`确定要回退到版本 ${version.version} 吗？`, '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        try {
          const data = await rollbackVersionAsync({ 
            templateId: id, 
            version: version.version 
          });
          if (data.data.status === 200) {
            HJNewJsonStore.value = data.data.data.template_json;
            HJNewJsonStore.value.props.title = data.data.template_title;
            ElMessage.success('版本回退成功');
            useHead({
              title: HJNewJsonStore.value.props.title || title
            });
            resetKey.value++; // 增加key，强制重新渲染
            // 重新获取版本历史
            await getVersionHistory();
          }
        } catch (error) {
          ElMessage.error('版本回退失败！');
          console.error('版本回退失败:', error);
        }
      })
      .catch(() => {});
  };

  // 刷新版本历史
  const refreshVersionHistory = async () => {
    await getVersionHistory();
  };

  // 清空版本历史
  const clearVersionHistory = async () => {
    ElMessageBox.confirm('确定要清空所有版本历史吗？此操作不可恢复。', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        try {
          const data = await clearVersionHistoryAsync({ templateId: id });
          if (data.data.status === 200) {
            ElMessage.success('版本历史清空成功！');
            // 重新获取版本历史
            await getVersionHistory();
          }
        } catch (error) {
          ElMessage.error('版本历史清空失败！');
          console.error('版本历史清空失败:', error);
        }
      })
      .catch(() => {});
  };

  // 格式化日期
  const formatDate = (date: string) => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  };

  // 返回上一页
  const router = useRouter();
  const returnPage = () => {
    router.go(-1);
  };

  // 跳转至旧版本
  // const toOld = () => {
  //   router.push('/template');
  // };

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
    // 获取版本历史
    await getVersionHistory();
  });

  // 保存草稿
  let draftTips = ref<string>('');
  const saveDataToLocal = async (saveType = 'auto') => {
    if (!HJNewJsonStore.value.componentsTree.length) {
      ElNotification({
        title: '保存草稿失败',
        message: '简历内容不能为空',
        type: 'error'
      });
      return;
    }
    
    return new Promise(async (resolve) => {
      const data = {
        templateId: id,
        templateJson: HJNewJsonStore.value,
        saveType: saveType
      };
      const result = await saveDraftAsync(data);
      if (result.data.status === 200) {
        draftTips.value = `已保存：${formatListDate(result.data.data.updateDate)}`;
        // 保存成功后刷新版本历史
        await getVersionHistory();
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
  // const dialogPreviewVisible = ref<boolean>(false);
  const previewResume = () => {
    // dialogPreviewVisible.value = true;
    emit('previewResume');
    // router.push({
    //   path: '/resumePreview',
    //   query: {
    //     type: 'page',
    //     id: route.params.id
    //   }
    // });
  };

  // 关闭预览弹窗
  // const closePreview = () => {
  //   dialogPreviewVisible.value = false;
  // };

  // 保存草稿
  const saveDraft = () => {
    setTimeout(() => {
      ElMessage({
        message: '保存草稿成功',
        type: 'success'
      });
    }, 1000);
    saveDataToLocal('manual');
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

  // 打开智能语种切换弹窗
  const dialogTranslateVisible = ref<boolean>(false);
  const languageSelect = () => {
    const { token } = appStore.useTokenStore;
    if (!token) {
      openLoginDialog();
      return;
    }
    dialogTranslateVisible.value = true;
  };

  // 关闭翻译弹窗
  const translateCancle = () => {
    dialogTranslateVisible.value = false;
  };

  // 关闭弹窗
  const closeDownloadDialog = () => {
    dialogDownloadVisible.value = false;
  };

  // 打开登录弹窗
  const openLoginDialog = () => {
    LoginDialog(true);
  };

  // 添加一个下载状态标志
  const isDownloading = ref(false);
  // 点击下载
  const downloadResumeFile = async (type: string) => {
    // 如果正在下载中，直接返回
    if (isDownloading.value) {
      ElNotification({
        title: '提示',
        message: '正在处理下载请求，请稍候...',
        type: 'warning',
        duration: 2000
      });
      return;
    }

    isDownloading.value = true;
    ElNotification({
      title: '提示',
      message: '正在准备下载，请稍候...',
      type: 'info',
      duration: 2000
    });

    try {
      const data = await saveDataToLocal();
      if (data) {
        emit('generateReport', type);
        closeDownloadDialog();
      }
    } catch (error) {
      ElNotification({
        title: '下载失败',
        message: '下载过程中发生错误',
        type: 'error'
      });
    } finally {
      isDownloading.value = false;
    }
  };

  // 导出为md
  const downloadMDNav = async () => {
    // 显示正在保存草稿提示
    const loadingMessage = ElMessage({
      message: '正在保存草稿...',
      type: 'info',
      duration: 0, // 不自动关闭
      showClose: false
    });

    try {
      const data = await saveDataToLocal();
      if (data) {
        closeDownloadDialog();
        emit('downloadMD');
        ElMessage.success('草稿保存成功');
      }
    } catch (error) {
      ElMessage.error('草稿保存失败，请重试');
    } finally {
      // 无论成功失败都关闭加载提示
      loadingMessage.close();
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

  // 跳转至职行AI
  // const toJobzx = () => {
  //   useToJobzxAi();
  // };

  // 打开AI诊断确认弹窗
  const dialogAiOptimizeVisible = ref<boolean>(false);
  const aiDrawer = ref<boolean>(false);
  const aiOptimize = () => {
    dialogAiOptimizeVisible.value = true;
  };

  // AI诊断确认弹窗取消
  const aiDialogCancle = () => {
    dialogAiOptimizeVisible.value = false;
  };

  // AI诊断确认弹窗确认
  const modelInfoObj = ref<any>({}); // 选择的模型
  const updateSuccess = (modelInfo: any) => {
    dialogAiOptimizeVisible.value = false;
    aiDrawer.value = true;
    modelInfoObj.value = modelInfo;
  };

  // 关闭AI诊断抽屉
  const closeAiDrawer = () => {
    aiDrawer.value = false;
  };

  defineExpose({
    saveDataToLocal
  });
</script>
<style lang="scss" scoped>
  .nav-box {
    height: 50px;
    width: 100%;
    background-color: #fff;
    position: sticky;
    top: 0;
    display: flex;
    box-shadow: 0 5px 21px 0 rgb(78 78 78 / 5%);
    z-index: 20;
    .design-nav-left {
      display: flex;
      align-items: center;
      user-select: none;
      padding: 0 0 0 20px;
      .return-icon {
        width: 30px;
        height: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
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
        .el-dropdown {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
        .el-dropdown > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      }
      .icon-AI-YH {
        border-radius: 50%;
        margin-right: 15px;
        background-image: linear-gradient(
          to top,
          #fcc5e4 0%,
          #fda34b 15%,
          #ff7882 35%,
          #c8699e 52%,
          #7046aa 71%,
          #0c1db8 87%,
          #020f75 100%
        );
        height: 36px;
        width: 36px;
        transition: all 0.3s;
        &:hover {
          opacity: 0.8;
        }
      }
      .ai-bot-container {
        align-items: center;
        background: linear-gradient(271deg, #f6f3ff -0.08%, #f2fdff 99.45%);
        border-radius: 24px;
        box-sizing: border-box;
        display: inline-flex;
        font-size: 14px;
        height: 32px;
        margin-right: 15px;
        overflow: hidden;
        padding: 6px 8px;
        user-select: none;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
        .ai-bot-text {
          -webkit-text-fill-color: transparent;
          background: linear-gradient(271deg, #4734f4 0.3%, #4c79ff 99.35%);
          -webkit-background-clip: text;
          background-clip: text;
          font-family: PingFang SC;
          font-size: 14px;
          line-height: 20px;
          margin-left: 4px;
        }
      }
      .ai-optimize-box {
        img {
          border: 2px solid #91adff;
          border-radius: 50%;
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

    // 版本历史提示样式
    .version-history-tip {
      color: #74a274;
      font-size: 12px;
      text-align: center;
      padding: 8px 16px;
      border-bottom: 1px solid #f0f0f0;
    }

    // 版本历史下拉菜单样式
    :deep(.el-dropdown-menu) {
      min-width: 320px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border: 1px solid #f0f0f0;
      padding: 0;

      .version-history-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fafafa;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }

      .version-history-header span {
        font-size: 14px;
        font-weight: 500;
        color: #333;
      }

      .version-history-header .el-button {
        font-size: 12px !important;
        color: #ff4d4f !important;
        padding: 4px 8px !important;
        border-radius: 4px !important;
        transition: all 0.3s ease !important;
        display: flex !important;
        align-items: center !important;
        gap: 4px !important;
        
        &:hover {
          background-color: rgba(255, 77, 79, 0.1) !important;
          color: #ff4d4f !important;
        }
        
        .el-icon {
          font-size: 14px !important;
        }
      }

      .version-history-tip {
        color: #74a274;
        font-size: 12px;
        text-align: center;
        padding: 8px 16px;
        border-bottom: 1px solid #f0f0f0;
        margin-bottom: 4px;
      }

      .version-item {
        padding: 10px 16px;
        transition: all 0.3s ease;
        
        &:hover {
          background-color: rgba(116, 162, 116, 0.05);
        }
      }

      .version-item-content {
        display: flex;
        align-items: center;
      }

      .version-number {
        font-size: 14px !important;
        font-weight: 500 !important;
        color: #333 !important;
        margin-right: 12px;
      }

      .version-date {
        font-size: 12px !important;
        color: #999 !important;
      }

      .el-dropdown-item.is-disabled {
        color: #999;
        font-size: 14px;
        text-align: center;
        padding: 16px 0;
      }
    }
  }
</style>
