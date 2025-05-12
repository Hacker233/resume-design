<template>
  <div ref="templateRef" class="template-select-box">
    <introduce-title-vue
      title="热门简历模版"
      subtitle="选择简历模板，点击在线制作，永久云端保存，可一键导出"
      title-color="#000"
      subtitle-color="#7f8b96"
    ></introduce-title-vue>
    <!-- 模板列表 -->
    <div class="card-list">
      <template v-if="templateList.length">
        <div v-for="(item, index) in templateList" :key="index" class="card-list-item-box">
          <template-card-new :card-data="item" @to-design="toDesign"> </template-card-new>
        </div>
      </template>
      <template v-else>
        <div v-for="index in 8" :key="index" class="card-list-item-box">
          <skeleton-card></skeleton-card>
        </div>
      </template>
    </div>
    <!-- 查看更多 -->
    <div class="more">
      <div class="button" @click="seeMore"> 查看更多 </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import TemplateCardNew from '@/components/TemplateCardNew/TemplateCardNew.vue';
  import IntroduceTitleVue from './IntroduceTitle.vue';
  import { useRouter } from 'vue-router';
  import { onUnmounted, ref } from 'vue';
  import appStore from '@/store';
  import SkeletonCard from '@/components/SkeletonCard/SkeletonCard.vue';
  import { templateListAsync } from '@/http/api/createTemplate';
  import { storeToRefs } from 'pinia';

  // 跳转至设计页面
  const { selectedModuleId } = storeToRefs(appStore.useCreateTemplateStore);
  const router = useRouter();
  const toDesign = (item: any) => {
    selectedModuleId.value = ''; // 重置选中模块
    router.push({
      path: `/resumedetail/${item._id}`
    });
  };

  // 出现在可视区
  const templateRef = ref<any>(null);
  const scrollIntoView = () => {
    templateRef.value.scrollIntoView({ behavior: 'smooth' });
  };

  // 查询模板列表
  const page = 1;
  const limit = 8;
  const templateList = ref<Array<any>>([]);
  const getTemplateList = async () => {
    let params = {
      page: page,
      limit: limit,
      templateStatus: 1
    };
    const data = await templateListAsync(params);
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
      name: 'Resume'
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
    background-image: linear-gradient(to top, rgb(242, 244, 247) 0%, white 100%);
    .card-list {
      display: flex;
      flex-wrap: wrap;
      width: 1400px;
      justify-content: space-between;
      .card-list-item-box {
        flex: 0 0 25%;
        display: flex;
        justify-content: center;
      }
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
