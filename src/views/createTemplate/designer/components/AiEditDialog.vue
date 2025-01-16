<!-- ai帮写弹窗 -->
<template>
  <el-dialog
    :model-value="dialogAiVisible"
    :title="dialogTitle"
    width="800px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
  >
    <div class="ai-content-edit-page-select-warpper">
      <div class="ai-content ai-content-left">
        <template v-if="type === 'edit'">
          <h1 class="title">润色前：</h1>
        </template>
        <template v-else>
          <h1 class="title">请输入您的创作关键词</h1>
        </template>
        <div v-if="type === 'edit'" v-dompurify-html="content" class="content"></div>
        <el-input v-else v-model="aiPropmt" type="textarea" :placeholder="placeholder"> </el-input>
        <!-- 字数限定 -->
        <div class="text-number-box">
          <p>限定字数：</p>
          <el-input-number v-model="textNumber" :min="10" :max="2000" />
          <span class="text">字</span>
          <span class="tips">(最大不超过2000字)</span>
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
          <h1 class="title">润色前：</h1>
        </template>
        <template v-else>
          <h1 class="title">AI创作内容</h1>
        </template>
        <!-- <div
          v-loading="aiLoading"
          v-dompurify-html="aiEditContent"
          :element-loading-text="type === 'edit' ? 'AI拼命润色中~' : '拼命创作中'"
          class="content"
        ></div> -->
        <el-input
          v-model="aiEditContent"
          v-loading="aiLoading"
          type="textarea"
          :element-loading-text="type === 'edit' ? 'AI拼命润色中~' : '拼命创作中'"
          readonly
          placeholder="AI创作内容将展示在这里"
        >
        </el-input>
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
  import { aiInvokeAsync } from '@/http/api/ai';

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
      }
    }
  );

  // 取消
  const cancle = () => {
    emit('cancle');
  };

  // 创作关键词
  const placeholder = ref<string>('请输入关键词，如毕业于猫步简历大学、计算机专业、创作项目经历等');
  const aiPropmt = ref<string>('');

  // 点击开始润色
  const aiLoading = ref<boolean>(false);
  const aiEditContent = ref<string>('');
  const textNumber = ref<number>(100);
  const aiEdit = async () => {
    if (aiLoading.value) return;
    // 点击AI
    let params = {
      model: 'glm-4-flash',
      messages: props.content,
      number: textNumber.value,
      type: props.type
    };
    if (props.type === 'new') {
      params.messages = aiPropmt.value;
    }
    if (!params.messages) {
      ElMessage.warning('内容不能为空！');
      return;
    }
    aiLoading.value = true;
    const data = await aiInvokeAsync(params);
    if (data.data.status === 200) {
      aiEditContent.value = data.data.data[0].message.content;
    } else {
      ElMessage.warning('AI使用人数太多，请重试~~');
    }
    aiLoading.value = false;
    console.log(data);
  };

  // 提交
  const submit = () => {
    console.log('ai内容:', aiEditContent.value);
    emit('updateSuccess', aiEditContent.value);
    cancle();
  };
</script>
<style lang="scss">
  .ai-content-edit-page-select-warpper {
    display: flex;
    .ai-content {
      flex: 1;
      .title {
        font-size: 16px;
        margin-bottom: 10px;
      }
      .el-textarea {
        height: 400px;
        .el-textarea__inner {
          height: 100%;
          resize: none;
          text-align: justify;
          padding: 10px 15px;
        }
      }
      .content {
        height: 400px;
        border: 1px solid #ccc;
        border-radius: 4px;
        overflow: auto;
        padding: 10px 15px;
        box-sizing: border-box;
        line-height: 1.5;
        letter-spacing: 1px;
        text-align: justify;
        font-size: 12px;
      }
    }
    .ai-content-left {
      .text-number-box {
        display: flex;
        align-items: center;
        margin: 10px 0;
        font-size: 12px;
        letter-spacing: 1px;
        .text {
          margin-left: 10px;
          margin-right: 5px;
        }
        .tips {
          color: #ccc;
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
        font-size: 12px;
        margin-top: 8px;
        color: #4e97fb;
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
</style>
