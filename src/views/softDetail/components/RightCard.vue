<template>
  <div class="right-card-box">
    <!-- 标签 -->
    <div class="tags-box">
      <com-title title="标签"></com-title>
      <div class="tags-list-box">
        <span v-for="(item, index) in content.source_tags" :key="index" class="tag">{{
          item
        }}</span>
      </div>
    </div>

    <!-- 下载 -->
    <div class="download-box">
      <com-title title="立即下载"></com-title>
      <div class="button-list-box">
        <div
          v-for="(item, index) in content.source_download"
          :key="index"
          class="button"
          @click="toDownload(item.link)"
        >
          {{ item.name }}
          <span v-if="item.pass">{{ `(提取码:${item.pass})` }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import LoginDialog from '@/components/LoginDialog/LoginDialog';
  import ComTitle from './ComTitle.vue';
  defineProps<{
    content: any;
  }>();

  // 点击下载
  const router = useRouter();
  const toDownload = (link: string) => {
    const token = localStorage.getItem('token'); // 判断是否登录
    const userInfo = localStorage.getItem('userInfo');
    if (!token) {
      LoginDialog(true);
    } else {
      // 判断邮箱是否验证
      const emailVerify = JSON.parse(userInfo as string).auth.email.valid;
      if (emailVerify) {
        window.open(link, '_blank');
      } else {
        router.push({
          path: '/emailVerify',
          query: {
            email: JSON.parse(userInfo as string).email
          }
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
  .right-card-box {
    width: 350px;
    min-height: 400px;
    .tags-box {
      background-color: #fff;
      border-radius: 10px;
      padding: 0 20px 20px 20px;
      margin-bottom: 30px;
      .tags-list-box {
        height: 60px;
        align-items: center;
        display: flex;
        .tag {
          padding: 5px 10px;
          background-color: #00c090;
          text-align: center;
          color: #fff;
          font-size: 14px;
          border-radius: 5px;
          cursor: pointer;
          margin-right: 10px;
          letter-spacing: 2px;
        }
      }
    }
    .download-box {
      background-color: #fff;
      border-radius: 10px;
      padding: 0 20px 20px 20px;
      margin-bottom: 30px;
      .button-list-box {
        display: flex;
        flex-direction: column;
        padding: 20px 0 0 0;
        .button {
          width: 100%;
          height: 38px;
          margin-right: 20px;
          margin-bottom: 20px;
          line-height: 38px;
          text-align: center;
          letter-spacing: 2px;
          color: #fff;
          font-size: 14px;
          background-image: -webkit-linear-gradient(to right, #2ddd9d, #1cc7cf);
          background-image: -moz-linear-gradient(to right, #2ddd9d, #1cc7cf);
          background-image: -ms-linear-gradient(to right, #2ddd9d, #1cc7cf);
          background-image: linear-gradient(to right, #2ddd9d, #1cc7cf);
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          border-radius: 50px;
          background-color: #2ddd9d;
          -webkit-transition: all 0.3s;
          -moz-transition: all 0.3s;
          -ms-transition: all 0.3s;
          -o-transition: all 0.3s;
          transition: all 0.3s;
          cursor: pointer;
          user-select: none;
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
</style>
