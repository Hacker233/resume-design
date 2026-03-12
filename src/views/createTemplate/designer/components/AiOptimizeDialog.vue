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
        <el-radio-group v-model="selectedModel" @change="handleModelChange">
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
        </el-radio-group>
      </div>

      <!-- 历史记录 -->
      <div class="history-optimize-list" @click="handleOpenLogs">
        <svg-icon icon-name="icon-jingji" color="#999999" size="16px"></svg-icon>
        <span>历史诊断记录</span>
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
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import {
    getOptimizeResumeIntegralAsync,
    getOptimizeResumeModelListAsync,
    getOptimizeResumeUploadIntegralAsync
  } from '@/http/api/ai';
  import { formatNumberWithCommas } from '@/utils/common';
  import appStore from '@/store';
  import jianBImage from '@/assets/images/jianB.png';
  import AiOptimizeDialogLogs from './AiOptimizeDialogLogs.vue';
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
      // 查询简币数量和模型列表
      await Promise.all([
        props.type === 'offline' ? getOptimizeResumeUploadIntegral() : getOptimizeResumeCoin(),
        getOptimizeResumeModelList()
      ]);
    } catch (error) {
      errorMessage.value = '加载失败，请稍后重试';
    } finally {
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

  // 查询AI简历优化支持的模型列表
  const getOptimizeResumeModelList = async () => {
    try {
      const response = await getOptimizeResumeModelListAsync();
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
    console.log('selectedModel:', selectedModel.value); // 打印 selectedModel 的值
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
</script>

<style lang="scss">
  .custom-dialog {
    border-radius: 24px;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
    background-color: #ffffff;
    overflow: hidden;
    & .el-dialog__header {
      background-color: transparent;
      padding: 24px;
      color: #333333;
      font-size: 24px;
      font-weight: bold;
      border-bottom: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    & .el-dialog__body {
      padding: 24px;
    }
    & .el-dialog__footer {
      background-color: #ffffff;
      padding: 24px;
      border-top: none;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
  }

  .ai-content-optimize-dialog {
    display: flex;
    flex-direction: column;
    gap: 24px;
    position: relative; /* 为模型选择器定位 */
    .content-box {
      width: 100%;
      
      .title-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        
        .title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0;
          position: relative;
          padding-left: 16px;
          
          &::before {
            content: '';
            position: absolute;
            height: 12px;
            width: 4px;
            background-color: #4e97fb;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 2px;
          }
        }
        
        .get-bi-btn {
          border-radius: 20px;
          font-size: 14px;
          padding: 6px 16px;
          border-color: #4e97fb;
          color: #4e97fb;
          
          &:hover {
            background-color: #4e97fb;
            color: white;
          }
        }
      }
      
      .content {
        
        .jb-card {
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #f5f9ff 0%, #e6f0ff 100%);
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          
          .jb-icon {
            margin-right: 16px;
            
            img {
              animation: pulse 2s infinite;
            }
          }
          
          .jb-info {
            
            .jb-label {
              font-size: 14px;
              color: #666;
              margin-bottom: 4px;
            }
            
            .jb-num {
              font-size: 28px;
              font-weight: 700;
              background: linear-gradient(135deg, #ff6b35 0%, #ff8e53 100%);
              background-clip: text;
              -webkit-text-fill-color: transparent;
              letter-spacing: 1px;
            }
          }
        }
      }
    }
    .model-selector {
      width: 100%;
      margin-bottom: 20px;
      .el-select {
        width: 100%;
      }
      .model-tips {
        font-size: 12px;
        color: #999;
        margin-top: 8px;
        margin-left: 10px;
      }
    }
    .history-optimize-list {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s;
      padding: 5px 0;
      width: 110px;
      background-color: #fbfbfb;
      font-size: 12px;
      color: #8d8a8a;
      user-select: none;
      &:hover {
        background-color: #eee;
        border-radius: 3px;
        color: green;
      }
      span {
        margin-left: 6px;
      }
    }
    .el-radio {
      display: flex;
      align-items: center;
      margin-bottom: 10px; // 增加间距
      border-radius: 8px; // 圆角
      padding: 10px; // 内边距
      transition: all 0.3s ease; // 过渡效果
      border: 1px solid #dcdfe6; // 默认边框颜色

      &:hover {
        background-color: #f5f7fa; // 鼠标悬停背景色
        border-color: #4e97fb; // 鼠标悬停边框颜色
      }

      &.is-checked {
        background-color: #e8f4ff; // 选中背景色
        border-color: #4e97fb; // 选中边框颜色

        .el-radio__label {
          color: #4e97fb; // 选中文字颜色
        }
      }

      .el-radio__label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        font-size: 14px; // 字体大小
        color: #606266; // 默认文字颜色

        .free-tag {
          margin-left: 10px;
          padding: 4px 8px;
          background-color: #e8f5e9; // 免费标签背景色
          color: #4caf50; // 免费标签文字颜色
          border-radius: 12px;
          font-size: 12px;
          font-weight: bold;
        }

        .tips {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
          font-size: 14px;
          color: #4e97fb; // 简币文字颜色
          font-weight: bold;

          img {
            margin-left: 5px;
          }
        }
      }
      .vip-icon {
        position: absolute; // 绝对定位
        top: -12px;
        right: -6px;
      }
    }
  }

  /* 添加动画效果 */
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
  }
</style>
