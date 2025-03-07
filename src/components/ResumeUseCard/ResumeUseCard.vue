<template>
  <div class="resume-use-card-list-box">
    <div v-for="(item, index) in list" :key="index" class="card-item" @click="handleToCard(item)">
      <!-- 图片 -->
      <div class="img-box">
        <img :src="getAssetsImagesFile(item.src)" :alt="item.title" :title="item.title" />
      </div>
      <!-- 标题 -->
      <div class="title-box">
        <h3>{{ item.title }}</h3>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { getAssetsImagesFile } from '@/utils/common';
  const list = ref<any>([
    {
      title: '实习简历',
      src: 'card-1.png'
    },
    {
      title: '校招简历',
      src: 'card-2.png'
    },
    {
      title: '社招简历',
      src: 'card-3.png'
    },
    {
      title: '留学简历',
      src: 'card-4.png'
    },
    {
      title: '考研复试',
      src: 'card-5.png'
    },
    {
      title: '内推简历',
      src: 'card-6.png'
    }
  ]);

  // 点击卡片
  const router = useRouter();
  const handleToCard = (item: any) => {
    router.push({
      path: '/resume',
      query: {
        templateUse: item.title
      }
    });
  };
</script>
<style lang="scss" scoped>
  .resume-use-card-list-box {
    display: flex;
    justify-content: center;
    .card-item {
      display: inline-block;
      flex-shrink: 0;
      width: 200px;
      height: 270px;
      margin: 1rem;
      text-decoration: none;
      overflow: hidden;
      box-shadow: 0 0 3rem -1rem rgba(0, 0, 0, 0.2);
      transition: transform 0.1s ease-in-out, box-shadow 0.1s;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      transition: all 0.3s;
      border-radius: 5px;

      &:hover {
        transform: translateY(-0.5rem) scale(1.0125);
        box-shadow: 0 0.5em 3rem -1rem rgba(0, 0, 0, 0.5);
      }
      .img-box {
        flex: 1;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 15px;
        box-sizing: border-box;
        img {
          max-width: 100%;
          height: 100%;
        }
      }

      .title-box {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        border-top: 1px solid #eee;
        flex-shrink: 0;
        background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
        h3 {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          padding: 0;
          color: #b07d7d;
          text-decoration: none;
        }
      }
    }
  }
</style>
