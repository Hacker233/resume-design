<!-- 荣誉奖项属性面板 -->
<template>
  <el-tabs v-model="activeName" type="card" class="demo-tabs" stretch>
    <el-tab-pane label="样式设置" name="style">
      <el-form label-width="100px" label-position="left">
        <!-- 公共样式属性 -->
        <common-options></common-options>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="数据配置" name="data">
      <div class="awards-list" v-for="(item, index) in modelItem.LIST" :key="index">
        <p>
          <span>奖项{{ index + 1 }}</span>
          <el-button
            :disabled="index === 0"
            type="danger"
            :icon="Delete"
            circle
            @click="deleteAwards(index)"
          />
        </p>
        <el-form-item label="日期选择:">
          <el-date-picker v-model="item.date" type="month" placeholder="Pick a month" />
          <el-switch v-model="modelItem.isShow.date" />
        </el-form-item>
        <el-form-item label="奖项名称:">
          <el-input type="text" v-model="item.awardsName" maxlength="40" show-word-limit />
          <el-switch v-model="modelItem.isShow.awardsName" />
        </el-form-item>
        <el-form-item label="所获奖项:">
          <el-input type="text" v-model="item.awardsGrade" maxlength="20" show-word-limit />
          <el-switch v-model="modelItem.isShow.awardsGrade" />
        </el-form-item>
      </div>
      <!-- 添加或删除奖项 -->
      <div class="addOrdelet">
        <el-button type="primary" @click="addAwards">添加奖项</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { IAWARDS } from '@/types/model';
  import { useResumeModelStore, useResumeJsonStore } from '@/store/resume';
  import { Delete } from '@element-plus/icons-vue';
  import CommonOptions from '@/components/CommonOptions/CommonOptions.vue';
  // store
  const useModel = useResumeModelStore();
  const {resumeJsonStore} = useResumeJsonStore();

  // 选中的模块
  const modelItem = reactive<IAWARDS>(resumeJsonStore.LIST[useModel.index] as IAWARDS);
  let activeName = ref('style');
  /**
   * 数据配置
   */
  // 添加奖项
  const addAwards = (): void => {
    modelItem.LIST.push({
      date: '2021-9', // 获奖时间
      awardsName: '奖项名称',
      awardsGrade: '获奖等级'
    });
  };
  // 删除奖项
  const deleteAwards = (index: number): void => {
    modelItem.LIST.splice(index, 1);
  };
</script>
<script lang="ts">
  export default {
    name: 'AWARDS'
  };
</script>
<style lang="less">
  .awards-list {
    p {
      display: flex;
      justify-content: center;
      height: 50px;
      align-items: center;
      margin-bottom: 10px;
      span {
        margin-right: 10px;
      }
    }
  }
  .addOrdelet {
    width: 100%;
    display: flex;
    height: 50px;
    align-items: center;
  }
</style>
