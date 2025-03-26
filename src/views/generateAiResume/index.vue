<template>
  <div class="generate-ai-resume-box">
    <div class="genetate-content-box">
      <!-- 步骤条 -->
      <el-steps
        :active="active"
        align-center
        class="custom-steps-horizontal"
        finish-status="success"
      >
        <el-step title="第一步" description="关键词填写">
          <template #icon>
            <div class="step-icon">
              <div class="progress-bar"></div>
              <span class="step-number">1</span>
            </div>
          </template>
        </el-step>
        <el-step title="第二步" description="简历模版选择">
          <template #icon>
            <div class="step-icon">
              <div class="progress-bar"></div>
              <span class="step-number">2</span>
            </div>
          </template>
        </el-step>
        <el-step title="第三步" description="AI智能生成简历">
          <template #icon>
            <div class="step-icon">
              <div class="progress-bar"></div>
              <span class="step-number">3</span>
            </div>
          </template>
        </el-step>
      </el-steps>
      <!-- 步骤具体内容 -->
      <div class="steps-components-box">
        <!-- 关键词填写区域 -->
        <key-words v-show="active === 0" ref="keyWordsRef"></key-words>
        <!-- 模版选择区域 -->
        <ai-template-select v-if="active === 1" ref="aiTemplateSelectRef"></ai-template-select>
        <!-- AI 简历生成区域 -->
        <ai-model-select
          v-if="active === 2 && !isAiLoading && !generateResumeSuccess"
          ref="aiModelSelectRef"
        ></ai-model-select>
        <AiLoading v-if="active === 2 && isAiLoading" />
        <!-- 生成的简历预览 -->
        <ResumePreview v-show="active === 2 && !isAiLoading && generateResumeSuccess" />
      </div>
      <template v-if="!generateResumeSuccess">
        <!-- 下一步 -->
        <template v-if="!isAiLoading">
          <div class="next-step-box">
            <div v-if="active !== 0" class="next-step" @click="prevStep">
              <button>上一步</button>
            </div>
            <div v-if="active !== 2" class="next-step" @click="nextStep">
              <button>下一步</button>
            </div>
            <div v-else class="next-step" @click="generateResume">
              <button>立即生成简历</button>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="next-step-box">
            <div class="next-step" @click="cancleGenerateResume">
              <button>取消生成</button>
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="next-step-box">
          <div v-if="active !== 0" class="next-step" @click="prevStep">
            <button>上一步</button>
          </div>
          <div class="next-step" @click="cancleGenerateResume">
            <button>前往编辑</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import KeyWords from './components/KeyWords.vue';
  import AiTemplateSelect from './components/AiTemplateSelect.vue';
  import { getTemplateByIdAsync } from '@/http/api/createTemplate';
  import AiModelSelect from './components/AiModelSelect.vue';
  import { extractResumeData, restoreData, restoreDataId } from '@/utils/common';
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { cancelGenerateResumeStreamAsync, generateResumeStreamAsync } from '@/http/api/ai';
  import { cloneDeep } from 'lodash';
  import AiLoading from './components/AiLoading.vue';
  import ResumePreview from './components/ResumePreview.vue';
  import { ElNotification } from 'element-plus';

  const active = ref(0);

  const generateParams = ref({
    keyWords: '',
    template: null
  });

  // 下一步
  const keyWordsRef = ref<any>(null);
  const aiModelSelectRef = ref<any>(null);
  const aiTemplateSelectRef = ref<any>(null);
  const nextStep = () => {
    if (active.value === 0) {
      if (keyWordsRef.value) {
        keyWordsRef.value.ruleFormRef.validate((valid: any) => {
          if (valid) {
            generateParams.value.keyWords = keyWordsRef.value.ruleForm;
            active.value++;
          } else {
            ElMessage.warning('有必填项未填哦');
            return;
          }
        });
      }
      console.log('keyWordsRef', keyWordsRef.value.ruleForm);
    } else if (active.value === 1) {
      // 判断是否选中模版
      if (!aiTemplateSelectRef.value.selectTemplateId) {
        ElMessage.warning('请选择模版哦');
        return;
      }
      active.value++;
      // 查询简历模版JSON
      getTemplateData();
    }
  };

  // 查询模版数据
  const getTemplateData = async () => {
    const data = await getTemplateByIdAsync(aiTemplateSelectRef.value.selectTemplateId);
    if (data.status === 200) {
      generateParams.value.template = data.data.template_json;
    } else {
      generateParams.value.template = null;
      ElMessage.warning('未查询到该模版');
    }
  };

  // 上一步
  const prevStep = () => {
    if (active.value === 0) {
      return;
    } else {
      isAiLoading.value = false;
      generateResumeSuccess.value = false;
      active.value--;
    }
  };

  // 生成简历
  const isAiLoading = ref(false); // AI是否正在返回
  const generateResumeSuccess = ref(false); // 生成简历是否成功
  const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);
  const generateResume = () => {
    console.log(generateParams.value);
    if (!generateParams.value.keyWords) {
      ElMessage.warning('请填写关键词');
      return;
    } else if (!generateParams.value.template) {
      ElMessage.warning('请选择模版');
      return;
    }
    HJNewJsonStore.value = generateParams.value.template;
    getResume();
  };
  // 取消生成简历
  const cancleGenerateResume = () => {
    if (streamController.value) {
      cancelGenerateResumeStreamAsync(streamController.value);
    }
    isAiLoading.value = false;
  };

  // 生成简历
  let str = ref('');
  const streamController = ref<AbortController | null>(null); // 流式请求控制器
  const getResume = () => {
    isAiLoading.value = true;
    generateResumeSuccess.value = false;
    // 提取 dataSource 数据
    const dataSource = extractResumeData(cloneDeep(HJNewJsonStore.value));
    console.log('dataSource', JSON.stringify(dataSource));

    const params = {
      model: '', // 使用的AI模型
      keywords: generateParams.value.keyWords,
      template: dataSource
    };
    str.value = '';

    const controller = generateResumeStreamAsync(
      params,
      handleStreamData,
      (error: any) => {
        ElMessage.error(error.message || 'AI诊断失败');
        console.log('AI诊断失败', error);
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
        const resetData = restoreDataId(HJNewJsonStore.value, resetLabel);
        console.log('彻底还原后的数据', resetData);
        HJNewJsonStore.value = resetData;
        ElMessage.success('AI简历生成成功');
        isAiLoading.value = false;
        generateResumeSuccess.value = true;
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
          isAiLoading.value = false;
          generateResumeSuccess.value = false;
        }
      }
    });
  };
</script>

<style lang="scss" scoped>
  .generate-ai-resume-box {
    width: 100vw;
    height: calc(100vh - 65px);
    overflow: auto;
    position: fixed;
    background: linear-gradient(180deg, #efe5fd 0%, #fbf9fe 100%);
    display: flex;
    align-items: flex-start;
    justify-content: center;

    .genetate-content-box {
      width: 80%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 40px;

      .custom-steps-horizontal {
        width: 80%;
        max-width: 1400px;
        padding: 40px 0;
        background: rgba(255, 255, 255, 0.95);
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(143, 102, 214, 0.15);
        backdrop-filter: blur(8px);
        :deep(.el-step__head) {
          &.is-process,
          &.is-success {
            .step-icon {
              border-color: #8e6cf7;

              .step-number {
                color: #fff;
              }

              .progress-bar {
                width: 100%;
                background: #8e6cf7;
              }
            }
          }

          &.is-wait {
            .step-icon {
              border-color: #e0d6ff;

              .progress-bar {
                background: #e0d6ff;
              }
            }
          }
        }

        :deep(.el-step__title) {
          font-size: 18px;
          color: #2d264b;
          font-weight: 600;
          margin-top: 12px;
        }

        :deep(.el-step__description) {
          font-size: 14px;
          color: #6c6a8a;
          display: flex;
          margin: 8px auto 0;
          justify-content: center;
        }

        :deep(.el-step__line) {
          top: 16px;
          background: linear-gradient(to right, #e0d6ff 50%, #8e6cf7);
        }
      }

      .step-icon {
        width: 56px;
        height: 56px;
        border: 2px solid;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        background: white;
        transition: all 0.3s ease;
        flex-shrink: 0;

        .step-number {
          font-size: 20px;
          font-weight: 700;
          position: relative;
          z-index: 2;
          transition: color 0.3s ease;
        }

        .progress-bar {
          position: absolute;
          width: 0%;
          height: 56px;
          border-radius: 28px;
          background: #e0d6ff;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
      }
    }
    .steps-components-box {
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 40px;
    }
    .next-step-box {
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 40px 0;
      .next-step {
        background: #fff0f9;
        border-radius: 99px;
        box-shadow: 0 3px 24px 1px #aba9ad66;
        cursor: pointer;
        height: 60px;
        overflow: hidden;
        padding: 8px;
        width: 280px;
        transition: all 0.3s ease;
        &:hover {
          opacity: 0.7;
        }
        &:first-child {
          margin: 0 10px;
        }
        &:last-child {
          margin: 0 10px;
        }
        button {
          background: linear-gradient(138deg, #3b2af9, #562cf7 22%, #dd34ee 89%, #f5e17d);
          border-radius: 99px;
          box-shadow: 0 0 4px 1px #9569c066;
          color: #fff;
          font-size: 18px;
          height: 100%;
          width: 100%;
          cursor: pointer;
          border: none;
          letter-spacing: 2px;
        }
      }
    }
  }
</style>
