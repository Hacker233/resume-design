<template>
  <div class="base-info-7-box">
    <!-- 基本信息 -->
    <div class="user-info">
      <div class="top">
        <!-- 个人头像 -->
        <template v-if="!modelData.avatarShape">
          <div v-show="isShow.avatar" class="avatar-box">
            <el-image style="width: 115px; height: 145px" :src="modelData.avatar" />
          </div>
        </template>
        <template v-else>
          <div v-show="isShow.avatar" class="avatar-shape-box">
            <component :is="avatarComponents[modelData.avatarShape]"></component>
          </div>
        </template>
        <div class="right">
          <h1>{{ modelData.name }}</h1>
          <p
            v-show="isShow.abstract"
            v-dompurify-html="modelData.abstract"
            class="user-abstract"
          ></p>
          <div class="bottom">
            <!-- 年龄、地点、经验等信息 -->
            <ul>
              <li v-show="isShow.age" class="li-border">{{ modelData.age }}岁</li>
              <li v-show="isShow.address" class="li-border">{{ modelData.address }}</li>
              <li v-show="isShow.workService" class="li-border"
                >{{ modelData.workService }}年经验</li
              >
              <li v-show="isShow.phoneNumber" class="li-border">{{ modelData.phoneNumber }}</li>
              <li v-show="isShow.email">{{ modelData.email }}</li>
            </ul>
          </div>
        </div>
      </div>
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
  .base-info-7-box {
    width: 100%;
    cursor: pointer;
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    box-sizing: border-box;
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
    .user-info {
      display: flex;
      flex-direction: column;
      .top {
        display: flex;
        align-items: flex-end;
        .avatar-box {
          width: 118px;
          height: 150px;
          overflow: hidden;
          background-color: #eee;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid #eee;
          margin-right: 50px;
        }
        .avatar-shape-box {
          margin-right: 50px;
        }
        .right {
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
      }
    }
  }
</style>
