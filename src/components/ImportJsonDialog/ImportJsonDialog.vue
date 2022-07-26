<template>
  <el-dialog
    :model-value="dialogVisible"
    title="请在编辑器内输入简历JSON数据"
    width="60%"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <!-- 代码编辑器 -->
    <codemirror
      v-model="code"
      ref="codemirrorRef"
      placeholder="请将你的简历JSON写在此处～～"
      :style="{ height: '400px' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tabSize="2"
      :extensions="extensions"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" @click="confirmJson">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
    import { Codemirror } from 'vue-codemirror';
    import { javascript } from '@codemirror/lang-javascript';
    import { oneDark } from '@codemirror/theme-one-dark';
    import { json } from '@codemirror/lang-json';
    import { nextTick, onMounted, reactive, ref } from 'vue';
    import TEMPLATE_JSON from '@/schema/model';
    import { IResumeJson } from '@/interface/model';

    const emit = defineEmits(['cancle']);

    interface TDialog {
      dialogVisible: boolean;
    }
    withDefaults(defineProps<TDialog>(), {
      dialogVisible: false
    });

    // 设置编辑器高度
    const codemirrorRef = ref<any>(null);
    // onMounted(async ()=> {
    //   await nextTick();
    //   codemirrorRef.value.setSize('auto', 600);
    // })

    // 代码编辑器
    const code = ref<string>(JSON.stringify(TEMPLATE_JSON,null,4));
    const extensions = [javascript(), oneDark, json()];

    // 取消
    const cancle = () => {
      emit('cancle');
    };

    // 提交JSON
    const confirmJson = () => {
      emit('cancle');
    };
</script>
<style scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
