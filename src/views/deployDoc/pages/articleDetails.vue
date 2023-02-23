<template>
  <div class="article-wrapper">
    <div id="article-detail-box" class="article-detail-box">
      <template v-if="articleDetail">
        <!-- 标题 -->
        <h1 class="article-title">{{ articleDetail.article_title }}</h1>

        <!-- 用户信息展示区 -->
        <div class="user-info-box">
          <el-avatar :size="46" :src="articleDetail.userInfo.avatar">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
          </el-avatar>
          <!-- 用户名和日期 -->
          <div class="name-time">
            <span class="name">{{ articleDetail.userInfo.name }}</span>
            <p class="time">
              {{ formatListDate(articleDetail.createDate) }}&nbsp;&nbsp;·&nbsp;&nbsp;
              <span>阅读 {{ articleDetail.article_views }}</span>
            </p>
          </div>
        </div>

        <!-- 文章内容展示区 -->
        <el-image
          v-if="articleDetail.article_cover"
          style="width: 100%"
          :src="articleDetail.article_cover"
          fit="contain"
        />
        <!-- 内容 -->
        <div
          id="markdown-body"
          v-dompurify-html="articleDetail.article_html_content"
          v-viewer
          class="article-content"
        ></div>
      </template>
    </div>
    <!-- 评论组件 -->
    <comment-com width="820px" :comment-type-id="articleId" comment-type="article"></comment-com>
  </div>
</template>
<script lang="ts" setup>
  import { userGetArticleDetailAsync } from '@/http/api/article';
  import { formatListDate } from '@/utils/common';

  // 获取文章详情
  const route = useRoute();
  const articleDetail = ref<any>(null);
  const { articleId } = route.query;
  const userGetArticleDetail = async () => {
    let params = {
      articleId: articleId
    };
    const data = await userGetArticleDetailAsync(params);
    if (data.data.status === 200) {
      articleDetail.value = data.data.data;
    } else {
      ElMessage.error(data.message);
    }
  };
  userGetArticleDetail();
</script>
<style lang="scss" scoped>
  .article-wrapper {
    .article-detail-box {
      width: 820px;
      background-color: #fff;
      min-height: 300px;
      box-shadow: 0px 5 5 2px rgba(119, 136, 146, 0.14);
      margin: 20px auto;
      border-radius: 8px;
      padding: 45px 40px;
      .article-title {
        font-size: 28px;
      }
      .user-info-box {
        display: flex;
        align-items: center;
        height: 100px;
        .name-time {
          display: flex;
          flex-direction: column;
          padding-left: 15px;
          height: 100%;
          justify-content: center;
          .name {
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 5px;
          }
          .time {
            font-size: 14px;
            color: #909090;
            margin-top: 5px;
          }
        }
      }
      .article-content {
        margin-top: 30px;
      }
    }
  }
</style>
