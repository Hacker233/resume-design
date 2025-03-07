<template>
  <div class="footer-box">
    <!-- 相关推荐 -->
    <div class="recommend">
      <!-- 联系我 -->
      <div v-viewer class="contact-me">
        <div v-for="(item, index) in vxQunList" :key="index" class="add-wechat">
          <img
            :src="item.qr_code"
            :alt="`${item.name} 二维码`"
            :title="`扫描二维码添加 ${item.name}`"
            loading="lazy"
          />
          <h3>{{ item.name }}</h3>
        </div>
      </div>
      <!-- 关于我 -->
      <div class="about-me">
        <h2>社交平台</h2>
        <h3>
          <a
            href="https://space.bilibili.com/493520625?spm_id_from=333.1007.0.0"
            target="_blank"
            rel="noopener noreferrer"
            >哔哩哔哩</a
          >
        </h3>
        <h3>
          <a
            href="https://juejin.cn/user/3034307822112798"
            target="_blank"
            rel="noopener noreferrer"
            >稀土掘金</a
          >
        </h3>
        <h3>
          <a
            href="https://www.zhihu.com/people/luhongquan"
            target="_blank"
            rel="noopener noreferrer"
            >个人知乎</a
          >
        </h3>
      </div>
      <!-- 友情链接 -->
      <div class="links">
        <h2>友情链接</h2>
        <div class="links-box">
          <template v-for="(item, index) in linksList" :key="index">
            <p>
              <a :href="item.link" target="_blank" rel="noopener noreferrer">{{ item.name }}</a>
            </p>
          </template>
        </div>
      </div>
    </div>
    <!-- 分割线 -->
    <div class="line"></div>
    <!-- 版权声明 -->
    <div class="copyright-notice">
      <p>Copyright © 2025 猫步简历 All Rights Reserved.</p>
    </div>
    <!-- 备案号 -->
    <div class="icp-record-number">
      <p>
        <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer"
          >蜀ICP备2020034752号-4</a
        >
      </p>
      <!-- <p>
        <a
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51010802001313"
          style="display: inline-block; text-decoration: none; height: 20px; line-height: 20px"
          >川公网安备 51010802001313号</a
        >
      </p> -->
    </div>
  </div>
</template>
<script setup lang="ts">
  import { getLinksListAsync, getVXQunListUnauthAsync } from '@/http/api/website';

  // 查询微信微信群列表
  const vxQunList = ref<any>([]);
  const getVXQunListUnauth = async () => {
    vxQunList.value = [];
    const data = await getVXQunListUnauthAsync();
    if (data.status === 200) {
      vxQunList.value = data.data;
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getVXQunListUnauth();

  // 查询友链列表
  const page = ref<number>(1);
  const limit = ref<number>(20);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  let linksList = ref<any>([]);
  const getLinksList = async () => {
    let params = {
      page: page.value,
      limit: limit.value
    };
    const data = await getLinksListAsync(params);
    if (data.status === 200) {
      linksList.value = data.data.list;
      total.value = data.data.page.count;
      currentPage.value = data.data.page.currentPage;
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getLinksList();
</script>
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

      width: 100%;
      height: 250px;
      display: flex;
      justify-content: center;
      align-items: center;
      h2 {
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
        h3 {
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
        margin-right: 40px;
        h3 {
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
        .links-box {
          display: flex;
          flex-wrap: wrap;
          max-width: 200px;
          p {
            color: #fff;
            display: flex;
            justify-content: flex-start;
            font-size: 14px;
            box-sizing: border-box;
            flex-shrink: 0;
            a {
              color: inherit;
              text-decoration: none;
              letter-spacing: 2px;
              transition: all 0.3s;
              flex-shrink: 0;
              margin: 0 20px 10px 0;
              &:hover {
                color: rgb(123, 238, 123);
              }
            }
          }
        }
      }
    }
    .line {
      height: 1px;
      width: 650px;
      background-color: #5b5b5b;
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
