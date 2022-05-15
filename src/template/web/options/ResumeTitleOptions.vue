<!-- 简历标题属性配置 -->
<template>
  <el-tabs v-model="activeName" type="card" class="demo-tabs" stretch>
    <el-tab-pane label="样式设置" name="style">
      <el-form label-width="100px" label-position="left">
        <el-form-item label="字体颜色:">
          <color-picker v-model:rgba="modelItem.style.titleColor"></color-picker>
        </el-form-item>
        <el-form-item label="背景颜色:">
          <color-picker v-model:rgba="modelItem.style.backgroundColor"></color-picker>
        </el-form-item>
        <el-form-item label="字体大小:">
          <el-select v-model="modelItem.style.titleFontSize" class="m-2" placeholder="Select">
            <el-option
              v-for="(item, index) in fontSizeList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="字体粗细:">
          <el-select v-model="modelItem.style.titleFontWeight" class="m-2" placeholder="Select">
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
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { IResumeJson, IRESUMETITLE } from '@/types/model';
  import { useResumeModelStore } from '@/store/resume';
  import { ISTYLE } from '../../../types/model';
  const props = defineProps<{
    componentData: IResumeJson;
  }>();
  // store
  const useModel = useResumeModelStore();

  // 选中的模块
  const modelItem = reactive<IRESUMETITLE>(props.componentData.LIST[useModel.index] as IRESUMETITLE);
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
</script>
<script lang="ts">
  export default {
    name: 'RESUME_TITLE'
  };
</script>
<style lang="less">
  .el-tabs {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .el-tabs__content {
    flex: 1;
    padding: 20px 30px;
  }

  .zs-color-picker-panel__visible {
    z-index: 10 !important;
  }
</style>
