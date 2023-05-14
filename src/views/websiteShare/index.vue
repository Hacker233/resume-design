<template>
  <div class="website-share-box">
    <!-- 网站类型导航 -->
    <div class="website-type-box">
      <website-type
        :website-type-list="websiteTypeList"
        @get-website-category-list-by-type="getWebsiteCategoryListByType"
        @get-website-list-by-type="getWebsiteListByType"
      ></website-type>
    </div>
    <!-- 网站内容区 -->
    <div class="website-content-box">
      <div v-for="(item, index) in categoryList" :key="index" class="category-content-box">
        <!-- 分类标题 -->
        <category-title :title="item.website_category"></category-title>
        <template
          v-if="
            websiteListObj[item.website_category] &&
            websiteListObj[item.website_category].length &&
            !showSkeleton
          "
        >
          <!--网站卡片 -->
          <div class="websote-card-wrap">
            <div
              v-for="(cardData, j) in websiteListObj[item.website_category]"
              :key="j"
              class="card-item"
            >
              <website-card :card-data="cardData"></website-card>
            </div>
          </div>
        </template>
        <!-- 骨架屏 -->
        <el-skeleton v-if="showSkeleton" :rows="5" animated />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import {
    getWebsiteCategoryListAsync,
    getWebsiteListByTypeAsync,
    getWebsiteTypeListAsync
  } from '@/http/api/websiteShare';
  import WebsiteType from './components/WebsiteType.vue';
  import CategoryTitle from './components/CategoryTitle.vue';
  import WebsiteCard from './components/WebsiteCard.vue';

  // 获取网站类型列表
  const websiteTypeList = ref<any>([]);
  const queryWebsiteTypeAll = async () => {
    const data = await getWebsiteTypeListAsync();
    if (data.status === 200) {
      websiteTypeList.value = data.data;
    } else {
      ElMessage.error(data.message);
    }
  };
  queryWebsiteTypeAll();

  // 根据类型查询网站分类
  const categoryList = ref<any>([]);
  const getWebsiteCategoryListByType = async (name: string) => {
    categoryList.value = [];
    const params = {
      websiteTypeName: name
    };
    const data = await getWebsiteCategoryListAsync(params);
    if (data.status === 200) {
      categoryList.value = data.data;
    } else {
      ElMessage.error(data.message);
    }
  };

  // 根据类型查询出该类型下的所有网站
  const websiteListObj = ref<any>({});
  const showSkeleton = ref<boolean>(true); // 是否显示骨架屏
  const getWebsiteListByType = async (name: string) => {
    websiteListObj.value = {};
    showSkeleton.value = true;
    const params = {
      websiteTypeName: name
    };
    const data = await getWebsiteListByTypeAsync(params);
    if (data.status === 200) {
      // 将网站按照分类聚集
      data.data.forEach((item: any) => {
        if (websiteListObj.value.hasOwnProperty(item.website_category)) {
          websiteListObj.value[item.website_category].push(item);
        } else {
          websiteListObj.value[item.website_category] = [];
          websiteListObj.value[item.website_category].push(item);
        }
      });
      showSkeleton.value = false;
    } else {
      showSkeleton.value = false;
      ElMessage.error(data.message);
    }
  };
</script>
<style lang="scss" scoped>
  .website-share-box {
    width: 1350px;
    padding-top: 30px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .website-type-box {
      width: 150px;
      min-height: 300px;
    }
    .website-content-box {
      width: 1140px;
      min-height: 300px;
      background-color: rgb(251 251 251 / 80%);
      margin: 0 auto;
      border-radius: 4px;
      padding: 5px 25px;
      .websote-card-wrap {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 8px;
        .card-item {
          &:not(:nth-child(5n)) {
            margin-right: 18px;
          }
        }
      }
    }
  }
</style>
