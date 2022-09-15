<template>
  <div ref="templateRef" class="template-select-box">
    <introduce-title-vue
      title="免费模板 + 用心设计"
      subtitle="用心设计每一套模板，适合各行各业从业者"
      title-color="#000"
      subtitle-color="#7f8b96"
    ></introduce-title-vue>
    <!-- 模板列表 -->
    <div class="card-list">
      <template v-for="(item, index) in templateList" :key="index">
        <template-card :card-data="item" @to-design="toDesign"> </template-card>
      </template>
    </div>
    <!-- 查看更多 -->
    <div class="more">
      <div class="button" @click="seeMore"> 查看更多 </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  // import templateList from '@/template';
  import TemplateCard from '@/components/TemplateCard/TemplateCard.vue';
  import IntroduceTitleVue from './IntroduceTitle.vue';
  import { ITempList } from '@/template/type';
  import { useRouter } from 'vue-router';
  import { onUnmounted, ref } from 'vue';
  import { openGlobalLoading } from '@/utils/common';
  import appStore from '@/store';
  import { getTemplateListAsync } from '@/http/api/resume';

  // 跳转至设计页面
  const { resetResumeJson } = appStore.useResumeJsonNewStore;
  const { resetSelectModel } = appStore.useSelectMaterialStore;
  const router = useRouter();
  const toDesign = (item: ITempList) => {
    openGlobalLoading(); // 等待动画层
    resetResumeJson(); // 重置json数据
    resetSelectModel(); // 重置选中模块
    router.push({
      path: '/designer',
      query: {
        id: item.ID
      }
    });
  };

  // 出现在可视区
  const templateRef = ref<any>(null);
  const scrollIntoView = () => {
    templateRef.value.scrollIntoView({ behavior: 'smooth' });
  };

  // 查询模板列表
  const page = 1;
  const limit = 10;
  const templateList = ref<Array<any>>([]);
  const getTemplateList = async () => {
    let params = {
      page: page,
      limit: limit
    };
    const data = await getTemplateListAsync(params);
    if (data.status === 200) {
      templateList.value = data.data.list;
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getTemplateList();

  // 点击查看更多
  const seeMore = () => {
    router.push({
      name: 'Template'
    });
  };

  defineExpose({
    scrollIntoView
  });

  // 页面销毁
  onUnmounted(() => {
    // closeGlobalLoading(); // 关闭全局等待层
  });
</script>
<style lang="scss">
  .template-select-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    .card-list {
      display: flex;
      flex-wrap: wrap;
      max-width: 1500px;
    }
    .more {
      padding: 0 0 40px 0;
      .button {
        width: 120px;
        height: 38px;
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
  }
</style>
