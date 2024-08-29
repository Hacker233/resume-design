<template>
  <div class="background-img-box">
    <div class="img-list-box">
      <template v-for="(item, index) in bgcImgList" :key="index">
        <div class="img-box">
          <img v-if="item.src" :src="getAssetsImagesFile(item.src)" @click="handleClickImg(item)" />
          <div v-else class="no-img" @click="handleClickImg(item)">空</div>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { getAssetsImagesFile } from '../../utils/common';

  // 图片列表
  const bgcImgList = [
    {
      id: '0',
      src: ''
    },
    {
      id: '1',
      src: 'page-bg-1.jpg'
    },
    {
      id: '2',
      src: 'page-bg-2.jpg'
    },
    {
      id: '3',
      src: 'page-bg-3.jpg'
    },
    {
      id: '4',
      src: 'page-bg-4.jpg'
    },
    {
      id: '5',
      src: 'page-bg-5.jpg'
    },
    {
      id: '6',
      src: 'page-bg-6.jpg'
    },
    {
      id: '7',
      src: 'page-bg-7.jpg'
    },
    {
      id: '8',
      src: 'page-bg-8.jpg'
    },
    {
      id: '9',
      src: 'page-bg-9.jpg'
    },
    {
      id: '10',
      src: 'page-bg-10.jpg'
    },
    {
      id: '11',
      src: 'page-bg-11.jpg'
    }
  ];

  const { HJSchemaJsonStore } = storeToRefs(appStore.useLegoJsonStore);

  // 选择背景图
  const handleClickImg = (item: { src: string }) => {
    if (item.src) {
      HJSchemaJsonStore.value.css.backgroundImage = getAssetsImagesFile(item.src);
    } else {
      HJSchemaJsonStore.value.css.backgroundImage = '';
    }
  };
</script>
<style lang="scss" scoped>
  .background-img-box {
    padding: 10px;
    .img-list-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .img-box {
        width: 45%;
        height: 170px;
        margin-bottom: 10px;
        cursor: pointer;
        transition: all 0.3s;
        border-radius: 4px;
        overflow: hidden;
        position: relative;
        &:hover {
          box-shadow: rgba(0, 0, 0, 0.35) 0px 1px 4px;
        }
        img {
          width: 100%;
          height: 100%;
        }
        .no-img {
          width: 100%;
          height: 100%;
          font-size: 12px;
          color: #828181;
          border: 1px solid #eee;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
</style>
