<template>
  <div class="lego-template-list-wrap-box">
    <div class="template-list-box-new">
      <div v-for="(item, index) in templateList" :key="index" class="card-box-item">
        <template-card
          :card-data="item"
          :width="cardWidth"
          :height="cardHeight"
          @to-design="toDesignDetail"
        >
        </template-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import TemplateCard from './TemplateCard.vue';

  const props = defineProps<{
    category: string;
    templateList: any;
    legoPersonList: any;
    categoryList: any;
  }>();

  // 卡片宽度
  const cardWidth = computed(() => {
    let width = '';
    props.categoryList.forEach((item: { category_label: string; width: string }) => {
      if (item.category_label === props.category) {
        width = item.width + 'px';
        return;
      }
    });
    return width;
  });

  // 卡片高度
  const cardHeight = computed(() => {
    let height = '';
    props.categoryList.forEach((item: { category_label: string; height: string }) => {
      if (item.category_label === props.category) {
        height = item.height + 'px';
        return;
      }
    });
    return height;
  });

  // 跳转至详情页
  const router = useRouter();
  const toDesignDetail = (cardData: { _id: any; category: any }) => {
    router.push({
      path: '/legoDesigner',
      query: {
        templateId: cardData._id,
        category: cardData.category
      }
    });
  };
</script>
<style lang="scss" scoped>
  .lego-template-list-wrap-box {
    display: flex;
    flex-direction: column;
    .template-list-box-new {
      display: flex;
      flex-wrap: wrap;
      padding: 30px 0 0 0;
      .card-box-item {
        &:not(:nth-child(4n)) {
          margin-right: 33px;
        }
      }
    }
  }
</style>
