<template>
  <div class="left-abstract-card-box">
    <el-divider>
      <p class="title">{{ websiteInfo.website_title }}</p>
    </el-divider>
    <div class="content">
      {{ websiteInfo.website_title }}网站 收录于
      <span>{{ formatListDate(websiteInfo.createDate) }}</span
      >，截至目前 {{ websiteInfo.website_title }}网站 浏览人数已经达到
      {{ formatNumber(websiteInfo.website_views) }}， 本站提供 {{ websiteInfo.website_title }}网站
      最新可用网址，{{ websiteInfo.website_title }}网站 最新网址
      {{ websiteInfo.website_link }} 来源于网络，不保证外部链接的准确性和完整性。
      同时，对于该外部链接的指向，不由工具达人实际控制，在 {{ websiteInfo.website_title }}网站
      收录时，该网页上的内容，都属于合规合法，后期网页的内容如出现违规，可以直接联系网站管理员进行删除，猫步简历不承担任何责任。
      <br />
      <br />
      若网址失效，请添加小编微信反馈或评论留言，本站将及时更新新地址！
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { formatListDate } from '@/utils/common';
  import { formatNumber } from '@/utils/common';
  defineProps<{
    websiteInfo: any;
  }>();
</script>
<style lang="scss" scoped>
  .left-abstract-card-box {
    width: 100%;
    min-height: 300px;
    background-color: #fff;
    border-radius: 6px;
    padding: 25px 20px;
    .title {
      color: #555;
      font-size: 14px;
      letter-spacing: 1px;
    }
    .content {
      color: #6c757d;
      font-size: 13px;
      letter-spacing: 1px;
      line-height: 1.7;
      text-align: justify;
    }
  }
</style>
