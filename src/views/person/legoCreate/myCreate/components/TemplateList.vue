<template>
  <div class="lego-template-list-wrap-box">
    <!-- 最近的设计 -->
    <div class="latest-design-box">
      <latest-design
        :lego-person-list="legoPersonList"
        :card-width="cardWidth"
        :card-height="cardHeight"
        :category="category"
        @delete-success="deleteSuccess"
      ></latest-design>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import LatestDesign from './LatestDesign.vue';

  const props = defineProps<{
    category: string;
    templateList: any;
    legoPersonList: any;
    categoryList: any;
  }>();
  const emit = defineEmits(['deleteSuccess']);

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

  // 删除成功
  const deleteSuccess = () => {
    emit('deleteSuccess');
  };
</script>
<style lang="scss" scoped>
  .lego-template-list-wrap-box {
    display: flex;
    flex-direction: column;
    .new-design-title {
      height: 45px;
      display: flex;
      align-items: flex-start;
      border-bottom: 1px solid #dfdfdf;
      h1 {
        color: #0d1216;
        font-size: 16px;
        letter-spacing: 3px;
        font-weight: 600;
      }
    }
    .template-list-box-new {
      display: flex;
      flex-wrap: wrap;
      padding: 30px 0 0 0;
      justify-content: space-between;
    }
  }
</style>
