<template>
  <div class="main-left-box">
    <div class="left-box">
      <c-scrollbar trigger="hover" style="height: 100%">
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
      </c-scrollbar>
    </div>
    <div class="right-box">
      <template v-if="currentKey">
        <!-- 组件列表 -->
        <c-scrollbar trigger="hover" style="height: 100%">
          <div class="cpt-list-box">
            <div v-for="(element, index) in cptList" :key="index" class="com-item">
              <!-- 图片 -->
              <el-tooltip class="box-item" effect="light" :enterable="false" placement="right">
                <template #content>
                  <div class="toolTip-box">
                    <img
                      :src="
                        getAssetsMaterialFile(currentKey, cptOfImg[currentKey][element.cptName].url)
                      "
                      alt="效果图"
                    />
                    <div class="layout-box"> 建议位置：{{ layoutDic[element.layout] }} </div>
                  </div>
                </template>
                <div
                  class="item-img-box"
                  :style="{
                    height: cptOfImg[currentKey][element.cptName].height,
                    width: cptOfImg[currentKey][element.cptName].width
                  }"
                >
                  <!-- 遮罩层 -->
                  <div class="item-masks">
                    <div class="button" @click="addModel(element)"> 立即添加 </div>
                  </div>
                  <img
                    :src="
                      getAssetsMaterialFile(currentKey, cptOfImg[currentKey][element.cptName].url)
                    "
                  />
                </div>
              </el-tooltip>
            </div>
          </div>
        </c-scrollbar>
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
  const layoutDic: any = {
    left: '左',
    right: '右',
    center: '常规'
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

  // 点击组件，添加模块
  const { resumeJsonNewStore } = appStore.useResumeJsonNewStore;
  const { pushComponent } = appStore.useResumeJsonNewStore;
  const addCustomModelLeftRight: any = inject('addCustomModelLeftRight'); // 左右布局时，需要单独处理左右列表
  const addModel = async (item: IMATERIALITEM) => {
    let cptData = cloneDeep(item);
    cptData.data = cloneDeep(MODEL_DATA_JSON[cptData.model]); // 为模块添加数据
    cptData.keyId = getUuid();
    cptData.show = true;
    console.log('cptData', cptData);
    if (resumeJsonNewStore.LAYOUT === 'leftRight') {
      addCustomModelLeftRight(cptData);
    } else {
      pushComponent(cptData); // 添加模块
    }
    await nextTick();
    selectStoreModel(cptData);
    ElMessage.success('添加成功');
  };

  // 选中模块
  const { updateSelectModel } = appStore.useSelectMaterialStore;
  const selectStoreModel = (item: any) => {
    let optionsName: string = item.cptOptionsName;
    let updateData = {
      model: item.model,
      optionsName: optionsName,
      title: item.data.title,
      keyId: item.keyId
    };
    updateSelectModel(updateData.model, updateData.optionsName, updateData.title, updateData.keyId);
  };
</script>
<style lang="scss" scoped>
  .main-left-box {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    .left-box {
      width: 60px;
      border-right: 1px solid #eee;
      ul {
        width: 100%;
        height: calc(100vh - 110px);
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
      .cpt-list-box {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px;
        box-sizing: border-box;
        flex-grow: 0;
        .com-item {
          width: 100%;
          min-height: 50px;
          border: 1px solid #eee;
          border-radius: 5px;
          overflow: hidden;
          box-shadow: 0 5px 21px 0 rgb(78 78 78 / 30%);
          transition: all 0.3s;
          margin-bottom: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          &:hover {
            box-shadow: 0 5px 21px 0 rgb(78 78 78 / 60%);
          }
          .item-img-box {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 100%;
            }
            .item-masks {
              position: absolute;
              height: 100%;
              width: 100%;
              border-radius: 5px;
              transition: all 0.3s;
              display: flex;
              align-items: center;
              justify-content: center;
              opacity: 0;
              &:hover {
                opacity: 1;
                background-color: rgba(#000, 0.6);
              }
              .button {
                padding: 5px 15px;
                letter-spacing: 2px;
                color: #fff;
                font-size: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-image: linear-gradient(to right, #2ddd9d, #1cc7cf);
                border-radius: 10px;
                background-color: #2ddd9d;
                transition: all 0.3s;
                cursor: pointer;
                user-select: none;
                &:hover {
                  opacity: 0.9;
                }
              }
            }
          }
        }
      }
    }
  }

  .toolTip-box {
    position: relative;
    .layout-box {
      position: absolute;
      right: -5px;
      top: 0;
      background-color: rgba(#74a274, 0.9);
      padding: 3px 10px;
      color: #fff;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
