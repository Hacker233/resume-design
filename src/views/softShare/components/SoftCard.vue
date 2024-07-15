<template>
  <div class="soft-card-box" @click="toSourceDetial">
    <!-- 封面图 -->
    <img class="cover-img" :src="cardData.source_cover" alt="封面图" />
    <!-- 标题 -->
    <div class="title-box">
      <h1 :title="cardData.source_title">{{ cardData.source_title }}</h1>
    </div>
    <!-- 标签 -->
    <div class="tags-box">
      <span v-for="(item, index) in cardData.source_tags" :key="index" class="tag">{{ item }}</span>
    </div>
    <!-- 浏览量以及日期 -->
    <div class="views-date-box">
      <!-- 浏览量 -->
      <div class="icon-box">
        <svg-icon
          v-config:open_comment
          icon-name="icon-pinglun1"
          color="#a3abb1"
          size="19px"
        ></svg-icon>
        <span v-config:open_comment class="number">{{ cardData.commentCount }}</span>
        <svg-icon icon-name="icon-jibenziliao" color="#a3abb1" size="19px"></svg-icon>
        <span class="number">{{ cardData.source_views }}</span>
      </div>
      <!-- 日期 -->
      <div class="icon-box">
        <svg-icon icon-name="icon-shijian" color="#a3abb1" size="19px"></svg-icon>
        <span class="number number-date">{{
          showtime(formatListDate(cardData.source_create_date))
        }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { showtime, formatListDate } from '@/utils/common';
  const props = defineProps<{
    cardData: any;
  }>();

  // 跳转至软件详情
  const router = useRouter();
  const toSourceDetial = () => {
    const newpage = router.resolve({
      path: '/softDetail',
      query: {
        sourceId: props.cardData._id
      }
    });
    window.open(newpage.href, '_blank');
  };
</script>
<style lang="scss" scoped>
  .soft-card-box {
    width: 300px;
    height: 420px;
    background-color: #fff;
    margin-bottom: 40px;
    border-radius: 5px;
    overflow: hidden;
    transition: all 0.3s;
    cursor: pointer;
    &:not(:nth-child(4n)) {
      margin-right: 33px;
    }
    &:hover {
      box-shadow: 0px 16px 22px 2px rgb(0 37 58 / 14%);
      transform: translateY(2%) scale(1.01);
      background-color: #fff;
    }
    .cover-img {
      width: 100%;
      height: 290px;
      border-bottom: 1px solid #eee;
    }

    .title-box {
      padding: 0 14px;
      text-align: justify;
      height: 60px;
      display: flex;
      align-items: center;
      h1 {
        font-size: 16px;
        text-align: justify;
        line-height: 1.5;
        font-weight: 500;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

    .tags-box {
      height: 30px;
      align-items: center;
      display: flex;
      padding: 0 15px;
      .tag {
        padding: 3px 5px;
        background-color: #00c090;
        text-align: center;
        color: #fff;
        font-size: 14px;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 5px;
        letter-spacing: 2px;
      }
    }

    .views-date-box {
      color: #a3abb1;
      padding: 0 15px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .icon-box {
        display: flex;
        align-items: center;
        margin-right: 5px;

        .number {
          margin-left: 5px;
          letter-spacing: 1px;
          margin-right: 10px;
        }
        .number-date {
          margin-right: 0;
        }
      }
    }
  }
</style>
