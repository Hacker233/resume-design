<template>
  <div class="base-info">
    <!-- 个人头像 -->
    <template v-if="!modelData.avatarShape">
      <div v-show="isShow.avatar" class="avatar-box">
        <el-image style="width: 115px; height: 146px" :src="modelData.avatar" />
      </div>
    </template>
    <template v-else>
      <div v-show="isShow.avatar" class="avatar-shape-box">
        <component :is="avatarComponents[modelData.avatarShape]"></component>
      </div>
    </template>
    <!-- 基础信息 -->
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
  </div>
</template>
<script lang="ts" setup>
  import { IBASEINFO } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import avatarComponents from '@/utils/registerAvatarCom';
  const props = defineProps<{
    modelData: IBASEINFO; // 模块数据
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
  const isShow = reactive(props.modelData.isShow);
</script>
<style lang="scss" scoped>
  .base-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');

    .avatar-box {
      width: 115px;
      height: 150px;
      border: 3px solid #e5e5e5;
      overflow: hidden;
      background-color: #eee;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 40px;
    }
    .avatar-shape-box {
      margin-bottom: 40px;
    }
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
  }
</style>
