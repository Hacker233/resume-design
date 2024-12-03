<!-- 审核弹窗 -->
<template>
  <el-dialog
    :model-value="dialogNoticeVisible"
    title="重要通知"
    width="600px"
    :show-close="false"
    append-to-body
    class="notice-dialog-box"
  >
    <div class="notice-content-box">
      <p class="content-p"
        >简历制作全新版本已进入试运行阶段，若您有已存的简历，您可以继续通过
        <span class="blod">“个人中心->我的简历”</span>
        入口进入旧版本简历编辑页面</p
      >
      <p class="content-p">
        如遇到问题，随时联系开源作者VX：<span class="blod">LHQfighting</span>
      </p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-checkbox v-model="tips" label="不再提示" />
        <el-button style="margin-left: 15px" type="primary" :loading="sureLoading" @click="submit"
          >我已知晓</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  const emit = defineEmits(['cancle']);
  interface TDialog {
    dialogNoticeVisible: boolean;
  }
  withDefaults(defineProps<TDialog>(), {
    dialogNoticeVisible: false
  });

  const tips = ref<boolean>(false);

  // 确认修改
  const sureLoading = ref<boolean>(false);
  const submit = () => {
    console.log('tips', tips.value);
    if (tips.value) {
      localStorage.setItem('readNotice', '1');
    }
    emit('cancle');
  };
</script>
<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
<style lang="scss">
  .notice-dialog-box {
    .el-dialog__footer {
      .dialog-footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
    .notice-content-box {
      .content-p {
        line-height: 2;
        font-size: 14px;
      }
      .blod {
        font-weight: 600;
      }
    }
  }
</style>
