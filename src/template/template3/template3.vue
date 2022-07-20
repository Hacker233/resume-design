<template>
  <div class="template3-box">
    <!-- 简历模块 -->
    <template v-for="item in resumeJsonStore.LIST">
      <model-box-vue :item="item" :components="components" v-if="!isTitleAndBaseInfo(item)">
      </model-box-vue>
      <div class="model-box-wraper" v-else>
        <model-box-vue :item="item" :components="components" class="model-other-class">
          <!-- 模块标题 -->
          <template v-slot:model-title v-if="isTitleAndBaseInfo(item)">
            <model-title :title="item.title" :iconfont="item.iconfont"></model-title>
          </template>
        </model-box-vue>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import BaseInfoVue from './components/BaseInfo.vue';
  import JobIntentionVue from './components/JobIntention.vue';
  import { useResumeJsonStore } from '@/store/resume';
  import { storeToRefs } from 'pinia';
  import ModelBoxVue from '@/components/ModelBox/ModelBox.vue';
  import ModelTitle from './components/ModelTitle.vue';

  const { resumeJsonStore } = storeToRefs(useResumeJsonStore());
  // 注册局部组件
  const components: any = {
    BASE_INFO: BaseInfoVue,
    JOB_INTENTION: JobIntentionVue
  };

  // 判断是否是我的简历和基础资料模块
  const isTitleAndBaseInfo = (item: { model: string }) => {
    return item.model !== 'RESUME_TITLE' && item.model !== 'BASE_INFO';
  };
</script>

<script lang="ts">
  export default {
    name: 'template3'
  };
</script>
<style lang="less" scoped>
  .template3-box {
    background: url(../../assets/images/template3_bg_2.png);
    background-repeat: no-repeat;
    min-height: 1160px;
    .model-box-wraper {
      position: relative;
      &::before {
        content: '';
        position: absolute;
        width: 1px;
        height: 100%;
        background-color: #589bf7;
        left: 55px;
        top: 1px;
      }
      .model-other-class {
        padding: 0 40px;
      }
    }
  }
</style>
