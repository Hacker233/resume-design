<template>
  <div class="add-article-box">
    <!-- 工具栏 -->
    <div class="add-article-toolbar-container">
      <Toolbar :editor="editorRef" :default-config="toolbarConfig" :mode="mode" />
      <publish-pop
        :title="title"
        :value-html="valueHtml"
        :editor="editorRef"
        @get-article-text="getArticleText"
      ></publish-pop>
    </div>

    <!-- 编辑器 -->
    <div class="add-article-editor-container">
      <div class="editor-box">
        <div class="title-container">
          <el-input
            v-model.trim="title"
            placeholder="请输入标题"
            :maxlength="40"
            show-word-limit
            size="large"
          ></el-input>
        </div>
        <Editor
          v-model="valueHtml"
          :default-config="editorConfig"
          :mode="mode"
          @on-created="handleCreated"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import '@wangeditor/editor/dist/css/style.css'; // 引入 css
  import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue';
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import PublishPop from './components/PublishPop.vue';
  import CONFIG from '@/config';
  import appStore from '@/store';

  // 模式
  const mode = ref<string>('default');
  // 标题
  const title = ref<string>('');

  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef();

  // 内容 HTML
  const valueHtml = ref<string>('');

  // 模拟 ajax 异步获取内容
  onMounted(() => {});

  const toolbarConfig = {};

  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
  });

  const handleCreated = (editor: any) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
  };

  // 获取文章纯文本内容
  const valueText = ref<string>('');
  const getArticleText = () => {
    const editor = editorRef.value;
    valueText.value = editor.getText();
    console.log('内容', valueText.value, editor);

    debugger;
  };

  // 编辑器配置
  const editorConfig = {
    placeholder: '请输入内容',
    scroll: false,
    MENU_CONF: {
      // 图片上传配置
      uploadImage: {
        server: CONFIG.serverAddress + '/huajian/upload/file/article',
        fieldName: 'file',
        // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
        allowedFileTypes: ['image/*'],
        // 将 meta 拼接到 url 参数中，默认 false
        metaWithUrl: false,
        // 自定义增加 http  header
        headers: {
          Authorization: appStore.useTokenStore.token
        },
        timeout: 20 * 1000, // 20 秒
        maxFileSize: 1 * 1024 * 1024,
        // 自定义插入图片
        customInsert(res: any, insertFn: any) {
          console.log('服务端返回结果', res);
          let url = res.data.data.fileUrl;
          let alt = res.data.data.fileName;
          let href = res.data.data.fileUrl;
          insertFn(url, alt, href);
        },
        /*******回调函数********/
        // 上传之前触发
        onBeforeUpload(files: any) {
          console.log('上传之前触发', files);
          return files;
        },
        // 单个文件上传失败
        onFailed(file: File, res: any) {
          console.log(`${file.name} 上传失败`, res);
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .add-article-box {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    .add-article-toolbar-container {
      height: 50px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      position: sticky;
      top: -15px;
      z-index: 1000;
      border-bottom: 1px solid #eee;
      .toolbar-container {
        display: flex;
        align-items: center;
      }
    }

    // 编辑器
    .add-article-editor-container {
      display: flex;
      padding: 30px 20px;
      justify-content: center;
      align-items: flex-start;
      .editor-box {
        background-color: #fff;
        width: 900px;
        min-height: 1000px;
        padding: 20px 50px 50px 50px;
        border: 1px solid #e8e8e8;
        box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
        .title-container {
          padding: 20px 0;
          border-bottom: 1px solid #e8e8e8;
          :deep(.el-input) {
            .el-input__wrapper {
              border: none;
              padding: 0;
              box-shadow: none;
              .el-input__inner {
                font-size: 30px;
                border: 0;
                outline: none;
                width: 100%;
                line-height: 1;
              }
            }
          }
        }
        :deep(.w-e-scroll) {
          min-height: 1000px;
          #w-e-textarea-1 {
            min-height: 700px;
          }
        }
        :deep(.w-e-text-container) {
          min-height: 1000px;
        }
      }
    }
  }
</style>
