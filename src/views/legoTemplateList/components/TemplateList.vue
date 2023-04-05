<template>
  <div class="lego-template-list-wrap-box">
    <div class="card-box-item space-design" @mouseover="mouseover" @mouseleave="mouseleave">
      <svg-icon
        icon-name="icon-jiahao"
        color="#9c9c9c"
        size="48px"
        class-name="catalog-icon"
      ></svg-icon>
      <!-- 遮罩层 -->
      <div ref="maskLayerRef" class="mask-layer">
        <div class="design-button" @click="toSpaceDesign">空白制作</div>
      </div>
    </div>
    <div v-for="(item, index) in templateList" :key="index" class="card-box-item">
      <template-card
        :card-data="item"
        :width="cardWdith"
        :height="cardHeight"
        @to-design="toDesignDetail"
      >
      </template-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import TemplateCard from './TemplateCard.vue';
  const props = defineProps<{
    category: string;
    templateList: any;
    categoryList: any;
  }>();

  // 卡片宽度
  const cardWdith = computed(() => {
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

  const maskLayerRef = ref<any>(null);
  // 鼠标移入显示遮罩层
  const mouseover = () => {
    maskLayerRef.value.style.opacity = 1;
  };
  const mouseleave = () => {
    maskLayerRef.value.style.opacity = 0;
  };

  // 跳转至详情页
  const router = useRouter();
  const toDesignDetail = (cardData: { _id: any }) => {
    router.push({
      path: '/legoDesigner',
      query: {
        templateId: cardData._id
      }
    });
  };

  // 跳转至空白制作
  const toSpaceDesign = () => {
    router.push({
      path: '/legoDesigner'
    });
  };
</script>
<style lang="scss" scoped>
  .lego-template-list-wrap-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 30px 0 0 0;
    .space-design {
      width: v-bind('cardWdith');
      height: calc(v-bind('cardHeight'));
      background-color: #fff;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      &:hover {
        box-shadow: 0px 16px 22px 2px rgb(0 37 58 / 24%);
        transform: translateY(2%) scale(1.03);
      }
      .mask-layer {
        height: 100%;
        width: 100%;
        border-radius: 5px 5px 0 0;
        position: absolute;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.5);
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        transition: all 0.3s;
        opacity: 0;
        .design-button {
          width: 100px;
          height: 30px;
          font-size: 13px;
          background-color: #2cbd99;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          transition: all 0.3s;
          &:hover {
            background-color: rgba(#42aa90, 0.7);
          }
        }
      }
    }
  }
</style>
