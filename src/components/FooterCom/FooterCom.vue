<template>
  <div class="footer-box">
    <ul>
      <li v-config:open_business>
        <svg-icon icon-name="icon-hezuo" class-name="bilibili"></svg-icon>
        <el-popover trigger="hover" :width="200" placement="top" teleported>
          <template #reference>
            <a href="JavaScript: void(0)" rel="noopener noreferrer">商务合作</a>
          </template>
          <!-- 内容区域 -->
          <div class="vx-box">
            <div class="vx-title">
              <h1>添加微信</h1>
              <p>备注：化简商务合作</p>
            </div>
            <div class="vx-img">
              <img class="bgc-img" src="@/assets/images/vx.jpg" alt="" />
            </div>
          </div>
        </el-popover>
      </li>
      <div v-config:open_business class="lines"></div>
      <li>
        <svg-icon icon-name="icon-bilibili-copy" class-name="bilibili"></svg-icon>
        <a
          href="https://space.bilibili.com/493520625?spm_id_from=333.1007.0.0"
          target="_blank"
          rel="noopener noreferrer"
          >小猪课堂</a
        >
      </li>
      <div class="lines"></div>
      <li>
        <svg-icon icon-name="icon-juejin-logo" class-name="juejin"></svg-icon>
        <a href="https://juejin.cn/user/3034307822112798" target="_blank" rel="noopener noreferrer"
          >掘金</a
        >
      </li>
      <div class="lines"></div>
      <li>
        <svg-icon icon-name="icon-shejiaotubiao-10" class-name="zhihu"></svg-icon>
        <a href="https://www.zhihu.com/people/luhongquan" target="_blank" rel="noopener noreferrer"
          >会飞的猪</a
        >
      </li>
      <!-- 备案号 -->
      <div class="lines"></div>
      <li>
        <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer"
          >蜀ICP备2020034752号-3</a
        >
      </li>
      <!-- 公安备案号 -->
      <div class="lines"></div>
      <li>
        <img src="@/assets/images/beian-icon.png" alt="" srcset="" />
        <a
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51010802001313"
          style="display: inline-block; text-decoration: none; height: 20px; line-height: 20px"
          >川公网安备 51010802001313号</a
        >
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .footer-box {
    width: 100%;
    height: 100px;
    background-color: #242529;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: rgb(236, 235, 235);
        padding: 0 10px;
        height: 20px;
        .bilibili {
          font-size: 18px;
        }
        .juejin {
          font-size: 24px;
        }
        .zhihu {
          font-size: 20px;
        }
        a {
          color: inherit;
          text-decoration: none;
          letter-spacing: 2px;
          transition: all 0.3s;
          margin-left: 10px;
          &:hover {
            color: rgb(123, 238, 123);
          }
        }
      }
      .lines {
        height: 15px;
        width: 1px;
        background-color: #838799;
      }
    }

    .visit {
      color: rgb(201, 181, 181);
      font-size: 14px;
      letter-spacing: 3px;
    }
  }
  .vx-box {
    .vx-title {
      display: flex;
      flex-direction: column;
      align-items: center;
      h1 {
        font-size: 14px;
      }
      p {
        font-size: 12px;
        color: rgb(105, 105, 105);
        margin: 6px 0;
      }
    }
    .vx-img {
      width: 100%;
      overflow: hidden;
      .bgc-img {
        width: 100%;
      }
    }
  }
</style>
