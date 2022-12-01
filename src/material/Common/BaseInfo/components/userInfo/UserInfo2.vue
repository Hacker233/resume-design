<template>
  <div class="user-info">
    <ul>
      <li v-show="isShow.age" class="li-border">
        <svg-icon icon-name="icon-renwu-ren" color="#fff"></svg-icon>
        <span>{{ modelData.age }}岁</span>
      </li>
      <li v-show="isShow.address" class="li-border">
        <svg-icon icon-name="icon-dizhi" color="#fff" size="16px"></svg-icon>
        <span>{{ modelData.address }}</span>
      </li>
      <li v-show="isShow.workService" class="li-border">
        <svg-icon icon-name="icon-gongzuojingyan" color="#fff"></svg-icon>
        <span>{{ modelData.workService }}年经验</span>
      </li>
      <li v-show="isShow.phoneNumber" class="li-border">
        <svg-icon icon-name="icon-dianhua1" color="#fff"></svg-icon>
        <span>{{ modelData.phoneNumber }}</span>
      </li>
      <li v-show="isShow.email">
        <svg-icon icon-name="icon-youxiang" color="#fff"></svg-icon>
        <span>{{ modelData.email }}</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
  import { IBASEINFO } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  const props = defineProps<{
    modelData: IBASEINFO; // 模块数据
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
  const isShow = reactive(props.modelData.isShow);
</script>
<style lang="scss" scoped>
  .user-info {
    width: 100%;
    ul {
      display: flex;
      flex-direction: column;
      li {
        height: 35px;
        display: flex;
        align-items: center;
        list-style: none;
        color: v-bind('modelStyle.textColor');
        font-size: v-bind('modelStyle.textFontSize');
        font-weight: v-bind('modelStyle.textFontWeight');
        & :first-child {
          margin-right: 10px;
        }
        span {
          letter-spacing: 2px;
        }
      }
    }
  }
</style>
