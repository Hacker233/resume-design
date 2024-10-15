<!-- 新增文章分类弹窗 -->
<template>
  <el-dialog
    :model-value="dialogPageVisible"
    title="请选择背景页面（切换页面会导致数据重置）"
    width="700px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
  >
    <div class="create-template-page-select-warpper">
      <div v-for="(value, key, index) in pageList" :key="index" class="img-box">
        <!-- 选中标记 -->
        <div v-if="value.props.pageName == selectedPageName" class="current-mark-bgc"></div>
        <div v-if="value.props.pageName == selectedPageName" class="current-mark">
          <svg-icon icon-name="icon-duigou_kuai" color="#fff" size="16px"></svg-icon>
        </div>
        <img
          :src="getImgListStyleImageFile(value.props.screenShot)"
          alt="图片"
          lazy
          @click="selectPage(value)"
        />
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import pageSchemas from '../schema/pageSchema/index';
  import appStore from '@/store';
  import { getImgListStyleImageFile } from '../utils/getImgListStyleImageFile';
  import { cloneDeep } from 'lodash';
  import { getUuid } from '@/utils/common';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogPageVisible: boolean;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogPageVisible: false
  });

  const pageList = cloneDeep(pageSchemas);
  const { HJNewJsonStore, selectedPageName } = storeToRefs(appStore.useCreateTemplateStore);

  watch(
    () => props.dialogPageVisible,
    async (newVal) => {
      if (newVal) {
        selectedPageName.value = HJNewJsonStore.value.props.pageName;
        console.log('弹窗打开', selectedPageName.value);
      }
    }
  );

  // 取消
  const cancle = () => {
    emit('cancle');
  };

  // 选择模版
  const selectPage = (value: any) => {
    selectedPageName.value = value.props.pageName;
  };

  // 提交
  const submit = () => {
    HJNewJsonStore.value.props.pageName = selectedPageName.value; // 设置页面
    HJNewJsonStore.value = pageSchemas[selectedPageName.value]; // 重新初始化json数据
    HJNewJsonStore.value.id = getUuid();
    cancle();
    console.log('弹窗关闭', HJNewJsonStore.value);
  };
</script>
<style lang="scss">
  .create-template-page-select-warpper {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(5, 1fr); /* 每行展示5个图片 */
    gap: 16px; /* 设置行间距和水平间距 */
    .img-box {
      display: flex;
      width: 120px;
      height: 160px;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: rgba(99, 100, 99, 0.2) 0px 0px 10px;
      position: relative;
      &:hover {
        box-shadow: rgba(99, 100, 99, 0.5) 0px 0px 10px;
      }
      .current-mark-bgc {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        right: 0;
        top: 0;
        border: 20px solid;
        border-color: #2ddd9d #2ddd9d transparent transparent;
        z-index: 10;
      }
      // 标记当前模板
      .current-mark {
        position: absolute;
        right: 5px;
        top: 3px;
        z-index: 11;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
