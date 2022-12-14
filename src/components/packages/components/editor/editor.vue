<template>
  <div class="u-editor" :class="{ active: active }">
    <div
      ref="editorRef"
      v-dompurify-html="text"
      class="rich-input"
      contenteditable="true"
      :placeholder="placeholder"
      @focus="onFocus"
      @input="onInput"
      @blur="onBlur"
      @keydown.enter="keyDown"
    ></div>
  </div>
</template>
<script setup lang="ts">
  defineOptions({
    name: 'UEditor'
  });

  interface Props {
    placeholder?: string;
    modelValue: string;
    minHeight?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    placeholder: '',
    minHeight: 30
  });

  const range = ref<Range>();
  const editorRef = ref<HTMLDivElement>();
  const text = ref();
  const isLocked = ref(false);
  const active = ref(false);

  const minHeight = computed(() => props.minHeight + 'px');

  const padding = computed(() => (props.minHeight == 30 ? '4px 10px' : '8px 12px'));

  const emit = defineEmits<{
    (e: 'update:modelValue', val: string): void;
    (e: 'input', event: Event): void;
    (e: 'focus', event: Event): void;
    (e: 'blur', event: Event): void;
    (e: 'submit'): void;
  }>();

  watch(
    () => props.modelValue,
    (val) => {
      if (!isLocked.value) text.value = val;
    }
  );

  function onFocus(event: Event) {
    emit('focus', event);
    isLocked.value = true;
    active.value = true;
  }

  function onBlur(event: Event) {
    // 记录光标
    range.value = window.getSelection()?.getRangeAt(0);
    emit('blur', event);
    if (!editorRef.value?.innerHTML) active.value = false;
    isLocked.value = false;
  }

  function onInput(event: Event) {
    const { innerHTML } = event.target as HTMLDivElement;
    emit('update:modelValue', innerHTML);
    emit('input', event);
  }

  function addText(val: string) {
    let selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      // 为空初始化光标
      if (!range.value) {
        editorRef.value?.focus();
        range.value = selection.getRangeAt(0);
      }
      // 删除选中内容
      range.value.deleteContents();

      // 添加内容
      range.value.insertNode(range.value.createContextualFragment(val));

      range.value.collapse(false);
      selection.addRange(range.value);

      emit('update:modelValue', editorRef.value?.innerHTML || '');
      const event = editorRef.value as unknown as Event;
      emit('input', event);
    }
  }

  function clear() {
    if (editorRef.value) {
      editorRef.value.innerHTML = '';
      emit('update:modelValue', editorRef.value.innerHTML);
      active.value = false;
    }
  }

  function focus() {
    nextTick(() => {
      editorRef.value?.focus();
    });
  }

  const keyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key == 'Enter') {
      //用户点击了ctrl+enter触发
      // console.log('ctrl+enter')
      emit('submit');
    } else {
      //用户点击了enter触发
      // console.log('enter')
    }
  };

  onMounted(() => {
    editorRef.value?.addEventListener('keyup', (event: Event) => {
      const el = event.target as HTMLDivElement;
      if (el.innerHTML == '<br>') {
        el.innerHTML = '';
      }
    });
  });

  defineExpose({
    addText,
    clear,
    focus
  });
</script>

<style lang="scss" scoped>
  @use './style/index.scss' with (
    $minHeight: v-bind(minHeight),
    $padding: v-bind(padding)
  );
</style>
