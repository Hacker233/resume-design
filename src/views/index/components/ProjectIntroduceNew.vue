<template>
  <div class="project-introduce-new-box">
    <label>
      <input type="checkbox" />
      <div class="scene">
        <!--太陽月亮-->
        <div class="sun"></div>
        <!-- <div class="moon"></div> -->
        <div class="allstars">
          <div class="star1"></div>
          <div class="star2"></div>
          <div class="star3"></div>
          <div class="star4"></div>
          <div class="star5"></div>
          <div class="star6"></div>
          <div class="star7"></div>
          <div class="star8"></div>
          <div class="star9"></div>
          <div class="star10"></div>
          <div class="star11"></div>
          <div class="star12"></div>
          <div class="star13"></div>
          <div class="star14"></div>
          <div class="star15"></div>
          <div class="star16"></div>
          <div class="star17"></div>
          <div class="star18"></div>
          <div class="star19"></div>
          <div class="star20"></div>
          <div class="star21"></div>
          <div class="star22"></div>
          <div class="star23"></div>
          <div class="star24"></div>
          <div class="star25"></div>
          <div class="star26"></div>
          <div class="star27"></div>
          <div class="star28"></div>
          <div class="star29"></div>
          <div class="star30"></div>
        </div>
        <!--建築物們-->
        <!-- <div class="building">
          <div class="house1">
            <div class="window">
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
          </div>
          <div class="house2">
            <div class="door"></div>
          </div>
          <div class="house3">
            <div class="wall">
              <div class="window"></div>
            </div>
            <div class="wall">
              <div class="window"></div>
            </div>
            <div class="wall">
              <div class="window"></div>
            </div>
            <div class="roof">
              <div class="rooftop">
                <div class="cross"></div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </label>
    <!--内容区域-->
    <div class="content-box">
      <h1>一款开源、免费、专业的简历制作神器</h1>
      <p>交付源码级JSON，提供海量模版，实时导出超高清PDF</p>

      <!-- 查看更多按钮 -->
      <div class="see-more-box">
        <hj-button-1 text="免费制作专业简历" @click="freeMakeResume"></hj-button-1>
        <!-- <hj-button-1 text="积木创作" @click="toLego"></hj-button-1>
        <hj-button-1 v-config:open_get_source_code text="获取源码" @click="toWebCode"></hj-button-1> -->
      </div>

      <!-- 示例图 -->
      <img class="mac-png" src="../../../assets//images/index-mac.svg" alt="" />

      <!-- 下滑提示按钮 -->
      <div class="scroll-more-box" @click.prevent="seeMore">
        <svg-icon
          icon-name="icon-z044"
          size="25px"
          color="rgba(255, 255, 255, 0.5)"
          class-name="more-icon"
        ></svg-icon>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { closeGlobalLoading } from '@/utils/common';
  import HjButton1 from '@/components/HjButton/HjButton1/index.vue';

  const emit = defineEmits(['freeMake', 'legoDesign', 'webcode', 'seeMore']);
  const freeMakeResume = () => {
    emit('freeMake');
  };

  const seeMore = () => {
    emit('seeMore');
  };
  // 成为赞助者
  // const toWebCode = () => {
  //   emit('webcode');
  // };

  // 跳转到积木创作
  // const toLego = () => {
  //   emit('legoDesign');
  // };

  // 页面销毁
  onUnmounted(() => {
    closeGlobalLoading(); // 关闭全局等待层
  });
</script>
<style lang="scss" scoped>
  .project-introduce-new-box {
    position: relative;
    height: 100vh;
  }
  *,
  *:before,
  *:after {
    position: relative;
  }

  .scene {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(#1d2b49, #1a45a0, #91cdff, #fff);
    background-size: 100% 300%;
  }

  .building {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: scale(0.95);
  }

  [class^='house'] {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .house1 {
    width: 180px;
    height: 200px;
    border-radius: 0;
    z-index: 1;
    background-color: #fafaf5;
    box-shadow: -50px 0px #e3e2cf inset;
  }
  .house1 .window {
    width: 40px;
    height: 100px;
    border-radius: 20px;
    background-color: #e3e2cf;
    box-shadow: inset 8px 5px #bebdaf;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 40px;
    margin-left: 70px;
  }
  .house1 .window .circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #534d4d;
    margin: 4px;
    margin-left: 10px;
  }

  .house2 {
    width: 240px;
    height: 170px;
    border-radius: 0;
    right: 130px;
    z-index: 2;
    background-color: #fafaf5;
    box-shadow: 0px 15px #8dc9fc inset, -72px 0px #e3e2cf inset;
  }
  .house2 .door {
    width: 40px;
    height: 80px;
    border-radius: 20px 20px 0 0;
    position: absolute;
    bottom: 0;
    left: 45px;
    background-color: #2c2f36;
    box-shadow: inset 10px 2px #7cb1ff;
  }

  .house3 {
    width: 320px;
    height: 300px;
    border-radius: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 0;
    background-color: #fafaf5;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  .house3 .wall {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .house3 .wall .window {
    width: 24px;
    height: 50px;
    border-radius: 12px 12px 0px 0px;
    margin-top: 30px;
    background-color: #2c2f36;
  }
  .house3 .wall:before {
    content: '';
    display: block;
    width: 105%;
    height: 20px;
    border-radius: 0;
    position: absolute;
    top: -20px;
    background-color: inherit;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  .house3 .wall:nth-child(1) {
    background-color: #fafaf5;
    flex: 10;
  }
  .house3 .wall:nth-child(1) .window {
    box-shadow: inset 8px 0px #7cb1ff;
  }
  .house3 .wall:nth-child(1):before {
    z-index: 1;
  }
  .house3 .wall:nth-child(2) {
    background-color: #e3e2cf;
    flex: 14;
  }
  .house3 .wall:nth-child(2) .window {
    box-shadow: inset 0px 0px #7cb1ff;
  }
  .house3 .wall:nth-child(2):before {
    z-index: 2;
  }
  .house3 .wall:nth-child(3) {
    background-color: #bebdaf;
    flex: 10;
  }
  .house3 .wall:nth-child(3) .window {
    box-shadow: inset -8px 0px #7cb1ff;
  }
  .house3 .wall:nth-child(3):before {
    z-index: 1;
  }

  .roof {
    width: 300px;
    height: 150px;
    border-radius: 150px 150px 0 0;
    position: absolute;
    top: -170px;
    right: 5px;
    background: linear-gradient(150deg, #6fc5ff, #0058ff);
  }
  .roof .rooftop {
    width: 28px;
    height: 14px;
    border-radius: 14px 14px 0 0;
    position: absolute;
    left: 50%;
    top: -14px;
    transform: translateX(-50%);
    background-color: #fff;
  }
  .roof .cross {
    width: 4px;
    height: 30px;
    border-radius: 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10px;
    background-color: #fff;
  }
  .roof .cross:before {
    content: '';
    display: block;
    width: 20px;
    height: 4px;
    border-radius: 0;
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
  }

  .allstars {
    width: 100%;
    height: 100%;
    border-radius: 0;
    position: absolute;
    left: 0;
    top: 0;
  }
  @-webkit-keyframes falling {
    0%,
    100% {
      opacity: 0;
    }
    70% {
      opacity: 1;
    }
    0% {
      transform: translate(100px, 0px);
    }
    100% {
      transform: translate(0px, 200px);
    }
  }
  @keyframes falling {
    0%,
    100% {
      opacity: 0;
    }
    70% {
      opacity: 1;
    }
    0% {
      transform: translate(100px, 0px);
    }
    100% {
      transform: translate(0px, 200px);
    }
  }
  .allstars [class^='star'] {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: #fff;
    -webkit-animation: falling 2s infinite;
    animation: falling 2s infinite;
  }
  .allstars .star1 {
    position: absolute;
    left: 93%;
    top: -4%;
    -webkit-animation-delay: -0.1s;
    animation-delay: -0.1s;
  }
  .allstars .star2 {
    position: absolute;
    left: 30%;
    top: 49%;
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
  }
  .allstars .star3 {
    position: absolute;
    left: 2%;
    top: 29%;
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
  }
  .allstars .star4 {
    position: absolute;
    left: 79%;
    top: 5%;
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
  }
  .allstars .star5 {
    position: absolute;
    left: 43%;
    top: 16%;
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }
  .allstars .star6 {
    position: absolute;
    left: 12%;
    top: 0%;
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s;
  }
  .allstars .star7 {
    position: absolute;
    left: 52%;
    top: 3%;
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s;
  }
  .allstars .star8 {
    position: absolute;
    left: 44%;
    top: -17%;
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
  .allstars .star9 {
    position: absolute;
    left: 88%;
    top: -30%;
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
  .allstars .star10 {
    position: absolute;
    left: 89%;
    top: 46%;
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }
  .allstars .star11 {
    position: absolute;
    left: 22%;
    top: 4%;
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }
  .allstars .star12 {
    position: absolute;
    left: 25%;
    top: 38%;
    -webkit-animation-delay: -1.2s;
    animation-delay: -1.2s;
  }
  .allstars .star13 {
    position: absolute;
    left: 59%;
    top: 35%;
    -webkit-animation-delay: -1.3s;
    animation-delay: -1.3s;
  }
  .allstars .star14 {
    position: absolute;
    left: 1%;
    top: -3%;
    -webkit-animation-delay: -1.4s;
    animation-delay: -1.4s;
  }
  .allstars .star15 {
    position: absolute;
    left: 10%;
    top: 25%;
    -webkit-animation-delay: -1.5s;
    animation-delay: -1.5s;
  }
  .allstars .star16 {
    position: absolute;
    left: 29%;
    top: -15%;
    -webkit-animation-delay: -1.6s;
    animation-delay: -1.6s;
  }
  .allstars .star17 {
    position: absolute;
    left: 42%;
    top: -8%;
    -webkit-animation-delay: -1.7s;
    animation-delay: -1.7s;
  }
  .allstars .star18 {
    position: absolute;
    left: 68%;
    top: -15%;
    -webkit-animation-delay: -1.8s;
    animation-delay: -1.8s;
  }
  .allstars .star19 {
    position: absolute;
    left: 77%;
    top: 26%;
    -webkit-animation-delay: -1.9s;
    animation-delay: -1.9s;
  }
  .allstars .star20 {
    position: absolute;
    left: 63%;
    top: 38%;
    -webkit-animation-delay: -2s;
    animation-delay: -2s;
  }
  .allstars .star21 {
    position: absolute;
    left: 31%;
    top: -27%;
    -webkit-animation-delay: -2.1s;
    animation-delay: -2.1s;
  }
  .allstars .star22 {
    position: absolute;
    left: 3%;
    top: 8%;
    -webkit-animation-delay: -2.2s;
    animation-delay: -2.2s;
  }
  .allstars .star23 {
    position: absolute;
    left: 40%;
    top: -27%;
    -webkit-animation-delay: -2.3s;
    animation-delay: -2.3s;
  }
  .allstars .star24 {
    position: absolute;
    left: 26%;
    top: 2%;
    -webkit-animation-delay: -2.4s;
    animation-delay: -2.4s;
  }
  .allstars .star25 {
    position: absolute;
    left: 4%;
    top: 1%;
    -webkit-animation-delay: -2.5s;
    animation-delay: -2.5s;
  }
  .allstars .star26 {
    position: absolute;
    left: 2%;
    top: 24%;
    -webkit-animation-delay: -2.6s;
    animation-delay: -2.6s;
  }
  .allstars .star27 {
    position: absolute;
    left: 64%;
    top: 4%;
    -webkit-animation-delay: -2.7s;
    animation-delay: -2.7s;
  }
  .allstars .star28 {
    position: absolute;
    left: 17%;
    top: -29%;
    -webkit-animation-delay: -2.8s;
    animation-delay: -2.8s;
  }
  .allstars .star29 {
    position: absolute;
    left: 77%;
    top: 36%;
    -webkit-animation-delay: -2.9s;
    animation-delay: -2.9s;
  }
  .allstars .star30 {
    position: absolute;
    left: 1%;
    top: 19%;
    -webkit-animation-delay: -3s;
    animation-delay: -3s;
  }

  .remind {
    opacity: 0.2;
    margin-bottom: 10px;
    letter-spacing: 1px;
  }

  .dayText {
    display: none;
  }

  .sun,
  .moon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    left: 30%;
    top: 30%;
  }

  .sun {
    background-color: #ffdd38;
    box-shadow: 0px 0px 20px rgba(255, 221, 56, 0.5);
    opacity: 0;
  }

  .moon {
    -webkit-animation: moonAppear 5s both;
    animation: moonAppear 5s both;
  }

  @-webkit-keyframes moonAppear {
    0% {
      box-shadow: inset 0px 0px rgba(255, 255, 255, 0.9);
    }
    100% {
      box-shadow: inset 10px -10px rgba(255, 255, 255, 0.9);
    }
  }

  @keyframes moonAppear {
    0% {
      box-shadow: inset 0px 0px rgba(255, 255, 255, 0.9);
    }
    100% {
      box-shadow: inset 10px -10px rgba(255, 255, 255, 0.9);
    }
  }
  h1,
  h5,
  p,
  .moon,
  .sun,
  .scene,
  .allstars,
  .blueblock,
  .building {
    transition: 2s;
  }

  input:checked + .scene {
    background-position: 0 100%;
  }
  input:checked + .scene .nightText {
    display: none;
  }
  input:checked + .scene .dayText {
    display: block;
  }
  input:checked + .scene .allstars {
    opacity: 0;
  }
  input:checked + .scene h1,
  input:checked + .scene h5,
  input:checked + .scene p {
    color: #222;
  }
  input:checked + .scene .building {
    filter: brightness(105%);
  }
  input:checked + .scene .moon {
    top: -100px;
    opacity: 0;
  }
  input:checked + .scene .sun {
    top: 30%;
    opacity: 1;
  }
  input:checked + .scene .blueblock {
    background-color: white;
  }

  input {
    display: none;
  }

  // 左侧内容
  .content-box {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 65px;
    box-sizing: border-box;
    h1 {
      font-size: 4vh;
      margin-bottom: 30px;
      margin-top: 8vh;
      letter-spacing: 2px;
    }
    p {
      width: 700px;
      font-size: 1.5vh;
      text-align: center;
      line-height: 2;
      letter-spacing: 2px;
    }
    .see-more-box {
      margin-top: 4vh;
      display: flex;
      z-index: 1;
      :deep(.custom-btn) {
        width: 300px;
        height: 50px;
        span {
          font-size: 18px;
          letter-spacing: 5px;
        }
      }
    }
    .mac-png {
      height: 56%;
      width: auto;
      position: absolute;
      bottom: 4.5vh;
    }

    .scroll-more-box {
      position: absolute;
      left: 50%;
      bottom: 5px;
      z-index: 1;
      transition: all 0.3s;
      &:hover {
        opacity: 0.7;
      }
      .more-icon {
        cursor: pointer;
        animation: myfirst 2s infinite;
      }
    }
    @keyframes myfirst {
      0% {
        transform: translate(0px, 0px);
      }
      50% {
        transform: translate(0px, -10px);
      }
      100% {
        transform: translate(0px, 0px);
      }
    }
  }
</style>
