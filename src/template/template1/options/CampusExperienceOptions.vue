<!-- 校园经历属性设置 -->
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
      <el-form label-width="70px" label-position="left">
        <el-form-item label="标题名称:">
          <el-input type="text" v-model="modelItem.title" maxlength="15" show-word-limit />
        </el-form-item>
        <div class="campus-list" v-for="(item, index) in modelItem.LIST" :key="index">
          <p>
            <span>经历{{ index + 1 }}</span>
            <el-button
              :disabled="index === 0"
              type="danger"
              :icon="Delete"
              circle
              @click="deleteCampus(index)"
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
          <el-form-item label="经历简要:">
            <el-input type="text" v-model="item.campusBriefly" maxlength="35" show-word-limit />
            <el-switch v-model="modelItem.isShow.campusBriefly" />
          </el-form-item>
          <el-form-item label="主要职责:">
            <el-input type="text" v-model="item.campusDuty" maxlength="35" show-word-limit />
            <el-switch v-model="modelItem.isShow.campusDuty" />
          </el-form-item>
          <el-form-item label="经历简述:">
            <el-input
              type="textarea"
              v-model="item.campusContent"
              maxlength="200"
              show-word-limit
              :rows="4"
            />
            <el-switch v-model="modelItem.isShow.campusContent" />
          </el-form-item>
        </div>
        <!-- 添加或删除经历 -->
        <div class="addOrdelet">
          <el-button type="primary" @click="addCampus">添加经历</el-button>
        </div>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { ICAMPUSEXPERIENCE } from '@/types/model';
  import { useResumeModelStore, useResumeJsonStore } from '@/store/resume';
  import CommonOptions from '@/components/CommonOptions/CommonOptions.vue';
  import CommonTitleOptions from '@/components/CommonOptions/CommonTitleOptions.vue';
  import { Delete } from '@element-plus/icons-vue';
  // store
  const useModel = useResumeModelStore();
  const { resumeJsonStore } = useResumeJsonStore();

  // 选中的模块
  const modelItem = reactive<ICAMPUSEXPERIENCE>(
    resumeJsonStore.LIST[useModel.index] as ICAMPUSEXPERIENCE
  );
  let activeName = ref('style');
  /**
   * 数据配置
   */
  // 删除技能
  const deleteCampus = (index: number): void => {
    modelItem.LIST.splice(index, 1);
  };
  // 添加经历
  const addCampus = (): void => {
    modelItem.LIST.push({
      date: ['2021-9', '2022-10'], // 经历时间
      campusBriefly: '经历简要，如社团名称',
      campusDuty: '主要职责',
      campusContent:
        '经历经历描述经历描述经历描经历描述经历描述经历描述经历描述经历描述述经历描述经历描述经历描述经历描述经历描述描述'
    });
  };
</script>
<script lang="ts">
  export default {
    name: 'CAMPUS_EXPERIENCE'
  };
</script>
<style lang="less" scoped>
  .campus-list {
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
</style>
