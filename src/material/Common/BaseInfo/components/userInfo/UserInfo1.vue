<template>
  <div class="user-info-1-box">
    <h1>{{ modelData.name }}</h1>
    <p v-show="isShow.abstract" v-dompurify-html="modelData.abstract" class="user-abstract"></p>
    <div class="bottom">
      <!-- 年龄、地点、经验等信息 -->
      <ul>
        <li v-show="isShow.age" class="li-border">{{ modelData.age }}岁</li>
        <li v-show="isShow.address" class="li-border">{{ modelData.address }}</li>
        <li v-show="isShow.workService" class="li-border">{{ modelData.workService }}年经验</li>
        <li v-show="isShow.phoneNumber" class="li-border">{{ modelData.phoneNumber }}</li>
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
  .user-info-1-box {
    h1 {
      margin: 0;
      font-size: v-bind('modelStyle.titleFontSize');
      color: v-bind('modelStyle.titleColor');
      font-weight: v-bind('modelStyle.titleFontWeight');
      margin-bottom: 20px;
    }
    p {
      color: v-bind('modelStyle.textColor');
      font-size: v-bind('modelStyle.textFontSize');
      font-weight: v-bind('modelStyle.textFontWeight');
    }
    .bottom {
      height: 45px;
      display: flex;
      align-items: flex-end;
      ul {
        display: flex;
        li {
          list-style: none;
          font-size: v-bind('modelStyle.textFontSize');
          font-weight: v-bind('modelStyle.textFontWeight');
          padding-right: 12px;
          height: 20px;
          margin-right: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: v-bind('modelStyle.textColor');
        }
        .li-border {
          border-right: 2px solid #b4b4b4;
        }
      }
    }
  }
</style>
