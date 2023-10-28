<template>
  <div class="editor-box">
    <Toolbar
      style="border-bottom: 1px solid #eee"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-model="htmlContent"
      class="editor-content"
      :default-config="editorConfig"
      :mode="mode"
      @on-created="handleCreated"
    />
  </div>
</template>
<script setup lang="ts">
  import '@wangeditor/editor/dist/css/style.css'; // 引入 css
  import { IToolbarConfig } from '@wangeditor/editor';
  import { onBeforeUnmount, ref, shallowRef } from 'vue';
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import CONFIG from '@/config';
  import appStore from '@/store';

  interface IEditor {
    modelValue: any;
    height?: string;
  }
  const props = withDefaults(defineProps<IEditor>(), {
    modelValue: '',
    height: '150px'
  });
  const emit = defineEmits(['update:modelValue']);

  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef();

  // 编辑器内容
  const htmlContent = ref<string>(props.modelValue);

  watch(
    () => htmlContent.value,
    (newVal) => {
      emit('update:modelValue', newVal);
    },
    {
      deep: true
    }
  );

  // 模式
  const mode = ref<string>('simple');

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    /* 工具栏配置 */
    toolbarKeys: ['bold', 'clearStyle', 'bulletedList', 'numberedList', 'lineHeight']
  };

  const editorConfig = {
    placeholder: '请输入内容...',
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

  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
  });

  const handleCreated = (editor: any) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
    console.log(editor.getAllMenuKeys());
  };
</script>
<style lang="scss" scoped>
  .editor-box {
    width: 100%;
    border: 1px solid #eee;
    .editor-content {
      height: v-bind('props.height') !important;
      overflow-y: auto;
    }
  }
</style>
