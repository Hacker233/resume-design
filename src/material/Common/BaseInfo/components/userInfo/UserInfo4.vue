<template>
  <div class="user-info">
    <div class="detail">
      <ul>
        <li v-show="isShow.age">{{ modelData.age }}岁</li>
        <li v-show="isShow.address">{{ modelData.address }}</li>
        <li v-show="isShow.workService">{{ modelData.workService }}年经验</li>
        <li v-show="isShow.phoneNumber">{{ modelData.phoneNumber }}</li>
        <li v-show="isShow.email">{{ modelData.email }}</li>
      </ul>
    </div>
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 15px;
    .detail {
      ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        li {
          list-style: none;
          font-size: v-bind('modelStyle.textFontSize');
          font-weight: v-bind('modelStyle.textFontWeight');
          height: 18px;
          margin-right: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: v-bind('modelStyle.textColor');
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
