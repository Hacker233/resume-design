<template>
  <el-drawer
    :model-value="drawer"
    :size="820"
    class="ai-md-generate-drawer"
    direction="rtl"
    title="AI Markdown 简历生成结果"
    append-to-body
    @close="handleClose"
  >
    <div
      ref="contentRef"
      v-dompurify-html="renderedContent"
      class="ai-optimize-content markdown-body"
    ></div>
    <!-- 自定义footer -->
    <template #footer>
      <el-button class="custom-button" @click="downloadReport"> 立即下载 </el-button>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
  import MarkdownIt from 'markdown-it';

  const emit = defineEmits(['closeAiMdGenerateDrawer']);

  interface IJsonDrawer {
    drawer: boolean;
    modelInfoObj?: any;
    content?: string;
  }
  const props = withDefaults(defineProps<IJsonDrawer>(), {
    drawer: false,
    modelInfoObj: {},
    content: ''
  });

  const md = new MarkdownIt();

  // 关闭弹窗
  const handleClose = () => {
    emit('closeAiMdGenerateDrawer');
  };

  const aiContent = ref('');
  const renderedContent = computed(() => {
    // 去除开头和结尾的 ```markdown 或 ```
    const cleanedStr = aiContent.value.replace(/^```markdown|```$/gm, '');
    return md.render(cleanedStr);
  });

  watch(
    () => props.content,
    (newVal) => {
      aiContent.value = newVal;
    }
  );

  // 下载Markdown简历
  const downloadReport = () => {
    const cleanedStr = aiContent.value.replace(/^```markdown|```$/gm, '');
    const blob = new Blob([cleanedStr], { type: 'text/markdown;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `简历_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
</script>
<style src="../../../../style/markdown.css"></style>
<style lang="scss" scoped>
  .ai-md-generate-drawer {
    :deep(.el-drawer__body) {
      padding: 0;
      overflow: hidden; // 禁止父容器滚动
    }
    .ai-optimize-content {
      overflow-y: auto; // 允许内容滚动
      height: 100%; // 撑满父容器
      padding: 16px 25px 20px 25px; // 添加内边距，避免内容贴边
      white-space: normal;
      text-align: justify;
    }

    .optimize-drawer-custom-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        .header-title {
          margin: 0 10px;
        }
      }

      .content-box {
        font-size: 12px;
        color: #777777;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-bottom: none;
        margin-right: 15px;
        p {
          height: 40px;
          font-size: 14px;
          display: flex;
          align-items: center;
          color: #fb8444;
          img {
            margin-left: 5px;
            margin-bottom: 1px;
          }
        }
        .jb-num {
          font-size: 16px;
          font-weight: 600;
          background: -webkit-linear-gradient(top, #ff0000, #00ff00); /*设置线性渐变*/
          /*为了支持更多的浏览器*/
          background-clip: text; /*背景被裁剪到文字*/
          -webkit-text-fill-color: transparent; /*设置文字的填充颜色*/
          letter-spacing: 1px;
        }
      }
    }
  }
</style>
<style lang="scss">
  .ai-md-generate-drawer {
    // 自定义按钮样式
    .custom-button {
      background: linear-gradient(138deg, #3b2af9, #562cf7 22%, #dd34ee 89%, #f5e17d) !important;
      border-radius: 99px !important;
      box-shadow: 0 0 4px 1px #9569c066 !important;
      color: #fff !important;
      font-size: 18px !important;
      height: 45px !important;
      width: 130px !important;
      letter-spacing: 2px !important;
      border: none !important;
      padding: 0 !important;
      transition: all 0.3s ease !important;

      &.is-loading {
        opacity: 0.7;
      }
    }
    .el-drawer__body {
      padding: 0;
    }
    .el-drawer__header {
      border-bottom: 1px solid #ebeef5;
      height: 65px;
      margin: 0;
      display: flex;
      align-items: center;
      padding: 0 30px;
    }
  }
</style>
