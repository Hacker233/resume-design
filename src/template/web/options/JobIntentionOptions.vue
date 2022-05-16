<!-- 简历求职意向属性面板 -->
<template>
  <el-tabs v-model="activeName" type="card" class="demo-tabs" stretch>
    <el-tab-pane label="样式设置" name="style">
      <el-form label-width="100px" label-position="left">
        <el-form-item label="字体颜色:">
          <color-picker v-model:rgba="modelItem.style.textColor"></color-picker>
        </el-form-item>
        <el-form-item label="字体大小:">
          <el-select v-model="modelItem.style.textFontSize" class="m-2" placeholder="Select">
            <el-option
              v-for="(item, index) in fontSizeList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="字体粗细:">
          <el-select v-model="modelItem.style.textFontWeight" class="m-2" placeholder="Select">
            <el-option
              v-for="(item, index) in fontWeightList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="上外边距:">
          <el-input-number v-model="mTop" :min="-100" :max="100" @change="handleChange" />
        </el-form-item>
        <el-form-item label="下外边距:">
          <el-input-number v-model="mBottom" :min="-100" :max="100" @change="handleChangeMBottom" />
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="数据配置" name="data">
      <el-form label-width="100px" label-position="left">
        <el-form-item label="标题名称:">
          <el-input type="text" v-model="modelItem.title" maxlength="15" show-word-limit />
        </el-form-item>
        <el-form-item label="求职类型:">
          <el-select v-model="modelItem.jobSearchType" class="m-2" placeholder="Select">
            <el-switch v-model="modelItem.isShow.jobSearchType" />
            <el-option
              v-for="(item, index) in jobSearchTypeList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
          <el-switch v-model="modelItem.isShow.jobSearchType" />
        </el-form-item>
        <el-form-item label="意向岗位:">
          <el-input
            type="text"
            v-model="modelItem.intendedPositions"
            maxlength="15"
            show-word-limit
          />
          <el-switch v-model="modelItem.isShow.intendedPositions" />
        </el-form-item>
        <el-form-item label="意向城市:">
          <el-input type="text" v-model="modelItem.intendedCity" maxlength="15" show-word-limit />
          <el-switch v-model="modelItem.isShow.intendedCity" />
        </el-form-item>
        <el-form-item label="期望薪酬:">
          <el-select v-model="modelItem.expectSalary" class="m-2" placeholder="Select">
            <el-option
              v-for="(item, index) in expectSalaryList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
          <el-switch v-model="modelItem.isShow.expectSalary" />
        </el-form-item>
        <el-form-item label="求职状态:">
          <el-select v-model="modelItem.jobStatus" class="m-2" placeholder="Select">
            <el-option
              v-for="(item, index) in jobStatusList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
          <el-switch v-model="modelItem.isShow.jobStatus" />
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { IJOBINTENTION } from '@/types/model';
  import { useResumeModelStore, useResumeJsonStore } from '@/store/resume';
  // store
  const useModel = useResumeModelStore();
  const useResumeJson = useResumeJsonStore();

  // 选中的模块
  const modelItem = reactive<IJOBINTENTION>(useResumeJson.LIST[useModel.index] as IJOBINTENTION);
  let activeName = ref('style');

  // 字体大小
  const fontSizeList = reactive<Array<string>>([
    '10px',
    '12px',
    '14px',
    '16px',
    '18px',
    '20px',
    '22px',
    '24px',
    '26px',
    '28px',
    '30px',
    '32px',
    '34px',
    '36px',
    '38px',
    '40px'
  ]);
  // 字体粗细
  const fontWeightList = reactive<Array<number>>([100, 200, 300, 400, 500, 600, 700, 800, 900]);

  // 工具方法--px转数字
  const pxTonumber = (value: string | undefined): number => {
    if (value) {
      return Number(value.split('px')[0]);
    } else {
      return 0;
    }
  };

  // 上外边距
  const defaultMtop: number = pxTonumber(modelItem.style.mTop);
  const mTop = ref<number>(defaultMtop);
  const handleChange = (value: number): void => {
    modelItem.style.mTop = value + 'px';
  };

  // 下外边距
  const defaultMbottom: number = pxTonumber(modelItem.style.mBottom);
  const mBottom = ref<number>(defaultMbottom);
  const handleChangeMBottom = (value: number): void => {
    modelItem.style.mBottom = value + 'px';
  };

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
    '15000￥以上'
  ]);
</script>
<script lang="ts">
  export default {
    name: 'JOB_INTENTION'
  };
</script>
<style lang="less">
  @import '../style/options.less';
</style>
