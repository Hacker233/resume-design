<template>
  <div class="padding-editor-box">
    <el-form-item label="圆角">
      <div class="padding-setting-box">
        <div class="left">
          <el-input-number
            controls-position="right"
            :model-value="parsedBorderRadius.topLeft"
            @update:model-value="onInputChange('topLeft', $event)"
          />
          <el-input-number
            controls-position="right"
            :model-value="parsedBorderRadius.bottomLeft"
            @update:model-value="onInputChange('bottomLeft', $event)"
          />
        </div>
        <div class="right">
          <el-input-number
            controls-position="right"
            :model-value="parsedBorderRadius.topRight"
            @update:model-value="onInputChange('topRight', $event)"
          />
          <el-input-number
            controls-position="right"
            :model-value="parsedBorderRadius.bottomRight"
            @update:model-value="onInputChange('bottomRight', $event)"
          />
        </div>
      </div>
    </el-form-item>
  </div>
</template>

<script lang="ts" setup>
  import { useModuleWithStyle } from './useModuleWithStyle';

  const props = defineProps<{
    id?: string;
    customCssProp?: string;
  }>();

  const { module } = useModuleWithStyle(props.id, props.customCssProp);

  // 创建一个计算属性来处理百分比或数字的边框半径，默认值为 0
  const parsedBorderRadius = computed(() => {
    return {
      topLeft: parseBorderRadius(module.value?.css?.borderRadius?.topLeft ?? 0),
      bottomLeft: parseBorderRadius(module.value?.css?.borderRadius?.bottomLeft ?? 0),
      topRight: parseBorderRadius(module.value?.css?.borderRadius?.topRight ?? 0),
      bottomRight: parseBorderRadius(module.value?.css?.borderRadius?.bottomRight ?? 0)
    };
  });

  // 边框半径解析函数
  function parseBorderRadius(value: string | number) {
    if (typeof value === 'string' && value.includes('%')) {
      return parseFloat(value); // 返回百分比的数值部分
    } else {
      return Number(value); // 返回数字
    }
  }

  // 输入更新处理函数
  function onInputChange(corner: string, value: number) {
    const borderRadiusValue = module.value.css.borderRadius[corner];
    if (typeof borderRadiusValue === 'string' && borderRadiusValue.includes('%')) {
      module.value.css.borderRadius[corner] = `${value}%`; // 百分比更新
    } else {
      module.value.css.borderRadius[corner] = value; // 数字更新
    }
    console.log('修改圆角', module.value.css);
  }
</script>

<style lang="scss" scoped>
  .padding-editor-box {
    .el-form-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .padding-setting-box {
        display: flex;
        justify-content: space-between;
        width: 70%;
        align-items: center;
        :deep(.el-input__wrapper) {
          padding-left: 0;
          padding-right: 25px;
        }
      }
    }
  }
</style>
