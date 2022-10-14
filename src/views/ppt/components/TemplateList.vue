<template>
  <div class="template-card-list-box">
    <div v-for="(item, index) in templateList" :key="index" class="card-box-item">
      <template-card :card-data="item" @to-preview="toPreview"> </template-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import TemplateCard from './TemplateCard.vue';

  defineProps<{
    templateList: any;
  }>();

  const router = useRouter();
  const toPreview = (item: any) => {
    const newpage = router.resolve({
      path: '/pptPreview',
      query: {
        id: item._id
      }
    });
    window.open(newpage.href, '_blank');
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
