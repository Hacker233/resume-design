<template>
  <div class="main-left-box">
    <template v-for="(val, key) in MATERIAL_JSON">
      <div>
        <p>{{ key }}</p>
        <template v-for="(item, index) in val">
          <div
            class="com-item"
            draggable="true"
            @dragstart="ondragstart($event, item)"
            @dragend="handleDragend"
            :ref="(el) => setColumnRefs(el, item.keyId)"
          >
            {{ item.cptTitle }}
          </div>
        </template>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { IMATERIALITEM } from '@/interface/material.js';
  import { MATERIAL_JSON } from '@/schema/design';
  import { ComponentPublicInstance } from 'vue';

  // 获取模块ref
  let cptRefs: Array<any> = []; // 分割线的ref
  const setColumnRefs = (el: Element | ComponentPublicInstance | null, keyId: string) => {
    if (el) {
      cptRefs.push({
        keyId: keyId,
        el: el
      });
    }
  };

  // 拖拽开始
  const ondragstart = (evt: DragEvent, item: IMATERIALITEM) => {
    evt.dataTransfer?.setData('cptData', JSON.stringify(item));
    console.log('源对象拖拽开始', evt);
  };
  // 拖拽结束
  const handleDragend = (evt: DragEvent) => {
    evt.dataTransfer?.clearData();
    console.log('源数据拖拽结束', evt);
  };
</script>
<style lang="scss" scoped>
  .main-left-box {
    width: 300px;
    background-color: #fff;
    .com-item {
      width: 150px;
      height: 150px;
      background-color: #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: move;
    }
  }
</style>
