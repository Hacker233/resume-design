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
      <content-left-vue
        :content="softInfo"
        :comment-count="softInfo.commentCount"
      ></content-left-vue>
      <right-card-vue :content="softInfo"></right-card-vue>
    </div>

    <!-- 回到顶部 -->
    <el-backtop :right="50" :bottom="80" />
  </div>
</template>
<script lang="ts" setup>
  import ContentLeftVue from './components/ContentLeft.vue';
  import RightCardVue from './components/RightCard.vue';
  import { getSoftDetailByIdAsync } from '@/http/api/softShare';

  // 查询软件详细信息
  const route = useRoute();
  console.log('查询软件信息', route);
  const sourceId = route.params.sourceId;
  const softInfo = ref<any>('');
  const getySoftInfoById = async () => {
    const params = {
      id: sourceId
    };
    const data = await getSoftDetailByIdAsync(params);
    if (data.status === 200) {
      softInfo.value = data.data;
    } else {
      ElMessage.error(data.message);
    }
  };
  getySoftInfoById();
</script>
<style lang="scss" scoped>
  .soft-detail-box {
    width: 1200px;
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
