<template>
  <el-popover placement="left" :width="350" trigger="click">
    <template #reference>
      <div class="background-img-box">
        <div v-if="!resumeJsonNewStore.GLOBAL_STYLE.resumeBackgroundCom" class="default-img"
          >默认背景</div
        >
        <div v-else class="bgc-img">
          <img
            v-if="resumeBackgroundList[resumeJsonNewStore.GLOBAL_STYLE.resumeBackgroundCom].url"
            :src="
              getAssetsResumeBgcFile(
                resumeBackgroundList[resumeJsonNewStore.GLOBAL_STYLE.resumeBackgroundCom].url
              )
            "
            alt="背景图选择"
            srcset=""
          />
          <div v-else class="default-img">默认背景</div>
        </div>
      </div>
    </template>
    <!-- 内容区域 -->
    <div class="custom-background-shape-box">
      <!-- 背景列表 -->
      <div
        v-for="(value, key, index) of resumeBackgroundList"
        :key="index"
        class="item-box"
        @click="handleResumeBackground(key)"
      >
        <img v-if="value.url" :src="getAssetsResumeBgcFile(value.url)" alt="背景图选择" srcset="" />
        <div v-else class="default-img-pop">默认背景</div>
      </div>
    </div>
  </el-popover>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import resumeBackgroundList from '@/dictionary/resumeBackgroundDic';
  import { getAssetsResumeBgcFile } from '@/utils/common';

  // store相关数据
  const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore);

  // 选择背景
  const handleResumeBackground = (key: string | number) => {
    if (key) {
      resumeJsonNewStore.value.GLOBAL_STYLE.resumeBackgroundCom = key;
    } else {
      resumeJsonNewStore.value.GLOBAL_STYLE.resumeBackgroundCom = '';
    }
  };
</script>
<style lang="scss" scoped>
  .background-img-box {
    cursor: pointer;
    .default-img {
      width: 100px;
      height: 120px;
      background: #c6ffdd; /* fallback for old browsers */
      box-shadow: rgba(99, 100, 99, 0.2) 0px 0px 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .bgc-img {
      img {
        width: 100px;
        height: 120px;
        box-shadow: rgba(99, 100, 99, 0.2) 0px 0px 10px;
      }
    }
  }

  .custom-background-shape-box {
    display: flex;
    justify-content: space-between;
    .item-box {
      width: 100px;
      height: 120px;
      box-shadow: rgba(99, 100, 99, 0.2) 0px 0px 10px;
      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
        box-shadow: rgba(99, 100, 99, 0.4) 0px 0px 10px;
      }
      .default-img-pop {
        width: 100%;
        height: 100%;
        cursor: pointer;
        box-shadow: rgba(99, 100, 99, 0.4) 0px 0px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: green;
      }
    }
  }
</style>
