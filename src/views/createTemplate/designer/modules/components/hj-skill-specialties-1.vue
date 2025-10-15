<template>
  <ul :style="skillSpecialtiesBox">
    <template v-for="(item, index) in module.dataSource.list.value" :key="index">
      <li
        v-show="module.props.introduce.show"
        v-dompurify-html="item.introduce.value"
        :style="skillSpecialtiesLi"
        :class="[{ 'odd-li': isOddLi(index + 1) }]"
        class="mb-li"
      >
      </li>
    </template>
  </ul>
</template>
<script lang="ts" setup>
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';

  const props = defineProps<{
    module: IModule;
  }>();

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
</script>
<style lang="scss" scoped>
  ul {
    .odd-li {
      padding-right: 20px;
    }
    .mb-li {
      :deep(ul li) {
        list-style: disc;
      }
    }
  }
</style>
