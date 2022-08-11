<template>
  <div class="main-left-box">
    <div class="left-box">
      <div class="left-title" @click="selectNone">
        <span>模块</span>
        <span>选择</span>
      </div>
      <ul>
        <li
          :class="[{ active: currentKey === key }]"
          v-for="(val, key) in MATERIAL_JSON"
          @click="selectModel(val, key as string)"
        >
          <svg-icon :iconName="modelOfIcon[key]" color="#2cbd99" size="25px"></svg-icon>
          <p>{{ modelOfTitle[key] }}</p>
        </li>
      </ul>
    </div>
    <div class="right-box">
      <template v-if="currentKey">
        <!-- 标题 -->
        <div class="title">
          <h1>{{ currentTitle }}</h1>
        </div>
        <!-- 组件列表 -->
        <div class="cpt-list-box">
          <div
            v-for="(item, index) in cptList"
            class="com-item"
            draggable="true"
            @dragstart="ondragstart($event, item)"
            @dragend="handleDragend"
            :ref="(el) => setColumnRefs(el, item.keyId)"
          >
            <el-tooltip class="box-item" effect="light" placement="right">
              <template #content>
                <img
                  :src="getAssetsMaterialFile(currentKey, cptOfImg[currentKey][item.cptName].url)"
                  style="max-width: 400px"
                  alt=""
                  srcset=""
                />
              </template>
              <img
                :src="getAssetsMaterialFile(currentKey, cptOfImg[currentKey][item.cptName].url)"
                :style="{
                  height: cptOfImg[currentKey][item.cptName].height,
                  width: cptOfImg[currentKey][item.cptName].width
                }"
                alt=""
                srcset=""
              />
            </el-tooltip>
          </div>
        </div>
      </template>
      <div v-else>
        <el-empty description="请在左侧选择模块" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { IMATERIALITEM } from '@/interface/material.js';
  import { MATERIAL_JSON } from '@/schema/design';
  import modelOfIcon from '@/dictionary/modelOfIcon';
  import modelOfTitle from '@/dictionary/modelOfTitle';
  import { ComponentPublicInstance } from 'vue';
  import modelCategory from '@/dictionary/modelOfTitle';
  import { getAssetsMaterialFile } from '@/utils/common';
  import cptOfImg from '@/dictionary/ctpOfImg';

  // 点击模块选择
  const currentKey = ref<string>('');
  const currentTitle = ref<string>('物料组件');
  let cptList = ref<Array<any>>([]);
  const selectModel = (val: Array<any>, key: string) => {
    currentTitle.value = modelCategory[key];
    currentKey.value = key;
    cptList.value = val;
    console.log('cptList', cptList);
  };

  // 重置模块
  const selectNone = () => {
    currentKey.value = '';
  };

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
    width: 350px;
    background-color: #fff;
    display: flex;
    .left-box {
      width: 60px;
      border-right: 1px solid #eee;
      .left-title {
        width: 100%;
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        color: #2cbd99;
        box-sizing: border-box;
        user-select: none;
        cursor: pointer;
        span {
          font-size: 17px;
          font-weight: 600;
          font-family: cursive;
        }
      }
      ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        li {
          list-style: none;
          width: 100%;
          height: 60px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          border-bottom: 1px solid #eee;
          cursor: pointer;
          transition: all 0.3s;
          user-select: none;
          &:hover {
            background-color: rgba(#2cbd99, 0.2);
          }
          p {
            font-size: 9px;
            color: #2cbd99;
            transform: scale(0.9);
          }
        }
        .active {
          background-color: rgba(#2cbd99, 0.2);
        }
      }
    }
    .right-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      .title {
        user-select: none;
        height: 60px;
        width: 100%;
        display: flex;
        background-color: #fff;
        align-items: center;
        justify-content: center;
        position: sticky;
        top: 0;
        z-index: 10;
        padding: 0 12px;
        box-sizing: border-box;
        // box-shadow: 0 5px 21px 0 rgb(78 78 78 / 8%);
        &::after {
          content: '';
          width: 100%;
          height: 1px;
          background-color: #eee;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 0);
        }

        h1 {
          font-size: 14px;
          color: #333333;
          font-weight: bold;
          letter-spacing: 3px;
          height: 60px;
          line-height: 60px;
        }
      }
      .cpt-list-box {
        width: 100%;
        display: flex;
        padding: 10px;
        box-sizing: border-box;
        .com-item {
          width: 100%;
          cursor: move;
          border: 1px solid #eee;
          border-radius: 5px;
          overflow: hidden;
          box-shadow: 0 5px 21px 0 rgb(78 78 78 / 8%);
          transition: all 0.3s;
          &:hover {
            box-shadow: 0 5px 21px 0 rgb(78 78 78 / 28%);
          }
        }
      }
    }
  }
</style>
