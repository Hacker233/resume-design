<template>
  <!-- 提示弹窗 -->
  <el-dialog
    :model-value="tipDialogVisible"
    width="40%"
    title="示例JSON"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
    custom-class="import-json"
  >
    <!-- 代码编辑器 -->
    <div class="code-mirror-box">
      <codemirror
        v-model="code"
        ref="codemirrorRef"
        placeholder="请将你的简历JSON写在此处～～"
        :style="{ height: '400px' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tabSize="2"
        :extensions="extensions"
        :disabled="true"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="close">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
  import { Codemirror } from 'vue-codemirror';
  import IMPORT_JSON from '@/schema/import';
  import { javascript } from '@codemirror/lang-javascript';
  import { json } from '@codemirror/lang-json';
  import { ref } from 'vue';

  const emit = defineEmits(['closeTipDialog']);

  interface TDialog {
    tipDialogVisible: boolean;
  }
  withDefaults(defineProps<TDialog>(), {
    tipDialogVisible: false
  });

  // 代码编辑器
  const code = ref<string>(JSON.stringify(IMPORT_JSON, null, 4));
  const extensions = [javascript(), json()];

  // 关闭
  const close = () => {
    emit('closeTipDialog');
  };
</script>
