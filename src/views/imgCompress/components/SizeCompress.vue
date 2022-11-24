<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :inline="true"
    label-width="90px"
    size="default"
    label-position="left"
  >
    <el-form-item label="尺寸选择:">
      <el-select v-model="ruleForm.size" placeholder="请输入标签，最多6个" @change="sizeChange">
        <el-option
          v-for="item in sizeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="宽（像素）:">
      <el-input v-model="ruleForm.width" placeholder="原始比例" />
    </el-form-item>
    <el-form-item label="高（像素）:">
      <el-input v-model="ruleForm.height" placeholder="原始比例" />
    </el-form-item>
    <el-form-item label="压缩级别:">
      <el-select
        v-model="ruleForm.compressGrade"
        placeholder="请输入标签，最多6个"
        @change="sizeChange"
      >
        <el-option
          v-for="item in compressGradeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
  interface ISize {
    size: string;
    width: string;
    height: string;
    compressGrade: number;
  }
  // 相关参数
  const ruleForm = reactive<ISize>({
    size: 'initSize',
    width: '',
    height: '',
    compressGrade: 0.5
  });

  // 每个尺寸对应的宽高
  interface ISizeToHW {
    [propName: string]: any;
  }
  const sizeToHW = reactive<ISizeToHW>({
    initSize: null,
    computerSize: {
      width: '1024',
      height: ''
    },
    phoneSize: {
      width: '480',
      height: ''
    },
    weChatBig: {
      width: '200',
      height: ''
    },
    weChatSmall: {
      width: '140',
      height: ''
    },
    IDPhoto1: {
      width: '295',
      height: '413'
    },
    IDPhoto2: {
      width: '413',
      height: '626'
    },
    customSize: null
  });

  // 尺寸下拉选项
  const sizeOptions = reactive([
    {
      label: '保持原始尺寸',
      value: 'initSize'
    },
    {
      label: '适合电脑尺寸',
      value: 'computerSize'
    },
    {
      label: '适合手机尺寸',
      value: 'phoneSize'
    },
    {
      label: '适合微信表情尺寸（大）',
      value: 'weChatBig'
    },
    {
      label: '适合微信表情尺寸（小）',
      value: 'weChatSmall'
    },
    {
      label: '证件1寸照',
      value: 'IDPhoto1'
    },
    {
      label: '证件2寸照',
      value: 'IDPhoto2'
    },
    {
      label: '自定义',
      value: 'customSize'
    }
  ]);

  // 压缩级别下拉选项
  const compressGradeOptions = reactive([
    {
      label: '压缩至90%',
      value: 0.9
    },
    {
      label: '压缩至80%',
      value: 0.8
    },
    {
      label: '压缩至70%',
      value: 0.7
    },
    {
      label: '压缩至60%',
      value: 0.6
    },
    {
      label: '压缩至50%(推荐)',
      value: 0.5
    },
    {
      label: '压缩至40%',
      value: 0.4
    },
    {
      label: '压缩至30%',
      value: 0.3
    },
    {
      label: '压缩至20%',
      value: 0.2
    },
    {
      label: '压缩至10%',
      value: 0.1
    }
  ]);

  // 尺寸下拉改变
  const sizeChange = (value: string) => {
    const HWSize = sizeToHW[value];
    if (HWSize) {
      ruleForm.width = HWSize.width;
      ruleForm.height = HWSize.height;
    } else {
      ruleForm.width = '';
      ruleForm.height = '';
    }
  };
</script>
<style lang="scss" scoped>
  .el-form {
    display: flex;
    justify-content: space-between;
    .el-form-item {
      margin: 0;
    }
  }
</style>
