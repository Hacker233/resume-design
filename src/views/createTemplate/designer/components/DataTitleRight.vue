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
          <el-tooltip
            effect="light"
            :content="isCanDelete ? '删除模块' : '无法删除最后一个模块'"
            placement="bottom"
          >
            <svg-icon
              :class="['delete-icon', { 'not-delete': !isCanDelete }]"
              icon-name="icon-shanchu5"
              color="#1e2532"
              size="24px"
              @click="handleClickDelete"
            />
          </el-tooltip>
        </div>
      </template>
    </el-popconfirm>
    <!-- 复制图标 -->
    <el-tooltip effect="light" content="复制模块" placement="bottom">
      <svg-icon icon-name="icon-copy" color="#1e2532" size="24px" @click.stop="handleCopy" />
    </el-tooltip>
    <!-- 样式设置 -->
    <el-tooltip effect="light" content="样式设置" placement="bottom">
      <svg-icon
        icon-name="icon-tesezhuti"
        color="#1e2532"
        size="24px"
        @click.stop="handleStyleSetting"
      />
    </el-tooltip>
    <!-- 显示或隐藏模块 -->
    <el-tooltip effect="light" :content="isShowModule ? '隐藏' : '显示'" placement="bottom">
      <svg-icon
        v-if="isShowModule"
        icon-name="icon-jurassic_openeyes"
        color="#1e2532"
        size="26px"
        @click.stop="handleChangeSwitch(false)"
      />
      <svg-icon
        v-else
        icon-name="icon-closeEye"
        color="#1e2532"
        size="26px"
        @click.stop="handleChangeSwitch(true)"
      />
    </el-tooltip>
    <!-- 展开收起 -->
    <el-tooltip effect="light" :content="isUnfold ? '收起' : '展开'" placement="bottom">
      <svg-icon
        :class="['unfold', { collapse: !isUnfold }]"
        icon-name="icon-shangyi"
        color="#1e2532"
        size="24px"
        @click.stop="handleUnfold"
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
  import { IModule } from '../../types/IHJNewSchema';

  const emit = defineEmits([
    'openStyleDrawer',
    'handleUnfold',
    'handleCollapse',
    'handleChangeSwitch'
  ]);

  const props = defineProps<{
    id: string;
    isUnfold: boolean;
    isShowModule: boolean;
    module: IModule;
  }>();
  const { selectedModuleId, HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);

  // 当前模块是否允许删除
  const route = useRoute();
  const isCanDelete = computed(() => {
    if (route.query.type === 'create') return true;
    for (let i = 0; i < HJNewJsonStore.value.componentsTree.length; i++) {
      const element = HJNewJsonStore.value.componentsTree[i];
      if (props.id !== element.id && props.module.category === element.category) {
        return true;
      }
    }
    return false;
  });

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

  // 收起
  const handleUnfold = () => {
    if (props.isUnfold) {
      emit('handleUnfold');
    } else {
      emit('handleCollapse');
    }
  };

  // 展示隐藏变化
  const handleChangeSwitch = (value: boolean) => {
    emit('handleChangeSwitch', value);
  };

  // 点击删除图标
  const handleClickDelete = (event: { stopPropagation: () => void }) => {
    if (!isCanDelete.value) {
      console.log('阻止删除');
      event.stopPropagation();
    }
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
    .unfold {
      transition: all 0.3s;
    }
    .collapse {
      transform: rotate(-180deg);
      transition: all 0.3s;
    }
    .not-delete {
      cursor: not-allowed;
    }
  }
</style>
