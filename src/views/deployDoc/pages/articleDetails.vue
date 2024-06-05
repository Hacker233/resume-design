<template>
  <div class="article-wrapper">
    <!-- 文章相关 -->
    <div id="article-detail-box" class="article-detail-box">
      <!-- 评论等小插件 -->
      <div class="left-pop-box">
        <div class="icon-box" @click="toComment">
          <svg-icon
            icon-name="icon-pinglun"
            size="20px"
            color="#8a919f"
            class-name="bilibili"
          ></svg-icon>
          <span class="numbers">{{ articleDetail.commentCount }}</span>
        </div>
      </div>

      <div class="article-left">
        <div class="top">
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
          <template v-if="articleDetail">
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
          <el-skeleton v-else :rows="10" animated />
        </div>

        <div ref="commentRef">
          <comment-com
            width="820px"
            :comment-type-id="articleId"
            comment-type="article"
          ></comment-com>
        </div>
      </div>

      <!-- 文章目录 -->
      <catalog-card ref="catalogRef" container=".article-content"></catalog-card>
    </div>

    <el-backtop :right="50" :bottom="80" />
  </div>
</template>
<script lang="ts" setup>
  import { userGetArticleDetailAsync } from '@/http/api/article';
  import { formatListDate } from '@/utils/common';

  // 获取文章详情
  const catalogRef = ref<any>(null);
  const route = useRoute();
  const articleDetail = ref<any>({
    commentCount: '',
    article_title: '',
    userInfo: {
      avatar: '',
      name: ''
    }
  });
  const { articleId } = route.query;
  const userGetArticleDetail = async () => {
    let params = {
      articleId: articleId
    };
    const data = await userGetArticleDetailAsync(params);
    if (data.data.status === 200) {
      articleDetail.value = data.data.data;
      await nextTick();
      catalogRef.value.getTitles();
    } else {
      ElMessage.error(data.message);
    }
  };
  userGetArticleDetail();

  // 滚动至评论区
  const commentRef = ref<any>(null);
  const toComment = () => {
    commentRef.value.scrollIntoView({ behavior: 'smooth' });
  };
</script>
<style lang="scss" scoped>
  .article-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 1200px;
    margin: 0 auto;
    position: relative;
    :deep(.comment-view) {
      margin: 0;
    }
    .article-detail-box {
      width: 1200px;
      min-height: 300px;
      box-shadow: 0px 5 5 2px rgba(119, 136, 146, 0.14);
      margin: 20px auto;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      position: relative;
      .article-left {
        width: 820px;

        margin-right: 10px;
        .top {
          background-color: #fff;
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
      .left-pop-box {
        position: sticky;
        top: 200px;
        margin-right: 20px;
        .icon-box {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border-radius: 50%;
          background-color: #fff;
          position: relative;
          box-shadow: 0 2px 4px 0 rgb(0 0 0 / 4%);
          cursor: pointer;
          .numbers {
            position: absolute;
            top: -1px;
            right: -5px;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 17px;
            padding: 0 5px;
            border-radius: 9px;
            font-size: 11px;
            text-align: center;
            white-space: nowrap;
            background-color: #c2c8d1;
            color: #fff;
          }
        }
      }
    }

    .comment-box {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
