<template>
  <div class="model-list-box">
    <ul class="model-ul">
      <li
        v-for="(item, index) in resumeJsonStore.LIST"
        :key="item.id"
        :class="[{ active: resumeModel.index === index }]"
      >
        <!-- 是否添加模块 -->
        <el-checkbox v-model="item.show" :label="item.title" />
        <!-- 中间模块 -->
        <div class="center" @click="selectModel(item, index)"></div>
        <!-- 上下移动图标 -->
        <div class="up-down-box">
          <el-icon color="#409eff" :class="['up', { 'not-allow': index === 0 }]" @click="up(index)"
            ><upload
          /></el-icon>
          <el-icon
            color="#409eff"
            :class="['down', { 'not-allow': index === resumeJsonStore.LIST.length - 1 }]"
            @click="down(index)"
            ><upload
          /></el-icon>
          <!-- 添加模块 -->
          <el-icon color="#409eff" class="add" @click="add(index)"><CirclePlus /></el-icon>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { useResumeModelStore, useResumeJsonStore } from '@/store/resume';
  import { ref } from 'vue';
  // 列表数据
  const { resumeJsonStore } = useResumeJsonStore();

  // 选中模块
  const resumeModel = useResumeModelStore();
  const selectModel = (item: any, index: number) => {
    let updateData = {
      model: item.model,
      title: item.title,
      index: index
    };
    console.log('updateData',updateData)
    resumeModel.setResumeModel(updateData);
  };

  // 下移模块
  const down = (index: number): void => {
    if (index === resumeJsonStore.LIST.length - 1) {
      return;
    }
    let temp = resumeJsonStore.LIST[index];
    resumeJsonStore.LIST[index] = resumeJsonStore.LIST[index + 1];
    resumeJsonStore.LIST[index + 1] = temp;
  };
  // 上移模块
  const up = (index: number): void => {
    if (index === 0) {
      return;
    }
    let temp = resumeJsonStore.LIST[index];
    resumeJsonStore.LIST[index] = resumeJsonStore.LIST[index - 1];
    resumeJsonStore.LIST[index - 1] = temp;
  };
  // 添加模块
  const add = (index: number) => {
    let temp = JSON.parse(JSON.stringify(resumeJsonStore.LIST[index]));
    resumeJsonStore.LIST.splice(index, 0, temp);
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
          background-color: rgb(227, 231, 234);
        }

        .center {
          flex: 1;
          width: 100%;
          height: 100%;
        }

        .up-down-box {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .up,
          .add,
          .down {
            font-size: 20px;
            cursor: pointer;
          }
          .down,
          .add {
            transform: rotate(180deg);
            margin-left: 10px;
          }
          .not-allow {
            color: #ccc;
            cursor: not-allowed;
          }
        }
      }

      .active {
        background-color: rgb(227, 231, 234);
      }
    }
  }
</style>
