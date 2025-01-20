<template>
  <!-- AI操作区域 -->
  <div class="ai-box">
    <el-tooltip effect="light" content="AI帮我写" placement="bottom">
      <div class="ai-button ai-button-1" @click="aiNew">
        <svg-icon icon-name="icon-AI_zhineng" color="#fff" size="12px"></svg-icon>
      </div>
    </el-tooltip>
    <el-tooltip effect="light" content="AI帮我改" placement="bottom">
      <div class="ai-button ai-button-2" @click="aiEdit">
        <svg-icon icon-name="icon-ai" color="#fff" size="12px"></svg-icon>
      </div>
    </el-tooltip>
  </div>

  <!-- AI简历代写、代改弹窗 -->
  <ai-edit-dialog
    :dialog-ai-visible="dialogAiVisible"
    :type="aiType"
    :module="selectedModule"
    :content="modelValue"
    @cancle="aiDialogCancle"
    @update-success="updateSuccess"
  ></ai-edit-dialog>
</template>
<script setup lang="ts">
  import LoginDialog from '@/components/LoginDialog/LoginDialog';
  import { useGetSelectedModule } from '../hooks/useGetSelectedModule';
  import AiEditDialog from './AiEditDialog.vue';
  import appStore from '@/store';

  const emit = defineEmits(['update:modelValue']);

  interface TDialog {
    moduleId: string;
    modelValue: string | number;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    moduleId: '',
    modelValue: ''
  });

  // 添加一个可响应的 inputValue，并监听 modelValue 的变化
  const inputValue = ref(props.modelValue);

  // 点击AI帮我改
  const dialogAiVisible = ref<boolean>(false);
  const aiType = ref<string>('new');
  const selectedModule = ref<any>(null);
  const aiEdit = () => {
    const { token } = appStore.useTokenStore;
    if (!token) {
      openLoginDialog();
      return;
    }
    aiType.value = 'edit';
    selectedModule.value = useGetSelectedModule(props.moduleId);
    dialogAiVisible.value = true;
    console.log('需要修改的内容', props.modelValue);
  };

  // 点击AI帮我写
  const aiNew = () => {
    const { token } = appStore.useTokenStore;
    if (!token) {
      openLoginDialog();
      return;
    }
    aiType.value = 'new';
    // 选中的module
    selectedModule.value = useGetSelectedModule(props.moduleId);
    dialogAiVisible.value = true;
  };

  // ai弹窗取消
  const aiDialogCancle = () => {
    dialogAiVisible.value = false;
  };

  // 监听 inputValue 变化，触发 update:modelValue
  watch(inputValue, (newValue) => {
    emit('update:modelValue', newValue);
  });

  // 写入简历
  const updateSuccess = (content: any) => {
    inputValue.value = content;
  };

  // 打开登录弹窗
  const openLoginDialog = () => {
    LoginDialog(true);
  };
</script>
<style lang="scss" scoped>
  .ai-box {
    display: flex;
    color: #fff;
    font-size: 12px;
    .ai-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-right: 5px;
      transition: all 0.3s;
      user-select: none;
      &:hover {
        opacity: 0.8;
      }
    }
    .ai-button-1 {
      background: linear-gradient(312deg, #ffa462, #f75939);
      margin-left: 10px;
      margin-right: 8px;
    }
    .ai-button-2 {
      background: linear-gradient(312deg, #9889ff, #5325fe);
    }
  }
</style>
