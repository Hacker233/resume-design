<!-- word模板预览页 -->
<template>
  <div class="word-preview-box">
    <div class="content-box">
      <!-- 图片预览区域 -->
      <div class="left">
        <!-- 图片列表 -->
        <div class="img-list-box">
          <c-scrollbar trigger="hover" style="height: 600px">
            <div
              v-for="(item, index) in wordInfo.previewUrl"
              :key="index"
              :class="['img-item-box', { active: currentIndex === index }]"
              @click="selectPreUrl(item, index)"
            >
              <el-image style="width: 150px; height: 200px" :src="item.url" fit />
            </div>
          </c-scrollbar>
        </div>
        <!-- 图片大图展示 -->
        <div class="img-big-preview">
          <div class="big-img-box">
            <el-image style="width: 400px; height: 550px" :src="bigPreviewUrl" fit />
          </div>
        </div>
      </div>
      <!-- 模板信息介绍页 -->
      <div class="right">
        <!-- 操作区 -->
        <div class="top">
          <h1>{{ wordInfo.name }}</h1>
          <div class="download-btn">
            <div class="button" @click="download"> 立即下载 </div>
          </div>
          <div class="views-downs-box">
            <div class="downloads-box">
              <svg-icon icon-name="icon-xiazailiang" color="#a3abb1" size="22px"></svg-icon>
              <span class="downloads">{{ wordInfo.downloads }}</span>
            </div>
            <div class="icon-box">
              <svg-icon icon-name="icon-liulanliang1" color="#a3abb1" size="22px"></svg-icon>
              <span class="number">{{ wordInfo.views }}</span>
            </div>
          </div>
        </div>
        <!-- 详细信息展示区 -->
        <div class="info-box">
          <h1>简历信息</h1>
          <div class="profile-box">
            <span class="label">简介</span>
            <p>{{ wordInfo.profile }}</p>
          </div>
          <div class="profile-box">
            <span class="label">分类</span>
            <p v-for="(item, index) in wordInfo.category" :key="index" class="category">{{
              getCategoryLabel(item)
            }}</p>
          </div>
          <div class="profile-box">
            <span class="label">标签</span>
            <p v-for="(item, index) in wordInfo.tags" :key="index" class="category">{{ item }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-box">
      <!-- 轮播图 -->
      <word-carousel
        v-if="wordInfo.previewUrl"
        :preview-url-list="wordInfo.previewUrl"
      ></word-carousel>
    </div>

    <!-- 评论组件 -->
    <comment-com width="1300px" :comment-type-id="id" comment-type="resumeTemplate"></comment-com>
  </div>
</template>
<script lang="ts" setup>
  import LoginDialog from '@/components/LoginDialog/LoginDialog';
  import WordCarousel from './components/WordCarousel.vue';
  import {
    getWordCategoryListAsync,
    getWordTemplateInfoAsync,
    wordDownloadUrl
  } from '@/http/api/wordTemplate';
  import { downloadFileUtil } from '@/utils/common';

  // 获取word模板id
  const route = useRoute();
  const { id } = route.query;
  const currentIndex = ref<number>(-1); // 选中哪一张预览图

  // 查询模板详细信息
  const wordInfo = ref<any>([]);
  const getWordTemplateInfo = async () => {
    const data = await getWordTemplateInfoAsync(id);
    if (data.status === 200) {
      wordInfo.value = data.data;
      wordInfo.value.previewUrl = JSON.parse(wordInfo.value.previewUrl);
      bigPreviewUrl.value = wordInfo.value.previewUrl[0].url;
      currentIndex.value = 0;
    } else {
      ElMessage.error(data.message);
    }
  };
  getWordTemplateInfo();

  // 查询word模板分类列表
  const categoryList = ref<any>({});
  const getWordCategoryList = async () => {
    const data = await getWordCategoryListAsync();
    if (data.status === 200) {
      data.data.forEach((item: any) => {
        categoryList.value[item._id] = item.name;
      });
    } else {
      ElMessage.error(data.message);
    }
  };
  getWordCategoryList();

  // 返回分类名称
  const getCategoryLabel = (id: string) => {
    console.log('categoryList', categoryList.value);
    if (categoryList.value) {
      return categoryList.value[id];
    }
  };

  // 图片预览大图
  const bigPreviewUrl = ref<string>('');
  // 点击预览图
  const selectPreUrl = (item: any, index: number) => {
    bigPreviewUrl.value = item.url;
    currentIndex.value = index;
  };

  // 点击立即下载
  const download = async () => {
    let token = localStorage.getItem('token');
    if (!token) {
      LoginDialog(true);
    } else {
      const data = await wordDownloadUrl(id);
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
  .word-preview-box {
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
        justify-content: space-between;
        .img-list-box {
          width: 160px;
          max-height: 600px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          .img-item-box {
            height: 202px;
            width: 152px;
            margin-bottom: 10px;
            cursor: pointer;
            transition: all 0.3s;
            border: 1px solid transparent;
            border-radius: 5px;
            overflow: hidden;
            &:hover {
              border: 1px solid #5b3562;
            }
          }
          .active {
            border: 1px solid #5b3562;
          }
        }
        .img-big-preview {
          margin-left: 30px;
          .big-img-box {
            background: #e7e7e7;
            padding: 24px 21px;
            border-radius: 3px;
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
