<template>
  <div class="classic-box">
    <div class="left">
      <template v-for="(item, index) in leftList">
        <div
          class="model-box"
          v-if="item.show"
          :ref="(el) => setRefItem(el, item.model)"
          @click="selectModel(item.model, item.title, item.id)"
        >
          <component :is="components[item.model]" :modelData="item"></component>
        </div>
      </template>
    </div>
    <div class="right"></div>
  </div>
</template>
<script setup lang="ts">
  import { useResumeJsonStore, useResumeModelStore } from '@/store/resume';
  import { storeToRefs } from 'pinia';
  import { ComponentPublicInstance, computed, reactive, ref, watch, watchEffect } from 'vue';
  import BaseInfo from './components/BaseInfo.vue';

  const { resumeJsonStore } = storeToRefs(useResumeJsonStore()); // 简历数据
  console.log('模板2json', resumeJsonStore);

  // 注册局部组件
  const components: any = {
    BASE_INFO: BaseInfo
  };
  // 左侧锚点定位
  const { model } = storeToRefs(useResumeModelStore());
  watch(
    model,
    (newVal, oldVal) => {
      // 判断是否选中复选框
      if (oldVal && modelObj[oldVal]) {
        modelObj[oldVal].style.borderColor = 'transparent';
      }
      // 如果选中了模块
      if (newVal && modelObj[newVal]) {
        modelObj[newVal].scrollIntoView({ behavior: 'smooth', block: 'center' }); // 该模块显示在可视区域内
        modelObj[newVal].style.borderColor = '#7ec97e';
      }
    },
    {
      deep: true
    }
  );

  // 获取左侧ref
  const modelObj = reactive<any>({});
  const setRefItem = (el: ComponentPublicInstance | null | Element, model: string) => {
    if (el) {
      modelObj[model] = el;
    }
  };
  // 获取左侧选中组件模块
  const resumeModelStore = useResumeModelStore();
  const selectModel = (model: string, title: string, id: number) => {
    resumeModelStore.setResumeModel({ model, title, id });
  };

  // 左侧组件列表
  let leftList = ref<any>(
    resumeJsonStore.value.LIST.filter((item) => {
      return item.model === 'BASE_INFO' || item.model === 'SKILL_SPECIALTIES';
    })
  );
  watch(resumeJsonStore.value, () => {
    console.log('发生变化');
    leftList.value = resumeJsonStore.value.LIST.filter((item) => {
      return item.model === 'BASE_INFO' || item.model === 'SKILL_SPECIALTIES';
    });
  });
  
  // 右侧组件列表
  
</script>
<script lang="ts">
  export default {
    name: 'classic'
  };
</script>
<style lang="less">
  @import '../template1/style/options.less';
  .classic-box {
    display: flex;
    height: 100%;
    .left {
      width: 270px;
      box-sizing: border-box;
      background-color: #254665;
      position: absolute;
      height: 100%;
      overflow: hidden;
      padding: 20px 30px 40px 30px;
    }
  }
</style>
