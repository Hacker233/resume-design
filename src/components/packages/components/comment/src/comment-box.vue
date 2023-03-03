<template>
  <div v-click-outside:[popperRef]="onClickOutside" class="comment-box">
    <u-editor
      ref="editorRef"
      v-model="content"
      :class="{ 'input-active': action }"
      :placeholder="props.placeholder"
      :min-height="64"
      @focus="onFocus"
      @input="
        isEmpty(content.replace(/&nbsp; |<br>/g, '')) ? (disabled = true) : (disabled = false)
      "
      @submit="onSubmit"
    ></u-editor>
    <Transition name="fade">
      <div v-if="action" class="action-box">
        <u-emoji :emoji="emoji" @add-emoji="(val: string) => editorRef?.addText(val)"></u-emoji>
        <el-button
          type="primary"
          size="default"
          :disabled="disabled"
          :loading="submitLoading"
          @click="onSubmit"
        >
          {{ props.contentBtn }}
        </el-button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { isEmpty, isNull } from '@/components/packages/util/index';
  import { ClickOutside as vClickOutside } from 'element-plus';
  import {
    CommentSubmitParam,
    InjectionCommentFun,
    InjectionEmojiApi,
    EditorInstance
  } from '@/components/packages/index';

  export interface CommentBoxApi {
    focus(): void;
  }

  interface Props {
    placeholder: string;
    contentBtn: string;
    parentId?: string;
    replay?: string;
  }

  const props = defineProps<Props>();

  const content = ref('');
  const action = ref(false);
  const disabled = ref(true);
  const editorRef = ref<EditorInstance>();
  const popperRef = ref();

  const emit = defineEmits<{
    (e: 'hide', event: Event): void;
    (e: 'close'): void;
  }>();

  const submit = inject(InjectionCommentFun) as (obj: CommentSubmitParam) => void;
  const emoji = inject(InjectionEmojiApi);

  // 提交评论的数据
  const submitLoading = ref<boolean>(false);
  const onSubmit = () => {
    submitLoading.value = true;
    submit({
      content: props.replay
        ? `回复 <span style="color: var(--u-color-success-dark-2);">@${props.replay}:</span> ${content.value}`
        : content.value,
      parentId: isNull(props.parentId, null),
      finish: () => {
        // 清空评论框内容
        (editorRef.value as any).clear();
        submitLoading.value = false;
        // 关闭评论框事件
        emit('close');
      },
      closeLoading: () => {
        submitLoading.value = false;
      }
    });
  };

  // 点击评论框外关闭操作栏和失去评论框焦点
  function onClickOutside(event: Event) {
    // const child = event.target as HTMLElement
    // const target = document.querySelector(".el-popper")
    // if (!target?.contains(child) && isEmpty(content.value)) {
    //   action.value = false
    // }

    // 评论框有内容情况下不执行炒作
    if (isEmpty(content.value)) {
      action.value = false;
      emit('hide', event);
    }
  }

  function onFocus() {
    // 显示操作栏
    action.value = true;
    nextTick(() => {
      // 所有以'el-popper-container'开头的id且被选中的元素
      popperRef.value = document.querySelector('div[id^="el-popper-container"]');
    });
  }

  defineExpose({
    focus: () => (editorRef as any).value?.focus()
  });
</script>

<style lang="scss" scoped>
  .comment-box {
    width: 100%;
    position: relative;
    overflow: hidden;
    .action-box {
      display: flex;
      align-items: center;
      margin-top: 8px;
      .el-button {
        margin-left: auto;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
