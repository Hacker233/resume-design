<!-- ai帮写弹窗 -->
<template>
  <el-dialog
    :model-value="dialogTranslateVisible"
    title="请选择需要转换成的语种"
    width="420px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
  >
    <div
      v-loading="aiLoading"
      class="ai-content-translate-select-warpper"
      element-loading-text="AI拼命翻译中~"
    >
      <p class="tips"
        ><b>注意：</b
        >此操作AI会将您的简历内容翻译为对应语种，无法确保完全正确，请你最好留有数据备份！</p
      >
      <el-form size="normal">
        <el-form-item label="选择目标语种:">
          <el-select v-model="language" placeholder="请选择语种" size="default" style="width: 100%">
            <el-option
              v-for="item in languageList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="normal" @click="cancle">取消</el-button>
        <el-button size="normal" type="primary" :loading="aiLoading" @click="submit">{{
          aiLoading ? '翻译中' : '开始翻译'
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { aiInvokeAsync, cancleAiInvokeAsync } from '@/http/api/ai';
  import appStore from '@/store';
  import { ElNotification } from 'element-plus';
  import { cloneDeep } from 'lodash';
  import { storeToRefs } from 'pinia';
  import { extractValues, parseJSON, restoreJsonData } from '../../../utils/jsonUtils';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogTranslateVisible: boolean;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogTranslateVisible: false
  });

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
    cancleAiInvokeAsync();
    emit('cancle');
  };

  // 创作关键词
  const language = ref<string>('英语');

  // 点击开始润色
  const aiLoading = ref<boolean>(false);
  const aiEditContent = ref<any>('');
  const submit = async () => {
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
    // const restoreJsonValue = restoreJsonData(extractValue, message); // 将翻译结果还原为原数据
    // console.log('还原的数据', restoreJsonValue);
    // 点击AI
    let params = {
      model: 'glm-4-flash',
      messages: JSON.stringify(extractValue),
      number: 0,
      type: 'translate',
      languages: language.value
    };
    if (!params.languages) {
      ElMessage.warning('请先选择目标语种');
      return;
    }
    aiLoading.value = true;
    const data = await aiInvokeAsync(params);
    if (data.data.status === 200) {
      aiEditContent.value = data.data.data[0].message.content;
      try {
        const result = aiEditContent.value.replace(/```json/g, '');
        const resule2 = result.replace(/```/g, '');
        console.log('翻译结果', resule2);
        const restoreJsonValue = restoreJsonData(parseJSON(resule2), message); // 将翻译结果还原为原数据
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
      ElMessage.warning('AI使用人数太多，请重试~~');
      cancleAiInvokeAsync();
    }
    aiLoading.value = false;
    console.log(data);
  };
</script>
<style lang="scss">
  .ai-content-translate-select-warpper {
    .tips {
      font-size: 12px;
      color: #b3afaf;
      line-height: 1.5;
      margin-bottom: 15px;
    }
  }
</style>
