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
      <!-- 新增模型选择器 -->
      <div class="model-selector">
        <el-select v-model="selectedModel" placeholder="请选择模型" size="normal">
          <el-option label="默认模型 (glm-4-flash)" value="" />
          <el-option
            v-for="model in freeModels"
            :key="model.model_name"
            :label="model.model_description"
            :value="model.model_name"
          />
        </el-select>
        <p class="model-tips">默认模型为 glm-4-flash，您也可以选择其他免费模型。</p>
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
          <el-input v-else v-model="aiPropmt" type="textarea" :placeholder="placeholder">
          </el-input>
          <!-- 字数限定 -->
          <div class="text-number-box">
            <p>限定字数：</p>
            <el-input-number v-model="textNumber" :min="10" :max="2000" />
            <span class="tips">(不超过2000字)</span>
          </div>
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
            v-loading="aiLoading"
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
</template>

<script lang="ts" setup>
  import { createTextAsync, polishTextAsync, aiModelListAsync } from '@/http/api/ai';
  import { ElMessage } from 'element-plus';
  import { ref, watch, computed } from 'vue';

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
  const textNumber = ref<number>(100);
  const selectedModel = ref<string>(''); // 选中的模型
  const freeModels = ref<any[]>([]); // 免费模型列表

  // 默认模型
  const defaultModel = computed(() => (selectedModel.value ? selectedModel.value : ''));

  // 获取模型列表
  const getAiModelList = async () => {
    try {
      const params = {
        page: 1,
        limit: 100
      };
      const response = await aiModelListAsync(params);
      if (response.data.status === 200) {
        const list = response.data.data.list;
        freeModels.value = list.filter((model: any) => model.model_is_free); // 免费模型列表
      } else {
        ElMessage.error(response.data.message);
      }
    } catch (error) {
      ElMessage.error('获取模型列表失败');
    }
  };

  // 弹窗打开
  const handleOpen = () => {
    getAiModelList();
  };

  watch(
    () => props.dialogAiVisible,
    async (newVal) => {
      if (newVal) {
        if (props.type === 'edit') {
          dialogTitle.value = `简历润色优化 - ${props.module.title}`;
        } else {
          dialogTitle.value = `AI简历内容代写 - ${props.module.title}`;
        }
        currentModule.value = props.module;
        aiLoading.value = false;
        aiEditContent.value = '';
        selectedModel.value = ''; // 重置选中的模型
      }
    }
  );

  // 取消
  const cancle = () => {
    emit('cancle');
  };

  // 点击开始润色或创作
  const aiEdit = async () => {
    if (aiLoading.value) return;
    aiLoading.value = true;

    let params = {
      model: defaultModel.value,
      text: props.type === 'edit' ? props.content : aiPropmt.value,
      number: textNumber.value,
      moduleTitle: props.module.title
    };

    try {
      const data =
        props.type === 'edit' ? await polishTextAsync(params) : await createTextAsync(params);
      if (data.data.status === 200) {
        aiEditContent.value = data.data.data;
      } else {
        ElMessage.warning('AI使用人数太多，请重试~~');
      }
    } catch (error) {
      ElMessage.error('操作失败，请重试');
    } finally {
      aiLoading.value = false;
    }
  };

  // 提交
  const submit = () => {
    console.log('ai内容:', aiEditContent.value);
    emit('updateSuccess', aiEditContent.value);
    cancle();
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
    .model-selector {
      width: 43%;
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
          font-size: 13px;
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
