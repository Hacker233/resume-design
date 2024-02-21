<template>
  <el-drawer
    :model-value="drawer"
    :close-on-click-modal="false"
    :size="720"
    class="json-drawer"
    direction="ltr"
    title="页面JSON数据"
    destroy-on-close
    @close="handleClose"
    @open="handleOpen"
  >
    <json-editor v-model="code" class="json-editor"></json-editor>
    <div class="footer-box">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="updateJSON">确认更新JSON</el-button>
    </div>
  </el-drawer>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import JsonEditor from 'json-editor-vue3';
  import { cloneDeep } from 'lodash';

  const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore); // store里的模板数据
  let code = ref<any>(null);

  const emit = defineEmits(['closeJsonDrawer']);
  interface IJsonDrawer {
    drawer: boolean;
  }
  withDefaults(defineProps<IJsonDrawer>(), {
    drawer: false
  });

  // 关闭弹窗
  const handleClose = () => {
    emit('closeJsonDrawer');
  };

  // 打开弹窗
  const handleOpen = () => {
    code.value = cloneDeep(resumeJsonNewStore.value);
    console.log('最新JSON', cloneDeep(resumeJsonNewStore.value), code);
  };

  // 更新JSON
  const { setUuid } = appStore.useUuidStore;
  const updateJSON = () => {
    resumeJsonNewStore.value = code.value; // 直接覆盖对象不会引起视图变化
    setUuid(); // 强制刷新视图
    emit('closeJsonDrawer');
  };
</script>
<style lang="scss">
  .json-drawer {
    .json-editor {
      flex: 1;
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
</style>
