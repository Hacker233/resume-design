<!-- 技能特长 -->
<template>
  <div class="skill-specialties">
    <!-- 标题 -->
    <model-title :title="modelData.title" :model-style="modelStyle"></model-title>
    <!-- 内容区域 -->
    <div class="skill-specialties-14-content-box">
      <!-- 左侧 -->
      <div class="left">
        <img src="@/assets/images/modulelist.png" alt="列表" />
        <img class="moduleborder" src="@/assets/images/moduleborder.png" alt="边框" />
      </div>
      <!-- 技能特长 -->
      <skill-specialties3-vue
        :model-data="modelData"
        :model-style="modelStyle"
      ></skill-specialties3-vue>
    </div>
  </div>
</template>
<script setup lang="ts">
  import ModelTitle from '@/material/ModelTitle/ModelTitle9/ModelTitle.vue';
  import { ISKILLSPECIALTIES } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import SkillSpecialties3Vue from '@/material/Common/SkillSpecialties/SkillSpecialties3.vue';
  defineProps<{
    modelData: ISKILLSPECIALTIES;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .skill-specialties {
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    box-sizing: border-box;
    margin-top: v-bind('modelStyle.mTop');
    margin-bottom: v-bind('modelStyle.mBottom');
    .skill-specialties-14-content-box {
      display: flex;
      margin-top: 25px;
      justify-content: space-between;
      .left {
        width: 74px;
        margin-top: 5px;
        position: relative;
        .moduleborder {
          position: absolute;
          top: 3px;
          left: 22px;
          height: 100%;
        }
      }
      :deep(.skill-specialties-content) {
        flex: 1;
      }
    }
  }
</style>
