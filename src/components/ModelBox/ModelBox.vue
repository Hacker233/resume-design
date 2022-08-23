<template>
  <div
    v-if="item.show && item.style"
    :ref="(el) => setRefItem(el, item.model, item.keyId)"
    :class="[
      'model-box',
      { 'is-have-border': item.keyId === appStore.useSelectMaterialStore.cptKeyId }
    ]"
    @click="selectModel(item.model, item.cptTitle, item.keyId)"
    @mouseover="modelHover(item.keyId)"
    @mouseleave="modelMouseleave"
  >
    <!-- 模块操作区域 -->
    <div v-show="hoverCurrentId === item.keyId" class="edit-box">
      <el-tooltip class="box-item" effect="dark" content="复制当前模块">
        <div class="copy" @click="useCopyModel(item)">
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
    <!-- 模块标题 -->
    <slot name="model-title"></slot>
    <component
      :is="components[item.model]"
      v-if="item.style"
      :model-data="item"
      :data="item.data"
    ></component>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { ComponentPublicInstance, reactive, ref, watch } from 'vue';
  import { useCopyModel } from '@/hooks/useCopyModel';
  import { useDeleteModel } from '@/hooks/useDeleteModel';
  import { storeToRefs } from 'pinia';
  import { useRoute } from 'vue-router';
  import { IMATERIALITEM } from '@/interface/material';

  const props = defineProps<{
    item: IMATERIALITEM;
    components: any;
  }>();
  // 锚点定位
  const { cptKeyId } = storeToRefs(appStore.useSelectMaterialStore);
  watch(
    cptKeyId,
    (newVal, oldVal) => {
      // 如果选中了模块
      if (newVal && modelObj[newVal]) {
        modelObj[newVal].el.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 该模块显示在可视区域内
      }
    },
    {
      deep: true
    }
  );

  // 鼠标移入模块
  const hoverCurrentId = ref<string>('');
  const modelHover = (keyId: string) => {
    hoverCurrentId.value = keyId;
  };

  // 鼠标移出模块
  const modelMouseleave = () => {
    hoverCurrentId.value = '';
  };

  // 模块ref
  const modelObj = reactive<any>({});
  const setRefItem = (
    el: ComponentPublicInstance | null | Element,
    model: string,
    keyId: string
  ) => {
    if (el) {
      modelObj[keyId] = {
        keyId: keyId,
        el: el
      };
    }
  };

  // 点击模块
  const { updateSelectModel } = appStore.useSelectMaterialStore;
  const route = useRoute();
  const selectModel = (model: string, title: string, keyId: string) => {
    let optionsName: string = props.item.cptOptionsName;
    console.log('optionsName', optionsName);
    // 更新store
    updateSelectModel(model, optionsName, title, keyId);
  };
</script>
<style lang="scss" scoped>
  .model-box {
    border: 1px dashed transparent;
    transition: all 0.3s;
    position: relative;
    &:hover {
      border-color: #7ec97e !important;
      cursor: pointer;
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
  .is-have-border {
    border-color: #7ec97e;
  }
</style>
