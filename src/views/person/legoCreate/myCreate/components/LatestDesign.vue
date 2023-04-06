<template>
  <div class="latest-card-box">
    <div v-for="(item, index) in legoPersonList" :key="index" class="card-box-item">
      <person-template-card
        :card-data="item"
        :width="cardWidth"
        :height="cardHeight"
        @to-design="toDesignDetail"
        @delete="deleteUserCreate"
      >
      </person-template-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { deleteLegoUserResumeAsync } from '@/http/api/lego';
  import PersonTemplateCard from './PersonTemplateCard.vue';

  defineProps<{
    legoPersonList: any;
    cardWidth: any;
    cardHeight: any;
    category: string;
  }>();

  const emit = defineEmits(['deleteSuccess']);

  // 跳转至详情
  const router = useRouter();
  const toDesignDetail = (cardData: { _id: any; category: any }) => {
    router.push({
      path: '/legoDesigner',
      query: {
        id: cardData._id,
        category: cardData.category
      }
    });
  };

  // 点击删除创作
  const deleteUserCreate = async (id: string) => {
    let params = {
      id: id
    };
    const data = await deleteLegoUserResumeAsync(params);
    if (data.data.status === 200) {
      ElMessage.success('删除成功');
      emit('deleteSuccess');
    } else {
      ElMessage.error(data.data.message);
    }
  };
</script>
<style lang="scss" scoped>
  .login-content-box {
    width: 100%;
    height: 100px;
    background-color: rgba($color: #eee, $alpha: 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    cursor: pointer;
    border-radius: 10px;
    margin-bottom: 30px;
    p {
      color: #028e6b;
      font-size: 16px;
      letter-spacing: 2px;
      transition: all 0.3s;
      &:hover {
        color: #06b78b;
      }
    }
  }
  .latest-card-box {
    display: flex;
    padding: 30px 0;
    flex-wrap: wrap;
    justify-content: space-between;
    .space-design {
      width: v-bind('cardWidth');
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
    .card-box-item {
      flex-shrink: 0;
    }
  }
</style>
