<template>
  <div class="classic-box">
    <div class="left">
      <template v-for="(item, index) in leftList">
        <div
          class="model-box"
          v-if="item.show"
          :ref="(el) => setRefItem(el, item.model, item.id)"
          @click="selectModel(item.model, item.title, item.id)"
        >
          <component v-if="item.style" :is="components[item.model]" :modelData="item"></component>
        </div>
      </template>
    </div>
    <div class="right">
      <!-- 个人姓名与简介 -->
      <div class="name-abstract-box" @click="selectNameModel">
        <name-abstact></name-abstact>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useResumeJsonStore, useResumeModelStore } from '@/store/resume';
  import { storeToRefs } from 'pinia';
  import {
    ComponentPublicInstance,
    computed,
    onMounted,
    reactive,
    ref,
    watch,
    watchEffect
  } from 'vue';
  import { useModelOptionsComName } from '@/hooks/useModelIndex';
  import BaseInfo from './components/BaseInfo.vue'; // 基础信息
  import SkillSpecialties from './components/SkillSpecialties.vue';
  import NameAbstact from './components/NameAbstact.vue';
  import { IBASEINFO } from '@/types/model';

  const { resumeJsonStore } = storeToRefs(useResumeJsonStore()); // 简历数据

  // 注册局部组件
  const components: any = {
    BASE_INFO: BaseInfo,
    SKILL_SPECIALTIES: SkillSpecialties
  };
  // 左侧锚点定位
  const { id } = storeToRefs(useResumeModelStore());
  watch(
    id,
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

  // 获取左侧ref
  const modelObj = reactive<any>({});
  const setRefItem = (el: ComponentPublicInstance | null | Element, model: string, id: string) => {
    if (el) {
      modelObj[id] = {
        id: id,
        el: el
      };
    }
  };
  // 获取左侧选中组件模块
  const resumeModelStore = useResumeModelStore();
  const selectModel = (model: string, title: string, id: string) => {
    let optionsName: string = useModelOptionsComName(`template2-${model}`);
    resumeModelStore.setResumeModel({ model, optionsName, title, id });
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

  // 基础信息模块
  const modelData: IBASEINFO = resumeJsonStore.value.LIST.find((item) => {
    return item.model == 'BASE_INFO';
  }) as IBASEINFO;
  // 选择姓名简介模块
  const selectNameModel = () => {
    let optionsName: string = useModelOptionsComName(`template2-${modelData?.model}`);
    let model = modelData?.model;
    let title = modelData?.title;
    let id = modelData?.id;
    resumeModelStore.setResumeModel({ model, optionsName, title, id });
  };

  // 右侧组件列表
  // let rightList =
</script>
<script lang="ts">
  export default {
    name: 'template2'
  };
</script>
<style lang="less">
  @import '../template1/style/options.less';
  .classic-box {
    display: flex;
    height: 100%;
    .model-box {
      border: 2px dashed transparent;
      transition: all 0.3s;
      &:hover {
        border-color: #7ec97e !important;
        cursor: pointer;
      }
    }
    .left {
      width: 270px;
      box-sizing: border-box;
      background-color: #254665;
      overflow: hidden;
      position: absolute;
      height: 100%;
      padding: 50px 0 0 0;
      .model-box {
        padding: 10px 30px;
      }
    }
    .right {
      margin-left: 270px;
      padding: 40px 0;
      width: 100%;
      .name-abstract-box {
        border: 2px dashed transparent;
        transition: all 0.3s;
        padding: 0 30px;
        &:hover {
          border-color: #7ec97e !important;
          cursor: pointer;
        }
      }
    }
  }
</style>
