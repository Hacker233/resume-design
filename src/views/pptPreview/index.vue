<!-- ppt模板预览页 -->
<template>
  <div class="ppt-preview-box">
    <div class="content-box">
      <!-- 图片预览区域 -->
      <div class="left">
        <!-- 图片大图展示 -->
        <div class="img-big-preview">
          <div class="big-img-box">
            <el-image style="width: 100%; height: 440px" :src="bigPreviewUrl" fit />
          </div>
        </div>
        <!-- 图片列表 -->
        <div class="img-list-box">
          <c-scrollbar ref="scrollbarRef" trigger="hover" style="width: 800px">
            <div
              v-for="(item, index) in pptInfo.previewUrl"
              :key="index"
              :class="['img-item-box', { active: currentIndex === index }]"
              @click="selectPreUrl($event, item, index)"
            >
              <el-image style="width: 160px; height: 90px" :src="item.url" fit />
            </div>
          </c-scrollbar>
        </div>
      </div>
      <!-- 模板信息介绍页 -->
      <div class="right">
        <!-- 操作区 -->
        <div class="top">
          <h1>{{ pptInfo.name }}</h1>
          <div class="download-btn">
            <div class="button" @click="download"> 立即下载 </div>
          </div>
          <div class="views-downs-box">
            <div class="downloads-box">
              <svg-icon icon-name="icon-xiazailiang" color="#a3abb1" size="22px"></svg-icon>
              <span class="downloads">{{ pptInfo.downloads }}</span>
            </div>
            <div class="icon-box">
              <svg-icon icon-name="icon-liulanliang1" color="#a3abb1" size="22px"></svg-icon>
              <span class="number">{{ pptInfo.views }}</span>
            </div>
          </div>
        </div>
        <!-- 详细信息展示区 -->
        <div class="info-box">
          <h1>简历信息</h1>
          <div class="profile-box">
            <span class="label">简介</span>
            <p>{{ pptInfo.profile }}</p>
          </div>
          <div class="profile-box">
            <span class="label">类型</span>
            <p>{{ pptInfo.effect }}PPT</p>
          </div>
          <div class="profile-box">
            <span class="label">比例</span>
            <p>{{ pptInfo.proportion }}</p>
          </div>
          <div class="profile-box">
            <span class="label">页数</span>
            <p>{{ pptInfo.pages }}页</p>
          </div>
          <div class="profile-box">
            <span class="label">分类</span>
            <p v-for="(item, index) in pptInfo.category" :key="index" class="category">{{
              getCategoryLabel(item)
            }}</p>
          </div>
          <div class="profile-box">
            <span class="label">标签</span>
            <p v-for="(item, index) in pptInfo.tags" :key="index" class="category">{{ item }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-box">
      <!-- 轮播图 -->
      <ppt-carousel v-if="pptInfo.previewUrl" :preview-url-list="pptInfo.previewUrl"></ppt-carousel>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import LoginDialog from '@/components/LoginDialog/LoginDialog';
  import PptCarousel from './components/PptCarousel.vue';
  import { downloadFileUtil } from '@/utils/common';
  import {
    getPPTCategoryListAsync,
    getPPTTemplateInfoAsync,
    pptDownloadUrl
  } from '@/http/api/pptTemplate';

  // 获取ppt模板id
  const route = useRoute();
  const { id } = route.query;
  const currentIndex = ref<number>(-1); // 选中哪一张预览图

  // 查询模板详细信息
  const pptInfo = ref<any>([]);
  const getPPTTemplateInfo = async () => {
    const data = await getPPTTemplateInfoAsync(id);
    if (data.status === 200) {
      pptInfo.value = data.data;
      pptInfo.value.previewUrl = JSON.parse(pptInfo.value.previewUrl);
      bigPreviewUrl.value = pptInfo.value.previewUrl[0].url;
      currentIndex.value = 0;
    } else {
      ElMessage.error(data.message);
    }
  };
  getPPTTemplateInfo();

  // 查询ppt模板分类列表
  const categoryList = ref<any>({});
  const getPPTCategoryList = async () => {
    const data = await getPPTCategoryListAsync();
    if (data.status === 200) {
      data.data.forEach((item: any) => {
        categoryList.value[item._id] = item.name;
      });
    } else {
      ElMessage.error(data.message);
    }
  };
  getPPTCategoryList();

  // 返回分类名称
  const getCategoryLabel = (id: string) => {
    if (categoryList.value) {
      return categoryList.value[id];
    }
  };

  // 图片预览大图
  const scrollbarRef = ref<any>(null);
  const bigPreviewUrl = ref<string>('');
  // 点击预览图
  const selectPreUrl = (e: any, item: any, index: number) => {
    bigPreviewUrl.value = item.url;
    currentIndex.value = index;
    console.log(e);
  };

  // 点击立即下载
  const download = async () => {
    let token = localStorage.getItem('token');
    if (!token) {
      LoginDialog(true);
    } else {
      const data = await pptDownloadUrl(id);
      if (data.data.status === 200) {
        ElMessage.success('即将开始下载');
        let url = JSON.parse(data.data.data.fileUrl)[0].url;
        downloadFileUtil(url);
      } else {
        ElMessage.error(data.data.message);
      }
    }
  };
</script>
<style lang="scss" scoped>
  .ppt-preview-box {
    width: 100%;
    font-family: '微软雅黑';
    .content-box {
      margin: 0 auto;
      min-height: 500px;
      padding: 20px 0;
      width: 1300px;
      display: flex;
      .left {
        display: flex;
        flex-direction: column;
        width: 800px;
        .img-list-box {
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: flex-start;
          :deep(.c-scrollbar-content) {
            display: flex;
            position: relative;
          }
          .img-item-box {
            height: 90px;
            width: 160px;
            margin-bottom: 10px;
            cursor: pointer;
            transition: all 0.3s;
            border: 1px solid transparent;
            border-radius: 5px;
            overflow: hidden;
            flex-grow: 0;
            flex-shrink: 0;
            margin: 0 5px;
            position: relative;
            &:hover {
              border: 1px solid #5b3562;
            }
          }
          .active {
            border: 1px solid #5b3562;
          }
        }
        .img-big-preview {
          margin-bottom: 20px;
          .big-img-box {
            background: #e7e7e7;
            padding: 24px 21px;
            border-radius: 3px;
            display: flex;
          }
        }
      }
      .right {
        flex: 1;
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        .top {
          height: 220px;
          width: 100%;
          background-color: #fff;
          margin-bottom: 20px;
          padding: 20px 30px 0 20px;
          display: flex;
          flex-direction: column;
          h1 {
            font-size: 30px;
            margin-bottom: 30px;
          }
          .download-btn {
            .button {
              width: 50%;
              height: 38px;
              margin-right: 20px;
              line-height: 38px;
              text-align: center;
              letter-spacing: 2px;
              color: #fff;
              font-size: 14px;
              background-image: -webkit-linear-gradient(to right, #2ddd9d, #1cc7cf);
              background-image: -moz-linear-gradient(to right, #2ddd9d, #1cc7cf);
              background-image: -ms-linear-gradient(to right, #2ddd9d, #1cc7cf);
              background-image: linear-gradient(to right, #2ddd9d, #1cc7cf);
              -webkit-border-radius: 50px;
              -moz-border-radius: 50px;
              border-radius: 50px;
              background-color: #2ddd9d;
              -webkit-transition: all 0.3s;
              -moz-transition: all 0.3s;
              -ms-transition: all 0.3s;
              -o-transition: all 0.3s;
              transition: all 0.3s;
              cursor: pointer;
              user-select: none;
              &:hover {
                opacity: 0.8;
              }
            }
          }
          .views-downs-box {
            margin-top: 30px;
            border-top: 1px solid #eee;
            flex: 1;
            color: #b2bcc3;
            display: flex;
            align-items: center;
            .downloads-box {
              display: flex;
              align-items: center;
              margin-right: 30px;
              .downloads {
                margin-left: 6px;
                font-size: 18px;
              }
            }
            .icon-box {
              margin-right: 5px;
              display: flex;
              align-items: center;
              .number {
                margin-left: 5px;
                padding-top: 1px;
                font-size: 18px;
              }
            }
          }
        }
        .info-box {
          width: 100%;
          background-color: #fff;
          padding: 20px 30px 20px 20px;
          display: flex;
          flex-direction: column;
          h1 {
            font-size: 16px;
            color: #515151;
            padding-bottom: 22px;
            border-bottom: 1px solid #ebebeb;
          }
          .profile-box {
            display: flex;
            margin: 10px 0;
            span {
              font-size: 14px;
              color: #555;
              margin-right: 15px;
              flex-grow: 0;
              flex-shrink: 0;
            }
            p {
              font-size: 14px;
              color: #999999;
              padding: 0 15px;
            }
            .category {
              border-right: 1px solid #eee;
            }
          }
        }
      }
    }

    .bottom-box {
      margin: 30px auto;
      min-height: 500px;
      padding: 20px 0;
      width: 1300px;
      display: flex;
      background-color: #fff;
      display: flex;
    }
  }
</style>
