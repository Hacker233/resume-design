<!-- 简历求职意向属性面板 -->
<template>
  <el-tabs v-model="activeName" type="card" class="demo-tabs" stretch>
    <el-tab-pane label="样式设置" name="style">
      <el-form label-width="100px" label-position="left">
        <!-- 标题样式属性 -->
        <common-title-options></common-title-options>
        <!-- 公共样式属性 -->
        <common-options></common-options>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="数据配置" name="data">
      <div v-for="(item, index) in data.LIST" :key="index" class="edu-list">
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
          <el-switch v-model="data.isShow.date" />
        </el-form-item>
        <el-form-item label="学校名称:">
          <el-input v-model="item.schoolName" type="text" maxlength="40" show-word-limit />
          <el-switch v-model="data.isShow.schoolName" />
        </el-form-item>
        <el-form-item label="专业名称:">
          <el-input v-model="item.specialized" type="text" maxlength="20" show-word-limit />
          <el-switch v-model="data.isShow.specialized" />
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
          <el-switch v-model="data.isShow.degree" />
        </el-form-item>
        <el-form-item label="教学经历">
          <el-input
            v-model="item.majorCourse"
            type="textarea"
            maxlength="350"
            show-word-limit
            :rows="4"
          />
          <el-switch v-model="data.isShow.majorCourse" />
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
  import { IEDUBACKGROUND } from '@/interface/model';
  import appStore from '@/store';
  import { Delete } from '@element-plus/icons-vue';
  import CommonOptions from '@/components/CommonOptions/CommonOptions.vue'; // 公共属性设置
  import CommonTitleOptions from '@/components/CommonOptions/CommonTitleOptions.vue';
  import { useModelIndex } from '@/hooks/useModelIndex';
  import { useDegreeList } from '@/hooks/useDegreeList';
  defineOptions({ name: 'TEMPLATE2_EDU_BACKGROUND_OPTIONS' });
  // store
  const { resumeJsonNewStore } = appStore.useResumeJsonNewStore;

  // 选中的模块
  const index = useModelIndex(); // 选中的索引
  const modelItem = reactive<IEDUBACKGROUND>(resumeJsonNewStore.COMPONENTS[index]);
  const data = reactive<IEDUBACKGROUND>(resumeJsonNewStore.COMPONENTS[index].data); // 组件数据

  let activeName = ref('style');
  const { degreeList } = useDegreeList(); // 学历列表
  // 添加学历
  const addEdu = (): void => {
    data.LIST.push({
      date: ['2015-5', '2019-6'],
      schoolName: '小猪大学', // 学校名称
      specialized: '通信工程', // 专业
      degree: '本科', // 学历
      majorCourse: '主修计算机技术、Java、c++等等' // 主修课程
    });
  };
  // 删除学历
  const deleteEdu = (index: number): void => {
    data.LIST.splice(index, 1);
  };
</script>
<style lang="scss" scoped>
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
