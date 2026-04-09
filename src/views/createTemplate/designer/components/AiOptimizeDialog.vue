<template>
  <el-dialog
    :model-value="dialogAiOptimizeVisible"
    title="AI简历诊断"
    width="820px"
    append-to-body
    class="custom-dialog"
    @open="handleOpen"
    @close="cancle"
  >
    <div class="ai-content-optimize-dialog">
      <!-- 当前简币数量 -->
      <div class="content-box">
        <div class="title-section">
          <h1 class="title">
            <span v-if="!userInfo.isAllFree">您当前简币数量</span>
            <span v-else>请选择AI模型</span>
          </h1>
          <el-button 
            v-if="!userInfo.isAllFree" 
            size="small" 
            type="info" 
            plain 
            @click="openGetDialog"
            class="get-bi-btn"
          >
            获取简币
          </el-button>
        </div>
        <div v-if="!userInfo.isAllFree" class="content">
          <div class="jb-card">
            <div class="jb-icon">
              <img width="32" src="@/assets/images/jianB.png" alt="简币" />
            </div>
            <div class="jb-info">
              <div class="jb-label">当前余额</div>
              <div class="jb-num">{{ formattedIntegral }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 模型选择器 -->
      <div class="model-selector">
        <!-- 加载中状态 -->
        <div v-if="isLoading" class="model-loading">
          <el-skeleton :rows="2" animated />
        </div>
        <!-- 模型列表 -->
        <el-radio-group v-else v-model="selectedModel" @change="handleModelChange">
          <template v-if="modelList.length > 0">
            <!-- 该用户是否全站免费 -->
            <template v-if="userInfo.isAllFree">
              <el-radio
                v-for="(item, index) in modelList"
                :key="index"
                :label="item.model_name"
                size="large"
                border
              >
                {{ item.model_name }}
              </el-radio>
            </template>
            <template v-else>
              <el-tooltip
                v-for="(item, index) in modelList"
                :key="index"
                effect="dark"
                :content="item.model_is_free ? '限会员使用' : `每次消耗 ${Math.abs(payValue)} 简币`"
                placement="top"
              >
                <el-radio
                  v-if="item.model_is_free"
                  :label="item.model_name"
                  size="large"
                  border
                  :disabled="!isMember"
                >
                  {{ item.model_name }}
                  <span class="free-tag">免费</span>
                  <!-- 皇冠 -->
                  <img
                    class="vip-icon"
                    src="@/assets/images/membership.svg"
                    alt="会员"
                    title="会员"
                    width="20"
                  />
                </el-radio>
                <el-radio v-else :label="item.model_name" size="large" border>
                  {{ item.model_name }}
                  <span class="tips">
                    {{ Math.abs(payValue) }}
                    <img
                      width="22"
                      src="@/assets/images/jianB.png"
                      alt="简币"
                      title="简币 - 您的专属虚拟货币"
                    />
                  </span>
                </el-radio>
              </el-tooltip>
            </template>
          </template>
          <template v-else>
            <div class="no-model-data">暂无可用模型</div>
          </template>
        </el-radio-group>
      </div>

      <!-- 操作按钮组 -->
      <div class="action-buttons">
        <!-- 历史记录 -->
        <div class="history-optimize-list" @click="handleOpenLogs" @mouseenter="isHistoryHover = true" @mouseleave="isHistoryHover = false">
          <svg-icon icon-name="icon-jingji" color="#999999" hover-color="#ffffff" :parent-hover="isHistoryHover" size="16px"></svg-icon>
          <span>历史诊断记录</span>
        </div>
        
        <!-- 诊断示例 -->
        <div class="example-report-btn" @click="openExampleReport" @mouseenter="isExampleHover = true" @mouseleave="isExampleHover = false">
          <svg-icon icon-name="icon-moban1" color="#999999" hover-color="#ffffff" :parent-hover="isExampleHover" size="16px"></svg-icon>
          <span>诊断示例</span>
        </div>
      </div>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button size="default" @click="cancle">取消</el-button>
        <el-button size="default" type="primary" :loading="isSubmitting" @click="submit">
          开始诊断
        </el-button>
      </span>
    </template>
  </el-dialog>



  <!-- 获取简币弹窗 -->
  <pay-integral-dialog
    :title="title"
    :dialog-get-integral-visible="dialogGetIntegralVisible"
    :pay-number="-Math.abs(payValue) || 0"
    placeholder="下载该创作"
    @cancle="handleCancleDialog"
    @confirm="handleConfirmDialog"
  />

  <!-- 历史诊断记录弹窗 -->
  <ai-optimize-dialog-logs
    :dialog-ai-optimize-visible-logs="dialogAiOptimizeVisibleLogs"
    @cancle="handleCloseLogs"
  />
  
  <!-- 诊断示例弹窗 -->
  <example-report-modal
    v-model:visible="exampleReportVisible"
  />
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import {
    getOptimizeResumeIntegralAsync,
    getOptimizeResumeModelListAsync,
    getOptimizeResumeUploadIntegralAsync,
    getDiagnoseResumeModelListAsync
  } from '@/http/api/ai';
  import { formatNumberWithCommas } from '@/utils/common';
  import appStore from '@/store';
  import jianBImage from '@/assets/images/jianB.png';
  import AiOptimizeDialogLogs from './AiOptimizeDialogLogs.vue';
import ExampleReportModal from '@/components/ExampleReportModal/index.vue';
import { storeToRefs } from 'pinia';

  const emit = defineEmits(['cancle', 'updateSuccess']);

  const { userInfo } = storeToRefs(appStore.useUserInfoStore);

  interface TDialog {
    dialogAiOptimizeVisible: boolean;
    type?: string;
  }

  const props = withDefaults(defineProps<TDialog>(), {
    dialogAiOptimizeVisible: false,
    type: ''
  });

  // 响应式数据
  const selectedModel = ref<string>('');
  const modelList = ref<any>([]);
  const payValue = ref<number>(0);
  const isLoading = ref<boolean>(false);
  const errorMessage = ref<string>('');
  const isSubmitting = ref<boolean>(false);
  const dialogGetIntegralVisible = ref<boolean>(false);
  const title = ref<string>('');
  const isHistoryHover = ref<boolean>(false);
  const exampleReportVisible = ref<boolean>(false);
  const isExampleHover = ref<boolean>(false);

  // 模型切换
  const handleModelChange = (value: string) => {
    console.log('value:', value); // 打印 value 的值
    selectedModel.value = value;
  };

  // 计算属性
  const formattedIntegral = computed(() => {
    return formatNumberWithCommas(appStore.useUserInfoStore.userIntegralInfo.integralTotal);
  });

  // 弹窗打开
  const handleOpen = async () => {
    try {
      console.log('开始加载模型列表和简币消耗');
      // 设置加载状态
      isLoading.value = true;
      // 先调用获取简币消耗的方法
      await getOptimizeResumeUploadIntegral();
      // 再调用获取模型列表的方法
      await getOptimizeResumeModelList();
      console.log('模型列表加载完成:', modelList.value);
    } catch (error) {
      console.error('加载失败:', error);
      errorMessage.value = '加载失败，请稍后重试';
    } finally {
      // 无论成功失败，都设置加载状态为false
      isLoading.value = false;
    }
  };

  // 判断是否是会员
  const { membershipInfo } = storeToRefs(appStore.useMembershipStore);
  const isMember = computed(() => {
    if (membershipInfo.value.hasMembership && membershipInfo.value.daysRemaining > 0) {
      return true;
    } else {
      return false;
    }
  });

  // 查询上传文件进行AI优化需要的简币数量
  const getOptimizeResumeUploadIntegral = async () => {
    const response = await getOptimizeResumeUploadIntegralAsync();
    if (response.data.status === 200) {
      payValue.value = response.data.data;
    } else {
      ElMessage.error(response.data.message);
    }
  };

  // 查询AI简历优化需要的简币数量
  const getOptimizeResumeCoin = async () => {
    const response = await getOptimizeResumeIntegralAsync();
    if (response.data.status === 200) {
      payValue.value = response.data.data;
    } else {
      ElMessage.error(response.data.message);
    }
  };

  // 查询AI简历诊断支持的模型列表
  const getOptimizeResumeModelList = async () => {
    try {
      const response = await getDiagnoseResumeModelListAsync();
      if (response.data.status === 200) {
        modelList.value = response.data.data;
      } else {
        ElMessage.error(response.data.message);
      }
    } catch (error) {
      throw new Error('获取模型列表失败');
    }
  };

  // 提交
  const { userIntegralInfo } = storeToRefs(appStore.useUserInfoStore);
  const submit = async () => {
    isSubmitting.value = true;
    console.log('selectedModel:', selectedModel.value);
    if (!selectedModel.value) {
      ElMessage.error('请先选择AI模型');
      isSubmitting.value = false;
      return;
    }

    const modelObj = modelList.value.find((item: any) => item.model_name === selectedModel.value);

    // 全站免费用户直接调用接口
    if (userInfo.value.isAllFree) {
      emit('updateSuccess', {
        selectedModel: selectedModel.value,
        payValue: payValue.value,
        modelObj
      });
      isSubmitting.value = false;
      return;
    }

    // 不是会员，选择了付费模型
    if (!isMember.value && !modelObj.model_is_free) {
      // 判断简币数量
      if (userIntegralInfo.value.integralTotal < Math.abs(payValue.value)) {
        ElMessage.warning('简币不足');
        isSubmitting.value = false;
        return;
      }
    }

    if (!modelObj.model_is_free) {
      try {
        await ElMessageBox.confirm(
          `<div style="display: flex; align-items: center;">本次操作将消耗 ${formatNumberWithCommas(
            payValue.value
          )} <img style="margin-left: 5px;" width="22" src="${jianBImage}" alt="简币" />，是否继续？</div>`,
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            dangerouslyUseHTMLString: true
          }
        );
      } catch (error) {
        // 用户点击了取消
        isSubmitting.value = false;
        return;
      }
    } else {
      if (!isMember.value) {
        ElMessage.warning('免费模型仅支持会员用户');
        isSubmitting.value = false;
        return;
      }
    }

    emit('updateSuccess', {
      selectedModel: selectedModel.value,
      payValue: payValue.value,
      modelObj
    });
    isSubmitting.value = false;
  };



  // 取消
  const cancle = () => {
    emit('cancle');
  };

  // 打开获取简币弹窗
  const openGetDialog = () => {
    title.value = '如何获取简币';
    dialogGetIntegralVisible.value = true;
  };

  // 取消警告弹窗
  const handleCancleDialog = () => {
    dialogGetIntegralVisible.value = false;
  };

  // 确定警告弹窗
  const handleConfirmDialog = () => {
    dialogGetIntegralVisible.value = false;
  };

  // 打开历史诊断记录弹窗
  const dialogAiOptimizeVisibleLogs = ref<boolean>(false);
  const handleOpenLogs = () => {
    dialogAiOptimizeVisibleLogs.value = true;
  };

  // 关闭历史诊断记录弹窗
  const handleCloseLogs = () => {
    dialogAiOptimizeVisibleLogs.value = false;
  };

  // 打开诊断示例弹窗
  const openExampleReport = () => {
    exampleReportVisible.value = true;
  };
</script>

<style lang="scss">
  .custom-dialog {
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1);
    background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
    overflow: hidden;
    animation: dialogSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    @keyframes dialogSlideIn {
      from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    & .el-dialog__header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px 28px 20px 28px;
      color: #ffffff;
      font-size: 22px;
      font-weight: 700;
      border-bottom: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      letter-spacing: 0.5px;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 28px;
        right: 28px;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      }

      .el-dialog__title {
        color: #ffffff;
        font-size: 22px;
        font-weight: 700;
        letter-spacing: 0.5px;
        flex: 1;
      }

      .el-dialog__headerbtn {
        color: #ffffff;
        font-size: 20px;
        transition: all 0.3s ease;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        cursor: pointer;
        position: absolute;
        top: 13px;
        right: 28px;

        &:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: rotate(90deg) scale(1.1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        &:active {
          transform: rotate(90deg) scale(0.95);
        }
      }
    }

    & .el-dialog__body {
      padding: 32px;
      background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
    }

    & .el-dialog__footer {
      background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
      padding: 24px 32px;
      border-top: 2px solid rgba(102, 126, 234, 0.1);
      display: flex;
      justify-content: flex-end;
      gap: 16px;
    }
  }

  .ai-content-optimize-dialog {
    display: flex;
    flex-direction: column;
    gap: 28px;
    position: relative;

    .content-box {
      width: 100%;

      .title-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .title {
          font-size: 20px;
          font-weight: 700;
          color: #2d3748;
          margin: 0;
          position: relative;
          padding-left: 20px;

          &::before {
            content: '';
            position: absolute;
            height: 16px;
            width: 5px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 3px;
            box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
          }
        }

        .get-bi-btn {
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          padding: 8px 20px;
          border: 2px solid #667eea;
          color: #667eea;
          background: transparent;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);

          &:hover {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
            transform: translateY(-2px);
          }

          &:active {
            transform: translateY(0);
          }
        }
      }

      .content {
        .jb-card {
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #f5f9ff 0%, #e6f0ff 100%);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.12), 0 2px 8px rgba(0, 0, 0, 0.05);
          border: 2px solid rgba(102, 126, 234, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

          &:hover {
            box-shadow: 0 12px 32px rgba(102, 126, 234, 0.18), 0 4px 12px rgba(0, 0, 0, 0.08);
            transform: translateY(-3px);
            border-color: rgba(102, 126, 234, 0.2);
          }

          .jb-icon {
            margin-right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            padding: 12px;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

            img {
              animation: coinPulse 2s ease-in-out infinite;
            }
          }

          .jb-info {
            .jb-label {
              font-size: 14px;
              color: #718096;
              margin-bottom: 8px;
              font-weight: 500;
            }

            .jb-num {
              font-size: 32px;
              font-weight: 800;
              background: linear-gradient(135deg, #ff6b35 0%, #ff8e53 100%);
              background-clip: text;
              -webkit-text-fill-color: transparent;
              letter-spacing: 2px;
              text-shadow: 0 2px 8px rgba(255, 107, 53, 0.2);
            }
          }
        }
      }
    }

    .model-selector {
      width: 100%;
      margin-bottom: 24px;

      .el-radio-group {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        width: 100%;
      }

      .el-select {
        width: 100%;
      }

      .model-tips {
        font-size: 13px;
        color: #718096;
        margin-top: 12px;
        margin-left: 12px;
        line-height: 1.6;
      }
    }

    .action-buttons {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin-top: 16px;
    }

    .history-optimize-list,
    .example-report-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      padding: 12px 24px;
      width: auto;
      min-width: 140px;
      background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
      border: 2px solid rgba(102, 126, 234, 0.15);
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
      color: #667eea;
      user-select: none;
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
      gap: 8px;

      &:hover {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        box-shadow: 0 4px 16px rgba(102, 126, 234, 0.25);
        transform: translateY(-2px);
        border-color: transparent;
      }

      &:active {
        transform: translateY(0);
      }

      svg {
        flex-shrink: 0;
        transition: color 0.3s ease;
      }

      span {
        white-space: nowrap;
      }
    }

    .el-radio {
      display: flex;
      align-items: center;
      border-radius: 14px;
      padding: 14px 16px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 2px solid #e2e8f0;
      background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
      position: relative;
      width: 100%;
      min-height: 50px;

      &:hover {
        background: linear-gradient(135deg, #f8f9ff 0%, #e8f4ff 100%);
        border-color: #667eea;
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.15);
        transform: translateY(-3px);
      }

      &.is-checked {
        background: linear-gradient(135deg, #e8f4ff 0%, #d6e9ff 100%);
        border-color: #667eea;
        box-shadow: 0 6px 24px rgba(102, 126, 234, 0.25);

        .el-radio__label {
          color: #667eea;
        }
      }

      &.is-disabled {
        opacity: 0.6;
        cursor: not-allowed;

        &:hover {
          transform: none;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
        }
      }

      .el-radio__label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        font-size: 15px;
        font-weight: 700;
        color: #4a5568;
        letter-spacing: 0.3px;
        line-height: 1.4;

        .free-tag {
          margin-left: 12px;
          padding: 5px 10px;
          background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
          color: #2e7d32;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 800;
          box-shadow: 0 3px 8px rgba(46, 125, 50, 0.25);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .tips {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 12px;
          font-size: 14px;
          color: #667eea;
          font-weight: 800;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          padding: 5px 8px;
          border-radius: 10px;
          border: 1px solid rgba(102, 126, 234, 0.15);
          box-shadow: 0 2px 6px rgba(102, 126, 234, 0.1);

          img {
            margin-left: 6px;
            width: 16px;
            height: 16px;
            transition: transform 0.3s ease;
          }

          &:hover img {
            transform: scale(1.1);
          }
        }
      }

      .vip-icon {
        position: absolute;
        top: -12px;
        right: -6px;
        filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.25));
        animation: vipFloat 3s ease-in-out infinite;
        z-index: 10;
        width: 22px;
        height: 22px;
      }

      @keyframes vipFloat {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-4px);
        }
      }
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes coinPulse {
    0% {
      transform: scale(1) rotate(0deg);
    }
    25% {
      transform: scale(1.08) rotate(5deg);
    }
    50% {
      transform: scale(1.12) rotate(0deg);
    }
    75% {
      transform: scale(1.08) rotate(-5deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;

    .el-button {
      border-radius: 10px;
      font-weight: 600;
      font-size: 15px;
      padding: 12px 28px;
      height: 44px;
      line-height: 1;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      letter-spacing: 0.5px;

      &:hover {
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0);
      }

      &.el-button--default {
        border: 2px solid #e2e8f0;
        color: #4a5568;
        background: #ffffff;

        &:hover {
          border-color: #667eea;
          color: #667eea;
          background: #f8f9ff;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
        }
      }

      &.el-button--primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        color: #ffffff;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

        &:hover {
          background: linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        &:active {
          transform: translateY(0);
        }

        &.is-loading {
          opacity: 0.8;
          cursor: not-allowed;
        }
      }
    }
  }

  // 模型加载状态
  .model-loading {
    padding: 20px 0;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // 无模型数据状态
  .no-model-data {
    padding: 20px;
    text-align: center;
    color: #909399;
    font-size: 14px;
  }
</style>
