<!-- 积木创作介绍 -->
<template>
  <div ref="legoDesignRef" class="lego-design-introduce-box">
    <introduce-title-vue
      title="自由的积木创作"
      subtitle="自由设计、自由创作、使用场景更加丰富！"
      title-color="#000"
      subtitle-color="#7f8b96"
    ></introduce-title-vue>
    <div class="bottom">
      <div class="left-box">
        <h1>更加自由的制作方式、提供各式各样的素材、不局限于简历的制作</h1>
        <p>可以制作简历、海报、公众号首图等等</p>
        <div class="button" @click="toLegoDesign"> 立即创作 </div>
      </div>
      <div class="right-box">
        <img src="../../../assets/images/lego-index.png" alt="积木创作" srcset="" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import IntroduceTitleVue from './IntroduceTitle.vue';

  // 跳转至积木创作模板
  const router = useRouter();
  const toLegoDesign = () => {
    router.push('/legoTemplateList');
  };

  // 出现在可视区
  const legoDesignRef = ref<any>(null);
  const scrollIntoView = () => {
    legoDesignRef.value.scrollIntoView({ behavior: 'smooth' });
  };
  defineExpose({
    scrollIntoView
  });
</script>
<style lang="scss" scoped>
  .lego-design-introduce-box {
    min-height: 80vh;
    width: 100%;
    background-color: #fff;
    .bottom {
      display: flex;
      align-items: center;
      padding: 0 5% 40px 5%;

      .left-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: 70px;
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
      .right-box {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0px 0px 70px rgb(175 50 50 / 20%);
        user-select: none;
        width: 50vw;
        img {
          width: 100%;
        }
      }
    }
  }
</style>
