<template>
  <div class="web-code-box">
    <!-- 背景图 -->
    <div class="bgc-img"></div>
    <!-- 内容区域 -->
    <div class="content-bottom-box">
      <!-- 头部标题位置 -->
      <div class="title-box">
        <h1>将91化简私有化部署为你自己的网站</h1>
        <div class="button" @click="openDialog"> 立即获得 </div>
      </div>

      <!-- 卡片盒子title -->
      <introduce-title-vue
        title="你将获得超多资料"
        subtitle="资料远不止如此，作者解答才是最贴心的~"
        title-color="#000"
        subtitle-color="#7f8b96"
      ></introduce-title-vue>

      <!-- 介绍卡片 -->
      <div class="card-list-box">
        <div v-for="(item, index) in cardList" :key="index" class="card-box">
          <introduce-card-vue :card-data="item"></introduce-card-vue>
        </div>
      </div>
    </div>

    <!-- 购买弹窗 -->
    <el-dialog v-model="dialogVisible" class="pay-dialog-wrapper" width="500px">
      <div class="pay-img-box">
        <img src="@/assets/images/vx-pay1.jpg" alt="购买" />
      </div>
      <div class="pay-tips">
        <p>支付成功后，添加作者微信，凭支付记录获取资源包！</p>
        <p class="vx">作者微信：LHQfighting</p>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import IntroduceCardVue from './components/IntroduceCard.vue';
  import IntroduceTitleVue from './components/IntroduceTitle.vue';

  // 卡片内容
  const cardList = ref<Array<any>>([
    {
      iconfont: 'icon-codepen',
      title: '整套的前端源码',
      introduce: '91化简完整的前端源码，可直接运行使用并打包部署。'
    },
    {
      iconfont: 'icon-_houduankaifa',
      title: '完整的后端源码',
      introduce: '91化简完整的后端源码，配置好数据库以及文件存储服务环境后可使用。'
    },
    {
      iconfont: 'icon-database',
      title: 'Mongodb数据库',
      introduce: '91化简后台使用的测试数据库，提供相关测试数据。'
    },
    {
      iconfont: 'icon-fuwuqi',
      title: 'Minio文件存储',
      introduce: '网站需要部署的minio的存储服务，手把手教你如何安装部署。'
    },
    {
      iconfont: 'icon-duqumoban',
      title: '超多简历模板',
      introduce: '提供超多word简历模板，可根据自己的需求选择是否上传到网站。'
    },
    {
      iconfont: 'icon-wendang',
      title: '前端项目部署文档',
      introduce: '全面的91化简前端项目部署上线的文档，学会此文档，可以让你快速入门部署前端项目。'
    },
    {
      iconfont: 'icon-fuzhi',
      title: '后端项目部署文档',
      introduce: '教你如何将91化简后端项目部署到服务器，并且配置好数据库、邮件服务、minio等等。'
    },
    {
      iconfont: 'icon-zhinan',
      title: '项目开发指南',
      introduce: '教你如何使用91化简项目，比如如何开发新的简历模板、开发后台接口等等。'
    },
    {
      iconfont: 'icon-zuozhe',
      title: '作者贴心服务',
      introduce: '添加源作者微信，及时解决相关问题，给你贴心的服务。'
    }
  ]);

  // 打开弹窗
  const dialogVisible = ref<boolean>(false);
  const openDialog = () => {
    dialogVisible.value = true;
  };
</script>
<style lang="scss" scoped>
  .web-code-box {
    position: relative;
    width: 100%;
    min-height: 500px;
    z-index: 0;

    .bgc-img {
      width: 100%;
      height: 340px;
      background-image: linear-gradient(to right, #24b27e, #14959b);
      position: absolute;
    }
    .content-bottom-box {
      width: 1250px;
      margin: 0 auto;
      .title-box {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 300px;
        align-items: center;
        color: white;
        h1 {
          color: #fff;
          font-size: 60px;
          font-family: '站酷快乐体';
          letter-spacing: 2px;
          margin-bottom: 40px;
          margin-top: 50px;
        }
        .button {
          width: 120px;
          height: 38px;
          margin-right: 20px;
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

      .card-list-box {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin: 80px 0 20px 0;
        .card-box {
          width: 33.33%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 40px;
        }
      }
    }
  }

  .pay-img-box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    img {
      width: 300px;
      height: 420px;
      border-radius: 5px;
      box-shadow: 0px 16px 22px 2px rgb(0 37 58 / 10%);
    }
  }
  .pay-tips {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      line-height: 2;
    }
    .vx {
      font-size: 16px;
      font-weight: 600;
    }
  }
</style>
