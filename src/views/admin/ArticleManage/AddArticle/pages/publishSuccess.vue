<template>
  <div class="publish-success-box">
    <div class="icon-box">
      <svg-icon icon-name="icon-icon" color="#00c091" size="100px"></svg-icon>
    </div>
    <div class="go-article-info">
      <p
        >文章发布成功啦！
        <a href="#" @click.prevent="toDetail">点击立即查看>></a>
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
  // 跳转至文章详情页
  const { articleId } = useRoute().query;
  const router = useRouter();
  const toDetail = () => {
    router.push({
      path: '/articleDetail',
      query: {
        articleId: articleId
      }
    });
  };
</script>
<style lang="scss" scoped>
  .publish-success-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 50px;
    .icon-box {
      margin-bottom: 20px;
    }
  }
</style>
