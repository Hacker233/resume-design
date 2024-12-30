<template>
  <div class="footer-box">
    <!-- 相关推荐 -->
    <div class="recommend">
      <!-- 联系我 -->
      <div class="contact-me">
        <div v-viewer class="add-wechat">
          <img src="@/assets/images/wechat.jpg" alt="个人微信" />
          <p>添加微信</p>
        </div>
        <div v-viewer class="concern-zhihu">
          <img src="@/assets/images/gzh.jpg" alt="资料分享大师" />
          <p>关注公众号</p>
        </div>
      </div>
      <!-- 关于我 -->
      <div class="about-me">
        <h1>社交平台</h1>
        <p>
          <a
            href="https://space.bilibili.com/493520625?spm_id_from=333.1007.0.0"
            target="_blank"
            rel="noopener noreferrer"
            >哔哩哔哩</a
          >
        </p>
        <p>
          <a
            href="https://juejin.cn/user/3034307822112798"
            target="_blank"
            rel="noopener noreferrer"
            >稀土掘金</a
          >
        </p>
        <p>
          <a
            href="https://www.zhihu.com/people/luhongquan"
            target="_blank"
            rel="noopener noreferrer"
            >个人知乎</a
          >
        </p>
      </div>
      <!-- 友情链接 -->
      <div class="links">
        <h1>友情链接</h1>
        <p>
          <a href="https://www.ubrand.com/" target="_blank" rel="noopener noreferrer">AI品牌设计</a>
        </p>
        <p>
          <a href="https://hao.logosc.cn/" target="_blank" rel="noopener noreferrer">AI神器集</a>
        </p>
      </div>
    </div>
    <!-- 版权声明 -->
    <div class="copyright-notice">
      <p>Copyright © 2024 猫步简历 All Rights Reserved.</p>
    </div>
    <!-- 备案号 -->
    <div class="icp-record-number">
      <p>
        <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer"
          >蜀ICP备2020034752号-3</a
        >
      </p>
      <p>
        <a
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51010802001313"
          style="display: inline-block; text-decoration: none; height: 20px; line-height: 20px"
          >川公网安备 51010802001313号</a
        >
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .footer-box {
    width: 100%;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0;
    .recommend {
      display: flex;
      padding: 20px 0;
      border-bottom: 1px solid #5b5b5b;
      width: 600px;
      height: 250px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h1 {
        color: #a3a5a7;
        font-size: 16px;
        padding-bottom: 10px;
        letter-spacing: 1px;
        font-weight: 500;
      }
      .contact-me {
        display: flex;
        img {
          width: 105px;
          height: 105px;
        }
        p {
          font-size: 14px;
          color: #fff;
          margin-top: 10px;
        }
        .add-wechat {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 40px;
          cursor: pointer;
          user-select: none;
        }
        .concern-zhihu {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }
      }
      .about-me {
        height: 100%;
        display: flex;
        flex-direction: column;
        padding-top: 30px;
        p {
          color: #fff;
          display: flex;
          justify-content: flex-start;
          margin-bottom: 10px;
          font-size: 14px;
          a {
            color: inherit;
            text-decoration: none;
            letter-spacing: 2px;
            transition: all 0.3s;
            &:hover {
              color: rgb(123, 238, 123);
            }
          }
        }
      }
      .links {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding-top: 30px;
        p {
          color: #fff;
          display: flex;
          justify-content: flex-start;
          margin-bottom: 10px;
          font-size: 14px;
          a {
            color: inherit;
            text-decoration: none;
            letter-spacing: 2px;
            transition: all 0.3s;
            &:hover {
              color: rgb(123, 238, 123);
            }
          }
        }
      }
    }
    .copyright-notice {
      margin: 15px 0;
      p {
        color: #757c88;
        font-size: 12px;
      }
    }
    .icp-record-number {
      display: flex;
      p {
        color: #757c88;
        font-size: 12px;
        display: flex;
        align-items: center;
        margin: 0 10px;
        a {
          color: inherit;
          text-decoration: none;
          letter-spacing: 2px;
          transition: all 0.3s;
          &:hover {
            color: rgb(123, 238, 123);
          }
        }
      }
    }
  }
</style>
