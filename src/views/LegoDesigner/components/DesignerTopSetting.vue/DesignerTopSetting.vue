<template>
  <div class="designer-setting-box">
    <!-- 撤销和恢复 -->
    <div class="left">
      <div
        :class="['icon-box', { 'is-disabled': undoCommands.length > 0 ? false : true }]"
        @click="handleUndo"
      >
        <el-icon :color="undoColor" size="22px"><RefreshLeft /></el-icon>
        <span class="undo-span">撤销</span>
      </div>
      <div
        :class="['icon-box', { 'is-disabled': redoCommands.length > 0 ? false : true }]"
        @click="handleRedo"
      >
        <el-icon :color="redoColor" size="22px"><RefreshRight /></el-icon>
        <span class="redo-span">还原</span>
      </div>
    </div>

    <div class="center">
      <!-- 草稿保存 -->
      <div class="draft-tips-box">
        <span class="draft-tips">{{ draftTips }}</span>
      </div>
    </div>

    <!-- 缩放画布 -->
    <div class="right">
      <!-- 全局主题设置 -->
      <div class="global-setting-box">
        <el-popover placement="bottom" :width="400" trigger="click">
          <template #reference>
            <div class="global-setting-btn">
              <svg-icon
                icon-name="icon-quanju_qianduanjiemian"
                color="#67c23a"
                size="18px"
              ></svg-icon>
              全局设置
            </div>
          </template>
          <global-setting></global-setting>
        </el-popover>
      </div>
      <div class="zoom-box">
        <div class="icon-box" @click="reduce">
          <svg-icon icon-name="icon-suoxiao" color="#aeaeae" size="22px"></svg-icon>
        </div>
        <span>{{ number }}%</span>
        <div class="icon-box" @click="add">
          <svg-icon icon-name="icon-fangda" color="#aeaeae" size="22px"></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import GlobalSetting from '../GlobalSetting/GlobalSetting.vue';
  import appStore from '@/store';
  import { cloneDeep, isEqual } from 'lodash';
  import { storeToRefs } from 'pinia';
  import { IHJSchema } from '../../types';

  const number = ref<number>(100);
  const emit = defineEmits(['addSize', 'reduceSize']);
  const { HJSchemaJsonStore, draftTips } = storeToRefs(appStore.useLegoJsonStore);

  onMounted(() => {
    // 鼠标事件
    window.addEventListener('mousedown', handleMousedown);
    window.addEventListener('mouseup', handleMouseup);
    //键盘事件
    document.addEventListener('keyup', keyboard);
    document.addEventListener('keydown', keydown);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('mousedown', handleMousedown);
    window.removeEventListener('mouseup', handleMouseup);

    document.removeEventListener('keyup', keyboard);
    document.removeEventListener('keydown', keydown);
  });

  // 鼠标按下事件
  const oldHJSchemaJsonStore = ref<any>(cloneDeep(HJSchemaJsonStore.value));
  const newHJSchemaJsonStore = ref<any>(cloneDeep(HJSchemaJsonStore.value));
  const handleMousedown = () => {
    oldHJSchemaJsonStore.value = cloneDeep(HJSchemaJsonStore.value);
  };
  // 鼠标松开
  const handleMouseup = () => {
    newHJSchemaJsonStore.value = cloneDeep(HJSchemaJsonStore.value);
    const isEqualJson = isEqual(oldHJSchemaJsonStore.value, newHJSchemaJsonStore.value);
    if (!isEqualJson) {
      handleCache(oldHJSchemaJsonStore.value);
    }
    oldHJSchemaJsonStore.value = cloneDeep(HJSchemaJsonStore.value);
  };
  // 键盘按下
  const keydown = (event: any) => {
    const crtlZ = event.ctrlKey && event.keyCode === 90;
    const ctrlY = event.ctrlKey && event.keyCode === 89;
    // 撤销和恢复
    if (crtlZ || ctrlY) {
      return;
    }
    oldHJSchemaJsonStore.value = cloneDeep(HJSchemaJsonStore.value);
  };
  // 键盘松开
  const keyboard = (event: any) => {
    const crtlZ = event.ctrlKey && event.keyCode === 90;
    const ctrlY = event.ctrlKey && event.keyCode === 89;
    // 撤销和恢复
    if (crtlZ || ctrlY) {
      return;
    }
    newHJSchemaJsonStore.value = cloneDeep(HJSchemaJsonStore.value);
    const isEqualJson = isEqual(oldHJSchemaJsonStore.value, newHJSchemaJsonStore.value);
    if (!isEqualJson) {
      handleCache(oldHJSchemaJsonStore.value);
    }
  };

  // 加
  const add = () => {
    if (number.value >= 250) {
      return;
    } else {
      number.value += 5;
      emit('addSize', number.value / 100);
    }
  };

  // 减
  const reduce = () => {
    if (number.value <= 10) {
      return;
    } else {
      number.value -= 5;
      emit('reduceSize', number.value / 100);
    }
  };

  // 返回撤销恢复按钮颜色
  const { undo, redo, insertCache } = appStore.useUndoAndRedoStore;
  const { undoCommands, redoCommands } = storeToRefs(appStore.useUndoAndRedoStore);
  const { setUuid } = appStore.useRefreshStore;
  const undoColor = computed(() => {
    return undoCommands.value.length > 0 ? 'green' : '#aeaeae';
  });

  const redoColor = computed(() => {
    return redoCommands.value.length > 0 ? 'green' : '#aeaeae';
  });

  // 撤销
  const handleUndo = () => {
    undo();
    setUuid();
  };

  // 恢复
  const handleRedo = () => {
    redo();
    setUuid();
  };

  // 缓存步骤
  const handleCache = (oldHJSchemaJsonStore: IHJSchema) => {
    insertCache(oldHJSchemaJsonStore);
  };
</script>
<style lang="scss" scoped>
  .designer-setting-box {
    width: 100%;
    height: 50px;
    background-color: #fff;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 9;
    z-index: 1001;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    .left {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 70px;

      .icon-box {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-evenly;
        cursor: pointer;
        user-select: none;
        .undo-span {
          font-size: 12px;
          color: v-bind('undoColor');
        }
        .redo-span {
          font-size: 12px;
          color: v-bind('redoColor');
        }
      }
      .is-disabled {
        cursor: not-allowed;
      }
    }
    .center {
      flex: 1;
      justify-content: flex-start;
      padding: 0 20px;
      .draft-tips-box {
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 10px;
        .draft-tips {
          font-size: 10px;
          color: #999999;
        }
      }
    }

    .right {
      width: 230px;
      justify-content: space-between;
      display: flex;
      color: #8a8a8a;
      align-items: center;
      font-size: 14px;
      user-select: none;
      .global-setting-box {
        display: flex;
        align-items: center;
        .svg-icon {
          margin-right: 10px;
        }
        span {
          color: #67c23a;
          font-size: 14px;
        }
        .global-setting-btn {
          display: flex;
          align-items: center;
          height: 30px;
          border-radius: 5px;
          padding: 0 10px;
          transition: all 0.3s;
          cursor: pointer;
          &:hover {
            background-color: rgba($color: #ccc, $alpha: 0.2);
          }
        }
      }
      .zoom-box {
        width: 120px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon-box {
          height: 30px;
          width: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba($color: #ccc, $alpha: 0);
          transition: all 0.3s;
          border-radius: 4px;
          cursor: pointer;
          &:hover {
            background-color: rgba($color: #ccc, $alpha: 0.2);
          }
        }
      }
    }
  }
</style>
