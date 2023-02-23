<template>
  <div class="article-detail-box">文章详情</div>
</template>
<script lang="ts" setup>
  import { userGetArticleDetailAsync } from '@/http/api/article';

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
      articleDetail.value = data.data.data.list;
    } else {
      ElMessage.error(data.message);
    }
  };
  userGetArticleDetail();
</script>
<style lang="scss" scoped>
  .article-detail-box {
    width: 1000px;
    background-color: #fff;
    min-height: 300px;
    box-shadow: 0px 5 5 2px rgba(119, 136, 146, 0.14);
    margin: 20px auto;
    border-radius: 8px;
  }
</style>
