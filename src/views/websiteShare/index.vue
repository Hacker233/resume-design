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
      <div
        v-for="(item, index) in categoryList"
        :key="index"
        :ref="(el) => setCategoryRef(el, item._id)"
        class="category-content-box"
      >
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

    <!-- 网站分类导航 -->
    <div class="website-category-box">
      <website-category-list
        :website-category-list="categoryList"
        @change-category="handleChangeCategory"
      ></website-category-list>
    </div>

    <!-- 回到顶部 -->
    <el-backtop :right="50" :bottom="80" />
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
  import WebsiteCategoryList from './components/WebsiteCategoryList.vue';

  // 获取网站类型列表
  const websiteTypeList = ref<any>([]);
  const queryWebsiteTypeAll = async () => {
    const data = await getWebsiteTypeListAsync();
    if (data.status === 200) {
      data.data.map((item: { website_type_show: number }) => {
        if (item.website_type_show === 1) {
          websiteTypeList.value.push(item);
        }
      });
    } else {
      ElMessage.error(data.message);
    }
  };
  queryWebsiteTypeAll();

  // 根据类型查询网站分类
  const categoryList = ref<any>([]);
  const getWebsiteCategoryListByType = async (name: string) => {
    categoryRefs = [];
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

  // 点击分类
  const handleChangeCategory = (id: string) => {
    const index = categoryRefs.findIndex((item) => item.id === id);
    if (index >= 0) {
      categoryRefs[index].el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  let categoryRefs: Array<any> = []; // 分类列表ref
  const setCategoryRef = (el: any, id: string) => {
    if (el) {
      const index = categoryRefs.findIndex((item) => item.id === id);
      if (index < 0) {
        categoryRefs.push({
          id: id,
          el: el
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
  .website-share-box {
    width: 1390px;
    padding: 30px 0;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    .website-type-box {
      width: 150px;
      min-height: 300px;
      position: sticky;
      top: 95px;
    }
    .website-content-box {
      width: 1050px;
      min-height: 300px;
      background-color: rgb(251 251 251 / 80%);
      margin: 0 auto;
      border-radius: 4px;
      padding: 5px 20px;
      .websote-card-wrap {
        display: grid;
        grid-template-columns: repeat(4, 1fr); /* 定义三列，每列宽度为100px */
        grid-column-gap: 10px;
        padding: 20px 8px;
      }
    }
    .website-category-box {
      width: 150px;
      position: sticky;
      top: 95px;
    }
  }
</style>
