<!-- 简历求职意向属性面板 -->
<template>
  <el-tabs v-model="activeName" type="card" class="demo-tabs" stretch>
    <el-tab-pane label="样式设置" name="style">
      <el-form label-width="100px" label-position="left">
        <!-- 公共样式属性 -->
        <common-options></common-options>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="数据配置" name="data">
      <div class="edu-list" v-for="(item, index) in modelItem.LIST" :key="index">
        <p>
          <span>学历{{ index + 1 }}</span>
          <el-button
            :disabled="index === 0"
            type="danger"
            :icon="Delete"
            circle
            @click="deleteEdu(index)"
          />
        </p>
        <el-form-item label="日期选择:">
          <el-date-picker
            v-model="item.date"
            type="monthrange"
            range-separator="-"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
          />
          <el-switch v-model="modelItem.isShow.date" />
        </el-form-item>
        <el-form-item label="学校名称:">
          <el-input type="text" v-model="item.schoolName" maxlength="40" show-word-limit />
          <el-switch v-model="modelItem.isShow.schoolName" />
        </el-form-item>
        <el-form-item label="专业名称:">
          <el-input type="text" v-model="item.specialized" maxlength="20" show-word-limit />
          <el-switch v-model="modelItem.isShow.specialized" />
        </el-form-item>
        <el-form-item label="学历学位:">
          <el-select v-model="item.degree" class="m-2" placeholder="Select">
            <el-option
              v-for="(item, index) in degreeList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
          <el-switch v-model="modelItem.isShow.degree" />
        </el-form-item>
      </div>
      <!-- 添加或删除学历 -->
      <div class="addOrdelet">
        <el-button type="primary" @click="addEdu">添加学历</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { IEDUBACKGROUND } from '@/types/model';
  import { useResumeModelStore, useResumeJsonStore } from '@/store/resume';
  import { Delete } from '@element-plus/icons-vue';
  import CommonOptions from '@/components/CommonOptions/CommonOptions.vue'; // 公共属性设置
  // store
  const useModel = useResumeModelStore();
  const { resumeJsonStore } = useResumeJsonStore();

  // 选中的模块
  const modelItem = reactive<IEDUBACKGROUND>(
    resumeJsonStore.LIST[useModel.index] as IEDUBACKGROUND
  );
  let activeName = ref('style');

  /**
   * 数据配置
   */
  const degreeList: Array<string> = reactive([
    '初中',
    '高中',
    '大专',
    '本科',
    '全日制本科',
    '硕士',
    '非全硕士',
    '其它'
  ]);
  // 添加学历
  const addEdu = (): void => {
    modelItem.LIST.push({
      date: ['2015-5', '2019-6'],
      schoolName: '小猪大学', // 学校名称
      specialized: '通信工程', // 专业
      degree: '本科', // 学历
      majorCourse: '主修计算机技术、Java、c++等等' // 主修课程
    });
  };
  // 删除学历
  const deleteEdu = (index: number): void => {
    modelItem.LIST.splice(index, 1);
  };
</script>
<script lang="ts">
  export default {
    name: 'EDU_BACKGROUND'
  };
</script>
<style lang="less">
  .edu-list {
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
