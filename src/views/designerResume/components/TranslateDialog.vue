<!-- ai帮写弹窗 -->
<template>
  <el-dialog
    :model-value="dialogTranslateVisible"
    title="语种转换"
    width="480px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
    :before-close="handleClose"
    class="translate-dialog"
  >
    <div
      v-loading="aiLoading"
      class="ai-content-translate-select-warpper"
      element-loading-text="AI正在翻译..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.9)"
    >
      <div class="tips-container">
        <div class="tips-icon">
          <el-icon class="warning-icon"><Warning /></el-icon>
        </div>
        <p class="tips-text">
          此操作AI会将您的简历内容翻译为对应语种，无法确保完全正确，请最好留有数据备份！
        </p>
      </div>
      
      <div class="language-selector">
        <h3 class="selector-title">选择目标语种</h3>
        <el-select 
          v-model="language" 
          placeholder="请选择语种" 
          size="large" 
          style="width: 100%"
          class="language-select"
        >
          <el-option
            v-for="item in languageList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            class="language-option"
          />
        </el-select>
      </div>
      
      <div class="language-info">
        <div class="info-item" v-for="item in languageList" :key="item.value">
          <span class="info-label">{{ item.label }}</span>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button 
          size="large" 
          @click="cancle"
          class="cancel-button"
        >
          取消
        </el-button>
        <el-button 
          size="large" 
          type="primary" 
          :loading="aiLoading" 
          @click="submit"
          class="translate-button"
        >
          {{ aiLoading ? '翻译中...' : '开始翻译' }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import {
    translateTextAsync,
    cancleAiTranslateTextAsync,
    getSerialNumberAsync
  } from '@/http/api/ai';
  import appStore from '@/store';
  import { ElNotification, ElMessage, ElIcon } from 'element-plus';
  import { Warning } from '@element-plus/icons-vue';
  import { cloneDeep } from 'lodash';
  import { watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { extractValues, parseJSON, restoreValues } from '../../../utils/jsonUtils';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogTranslateVisible: boolean;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogTranslateVisible: false
  });

  // 关闭对话框处理函数
  const handleClose = () => {
    cancle();
  };

  watch(
    () => props.dialogTranslateVisible,
    async (newVal) => {
      if (newVal) {
        aiLoading.value = false;
        const { HJNewJsonStore } = appStore.useCreateTemplateStore;
        aiEditContent.value = HJNewJsonStore;
      }
    }
  );

  // 可选择语种
  const languageList = ref<any>([
    {
      label: '简体中文',
      value: '简体中文'
    },
    {
      label: '英语',
      value: '英语'
    },
    {
      label: '日语',
      value: '日语'
    },
    {
      label: '韩语',
      value: '韩语'
    }
  ]);

  // 取消
  const cancle = () => {
    cancleAiTranslateTextAsync();
    emit('cancle');
  };

  // 创作关键词
  const language = ref<string>('英语');

  // 点击开始润色
  const aiLoading = ref<boolean>(false);
  const aiEditContent = ref<any>('');
  const serialNumber = ref<string>('');
  const submit = async () => {
    // 先获取流水号
    const serialNumberResult = await getSerialNumberAsync();
    if (serialNumberResult.data.status == 200) {
      serialNumber.value = serialNumberResult.data.data;
    } else {
      ElMessage.error('流水号生成失败');
      return;
    }

    if (aiLoading.value) return;
    let message: any = {
      title: {}
    };
    aiEditContent.value.componentsTree.forEach((element: any, index: number) => {
      message[index] = cloneDeep(element.dataSource); // 简历内容
      message['title'][index] = {
        value: element.title
      };
    });
    console.log('需要翻译的内容', JSON.stringify(message));
    const extractValue = extractValues(message); // 提取value
    console.log('提取出的value', JSON.stringify(extractValue));
    // const restoreJsonValue = restoreValues(message, extractValue); // 将翻译结果还原为原数据
    // console.log('还原的数据', JSON.stringify(restoreJsonValue));
    // debugger;
    // 点击AI
    let params = {
      model: 'glm-4-flash',
      text: JSON.stringify(extractValue),
      languages: language.value,
      serialNumber: serialNumber.value
    };
    if (!params.languages) {
      ElMessage.warning('请先选择目标语种');
      return;
    }
    aiLoading.value = true;
    const data = await translateTextAsync(params);
    if (data.data.status === 200) {
      aiEditContent.value = data.data.data;
      try {
        const result = aiEditContent.value.replace(/```json/g, '');
        const resule2 = result.replace(/```/g, '');
        console.log('翻译结果', resule2);
        const restoreJsonValue = restoreValues(message, parseJSON(resule2)); // 将翻译结果还原为原数据
        console.log('还原的数据', restoreJsonValue);
        const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);
        for (let key in restoreJsonValue) {
          HJNewJsonStore.value.componentsTree.forEach((item: any, index: number) => {
            if (index === Number(key)) {
              HJNewJsonStore.value.componentsTree[index].dataSource = cloneDeep(
                restoreJsonValue[key]
              ); // 赋值内容
              HJNewJsonStore.value.componentsTree[index].title =
                restoreJsonValue['title'][key].value; // 模块标题
            }
          });
        }
        ElMessage.success('语种切换成功~~');
        cancle();
      } catch (error) {
        ElNotification({
          title: '翻译失败',
          message: '解析结果失败，内容过多，请尝试按模块翻译',
          type: 'error'
        });
        cancle();
      }
    } else {
      ElMessage.warning(data.data.message || 'AI使用人数太多，请重试~~');
      cancleAiTranslateTextAsync();
    }
    aiLoading.value = false;
    console.log(data);
  };
</script>
<style lang="scss" scoped>
  .translate-dialog {
    .el-dialog__header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 24px;
      border-radius: 8px 8px 0 0;
      
      .el-dialog__title {
        color: white;
        font-size: 18px;
        font-weight: 600;
      }
    }
    
    .el-dialog__body {
      padding: 30px 24px;
    }
    
    .el-dialog__footer {
      padding: 0 24px 24px;
    }
  }
  
  .ai-content-translate-select-warpper {
    padding: 10px 0;
  }
  
  .tips-container {
    display: flex;
    align-items: flex-start;
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 24px;
    animation: fadeIn 0.3s ease-in-out;
    
    .tips-icon {
      margin-right: 12px;
      padding-top: 2px;
      
      .warning-icon {
        font-size: 20px;
        color: #ffc107;
      }
    }
    
    .tips-text {
      flex: 1;
      font-size: 14px;
      line-height: 1.5;
      color: #6c757d;
      margin: 0;
    }
  }
  
  .language-selector {
    margin-bottom: 24px;
    
    .selector-title {
      font-size: 16px;
      font-weight: 600;
      color: #343a40;
      margin-bottom: 12px;
    }
    
    .language-select {
      border-radius: 8px;
      border: 2px solid #e9ecef;
      transition: all 0.3s ease;
      
      &:hover {
        border-color: #667eea;
      }
      
      .el-select__input {
        font-size: 15px;
      }
    }
    
    .language-option {
      font-size: 14px;
      padding: 10px 15px;
      
      &:hover {
        background-color: #f8f9fa;
      }
    }
  }
  
  .language-info {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 16px;
    
    .info-item {
      background-color: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 16px;
      padding: 6px 12px;
      font-size: 12px;
      color: #6c757d;
      transition: all 0.2s ease;
      
      &:hover {
        background-color: #e9ecef;
        transform: translateY(-2px);
      }
    }
  }
  
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding-top: 16px;
    border-top: 1px solid #e9ecef;
    
    .cancel-button {
      border-radius: 8px;
      padding: 10px 24px;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: #f8f9fa;
      }
    }
    
    .translate-button {
      border-radius: 8px;
      padding: 10px 32px;
      font-size: 14px;
      font-weight: 600;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      }
      
      &:active {
        transform: translateY(0);
      }
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
