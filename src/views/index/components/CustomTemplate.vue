<!-- 自定义模板 -->
<template>
  <div class="custom-template-box" ref="customTempleRef">
    <introduce-title-vue
      title="自定义模板 + 随心所欲"
      subtitle="自定义模板，随意搭配，自定义主题"
      title-color="#000"
      subtitle-color="#7f8b96"
    ></introduce-title-vue>
    <div class="bottom">
      <div class="left-box">
        <img src="../../../assets/images/index-drag.png" alt="" srcset="" />
      </div>
      <div class="right-box">
        <h1>丰富的物料模块组件，可随意进行搭配，还可进行主题配置等等</h1>
        <p>自定义的模板可提交至官方，将在首页展出</p>
        <div class="button" @click="toCustom"> 开始创建模板 </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { openGlobalLoading } from '@/utils/common';
  import IntroduceTitleVue from './IntroduceTitle.vue';

  // 点击立即创作按钮
  const router = useRouter();
  const { resetResumeJson } = appStore.useResumeJsonNewStore;
  const toCustom = () => {
    resetResumeJson(); // 重置简历数据
    openGlobalLoading(); // 等待动画层
    router.push({
      path: '/custom'
    });
  };

  // 出现在可视区
  const customTempleRef = ref<any>(null);
  const scrollIntoView = () => {
    customTempleRef.value.scrollIntoView({ behavior: 'smooth' });
  };
  defineExpose({
    scrollIntoView
  });
</script>
<style lang="scss" scoped>
  .custom-template-box {
    min-height: 80vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2% 40px 5%;
      box-sizing: border-box;
      min-height: 60vh;
      .left-box {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0px 0px 70px rgb(175 50 50 / 20%);
        user-select: none;
        img {
          width: 50vw;
        }
      }
      .right-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 100px;
        h1 {
          text-align: justify;
          font-size: 2vw;
          letter-spacing: 1px;
          word-break: normal;
          line-height: 1.5;
          background-clip: text;
          background-image: url('@/assets/images/font-bgc.png');
          -webkit-background-clip: text;
          color: transparent;
          margin-bottom: 10px;
        }
        p {
          margin-top: 10px;
          font-size: 0.8vw;
          opacity: 0.9;
          color: #7f8b96;
        }
        .button {
          width: 160px;
          height: 52px;
          line-height: 52px;
          margin-top: 40px;
          background-color: #00c090;
          text-align: center;
          color: #fff;
          font-size: 16px;
          border-radius: 52px;
          cursor: pointer;
          -webkit-transition: all 0.2s;
          -moz-transition: all 0.2s;
          -ms-transition: all 0.2s;
          transition: all 0.2s;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
</style>
