<template>
  <div class="resume-service-container">
    <!-- 头部背景 -->
    <div class="resume-service-top-bgc"></div>
    <div class="resume-service-content">
      <!-- 头部内容 -->
      <div class="content-top">
        <div class="left-content">
          <div class="left-title">
            <h2 class="title">猫步简历创始人 1V1 简历优化</h2>
            <p>
              猫步简历的创始人，拥有世界500强企业的工作履历，阅览简历无数，积累了丰富的简历制作、模板设计与定制经验。我们将凭借专业能力，为您提供全方位的简历定制服务，涵盖格式调整、内容精修等，确保为您打造一份契合需求的优质简历。
            </p>
          </div>
          <!-- 查看更多按钮 -->
          <div class="see-more-box">
            <HjButton1 text="立即咨询" @click="toContact" />
          </div>
        </div>
        <!-- 图片 -->
        <div class="right-img"></div>
      </div>
      <!-- 特色介绍 -->
      <div class="content-introduce">
        <div v-for="(item, index) in introduceItems" :key="index" class="introduce-card">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
      <!-- 提供服务 -->
      <div class="content-service">
        <IntroduceTitleVue
          title="我们提供以下服务"
          subtitle=""
          title-color="#000"
          subtitle-color="#7f8b96"
        ></IntroduceTitleVue>
        <!-- 服务内容 -->
        <div class="service-card-box">
          <div
            v-for="(service, index) in services"
            :key="index"
            class="card"
            @mouseenter="handleMouseEnter(index)"
            @mouseleave="handleMouseLeave(index)"
          >
            <img :src="images[service.imageSrc]" :alt="service.alt" loading="lazy" />
            <h3>{{ service.title }}</h3>
            <p class="card-content">{{ service.content }}</p>
            <!-- 咨询和价格 -->
            <div class="price-and-consult" @click="toContact">
              <p v-if="showPrices[index]">
                <span class="price">{{ service.price }}</span
                >￥
              </p>
              <p v-else>立即咨询</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 我们的优势 -->
      <div class="our-advantage">
        <IntroduceTitleVue
          title="我们的优势"
          subtitle=""
          title-color="#000"
          subtitle-color="#7f8b96"
        ></IntroduceTitleVue>
        <div class="advantage-card-box">
          <div v-for="(advantage, index) in advantages" :key="index" class="advantage-card">
            <div class="card-left">
              <h3>{{ advantage.title }}</h3>
            </div>
            <div class="card-right">
              <p>{{ advantage.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 咨询方式弹窗 -->
    <contact-dialog
      :dialog-contact-visible="dialogContactVisible"
      :vx-qun="wxQun"
      :wx="wx"
      @cancle="cancelContact"
    ></contact-dialog>
  </div>
  <!-- footer -->
  <footer-com ref="footerRef"></footer-com>
</template>

<script setup lang="ts">
  import HjButton1 from '@/components/HjButton/HjButton1/index.vue';
  import IntroduceTitleVue from '@/views/index/components/IntroduceTitle.vue';
  import ContactDialog from './components/ContactDialog.vue';

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

  // 初始化 showPrices 数组
  const showPrices = ref<boolean[]>(services.map(() => true));

  const introduceItems = [
    { title: '1V1 沟通', description: '充分理解您的需求' },
    { title: '质量保证', description: '经验丰富的创始人为您服务' },
    { title: '3 大求职阶段', description: '实习/校招/在职跳槽全覆盖' }
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

  const handleMouseEnter = (index: number) => {
    showPrices.value[index] = false;
  };

  const handleMouseLeave = (index: number) => {
    showPrices.value[index] = true;
  };

  const advantages = [
    {
      title: '服务专业',
      description:
        '猫步简历创始人辅导简历，拥有世界500强企业的工作履历，经验丰富，专业能力有保证。猫步简历网站由创始人从0到1全量参与创建，阅览无数简历，深入理解HR认可什么样的简历。相较于某宝、某鱼等平台，没有质量保证，甚至简历辅导人员是兼职大学生，我们辅导人员专业度显而易见。'
    },
    {
      title: '价格合理',
      description:
        '相较于市面上的其他平台，猫步简历网站的价格公开透明、明码标价、没有私下收费。不同于其他平台的私下询价、不同导师价格差距较大，在这里你让你更加省心，也更加放心。'
    },
    {
      title: '无中间商',
      description:
        '简历服务由猫步简历网站发起，不用担心多层中间商提成，导致价格与实际服务价值不匹配。如在某鱼、某宝等平台，可能存在多层转包的情况，最终您支付了较高的价格，最终却只能得到一个低价值的简历服务。'
    }
  ];

  // 获取微信群
  const wxQun = ref('');
  const wx = ref('');
  const footerRef = ref<any>(null);

  // 打开立即咨询弹窗
  const dialogContactVisible = ref(false);
  const toContact = () => {
    footerRef.value.vxQunList.forEach((element: any) => {
      if (element.name === '用户交流群') {
        wxQun.value = element.qr_code;
      }
      if (element.name === '添加微信') {
        wx.value = element.qr_code;
      }
    });
    dialogContactVisible.value = true;
  };
  const cancelContact = () => {
    dialogContactVisible.value = false;
  };
</script>

<style lang="scss" scoped>
  .resume-service-container {
    width: 100%;
    height: 100%;
    background: #f8f8f8;

    .resume-service-top-bgc {
      width: 100%;
      height: 600px;
      background: #fff;
      position: absolute;
      top: 65px;
      background-image: url('@/assets/images/home/home-bg.png');
      background-size: 100% 100%;
    }

    .resume-service-content {
      max-width: 1400px;
      margin: 0 auto;
      padding-bottom: 60px;

      .content-top {
        width: 100%;
        height: 600px;
        position: relative;
        display: flex;
        justify-content: space-between;

        .left-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;

          .left-title {
            .title {
              font-size: 35px;
              letter-spacing: 2px;
              line-height: 1.5;
              background: linear-gradient(45deg, rgb(176, 165, 203), rgb(33, 4, 86));
              background-clip: text;
              color: transparent;
              margin-bottom: 25px;
              text-align: justify;
            }

            p {
              font-size: 20px;
              letter-spacing: 2px;
              line-height: 1.6;
              width: 90%;
              background: linear-gradient(45deg, #827999, #7f6dbb);
              background-clip: text;
              color: transparent;
              opacity: 0.9;
              text-align: justify;
            }
          }

          .see-more-box {
            display: flex;
            z-index: 1;
            margin: 30px 0 80px 0;

            > :first-child {
              margin-right: 30px;
            }

            :deep(.custom-btn) {
              width: 250px;
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

        .right-img {
          width: 600px;
          height: 600px;
          background-image: url('@/assets/images/resumeService/right-top.png');
          background-size: cover;
        }
      }

      .content-introduce {
        height: 90px;
        width: 100%;
        display: flex;
        justify-content: space-between;

        .introduce-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          letter-spacing: 2px;

          h3 {
            font-size: 16px;
            color: #1c212a;
            font-weight: 500;
            line-height: normal;
            margin-bottom: 10px;
          }

          p {
            color: #4b596b;
            font-size: 14px;
            font-weight: 400;
            line-height: normal;
            text-align: center;
          }
        }
      }

      .content-service {
        margin-bottom: 30px;
        .service-card-box {
          display: flex;
          justify-content: space-between;
          width: 80%;
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
            padding: 10px 15px 80px 15px;
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
      }

      .our-advantage {
        .advantage-card-box {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 80%;
          margin: 0 auto;

          .advantage-card {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-bottom: 30px;
            height: auto;
            box-shadow: rgba(100, 100, 111, 0.1) 0px 7px 29px 0px;
            border-radius: 10px;
            padding: 50px 30px;
            box-sizing: border-box;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;

            &:hover {
              box-shadow: rgba(100, 100, 111, 0.4) 0px 7px 29px 0px;
            }

            .card-left {
              width: 150px;
              flex-shrink: 0;
              display: flex;
              align-items: center;
              justify-content: center;

              h3 {
                font-size: 22px;
                color: #fff;
                margin: 0;
                padding: 0;
                letter-spacing: 1px;
                font-weight: bold;
                background: linear-gradient(45deg, #7f6dbb, #1fd1f9);
                border-radius: 5px;
                padding: 10px;
                text-align: center;
              }
            }

            .card-right {
              display: flex;
              flex-grow: 1;
              align-items: center;
              padding-left: 20px;

              p {
                font-size: 16px;
                color: #555;
                text-align: left;
                line-height: 1.6;
                letter-spacing: 0.5px;
                margin: 0;
              }
            }
          }
        }
      }
    }
  }
</style>
