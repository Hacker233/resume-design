<!-- 自定义创建的模板数据 -->
<template>
  <div class="content-box" ref="customContentPdf">
    <!-- 无布局方式 -->
    <template v-if="!resumeJsonNewStore.COMPONENTS.length">
      <div class="upload-json-box" @click="importJson">
        <svg-icon icon-name="icon-daimashili" color="#74a274" size="28px"></svg-icon>
        <h1>请导入JSON文件</h1>
        <p>该JSON文件通常为自定义模板时导出的JSON文件</p>
      </div>
    </template>
    <!-- 传统布局 -->
    <template v-else-if="resumeJsonNewStore.LAYOUT === 'classical'">
      <draggable
        class="dragArea list-group"
        :list="resumeJsonNewStore.COMPONENTS"
        animation="500"
        group="custom"
        :sort="true"
        item-key="id"
      >
        <template #item="{ element }">
          <div class="list-group-item">
            <model-box :components="MaterialComponents" :item="element"></model-box>
          </div>
        </template>
      </draggable>
    </template>

    <!-- 左右两列布局 -->
    <template v-else-if="resumeJsonNewStore.LAYOUT === 'leftRight'">
      <div class="left-box">
        <draggable
          class="left-drag-area"
          :list="leftList"
          animation="500"
          group="custom"
          :sort="true"
          item-key="id"
        >
          <template #item="{ element }">
            <div class="list-group-item">
              <model-box
                :components="MaterialComponents"
                :item="element"
                @left-right-delete="leftDelete"
                @left-right-add="leftAdd"
              ></model-box>
            </div>
          </template>
        </draggable>
      </div>
      <div class="right-box">
        <draggable
          class="right-drag-area"
          :list="rightList"
          animation="500"
          group="custom"
          :sort="true"
          item-key="id"
        >
          <template #item="{ element }">
            <div class="list-group-item">
              <model-box
                :components="MaterialComponents"
                :item="element"
                @left-right-delete="rightDelete"
                @left-right-add="rightAdd"
              ></model-box>
            </div>
          </template>
        </draggable>
      </div>
    </template>
  </div>

  <!-- 上传json代码编辑器 -->
  <import-json-dialog
    :dialog-visible="dialogVisible"
    @cancle="cancleJsonDialog"
  ></import-json-dialog>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import ModelBox from './ModelBox.vue';
  import draggable from 'vuedraggable';
  import { IMATERIALITEM } from '@/interface/material';
  import { getUuid } from '@/utils/common';
  import { cloneDeep } from 'lodash';
  import ImportJsonDialog from '@/components/ImportJsonDialog/ImportJsonDialog.vue';
  import MaterialComponents from '@/utils/registerMaterialCom'; // 所有物料组件
  defineOptions({ name: 'custom' });
  const emit = defineEmits(['contentHeightChange']);

  // 生命周期函数
  onMounted(() => {
    changeHeight();
  });

  // store相关数据
  const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore);

  // 监听内容高度发生变化
  const customContentPdf = ref<any>(null);
  let observer: ResizeObserver | null = null;
  let height = 0;
  const changeHeight = () => {
    observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        height = (entry.target as HTMLElement).offsetHeight;
        console.log('内容高度发生变化', height);
        emit('contentHeightChange', height);
      }
    });
    observer.observe(customContentPdf.value); // 监听元素
  };

  /**
   * 左右两列布局
   */
  // 左侧列表
  const leftList = ref<any>(
    resumeJsonNewStore.value.COMPONENTS.filter((item) => item.layout === 'left')
  );
  // 右侧列表
  const rightList = ref<any>(
    resumeJsonNewStore.value.COMPONENTS.filter((item) => item.layout === 'right')
  );

  watch(
    leftList,
    () => {
      leftList.value.forEach((item: IMATERIALITEM) => {
        item.layout = 'left';
      });
      resumeJsonNewStore.value.COMPONENTS = leftList.value.concat(rightList.value);
      console.log('最新designJsonStore', resumeJsonNewStore.value.COMPONENTS, leftList.value);
    },
    {
      deep: true
    }
  );
  watch(
    rightList,
    () => {
      rightList.value.forEach((item: IMATERIALITEM) => {
        item.layout = 'right';
      });
      resumeJsonNewStore.value.COMPONENTS = leftList.value.concat(rightList.value);
      console.log('最新designJsonStore', resumeJsonNewStore.value.COMPONENTS, rightList.value);
    },
    {
      deep: true
    }
  );
  // 左侧模块删除
  const leftDelete = (keyId: string) => {
    let index: number = leftList.value.findIndex((item: IMATERIALITEM) => item.keyId === keyId);
    leftList.value.splice(index, 1);
    resumeJsonNewStore.value.COMPONENTS = leftList.value.concat(rightList.value);
  };
  // 右侧模块删除
  const rightDelete = (keyId: string) => {
    let index: number = rightList.value.findIndex((item: IMATERIALITEM) => item.keyId === keyId);
    rightList.value.splice(index, 1);
    resumeJsonNewStore.value.COMPONENTS = leftList.value.concat(rightList.value);
  };
  // 左侧模块复制
  const leftAdd = (modeItem: IMATERIALITEM) => {
    let index: number = leftList.value.findIndex(
      (item: IMATERIALITEM) => item.keyId === modeItem.keyId
    );
    let insert = cloneDeep(modeItem);
    insert.keyId = getUuid();
    leftList.value.splice(index, 0, insert);
    resumeJsonNewStore.value.COMPONENTS = leftList.value.concat(rightList.value);
  };
  // 右侧模块复制
  const rightAdd = (modeItem: IMATERIALITEM) => {
    let index: number = rightList.value.findIndex(
      (item: IMATERIALITEM) => item.keyId === modeItem.keyId
    );
    let insert = cloneDeep(modeItem);
    insert.keyId = getUuid();
    rightList.value.splice(index, 0, insert);
    resumeJsonNewStore.value.COMPONENTS = leftList.value.concat(rightList.value);
  };

  // 上传JSON弹窗
  const dialogVisible = ref<boolean>(false);
  const importJson = () => {
    dialogVisible.value = true;
  };

  // 取消上传JSON
  const cancleJsonDialog = () => {
    dialogVisible.value = false;
  };
</script>
<style lang="scss" scoped>
  @import '../../style/options.scss';
  .content-box {
    // position: relative;
    .dragArea {
      min-width: 820px;
      min-height: 300px;
      width: 820px;
      min-height: 1160px;
      background-color: #fff;
      box-sizing: border-box;
      position: relative;
      z-index: 0;
    }
    .left-box {
      width: v-bind('resumeJsonNewStore.GLOBAL_STYLE.leftWidth');
      box-sizing: border-box;
      background-color: v-bind('resumeJsonNewStore.GLOBAL_STYLE.leftThemeColor');
      min-height: 1160px;
      position: absolute;
      height: 100%;
      .left-drag-area {
        min-height: 1160px;
        width: 100%;
      }
    }
    .right-box {
      min-height: 1160px;
      width: v-bind('resumeJsonNewStore.GLOBAL_STYLE.rightWidth');
      margin-left: v-bind('resumeJsonNewStore.GLOBAL_STYLE.leftWidth');
      background-color: v-bind('resumeJsonNewStore.GLOBAL_STYLE.rightThemeColor');
      .right-drag-area {
        min-height: 1160px;
        width: 100%;
      }
    }
    // 导入json
    .upload-json-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 200px;
      padding: 0 10px;
      background-color: antiquewhite;
      cursor: pointer;
      border-radius: 10px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #74a274;
      user-select: none;
      &:hover {
        background-color: rgba(antiquewhite, 0.5);
        transition: all 0.3s;
      }
      h1 {
        margin: 10px 0;
        font-size: 20px;
      }
      p {
        margin-top: 10px;
        opacity: 0.9;
        font-size: 12px;
      }
    }
  }
</style>
