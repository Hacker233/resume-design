<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-model="valueHtml"
      style="height: 500px; overflow-y: hidden"
      :default-config="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>
<script setup lang="ts">
  import '@wangeditor/editor/dist/css/style.css'; // 引入 css
  import { IToolbarConfig } from '@wangeditor/editor';
  import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue';
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef();

  // 内容 HTML
  const valueHtml = ref('<p>hello</p>');

  // 模式
  const mode = ref<string>('simple');

  // 模拟 ajax 异步获取内容
  onMounted(() => {
    setTimeout(() => {
      valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>';
    }, 1500);
  });

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    /* 工具栏配置 */
    toolbarKeys: [
      'bold',
      'clearStyle',
      'color',
      'bgColor',
      '|',
      'divider',
      'emotion',
      'blockquote',
      'headerSelect',
      'redo',
      'undo'
    ]
  };

  const editorConfig = { placeholder: '请输入内容...' };

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
