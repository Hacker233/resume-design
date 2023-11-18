<template>
  <div class="product-price-box">
    <!-- 免费版 -->
    <div class="card">
      <div class="top color-1">
        <h3>免费版</h3>
        <div class="price-box">
          <span>￥</span>
          <p>0</p>
        </div>
        <div class="button button-pay" @click="toGithub"> 去下载 </div>
      </div>
      <div class="center">
        <ul>
          <li>
            可获得简币数量
            <span class="svg-icon">0枚</span>
          </li>
          <li>
            化简官方微信交流群
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            前端最新源码
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            个人用户可用于商业应用开发
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            网站开发部署文档
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            网站后端源码
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            是否具备后台管理系统
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            赠送上千套word简历模板
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            赠送上千套PPT模板
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            企业用户可用于商业应用开发
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            一对一技术指导
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            系统具备简币积分体系功能
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            后端代码持续更新
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            网站功能持续更新迭代
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            存量bug修复
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            二次开发指导
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            是否与化简官网一致
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <p>无后端源码</p>
      </div>
    </div>
    <!-- 99元版 -->
    <div class="card">
      <div class="top color-2">
        <h3>基础版</h3>
        <div class="price-box price-pay">
          <span>￥</span>
          <p>99</p>
        </div>
        <div class="button button-pay" @click="to99"> 立即获取 </div>
      </div>
      <div class="center">
        <ul>
          <li>
            可获得简币数量
            <span class="svg-icon">990枚</span>
          </li>
          <li>
            化简官方微信交流群
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            前端最新源码
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            个人用户可用于商业应用开发
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            网站开发部署文档
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            网站后端源码
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            是否具备后台管理系统
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            赠送上千套word简历模板
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            赠送上千套PPT模板
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            企业用户可用于商业应用开发
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            一对一技术指导
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            系统具备简币积分体系功能
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            后端代码持续更新
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            网站功能持续更新迭代
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            存量bug修复
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            二次开发指导
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            是否与化简官网一致
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <p>后端源码更新至2023年2月</p>
        <span>具备基础后台功能，无积分、积木创作等新功能</span>
      </div>
    </div>
    <!-- 399元版 -->
    <div class="card">
      <div class="top color-3">
        <h3>升级版</h3>
        <div class="price-box price-pay">
          <span>￥</span>
          <p>399</p>
        </div>
        <div class="button button-pay" @click="to399"> 立即获取 </div>
      </div>
      <div class="center">
        <ul>
          <li>
            可获得简币数量
            <span class="svg-icon">3990枚</span>
          </li>
          <li>
            化简官方微信交流群
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            前端最新源码
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            个人用户可用于商业应用开发
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            网站开发部署文档
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            网站后端源码
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            是否具备后台管理系统
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            赠送上千套word简历模板
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            赠送上千套PPT模板
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            企业用户可用于商业应用开发
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            一对一技术指导
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            系统具备简币积分体系功能
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            后端代码持续更新
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            网站功能持续更新迭代
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            存量bug修复
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            二次开发指导
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
          <li>
            是否与化简官网一致
            <svg-icon icon-name="icon-shanchu_huaban" color="#333" size="16px"></svg-icon>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <p>后端源码更新至2023年5月</p>
        <span>具备完善的后台功能，如积分、积木创作等等</span>
      </div>
    </div>
    <!-- 699元版 -->
    <div class="card">
      <div class="top color-4">
        <h3>永久更新版</h3>
        <div class="price-box price-pay">
          <span>￥</span>
          <p>699</p>
        </div>
        <div class="button button-pay" @click="to699"> 立即获取 </div>
      </div>
      <div class="center">
        <ul>
          <li>
            可获得简币数量
            <span class="svg-icon">无限量</span>
          </li>
          <li>
            化简官方微信交流群
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            前端最新源码
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            个人用户可用于商业应用开发
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            网站开发部署文档
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            网站后端源码
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            是否具备后台管理系统
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            赠送上千套word简历模板
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            赠送上千套PPT模板
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            企业用户可用于商业应用开发
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            一对一技术指导
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            系统具备简币积分体系功能
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            后端代码持续更新
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            网站功能持续更新迭代
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            存量bug修复
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            二次开发指导
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
          <li>
            是否与化简官网一致
            <svg-icon icon-name="icon-duigou_kuai" color="#2ddd9d" size="22px"></svg-icon>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <p>持续更新迭代</p>
        <span>与化简官网完全保持一致</span>
      </div>
    </div>

    <!-- 购买弹窗 -->
    <el-dialog v-model="dialogVisible" class="pay-dialog-wrapper" width="500px" destroy-on-close>
      <div class="pay-img-box">
        <img :src="imgSrc" alt="购买" />
      </div>
      <div class="pay-tips">
        <p>支付成功后，添加作者微信，凭支付记录获取相关权限！</p>
        <p class="vx">作者微信：LHQfighting（备注“化简”）</p>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  // 免费版跳转
  const toGithub = () => {
    window.open('https://github.com/Hacker233/resume-design', '_blank');
  };
  const dialogVisible = ref<boolean>(false);
  const imgSrc = ref<string>('https://smallpig.site:9000/resume/logo/vx-pay1.jpg');
  // 99元弹窗
  const to99 = () => {
    imgSrc.value = 'https://smallpig.site:9000/resume/logo/vx-pay1.jpg';
    dialogVisible.value = true;
  };
  // 399元弹窗
  const to399 = () => {
    imgSrc.value = 'https://smallpig.site:9000/resume/logo/vx-pay399.jpg';
    dialogVisible.value = true;
  };
  // 699元弹窗
  const to699 = () => {
    imgSrc.value = 'https://smallpig.site:9000/resume/logo/vx-pay699.jpg';
    dialogVisible.value = true;
  };
</script>
<style lang="scss" scoped>
  .product-price-box {
    display: flex;
    justify-content: center;
    margin: 60px 0 150px 0;
    .card {
      width: 330px;
      min-height: 500px;
      background-color: #ffffff;
      box-shadow: 0px 5px 4px 0px rgba(74, 75, 77, 0.08);
      border-radius: 6px;
      flex-shrink: 0;
      margin: 0 20px;
      overflow: hidden;
      transition: all 0.3s;
      &:hover {
        box-shadow: 5px 5px 20px rgba(203, 205, 211, 0.5);
      }
      .top {
        width: 100%;
        height: 250px;
        padding: 30px 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        opacity: 0.8;
        h3 {
          margin: 0;
          color: #202327;
          font-size: 24px;
          text-align: center;
          letter-spacing: 1px;
          font-weight: 400;
        }
        .price-box {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          color: #6d7581;
          span {
            font-size: 18px;
            padding-bottom: 5px;
          }
          p {
            font-size: 42px;
            letter-spacing: 1px;
          }
        }
        .price-pay {
          color: #fff;
          font-weight: 600;
        }
        .button {
          width: 110px;
          height: 40px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 2px;
          font-size: 14px;
          border-radius: 50px;
          cursor: pointer;
          user-select: none;
        }
        .button-free {
          color: #574537;
          background-color: #e0e7f1;
          cursor: not-allowed;
        }
        .button-pay {
          color: #574537;
          background-color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            opacity: 0.8;
          }
        }
      }
      .color-1 {
        background-color: #ecf1f9;
      }
      .color-2 {
        background-color: #6ed6bd;
      }
      .color-3 {
        background-color: #9a95eb;
      }
      .color-4 {
        background-color: #bd9772;
      }

      .center {
        width: 100%;
        padding: 10px 30px;
        ul {
          display: flex;
          flex-direction: column;
          li {
            position: relative;
            display: flex;
            align-items: center;
            line-height: 40px;
            color: #5f656f;
            justify-content: center;
            font-size: 14px;
            .svg-icon {
              position: absolute;
              right: 0;
              top: 50%;
              transform: translate(0, -50%);
            }
          }
        }
      }

      .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-top: 1px solid #eee;
        height: 80px;
        p {
          font-size: 16px;
          font-weight: bold;
          letter-spacing: 1px;
        }
        span {
          font-size: 12px;
          color: #727272;
          margin-top: 10px;
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
  }
</style>
