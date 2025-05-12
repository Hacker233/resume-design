<!-- 职行AI宣传 -->
<template>
  <div class="resume-jobzx-ai-box">
    <introduce-title-vue
      title="AI面试助手"
      subtitle="前沿AI技术，为您的面试提供强大支持"
      title-color="#000"
      subtitle-color="#7f8b96"
    ></introduce-title-vue>
    <div class="function-card-box">
      <!-- 服务内容 -->
      <div class="service-card-box">
        <div v-for="(service, index) in services" :key="index" class="card">
          <img :src="images[service.imageSrc]" :alt="service.alt" loading="lazy" />
          <h3>{{ service.title }}</h3>
          <p class="card-content">{{ service.content }}</p>
        </div>
      </div>
      <!-- 查看更多按钮 -->
      <div class="see-more-box">
        <HjButton1 text="前往使用" @click="toJobzx" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { useToJobzxAi } from '@/hooks/useToJobzxAi';
  import IntroduceTitleVue from './IntroduceTitle.vue';
  import HjButton1 from '@/components/HjButton/HjButton1/index.vue';

  const services = [
    {
      imageSrc: '@/assets/images/jobzx/jobzx-3.svg',
      alt: '先进的语音识别',
      title: '先进的语音识别',
      content: '99.8%的准确率，精准捕捉面试官问题'
    },
    {
      imageSrc: '@/assets/images/jobzx/jobzx-2.svg',
      alt: '智能语义理解',
      title: '智能语义理解',
      content: '深度理解面试问题背后的真实意图'
    },
    {
      imageSrc: '@/assets/images/jobzx/jobzx-1.svg',
      alt: '实时大模型推理',
      title: '实时大模型推理',
      content: '毫秒级响应，提供专业精准答案'
    }
  ];

  const images: any = {
    '@/assets/images/jobzx/jobzx-3.svg': new URL(
      '@/assets/images/jobzx/jobzx-3.svg',
      import.meta.url
    ).href,
    '@/assets/images/jobzx/jobzx-2.svg': new URL(
      '@/assets/images/jobzx/jobzx-2.svg',
      import.meta.url
    ).href,
    '@/assets/images/jobzx/jobzx-1.svg': new URL(
      '@/assets/images/jobzx/jobzx-1.svg',
      import.meta.url
    ).href
  };

  // 前往使用
  const toJobzx = () => {
    useToJobzxAi();
  };
</script>
<style lang="scss" scoped>
  .resume-jobzx-ai-box {
    background-image: linear-gradient(to top, #ffffff 0%, rgb(247, 245, 245) 100%);
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 80px;
    .function-card-box {
      display: flex;
      flex-direction: column;
      width: 1200px;
      .service-card-box {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: 0 auto;

        .card {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          width: 350px;
          height: auto;
          box-shadow: rgba(100, 100, 111, 0.1) 0px 7px 29px 0px;
          border-radius: 10px;
          padding: 10px 15px 15px 15px;
          box-sizing: border-box;
          transition: all 0.3s;
          padding-top: 20px;
          position: relative;
          overflow: hidden;

          &:hover {
            box-shadow: rgba(100, 100, 111, 0.4) 0px 7px 29px 0px;
          }

          img {
            height: 100px;
            width: auto;
            margin-bottom: 10px;
          }

          h3 {
            font-size: 20px;
            color: #383737;
            margin: 10px;
            padding: 0;
            letter-spacing: 2px;
            margin-bottom: 20px;
          }

          .card-content {
            font-size: 14px;
            color: #7f8b96;
            text-align: justify;
            line-height: 1.5;
            letter-spacing: 1px;
            padding: 0 10px;
          }

          .price-and-consult {
            height: 60px;
            width: 100%;
            background-image: linear-gradient(
              to top,
              rgb(184, 197, 219) 0%,
              rgb(157, 176, 202) 70%
            );
            position: absolute;
            bottom: 0;
            left: 0;
            cursor: pointer;
            transition: all 0.3s;
            & :hover {
              opacity: 0.7;
            }

            p {
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              color: rgb(138, 244, 141);
              box-sizing: border-box;
              font-size: 20px;
              font-weight: 600;

              span {
                font-size: 30px;
                background: -webkit-linear-gradient(top, #f3e7e9, rgb(97, 238, 102));
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                letter-spacing: 1px;
                margin-right: 5px;
              }
            }
          }
        }
      }
      .see-more-box {
        display: flex;
        z-index: 1;
        justify-content: center;
        margin-top: 90px;

        :deep(.custom-btn) {
          width: 200px;
          height: 50px;

          span {
            font-size: 18px;
            letter-spacing: 5px;
          }
        }

        .btn-9:after {
          background-image: linear-gradient(300deg, #1fd1f9 0%, #7f6dbb 50%);
        }
      }
    }
  }
</style>
