<!-- 根据简历用途选择模版 -->
<template>
  <div class="resume-function-introduce-box">
    <introduce-title-vue
      title="简历优化服务"
      subtitle="猫步简历创始人，专业分析您的简历"
      title-color="#000"
      subtitle-color="#7f8b96"
    ></introduce-title-vue>
    <div class="function-card-box">
      <!-- 服务内容 -->
      <div class="service-card-box">
        <div v-for="(service, index) in services" :key="index" class="card">
          <img :src="images[service.imageSrc]" :alt="service.alt" loading="lazy" />
          <h5>{{ service.title }}</h5>
          <p class="card-content">{{ service.content }}</p>
        </div>
      </div>
      <!-- 查看更多按钮 -->
      <div class="see-more-box">
        <HjButton1 text="立即咨询" @click="toContact" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import IntroduceTitleVue from './IntroduceTitle.vue';
  import HjButton1 from '@/components/HjButton/HjButton1/index.vue';

  const services = [
    {
      imageSrc: '@/assets/images/resumeService/resume-style.svg',
      alt: '简历格式修改',
      title: '简历格式优化',
      content:
        '猫步简历创始人将从专业角度帮您调整简历格式，包括简历行间距、字体大小等等，让您专注于简历内容的编写，你只需要提供一份您已经编写好的简历，简历必须是在猫步简历网站上制作的，或者简历已迁移至猫步简历网站。',
      price: 59
    },
    {
      imageSrc: '@/assets/images/resumeService/resume-content.svg',
      alt: '简历内容优化',
      title: '简历内容优化',
      content:
        '我们将从专业角度分析您的简历内容，针对您的求职岗位，为您提出相关优化建议，最大程度满足凸显用户特点和高度匹配岗位，最高提升4倍以上的投递通过率。',
      price: 129
    },
    {
      imageSrc: '@/assets/images/resumeService/resume-create.svg',
      alt: '简历定制服务',
      title: '简历定制服务',
      content:
        '从0开始为您制作一份符合岗位需求的专业简历，我们将深度挖掘您的过往经历，结合市场需求，最终给您一份定制化的简历，并且简历可以在猫步简历网站上持续在线制作修改。',
      price: 229
    }
  ];

  const images: any = {
    '@/assets/images/resumeService/resume-style.svg': new URL(
      '@/assets/images/resumeService/resume-style.svg',
      import.meta.url
    ).href,
    '@/assets/images/resumeService/resume-content.svg': new URL(
      '@/assets/images/resumeService/resume-content.svg',
      import.meta.url
    ).href,
    '@/assets/images/resumeService/resume-create.svg': new URL(
      '@/assets/images/resumeService/resume-create.svg',
      import.meta.url
    ).href
  };

  // 立即咨询
  const router = useRouter();
  const toContact = () => {
    router.push('/resumeService');
  };
</script>
<style lang="scss" scoped>
  .resume-function-introduce-box {
    background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
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
          width: 295px;
          height: auto;
          box-shadow: rgba(100, 100, 111, 0.1) 0px 7px 29px 0px;
          border-radius: 10px;
          padding: 10px 15px 50px 15px;
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

          h5 {
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
            height: 150px;
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
