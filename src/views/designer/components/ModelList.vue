<template>
  <div class="model-list-box">
    <ul class="model-ul">
      <li v-for="item in componentData.LIST" :key="item.id">
        <el-checkbox v-model="item.show" :label="item.title" @change="changeCheck" />
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { IResumeJson } from '@/types/model';
  const props = defineProps<{
    componentData: IResumeJson;
  }>();

  const changeCheck = (value: any): void => {
    console.log(value, props.componentData);
  };
</script>
<style lang="less" scoped>
  .model-list-box {
    .model-ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0;
      margin: 0;

      li {
        list-style: none;
        display: flex;
        align-items: center;
        height: 50px;
        border-bottom: 1px solid #eee;
        padding: 0 10px;

        &:hover {
          cursor: pointer;
          background-color: rgb(227, 231, 234);
        }
      }
    }
  }
</style>
