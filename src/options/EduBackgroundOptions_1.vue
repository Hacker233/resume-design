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
      <div v-for="(item, index) in modelItem.data.LIST" :key="index" class="edu-list">
        <el-form label-width="65px" label-position="left">
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
          <date-form-item
            :model-item="modelItem"
            :item="item"
            @handle-start-date-change="(value:string)=>handleStartDateChange(value,item)"
            @handle-end-date-change="(value:string)=>handleEndDateChange(value,item)"
            @handle-radio-change="(value:string)=>handleRadioChange(value,item)"
            @handl-switch="handlSwitch"
          ></date-form-item>

          <el-form-item label="学校名称:">
            <el-input v-model="item.schoolName" type="text" maxlength="40" show-word-limit />
            <el-switch v-model="modelItem.data.isShow.schoolName" />
          </el-form-item>
          <el-form-item label="专业名称:">
            <el-input v-model="item.specialized" type="text" maxlength="20" show-word-limit />
            <el-switch v-model="modelItem.data.isShow.specialized" />
          </el-form-item>
          <el-form-item label="学历学位:">
            <el-select v-model="item.degree" class="m-2" placeholder="Select">
              <el-option
                v-for="(childItem, j) in degreeList"
                :key="j"
                :label="childItem"
                :value="childItem"
              />
            </el-select>
            <el-switch v-model="modelItem.data.isShow.degree" />
          </el-form-item>
          <el-form-item label="教学经历">
            <comm-editor v-model="item.majorCourse"></comm-editor>
            <el-switch v-model="modelItem.data.isShow.majorCourse" />
          </el-form-item>
        </el-form>
      </div>

      <!-- 添加或删除学历 -->
      <div class="addOrdelet">
        <el-button type="primary" @click="addEdu">添加学历</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
  import { Delete } from '@element-plus/icons-vue';
  import CommonOptions from './CommonOptions.vue';
  import CommonTitleOptions from './CommonTitleOptions.vue';
  import { useDegreeList } from '@/hooks/useDegreeList';
  import useDesignSelectModelItem from '@/hooks/material/useDesignSelectModelItem';
  import DateFormItem from '@/components/DateFormItem/DateFormItem.vue';
  defineOptions({ name: 'TEMPLATE2_EDU_BACKGROUND_OPTIONS' });
  // store

  // 选中的模块
  const { modelItem } = useDesignSelectModelItem();

  const handleStartDateChange = (value: string, item: any) => {
    item.date[0] = value;
  };
  const handleEndDateChange = (value: string, item: any) => {
    item.date[1] = value;
  };
  const handleRadioChange = (value: string, item: any) => {
    item.date[1] = value;
  };
  const handlSwitch = (value: boolean) => {
    modelItem.data.isShow.date = value;
  };

  let activeName = ref('style');
  const { degreeList } = useDegreeList(); // 学历列表
  // 添加学历
  const addEdu = (): void => {
    modelItem.data.LIST.push({
      date: ['2015-5', '2019-6'],
      schoolName: '小猪大学', // 学校名称
      specialized: '通信工程', // 专业
      degree: '本科', // 学历
      majorCourse: '主修计算机技术、Java、c++等等' // 主修课程
    });
  };
  // 删除学历
  const deleteEdu = (index: number): void => {
    modelItem.data.LIST.splice(index, 1);
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
