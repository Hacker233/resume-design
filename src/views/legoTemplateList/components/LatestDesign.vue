<template>
  <div class="latest-title">
    <h1>最近的设计</h1>
  </div>
  <div v-if="token" class="latest-card-box">
    <!-- 新建空白页 -->
    <div class="card-box-item space-design" @mouseover="mouseover" @mouseleave="mouseleave">
      <svg-icon
        icon-name="icon-jiahao"
        color="#9c9c9c"
        size="48px"
        class-name="catalog-icon"
      ></svg-icon>
      <!-- 遮罩层 -->
      <div ref="maskLayerRef" class="mask-layer">
        <div class="design-button" @click="toSpaceDesign">空白制作</div>
      </div>
    </div>
    <div v-for="(item, index) in legoPersonList" :key="index" class="card-box-item">
      <person-template-card
        :card-data="item"
        :width="cardWidth"
        :height="cardHeight"
        @to-design="toDesignDetail"
        @delete-person-template="deletePersonTemplate"
      >
      </person-template-card>
    </div>
  </div>
  <template v-else>
    <div class="login-content-box" @click="openLoginDialog">
      <p>请先登录</p>
    </div>
  </template>
</template>
<script lang="ts" setup>
  import LoginDialog from '@/components/LoginDialog/LoginDialog';
  import PersonTemplateCard from './PersonTemplateCard.vue';
  import appStore from '@/store';

  const emit = defineEmits(['deletePersonTemplate']);

  const props = defineProps<{
    legoPersonList: any;
    cardWidth: any;
    cardHeight: any;
    category: string;
  }>();

  const { token } = appStore.useTokenStore;

  // 跳转至详情
  const router = useRouter();
  const toDesignDetail = (cardData: { _id: any; category: any }) => {
    router.push({
      path: '/legoDesigner',
      query: {
        id: cardData._id,
        category: cardData.category
      }
    });
  };

  const maskLayerRef = ref<any>(null);
  // 鼠标移入显示遮罩层
  const mouseover = () => {
    maskLayerRef.value.style.opacity = 1;
  };
  const mouseleave = () => {
    maskLayerRef.value.style.opacity = 0;
  };

  // 跳转至空白制作
  const toSpaceDesign = () => {
    router.push({
      path: '/legoDesigner',
      query: {
        category: props.category
      }
    });
  };

  // 打开登录弹窗
  const openLoginDialog = () => {
    LoginDialog(true, '', () => {
      location.reload();
    });
  };

  // 删除个人制作历史
  const deletePersonTemplate = (id: string) => {
    emit('deletePersonTemplate', id);
  };
</script>
<style lang="scss" scoped>
  .latest-title {
    height: 70px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dfdfdf;
    margin-top: 20px;
    h1 {
      color: #0d1216;
      font-size: 16px;
      letter-spacing: 3px;
      font-weight: 600;
    }
  }
  .login-content-box {
    width: 100%;
    height: 100px;
    background-color: rgba($color: #eee, $alpha: 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    cursor: pointer;
    border-radius: 10px;
    margin-bottom: 30px;
    p {
      color: #028e6b;
      font-size: 16px;
      letter-spacing: 2px;
      transition: all 0.3s;
      &:hover {
        color: #06b78b;
      }
    }
  }
  .latest-card-box {
    display: flex;
    padding: 30px 0 0 0;
    flex-wrap: wrap;
    .space-design {
      width: v-bind('cardWidth');
      height: calc(v-bind('cardHeight'));
      background-color: #fff;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      &:hover {
        box-shadow: 0px 16px 22px 2px rgb(0 37 58 / 24%);
        transform: translateY(2%) scale(1.03);
      }
      .mask-layer {
        height: 100%;
        width: 100%;
        border-radius: 5px 5px 0 0;
        position: absolute;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.5);
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        transition: all 0.3s;
        opacity: 0;
        .design-button {
          width: 100px;
          height: 30px;
          font-size: 13px;
          background-color: #2cbd99;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          transition: all 0.3s;
          &:hover {
            background-color: rgba(#42aa90, 0.7);
          }
        }
      }
    }
    .card-box-item {
      &:not(:nth-child(4n)) {
        margin-right: 33px;
      }
    }
  }
</style>
