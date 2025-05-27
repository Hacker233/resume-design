<template>
  <el-drawer
    :model-value="drawer"
    :size="820"
    class="json-drawer"
    direction="ltr"
    title="页面JSON数据"
    destroy-on-close
    @close="handleClose"
    @open="handleOpen"
  >
    <json-editor v-model="code" class="json-editor"></json-editor>
    <div v-if="!json" class="view-json-footer">
      <el-button type="primary" size="default" @click="changeJSON">确认修改</el-button>
    </div>
  </el-drawer>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import JsonEditor from 'json-editor-vue3';
  import { cloneDeep } from 'lodash';
  import { storeToRefs } from 'pinia';

  const emit = defineEmits(['closeJsonDrawer']);
  interface IJsonDrawer {
    drawer: boolean;
    json?: any;
  }
  const props = withDefaults(defineProps<IJsonDrawer>(), {
    drawer: false,
    json: null
  });

  // 关闭弹窗
  const handleClose = () => {
    emit('closeJsonDrawer');
  };

  const code = ref<any>({});

  // 打开弹窗
  const handleOpen = () => {
    const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);
    if (props.json) {
      code.value = props.json;
      return;
    }
    code.value = cloneDeep(HJNewJsonStore.value);
  };

  // 确认修改JSON
  const changeJSON = () => {
    const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);
    HJNewJsonStore.value = code.value;
    emit('closeJsonDrawer');
  };
</script>
<style lang="scss">
  .json-drawer {
    .json-editor {
      flex: 1;
      overflow-y: hidden;
      .jsoneditor-repair,
      .jsoneditor-poweredBy,
      .jsoneditor-transform {
        display: none;
      }
      .full-screen {
        right: 10px;
      }
      .jsoneditor {
        border: none;
      }
    }
    .footer-box {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 20px;
    }
    .el-drawer__body {
      padding: 0;
      display: flex;
      flex-direction: column;
    }
    .cm-editor {
      height: 100%;
      font-size: 16px;
    }
    .my-awesome-json-theme {
      background: #fff;
      white-space: nowrap;
      color: #525252;
      font-size: 14px;
      font-family: Consolas, Menlo, Courier, monospace;

      .jv-ellipsis {
        color: #999;
        background-color: #eee;
        display: inline-block;
        line-height: 0.9;
        font-size: 0.9em;
        padding: 0px 4px 2px 4px;
        border-radius: 3px;
        vertical-align: 2px;
        cursor: pointer;
        user-select: none;
      }
      .jv-button {
        color: #49b3ff;
      }
      .jv-key {
        color: #111111;
      }
      .jv-item {
        &.jv-array {
          color: #111111;
        }
        &.jv-boolean {
          color: #fc1e70;
        }
        &.jv-function {
          color: #067bca;
        }
        &.jv-number {
          color: #fc1e70;
        }
        &.jv-number-float {
          color: #fc1e70;
        }
        &.jv-number-integer {
          color: #fc1e70;
        }
        &.jv-object {
          color: #111111;
        }
        &.jv-undefined {
          color: #e08331;
        }
        &.jv-string {
          color: #42b983;
          word-break: break-word;
          white-space: normal;
        }
      }
      .jv-code {
        .jv-toggle {
          &:before {
            padding: 0px 2px;
            border-radius: 2px;
          }
          &:hover {
            &:before {
              background: #eee;
            }
          }
        }
      }
    }
  }
  .view-json-footer {
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;
  }
</style>
