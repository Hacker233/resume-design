<template>
  <div class="template-select-box">
    <div class="title">
      <h1>免费模板 + 用心设计</h1>
      <p>用心设计每一套模板，适合各行各业从业者</p>
    </div>
    <!-- 模板列表 -->
    <div class="card-list">
      <template v-for="(item, index) in templateList">
        <template-card :cardData="item" @toDesign="toDesign"> </template-card>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
  import templateList from '@/template';
  import TemplateCard from './TemplateCard.vue';
  import { ITempList } from '@/template/type';
  import { useRouter } from 'vue-router';

  // 跳转至设计页面
  const router = useRouter();
  const toDesign = (item: ITempList) => {
    router.push({
      path: '/designer',
      query: {
        id: item.id,
        name: item.name
      }
    });
  };
</script>
<style lang="less">
  .template-select-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    .title {
      height: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h1 {
        position: relative;
        letter-spacing: 3px;
        &::before {
          content: '';
          width: 200px;
          height: 1px;
          background-color: #bdc7d0;
          position: absolute;
          left: -250px;
          top: 50%;
        }
        &::after {
          content: '';
          width: 200px;
          height: 1px;
          background-color: #bdc7d0;
          position: absolute;
          right: -250px;
          top: 50%;
        }
      }
      p {
        font-size: 14px;
        color: #7f8b96;
      }
    }
    .card-list {
      display: flex;
    }
  }
</style>
