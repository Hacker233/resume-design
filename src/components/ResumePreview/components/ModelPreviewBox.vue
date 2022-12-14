<template>
  <div v-if="item.show" :ref="(el) => setRefItem(el, item.keyId)" class="material-model-box">
    <component
      :is="components[item.cptName]"
      :class="['mode-item']"
      :model-data="item.data"
      :model-style="item.style"
      :style="getDynamicStyle(item)"
    ></component>
  </div>
</template>
<script lang="ts" setup>
  import { IMATERIALITEM } from '@/interface/material';
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { ComponentPublicInstance } from 'vue';
  defineProps<{
    item: IMATERIALITEM;
    components: any;
  }>();
  // 锚点定位
  const { cptKeyId } = storeToRefs(appStore.useSelectMaterialStore);
  watch(
    () => cptKeyId.value,
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

  // 添加样式
  const getDynamicStyle = (item: IMATERIALITEM) => {
    return {
      width: item.cptWidth
    };
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
      box-sizing: border-box;
    }
  }
</style>
