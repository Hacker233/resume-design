<template>
  <div class="soft-detail-box">
    <!-- 标题区域 -->
    <div class="head-box">
      <div class="head-left">
        <h1>{{ softInfo.source_title }}</h1>
      </div>
      <div class="head-right">
        <img :src="softInfo.source_cover" :alt="softInfo.source_title" />
      </div>
    </div>
    <!-- 底部区域 -->
    <div class="soft-detail-bottom">
      <content-left-vue :content="softInfo"></content-left-vue>
      <right-card-vue :content="softInfo"></right-card-vue>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { getySoftInfoByIdAsync } from '@/http/api/soft';
  import ContentLeftVue from './components/ContentLeft.vue';
  import RightCardVue from './components/RightCard.vue';

  // 查询软件详细信息
  const { sourceId } = useRoute().query;
  const softInfo = ref<any>('');
  const getySoftInfoById = async () => {
    const params = {
      sourceId: sourceId
    };
    const data = await getySoftInfoByIdAsync(params);
    if (data.code === '00000') {
      softInfo.value = data.data;
    } else {
      ElMessage.error(data.message);
    }
  };
  getySoftInfoById();
</script>
<style lang="scss" scoped>
  .soft-detail-box {
    width: 1300px;
    min-height: 500px;
    margin: 0 auto;
    padding: 30px 0;
    .head-box {
      width: 100%;
      height: 300px;
      background-image: linear-gradient(to right, #24b27e, #14959b);
      border-radius: 10px;
      display: flex;
      .head-left {
        height: 100%;
        display: flex;
        align-items: center;
        width: 68%;
        padding: 0 40px;
        h1 {
          font-size: 28px;
          color: #fff;
          line-height: 1.5;
        }
      }
      .head-right {
        display: flex;
        align-items: center;
        flex: 1;
        justify-content: flex-end;
        padding-right: 40px;
        img {
          width: 260px;
          height: 250px;
          border-radius: 10px;
          box-shadow: 0px 16px 22px 2px rgba($color: #fff, $alpha: 0.2);
        }
      }
    }
    .soft-detail-bottom {
      display: flex;
      justify-content: space-between;
      padding-top: 30px;
      align-items: flex-start;
    }
  }
</style>
