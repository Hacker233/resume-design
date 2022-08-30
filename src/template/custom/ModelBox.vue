<template>
  <div
    v-if="item.show"
    :ref="(el) => setRefItem(el, item.keyId)"
    class="material-model-box"
    @click="selectModel"
    @mouseover="handleMouseover"
    @mouseleave="handleMouseleave"
  >
    <!-- 模块操作区域 -->
    <div v-show="hoverId === item.keyId" class="edit-box">
      <el-tooltip class="box-item" effect="dark" content="复制当前模块">
        <div class="copy" @click.stop="addModel">
          <svg-icon icon-name="icon-jia" class-name="icon" color="#fff" size="16px"></svg-icon>
        </div>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="删除当前模块">
        <div class="delete" @click.stop="useDeleteModel(item)">
          <svg-icon
            icon-name="icon-shanchu"
            class-name="icon icon-shanchu"
            color="#fff"
            size="18px"
          ></svg-icon>
        </div>
      </el-tooltip>
    </div>
    <component
      :is="components[item.cptName]"
      :class="['mode-item', { isHover: hoverId === item.keyId }]"
      :model-data="item.data"
      :model-style="item.style"
      :style="getDynamicStyle(item)"
    ></component>
  </div>
</template>
<script lang="ts" setup>
  import { IMATERIALITEM } from '@/interface/material';
  import appStore from '@/store';
  import { getUuid } from '@/utils/common';
  import { cloneDeep } from 'lodash';
  import { storeToRefs } from 'pinia';
  import { ComponentPublicInstance } from 'vue';
  import { useDeleteModel } from '@/hooks/useDeleteModel';
  const emit = defineEmits(['leftRightDelete', 'leftRightAdd']);
  const props = defineProps<{
    item: IMATERIALITEM;
    components: any;
  }>();
  const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore);
  const route = useRoute();
  const { name } = route.query; // 模板id和模板名称
  // 锚点定位
  const { cptKeyId } = storeToRefs(appStore.useSelectMaterialStore);
  watch(
    cptKeyId,
    (newVal, oldVal) => {
      // 判断是否选中复选框
      if (oldVal && modelObj[oldVal]) {
        modelObj[oldVal].el.style.borderColor = 'transparent';
      }
      // 如果选中了模块
      if (newVal && modelObj[newVal]) {
        modelObj[newVal].el.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 该模块显示在可视区域内
        modelObj[newVal].el.style.borderColor = '#7ec97e';
      }
    },
    {
      deep: true
    }
  );
  // 模块ref
  const modelObj = reactive<any>({});
  const setRefItem = (el: ComponentPublicInstance | null | Element, keyId: string) => {
    if (el) {
      modelObj[keyId] = {
        id: keyId,
        el: el
      };
    }
  };

  // 鼠标移入效果
  const hoverId = ref<string>('');
  const handleMouseover = () => {
    hoverId.value = props.item.keyId;
  };
  // 鼠标移出效果
  const handleMouseleave = () => {
    hoverId.value = '';
  };
  // 添加样式
  const getDynamicStyle = (item: IMATERIALITEM) => {
    return {
      width: item.cptWidth
    };
  };
  // 点击选择模块
  const { updateSelectModel, resetSelectModel } = appStore.useSelectMaterialStore;
  const selectModel = () => {
    console.log('keyId', props.item.keyId);
    // 更新store
    updateSelectModel(
      props.item.model,
      props.item.cptOptionsName,
      props.item.cptTitle,
      props.item.keyId
    );
  };

  // 删除当前模块
  const deleteModel = () => {
    if (resumeJsonNewStore.value.LAYOUT === 'classical') {
      classicalDelete();
    } else {
      emit('leftRightDelete', props.item.keyId);
    }
    resetSelectModel(); // 重置选中模块
  };

  // 传统模块删除
  const classicalDelete = () => {
    let index: number = resumeJsonNewStore.value.COMPONENTS.findIndex(
      (item) => item.keyId === props.item.keyId
    );
    resumeJsonNewStore.value.COMPONENTS.splice(index, 1);
  };

  // 复制当前模块
  const addModel = () => {
    if (resumeJsonNewStore.value.LAYOUT === 'classical') {
      classicalAdd();
    } else {
      emit('leftRightAdd', props.item);
    }
  };

  // 传统布局删除
  const classicalAdd = () => {
    let index: number = resumeJsonNewStore.value.COMPONENTS.findIndex(
      (item) => item.keyId === props.item.keyId
    );
    let insert = cloneDeep(props.item);
    insert.keyId = getUuid();
    resumeJsonNewStore.value.COMPONENTS.splice(index, 0, insert);
  };
</script>
<style lang="scss" scoped>
  .material-model-box {
    border: 1px dashed transparent;
    transition: all 0.3s;
    position: relative;
    .mode-item {
      border: 1px dashed transparent;
      position: relative;
      // border-radius: 8px;
      // overflow: hidden;
      user-select: none;
      box-sizing: border-box;
      &:hover {
        border: 1px dashed #7ec97e;
        cursor: move;
      }
    }
    .isHover {
      position: relative;
      &::after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba($color: #000000, $alpha: 0.1);
      }
    }
    .edit-box {
      position: absolute;
      right: 0px;
      top: -35px;
      display: flex;
      .copy,
      .delete {
        width: 35px;
        height: 35px;
        background-color: #00c091;
        border-radius: 3px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background-color: rgba(#00c091, 0.8);
        }
      }
      .delete {
        margin-left: 6px;
      }
    }
  }
</style>
