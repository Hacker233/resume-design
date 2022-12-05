<!-- 审核弹窗 -->
<template>
  <el-dialog
    :model-value="dialogOnlineVisible"
    title="分享简历"
    width="500px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
  >
    <div class="content-box">
      <div class="link-box">
        <span class="label">在线地址：</span>
        <a :href="link" target="_blank">{{ link }}</a>
        <div class="copy-link-icon" title="复制公开链接" @click="copyLink">
          <svg-icon icon-name="icon-fuzhi2" class="iconfont" color="#00c091" size="20px"></svg-icon>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="cancle">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import useClipboard from 'vue-clipboard3';
  const emit = defineEmits(['cancle']);
  interface TDialog {
    dialogOnlineVisible: boolean;
    resumeId: string;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogOnlineVisible: false,
    resumeId: ''
  });

  const link = computed(() => {
    return `${location.origin}/online/${props.resumeId}`;
  });

  // 点击复制公开链接
  const { toClipboard } = useClipboard();
  const copyLink = async () => {
    try {
      await toClipboard(link.value);
      ElMessage.success('复制成功');
    } catch (e: any) {
      ElMessage.error(e);
    }
  };

  // 取消
  const cancle = () => {
    emit('cancle');
  };
</script>
<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
  .content-box {
    .link-box {
      display: flex;
      justify-items: flex-start;
      line-height: 1.5;
      .label {
        width: 90px;
      }
      .copy-link-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        margin-left: 10px;
        width: 25px;
        height: 25px;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          background-color: rgba($color: #000000, $alpha: 0.05);
        }
      }
    }
  }
</style>
