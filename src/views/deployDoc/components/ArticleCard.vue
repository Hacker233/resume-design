<template>
  <div class="article-card-box" @click="toArticleDetail">
    <!-- 用户展示和区域 -->
    <div class="article-top">
      <div class="user-info-box">
        <el-avatar :size="40" :src="articleInfo.userInfo.avatar">
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
        </el-avatar>
        <!-- 用户名和日期 -->
        <div class="name-time">
          <span class="name">{{ articleInfo.userInfo.name }}</span>
          <span class="time">{{ formatListDate(articleInfo.createDate) }}</span>
        </div>
        <!-- 标签 -->
        <div class="tags">
          <el-tag v-for="(item, index) of articleInfo.article_tags" :key="index" :hit="false">{{
            item
          }}</el-tag>
        </div>
      </div>
    </div>
    <!-- 文章详细内容 -->
    <div class="article-bottom">
      <div class="bottom-left">
        <h1>{{ articleInfo.article_title }}</h1>
        <div class="article-abstract">
          <p :title="articleInfo.article_abstract">{{ articleInfo.article_abstract }}</p>
        </div>
        <!-- 评论、点赞、浏览量 -->
        <div class="views-comments-box">
          <svg-icon
            v-config:open_comment
            icon-name="icon-pinglun1"
            color="#a3abb1"
            size="19px"
          ></svg-icon>
          <span v-config:open_comment class="number">{{ articleInfo.commentCount }}</span>
          <svg-icon icon-name="icon-icon_yulan" color="#a3abb1" size="19px"></svg-icon>
          <span class="number">{{ articleInfo.article_views }}</span>
        </div>
      </div>
      <div class="bottom-right">
        <img
          :src="
            articleInfo.article_cover || 'https://maobucv.com:9000/resume/logo/article_default.jpg'
          "
          alt=""
          srcset=""
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { formatListDate } from '@/utils/common';
  const emit = defineEmits(['toArticleDetail']);
  interface IArticleInfo {
    articleInfo: any;
  }
  const props = withDefaults(defineProps<IArticleInfo>(), {
    articleInfo: null
  });

  // 跳转至文章详情
  const toArticleDetail = () => {
    emit('toArticleDetail', props.articleInfo);
  };
</script>
<style lang="scss" scoped>
  .article-card-box {
    width: 100%;
    height: 200px;
    background-color: #fff;
    margin-bottom: 30px;
    border-radius: 6px;
    transition: all 0.3s;
    padding: 10px 20px 0 20px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 5 5 2px rgba(119, 136, 146, 0.24);
    cursor: pointer;
    &:hover {
      box-shadow: 0px 16px 22px 2px rgb(0 37 58 / 24%);
    }
    .article-top {
      height: 50px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .user-info-box {
        display: flex;
        align-items: center;
        height: 100%;
        .name-time {
          display: flex;
          flex-direction: column;
          padding-left: 15px;
          height: 100%;
          justify-content: space-evenly;
          .name {
            font-size: 14px;
            font-weight: 700;
          }
          .time {
            font-size: 12px;
            color: #909090;
          }
        }
        .tags {
          margin-left: 25px;
          display: flex;
          align-items: flex-start;
          height: 100%;
          padding-top: 8px;
          :deep(.el-tag) {
            margin-right: 10px;
          }
        }
      }
    }

    .article-bottom {
      display: flex;
      box-sizing: border-box;
      .bottom-left {
        box-sizing: border-box;
        flex: 1;
        h1 {
          font-weight: 700;
          font-size: 18px;
          line-height: 24px;
          color: #1d2129;
          margin-bottom: 10px;
        }
        .article-abstract {
          height: 44px;
          p {
            font-weight: 400;
            font-size: 13px;
            line-height: 22px;
            color: #86909c;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            transition: all 0.3s;
            &:hover {
              color: #a3aab3;
            }
          }
        }
        .views-comments-box {
          display: flex;
          align-items: flex-end;
          height: 40px;
          .svg-icon {
            margin-right: 10px;
          }
          .number {
            color: #a3abb1;
            margin-right: 15px;
          }
        }
      }
      .bottom-right {
        height: 100%;
        width: 250px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        img {
          width: 170px;
          height: 110px;
          border-radius: 3px;
        }
      }
    }
  }
</style>
