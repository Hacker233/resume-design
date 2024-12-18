<template>
  <ul :style="skillSpecialtiesBox">
    <template v-for="(item, index) in module.dataSource.list.value" :key="index">
      <li :style="skillSpecialtiesLi" :class="[{ 'odd-li': isOddLi(index + 1) }]">
        <p v-show="module.props.skillName.show">{{ item.skillName.value }}</p>
        <el-slider
          v-show="module.props.proficiency.show"
          :model-value="vModelPro(item.proficiency.value)"
          :step="4"
          size="small"
          :format-tooltip="formatTooltip"
          disabled
        />
      </li>
    </template>
  </ul>
</template>
<script lang="ts" setup>
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';
  import { numberToText, textToNumber } from '@/utils/common';

  const props = defineProps<{
    module: IModule;
  }>();

  const vModelPro = (text: string) => {
    return textToNumber(text);
  };

  // 提示文字
  const formatTooltip = (number: number): string => {
    return numberToText(number);
  };

  // 技能特长列表整体样式
  const skillSpecialtiesBox = useGetCustomStyle(props.module, 'skillSpecialtiesBox');

  // 单个列表样式
  const skillSpecialtiesLi: any = useGetCustomStyle(props.module, 'skillSpecialtiesLi');

  console.log('技能特长', skillSpecialtiesLi);

  // 是否需要奇数列设置右边距
  const isOddLi = (index: number) => {
    if (skillSpecialtiesLi.value.width?.indexOf('%') > -1) {
      if (Number(skillSpecialtiesLi.value.width.split('%')[0]) > 50 || index % 2 == 0) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  };

  // 获取熟练度bar的样式
  const elSliderBar: any = useGetCustomStyle(props.module, 'elSliderBar');
</script>
<style lang="scss" scoped>
  ul {
    .odd-li {
      padding-right: 20px;
    }
    :deep(.el-slider) {
      .el-slider__bar {
        background-color: v-bind('elSliderBar.background');
        opacity: 0.7;
        border-radius: 0;
      }
      .el-slider__button {
        width: 10px;
        height: 10px;
        background-color: v-bind('elSliderBar.background');
        opacity: 0.7;
        border: none;
      }
      .el-slider__runway {
        border-radius: 0;
      }
    }
  }
</style>
