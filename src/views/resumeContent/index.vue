<template>
  <div class="resume-content-box">
    <div v-loading="!templateData" class="left-resume-preview">
      <resume-preview v-if="templateData" :show-line="true"></resume-preview>
    </div>
    <div v-loading="!templateData" class="right-box">
      <template v-if="templateData">
        <div class="right-box-tox">
          <!-- 标题 -->
          <div class="right-title">
            <h1>{{ templateData.template_title }} </h1>
            <img class="right-tag-img" src="@/assets/images/right-tag.svg" alt="支持PDF下载" />
            <span class="tag-tips">支持PDF下载</span>
          </div>
          <!-- 分类标签 -->
          <div class="template-tags">
            <template v-for="(key, value) in templateCategoryList" :key="key">
              <el-tag v-if="key" size="large" type="success" @click="handleClickTag(key, value)">{{
                key
              }}</el-tag>
            </template>
          </div>
          <!-- 使用人数 -->
          <p class="use-views"
            >使用人数：<span>{{ templateData.template_views }}</span
            >人</p
          >
          <div class="use-template-box">
            <!-- 使用此模版 -->
            <el-button class="use-template-btn" type="primary" size="large" @click="handleToUse"
              >使用此模版</el-button
            >
            <!-- AI智能生成 -->
            <el-button
              class="use-template-btn ai-generate-btn"
              type="primary"
              size="large"
              @click="toAiGenerateResume"
              >AI智能生成</el-button
            >
          </div>
          <!-- 特别说明 -->
          <div class="template-tips">
            <p class="tips">特此说明：</p>
            <p class="tips-content"
              >目前在线编辑仅支持PDF格式的简历下载，需要word文档的用户请移步<span
                @click="toWordTemplate"
                >模版商城</span
              >进行下载。</p
            >
          </div>
        </div>
        <div class="right-box-bottom">
          <!-- 标题 -->
          <div class="right-bottom-title">
            <span class="title">热门模版</span>
            <span class="more" @click="toMore"
              >更多<svg-icon icon-name="icon-chakangengduo" color="#00C091" size="14px"></svg-icon
            ></span>
          </div>
          <!-- 热门模版列表 -->
          <div class="template-list-box">
            <div
              v-for="(item, index) in templateList"
              :key="index"
              class="template-card"
              @click="toResumeDetail(item)"
            >
              <img :src="item.template_cover" :alt="item.template_title" />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
  <footer-com></footer-com>
</template>
<script setup lang="ts">
  import { getTemplateByIdAsync, templateListAsync } from '@/http/api/createTemplate';
  import appStore from '@/store';
  import ResumePreview from './components/ResumePreview.vue';
  import { storeToRefs } from 'pinia';
  import { openGlobalLoading } from '@/utils/common';
  import { useHead } from '@vueuse/head';
  import { title } from '@/config/seo';

  const { resetResumeJson } = appStore.useCreateTemplateStore;
  const { HJNewJsonStore, selectedModuleId } = storeToRefs(appStore.useCreateTemplateStore);
  const route = useRoute();

  // 查询模版数据
  const templateData = ref<any>(null); // 模板数据
  const templateCategoryList = ref<any>(null); // 模板筛选列表
  const getTemplateData = async () => {
    const data = await getTemplateByIdAsync(route.params.id);
    if (data.status === 200) {
      templateData.value = data.data;
      templateCategoryList.value = {
        templateStyle: templateData.value.template_style, // 风格
        templateUse: templateData.value.template_use, // 用途
        templateIndustry: templateData.value.template_industry // 行业
      };
      HJNewJsonStore.value = data.data.template_json;
      HJNewJsonStore.value.props.title = data.data.template_title;
      useHead({
        title: templateData.value.template_title || title
      });
    }
  };
  getTemplateData();

  // 点击标签
  const router = useRouter();
  const handleClickTag = (key: string, value: any) => {
    console.log(key, value);
    let query: any = {};
    query[value] = key;
    router.push({
      path: '/resume',
      query
    });
  };

  // 点击使用该模版
  const handleToUse = () => {
    openGlobalLoading(); // 等待动画层
    resetResumeJson(); // 重置json数据
    selectedModuleId.value = ''; // 重置选中模块
    router.push({
      path: `/designResume/${templateData.value._id}`
    });
  };

  // 跳转至模版商城
  const toWordTemplate = () => {
    router.push({
      path: '/word'
    });
  };

  // AI智能生成简历
  const toAiGenerateResume = () => {
    router.push({
      path: '/generateAiResume',
      query: {
        templateId: templateData.value._id
      }
    });
  };

  // 查看更多模版
  const toMore = () => {
    router.push({
      path: '/resume'
    });
  };

  // 查询热门模板列表
  const page = ref<number>(1);
  const limit = ref<number>(6);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const templateList = ref<any>([]);
  const getTemplateList = async () => {
    let params = {
      page: page.value,
      limit: limit.value
    };
    const data = await templateListAsync(params);
    if (data.status === 200) {
      templateList.value = data.data.list;
      total.value = data.data.page.count;
      currentPage.value = data.data.page.currentPage;
    } else {
      ElMessage.error(data.message);
    }
  };
  getTemplateList();

  // 跳转至模版详情
  const toResumeDetail = (item: any) => {
    const newpage = router.resolve({
      path: `/resumedetail/${item._id}`
    });
    window.open(newpage.href, '_blank');
  };
</script>
<style lang="scss" scoped>
  .resume-content-box {
    width: 1240px;
    margin: 0 auto;
    padding: 50px 0;
    display: flex;
    justify-content: space-between;
    .left-resume-preview {
      width: 820px;
      background-color: #fff;
      height: 1160px;
      flex-shrink: 0;
      pointer-events: none;
      overflow: hidden;
    }
    .right-box {
      width: 360px;
      min-height: 400px;
      background-color: #fff;
      padding: 15px 20px;
      box-sizing: border-box;
      position: relative;
      flex-shrink: 0;
      .right-box-tox {
        border-bottom: 1px solid #e4e4e4;
        padding-bottom: 30px;
        .right-title {
          height: 50px;
          display: flex;
          align-items: flex-end;
          padding-bottom: 15px;
          border-bottom: 1px solid #e4e4e4;
          h1 {
            font-size: 18px;
          }
          .right-tag-img {
            width: 75px;
            height: auto;
            position: absolute;
            right: -5px;
            top: -5px;
          }
          .tag-tips {
            position: absolute;
            right: -6px;
            top: 14px;
            color: #fff;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(40deg);
            font-size: 11px;
            font-weight: 600;
          }
          &::after {
            content: ' ';
            position: absolute;
            width: 7px;
            height: 7px;
            background-color: #fff;
            top: 0;
            right: 65px;
          }
          &::before {
            content: ' ';
            position: absolute;
            width: 7px;
            height: 7px;
            background-color: #fff;
            top: 54px;
            right: 0;
            z-index: 1;
          }
        }
        .template-tags {
          display: flex;
          margin: 20px 0;
          flex-wrap: wrap;
          .el-tag {
            cursor: pointer;
            transition: all 0.3s;
            margin-right: 15px;
            &:hover {
              opacity: 0.7;
            }
          }
        }
        .use-views {
          font-size: 14px;
          color: #6d6d6d;
          margin: 15px 0;
          display: flex;
          align-items: center;
          span {
            color: #00c091;
            font-weight: bold;
          }
        }
        .use-template-box {
          display: flex;
          justify-content: space-between;
          .use-template-btn {
            height: 50px;
            width: 100%;
            font-size: 16px;
            letter-spacing: 2px;
            margin-top: 20px;
            display: flex;
            align-items: center;
            padding: 0;
          }
          .ai-generate-btn {
            background: linear-gradient(
              138deg,
              #3b2af9,
              #562cf7 22%,
              #dd34ee 89%,
              #f5e17d
            ) !important;
            color: #fff !important;
            width: 100% !important;
            letter-spacing: 2px !important;
            border: none !important;
            padding: 0 !important;
            transition: all 0.3s ease !important;
            border: none;
            &:hover {
              opacity: 0.8;
            }
          }
        }

        .template-tips {
          display: flex;
          flex-direction: column;
          color: #919191;
          font-size: 12px;
          margin-top: 30px;
          line-height: 24px;
          .tips {
            font-size: 14px;
            color: #545454;
          }
          .tips-content {
            span {
              color: #ffffff;
              border: 1px solid #00c091;
              border-radius: 29px;
              padding: 2px 6px;
              background: #00c091;
              transition: all 0.3s;
              cursor: pointer;
              margin: 0 5px;
              &:hover {
                opacity: 0.8;
              }
            }
          }
        }
      }
      .right-box-bottom {
        padding: 20px 0;
        .right-bottom-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          .title {
            color: #636363;
          }
          .more {
            cursor: pointer;
            color: #00c091;
            display: flex;
            align-items: center;
            letter-spacing: 1px;
            transition: all 0.3s;
            &:hover {
              opacity: 0.8;
            }
          }
        }
        .template-list-box {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          padding: 15px 0;
          .template-card {
            width: 48%;
            height: 206px;
            cursor: pointer;
            margin-bottom: 15px;
            transition: all 0.3s;
            border-radius: 4px;
            overflow: hidden;
            &:hover {
              opacity: 0.9;
              box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
            }
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
</style>
