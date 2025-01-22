<template>
  <div class="title-left">
    <h1 v-show="!showInput" class="title">
      {{ module.title }}
      <div v-if="module.props.title.iconfont" class="icon-box">
        <icon-select-pop v-model="module.props.title.iconfont"></icon-select-pop>
      </div>
    </h1>
    <el-input
      v-show="showInput"
      ref="titleIpf"
      v-model="module.title"
      size="large"
      style="width: 200px"
      @blur="blurTitle"
    ></el-input>
    <el-tooltip effect="light" content="编辑标题" placement="bottom">
      <svg-icon
        v-show="!showInput"
        icon-name="icon-tubiao_bianji"
        color="#1e2532"
        size="22px"
        class="edit-icon"
        @click="toggleEdit"
      ></svg-icon>
    </el-tooltip>
    <!-- AI翻译 -->
    <el-tooltip effect="light" content="AI翻译" placement="bottom">
      <div class="ai-icon-box" @click="languageSelect">
        <img src="@/assets/images/ai-translate.webp" width="20" height="20" />
      </div>
    </el-tooltip>
  </div>

  <!-- 语种切换弹窗 -->
  <translate-dialog
    :id="id"
    :dialog-translate-visible="dialogTranslateVisible"
    @cancle="translateCancle"
  ></translate-dialog>
</template>
<script setup lang="ts">
  import { useGetSelectedModule } from '../hooks/useGetSelectedModule';
  import IconSelectPop from '@/components/IconSelectPop/IconSelectPop.vue';
  import TranslateDialog from './TranslateDialog.vue';
  import LoginDialog from '@/components/LoginDialog/LoginDialog';
  import appStore from '@/store';

  const props = defineProps<{
    id: string;
  }>();

  // 选中的module
  const module = useGetSelectedModule(props.id);

  // 是否展示输入框
  const showInput = ref<boolean>(false);

  // 输入框失去焦点
  const titleIpf = ref<any>(null);
  const blurTitle = () => {
    showInput.value = false;
  };

  // 输入框宽度
  const toggleEdit = () => {
    showInput.value = true;
    titleIpf.value.focus();
  };

  // 打开智能语种切换弹窗
  const dialogTranslateVisible = ref<boolean>(false);
  const languageSelect = () => {
    const { token } = appStore.useTokenStore;
    if (!token) {
      openLoginDialog();
      return;
    }
    dialogTranslateVisible.value = true;
  };

  // 打开登录弹窗
  const openLoginDialog = () => {
    LoginDialog(true);
  };

  // 关闭翻译弹窗
  const translateCancle = () => {
    dialogTranslateVisible.value = false;
  };
</script>
<style lang="scss" scoped>
  .title-left {
    display: flex;
    align-items: center;
    .title {
      height: 50px;
      display: flex;
      align-items: center;
      font-size: 20px;
      color: '#1e2532';
      margin-right: 10px;
      .icon-box {
        margin-left: 5px;
        margin-top: 2px;
      }
    }
    .edit-icon {
      cursor: pointer;
      padding: 3px;
      transition: all 0.3s;
      &:hover {
        background-color: #eee;
        border-radius: 4px;
      }
    }
    .ai-icon-box {
      display: flex;
      align-items: center;
      margin-left: 6px;
    }
  }
</style>
