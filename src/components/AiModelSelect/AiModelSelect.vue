<template>
  <div class="ai-model-select-cpt">
    <!-- 当前简币数量 -->
    <div class="content-box">
      <h1 class="title">
        您当前简币数量
        <div class="get-bi-method" @click="openGetDialog">获取简币</div>
      </h1>
      <div class="content">
        <p class="jb-num">
          {{ formattedIntegral }}
          <img width="22" src="@/assets/images/jianB.png" alt="简币" />
        </p>
      </div>
    </div>

    <!-- 模型选择器 -->
    <div class="model-selector">
      <h1 class="title"> 请选择AI模型 </h1>
      <el-radio-group v-model="selectedModel" @change="handleModelChange">
        <el-radio label="" size="large" border>
          免费模型
          <span class="free-tag">免费</span>
        </el-radio>
        <template v-if="modelList.length > 0">
          <el-tooltip
            v-for="(item, index) in modelList"
            :key="index"
            effect="dark"
            :content="`每次消耗 ${Math.abs(payValue)} 简币`"
            placement="top"
          >
            <el-radio :label="item" size="large" border>
              {{ item }}
              <span class="tips">
                {{ Math.abs(payValue) }}
                <img width="22" src="@/assets/images/jianB.png" alt="简币" title="简币" />
              </span>
            </el-radio>
          </el-tooltip>
        </template>
      </el-radio-group>
    </div>
  </div>

  <!-- 获取简币弹窗 -->
  <pay-integral-dialog
    :title="title"
    :dialog-get-integral-visible="dialogGetIntegralVisible"
    :pay-number="-Math.abs(payValue) || 0"
    placeholder="获取简币"
    @cancle="handleCancleDialog"
    @confirm="handleConfirmDialog"
  />
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { ElMessage } from 'element-plus';
  import {
    getGenerateResumeIntegralAsync,
    getGenerateResumeModelListAsync,
    getOptimizeResumeIntegralAsync,
    getOptimizeResumeModelListAsync
  } from '@/http/api/ai';
  import { formatNumberWithCommas } from '@/utils/common';
  import appStore from '@/store';

  const emit = defineEmits(['handleModelChange']);

  interface TDialog {
    dialogAiOptimizeVisible: boolean;
    aiType?: string;
  }

  const props = withDefaults(defineProps<TDialog>(), {
    dialogAiOptimizeVisible: false,
    aiType: 'optimizeResume'
  });

  // 响应式数据
  const selectedModel = ref<string>('');
  const modelList = ref<string[]>([]);
  const payValue = ref<number>(0);
  const dialogGetIntegralVisible = ref<boolean>(false);
  const title = ref<string>('');

  // 模型切换
  const handleModelChange = (value: string) => {
    console.log('value:', value); // 打印 value 的值
    selectedModel.value = value;
    emit('handleModelChange', {
      value: value,
      payValue: payValue.value
    });
  };

  // 计算属性
  const formattedIntegral = computed(() => {
    return formatNumberWithCommas(appStore.useUserInfoStore.userIntegralInfo.integralTotal);
  });

  onMounted(async () => {
    if (props.aiType === 'generateResume') {
      // 查询简币数量和模型列表
      await Promise.all([getGenerateResumeCoin(), getGenerateResumeModelList()]);
    } else {
      // 查询简币数量和模型列表
      await Promise.all([getOptimizeResumeCoin(), getOptimizeResumeModelList()]);
    }
  });

  // 查询AI简历优化需要的简币数量
  const getOptimizeResumeCoin = async () => {
    const response = await getOptimizeResumeIntegralAsync();
    if (response.data.status === 200) {
      payValue.value = response.data.data;
    } else {
      ElMessage.error(response.data.message);
    }
  };

  // 查询AI简历智能生成需要的简币数量
  const getGenerateResumeCoin = async () => {
    const response = await getGenerateResumeIntegralAsync();
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

  // 查询AI简历智能生成支持的模型列表
  const getGenerateResumeModelList = async () => {
    try {
      const response = await getGenerateResumeModelListAsync();
      if (response.data.status === 200) {
        modelList.value = response.data.data;
      } else {
        ElMessage.error(response.data.message);
      }
    } catch (error) {
      throw new Error('获取模型列表失败');
    }
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
</script>
<style lang="scss" scoped>
  .ai-model-select-cpt {
    display: flex;
    flex-direction: column;
    position: relative; /* 为模型选择器定位 */
    .content-box {
      font-size: 12px;
      color: #777777;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border-bottom: none;
      margin-bottom: 15px;
      p {
        height: 40px;
        font-size: 14px;
        display: flex;
        align-items: center;
        color: #fb8444;
        img {
          margin-left: 5px;
        }
      }
      .jb-num {
        font-size: 18px;
        font-weight: 600;
        background: -webkit-linear-gradient(top, #ff0000, #00ff00); /*设置线性渐变*/
        /*为了支持更多的浏览器*/
        background-clip: text; /*背景被裁剪到文字*/
        -webkit-text-fill-color: transparent; /*设置文字的填充颜色*/
        letter-spacing: 1px;
      }
      .content {
        font-size: 14px;
        color: #333333;
        margin-top: 10px;
        margin-left: 10px;
      }
    }
    .title {
      font-size: 16px;
      color: #009a74;
      position: relative;
      height: 20px;
      display: flex;
      align-items: center;
      margin-left: 10px;
      letter-spacing: 1px;
      &::before {
        content: '';
        position: absolute;
        height: 10px;
        width: 3px;
        background-color: #009a74;
        left: -10px;
      }
      .get-bi-method {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6px 10px;
        height: 25px;
        background-color: #70f5c4;
        border-radius: 15px;
        font-size: 13px;
        transition: all 0.3s;
        margin: 0 auto;
        margin-left: 15px;
        cursor: pointer;
        letter-spacing: 1px;
        user-select: none;
        &:hover {
          opacity: 0.8;
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
    .el-radio-group {
      margin: 20px 0 0 10px;
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

      :deep(.el-radio__label) {
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
    }
  }
</style>
