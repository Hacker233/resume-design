<template>
  <div class="template-card-list-box">
    <div v-for="(item, index) in templateList" :key="index" class="card-box-item">
      <template-card-new :card-data="item" @to-design="toDesign"> </template-card-new>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { ITempList } from '@/template/type';
  import TemplateCardNew from '@/components/TemplateCardNew/TemplateCardNew.vue';
  import { storeToRefs } from 'pinia';
  import templates from '@/static/templates';

  defineProps<{
    templateList: Array<ITempList>;
  }>();

  const router = useRouter();
  const { selectedModuleId } = storeToRefs(appStore.useCreateTemplateStore);

  const toDesign = (item: any) => {
    console.log('import.meta.env.', import.meta.env);

    selectedModuleId.value = ''; // 重置选中模块
    const pageName = templates.find((template: any) => template.id === item._id).page;
    console.log('pageName', pageName);

    if (import.meta.env.MODE === 'development') {
      router.push({
        path: `/resumedetail/${item._id}`
      });
    } else {
      if (pageName) {
        const mode = ref(import.meta.env.VITE_BUILD_MODE || 'spa');
        if (mode.value === 'spa') {
          router.push({
            path: `/resumedetail/${item._id}`
          });
        } else {
          window.open(`/template/${pageName}`, '_blank');
        }
      } else {
        router.push({
          path: `/resumedetail/${item._id}`
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
  .template-card-list-box {
    display: flex;
    flex-wrap: wrap;
    padding: 30px 0 0 0;
    .card-box-item {
      &:not(:nth-child(4n)) {
        margin-right: 33px;
      }
    }
  }
</style>
