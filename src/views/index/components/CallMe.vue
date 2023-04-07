<template>
  <div class="call-me-box">
    <el-popover popper-class="vxqun-popover-box" trigger="hover" placement="left" teleported>
      <template #reference>
        <span class="contact-me">
          <svg-icon icon-name="icon-qunzuduoren" color="#fff" size="20px"></svg-icon>
        </span>
      </template>
      <!-- 内容区域 -->
      <div class="vx-box">
        <div class="vx-title">
          <h1>进入微信群</h1>
          <p>进入交流群，迅速解答疑问！</p>
        </div>
        <div v-viewer class="vx-img">
          <div v-if="vxQunList.length" class="qun-box-img">
            <img
              v-for="(item, index) in vxQunList"
              :key="index"
              :src="item.qr_code"
              :alt="item.name"
              srcset=""
            />
          </div>
          <img v-else class="bgc-img" src="@/assets/images/vx-qun.jpg" alt="" />
        </div>
      </div>
    </el-popover>

    <el-popover :width="200" trigger="hover" placement="left" teleported>
      <template #reference>
        <span class="contact-me">
          <svg-icon icon-name="icon-weixin" color="#fff" size="24px"></svg-icon>
        </span>
      </template>
      <!-- 内容区域 -->
      <div class="vx-box">
        <div class="vx-title">
          <h1>添加微信</h1>
          <p>进入交流群，迅速解答疑问！</p>
        </div>
        <div class="vx-img">
          <img class="bgc-img" src="@/assets/images/vx.jpg" alt="" />
        </div>
      </div>
    </el-popover>

    <el-tooltip class="box-item" effect="light" content="gitee" placement="left">
      <a
        class="contact-me"
        href="https://gitee.com/sharemore52/resume-design"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg-icon icon-name="icon-gitee-fill-round" color="#fff" size="20px"></svg-icon>
      </a>
    </el-tooltip>
    <el-tooltip class="box-item" effect="light" content="问题或建议反馈" placement="left">
      <a
        href="https://github.com/huajian-pro/resume-design/issues"
        target="_blank"
        rel="noopener noreferrer"
        class="contact-me"
      >
        <svg-icon icon-name="icon-wenti" color="#fff" size="20px"></svg-icon>
      </a>
    </el-tooltip>
    <!-- 管理员入口 -->
    <el-tooltip
      v-if="
        appStore.useUserInfoStore.userInfo &&
        appStore.useUserInfoStore.userInfo.roles.indexOf('Admin') !== -1
      "
      class="box-item"
      effect="light"
      content="管理员入口"
      placement="left"
    >
      <a href="javascript:void(0)" rel="noopener noreferrer" class="contact-me" @click="toAdmin">
        <svg-icon icon-name="icon-guanliyuan_jiaoseguanli" color="#fff" size="20px"></svg-icon>
      </a>
    </el-tooltip>
  </div>
</template>
<script setup lang="ts">
  import { getVXQunListUnauthAsync } from '@/http/api/website';
  import appStore from '@/store';

  // 跳转至管理员页面
  const router = useRouter();
  const toAdmin = () => {
    router.push('/admin');
  };

  // 查询微信微信群列表
  const vxQunList = ref<any>([]);
  const getVXQunListUnauth = async () => {
    const data = await getVXQunListUnauthAsync();
    if (data.status === 200) {
      vxQunList.value = data.data;
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getVXQunListUnauth();
</script>
<style lang="scss" scoped>
  .call-me-box {
    position: fixed;
    right: 19px;
    top: 50%;
    transform: translate(0, -50%);
    display: flex;
    flex-direction: column;
    .contact-me {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
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
      margin-bottom: 10px;
      &:hover {
        opacity: 0.8;
      }
    }
  }

  .vx-box {
    .vx-title {
      display: flex;
      flex-direction: column;
      align-items: center;
      h1 {
        font-size: 14px;
      }
      p {
        font-size: 12px;
        color: rgb(105, 105, 105);
        margin: 6px 0;
      }
    }
    .vx-img {
      width: 100%;
      overflow: hidden;
      .qun-box-img {
        display: flex;
        justify-content: space-between;
        img {
          width: 150px;
          height: 200px;
          margin: 10px;
          border: 1px solid #eee;
        }
      }
      .bgc-img {
        width: 100%;
      }
    }
  }
</style>
<style lang="scss">
  .vxqun-popover-box {
    width: inherit !important;
  }
</style>
