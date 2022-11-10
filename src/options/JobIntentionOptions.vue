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
      <el-form label-width="100px" label-position="left">
        <el-form-item label="标题名称:">
          <el-input v-model="modelItem.data.title" type="text" maxlength="15" show-word-limit />
        </el-form-item>
        <el-form-item label="求职类型:">
          <el-select v-model="modelItem.data.jobSearchType" class="m-2" placeholder="Select">
            <!-- <el-switch v-model="modelItem.data.isShow.jobSearchType" /> -->
            <el-option
              v-for="(item, index) in jobSearchTypeList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
          <el-switch v-model="modelItem.data.isShow.jobSearchType" />
        </el-form-item>
        <el-form-item label="意向岗位:">
          <el-input
            v-model="modelItem.data.intendedPositions"
            type="text"
            maxlength="15"
            show-word-limit
          />
          <el-switch v-model="modelItem.data.isShow.intendedPositions" />
        </el-form-item>
        <el-form-item label="意向城市:">
          <el-input
            v-model="modelItem.data.intendedCity"
            type="text"
            maxlength="15"
            show-word-limit
          />
          <el-switch v-model="modelItem.data.isShow.intendedCity" />
        </el-form-item>
        <el-form-item label="期望薪酬:">
          <el-select
            v-model="modelItem.data.expectSalary"
            class="m-2"
            placeholder="请选择期望薪酬"
            filterable
            allow-create
          >
            <el-option
              v-for="(item, index) in expectSalaryList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
          <el-switch v-model="modelItem.data.isShow.expectSalary" />
        </el-form-item>
        <el-form-item label="求职状态:">
          <el-select v-model="modelItem.data.jobStatus" class="m-2" placeholder="Select">
            <el-option
              v-for="(item, index) in jobStatusList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
          <el-switch v-model="modelItem.data.isShow.jobStatus" />
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import CommonOptions from '../options/CommonOptions.vue';
  import useDesignSelectModelItem from '@/hooks/material/useDesignSelectModelItem';
  defineOptions({ name: 'JOB_INTENTION_OPTIONS' });
  // 选中的模块
  const { modelItem } = useDesignSelectModelItem();
  let activeName = ref('style');

  /**
   * 数据配置
   */
  const jobSearchTypeList: Array<string> = reactive(['全职', '兼职', '实习']);
  const jobStatusList: Array<string> = reactive(['随时入职', '一周内到岗', '一个月内到岗', '面议']);
  const expectSalaryList: Array<string> = reactive([
    '2000-4000￥',
    '4000-6000￥',
    '6000-8000￥',
    '8000-10000￥',
    '10000-12000￥',
    '12000-15000￥',
    '15000￥以上',
    '面议'
  ]);
</script>
<style lang="scss"></style>
