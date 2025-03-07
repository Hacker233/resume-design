<template>
  <el-dialog
    :model-value="dialogAiVisible"
    :title="dialogTitle"
    width="800px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
    custom-class="custom-dialog"
    @open="handleOpen"
  >
    <div class="ai-content-edit-page-select-warpper">
      <!-- 当前简币数量 -->
      <div class="content-box">
        <h1 class="title"
          >您当前简币数量
          <div class="get-bi-method" @click="openGetDialog">获取简币</div>
        </h1>
        <div class="content">
          <p class="jb-num"
            >{{ formatNumberWithCommas(appStore.useUserInfoStore.userIntegralInfo.integralTotal) }}
            <img width="22" src="@/assets/images/jianB.png" alt="简币"
          /></p>
        </div>
        <!-- <div class="get-bi-method" @click="openGetDialog">获取简币</div> -->
      </div>
      <!-- 新增模型选择器 -->
      <div class="model-selector">
        <el-radio-group v-model="selectedModel">
          <el-radio value="" size="large" border>
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
        </el-radio-group>
      </div>
      <div class="bottom">
        <div class="ai-content ai-content-left">
          <template v-if="type === 'edit'">
            <h1 class="title">润色前：</h1>
          </template>
          <template v-else>
            <h1 class="title">请输入您的创作关键词</h1>
          </template>
          <div v-if="type === 'edit'" v-dompurify-html="content" class="content"></div>
          <el-input
            v-else
            v-model="aiPropmt"
            type="textarea"
            :placeholder="placeholder"
            maxlength="3000"
            show-word-limit
          >
          </el-input>
        </div>
        <div class="ai-content-center">
          <svg-icon
            :class="['ai-icon', { 'ai-icon-loading': aiLoading }]"
            icon-name="icon-multimediaaiduomeitiai"
            color="#4e97fb"
            size="40px"
            @click="aiEdit"
          />
          <template v-if="type === 'edit'">
            <span v-if="!aiLoading">开始润色</span>
            <span v-else>润色中...</span>
          </template>
          <template v-else>
            <span v-if="!aiLoading">开始创作</span>
            <span v-else>创作中...</span>
          </template>
        </div>
        <div class="ai-content ai-content-right">
          <template v-if="type === 'edit'">
            <h1 class="title">润色后：</h1>
          </template>
          <template v-else>
            <h1 class="title">AI创作内容</h1>
          </template>
          <el-input
            v-model="aiEditContent"
            type="textarea"
            :element-loading-text="type === 'edit' ? 'AI拼命润色中~' : '拼命创作中'"
            placeholder="AI创作内容将展示在这里"
          >
          </el-input>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="normal" @click="cancle">取消</el-button>
        <el-button size="normal" type="primary" @click="submit">写入简历</el-button>
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
  ></pay-integral-dialog>
</template>

<script lang="ts" setup>
  import {
    polishTextStreamAsync,
    createTextStreamAsync,
    cancelPolishTextStreamAsync,
    cancelCreateTextStreamAsync,
    getPolishIntegralAsync,
    getPolishModelListAsync,
    getCreateIntegralAsync,
    getCreateModelListAsync
  } from '@/http/api/ai';
  import { ElMessage, ElNotification, ElMessageBox } from 'element-plus'; // 引入 ElMessageBox
  import { ref, watch, computed } from 'vue';
  import { formatNumberWithCommas } from '@/utils/common';
  import appStore from '@/store';
  import jianBImage from '@/assets/images/jianB.png';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogAiVisible: boolean;
    type: string;
    module: any;
    content: any;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogAiVisible: false,
    type: 'new',
    module: {},
    content: ''
  });

  const dialogTitle = ref<string>('');
  const currentModule = ref<any>(null);
  const placeholder = ref<string>('请输入关键词，如毕业于猫步简历大学、计算机专业、创作项目经历等');
  const aiPropmt = ref<string>('');
  const aiLoading = ref<boolean>(false);
  const aiEditContent = ref<string>('');
  const selectedModel = ref<string>(''); // 选中的模型
  const streamController = ref<AbortController | null>(null); // 流式请求控制器
  const modelList = ref<string[]>([]); // 模型列表
  const payValue = ref<number>(0); // 消费简币数量
  const { getAndUpdateUserInfo } = appStore.useUserInfoStore;

  // 默认模型
  const defaultModel = computed(() => (selectedModel.value ? selectedModel.value : ''));

  // 弹窗打开
  const handleOpen = () => {
    console.log('selectedModel:', selectedModel.value); // 确保初始值为空字符串
    if (props.type === 'edit') {
      // 查询AI润色需要的简币数量
      getPolishCoin();
      // 查询简历润色支持的模型列表
      getPolishModelList();
    } else {
      getCreateIntegral();
      getCreateModelList();
    }
    selectedModel.value = ''; // 确保初始值为空字符串
  };

  // 查询AI润色需要的简币数量
  const getPolishCoin = async () => {
    const response = await getPolishIntegralAsync();
    if (response.data.status === 200) {
      // 设置简币数量
      payValue.value = response.data.data;
    } else {
      ElMessage.error(response.data.message);
    }
  };

  // 查询AI创作需要的简币数量
  const getCreateIntegral = async () => {
    const response = await getCreateIntegralAsync();
    if (response.data.status === 200) {
      // 设置简币数量
      payValue.value = response.data.data;
    } else {
      ElMessage.error(response.data.message);
    }
  };

  // 查询简历润色支持的模型列表
  const getPolishModelList = async () => {
    try {
      const response = await getPolishModelListAsync();
      if (response.data.status === 200) {
        modelList.value = response.data.data;
      } else {
        ElMessage.error(response.data.message);
      }
    } catch (error) {
      ElMessage.error('获取模型列表失败');
    }
  };

  // 查询简历创作支持的模型列表
  const getCreateModelList = async () => {
    try {
      const response = await getCreateModelListAsync();
      if (response.data.status === 200) {
        modelList.value = response.data.data;
      } else {
        ElMessage.error(response.data.message);
      }
    } catch (error) {
      ElMessage.error('获取模型列表失败');
    }
  };

  watch(
    () => props.dialogAiVisible,
    (newVal) => {
      if (newVal) {
        dialogTitle.value =
          props.type === 'edit'
            ? `简历润色优化 - ${props.module.title}`
            : `AI简历内容创作 - ${props.module.title}`;
        currentModule.value = props.module;
        aiLoading.value = false;
        aiEditContent.value = '';
        selectedModel.value = ''; // 确保初始值为空字符串
      }
    }
  );

  // 取消
  const cancle = () => {
    if (streamController.value) {
      const cancelMethod =
        props.type === 'edit' ? cancelPolishTextStreamAsync : cancelCreateTextStreamAsync;
      cancelMethod(streamController.value);
    }
    emit('cancle');
  };

  // 处理流式数据
  const handleStreamData = (chunk: string) => {
    const lines = chunk.split('\n');
    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('data:')) {
        const dataPart = trimmedLine.slice(5).trim();
        try {
          const parsedData = JSON.parse(dataPart);
          const content = parsedData.data;
          if (content) {
            aiEditContent.value += content;
          }
        } catch (e) {
          ElNotification({ title: '提示', message: trimmedLine, type: 'error' });
        }
      }
    });
  };

  // 点击开始润色或创作

  const aiEdit = async () => {
    if (aiLoading.value) return;

    // 如果选择了付费模型，弹出确认框
    if (defaultModel.value) {
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
        return;
      }
    }

    aiLoading.value = true;
    aiEditContent.value = '';

    const params = {
      model: defaultModel.value,
      text: props.type === 'edit' ? props.content : aiPropmt.value,
      moduleTitle: props.module.title
    };

    const streamMethod = props.type === 'edit' ? polishTextStreamAsync : createTextStreamAsync;
    const controller = streamMethod(
      params,
      handleStreamData,
      (error: any) => {
        ElMessage.error(error.message || `${props.type === 'edit' ? '润色' : '创作'}失败`);
        aiLoading.value = false;
      },
      () => {
        aiLoading.value = false;
        getAndUpdateUserInfo();
        if (defaultModel.value) {
          // 手动更新用户简币数量
          appStore.useUserInfoStore.userIntegralInfo.integralTotal =
            appStore.useUserInfoStore.userIntegralInfo.integralTotal + payValue.value;
        }
        ElMessage.success(`${props.type === 'edit' ? '简历润色' : '简历创作'}成功`);
      }
    );
    streamController.value = controller;
  };

  // 提交
  const submit = () => {
    console.log('ai内容:', aiEditContent.value);
    emit('updateSuccess', aiEditContent.value);
    cancle();
  };

  // 打开获取简币弹窗
  const dialogGetIntegralVisible = ref<boolean>(false);
  const title = ref<string>('');
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

  .ai-content-edit-page-select-warpper {
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
      .content {
        font-size: 14px;
        color: #333333;
        margin-top: 10px;
        margin-left: 10px;
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
    .bottom {
      display: flex;
      position: relative; /* 为模型选择器定位 */
      gap: 20px;
      .ai-content {
        flex: 1;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 18px;
        transition: all 0.3s ease;
        &:hover {
          transform: translateY(-1px);
        }
        .title {
          font-size: 18px;
          margin-bottom: 10px;
          color: #333333;
        }
        .el-textarea {
          height: 400px;
          .el-textarea__inner {
            height: 100%;
            resize: none;
            text-align: justify;
            padding: 10px 10px;
            border: 1px solid #dcdcdc;
            border-radius: 4px;
            transition: border-color 0.3s ease;
            &:focus {
              border-color: #4e97fb;
            }
          }
        }
        .content {
          height: 400px;
          border: 1px solid #ccc;
          border-radius: 4px;
          overflow: auto;
          padding: 10px 10px;
          box-sizing: border-box;
          line-height: 1.5;
          letter-spacing: 1px;
          text-align: justify;
          font-size: 12px;
          color: #333333;
        }
        .text-number-box {
          display: flex;
          align-items: center;
          margin-top: 10px;
          font-size: 12px;
          letter-spacing: 1px;
          justify-content: space-between;
          p {
            word-wrap: keep-all;
          }
          .text {
            margin-left: 10px;
            margin-right: 5px;
          }
          .tips {
            color: #999;
            margin-left: 5px;
          }
        }
      }
      .ai-content-center {
        width: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        user-select: none;
        .ai-icon {
          cursor: pointer;
          transition: opacity 0.3s ease;
        }
        .ai-icon-loading {
          animation: rotate 1s linear infinite; /* 旋转动画 */
        }
        span {
          font-size: 14px;
          margin-top: 8px;
          color: #4e97fb;
        }
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
    }
  }

  /* 添加旋转动画 */
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
  }
</style>
