<!-- 根据简历用途选择模版 -->
<template>
  <div class="resume-function-introduce-box">
    <introduce-title-vue
      title="简历制作功能介绍"
      subtitle=""
      title-color="#000"
      subtitle-color="#7f8b96"
    ></introduce-title-vue>
    <div class="function-card-box">
      <div class="card-top">
        <div class="card">
          <img src="../../../assets/images/resumeFunctionIntro/cloud.svg" alt="" srcset="" />
          <h1>云端存储</h1>
          <p>数据存储至云端，实时同步，永不丢失</p>
        </div>
        <div class="card">
          <img src="../../../assets/images/resumeFunctionIntro/module.svg" alt="" srcset="" />
          <h1>模块定制</h1>
          <p>所有简历模块皆可自由调整、隐藏或显示</p>
        </div>
        <div class="card">
          <img src="../../../assets/images/resumeFunctionIntro/theme.svg" alt="" srcset="" />
          <h1>皮肤色彩定制</h1>
          <p>海量皮肤随心定制，做出独一无二的简历</p>
        </div>
      </div>
      <div class="card-top">
        <div class="card">
          <img src="../../../assets/images/resumeFunctionIntro/ainew.svg" alt="" srcset="" />
          <h1>AI帮写</h1>
          <p>AI智能帮写简历，快速完成简历</p>
        </div>
        <div class="card">
          <img src="../../../assets/images/resumeFunctionIntro/aiedit.svg" alt="" srcset="" />
          <h1>AI润色</h1>
          <p>AI帮改简历、提高专业性</p>
        </div>
        <div class="card">
          <img src="../../../assets/images/resumeFunctionIntro/aifanyi.svg" alt="" srcset="" />
          <h1>AI翻译</h1>
          <p>AI多语言翻译简历、快速生成</p>
        </div>
      </div>
      <div class="card-bottom">
        <div class="card">
          <img src="../../../assets/images/resumeFunctionIntro/download.svg" alt="" srcset="" />
          <h1>多端下载</h1>
          <p>多端一键下载简历，打印、投递更方便</p>
        </div>
        <div class="card">
          <img src="../../../assets/images/resumeFunctionIntro/data.svg" alt="" srcset="" />
          <h1>专注数据</h1>
          <p>专注于简历数据填写，排除其他干扰</p>
        </div>
        <div class="card">
          <img src="../../../assets/images/resumeFunctionIntro/json.svg" alt="" srcset="" />
          <h1>导出JSON</h1>
          <p>源码级别JSON数据导出，本地编辑 </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import IntroduceTitleVue from './IntroduceTitle.vue';
</script>
<style lang="scss" scoped>
  .resume-function-introduce-box {
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
    padding-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10vh;
    .function-card-box {
      display: flex;
      flex-direction: column;
      width: 1200px;
      .card-top {
        display: flex;
        justify-content: space-around;
        margin-bottom: 50px;
      }
      .card-bottom {
        display: flex;
        justify-content: space-around;
      }
      .card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 295px;
        box-shadow: rgba(100, 100, 111, 0.1) 0px 7px 29px 0px;
        border-radius: 10px;
        padding: 10px 15px 40px 15px;
        box-sizing: border-box;
        transition: all 0.3s;
        &:hover {
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }
        img {
          max-width: 60%;
          height: auto;
        }
        h1 {
          font-size: 20px;
          color: #383737;
          margin: 10px;
          padding: 0;
          letter-spacing: 2px;
        }
        p {
          font-size: 14px;
          color: #7f8b96;
          text-align: justify;
        }
      }
    }
  }
</style>
