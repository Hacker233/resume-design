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
        <el-step title="第一步" description="填写简历关键信息">
          <template #icon>
            <div class="step-icon">
              <div class="progress-bar"></div>
              <span class="step-number">1</span>
            </div>
          </template>
        </el-step>
        <el-step v-if="!templateId" :title="templateId ? '' : '第二步'" description="选择生成方式">
          <template #icon>
            <div class="step-icon">
              <div class="progress-bar"></div>
              <span class="step-number">2</span>
            </div>
          </template>
        </el-step>
        <el-step :title="templateId ? '第二步' : '第三步'" description="AI智能生成简历">
          <template #icon>
            <div class="step-icon">
              <div class="progress-bar"></div>
              <span class="step-number">{{ lastActive + 1 }}</span>
            </div>
          </template>
        </el-step>
      </el-steps>
      <!-- 步骤具体内容 -->
      <div class="steps-components-box">
        <!-- 关键词填写区域 -->
        <key-words v-show="active === 0" ref="keyWordsRef"></key-words>
        <template v-if="!templateId">
          <!-- 模版选择区域 -->
          <ai-template-select v-if="active === 1" ref="aiTemplateSelectRef"></ai-template-select>
        </template>
        <!-- AI 简历生成区域 -->
        <ai-model-select
          v-if="active === lastActive && !isAiLoading && !generateResumeSuccess"
          ref="aiModelSelectRef"
        ></ai-model-select>
        <AiLoading v-if="active === lastActive && isAiLoading && !mdResume" />
        <!-- 生成的简历预览 -->
        <div
          v-if="active === lastActive && !isAiLoading && generateResumeSuccess && !mdResume"
          class="resume-preview-container"
        >
          <ResumePreview />
          <div class="preview-overlay">
            <!-- 毛玻璃遮罩层 -->
            <div class="frosted-glass"></div>
            <h3 class="cyber-title">全部内容查看请前往编辑页面</h3>
          </div>
        </div>
        <!-- Markdown简历生成结果 -->
        <transition v-if="mdResume" name="fade">
          <el-card class="detailed-report" shadow="hover">
            <!-- 等待效果 -->
            <div v-if="isAiLoading" class="report-loading">
              <el-skeleton :rows="6" animated />
              <div class="loading-tip">
                <el-icon class="is-loading"><Loading /></el-icon>
                正在生成Markdown简历，请稍候...
              </div>
            </div>

            <!-- 诊断内容滚动区域 -->
            <div
              ref="reportContentRef"
              v-dompurify-html="renderedContent"
              class="ai-optimize-content markdown-body scrollable-content"
            ></div>
          </el-card>
        </transition>
      </div>
      <template v-if="!generateResumeSuccess">
        <!-- 下一步 -->
        <template v-if="!isAiLoading">
          <div class="next-step-box">
            <div v-if="active !== 0" class="next-step">
              <el-button class="custom-button" @click="prevStep">上一步</el-button>
            </div>
            <div v-if="active !== lastActive" class="next-step">
              <el-button class="custom-button" @click="nextStep">下一步</el-button>
            </div>
            <div v-else class="next-step">
              <el-button class="custom-button" @click="generateResume">立即生成简历</el-button>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="next-step-box">
            <div class="next-step">
              <el-button class="custom-button" @click="cancleGenerateResume">取消生成</el-button>
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="next-step-box">
          <div v-if="active !== 0" class="next-step">
            <el-button class="custom-button" @click="prevStep">上一步</el-button>
          </div>
          <div class="next-step">
            <el-button v-if="!mdResume" class="custom-button" :loading="isEditing" @click="goEdit">
              {{ isEditing ? '处理中...' : '前往编辑' }}
            </el-button>
            <el-button
              v-else
              class="custom-button"
              :loading="mdResumeLoading"
              @click="downloadReport"
            >
              {{ mdResumeLoading ? '正在生成中...' : '立即下载' }}
            </el-button>
          </div>
        </div>
      </template>
    </div>
  </div>

  <!-- 选择简历模版，或者直接生成Markdown -->
  <select-way-dialog
    :dialog-select-way-visible="dialogSelectWayVisible"
    @cancle="handleWayCancle"
    @update-success="handleWayUpdateSuccess"
  ></select-way-dialog>
  <footer-com />
</template>

<script lang="ts" setup>
  import KeyWords from './components/KeyWords.vue';
  import AiTemplateSelect from './components/AiTemplateSelect.vue';
  import { getTemplateByIdAsync, getUsertemplateAsync } from '@/http/api/createTemplate';
  import AiModelSelect from './components/AiModelSelect.vue';
  import SelectWayDialog from './components/SelectWayDialog.vue';
  import {
    extractResumeData,
    formatNumberWithCommas,
    restoreData,
    restoreDataId
  } from '@/utils/common';
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import {
    aiFailAsync,
    cancelGenerateResumeStreamAsync,
    generateMarkdownResumeStreamAsync,
    generateResumeStreamAsync,
    getSerialNumberAsync
  } from '@/http/api/ai';
  import { cloneDeep } from 'lodash';
  import AiLoading from './components/AiLoading.vue';
  import ResumePreview from './components/ResumePreview.vue';
  import { ElNotification, ElMessage, ElMessageBox } from 'element-plus';
  import jianBImage from '@/assets/images/jianB.png';
  import LoginDialog from '@/components/LoginDialog/LoginDialog';
  import FooterCom from '@/components/FooterCom/FooterCom.vue';
  import { Loading } from '@element-plus/icons-vue';
  import MarkdownIt from 'markdown-it';

  const active = ref(0);
  const isEditing = ref(false); // 是否正在处理编辑
  const { userInfo } = storeToRefs(appStore.useUserInfoStore);

  const generateParams = ref({
    model: '',
    keyWords: '',
    template: null
  });

  // 下一步
  const keyWordsRef = ref<any>(null);
  const aiModelSelectRef = ref<any>(null);
  const aiTemplateSelectRef = ref<any>(null);
  const selectTemplateId = ref(''); // 选中的模版id
  const dialogSelectWayVisible = ref(false); // 选择生成方式弹窗

  const nextStep = () => {
    // 判断是否登录
    const { token } = appStore.useTokenStore;
    if (!token) {
      LoginDialog(true);
      return;
    }
    if (active.value === 0) {
      if (keyWordsRef.value) {
        keyWordsRef.value.ruleFormRef.validate((valid: any) => {
          if (valid) {
            generateParams.value.keyWords = keyWordsRef.value.ruleForm;
            // 弹出弹窗：模版生成、直接生成Markdown
            if (!templateId) {
              dialogSelectWayVisible.value = true;
            } else {
              active.value++;
            }
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
      selectTemplateId.value = aiTemplateSelectRef.value.selectTemplateId;
      // 查询简历模版JSON
      getTemplateData();
    }
  };

  // Markdown 渲染
  const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  });
  const renderedContent = computed(() => {
    // 去除开头和结尾的 ```markdown 或 ```
    const cleanedStr = str.value.replace(/^```markdown|```$/gm, '');
    return md.render(cleanedStr);
  });

  // 选择生成方式弹窗取消
  const handleWayCancle = () => {
    dialogSelectWayVisible.value = false;
  };

  // 选择生成方式弹窗更新成功
  const selectedOption = ref('template');
  const handleWayUpdateSuccess = (value: string) => {
    selectedOption.value = value;
    if (selectedOption.value === 'template') {
      dialogSelectWayVisible.value = false;
      active.value++;
    } else if (selectedOption.value === 'markdown') {
      dialogSelectWayVisible.value = false;
      active.value = 2;
    }
  };

  // 下载Markdown简历
  const downloadReport = () => {
    const blob = new Blob([str.value], { type: 'text/markdown;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `简历_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 查询模版数据
  const getTemplateData = async () => {
    const data = await getTemplateByIdAsync(selectTemplateId.value);
    if (data.status === 200) {
      generateParams.value.template = data.data.template_json;
    } else {
      generateParams.value.template = null;
      ElMessage.warning('未查询到该模版');
    }
  };

  // 判断是否带有模版ID
  const route = useRoute();
  const templateId = route.query.templateId as string;
  const lastActive = ref(2); // 最后一步的active
  if (templateId) {
    selectTemplateId.value = templateId;
    lastActive.value = 1;
    getTemplateData();
  }

  // 上一步
  const prevStep = () => {
    // 如果是生成MD简历, 直接回到第一步
    if (mdResume.value || selectedOption.value === 'markdown') {
      mdResume.value = false;
      isAiLoading.value = false;
      mdResumeLoading.value = false;
      generateResumeSuccess.value = false;
      active.value = 0;
      selectedOption.value = 'template';
      // 取消流式传输
      if (streamController.value) {
        cancelGenerateResumeStreamAsync(streamController.value);
      }
    }
    if (active.value === 0) {
      return;
    } else {
      isAiLoading.value = false;
      generateResumeSuccess.value = false;
      active.value--;
    }
  };

  // 判断是否是会员
  const { membershipInfo } = storeToRefs(appStore.useMembershipStore);
  const isMember = computed(() => {
    if (
      membershipInfo.value.hasMembership &&
      membershipInfo.value.daysRemaining > 0 &&
      !membershipInfo.value.isExpired
    ) {
      return true;
    } else {
      return false;
    }
  });

  // 生成简历
  const isAiLoading = ref(false); // AI是否正在返回
  const modelObj = ref<any>(null);
  const generateResumeSuccess = ref(false); // 生成简历是否成功
  const { getUserIntegralTotal } = appStore.useUserInfoStore;
  const { userIntegralInfo } = storeToRefs(appStore.useUserInfoStore);
  const { HJNewJsonStore, fromAiGenerate } = storeToRefs(appStore.useCreateTemplateStore);
  const mdResume = ref(false); // 是否生成的是md简历
  const mdResumeLoading = ref(false); // md简历是否正在生成
  const generateResume = async () => {
    console.log(generateParams.value);
    generateParams.value.model = aiModelSelectRef.value.selectedModel;
    modelObj.value = aiModelSelectRef.value.aiModelObj;
    // 没有选择模型
    if (!generateParams.value.model) {
      ElMessage.warning('请先选择AI模型');
      return;
    }
    // 模版关键词校验
    if (!generateParams.value.keyWords) {
      ElMessage.warning('请填写关键词');
      return;
    } else if (!generateParams.value.template && selectedOption.value === 'template') {
      ElMessage.warning('请选择模版');
      return;
    }

    // 如果不会全站免费用户
    if (!userInfo.value.isAllFree) {
      // 不是会员，选择了付费模型
      if (!isMember.value && !modelObj.value.model_is_free) {
        // 判断简币数量
        if (userIntegralInfo.value.integralTotal < Math.abs(aiModelSelectRef.value.payValue)) {
          ElMessage.warning('简币不足');
          return;
        }
      }
      // 如果选择了付费模型，弹出确认框
      if (!modelObj.value.model_is_free) {
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
  const serialNumber = ref('');
  const getResume = async () => {
    // 先获取流水号
    const serialNumberResult = await getSerialNumberAsync();
    if (serialNumberResult.data.status == 200) {
      serialNumber.value = serialNumberResult.data.data;
    } else {
      ElMessage.error('流水号生成失败');
      return;
    }

    isAiLoading.value = true;
    generateResumeSuccess.value = false;

    const params = {
      model: generateParams.value.model, // 使用的AI模型
      keywords: generateParams.value.keyWords,
      template: '',
      serialNumber: serialNumber.value
    };
    str.value = '';

    // 基于模版生成简历
    if (selectedOption.value === 'template') {
      // 提取 dataSource 数据
      const dataSource = extractResumeData(cloneDeep(HJNewJsonStore.value));
      console.log('dataSource', JSON.stringify(dataSource));
      params.template = dataSource;
      const controller = generateResumeStreamAsync(
        params,
        handleStreamData,
        (error: any) => {
          ElMessage.error(error.message || 'AI智能简历生成失败');
          isAiLoading.value = false;
          aiFailAsync({
            serialNumber: serialNumber.value,
            error: error.message || 'AI智能简历生成失败'
          });
        },
        () => {
          try {
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
            isAiLoading.value = false;
            generateResumeSuccess.value = true;
            if (!modelObj.value.model_is_free) {
              getUserIntegralTotal();
            }
          } catch (e) {
            console.log('JSON 转换失败');
            isAiLoading.value = false;
            ElNotification.error({
              title: '错误',
              message: '简历结果已返回，但JSON处理失败'
            });
            aiFailAsync({
              serialNumber: serialNumber.value,
              errorMsg: 'JSON返回，但处理失败'
            });
          }
        }
      );
      streamController.value = controller;
    } else {
      mdResume.value = true;
      mdResumeLoading.value = true;
      // 直接生成Markdown
      const controller = generateMarkdownResumeStreamAsync(
        params,
        handleMDStreamData,
        (error: any) => {
          ElMessage.error(error.message || 'AI智能Markdown简历生成失败');
          isAiLoading.value = false;
          aiFailAsync({
            serialNumber: serialNumber.value,
            error: error.message || 'AI智能Markdown简历生成失败'
          });
        },
        () => {
          try {
            console.log('Markdown 转换成功', str.value);
            isAiLoading.value = false;
            mdResumeLoading.value = false;
            generateResumeSuccess.value = true;
            if (!modelObj.value.model_is_free) {
              getUserIntegralTotal();
            }
          } catch (e) {
            console.log('Markdown 转换失败', e);
            isAiLoading.value = false;
            mdResumeLoading.value = false;
            ElNotification.error({
              title: '错误',
              message: '简历结果已返回，但Markdown处理失败'
            });
            aiFailAsync({
              serialNumber: serialNumber.value,
              errorMsg: 'Markdown返回，但处理失败'
            });
          }
        }
      );
      streamController.value = controller;
    }
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
          aiFailAsync({
            serialNumber: serialNumber.value,
            errorMsg: '处理流式数据出现错误'
          });
        }
      }
    });
  };

  // 处理markdown简历流式数据
  const handleMDStreamData = (chunk: string) => {
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
            isAiLoading.value = false;
            generateResumeSuccess.value = true;
          }
        } catch (e) {
          ElNotification({ title: '提示', message: trimmedLine, type: 'error' });
          isAiLoading.value = false;
          mdResumeLoading.value = false;
          generateResumeSuccess.value = false;
          aiFailAsync({
            serialNumber: serialNumber.value,
            errorMsg: '处理Markdown流式数据出现错误'
          });
        }
      }
    });
  };

  // 前往编辑
  const router = useRouter();
  const goEdit = async () => {
    if (!generateResumeSuccess.value || !selectTemplateId.value) {
      ElMessage.warning('请先生成简历哦');
      return;
    }

    isEditing.value = true;
    try {
      // 查询用户是否使用过该模版创建过简历
      const { data } = await getUsertemplateAsync(selectTemplateId.value);
      if (data.status === 200) {
        // 使用ElMessageBox代替ElMessage.warning
        try {
          await ElMessageBox.confirm(
            '检测到您已经使用过该模板创建过简历，此操作将覆盖原有数据，请谨慎操作？',
            '提示',
            {
              confirmButtonText: '继续编辑',
              cancelButtonText: '取消',
              type: 'warning'
            }
          );
          fromAiGenerate.value = true;
          router.push({
            path: `/designResume/${selectTemplateId.value}`
          });
        } catch (error) {
          // 用户点击了"取消"或关闭了对话框
          console.log('用户取消了编辑操作');
          return;
        }
      } else {
        fromAiGenerate.value = true;
        router.push({
          path: `/designResume/${selectTemplateId.value}`
        });
      }
    } catch (error) {
      ElMessage.error('处理编辑请求时出错');
    } finally {
      isEditing.value = false;
    }
  };
</script>
<style src="../../style/markdown.css"></style>
<style lang="scss" scoped>
  .generate-ai-resume-box {
    width: 100vw;
    min-height: calc(100vh - 65px);
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

        &:first-child {
          margin: 0 10px;
        }

        &:last-child {
          margin: 0 10px;
        }

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }

  // 自定义按钮样式
  .custom-button {
    background: linear-gradient(138deg, #3b2af9, #562cf7 22%, #dd34ee 89%, #f5e17d) !important;
    border-radius: 99px !important;
    box-shadow: 0 0 4px 1px #9569c066 !important;
    color: #fff !important;
    font-size: 18px !important;
    height: 100% !important;
    width: 100% !important;
    letter-spacing: 2px !important;
    border: none !important;
    padding: 0 !important;
    transition: all 0.3s ease !important;

    &.is-loading {
      opacity: 0.7;
    }
  }

  .resume-preview-container {
    position: relative;
    width: 820px;
  }

  .preview-overlay {
    height: 60px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .frosted-glass {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(218, 232, 254, 0.6);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      z-index: 10;
    }

    .cyber-title {
      font-family: 'Orbitron', sans-serif;
      color: #5a4ff3;
      text-shadow: 0 0 10px rgba(90, 79, 243, 0.3), 0 0 20px rgba(90, 79, 243, 0.2);
      margin-bottom: 16px;
      font-size: 18px;
      letter-spacing: 1px;
      background: linear-gradient(90deg, #5a4ff3, #00d2ff);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: textGlow 2s infinite alternate;
      margin: 0;
      padding: 0;
      z-index: 11;
    }
  }

  /* 报告卡片 */
  .detailed-report {
    margin-top: 22px;
    min-width: 820px;
    max-width: 1200px;

    :deep(.el-card__body) {
      padding: 20px;
    }

    h3 {
      font-size: 1.2rem;
      margin-bottom: 30px;
      color: #333;
    }
    .report-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;

      h3 {
        font-size: 1.2rem;
        color: #333;
        margin: 0;
      }

      .download-btn {
        font-size: 0.85rem;
        padding: 6px 12px;
        height: auto;
        background-color: #4096ff;
        border-color: #4096ff;

        &:hover {
          background-color: #337ecc;
          border-color: #337ecc;
        }
      }
    }

    .report-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      .loading-tip {
        margin-top: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
        color: #888;
        font-size: 0.95rem;
      }
    }
  }

  /* 过渡 */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  /* 响应式 */
  @media (max-width: 768px) {
    .page-header .title {
      font-size: 1.9rem;
    }
    .action-buttons {
      flex-direction: column;
    }
    .upload-btn,
    .diagnose-btn {
      width: 100%;
    }
    .report-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
  }
  .scrollable-content {
    padding: 20px;
    border: 1px solid #ebeef5;
    border-radius: 6px;
    background-color: #fff;
  }

  .scroll-to-bottom-btn {
    position: fixed;
    bottom: 80px; /* 距离底部，可调整 */
    right: 40px; /* 距离右侧 */
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
</style>
