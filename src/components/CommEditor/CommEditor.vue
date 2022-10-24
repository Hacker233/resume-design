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

  const props = defineProps<{
    modelValue: any;
  }>();
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
<style lang="scss" scoped>
  .editor-box {
    width: 100%;
    border: 1px solid #eee;
    .editor-content {
      height: 150px !important;
      overflow-y: auto;
    }
  }
</style>
