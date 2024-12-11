<template>
  <ul :style="worksDiaplayBox">
    <template v-for="(item, index) in module.dataSource.list.value" :key="index">
      <li :style="worksDisplayLi" :class="[{ 'odd-li': isOddLi(index + 1) }]">
        <p v-show="module.props.worksName.show" :style="worksName">{{ item.worksName.value }}</p>
        <a v-show="module.props.worksLink.show" :style="worksLink" :href="item.worksLink.value">{{
          item.worksLink.value
        }}</a>
        <p
          v-show="module.props.worksIntroduce.show"
          v-dompurify-html="item.worksIntroduce.value"
          :style="worksIntroduce"
        ></p>
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

  // 作品展示列表整体样式
  const worksDiaplayBox = useGetCustomStyle(props.module, 'worksDiaplayBox');

  // 单个列表样式
  const worksDisplayLi: any = useGetCustomStyle(props.module, 'worksDisplayLi');

  // 作品名称样式
  const worksName = useGetCustomStyle(props.module, 'worksName');

  // 作品链接样式
  const worksLink = useGetCustomStyle(props.module, 'worksLink');

  // 作品简介样式
  const worksIntroduce = useGetCustomStyle(props.module, 'worksIntroduce');

  // 是否需要奇数列设置右边距
  const isOddLi = (index: number) => {
    console.log('worksDisplayLi.width', worksDisplayLi.value.width);
    if (worksDisplayLi.value.width?.indexOf('%') > -1) {
      if (Number(worksDisplayLi.value.width.split('%')[0]) > 50 || index % 2 == 0) {
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
  }
</style>
