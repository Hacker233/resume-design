<template>
  <nav class="nav-box">
    <div class="nav-left">
      <logo-com icon-color="#74a274" font-color="#74a274"></logo-com>
    </div>
    <div class="nav-center">
      <p v-show="!isShowIpt">
        {{ resumeJsonNewStore.TITLE }}
        <el-icon :size="20" color="#409eff" @click="changeTitle">
          <Edit />
        </el-icon>
      </p>
      <el-input
        v-show="isShowIpt"
        ref="titleIpf"
        v-model="resumeJsonNewStore.TITLE"
        autofocus
        placeholder="请输入标题"
        @blur="blurTitle"
      />
    </div>
    <div class="nav-right">
      <!-- 提交审核按钮 -->
      <el-button type="primary" class="audit-btn box-item" @click="openAuditDialog"
        >提交审核</el-button
      >
      <el-tooltip class="box-item" effect="dark" content="导出为PDF" placement="bottom">
        <div class="icon-box" @click="generateReport">
          <svg-icon icon-name="icon-pdf" color="#fff" size="17px"></svg-icon>
        </div>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="复制JSON数据" placement="bottom">
        <div class="icon-box" @click="copyJSON">
          <svg-icon icon-name="icon-fuzhi" color="#fff" size="18px"></svg-icon>
        </div>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="导出为JSON数据" placement="bottom">
        <div class="icon-box" @click="exportJSON">
          <svg-icon icon-name="icon-xiazai" color="#fff" size="17px"></svg-icon>
        </div>
      </el-tooltip>
    </div>
  </nav>

  <!-- 提交审核弹窗 -->
  <submit-audit-dialog-vue
    :id="templateId"
    :preview-url="previewUrl"
    :category="category"
    :dialog-visible="dialogVisible"
    @cancle="cancle"
  ></submit-audit-dialog-vue>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { getUuid } from '@/utils/common';
  import FileSaver from 'file-saver';
  import { storeToRefs } from 'pinia';
  import SubmitAuditDialogVue from './SubmitAuditDialog.vue';

  const emit = defineEmits(['generateReport']);
  const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore);

  // 打开审核弹窗
  const dialogVisible = ref<boolean>(false);
  const openAuditDialog = () => {
    dialogVisible.value = true;
  };
  // 取消弹窗
  const cancle = () => {
    dialogVisible.value = false;
  };

  // 导出为pdf
  const generateReport = async () => {
    emit('generateReport');
  };

  // 模板ID、分类、预览图
  const route = useRoute();
  let previewUrl = ref<string>('');
  let category = ref<Array<string>>([]);
  let templateId = '';
  if (route.query.ID && route.query.previewUrl && route.query.category) {
    templateId = route.query.ID as string;
    previewUrl.value = route.query.previewUrl as string;
    category.value = JSON.parse(route.query.category as string);
  } else {
    templateId = getUuid();
  }

  // 导出为JSON
  const exportJSON = () => {
    resumeJsonNewStore.value.NAME = 'customJson';
    resumeJsonNewStore.value.ID = templateId;
    const data = JSON.stringify(resumeJsonNewStore.value, null, 4);
    const blob = new Blob([data], { type: '' });
    FileSaver.saveAs(blob, resumeJsonNewStore.value.TITLE + '.json');
  };

  // 复制JSON数据
  const copyJSON = () => {
    resumeJsonNewStore.value.NAME = 'customJson';
    resumeJsonNewStore.value.ID = templateId;
    const data = JSON.stringify(resumeJsonNewStore.value, null, 4);
    navigator.clipboard.writeText(data).then(() => {
      ElMessage.success('复制成功');
    });
  };

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
</script>
<style lang="scss" scoped>
  .nav-box {
    height: 50px;
    width: 100%;
    background-color: #fff;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 5px 21px 0 rgb(78 78 78 / 5%);
    padding: 0 30px;
    box-sizing: border-box;
    .nav-left {
      width: 300px;
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
