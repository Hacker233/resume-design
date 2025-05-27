<template>
  <el-dialog
    :model-value="dialogGenerateVisible"
    title="AI智能生成简历"
    width="800px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
    @open="handleOpen"
  >
    <div class="ai-generate-dialog-content">
      <!-- 关键词填写 -->
      <key-words v-show="active === 0 && !isAiLoading" ref="keyWordsRef"></key-words>
      <!-- 模型选择 -->
      <ai-model-select
        v-show="active === 1 && !isAiLoading"
        ref="aiModelSelectRef"
      ></ai-model-select>
      <!-- AI生成中 -->
      <AiLoading v-show="active === 1 && isAiLoading" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button v-if="active === 1 && !isAiLoading" type="primary" @click="prevStep"
          >上一步</el-button
        >
        <el-button type="primary" :loading="isAiLoading" @click="nextStep">{{
          submitButtonName
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import KeyWords from '@/views/generateAiResume/components/KeyWords.vue';
  import AiModelSelect from '@/views/generateAiResume/components/AiModelSelect.vue';
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { cloneDeep } from 'lodash';
  import {
    extractResumeData,
    formatNumberWithCommas,
    restoreData,
    restoreDataId
  } from '@/utils/common';
  import { ElMessageBox, ElNotification } from 'element-plus';
  import jianBImage from '@/assets/images/jianB.png';
  import { cancelGenerateResumeStreamAsync, generateResumeStreamAsync } from '@/http/api/ai';
  import AiLoading from '@/components/AiLoading/AiLoading.vue';

  const emit = defineEmits(['cancle', 'updateSuccess']);

  interface TDialog {
    dialogGenerateVisible: boolean;
  }

  withDefaults(defineProps<TDialog>(), {
    dialogGenerateVisible: false
  });

  // 提交按钮名称
  const submitButtonName = ref('下一步');
  // 当前第几步
  const active = ref(0);

  // 表单数据
  const generateParams = ref({
    model: '',
    keyWords: '',
    template: null
  });

  // 取消
  const cancle = () => {
    if (streamController.value) {
      cancelGenerateResumeStreamAsync(streamController.value);
    }
    isAiLoading.value = false;
    fromAiGenerate.value = false;
    emit('cancle');
  };

  // 弹窗打开回调
  const isAiLoading = ref(false);
  const { HJNewJsonStore, fromAiGenerate } = storeToRefs(appStore.useCreateTemplateStore);
  const handleOpen = () => {
    active.value = 0;
    submitButtonName.value = '下一步';
    fromAiGenerate.value = true;
  };

  // 上一步
  const prevStep = () => {
    if (active.value === 0) {
      return;
    } else {
      isAiLoading.value = false;
      active.value--;
    }
  };

  // 点击下一步
  const keyWordsRef = ref<any>(null);
  const aiModelSelectRef = ref<any>(null);
  const nextStep = async () => {
    if (active.value === 0) {
      if (keyWordsRef.value) {
        keyWordsRef.value.ruleFormRef.validate((valid: any) => {
          if (valid) {
            generateParams.value.keyWords = keyWordsRef.value.ruleForm;
            active.value++;
            submitButtonName.value = '立即生成';
          } else {
            ElMessage.warning('有必填项未填哦');
            return;
          }
        });
      }
    } else if (active.value === 1) {
      generateParams.value.model = aiModelSelectRef.value.selectedModel;
      if (!generateParams.value.keyWords) {
        ElMessage.warning('请填写关键词');
        return;
      } else if (!HJNewJsonStore.value.componentsTree.length) {
        ElMessage.warning('简历内容不能为空');
        return;
      }
      // 如果选择了付费模型，弹出确认框
      if (generateParams.value.model) {
        try {
          await ElMessageBox.confirm(
            `<div style="display: flex; align-items: center;">本次操作将消耗 ${formatNumberWithCommas(
              aiModelSelectRef.value.payValue
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
      getResume();
    }
  };

  // 生成简历
  let str = ref('');
  const { getUserIntegralTotal } = appStore.useUserInfoStore;
  const streamController = ref<AbortController | null>(null); // 流式请求控制器
  const getResume = () => {
    isAiLoading.value = true;
    // 提取 dataSource 数据
    const dataSource = extractResumeData(cloneDeep(HJNewJsonStore.value));
    console.log('dataSource', JSON.stringify(dataSource));

    const params = {
      model: generateParams.value.model, // 使用的AI模型
      keywords: generateParams.value.keyWords,
      template: dataSource
    };
    str.value = '';

    const controller = generateResumeStreamAsync(
      params,
      handleStreamData,
      (error: any) => {
        ElMessage.error(error.message || 'AI智能简历生成失败');
        isAiLoading.value = false;
      },
      () => {
        const result = str.value.replace(/```json/g, '');
        const resule2 = result.replace(/```/g, '');
        console.log('转义结果', resule2);
        console.log('JSON.parse后的数据', JSON.parse(resule2));
        // 还原label
        const resetLabel = restoreData(JSON.parse(resule2));
        console.log('还原label后的数据', resetLabel);
        // 彻底还原数据
        const resetData = restoreDataId(cloneDeep(HJNewJsonStore.value), resetLabel);
        console.log('彻底还原后的数据', resetData);
        HJNewJsonStore.value = resetData;
        ElMessage.success('AI简历生成成功');
        emit('updateSuccess');
        isAiLoading.value = false;
        if (generateParams.value.model) {
          getUserIntegralTotal();
        }
      }
    );
    streamController.value = controller;
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
            str.value += content;
          }
        } catch (e) {
          ElNotification({ title: '提示', message: trimmedLine, type: 'error' });
          console.log(e);
          isAiLoading.value = false;
        }
      }
    });
  };
</script>

<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
<style lang="scss">
  .ai-generate-dialog-content {
    width: 100%;
    .ai-form-container {
      width: 100%;
      padding: 0;
    }
    .aimodel-select {
      width: 100%;
    }
  }
</style>
