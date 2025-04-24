<template>
  <div class="web-code-box">
    <!-- 背景图 -->
    <div class="bgc-img"></div>
    <!-- 内容区域 -->
    <div class="content-bottom-box">
      <!-- 头部标题位置 -->
      <div class="title-box">
        <h1>获取整站源码，私有化部署为你自己的网站！</h1>
        <p class="tips">永久更新版价格会随迭代更新有所上涨，已购买客户不受影响！</p>
      </div>

      <!-- 定价表title -->
      <div ref="priceRef" class="product">
        <product-price></product-price>
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

      <!-- 后台管理 -->
      <introduce-title-vue
        title="完善的后台管理系统"
        subtitle="对于模板、评论、文章、简币等一系列管理操作"
        title-color="#000"
        subtitle-color="#7f8b96"
      ></introduce-title-vue>

      <!-- 管理系统介绍展示 -->
      <div v-viewer class="back-sytstem-box">
        <img src="@/assets/images/back-system-1.png" alt="后台面板" />
        <img src="@/assets/images/back-system-2.png" alt="后台菜单" />
      </div>

      <!-- 产品常见问题介绍 -->
      <introduce-title-vue
        title="常见问题"
        subtitle="对于购买本产品的一些常见问题汇总和解答"
        title-color="#000"
        subtitle-color="#7f8b96"
      ></introduce-title-vue>

      <q-a-list></q-a-list>
    </div>

    <el-backtop :right="50" :bottom="80" />
  </div>
</template>
<script lang="ts" setup>
  import IntroduceCardVue from './components/IntroduceCard.vue';
  import IntroduceTitleVue from './components/IntroduceTitle.vue';
  import ProductPrice from './components/ProductPrice.vue';
  import QAList from './components/QAList.vue';

  // 卡片内容
  const cardList = ref<Array<any>>([
    {
      iconfont: 'icon-codepen',
      title: '整套的前端源码',
      introduce: '猫步简历完整的前端源码，可直接运行使用并打包部署。'
    },
    {
      iconfont: 'icon-_houduankaifa',
      title: '完整的后端源码',
      introduce: '猫步简历完整的后端源码，配置好数据库以及文件存储服务环境后可使用。'
    },
    {
      iconfont: 'icon-database',
      title: 'Mongodb数据库',
      introduce: '猫步简历后台使用的测试数据库，提供相关测试数据。'
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
      introduce: '全面的猫步简历前端项目部署上线的文档，学会此文档，可以让你快速入门部署前端项目。'
    },
    {
      iconfont: 'icon-fuzhi',
      title: '后端项目部署文档',
      introduce: '教你如何将猫步简历后端项目部署到服务器，并且配置好数据库、邮件服务、minio等等。'
    },
    {
      iconfont: 'icon-zhinan',
      title: '项目开发指南',
      introduce: '教你如何使用猫步简历项目，比如如何开发新的简历模板、开发后台接口等等。'
    },
    {
      iconfont: 'icon-zuozhe',
      title: '作者贴心服务',
      introduce: '添加源作者微信，及时解决相关问题，给你贴心的服务。'
    }
  ]);
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
      position: relative;
      .title-box {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 350px;
        align-items: center;
        color: white;
        h1 {
          color: #fff;
          font-size: 50px;
          // font-family: '站酷快乐体';
          letter-spacing: 4px;
          margin-bottom: 40px;
          margin-top: -30px;
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
      .back-sytstem-box {
        display: flex;
        flex-direction: column;
        margin: 80px 0 20px 0;
        img {
          max-width: 100%;
          margin-bottom: 30px;
          box-shadow: 0px 0px 70px rgba(175, 50, 50, 0.1);

          border-radius: 10px;
        }
      }
    }

    .product {
      width: 100%;
      margin: 0 auto;
      margin-top: -150px;
    }
  }
</style>
