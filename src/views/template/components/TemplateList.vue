<template>
  <div class="template-card-list-box">
    <div v-for="(item, index) in templateList" :key="index" class="card-box-item">
      <template-card :card-data="item" @to-design="toDesign"> </template-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import TemplateCard from '@/components/TemplateCard/TemplateCard.vue';
  import appStore from '@/store';
  import { ITempList } from '@/template/type';
  import { openGlobalLoading } from '@/utils/common';

  defineProps<{
    templateList: Array<ITempList>;
  }>();

  const router = useRouter();
  const { resetResumeJson } = appStore.useResumeJsonNewStore;
  const { resetSelectModel } = appStore.useSelectMaterialStore;
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
</script>
<style lang="scss" scoped>
  .template-card-list-box {
    display: flex;
    flex-wrap: wrap;
    padding: 30px 0 0 0;
    .card-box-item {
      &:not(:nth-child(4n)) {
        margin-right: 70px;
      }
      :deep(.template-card-box) {
        margin: 0 0px 30px 0;
      }
    }
  }
</style>
