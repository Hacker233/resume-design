<!-- 创建模版页导航栏 -->
<template>
  <div class="nav-bar-box">
    <div class="nav-left">
      <logo-com icon-color="#74a274" font-color="#74a274"></logo-com>
    </div>
    <div class="nav-center">
      <p v-show="!isShowIpt">
        {{ HJNewJsonStore.config.title }}
        <el-icon :size="20" color="#409eff" @click="changeTitle">
          <Edit />
        </el-icon>
      </p>
      <el-input
        v-show="isShowIpt"
        ref="titleIpf"
        v-model="HJNewJsonStore.config.title"
        autofocus
        placeholder="请输入标题"
        @blur="blurTitle"
      />
    </div>
    <div class="nav-right">
      <el-tooltip effect="dark" content="AI简历生成" placement="bottom">
        <div class="ai-bot-container" @click="aiGenerate"
          ><img src="@/assets/images/ai-translate.webp" width="24" height="24" /><div
            class="ai-bot-text"
            >AI生成</div
          ></div
        >
      </el-tooltip>
      <el-tooltip effect="light" content="提交模版" placement="bottom">
        <el-button
          size="default"
          type="primary"
          :icon="UploadFilled"
          circle
          @click="publishTemplate"
        />
      </el-tooltip>
      <el-tooltip effect="light" content="模版列表" placement="bottom">
        <el-button size="default" type="primary" :icon="Folder" circle @click="templateList" />
      </el-tooltip>
    </div>
  </div>

  <!-- 提交审核弹窗 -->
  <submit-audit-dialog
    :template-info="templateInfo"
    :dialog-visible="dialogVisible"
    @cancle="cancle"
    @success="success"
  ></submit-audit-dialog>

  <!-- AI简历生成弹窗 -->
  <ai-generate-dialog
    :dialog-generate-visible="dialogGenerateVisible"
    @cancle="cancleGenerateDialog"
    @update-success="updateSuccess"
  ></ai-generate-dialog>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { UploadFilled, Folder } from '@element-plus/icons-vue';
  import SubmitAuditDialog from './SubmitAuditDialog.vue';
  import AiGenerateDialog from './AiGenerateDialog.vue';

  const emit = defineEmits(['publishSuccess', 'refresh']);

  defineProps<{
    templateInfo: any;
  }>();

  const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);
  // 更改标题
  const titleIpf = ref<any>(null);
  const isShowIpt = ref<boolean>(false);
  const changeTitle = () => {
    isShowIpt.value = true;
    titleIpf.value.focus();
  };
  const blurTitle = () => {
    isShowIpt.value = false;
  };

  // 打开提交弹窗
  const dialogVisible = ref<boolean>(false);
  const publishTemplate = () => {
    dialogVisible.value = true;
  };

  // 取消弹窗
  const cancle = () => {
    dialogVisible.value = false;
  };

  // 上传成功
  const success = (id: string) => {
    dialogVisible.value = false;
    emit('publishSuccess', id);
  };

  // 跳转至模版列表
  const router = useRouter();
  const templateList = () => {
    router.push({
      path: '/admin/templateListNew'
    });
  };

  // 打开AI诊断抽屉
  const dialogGenerateVisible = ref<boolean>(false);
  const aiGenerate = () => {
    dialogGenerateVisible.value = true;
  };

  const cancleGenerateDialog = () => {
    dialogGenerateVisible.value = false;
  };

  // 简历生成成功
  const updateSuccess = () => {
    dialogGenerateVisible.value = false;
    emit('refresh');
  };
</script>
<style lang="scss" scoped>
  .nav-bar-box {
    width: 100%;
    height: 50px;
    background-color: #fff;
    box-shadow: 0 5px 21px 0 rgb(78 78 78 / 5%);
    flex-shrink: 0;
    position: sticky;
    top: 0;
    z-index: 10;
    padding: 0 60px;
    display: flex;
    justify-content: space-between;
    .nav-left {
      width: 300px;
      height: 100%;
      display: flex;
      align-items: center;
      user-select: none;
    }
    .nav-center {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      p {
        display: flex;
        align-items: center;
        font-size: 16px;
        .el-icon {
          margin-left: 10px;
          cursor: pointer;
        }
      }
      .el-input {
        width: 200px;
      }
    }
    .nav-right {
      width: 300px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .ai-bot-container {
        align-items: center;
        background: linear-gradient(271deg, #f6f3ff -0.08%, #f2fdff 99.45%);
        border-radius: 24px;
        box-sizing: border-box;
        display: inline-flex;
        font-size: 14px;
        height: 32px;
        margin-right: 15px;
        overflow: hidden;
        padding: 6px 8px;
        user-select: none;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
        .ai-bot-text {
          -webkit-text-fill-color: transparent;
          background: linear-gradient(271deg, #4734f4 0.3%, #4c79ff 99.35%);
          -webkit-background-clip: text;
          background-clip: text;
          font-family: PingFang SC;
          font-size: 14px;
          line-height: 20px;
          margin-left: 4px;
        }
      }
      .audit-btn {
        margin-right: 15px;
      }
      .icon-box {
        width: 35px;
        height: 35px;
        background-color: #74a274;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-right: 15px;
        transition: all 0.3s;
        &:hover {
          background-color: rgba(0, 192, 145, 0.8);
        }
      }
    }
  }
</style>
