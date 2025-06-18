<template>
  <div class="template-card-box" @mouseover="mouseover" @mouseleave="mouseleave">
    <img :src="type === 'old' ? cardData.previewUrl : cardData.template_cover" alt="" srcset="" />
    <!-- 遮罩层 -->
    <div v-show="isShowLayer" class="mask-layer">
      <div class="design-button" @click="importData">导入数据</div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import 'element-plus/es/components/message-box/style/index';
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { cloneDeep } from 'lodash';
  import { ElNotification } from 'element-plus';

  const emit = defineEmits(['importSuccess']);

  const props = defineProps<{
    cardData: any;
    type: string;
  }>();

  // 鼠标移入显示遮罩层
  let isShowLayer = ref<boolean>(false);
  const mouseover = () => {
    isShowLayer.value = true;
  };
  const mouseleave = () => {
    isShowLayer.value = false;
  };

  // 点击导入数据
  const importData = async () => {
    try {
      // 1. 检查是否有可导入的数据
      if (!props.cardData?.template_json?.componentsTree?.length) {
        console.error('导入数据失败：缺少有效的模板数据');
        return;
      }

      // 2. 显示确认对话框
      const confirmResult = await ElMessageBox.confirm(
        '<div style="text-align: left;">\n  <p>导入数据将覆盖当前简历内容，是否继续？</p>\n  <p style="margin-top: 10px;"><strong>请注意：</strong></p>\n  <ul style="margin-top: 5px; padding-left: 20px;">\n    <li>由于模板差异，数据导入不确保完整</li>\n    <li>由于模板样式差异，导入的数据显示可能不正确，请导入后自行调整样式</li>\n  </ul>\n</div>',
        '警告',
        {
          confirmButtonText: '立即导入',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        }
      ).catch(() => false);

      if (!confirmResult) {
        console.log('用户取消了导入操作');
        return;
      }

      console.log('开始导入数据', props.cardData);

      // 3. 获取数据
      const importTemplateJson = props.cardData.template_json;
      const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);

      // 4. 深度克隆当前模板
      const templateJson = cloneDeep(HJNewJsonStore.value);

      if (!templateJson?.componentsTree?.length) {
        console.error('导入数据失败：当前模板结构异常');
        return;
      }

      // 5. 执行数据合并
      templateJson.componentsTree.forEach((element: any) => {
        const matchingImportElement = importTemplateJson.componentsTree.find(
          (importElement: any) => element.category === importElement.category
        );

        if (matchingImportElement && matchingImportElement.dataSource) {
          element.dataSource = matchingImportElement.dataSource;
        }
      });

      // 6. 更新存储
      HJNewJsonStore.value = templateJson;
      console.log('数据导入成功');
      const { dataConfigKey } = storeToRefs(appStore.useCreateTemplateStore);
      dataConfigKey.value++;
      emit('importSuccess');
    } catch (error) {
      console.error('导入数据时发生错误:', error);
      ElNotification({
        title: '导入失败',
        message: error instanceof Error ? error.message : String(error),
        type: 'error'
      });
      // 可以在这里添加错误提示，例如使用 ElMessage.error
    }
  };
</script>
<style lang="scss" scoped>
  .template-card-box {
    width: 260px;
    height: 365px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    z-index: 0;
    user-select: none;
    overflow: hidden;
    transition: all 0.3s;
    box-shadow: 5px 5px 5px 0px rgba(165, 128, 128, 0.2);
    margin-bottom: 15px;
    &:hover {
      transition: all 0.1s;
      box-shadow: 5px 5px 5px 0px rgba(175, 50, 50, 0.2);
    }
    img {
      width: 100%;
    }
    .mask-layer {
      height: 100%;
      width: 100%;
      border-radius: 5px;
      position: absolute;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.3s;
      z-index: 1;
      transition: all 0.3s;
      .design-button {
        width: 100px;
        height: 30px;
        font-size: 13px;
        background-color: #2cbd99;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        transition: all 0.3s;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        &:hover {
          background-color: rgba(#42aa90, 0.7);
        }
      }
    }
  }
  .previewImg {
    height: 90vh;
  }
</style>
