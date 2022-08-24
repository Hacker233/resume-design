<template>
  <div class="main-left-box">
    <div class="left-box">
      <div class="left-title" @click="selectNone">
        <span>模块</span>
        <span>选择</span>
      </div>
      <ul>
        <li
          v-for="(val, key, index) in MATERIAL_JSON"
          :key="index"
          :class="[{ active: currentKey === key }]"
          @click="selectModel(val, key as string)"
        >
          <svg-icon :icon-name="modelOfIcon[key]" color="#2cbd99" size="25px"></svg-icon>
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
          <!-- 拖拽组件 -->
          <draggable
            class="dragArea list-group"
            :sort="false"
            :list="cptList"
            :clone="cloneData"
            :group="{ name: 'custom', pull: 'clone', put: false }"
            @start="start"
            item-key="id"
          >
            <template #item="{ element }">
              <div
                class="list-group-item com-item"
                :style="{
                  height: cptOfImg[currentKey][element.cptName].height,
                  width: cptOfImg[currentKey][element.cptName].width
                }"
                @click="addModel(element)"
              >
                <el-tooltip class="box-item" effect="light" :enterable="false">
                  <template #content>
                    <img
                      :src="
                        getAssetsMaterialFile(currentKey, cptOfImg[currentKey][element.cptName].url)
                      "
                      style="max-width: 500px"
                      alt=""
                      srcset=""
                    />
                  </template>
                  <img
                    :src="
                      getAssetsMaterialFile(currentKey, cptOfImg[currentKey][element.cptName].url)
                    "
                    style="width: 100%"
                    alt=""
                    srcset=""
                  />
                </el-tooltip>
              </div>
            </template>
          </draggable>
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
  import { MATERIAL_JSON } from '@/schema/materialList';
  import modelOfIcon from '@/dictionary/modelOfIcon';
  import modelOfTitle from '@/dictionary/modelOfTitle';
  import modelCategory from '@/dictionary/modelOfTitle';
  import { getAssetsMaterialFile, getUuid } from '@/utils/common';
  import cptOfImg from '@/dictionary/ctpOfImg';
  import { cloneDeep } from 'lodash';
  import MODEL_DATA_JSON from '@/schema/modelData';
  import appStore from '@/store';
  import draggable from 'vuedraggable';
  const list1 = ref<any>([
    { name: 'Jesus', id: 1 },
    { name: 'Paul', id: 2 },
    { name: 'Peter', id: 3 }
  ]);
  const cloneData = (data: IMATERIALITEM) => {
    const cptData = cloneDeep(data);
    cptData.data = cloneDeep(MODEL_DATA_JSON[cptData.model]); // 为模块添加数据
    cptData.keyId = getUuid();
    return cptData;
  };
  const start = (data: any) => {
    data.dataTransfer?.setData('cptData', JSON.stringify(123));
    console.log('拖拽开始', data, data.oldIndex);
  };

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

  // 点击组件，添加模块
  const { pushComponent } = appStore.useResumeJsonNewStore;
  const addModel = (item: IMATERIALITEM) => {
    let cptData = cloneDeep(item);
    cptData.data = cloneDeep(MODEL_DATA_JSON[cptData.model]); // 为模块添加数据
    cptData.keyId = getUuid();
    pushComponent(cptData); // 添加模块
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
        // width: 100%;
        display: flex;
        padding: 10px;
        box-sizing: border-box;
        flex-grow: 0;
        .com-item {
          // width: 100%;
          cursor: move;
          border: 1px solid #eee;
          border-radius: 5px;
          overflow: hidden;
          box-shadow: 0 5px 21px 0 rgb(78 78 78 / 30%);
          transition: all 0.3s;
          margin-bottom: 10px;
          &:hover {
            box-shadow: 0 5px 21px 0 rgb(78 78 78 / 60%);
          }
        }
      }
    }
  }
</style>
