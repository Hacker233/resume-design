<template>
  <div class="content-left-box">
    <!-- 简介 -->
    <div class="introduce-box">
      <com-title title="简介"></com-title>
      <div v-dompurify-html="content.source_abstract" class="content"></div>

      <!-- 软件相关数据统计 -->
      <div class="article-data-box">
        <!-- 浏览量 -->
        <div class="view-box">
          <div class="icon-box">
            <svg-icon icon-name="icon-liulanliang1" color="#ccc" size="20px"></svg-icon>
          </div>
          <span>{{ content.source_views }}</span>
        </div>
      </div>

      <!-- 特别说明 -->
      <div class="special-tips">
        特别声明：本站所有软件资源均搜集于互联网或网友分享，仅供学习与交流，请下载后24小时内删除！
        侵犯删除请联系邮箱：1584775297@qq.com。
      </div>
    </div>
    <!-- 预览图 -->
    <div class="preview-img-box">
      <com-title title="预览图"></com-title>
      <div v-viewer class="img-list">
        <img
          v-for="(item, index) in content.source_screen"
          :key="index"
          :src="item.response.data.fileUrl"
          :alt="item.source_title"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import ComTitle from './ComTitle.vue';
  defineProps<{
    content: any;
  }>();
</script>
<style lang="scss" scoped>
  .content-left-box {
    width: 850px;
    min-height: 300px;
    .introduce-box {
      background-color: #fff;
      border-radius: 10px;
      padding: 0 20px 20px 20px;
      margin-bottom: 30px;
      .content {
        padding: 30px 0;
        letter-spacing: 1px;
        font-size: 16px;
        color: #333;
        line-height: 1.5;
      }

      .article-data-box {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px 0;
        border-top: 1px solid #eee;
        margin-top: 20px;
        .view-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          .icon-box {
            border-radius: 50%;
            width: 50px;
            height: 50px;
            border: 1px solid #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 5px;
          }
          span {
            color: #ccc;
            font-size: 16px;
          }
        }
      }
      .special-tips {
        background-color: #eee;
        padding: 15px;
        border-radius: 5px;
        font-size: 14px;
        color: rgb(132, 132, 132);
        letter-spacing: 2px;
        line-height: 2;
      }
    }
    .preview-img-box {
      background-color: #fff;
      border-radius: 10px;
      padding: 0 20px 20px 20px;
      .img-list {
        padding: 30px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 80%;
          box-shadow: 0px 16px 22px 2px rgb(0 37 58 / 6%);
          margin-bottom: 15px;
          border-radius: 10px;
          cursor: pointer;
        }
      }
    }
  }
</style>
