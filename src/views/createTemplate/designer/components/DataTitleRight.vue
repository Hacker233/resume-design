<template>
  <div class="data-title-right-box">
    <!-- 删除图标 -->
    <el-popconfirm
      confirm-button-text="确定"
      cancel-button-text="取消"
      width="220"
      :icon="InfoFilled"
      icon-color="#626AEF"
      title="确定删除模块？数据将不会保留！"
      @confirm="handleDeleteIcon"
    >
      <template #reference>
        <div>
          <el-tooltip effect="light" content="删除模块" placement="bottom">
            <svg-icon icon-name="icon-shanchu5" color="#1e2532" size="24px" />
          </el-tooltip>
        </div>
      </template>
    </el-popconfirm>
    <!-- 复制图标 -->
    <el-tooltip effect="light" content="复制模块" placement="bottom">
      <svg-icon icon-name="icon-copy" color="#1e2532" size="24px" @click="handleCopy" />
    </el-tooltip>
    <!-- 样式设置 -->
    <el-tooltip effect="light" content="样式设置" placement="bottom">
      <svg-icon
        icon-name="icon-tesezhuti"
        color="#1e2532"
        size="24px"
        @click="handleStyleSetting"
      />
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useDeleteModule } from '../hooks/useDeleteModule';
  import { InfoFilled } from '@element-plus/icons-vue';
  import appStore from '@/store';
  import { useCopyModule } from '../hooks/useCopyModule';

  const emit = defineEmits(['openStyleDrawer']);

  const props = defineProps<{
    id: string;
  }>();
  const { selectedModuleId } = storeToRefs(appStore.useCreateTemplateStore);

  // 点击删除图标
  const handleDeleteIcon = () => {
    useDeleteModule(props.id);
    selectedModuleId.value = '';
  };

  // 复制模块
  const handleCopy = () => {
    useCopyModule(props.id);
  };

  // 样式设置
  const handleStyleSetting = () => {
    selectedModuleId.value = props.id;
    emit('openStyleDrawer');
  };
</script>
<style lang="scss" scoped>
  .data-title-right-box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .svg-icon {
      cursor: pointer;
      padding: 3px;
      transition: all 0.3s;
      margin-left: 10px;
      &:hover {
        background-color: #eee;
        border-radius: 4px;
      }
    }
  }
</style>
