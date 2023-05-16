<template>
  <div
    class="website-card-box"
    @mouseover="handleMouseover"
    @mouseleave="handleMouseleave"
    @click="toDetail"
  >
    <div class="card-top">
      <!-- 网站图标 -->
      <div class="website-icon-box">
        <div class="img-box">
          <img :src="cardData.website_icon" alt="图标" />
        </div>
      </div>
      <!-- 标题和简介 -->
      <div class="title-abstract-box">
        <span class="title" :title="cardData.website_title">{{ cardData.website_title }}</span>
        <p>{{ cardData.website_abstract }}</p>
      </div>
      <!-- 直达图标 -->
      <div class="direct-icon-box" @click.stop>
        <el-tooltip class="box-item" effect="light" content="直达" placement="right">
          <a
            :href="cardData.website_link"
            target="_blank"
            rel="external nofollow noopener"
            @click="addViews"
          >
            <svg-icon
              icon-name="icon-chakangengduo-xian"
              class-name="direct-icon"
              size="16px"
              :color="directIconColor"
            ></svg-icon>
          </a>
        </el-tooltip>
      </div>
    </div>
    <!-- 评论量和访问量 -->
    <div class="card-bottom">
      <svg-icon icon-name="icon-icon_yulan" color="#a3abb1" size="14px"></svg-icon>
      <span class="number">{{ formatNumber(cardData.website_views) }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { addWebsiteViewByIdAsync } from '@/http/api/websiteShare';
  import { formatNumber } from '@/utils/common';

  const props = defineProps<{
    cardData: any;
  }>();

  // 直达图标颜色
  const directIconColor = ref<string>('#ccc');

  // 鼠标移入
  const handleMouseover = () => {
    directIconColor.value = 'green';
  };
  const handleMouseleave = () => {
    directIconColor.value = '#ccc';
  };

  // 跳转网站详情
  const router = useRouter();
  const toDetail = () => {
    const newpage = router.resolve({
      path: '/websiteDetail',
      query: {
        websiteId: props.cardData._id
      }
    });
    window.open(newpage.href, '_blank');
  };

  // 网站浏览量+1
  const addViews = () => {
    addWebsiteViewByIdAsync({ id: props.cardData._id });
  };
</script>
<style lang="scss" scoped>
  .website-card-box {
    width: 200px;
    background-color: #fff;
    margin: 10px 0;
    cursor: pointer;
    box-shadow: 0px 0px 20px -5px rgba(158, 158, 158, 0.4);
    border-radius: 7px;
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    padding: 10px 8px 0 10px;
    &:hover {
      transform: translateY(-3px) !important;
      box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.6);
      transition: all 0.3s ease;
    }
    .card-top {
      display: flex;
      width: 100%;
      flex: 1;
      margin-bottom: 10px;
      &:hover .title {
        color: green;
      }
      .website-icon-box {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 8px;
        .img-box {
          width: 38px;
          height: 38px;
          background: rgba(128, 128, 128, 0.1);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          img {
            max-width: 100%;
          }
        }
      }
      .title-abstract-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        flex: 1;
        span {
          display: block;
          color: #282a2d;
          font-size: 14px;
          font-weight: 600;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; //溢出不换行
          margin-bottom: 3px;
        }
        p {
          color: #6c757d;
          font-size: 12px;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; //溢出不换行
          margin-top: 3px;
        }
      }
      .direct-icon-box {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 5px;
      }
    }
    .card-bottom {
      height: 30px;
      width: 100%;
      border-top: 1px solid #eee;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .number {
        color: #a3abb1;
        font-size: 13px;
        margin-left: 8px;
        margin-top: 1px;
      }
    }
  }
</style>
