<template>
  <div class="website-detail-info">
    <div class="website-content-wrap">
      <!-- 顶部区域 -->
      <div class="content-top">
        <div class="left-icon-box">
          <div class="img-box">
            <img :src="websiteInfo.website_icon" alt="" />
          </div>
          <!-- 浏览量和访问量 -->
          <div class="views-comment-box">
            <div class="icon-box">
              <svg-icon
                icon-name="icon-pinglun"
                class-name="icon"
                color="#424446"
                size="18px"
              ></svg-icon>
              <span>{{ formatNumber(websiteInfo.commentCount) }}</span>
            </div>
            <div class="icon-box">
              <svg-icon
                icon-name="icon-liulanliang1"
                class-name="icon"
                color="#424446"
                size="18px"
              ></svg-icon>
              <span>{{ formatNumber(websiteInfo.website_views) }}</span>
            </div>
          </div>
        </div>
        <div class="right-link-box">
          <div class="top">
            <span class="website-type" @click="toWebsiteList">{{
              websiteInfo.website_type_name
            }}</span>
            >
            <span class="category">{{ websiteInfo.website_category }}</span>
          </div>
          <div class="title">
            <h3>{{ websiteInfo.website_title }}</h3>
          </div>
          <div class="abstract">
            <p>{{ websiteInfo.website_abstract }}</p>
          </div>
          <!-- 标签 -->
          <div class="tags-box">
            <span>标签：</span>
            <div class="tags">
              <el-tag v-for="(item, index) in websiteInfo.website_tags" :key="index">{{
                item
              }}</el-tag>
            </div>
          </div>
          <div class="button-box">
            <a
              class="button"
              :href="websiteInfo.website_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>链接直达</span>
              <svg-icon
                icon-name="icon-chakangengduo"
                class-name="link-icon"
                color="#fff"
                size="18px"
              ></svg-icon>
            </a>
            <el-popover placement="bottom" :teleported="false" :width="150" trigger="hover">
              <qrcode-vue
                :value="websiteInfo.website_link"
                :size="125"
                level="H"
                foreground="#555"
              />
              <template #reference>
                <div
                  class="mobile-see"
                  @mouseover="handleMobilehover"
                  @mouseleave="handleMobileleave"
                >
                  <div class="mobile-button">
                    <span>手机查看</span>
                    <svg-icon
                      icon-name="icon-iconfontscan"
                      class-name="mobile-icon"
                      :color="mobileIconColor"
                      size="18px"
                    ></svg-icon>
                  </div>
                </div>
              </template>
            </el-popover>
          </div>
        </div>
      </div>
      <div class="content-bottom">
        <div class="bottom-left">
          <!-- 简介 -->
          <left-abstract :website-info="websiteInfo"></left-abstract>
          <!-- 网站快照 -->
          <website-screen
            v-if="websiteInfo.website_screen"
            :website-info="websiteInfo"
          ></website-screen>
          <!-- 相关网站 -->
          <correl-website :website-list="websiteList"></correl-website>
          <!-- 评论组件 -->
          <comment-com
            v-config:open_comment
            width="100%"
            :comment-type-id="websiteId"
            comment-type="website"
          ></comment-com>
        </div>
        <div class="bottom-right">
          <!-- 同类热门 -->
          <same-recommend :website-list="websiteSameRecommendList"></same-recommend>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import {
    getWebsiteInfoAsync,
    getWebsiteListByTypeAndCategoryAsync
  } from '@/http/api/websiteShare';
  import { formatNumber } from '@/utils/common';
  import QrcodeVue from 'qrcode.vue';
  import LeftAbstract from './components/LeftAbstract.vue';
  import SameRecommend from './components/SameRecommend.vue';
  import CorrelWebsite from './components/CorrelWebsite.vue';
  import WebsiteScreen from './components/WebsiteScreen.vue';
  // 查询网站详细信息
  const { websiteId } = useRoute().query;
  const websiteInfo = ref<any>('');
  const getWebsiteInfo = async () => {
    const params = {
      id: websiteId
    };
    const data = await getWebsiteInfoAsync(params);
    if (data.status === 200) {
      websiteInfo.value = data.data;
      getWebsiteListByTypeAndCategory();
    } else {
      ElMessage.error(data.message);
    }
  };
  getWebsiteInfo();

  // 手机查看按钮鼠标移入
  const mobileIconColor = ref<string>('#888');
  const handleMobilehover = () => {
    mobileIconColor.value = '#fff';
  };
  const handleMobileleave = () => {
    mobileIconColor.value = '#888';
  };

  // 根据网站类型和分类查询出网站列表
  const page = ref<number>(1);
  const limit = ref<number>(15);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const websiteList = ref<any>([]);
  const websiteSameRecommendList = ref<any>([]);
  const getWebsiteListByTypeAndCategory = async () => {
    let params = {
      page: page.value,
      limit: limit.value,
      websiteTypeName: websiteInfo.value.website_type_name,
      websiteCategory: websiteInfo.value.website_category
    };
    const data = await getWebsiteListByTypeAndCategoryAsync(params);
    if (data.status === 200) {
      data.data.list.forEach((item: any) => {
        if (item._id !== websiteId) {
          websiteList.value.push(item);
        }
      });
      total.value = data.data.page.count;
      currentPage.value = data.data.page.currentPage;
      // 同类热门推荐
      if (websiteList.value.length > 6) {
        websiteSameRecommendList.value = websiteList.value.slice(0, 6);
      } else {
        websiteSameRecommendList.value = websiteList.value;
      }
    } else {
      ElMessage.error(data.message);
    }
  };

  // 跳转到网站列表
  const router = useRouter();
  const toWebsiteList = () => {
    router.push({
      path: 'website',
      query: {
        weisiteTypeName: websiteInfo.value.website_type_name
      }
    });
  };
</script>
<style lang="scss" scoped>
  .website-detail-info {
    width: 100%;
    padding: 30px 0;
    .website-content-wrap {
      width: 1200px;
      margin: 0 auto;
      .content-top {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        .left-icon-box {
          width: 270px;
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 40px 0;
          background: #e6e8ed;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 30px 20px -20px rgba(0, 0, 0, 0.15);
          border-radius: 10px;
          transition: background-color 0.3s;
          transition: all 0.3s;
          &:hover {
            box-shadow: 0 30px 20px -20px rgba(0, 0, 0, 0.35);
          }
          .img-box {
            width: 80px;
            height: 80px;
            background-color: rgba(255, 255, 255, 0.7);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              max-width: 100%;
            }
          }
          .views-comment-box {
            display: flex;
            .icon-box {
              width: 48px;
              height: 48px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              background-color: rgba(255, 255, 255, 0.8);
              margin: 0 10px;
              .icon {
                margin-bottom: 2px;
              }
              span {
                font-size: 12px;
                margin-top: 2px;
              }
            }
          }
        }
        .right-link-box {
          flex: 1;
          padding: 0 0 0 40px;
          .top {
            font-size: 13px;
            letter-spacing: 2px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            color: #636363;
            .website-type {
              padding: 4px 5px;
              background-color: #00c090;
              color: #fff;
              border-radius: 3px;
              box-sizing: border-box;
              margin-right: 5px;
              transition: all 0.3s;
              user-select: none;
              cursor: pointer;
              &:hover {
                opacity: 0.8;
              }
            }
            .category {
              margin-left: 5px;
            }
          }
          .title {
            h3 {
              font-size: 20px;
              margin: 26px 0;
              letter-spacing: 1px;
              color: #555;
            }
          }
          .abstract {
            line-height: 1.5;
            color: #1d232b;
            font-size: 14px;
            text-align: justify;
          }

          .tags-box {
            display: flex;
            align-items: center;
            span {
              font-size: 13px;
              margin-top: 20px;
              margin-right: 10px;
            }
            .el-tag {
              margin-right: 10px;
            }
          }
          .button-box {
            display: flex;
            margin-top: 30px;
            align-items: center;
            .button {
              width: 120px;
              height: 40px;
              margin-right: 30px;
              text-decoration: none; /* 去除默认的下划线 */
              outline: none;
              background-color: #00c090;
              color: #fff;
              font-size: 16px;
              border-radius: 5px;
              cursor: pointer;
              transition: all 0.2s;
              user-select: none;
              display: flex;
              align-items: center;
              justify-content: center;
              &:hover {
                opacity: 0.8;
              }
              span {
                margin-right: 5px;
                font-size: 14px;
                letter-spacing: 1px;
              }
              .link-icon {
                margin-left: 5px;
              }
            }
            .mobile-see {
              width: 120px;
              height: 41px;
              margin-right: 50px;
              text-decoration: none; /* 去除默认的下划线 */
              outline: none;
              background-color: rgba(138, 138, 138, 0.15);
              text-align: center;
              font-size: 16px;
              color: #888;
              border-radius: 5px;
              cursor: pointer;
              transition: all 0.2s;
              user-select: none;
              display: flex;
              align-items: center;
              justify-content: center;
              &:hover {
                background-color: rgba(138, 138, 138, 0.9);
                color: #fff;
              }
              .mobile-button {
                display: flex;
                align-items: center;
                justify-content: center;
                span {
                  font-size: 14px;
                  margin-right: 5px;
                  letter-spacing: 1px;
                }
                .mobile-icon {
                  margin-left: 5px;
                }
              }
            }
          }
        }
      }
      .content-bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        .bottom-left {
          width: 860px;
        }
        .bottom-right {
          width: 310px;
        }
      }
    }
  }
</style>
